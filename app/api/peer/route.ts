import { peerRepository } from "@/src/entities/wg-peer/repository/peer-repository"
import { NextRequest, NextResponse } from "next/server"
import { getUserSession } from "@/src/features/auth/actions/get-user-session"
import { validateApiToken } from "@/src/shared/lib/validate-api-token"

type SortField = "balance" | "lastActivity" | "sendBytes"
type SortOrder = "asc" | "desc"

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

    // Приведение типов с валидацией
    let sortField: SortField = "sendBytes"
    const rawSortField = searchParams.get("sortField")
    if (
      rawSortField === "balance" ||
      rawSortField === "lastActivity" ||
      rawSortField === "sendBytes"
    ) {
      sortField = rawSortField
    }

    let sortOrder: SortOrder = "desc"
    const rawSortOrder = searchParams.get("sortOrder")
    if (rawSortOrder === "asc" || rawSortOrder === "desc") {
      sortOrder = rawSortOrder
    }

    const user = await getUserSession()
    if (!user) {
      return NextResponse.json(
        { error: "Ошибка - пользователь не найден" },
        { status: 401 }
      )
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
