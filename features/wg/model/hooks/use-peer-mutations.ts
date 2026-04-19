import { useMutation } from "@tanstack/react-query"
import { createPeerAction } from "../../actions/create-peer-action"
import { queryClient } from "@/shared/lib/query-client"
import { toast } from "sonner"

export const usePeerMutations = () => {
  const createPeer = useMutation({
    mutationFn: createPeerAction,
    onSuccess: async (res) => {
      if (res.success) {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["peers"] }),
        ])
        toast.success("VPN успешно создан")
      } else {
        toast.error(res.message || "Ошибка при создании VPN")
      }
    },
  })

  return {
    createPeer,
  }
}
