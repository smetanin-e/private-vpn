"use client"
import React from "react"
import { cn } from "@/src/shared/lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/shared/components/ui"

import { PeerCard, SearchPeer } from "@/src/entities/wg-peer/ui"
import { CreatePeerModal } from "@/src/features/wg/ui/create-peer-modal"
import { useGetPeers, usePeersStats } from "@/src/entities/wg-peer/hooks"
import { EmptyData, LoadingBounce, ShowMore } from "@/src/shared/components"
import { PeersQuantity } from "@/src/entities/wg-peer/ui/peers-quantity"
import { CreateWgServerModal } from "@/src/features/wg-server/ui/create-server-modal"
import { useSearchParams } from "next/navigation"
import {
  PeerSort,
  SortField,
  SortOrder,
} from "@/src/entities/wg-peer/ui/peer-sort"

interface Props {
  className?: string
}

export const Peers: React.FC<Props> = () => {
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = React.useState(
    searchParams.get("search") || ""
  )

  // Состояния сортировки
  const [sortField, setSortField] = React.useState<SortField>("sendBytes")
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("desc")

  const {
    data,
    status,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetPeers(searchValue, sortField, sortOrder)

  const peers = React.useMemo(() => {
    if (!data?.pages) return []

    const uniqueMap = new Map()
    data.pages.forEach((page) => {
      page.peers.forEach((peer) => {
        if (!uniqueMap.has(peer.id)) {
          uniqueMap.set(peer.id, peer)
        }
      })
    })

    return Array.from(uniqueMap.values())
  }, [data])

  const { data: peerStats, isLoading } = usePeersStats()
  const stats = peerStats ?? []

  const handleSort = (field: SortField, order: SortOrder) => {
    setSortField(field)
    setSortOrder(order)
  }

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
      <CardHeader>
        <CardTitle className="flex justify-between">
          <h2>Профили клиентов WireGuard</h2>
          <div className="flex flex-col items-end gap-2">
            <CreatePeerModal />
            <CreateWgServerModal />
          </div>
        </CardTitle>

        <div className="mb-4 flex space-x-6">
          Клиенты:
          <PeersQuantity isLoading={isLoading} stats={stats} />
        </div>

        <SearchPeer
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          searchParams={searchParams}
        />
      </CardHeader>

      <CardContent className="space-y-2 p-1">
        {status === "pending" && peers.length === 0 ? (
          <LoadingBounce />
        ) : peers.length === 0 ? (
          <EmptyData text="Нет конфигураций" />
        ) : (
          <>
            <div className="text-right">
              <PeerSort
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
              />
            </div>

            {peers.map((peer) => (
              <PeerCard key={peer.id} peer={peer} />
            ))}

            {hasNextPage && (
              <ShowMore
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              />
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
