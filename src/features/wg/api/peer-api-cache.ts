import { WireguardServer } from "@/generated/prisma/client"
import { createPeerApi } from "./create-peer-api"

const apiCache = new Map<number, ReturnType<typeof createPeerApi>>()

export function getPeerApi(server: WireguardServer) {
  if (!apiCache.has(server.id)) {
    apiCache.set(server.id, createPeerApi(server))
  }

  return apiCache.get(server.id)!
}
