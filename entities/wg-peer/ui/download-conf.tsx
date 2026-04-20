"use client"

import { downloadConfig } from "@/features/wg/lib"
import { Button, Spinner } from "@/shared/components/ui"
import { Download } from "lucide-react"
import React from "react"
import { toast } from "sonner"

interface Props {
  peerId: number
  peerName: string
}

export const DownloadConf: React.FC<Props> = ({ peerId, peerName }) => {
  const [loading, setLoading] = React.useState(false)
  const download = async () => {
    try {
      setLoading(true)

      await downloadConfig(peerId, peerName)
    } catch (error) {
      console.error("Ошибка загрузки ❌", error)
      toast.error(error instanceof Error ? error.message : "Ошибка загрузке ❌")
    } finally {
      setLoading(false)
    }
  }
  return (
    <Button
      className="flex-1 gap-2 sm:flex-none sm:gap-0"
      variant="outline"
      size="icon"
      onClick={download}
      title="Скачать"
    >
      {loading ? (
        <Spinner className="h-4 w-4" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      <span className="sm:hidden">Скачать</span>
    </Button>
  )
}
