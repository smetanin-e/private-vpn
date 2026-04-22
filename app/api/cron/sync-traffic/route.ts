import { peerApi } from "@/features/wg/api"
import { prisma } from "@/shared/lib/prisma"
import { validateCronToken } from "@/shared/lib/validate-cron-token"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    // 🔐 Проверка токена
    if (!validateCronToken(req)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )
    }

    const dbPeers = await prisma.wireguardPeer.findMany({
      select: {
        id: true,
        wgPeerId: true,
        publicKey: true,
        receivedBytes: true,
        sentBytes: true,
      },
    })

    await Promise.all(
      dbPeers.map(async (dbPeer) => {
        try {
          const res = await peerApi.getConfigById(dbPeer.wgPeerId)

          const wgPeer = res && res.data
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
          console.error(`WG sync error for peer ${dbPeer.wgPeerId}`, error)
        }
      })
    )

    return NextResponse.json({
      success: true,
      message: "Трафик синхронизирован",
    })
  } catch (error) {
    console.error("WG sync error", error)
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
