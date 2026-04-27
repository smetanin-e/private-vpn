import { ClientCard } from "@/entities/client/ui/client-card"
import { ClientLink } from "@/entities/client/ui/client-link"
import { peerRepository } from "@/entities/wg-peer/repository/peer-repository"
import { WgLogo } from "@/shared/components"
import { Button } from "@/shared/components/ui"
import { Transactions } from "@/widgets/transactions/transactions"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function PeerPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  //TODO переделать получение пира через mutation
  const peer = await peerRepository.findPeerByIdWithRelations(Number(id))

  if (!peer) {
    //TODO ДОБАВИТЬ NOTFOUND PAGE
    return <div>Invalid link</div>
  }

  return (
    <div className="flex min-h-screen flex-col gap-4 bg-linear-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="flex items-center justify-center gap-2 rounded px-2 pt-4">
        <WgLogo width={25} height={25} />

        <span className="text-lg text-muted-foreground">Client ID: </span>
        <code className="truncate font-mono text-lg">{peer.client.id}</code>
      </div>
      <div className="mx-2 flex justify-between">
        <Link href={"/dashboard"}>
          {" "}
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4" />
            На главную
          </Button>
        </Link>

        <ClientLink id={peer.client.id} tokenId={!!peer.client.accessTokenId} />
      </div>

      <ClientCard id={peer.id} />
      <Transactions clientId={peer.client.id} />
    </div>
  )
}
