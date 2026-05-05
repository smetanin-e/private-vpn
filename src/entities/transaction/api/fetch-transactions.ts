import { clientAxiosInstance } from "@/src/shared/api/client"
import { TransactionDTO } from "../model/types"

interface FetchTransactionsParams {
  pageParam?: number
  search?: string
  clientId?: number
}

export const fetchTransactions = async ({
  pageParam = 0,
  search = "",
  clientId,
}: FetchTransactionsParams): Promise<{
  transactions: TransactionDTO[]
  nextPage: number | undefined
}> => {
  const take = 10
  const skip = pageParam * take
  const params = new URLSearchParams()
  params.set("take", take.toString())
  params.set("skip", skip.toString())
  if (search.trim()) params.set("search", search.trim())
  if (clientId) params.set("clientId", clientId.toString())

  const { data } = await clientAxiosInstance.get<TransactionDTO[]>(
    `/transactions?${params.toString()}`
  )

  const hasMore = data.length === take
  return {
    transactions: data,
    nextPage: hasMore ? pageParam + 1 : undefined,
  }
}
