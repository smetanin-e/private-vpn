export type MonthlyStatsQueryType = {
  id: number
  month: Date | string // Prisma возвращает Date
  peerId: number
  receivedBytes: number
  sendBytes: number
}

export type MonthlyStatsQueryTypeWithBigInt = {
  id: number
  month: Date
  peerId: number
  receivedBytes: bigint
  sendBytes: bigint
}
