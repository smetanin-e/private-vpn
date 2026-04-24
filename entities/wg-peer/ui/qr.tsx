"use client"
import React from "react"

import { QrCode } from "lucide-react"
import Image from "next/image"
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Spinner,
} from "@/shared/components/ui"
import { toast } from "sonner"
import { showQrCode } from "@/features/wg/lib"

interface Props {
  dbPeerId: number
  peerName: string
}

export const Qr: React.FC<Props> = ({ dbPeerId, peerName }: Props) => {
  const [qrUrl, setQrUrl] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)

  const fetchQr = async () => {
    try {
      setLoading(true)
      const url = await showQrCode(dbPeerId)
      console.log(url)
      if (!url) {
        throw new Error("Не удалось загрузить QR-code")
      }
      setQrUrl(url)
    } catch (error) {
      console.error("Ошибка при загрузке QR:", error)
      toast.error(
        error instanceof Error ? error.message : "Ошибка при загрузке QR ❌"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex-1 gap-2 sm:flex-none sm:gap-0"
          size={"icon"}
          variant="outline"
          onClick={fetchQr}
          disabled={loading}
        >
          {loading ? (
            <Spinner className="h-4 w-4" />
          ) : (
            <QrCode className="h-4 w-4" />
          )}
          <span className="sm:hidden">QR</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-sm bg-linear-to-br from-slate-900 via-blue-900 to-slate-900">
        <DialogHeader>
          <DialogTitle>QR-код для {peerName}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-3">
          {/* <img
            src={`/api/peer/${dbPeerId}/qr`}
            alt={`QR для ${peerName}`}
            width={250}
            height={250}
            className="rounded-lg border shadow-md"
          /> */}

          <p className="text-center text-sm text-muted-foreground">
            Отсканируй этот QR-код в приложении WireGuard
          </p>
        </div>

        {qrUrl ? (
          <div className="flex flex-col items-center gap-3">
            <Image
              src={qrUrl}
              alt={`QR для ${peerName}`}
              width={250}
              height={250}
              className="rounded-lg border shadow-md"
            />
            <p className="text-center text-sm text-muted-foreground">
              Отсканируй этот QR-код в приложении WireGuard
            </p>
          </div>
        ) : (
          <p className="text-center text-sm text-muted-foreground">
            Загрузка QR-кода...
          </p>
        )}
      </DialogContent>
    </Dialog>
  )
}
