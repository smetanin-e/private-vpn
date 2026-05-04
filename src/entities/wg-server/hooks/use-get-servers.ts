import { useQuery } from "@tanstack/react-query"

import { WireguardServer } from "@/generated/prisma/client"
import { clientAxiosInstance } from "@/src/shared/service/instance"

export const useGetServers = () => {
  return useQuery<WireguardServer[]>({
    queryKey: ["wg-servers"],
    queryFn: async () => {
      return (
        await clientAxiosInstance.get<WireguardServer[]>("/api/wg-server")
      ).data
    },
  })
}
