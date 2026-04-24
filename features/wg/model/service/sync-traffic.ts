import { prisma } from "@/shared/lib/prisma"
import { groupPeersByServer } from "./groupe-peers-by-server"
import { createPeerApi } from "../../api/create-peer-api"

export async function syncTraffic() {
  try {
    const dbPeers = await prisma.wireguardPeer.findMany({
      select: {
        id: true,
        wgPeerId: true,
        receivedBytes: true,
        sentBytes: true,
        wireguardServer: true,
      },
    })
    const peersByServer = groupPeersByServer(dbPeers)

    await Promise.all(
      Array.from(
        peersByServer.entries().map(async ([serverId, peers]) => {
          const server = peers[0].wireguardServer!
          const api = createPeerApi(server)

          try {
            const wgPeers = await api.getAllPeers()
            const wgMap = new Map(wgPeers.map((p) => [p.id, p]))

            await Promise.all(
              peers.map(async (dbPeer) => {
                try {
                  const wgPeer = wgMap.get(dbPeer.wgPeerId)
                  if (!wgPeer?.traffic) return

                  const newReceivedBytes = wgPeer.traffic.received
                  const newSentBytes = wgPeer.traffic.sent
                  const receivedDiff = newReceivedBytes - dbPeer.receivedBytes
                  const sentDiff = newSentBytes - dbPeer.sentBytes

                  const safeReceivedDiff = Math.max(0, receivedDiff)
                  const safeSentDiff = Math.max(0, sentDiff)
                  if (safeReceivedDiff === 0 && safeSentDiff === 0) return

                  await prisma.wireguardPeer.update({
                    where: { id: dbPeer.id },
                    data: {
                      receivedBytes: newReceivedBytes,
                      sentBytes: newSentBytes,
                    },
                  })
                } catch (error) {
                  console.error(
                    `WG sync error for peer ${dbPeer.wgPeerId} (server ${serverId})`,
                    error
                  )
                }
              })
            )
          } catch (error) {
            console.error(`WG sync error for server ${serverId}`, error)
          }
        })
      )
    )
  } catch (error) {
    console.error("WG sync error", error)
  }
}
