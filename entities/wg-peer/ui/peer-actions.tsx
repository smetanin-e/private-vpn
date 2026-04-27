import { DeletePeer } from "@/features/wg/ui/delete-peer"
import { DownloadConf } from "./download-conf"
import { Qr } from "./qr"

type Props = {
  id: number
}

export function PeerActions({ id }: Props) {
  return (
    <div className="flex w-full items-center justify-between gap-2 sm:justify-end">
      <DownloadConf peerId={id} peerName={`vpn${id}`} />
      <Qr dbPeerId={id} peerName={`UID:${id}`} />
      <DeletePeer peerId={id} />
    </div>
  )
}
