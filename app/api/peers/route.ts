import { peerRepository } from "@/src/entities/wg-peer/repository/peer-repository"
import { NextRequest, NextResponse } from "next/server"
import { getUserSession } from "@/src/features/auth/actions/get-user-session"

type SortField = "balance" | "lastActivity" | "sendBytes"
type SortOrder = "asc" | "desc"

export async function GET(req: NextRequest) {
  try {
    // 1. Проверка сессии пользователя — вместо статического токена
    const user = await getUserSession()
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized — user not found" },
        { status: 401 }
      )
    }

    // 2. Парсинг параметров
    const { searchParams } = new URL(req.url)

    const search = searchParams.get("search")?.trim() || ""
    const take = searchParams.get("take")
      ? parseInt(searchParams.get("take")!, 10)
      : undefined
    const skip = searchParams.get("skip")
      ? parseInt(searchParams.get("skip")!, 10)
      : undefined

    // Валидация sortField
    let sortField: SortField = "sendBytes"
    const rawSortField = searchParams.get("sortField")
    if (
      rawSortField === "balance" ||
      rawSortField === "lastActivity" ||
      rawSortField === "sendBytes"
    ) {
      sortField = rawSortField
    }

    // Валидация sortOrder
    let sortOrder: SortOrder = "desc"
    const rawSortOrder = searchParams.get("sortOrder")
    if (rawSortOrder === "asc" || rawSortOrder === "desc") {
      sortOrder = rawSortOrder
    }

    const peers = await peerRepository.getAllPeersFiltered(
      search,
      take,
      skip,
      sortField,
      sortOrder
    )
    return NextResponse.json(peers)
  } catch (error) {
    console.error("[API_PEER_GET]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
