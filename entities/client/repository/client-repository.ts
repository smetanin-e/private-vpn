import { WgPeerStatus } from "@/generated/prisma/enums"
import { prisma } from "@/shared/lib/prisma"

export const clientRepository = {
  async createClient(name: string, description: string, tariff: number) {
    return prisma.client.create({
      data: {
        name,
        description,
        tariff,
      },
    })
  },

  async findClientById(clientId: number) {
    return prisma.client.findFirst({
      where: { id: clientId },
    })
  },

  async findClienWithRelations(clientId: number) {
    return prisma.client.findFirst({
      where: { id: clientId },
      select: {
        id: true,
        name: true,
        description: true,
        tariff: true,
        balance: true,
        peer: {
          select: {
            id: true,
            wgPeerId: true,
            status: true,
            wireguardServer: true,
          },
        },
      },
    })
  },

  async findClientsForPayment() {
    return prisma.client.findMany({
      where: {
        isFree: false,
      },
      include: {
        peer: {
          where: { status: WgPeerStatus.ACTIVE },
          select: {
            id: true,
            wgPeerId: true,
            status: true,
            wireguardServer: true,
          },
        },
      },
    })
  },

  async deleteClient(clientId: number) {
    return prisma.client.delete({
      where: { id: clientId },
    })
  },

  async updateFreeMode(clientId: number, isFree: boolean) {
    return prisma.client.update({
      where: { id: clientId },
      data: { isFree: isFree },
    })
  },

  async updateBalance(clientId: number, newBalance: number) {
    return prisma.client.update({
      where: { id: clientId },
      data: { balance: newBalance },
    })
  },
}
