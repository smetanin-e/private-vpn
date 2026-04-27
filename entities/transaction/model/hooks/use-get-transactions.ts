import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchTransactions } from "../../api/fetch-transactions"
import { useDebounce } from "@reactuses/core"
import React from "react"

export const useGetTransactions = (search?: string, clientId?: number) => {
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
    queryKey: ["transactions", debouncedSearch, clientId],
    queryFn: ({ pageParam = 0 }) =>
      fetchTransactions({ pageParam, search: debouncedSearch, clientId }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  })
}
