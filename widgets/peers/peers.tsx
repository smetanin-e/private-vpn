"use client"
import React from "react"
import { cn } from "@/shared/lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui"

import { PeerCard } from "@/entities/wg-peer/ui"
import { CreatePeerModal } from "@/features/wg/ui/create-peer-modal"
import { useGetPeers } from "@/entities/wg-peer/hooks"
import { EmptyData, LoadingBounce } from "@/shared/components"

interface Props {
  className?: string
}

export const Peers: React.FC<Props> = () => {
  const [searchValue, setSearchValue] = React.useState("")
  const {
    data,
    status,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetPeers(searchValue)

  const peers = data?.pages.flatMap((page) => page.peers) ?? []

  if (status === "error") {
    return (
      <div className="p-4 text-red-500">
        Ошибка:{" "}
        {error instanceof Error
          ? error.message
          : "Не удалось получить список пиров ❌"}
      </div>
    )
  }
  return (
    <Card
      className={cn(
        "relative min-h-80 max-w-full border-blue-600 bg-slate-800/50 backdrop-blur-sm"
      )}
    >
      {status === "pending" ? (
        <LoadingBounce />
      ) : (
        <>
          <CardHeader className="mb-0 pb-0">
            <CardTitle>Профили клиентов WireGuard</CardTitle>
            <div className="flex-wrap space-y-4 text-sm sm:flex sm:items-center sm:justify-between sm:space-y-0 sm:space-x-6 md:flex-nowrap">
              <div className="flex space-x-6">
                Тут будет общее количество и поиск
              </div>
              <CreatePeerModal />
            </div>
          </CardHeader>
          {peers.length === 0 ? (
            <EmptyData text="Нет конфигураций" />
          ) : (
            <CardContent className="space-y-2 p-1">
              {peers.map((peer) => (
                <PeerCard
                  key={peer.id}
                  name={peer.client.name}
                  description={peer.client.description}
                  balance={peer.client.balance}
                  uid={peer.id}
                />
              ))}
            </CardContent>
          )}
        </>
      )}
    </Card>
  )
}
