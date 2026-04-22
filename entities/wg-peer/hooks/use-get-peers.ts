import { useInfiniteQuery } from "@tanstack/react-query"
import { useDebounce } from "@reactuses/core"
import React from "react"
import { fetchPeers } from "@/features/wg/api/fetch-peers"

export const useGetPeers = (search?: string) => {
  const [debouncedSearch, setDebouncedSearch] = React.useState(search)

  // Делаем debounce на входной строке
  useDebounce(
    () => {
      setDebouncedSearch(search)
    },
    1000,
    [search]
  )
  return useInfiniteQuery({
    queryKey: ["peers", debouncedSearch],
    queryFn: ({ pageParam = 0 }) =>
      fetchPeers({ pageParam, search: debouncedSearch }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  })
}
