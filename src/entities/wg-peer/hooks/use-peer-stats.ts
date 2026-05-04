import { useQuery } from "@tanstack/react-query"
import { PeersStats } from "../model/types"
import { clientAxiosInstance } from "@/src/shared/service/instance"

export const usePeersStats = () => {
  const placeholderStats: PeersStats[] = [
    {
      userId: 0,
      active: 0,
      disabled: 0,
      total: 0,
    },
  ]
  const query = useQuery({
    queryKey: ["peers-stats"],
    queryFn: async () => {
      try {
        const { data } = await clientAxiosInstance.get("/api/peer/stats/")
        return data as PeersStats[]
      } catch (error) {
        console.error("[getPeerCounts] failed", error)
        throw error
      }
    },
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 минут
    placeholderData: placeholderStats,
  })

  return {
    ...query,
    peerStats: query.data ?? [],
  }
}
