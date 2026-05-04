"use client"
import { AlertDialog } from "@/src/shared/components"
import { Button } from "@/src/shared/components/ui"
import { Trash2 } from "lucide-react"
import React from "react"
import { usePeerMutations } from "../model/hooks/use-peer-mutations"

interface Props {
  className?: string
  peerId: number
}

export const DeletePeer: React.FC<Props> = ({ peerId }) => {
  const { deletePeer } = usePeerMutations()

  const handleDelete = async () => {
    try {
      await deletePeer.mutateAsync(peerId)
    } catch (error) {
      console.error("Failed to delete peer", error)
    }
  }
  return (
    <>
      <AlertDialog
        trigger={
          <Button
            size={"icon"}
            variant="outline"
            className="flex-1 gap-2 text-red-400 hover:text-red-300 sm:flex-none sm:gap-0"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sm:hidden">Удалить</span>
          </Button>
        }
        description={`Вы действительно хотите удалить конфигурацию VPN? UID: ${peerId}`}
        onConfirm={handleDelete}
      />
    </>
  )
}
