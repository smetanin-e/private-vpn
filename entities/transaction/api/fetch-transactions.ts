import { clientAxiosInstance } from "@/shared/service/instance"
import { TransactionDTO } from "../model/types"

interface FetchTransactionsParams {
  pageParam?: number // номер страницы для useInfiniteQuery
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
    `/api/transaction?${params.toString()}`
  )

  if (!data) {
    throw new Error("Ошибка при загрузке транзакций")
  }

  const hasMore = data.length === take
  return {
    transactions: data,
    nextPage: hasMore ? pageParam + 1 : undefined,
  }
}
