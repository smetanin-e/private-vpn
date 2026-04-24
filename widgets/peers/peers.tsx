"use client"
import React from "react"
import { cn } from "@/shared/lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui"

import { PeerCard, SearchPeer } from "@/entities/wg-peer/ui"
import { CreatePeerModal } from "@/features/wg/ui/create-peer-modal"
import { useGetPeers, usePeersStats } from "@/entities/wg-peer/hooks"
import { EmptyData, LoadingBounce, ShowMore } from "@/shared/components"
import { PeersQuantity } from "@/entities/wg-peer/ui/peers-quantity"

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
  const { data: peerStats, isLoading } = usePeersStats()
  const stats = peerStats ?? []

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

            <div className="mb-4 flex-wrap space-y-4 text-sm sm:flex sm:items-center sm:justify-between sm:space-y-0 sm:space-x-6 md:flex-nowrap">
              <div className="flex space-x-6">
                Клиенты:
                <PeersQuantity isLoading={isLoading} stats={stats} />
              </div>

              <CreatePeerModal />
            </div>
            <SearchPeer
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
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
                  dbPeerId={peer.id}
                  clientId={peer.client.id}
                  status={peer.status}
                  isFree={peer.client.isFree}
                  tariff={peer.client.tariff}
                  received={peer.receivedBytes}
                  sent={peer.sentBytes}
                />
              ))}

              {hasNextPage && (
                <ShowMore
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                />
              )}
            </CardContent>
          )}
        </>
      )}
    </Card>
  )
}
