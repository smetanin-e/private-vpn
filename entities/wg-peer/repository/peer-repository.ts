import { normalizeWgConfig } from "../lib/normalize-config"
import { prisma } from "@/shared/lib/prisma"
import { WgPeerStatus } from "@/generated/prisma/enums"
import { PeerApiType } from "@/features/wg/api/create-peer-api"
import { PeerQueryType } from "../model/types"

const basePeerSelect = {
  id: true,
  peerName: true,
  wgPeerId: true,
  status: true,
  receivedBytes: true,
  sentBytes: true,
  wireguardServer: {
    select: {
      name: true,
    },
  },
  client: {
    select: {
      id: true,
      name: true,
      description: true,
      balance: true,
      isFree: true,
      tariff: true,
      accessTokenId: true,
    },
  },
}

export const peerRepository = {
  // Получаем конфиг напрямую из wg-rest-api
  async getWgServerPeerConfig(
    peerApiInstance: PeerApiType,
    peerId: number
  ): Promise<string | null> {
    try {
      const config = await peerApiInstance.downloadPeerConfig(peerId)
      return normalizeWgConfig(config)
    } catch (error) {
      console.error("[getWgServerPeerConfig] Server error", error)
      return null
    }
  },

  //добавляем пир из wg-rest-api в базу данных
  async createPeerDb(
    clientId: number,
    wireguardServerId: number,
    peerName: string,
    wgPeerId: number,
    publicKey: string,
    privateKey: string,
    address: string
  ) {
    return prisma.wireguardPeer.create({
      data: {
        clientId,
        wireguardServerId,
        peerName,
        publicKey,
        privateKey,
        address,
        wgPeerId,
        status: WgPeerStatus.ACTIVE,
      },
    })
  },

  // Поиск пира по id из БД
  async findPeerById(peerId: number) {
    return prisma.wireguardPeer.findFirst({
      where: { id: peerId },
      include: {
        wireguardServer: true,
      },
    })
  },
  // id: number
  //   wgPeerId: number
  //   peerName: string
  //   status: WgPeerStatus
  //   receivedBytes: number
  //   sentBytes: number
  //   client: Pick<
  //     Client,
  //     | "id"
  //     | "name"
  //     | "description"
  //     | "isFree"
  //     | "balance"
  //     | "tariff"
  //     | "accessTokenId"
  //   >
  //   wireguardServer: Pick<WireguardServer, "name">

  // Поиск пира по id из БД c клиентом и сервером
  async findPeerByIdWithRelations(
    peerId: number
  ): Promise<PeerQueryType | null> {
    return prisma.wireguardPeer.findUnique({
      where: { id: peerId },
      select: basePeerSelect,
    })
  },

  // Поиск пира по id из WG REST API (wgPeerId)
  async findPeerByWgId(wgPeerId: number) {
    return prisma.wireguardPeer.findFirst({
      where: { wgPeerId },
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
            OR: [
              {
                client: {
                  name: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              },
              {
                client: {
                  description: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              },
              // поиск по id (только если search — число)
              ...(Number.isNaN(Number(search))
                ? []
                : [
                    {
                      client: {
                        id: Number(search),
                      },
                    },
                  ]),
            ],
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
