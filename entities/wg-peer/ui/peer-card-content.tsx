import { EmptyData, ShowMore } from "@/shared/components"
import { useGetPeers } from "../hooks"
import { CardContent } from "@/shared/components/ui"
import { PeerCard } from "./peer-card"

type Props = {
  searchValue: string
}

export function PeerCardContent({ searchValue }: Props) {
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
    <>
      {peers.length === 0 ? (
        <EmptyData text="Нет конфигураций" />
      ) : (
        <CardContent className="space-y-2 p-1">
          {peers.map((peer) => (
            <PeerCard key={peer.id} peer={peer} />
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
  )
}
