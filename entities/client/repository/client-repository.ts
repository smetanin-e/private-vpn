import { prisma } from "@/shared/lib/prisma"

export const clientRepository = {
  async createClient(name: string, description: string) {
    return prisma.client.create({
      data: {
        name,
        description,
      },
    })
  },

  async findClientById(clientId: number) {
    return prisma.client.findFirst({
      where: { id: clientId },
    })
  },
}
