"use client"

import { WgPeerStatus } from "@/generated/prisma/enums"
import { Switch } from "@/shared/components/ui"

import React from "react"
import { usePeerMutations } from "../model/hooks/use-peer-mutations"
import { cn } from "@/shared/lib/utils"

interface Props {
  className?: string
  id: number
  status: WgPeerStatus
}

export const ChangePeerStatus: React.FC<Props> = ({ id, status }) => {
  const { togglePeerStatus } = usePeerMutations()
  const handleToggle = async (id: number) => {
    try {
      await togglePeerStatus.mutateAsync(id)
    } catch (error) {
      console.error("Failed to toggle peer status", error)
    }
  }
  return (
    <Switch
      disabled={togglePeerStatus.isLoading}
      checked={status === WgPeerStatus.ACTIVE}
      onCheckedChange={() => handleToggle(id)}
      className={cn(
        "data-[state=checked]:bg-teal-500",
        "data-[state=unchecked]:bg-gray-400"
      )}
    />
  )
}
