import { prisma } from "@/shared/lib/prisma"
import { groupPeersByServer } from "./groupe-peers-by-server"
import { createPeerApi } from "../../api/create-peer-api"

export async function syncTraffic() {
  try {
    const now = new Date()
    const isFirstDayOfMonth = now.getDate() === 1

    // Получаем первый день текущего и прошлого месяца для корректной группировки
    // const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)

    const dbPeers = await prisma.wireguardPeer.findMany({
      select: {
        id: true,
        wgPeerId: true,
        receivedBytes: true,
        sendBytes: true,
        wireguardServer: true,
      },
    })

    const peersByServer = groupPeersByServer(dbPeers)

    await Promise.all(
      Array.from(peersByServer.entries()).map(async ([serverId, peers]) => {
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

                const currentReceived = wgPeer.traffic.received
                const currentSent = wgPeer.traffic.sent

                // Вычисляем разницу с прошлой синхронизацией
                const receivedDiff = currentReceived - dbPeer.receivedBytes
                const sentDiff = currentSent - dbPeer.sendBytes

                // Если первое число месяца - сохраняем статистику за прошлый месяц
                if (isFirstDayOfMonth) {
                  // Проверяем, не сохранили ли уже статистику за этот месяц
                  const existingStats = await prisma.peerMonthlyStats.findFirst(
                    {
                      where: {
                        peerId: dbPeer.id,
                        month: lastMonthStart,
                      },
                    }
                  )

                  // Сохраняем только если еще не сохраняли
                  if (!existingStats) {
                    await prisma.peerMonthlyStats.create({
                      data: {
                        peerId: dbPeer.id,
                        month: lastMonthStart,
                        receivedBytes: BigInt(dbPeer.receivedBytes), // конвертация в BigInt
                        sendBytes: BigInt(dbPeer.sendBytes),
                      },
                    })

                    console.log(
                      `Saved monthly stats for peer ${dbPeer.id}: received=${dbPeer.receivedBytes}, sent=${dbPeer.sendBytes}`
                    )
                  }

                  // Обновляем счетчики в БД на текущие значения из WireGuard
                  // (без обнуления, так как WireGuard сам не обнуляет)
                  await prisma.wireguardPeer.update({
                    where: { id: dbPeer.id },
                    data: {
                      receivedBytes: currentReceived,
                      sendBytes: currentSent,
                    },
                  })
                } else {
                  // Не первое число - просто обновляем счетчики
                  if (receivedDiff > 0 || sentDiff > 0) {
                    await prisma.wireguardPeer.update({
                      where: { id: dbPeer.id },
                      data: {
                        receivedBytes: currentReceived,
                        sendBytes: currentSent,
                      },
                    })
                  }
                }

                // Логируем подозрительные ситуации (если трафик уменьшился)
                if (receivedDiff < 0 || sentDiff < 0) {
                  console.warn(
                    `Negative traffic diff for peer ${dbPeer.id}: ` +
                      `receivedDiff=${receivedDiff}, sentDiff=${sentDiff}. ` +
                      `Possible WireGuard restart or manual reset.`
                  )
                }
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
  } catch (error) {
    console.error("WG sync error", error)
  }
}
