import { useMutation } from "@tanstack/react-query"
import { createPeerAction } from "../../actions/create-peer-action"
import { queryClient } from "@/shared/lib/query-client"
import { toast } from "sonner"
import { deletePeerAction } from "../../actions/delete-peer"
import { togglePeerStatusAction } from "../../actions/toggle-status-peer"

export const usePeerMutations = () => {
  const createPeer = useMutation({
    mutationFn: createPeerAction,
    onSuccess: async (res) => {
      if (res.success) {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["peers"] }),
          queryClient.invalidateQueries({ queryKey: ["peers-stats"] }),
        ])
        toast.success("VPN успешно создан")
      } else {
        toast.error(res.message || "Ошибка при создании VPN")
      }
    },
  })

  const togglePeerStatus = useMutation({
    mutationFn: togglePeerStatusAction,
    onSuccess: async (res) => {
      if (res.success) {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["peers"] }),
          queryClient.invalidateQueries({ queryKey: ["peers-stats"] }),
        ])
      } else {
        toast.error(res.message || "Ошибка при изменении статуса")
      }
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Не удалось изменить статус конфигурации ❌"
      )
    },
  })

  const deletePeer = useMutation({
    mutationFn: deletePeerAction,
    onSuccess: async (res) => {
      if (res.success) {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["peers"] }),
          queryClient.invalidateQueries({ queryKey: ["peers-stats"] }),
        ])
        toast.success("VPN успешно удален")
      } else {
        toast.error(res.message || "Ошибка при удалении конфигурации VPN")
      }
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Не удалось удалить конфигурацию VPN ❌"
      )
    },
  })

  return {
    createPeer,
    togglePeerStatus: {
      mutateAsync: togglePeerStatus.mutateAsync,
      isLoading: togglePeerStatus.isPending,
    },
    deletePeer: {
      isLoading: deletePeer.isPending,
      mutateAsync: deletePeer.mutateAsync,
    },
  }
}
