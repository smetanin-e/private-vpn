import { dailyCharge } from "@/features/client/service/daily-charge"
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
    await dailyCharge()
    return Response.json({ success: true })
  } catch (error) {
    console.error("WG sync error", error)
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
