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
