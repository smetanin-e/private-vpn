'use client"'
import { CardHeader, CardTitle } from "@/shared/components/ui"
import { PeersQuantity } from "./peers-quantity"
import { CreatePeerModal } from "@/features/wg/ui/create-peer-modal"
import { SearchPeer } from "./search-peer"
import { usePeersStats } from "../hooks"

type Props = {
  searchValue: string
  setSearchValue: (value: string) => void
}

export function PeerCardHeader({ searchValue, setSearchValue }: Props) {
  const { data: peerStats, isLoading } = usePeersStats()
  const stats = peerStats ?? []
  return (
    <CardHeader className="mb-0 pb-0">
      <CardTitle>Профили клиентов WireGuard</CardTitle>

      <div className="mb-4 flex-wrap space-y-4 text-sm sm:flex sm:items-center sm:justify-between sm:space-y-0 sm:space-x-6 md:flex-nowrap">
        <div className="flex space-x-6">
          Клиенты:
          <PeersQuantity isLoading={isLoading} stats={stats} />
        </div>

        <CreatePeerModal />
      </div>
      <SearchPeer searchValue={searchValue} setSearchValue={setSearchValue} />
    </CardHeader>
  )
}
