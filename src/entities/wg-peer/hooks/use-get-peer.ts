import { useQuery } from "@tanstack/react-query"
import { PeerQueryType } from "../model/types"
import { clientAxiosInstance } from "@/src/shared/api/client"

export const useGetPeer = (id: number) => {
  return useQuery({
    queryKey: ["peer", id], // ← id в queryKey
    queryFn: async () => {
      try {
        const { data } = await clientAxiosInstance.get<PeerQueryType>(
          `/peer/${id}`
        )
        return data
      } catch (error) {
        console.error("[getPeerById] failed", error)
        throw error
      }
    },
    enabled: !!id, // ← не выполнять запрос, если id нет
  })
}
