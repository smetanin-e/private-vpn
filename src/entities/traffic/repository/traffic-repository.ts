import { prisma } from "@/src/shared/lib/prisma"
import { convertMonthlyStats } from "../lib/convert-monthly-stats"
import { MonthlyStatsQueryType } from "../model/types"

export const trafficRepository = {
  async getAll(
    take?: number,
    skip?: number,
    peerId?: number
  ): Promise<MonthlyStatsQueryType[]> {
    const where: any = {}
    if (peerId) {
      where.peerId = peerId
    }

    const stats = await prisma.peerMonthlyStats.findMany({
      where,
      take,
      skip,
      orderBy: { month: "desc" },
    })

    if (!stats || stats.length === 0) return []
    return convertMonthlyStats(stats)
  },
}
