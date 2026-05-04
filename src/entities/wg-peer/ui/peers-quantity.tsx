"use client"
import { ShieldCheck, ShieldMinus } from "lucide-react"
import React from "react"
import { PeersStats } from "../model/types"

interface Props {
  className?: string
  userId?: string
  isLoading: boolean
  stats: PeersStats[]
}

export const PeersQuantity: React.FC<Props> = ({ isLoading, stats }) => {
  if (isLoading) {
    return <div>загрузка...</div>
  }

  const peerStats = stats.reduce(
    (acc, curr) => ({
      active: acc.active + curr.active,
      disabled: acc.disabled + curr.disabled,
      total: acc.total + curr.total,
    }),
    { active: 0, disabled: 0, total: 0 }
  )

  return (
    <>
      <div className="ml-2 flex items-center space-x-1 text-green-300">
        <ShieldCheck className="h-4 w-4" />
        <p className="font-bold">{peerStats?.active}</p>
      </div>

      <div className="flex items-center space-x-1 text-red-400">
        <ShieldMinus className="h-4 w-4" />
        <p className="font-bold">{peerStats?.disabled}</p>
      </div>
    </>
  )
}
