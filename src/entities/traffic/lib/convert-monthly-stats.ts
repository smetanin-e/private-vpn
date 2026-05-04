import {
  MonthlyStatsQueryType,
  MonthlyStatsQueryTypeWithBigInt,
} from "../model/types"

export function convertMonthlyStats(
  stats: MonthlyStatsQueryTypeWithBigInt[]
): MonthlyStatsQueryType[] {
  return stats.map((stat) => ({
    id: stat.id,
    peerId: stat.peerId,
    month: stat.month,
    receivedBytes: Number(stat.receivedBytes), // BigInt -> number
    sendBytes: Number(stat.sendBytes), // BigInt -> number
  }))
}
