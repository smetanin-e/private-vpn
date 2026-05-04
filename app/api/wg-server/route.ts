import { wgServerRepository } from "@/src/entities/wg-server/repository/wg-server-repository"
import { validateApiToken } from "@/src/shared/lib/validate-api-token"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const isValid = validateApiToken(req)

  if (!isValid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const servers = await wgServerRepository.getAllServers()
    return NextResponse.json(servers)
  } catch (error) {
    console.error("[API_SERVER_GET]", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
