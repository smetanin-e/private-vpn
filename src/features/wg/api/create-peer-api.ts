import "server-only"
import { WireguardServer } from "@/generated/prisma/client"
import { createWgClient } from "./create-wg-client"
import { WireGuardPeerResponse } from "../model/types"

export type PeerApiType = {
  getAllPeers(): Promise<WireGuardPeerResponse[]>

  getConfigById(peerId: number): Promise<WireGuardPeerResponse>

  downloadPeerConfig(peerId: number): Promise<string>

  create(name: string): Promise<WireGuardPeerResponse>

  changeEnable(peerId: number, enable: boolean): Promise<WireGuardPeerResponse>

  delete(peerId: number): Promise<void>
}

export function createPeerApi(server: WireguardServer): PeerApiType {
  const client = createWgClient(server)

  return {
    async getAllPeers(): Promise<WireGuardPeerResponse[]> {
      const res = await client.get<WireGuardPeerResponse[]>(`/api/clients`)
      return res.data
    },

    async getConfigById(peerId: number) {
      const res = await client.get<WireGuardPeerResponse>(
        `/api/clients/${peerId}`
      )
      return res.data
    },

    async downloadPeerConfig(peerId: number) {
      const res = await client.get(`/api/clients/${peerId}?format=conf`, {
        responseType: "text",
      })

      return res.data
    },

    async create(name: string) {
      const res = await client.post<WireGuardPeerResponse>("/api/clients", {
        name,
      })
      return res.data
    },

    async changeEnable(peerId: number, enable: boolean) {
      return client.patch(`/api/clients/${peerId}`, { enable })
    },

    async delete(peerId: number) {
      return client.delete(`/api/clients/${peerId}`)
    },
  }
}
