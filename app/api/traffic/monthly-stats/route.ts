import { trafficRepository } from "@/src/entities/traffic/repository/traffic-repository"
import { validateApiToken } from "@/src/shared/lib/validate-api-token"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const isValid = validateApiToken(req)

  if (!isValid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const { searchParams } = new URL(req.url)

    const take = searchParams.get("take")
      ? parseInt(searchParams.get("take")!, 10)
      : undefined
    const skip = searchParams.get("skip")
      ? parseInt(searchParams.get("skip")!, 10)
      : undefined

    const peerId = searchParams.get("peerId") // ← добавляем clientId
      ? parseInt(searchParams.get("peerId")!, 10)
      : undefined

    const monthlyTraffic = await trafficRepository.getAll(take, skip, peerId)
    return NextResponse.json(monthlyTraffic)
  } catch (error) {
    console.error("[API_GET_TRAFFIC] Server error", error)
    return NextResponse.json(
      { message: "Ошибка сервера при получении списка трафика по месяцам" },
      { status: 500 }
    )
  }
}
