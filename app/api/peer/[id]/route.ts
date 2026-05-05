import { NextRequest, NextResponse } from "next/server"
import { peerRepository } from "@/src/entities/wg-peer/repository/peer-repository"
import { getUserSession } from "@/src/features/auth/actions/get-user-session"

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserSession()
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized — user not found" },
        { status: 401 }
      )
    }

    const dbPeerId = Number((await params).id)

    const peer = await peerRepository.findPeerByIdWithRelations(dbPeerId)

    if (!peer) {
      return NextResponse.json({ error: "Peer not found" }, { status: 404 })
    }

    return NextResponse.json(peer)
  } catch (error) {
    console.error("[API_PEER_[id]_GET]", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
