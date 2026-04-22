import { PeersStats } from "@/entities/wg-peer/model/types"
import { wgInstance } from "@/features/wg/api/wg-instance"
import { clientAxiosInstance } from "@/shared/service/instance"

export const peerApi = {
  async getConfigById(peerId: number) {
    return wgInstance.get(`/api/clients/${peerId}`)
  },

  async downloadPeerConfig(peerId: number) {
    return wgInstance.get(`/api/clients/${peerId}?format=conf`, {
      responseType: "text",
    })
  },

  async create(name: string) {
    return wgInstance.post(`/api/clients`, { name })
  },

  async changeEnable(peerId: number, enable: boolean) {
    return wgInstance.patch(`/api/clients/${peerId}`, { enable })
  },

  async changeManyEnable(peerIds: number[], enable: boolean) {
    return Promise.all(
      peerIds.map((peerId) =>
        wgInstance.patch(`/api/clients/${peerId}`, { enable })
      )
    )
  },

  async deactivateMany(peerIds: number[]) {
    return Promise.all(
      peerIds.map((peerId) =>
        wgInstance.patch(`/api/clients/${peerId}`, { enable: false })
      )
    )
  },

  async activateMany(peerIds: number[]) {
    return Promise.all(
      peerIds.map((peerId) =>
        wgInstance.patch(`/api/clients/${peerId}`, { enable: true })
      )
    )
  },

  async delete(peerId: number) {
    return wgInstance.delete(`/api/clients/${peerId}`)
  },

  async deleteMany(peerIds: number[]) {
    return Promise.all(
      peerIds.map((peerId) => wgInstance.delete(`/api/clients/${peerId}`))
    )
  },

  async getConfig(peerId: number) {
    return wgInstance.get(`/api/peer/${peerId}/config`, {
      responseType: "blob", // важно, чтобы axios воспринимал ответ как файл
      withCredentials: true, // чтобы cookie для авторизации передались
    })
  },

  async getQr(peerId: number) {
    return wgInstance.get(`/api/peer/${peerId}/qr`, {
      responseType: "blob",
      withCredentials: true,
    })
  },

  async getPeerCounts() {
    try {
      const { data } = await clientAxiosInstance.get("/api/peer/stats/")
      return data as PeersStats[]
    } catch (error) {
      console.error("[getPeerCounts] failed", error)
      throw error
    }
  },
}
