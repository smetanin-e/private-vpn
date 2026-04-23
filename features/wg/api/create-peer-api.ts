import { WireguardServer } from "@/generated/prisma/client"
import { createWgClient } from "./create-wg-client"

export function createPeerApi(server: WireguardServer) {
  const client = createWgClient(server)

  return {
    async getConfigById(peerId: number) {
      return client.get(`/api/clients/${peerId}`)
    },

    async downloadPeerConfig(peerId: number) {
      return client.get(`/api/clients/${peerId}?format=conf`, {
        responseType: "text",
      })
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
