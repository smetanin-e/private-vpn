"use client"

import { useState } from "react"
import { Download, QrCode, Trash2, Plus } from "lucide-react"
import { Badge, Button, Card, Label, Switch } from "@/shared/components/ui"
import { WgLogo } from "@/shared/components"

interface ClientCardProps {
  name: string
  description: string
  uid: string
  balance: number
  isPaid?: boolean
  isActive?: boolean
  onTopUp?: () => void
  onDownload?: () => void
  onQrCode?: () => void
  onDelete?: () => void
  onPaidChange?: (isPaid: boolean) => void
  onActiveChange?: (isActive: boolean) => void
}

export function PeerCard({
  name,
  description,
  uid,
  balance,
  isPaid: initialIsPaid = true,
  isActive: initialIsActive = true,
  onTopUp,
  onDownload,
  onQrCode,
  onDelete,
  onPaidChange,
  onActiveChange,
}: ClientCardProps) {
  const [isPaid, setIsPaid] = useState(initialIsPaid)
  const [isActive, setIsActive] = useState(initialIsActive)

  const handlePaidChange = (checked: boolean) => {
    setIsPaid(checked)
    onPaidChange?.(checked)
  }

  const handleActiveChange = (checked: boolean) => {
    setIsActive(checked)
    onActiveChange?.(checked)
  }

  return (
    <Card className="w-full border-slate-700 bg-slate-900/50 p-4 transition-colors hover:border-slate-600">
      <div>
        <div className="flex justify-between gap-4">
          {/* Name  */}
          <p className="text-left font-medium">{name}</p>
          {/* Status Badge */}
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? "Активен" : "Отключен"}
          </Badge>
        </div>
        {/*  Description */}
        <p className="text-left text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="grid md:grid-cols-[1fr_auto]">
        <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto_auto] md:gap-10">
          {/* UID */}
          <div className="flex items-center justify-center gap-2 rounded px-3 py-1.5 sm:justify-start">
            <WgLogo width={25} height={25} />
            <span className="text-lg text-muted-foreground">UID:</span>
            <code className="truncate font-mono text-lg">{uid}</code>
          </div>

          {/* Balance */}
          <div className="flex items-center justify-between gap-3 sm:justify-end md:justify-start">
            <div className="flex items-center gap-4 sm:w-36">
              <p className="text-xs text-muted-foreground">Баланс</p>
              <p className="text-lg font-semibold tabular-nums">
                {balance.toLocaleString("ru-RU")} ₽
              </p>
            </div>
            <Button size="sm" variant="outline" onClick={onTopUp}>
              <Plus className="size-4" />
              Пополнить
            </Button>
          </div>

          {/* Toggles */}
          <div className="flex gap-2 md:flex-col">
            <div className="flex items-center gap-2">
              <Switch
                id={`paid-${uid}`}
                checked={isPaid}
                onCheckedChange={handlePaidChange}
              />
              <Label
                htmlFor={`paid-${uid}`}
                className="w-20 cursor-pointer text-sm"
              >
                {isPaid ? "Бесплатно" : "Платно"}
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id={`active-${uid}`}
                checked={isActive}
                onCheckedChange={handleActiveChange}
              />
              <Label
                htmlFor={`active-${uid}`}
                className="w-20 cursor-pointer text-sm"
              >
                {isActive ? "Активен" : "Отключен"}
              </Label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex w-full items-center justify-between gap-2 sm:justify-end">
            <Button
              className="flex-1 gap-2 sm:flex-none sm:gap-0"
              variant="outline"
              size="icon"
              onClick={onDownload}
              title="Скачать"
            >
              <Download className="size-6" />
              <span className="sm:hidden">Скачать</span>
            </Button>
            <Button
              className="flex-1 gap-2 sm:flex-none sm:gap-0"
              variant="outline"
              size="icon"
              onClick={onQrCode}
              title="QR-код"
            >
              <QrCode className="size-6" />
              <span className="sm:hidden">QR</span>
            </Button>
            <Button
              className="flex-1 gap-2 sm:flex-none sm:gap-0"
              variant="destructive"
              size="icon"
              onClick={onDelete}
              title="Удалить"
            >
              <Trash2 className="size-6" />
              <span className="sm:hidden">Удалить</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
