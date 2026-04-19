import { peerApi } from "@/features/wg/api"
import { WireGuardPeerResponse } from "@/features/wg/model/types"
import { normalizeWgConfig } from "../lib/normalize-config"
import { prisma } from "@/shared/lib/prisma"
import { WgPeerStatus } from "@/generated/prisma/enums"

export const peerRepository = {
  async createPeerOnWgServer(
    name: string
  ): Promise<WireGuardPeerResponse | null> {
    try {
      const res = await peerApi.create(name)
      return res.data
    } catch (error) {
      console.error("[createPeerOnWgServer] Server error", error)
      return null
    }
  },

  // Получаем конфиг напрямую из wg-rest-api
  async getWgServerPeerConfig(peerId: number): Promise<string | null> {
    try {
      const res = await peerApi.downloadPeerConfig(peerId)
      return normalizeWgConfig(res.data)
    } catch (error) {
      console.error("[getWgServerPeerConfig] Server error", error)
      return null
    }
  },

  //добавляем пир из wg-rest-api в базу данных
  async createPeerDb(
    clientId: number,
    peerName: string,
    peerId: number,
    publicKey: string,
    privateKey: string,
    address: string
  ) {
    return prisma.wireguardPeer.create({
      data: {
        clientId,
        peerName,
        publicKey,
        privateKey,
        address,
        id: peerId,
        status: WgPeerStatus.ACTIVE,
        isEnabled: true,
      },
    })
  },
}
