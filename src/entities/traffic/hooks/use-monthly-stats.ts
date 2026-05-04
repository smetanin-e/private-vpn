import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchMonthlyStats } from "@/src/features/traffic/api/fetch-monthly-stats"

export const useMonthlyStats = (peerId?: number) => {
  return useInfiniteQuery({
    queryKey: ["monthly-stats", peerId],
    queryFn: ({ pageParam = 0 }) =>
      fetchMonthlyStats({
        take: 10,
        skip: pageParam * 10,
        peerId,
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length : undefined
    },
    initialPageParam: 0,
  })
}
