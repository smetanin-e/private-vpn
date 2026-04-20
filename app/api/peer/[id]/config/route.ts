import { clientRepository } from "@/entities/client/repository/client-repository"
import { peerRepository } from "@/entities/wg-peer/repository/peer-repository"
import { getUserSession } from "@/features/auth/actions/get-user-session"

import { NextRequest, NextResponse } from "next/server"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const peerId = Number((await params).id)

    const authUser = await getUserSession()
    if (!authUser)
      return NextResponse.json(
        { error: "Пользователь не авторизован" },
        { status: 401 }
      )

    const peer = await peerRepository.findPeerById(peerId)

    if (!peer)
      return NextResponse.json(
        { error: "Файлы vpn конфигурацый не найдены" },
        { status: 404 }
      )

    const client = await clientRepository.findClientById(peer.clientId)
    if (!client)
      return NextResponse.json(
        { error: "Для данного пира отсутствует клиент" },
        { status: 404 }
      )

    // Получаем конфиг напрямую из wg-rest-api
    const config = await peerRepository.getWgServerPeerConfig(peerId)
    if (!config) {
      return NextResponse.json({
        success: false,
        message: "Не удалось запросить конфиг. Ошибка на сервере WG",
      })
    }

    return new NextResponse(config, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "Content-Disposition": `attachment; filename="${peer.peerName}.conf"`,
      },
    })
  } catch (error) {
    console.error("[API_VPN_CONFIG]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
