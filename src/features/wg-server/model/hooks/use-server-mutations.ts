import { useMutation } from "@tanstack/react-query"
import { queryClient } from "@/src/shared/lib/query-client"
import { toast } from "sonner"
import { createWgServerAction } from "../../actions/create-server-action"

export const useWgServerMutations = () => {
  const createServer = useMutation({
    mutationFn: createWgServerAction,
    onSuccess: async (res) => {
      if (res.success) {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["wg-servers"] }),
        ])
        toast.success("VPN сервер успешно добавлен")
      } else {
        toast.error(res.message || "Ошибка при добавлении VPN сервера")
      }
    },
  })

  return {
    createServer,
  }
}
