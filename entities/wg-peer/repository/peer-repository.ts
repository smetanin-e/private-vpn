import { peerApi } from "@/features/wg/api"
import { WireGuardPeerResponse } from "@/features/wg/model/types"
import { normalizeWgConfig } from "../lib/normalize-config"
import { prisma } from "@/shared/lib/prisma"
import { WgPeerStatus } from "@/generated/prisma/enums"

const basePeerSelect = {
  id: true,
  peerName: true,
  status: true,
  client: {
    select: {
      id: true,
      name: true,
      description: true,
      balance: true,
      is_free: true,
    },
  },
}

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
      },
    })
  },

  // Поиск пира по id
  async findPeerById(peerId: number) {
    return prisma.wireguardPeer.findFirst({
      where: { id: peerId },
    })
  },

  //Удаляем пир
  async deletePeer(peerId: number) {
    return prisma.wireguardPeer.delete({
      where: { id: peerId },
    })
  },

  //Получаем пиры из БД по поиску (имя)
  async getAllPeersFiltered(search: string, take?: number, skip?: number) {
    return prisma.wireguardPeer.findMany({
      where: search
        ? {
            client: {
              name: { contains: search, mode: "insensitive" },
            },
          }
        : {},
      select: basePeerSelect,
      orderBy: { createdAt: "desc" },
      take,
      skip,
    })
  },

  async countAllUsers() {
    const peers = await prisma.wireguardPeer.groupBy({
      by: ["id", "status"],
      _count: { _all: true },
    })

    const result = peers.reduce((acc, p) => {
      const existing = acc.get(p.id) || { active: 0, disabled: 0, total: 0 }

      if (p.status === WgPeerStatus.ACTIVE) {
        existing.active += p._count._all
      } else {
        existing.disabled += p._count._all
      }

      existing.total += p._count._all
      acc.set(p.id, existing)

      return acc
    }, new Map<number, { active: number; disabled: number; total: number }>())

    return Array.from(result.entries()).map(([userId, stats]) => ({
      userId,
      ...stats,
    }))
  },

  // обновление статуса пира по id
  async updatePeerStatus(peerId: number, value: boolean) {
    const status = value ? WgPeerStatus.ACTIVE : WgPeerStatus.INACTIVE
    return prisma.wireguardPeer.update({
      where: { id: peerId },
      data: {
        status,
      },
    })
  },
}
