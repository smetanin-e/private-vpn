export function groupPeersByServer<
  T extends { wireguardServer?: { id: number } | null },
>(peers: T[]) {
  const map = new Map<number, T[]>()

  for (const peer of peers) {
    const server = peer.wireguardServer
    if (!server) continue

    if (!map.has(server.id)) {
      map.set(server.id, [])
    }
    map.get(server.id)!.push(peer)
  }
  return map
}
