import { toggleFreeModeAction } from "@/src/features/wg/actions/toggle-free-mode"
import { queryClient } from "@/src/shared/lib/query-client"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useClientMutations = () => {
  const toggleFreeMode = useMutation({
    mutationFn: toggleFreeModeAction,
    onSuccess: async (res) => {
      if (res.success) {
        Promise.all([
          await queryClient.invalidateQueries({ queryKey: ["peer"] }),
        ])

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

  return {
    toggleFreeMode: {
      mutateAsync: toggleFreeMode.mutateAsync,
      isLoading: toggleFreeMode.isPending,
    },
  }
}
