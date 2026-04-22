import { peerRepository } from "@/entities/wg-peer/repository/peer-repository"
import { getUserSession } from "@/features/auth/actions/get-user-session"

import { NextResponse } from "next/server"

export async function GET() {
  try {
    const user = await getUserSession()
    if (!user) {
      return NextResponse.json(
        { error: "Пользователь не найден" },
        { status: 401 }
      )
    }

    const stats = await peerRepository.countAllUsers()

    return NextResponse.json(stats)
  } catch (error) {
    console.error("[API_PEER_COUNT_ALL] Server error", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
