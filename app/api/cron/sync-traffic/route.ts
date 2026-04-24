import { syncTraffic } from "@/features/wg/model/service/sync-traffic"
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

    await syncTraffic()
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
