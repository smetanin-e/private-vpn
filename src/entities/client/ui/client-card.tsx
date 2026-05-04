"use client"

import { Badge, Card, Label } from "@/src/shared/components/ui"
import { ChangePeerStatus } from "@/src/features/wg/ui/change-peer-status"
import { WgPeerStatus } from "@/generated/prisma/enums"
import { cn } from "@/src/shared/lib/utils"
import { ChangeFreeMode } from "@/src/features/wg/ui/change-free-mode"
import { formatTraffic } from "@/src/shared/lib/format-traffic"
import { CreditBalanceModal } from "@/src/features/client/ui/credit-balance-modal"
import { PeerActions } from "@/src/entities/wg-peer/ui"
import { useGetPeer } from "@/src/entities/wg-peer/hooks/use-get-peer"
import { LoadingBounce } from "@/src/shared/components"
import { formatDate } from "@/src/shared/lib/format-date"

type Props = {
  id: number
}

export function ClientCard({ id }: Props) {
  const { data: peer, isLoading, isError } = useGetPeer(id)
  // Показываем загрузку
  if (isLoading) {
    return (
      <Card className="relative h-35 border-slate-700 bg-slate-900/50 p-4 transition-colors hover:border-slate-600">
        <LoadingBounce />
      </Card>
    )
  }

  // Обрабатываем ошибку
  if (isError) {
    return (
      <Card className="mx-2 border-red-700 bg-red-900/50 p-4">
        <p className="text-center text-red-300">Ошибка загрузки данных пира</p>
      </Card>
    )
  }

  // Если данных нет
  if (!peer) {
    return (
      <Card className="mx-2 border-yellow-700 bg-yellow-900/50 p-4">
        <p className="text-center text-yellow-300">Пир не найден</p>
      </Card>
    )
  }
  return (
    <Card
      className={cn(
        "mx-2 border-slate-700 bg-slate-900/50 p-4 transition-colors hover:border-slate-600"
      )}
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          {/* Name  */}
          <div className="items-center gap-2 sm:flex">
            <p className="text-left font-medium sm:text-xl">
              {peer.client.name}
            </p>
            <span className="text-orange-400 sm:text-xl">
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
                ↓ {formatTraffic(peer.sendBytes)}
              </span>
              <span className="text-red-300">
                {" "}
                ↑ {formatTraffic(peer.receivedBytes)}
              </span>
            </p>
            <p className="text-xs">
              <span>Активность:</span>{" "}
              <span className="text-yellow-400">
                {peer.lastActivity
                  ? formatDate(peer.lastActivity)
                  : "Нет данных"}
              </span>
            </p>
            <p className="text-xs text-gray-400">
              Сервер:{" "}
              <span className="text-orange-400">
                {peer.wireguardServer!.name}
              </span>
            </p>
          </div>
        </div>
        {/*  Description */}
        <p className="text-left text-sm text-muted-foreground">
          {peer.client.description}
        </p>
      </div>

      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto]">
        {/* Balance */}
        <div className="flex items-center justify-center gap-3 md:justify-start">
          <div className="flex items-center gap-4 sm:w-30">
            <p className="text-muted-foreground">Баланс</p>
            <p className="text-lg font-semibold tabular-nums">
              {peer.client.balance.toLocaleString("ru-RU")} ₽
            </p>
          </div>
          <CreditBalanceModal clientId={peer.client.id} />
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-[auto_auto] sm:gap-4">
          {/* Toggles */}
          <div className="flex gap-4">
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
          <PeerActions id={peer.id} />
        </div>
      </div>
    </Card>
  )
}
