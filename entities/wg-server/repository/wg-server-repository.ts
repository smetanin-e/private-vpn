import { CreateServerType } from "@/features/wg-server/model/schemas/create-server-schema"
import { prisma } from "@/shared/lib/prisma"

export const wgServerRepository = {
  async getAllServers() {
    return prisma.wireguardServer.findMany()
  },

  async findById(id: number) {
    return prisma.wireguardServer.findUnique({
      where: { id },
    })
  },

  async createServer(data: CreateServerType) {
    return prisma.wireguardServer.create({
      data: {
        name: data.serverName,
        description: data.serverDescription,
        baseUrl: data.serverAddress,
        apiToken: data.apiToken,
      },
    })
  },
}
