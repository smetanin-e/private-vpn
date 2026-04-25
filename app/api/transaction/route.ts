import { transactionRepository } from "@/entities/transaction/repository/transaction-repository"
import { validateApiToken } from "@/shared/lib/validate-api-token"

import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const isValid = validateApiToken(req)

  if (!isValid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search")?.trim() || ""
    const take = searchParams.get("take")
      ? parseInt(searchParams.get("take")!, 10)
      : undefined
    const skip = searchParams.get("skip")
      ? parseInt(searchParams.get("skip")!, 10)
      : undefined

    const transactions = await transactionRepository.getAll(search, take, skip)
    return NextResponse.json(transactions)
  } catch (error) {
    console.error("[API_GET_TRANSACTION] Server error", error)
    return NextResponse.json(
      { message: "Ошибка сервера при получении списка транзакций" },
      { status: 500 }
    )
  }
}
