import { useQuery } from "@tanstack/react-query"
import { clientAxiosInstance } from "@/src/shared/service/instance"
import { PeerQueryType } from "../model/types"

export const useGetPeer = (id: number) => {
  return useQuery({
    queryKey: ["peer", id], // ← id в queryKey
    queryFn: async () => {
      try {
        const { data } = await clientAxiosInstance.get<PeerQueryType>(
          `/api/peer/${id}`
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
