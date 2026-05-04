import { useInfiniteQuery } from "@tanstack/react-query"
import { useDebounce } from "@reactuses/core"
import React from "react"
import { fetchPeers } from "@/src/features/wg/api/fetch-peers"
import { SortField, SortOrder } from "../ui/peer-sort"

export const useGetPeers = (
  search?: string,
  sortField: SortField = "sendBytes",
  sortOrder: SortOrder = "desc"
) => {
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
    queryKey: ["peers", debouncedSearch, sortField, sortOrder],
    queryFn: ({ pageParam = 0 }) =>
      fetchPeers({ pageParam, search: debouncedSearch, sortField, sortOrder }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  })
}
