"use client"

import { Badge, Card, Label } from "@/shared/components/ui"
import { WgLogo } from "@/shared/components"
import { DownloadConf } from "./download-conf"
import { Qr } from "./qr"
import { DeletePeer } from "@/features/wg/ui/delete-peer"
import { ChangePeerStatus } from "@/features/wg/ui/change-peer-status"
import { WgPeerStatus } from "@/generated/prisma/enums"
import { cn } from "@/shared/lib/utils"
import { ChangeFreeMode } from "@/features/wg/ui/change-free-mode"
import { formatTraffic } from "@/shared/lib/format-traffic"
import { CreditBalanceModal } from "@/features/client/ui/credit-balance-modal"
import { PeerQueryType } from "../model/types"

export function PeerCard({ peer }: { peer: PeerQueryType }) {
  return (
    <Card
      className={cn(
        peer.status === WgPeerStatus.ACTIVE
          ? "border-slate-700 bg-slate-900/50 hover:border-slate-600"
          : "border-slate-800 bg-slate-800/40 opacity-80",
        "p-4 transition-colors"
      )}
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          {/* Name  */}
          <div className="items-center gap-2 sm:flex">
            <p className="text-left font-medium">{peer.client.name}</p>
            <span className="text-xs text-orange-400">
              {peer.client.isFree
                ? `(Бесплатно)`
                : `(${peer.client.tariff} ₽/день)`}
            </span>
          </div>

          {/* Trafic */}
          <div>
            {" "}
            <p className="text-xs">
              <span className="text-green-300">
                ↓ {formatTraffic(peer.sentBytes)}
              </span>
              <span className="text-red-300">
                {" "}
                ↑ {formatTraffic(peer.receivedBytes)}
              </span>
            </p>
            <p className="text-xs text-gray-400">
              Сервер:{" "}
              <span className="text-orange-400">
                {peer.wireguardServer.name}
              </span>
            </p>
          </div>
        </div>
        {/*  Description */}
        <p className="text-left text-sm text-muted-foreground">
          {peer.client.description}
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_auto]">
        <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto_auto] md:gap-10">
          {/* UID */}
          <div className="flex items-center justify-center gap-2 rounded py-1.5 sm:justify-start">
            <WgLogo width={25} height={25} />

            <span className="text-lg text-muted-foreground">Client ID:</span>

            <code className="truncate font-mono text-lg">{peer.client.id}</code>
          </div>

          {/* Balance */}
          <div className="flex items-center justify-between gap-3 sm:justify-end md:justify-start">
            <div className="flex items-center gap-4 sm:w-30">
              <p className="text-xs text-muted-foreground">Баланс</p>
              <p className="text-lg font-semibold tabular-nums">
                {peer.client.balance.toLocaleString("ru-RU")} ₽
              </p>
            </div>
            <CreditBalanceModal clientId={peer.client.id} />
          </div>

          {/* Toggles */}
          <div className="flex gap-5 md:flex-col md:gap-2">
            <div className="flex items-center gap-2">
              <ChangeFreeMode id={peer.id} isFree={peer.client.isFree} />
              <Label htmlFor={`free-${peer.id}`}>
                <Badge variant={peer.client.isFree ? "success" : "destructive"}>
                  {peer.client.isFree ? "Бесплатный" : "Платный"}
                </Badge>
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <ChangePeerStatus id={peer.id} status={peer.status} />
              <Label htmlFor={`active-${peer.id}`}>
                <Badge
                  variant={
                    peer.status === WgPeerStatus.ACTIVE
                      ? "success"
                      : "destructive"
                  }
                >
                  {peer.status === WgPeerStatus.ACTIVE ? "Активен" : "Отключен"}
                </Badge>
              </Label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex w-full items-center justify-between gap-2 sm:justify-end">
            <DownloadConf peerId={peer.id} peerName={`vpn${peer.id}`} />
            <Qr dbPeerId={peer.id} peerName={`UID:${peer.id}`} />
            <DeletePeer peerId={peer.id} />
          </div>
        </div>
      </div>
    </Card>
  )
}
