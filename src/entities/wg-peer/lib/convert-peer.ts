import { PeerQueryType, PeerQueryTypeWithBigInt } from "../model/types"

export function convertPeer(peer: PeerQueryTypeWithBigInt): PeerQueryType {
  return {
    id: peer.id,
    wgPeerId: peer.wgPeerId,
    peerName: peer.peerName,
    status: peer.status,
    receivedBytes: Number(peer.receivedBytes), // BigInt -> number
    sendBytes: Number(peer.sendBytes), // BigInt -> number
    lastActivity: peer.lastActivity,
    client: peer.client,
    wireguardServer: peer.wireguardServer,
  }
}
