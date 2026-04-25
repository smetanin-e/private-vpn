import { PeerQueryType } from "@/entities/wg-peer/model/types"
import { clientAxiosInstance } from "@/shared/service/instance"

interface FetchPeersParams {
  pageParam?: number // номер страницы для useInfiniteQuery
  search?: string //
}

export const fetchPeers = async ({
  pageParam = 0,
  search = "",
}: FetchPeersParams): Promise<{
  peers: PeerQueryType[]
  nextPage: number | undefined
}> => {
  try {
    const take = 5
    const skip = pageParam * take
    const params = new URLSearchParams()
    params.set("take", take.toString())
    params.set("skip", skip.toString())
    if (search.trim()) params.set("search", search.trim())
    const { data } = await clientAxiosInstance.get<PeerQueryType[]>(
      `/api/peer?${params.toString()}`
    )

    if (!data) {
      throw new Error("Ошибка при загрузке пиров")
    }

    const hasMore = data.length === take
    return {
      peers: data,
      nextPage: hasMore ? pageParam + 1 : undefined,
    }
  } catch (error) {
    console.error("[fetchPeers] failed", error)
    throw error
  }
}
