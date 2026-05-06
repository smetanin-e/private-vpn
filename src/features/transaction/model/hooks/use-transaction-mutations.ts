import { useMutation } from "@tanstack/react-query"
import { topUpAction } from "../../actions/top-up.action.ts"
import { queryClient } from "@/src/shared/lib/query-client.js"
import { toast } from "sonner"

export const useTransactionMutations = () => {
  const topUp = useMutation({
    mutationFn: topUpAction,
    onSuccess: async (res) => {
      if (res.success) {
        Promise.all([
          await queryClient.invalidateQueries({ queryKey: ["peer"] }),
          await queryClient.invalidateQueries({ queryKey: ["transactions"] }),
        ])

        toast.success("Баланс успешно пополнен")
      } else {
        toast.error(res.message || "Ошибка при пополнении баланса")
      }
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Не удалось пополнить баланс ❌"
      )
    },
  })

  return {
    topUp,
  }
}
