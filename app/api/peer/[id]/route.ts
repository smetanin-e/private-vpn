import { NextRequest, NextResponse } from "next/server"
import { peerRepository } from "@/src/entities/wg-peer/repository/peer-repository"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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
