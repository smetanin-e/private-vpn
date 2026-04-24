import { WireguardServer } from "@/generated/prisma/client"
import { createWgClient } from "./create-wg-client"
import { WireGuardPeerResponse } from "../model/types"

export type PeerApiType = {
  getConfigById(peerId: number): Promise<WireGuardPeerResponse>

  downloadPeerConfig(peerId: number): Promise<string>

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create(name: string): Promise<any>

  changeEnable(peerId: number, enable: boolean): Promise<WireGuardPeerResponse>

  delete(peerId: number): Promise<void>

  getConfig(peerId: number): Promise<Blob>

  getQr(peerId: number): Promise<Blob>
}

export function createPeerApi(server: WireguardServer): PeerApiType {
  const client = createWgClient(server)

  return {
    async getConfigById(peerId: number) {
      return client.get(`/api/clients/${peerId}`)
    },

    async downloadPeerConfig(peerId: number) {
      const res = await client.get(`/api/clients/${peerId}?format=conf`, {
        responseType: "text",
      })

      return res.data
    },

    async create(name: string) {
      return client.post(`/api/clients`, { name })
    },

    async changeEnable(peerId: number, enable: boolean) {
      return client.patch(`/api/clients/${peerId}`, { enable })
    },

    async delete(peerId: number) {
      return client.delete(`/api/clients/${peerId}`)
    },

    async getConfig(peerId: number) {
      return client.get(`/api/peer/${peerId}/config`, {
        responseType: "blob", // важно, чтобы axios воспринимал ответ как файл
        withCredentials: true, // чтобы cookie для авторизации передались
      })
    },

    async getQr(peerId: number) {
      return client.get(`/api/peer/${peerId}/qr`, {
        responseType: "blob",
        withCredentials: true,
      })
    },
  }
}
