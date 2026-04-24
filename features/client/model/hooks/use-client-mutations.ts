import { toggleFreeModeAction } from "@/features/wg/actions/toggle-free-mode"
import { queryClient } from "@/shared/lib/query-client"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { creditBalanceAction } from "../../actions/credit-balance"

export const useClientMutations = () => {
  const toggleFreeMode = useMutation({
    mutationFn: toggleFreeModeAction,
    onSuccess: async (res) => {
      if (res.success) {
        await queryClient.invalidateQueries({ queryKey: ["peers"] })
        toast.success("Статус тарифа успешно изменен")
      } else {
        toast.error(res.message || "Ошибка при изменении статуса тарифа")
      }
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Не удалось изменить статус тарифа ❌"
      )
    },
  })

  const creditBalance = useMutation({
    mutationFn: creditBalanceAction,
    onSuccess: async (res) => {
      if (res.success) {
        await queryClient.invalidateQueries({ queryKey: ["peers"] })
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
    toggleFreeMode: {
      mutateAsync: toggleFreeMode.mutateAsync,
      isLoading: toggleFreeMode.isPending,
    },
    creditBalance,
  }
}
