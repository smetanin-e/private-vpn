import { peerRepository } from "@/entities/wg-peer/repository/peer-repository"
import { getUserSession } from "@/features/auth/actions/get-user-session"
import { createPeerApi } from "@/features/wg/api/create-peer-api"

import { NextRequest, NextResponse } from "next/server"
import QRCode from "qrcode"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const dbPeerId = Number((await params).id)
    const authUser = await getUserSession()
    if (!authUser)
      return NextResponse.json(
        { error: "Пользователь не авторизован" },
        { status: 401 }
      )

    //TODO ПЕРЕДАВАТЬ ID ИЗ БД А НЕ ИЗ WG-REST-API,
    //TODO ИСКАТЬ ПИРА В БАЗЕ ДАННЫХ И ПРОВЕРЯТЬ НА КАКОМ ОН СЕРВЕРЕ

    const peer = await peerRepository.findPeerById(dbPeerId)
    console.log(peer)
    if (!peer)
      return NextResponse.json(
        { error: "Файлы vpn конфигурацый не найдены" },
        { status: 404 }
      )
    const peerApiInstance = createPeerApi(peer.wireguardServer!)

    // Получаем конфиг напрямую из wg-rest-api
    const config = await peerRepository.getWgServerPeerConfig(
      peerApiInstance,
      peer.wgPeerId
    )
    console.log(config)
    if (!config) {
      return NextResponse.json({
        success: false,
        message: "Не удалось запросить конфиг. Ошибка на сервере WG",
      })
    }

    // Генерируем QR в base64 (PNG)
    const qr = await QRCode.toDataURL(config, { errorCorrectionLevel: "L" })

    // Возвращаем как изображение
    const base64 = qr.replace(/^data:image\/png;base64,/, "")
    const buffer = Buffer.from(base64, "base64")

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `inline; filename="${peer.peerName}.png"`,
      },
    })
  } catch (error) {
    console.error("[API_VPN_CONFIG_QR]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
