import { PeerMonthlyStats } from "@/generated/prisma/client"
import { clientAxiosInstance } from "@/src/shared/service/instance"

interface FetchMonthlyStatsParams {
  take?: number
  skip?: number
  peerId?: number
}

export const fetchMonthlyStats = async ({
  take = 3,
  skip = 0,
  peerId,
}: FetchMonthlyStatsParams): Promise<PeerMonthlyStats[]> => {
  try {
    const params = new URLSearchParams()
    params.set("take", take.toString())
    params.set("skip", skip.toString())
    if (peerId) params.set("peerId", peerId.toString())

    const { data } = await clientAxiosInstance.get<PeerMonthlyStats[]>(
      `/api/traffic/monthly-stats?${params.toString()}`
    )

    return data
  } catch (error) {
    console.error("[fetchMonthlyStats] failed", error)
    throw error
  }
}
