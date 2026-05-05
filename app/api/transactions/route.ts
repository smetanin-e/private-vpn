import { transactionRepository } from "@/src/entities/transaction/repository/transaction-repository"
import { getUserSession } from "@/src/features/auth/actions/get-user-session"

import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const user = await getUserSession()
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized — user not found" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search")?.trim() || ""
    const take = searchParams.get("take")
      ? parseInt(searchParams.get("take")!, 10)
      : undefined

    const skip = searchParams.get("skip")
      ? parseInt(searchParams.get("skip")!, 10) || 0
      : undefined
    const clientId = searchParams.get("clientId")
      ? parseInt(searchParams.get("clientId")!, 10)
      : undefined

    const transactions = await transactionRepository.getAll(
      search,
      take,
      skip,
      clientId
    )
    return NextResponse.json(transactions)
  } catch (error) {
    console.error("[API_GET_TRANSACTION] Server error", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
