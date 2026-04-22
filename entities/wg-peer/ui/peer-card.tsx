"use client"

import { Plus } from "lucide-react"
import { Badge, Button, Card, Label } from "@/shared/components/ui"
import { WgLogo } from "@/shared/components"
import { DownloadConf } from "./download-conf"
import { Qr } from "./qr"
import { DeletePeer } from "@/features/wg/ui/delete-peer"
import { ChangePeerStatus } from "@/features/wg/ui/change-peer-status"
import { WgPeerStatus } from "@/generated/prisma/enums"
import { cn } from "@/shared/lib/utils"
import { ChangeFreeMode } from "@/features/wg/ui/change-free-mode"

interface ClientCardProps {
  name: string
  description: string
  uid: number
  balance: number
  status: WgPeerStatus
  isFree: boolean
}

export function PeerCard({
  name,
  description,
  uid,
  balance,
  status,
  isFree,
}: ClientCardProps) {
  return (
    <Card
      className={cn(
        status === WgPeerStatus.ACTIVE
          ? "border-slate-700 bg-slate-900/50 hover:border-slate-600"
          : "border-slate-800 bg-slate-800/40 opacity-80",
        "p-4 transition-colors"
      )}
    >
      <div>
        <div className="flex justify-between gap-4">
          {/* Name  */}
          <p className="text-left font-medium">{name}</p>
          {/* Trafic */}
          <p>⬇️ 0.11 Гб ⬆️ 0.50 Гб</p>
        </div>
        {/*  Description */}
        <p className="text-left text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="grid md:grid-cols-[1fr_auto]">
        <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto_auto] md:gap-10">
          {/* UID */}
          <div className="flex items-center justify-center gap-2 rounded py-1.5 sm:justify-start">
            <WgLogo width={25} height={25} />
            <span className="text-lg text-muted-foreground">UID:</span>
            <code className="truncate font-mono text-lg">{uid}</code>
          </div>

          {/* Balance */}
          <div className="flex items-center justify-between gap-3 sm:justify-end md:justify-start">
            <div className="flex items-center gap-4 sm:w-30">
              <p className="text-xs text-muted-foreground">Баланс</p>
              <p className="text-lg font-semibold tabular-nums">
                {balance.toLocaleString("ru-RU")} ₽
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => alert("Пополнение баланса в разработке")}
            >
              <Plus className="size-4" />
              Пополнить
            </Button>
          </div>

          {/* Toggles */}
          <div className="flex gap-5 md:flex-col md:gap-2">
            <div className="flex items-center gap-2">
              <ChangeFreeMode id={uid} isFree={isFree} />
              <Label htmlFor={`free-${uid}`}>
                <Badge variant={isFree ? "success" : "destructive"}>
                  {isFree ? "Бесплатный" : "Платный"}
                </Badge>
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <ChangePeerStatus id={uid} status={status} />
              <Label htmlFor={`active-${uid}`}>
                <Badge
                  variant={
                    status === WgPeerStatus.ACTIVE ? "success" : "destructive"
                  }
                >
                  {status === WgPeerStatus.ACTIVE ? "Активен" : "Отключен"}
                </Badge>
              </Label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex w-full items-center justify-between gap-2 sm:justify-end">
            <DownloadConf peerId={uid} peerName={`vpn${uid}`} />
            <Qr peerId={uid} peerName={`UID:${uid}`} />
            <DeletePeer peerId={uid} />
          </div>
        </div>
      </div>
    </Card>
  )
}
