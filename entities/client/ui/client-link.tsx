"use client"
import { generateClientAccess } from "@/features/client/actions/generate-client-access"
import { Button } from "@/shared/components/ui"
import { Link } from "lucide-react"
import React from "react"
import { toast } from "sonner"

interface Props {
  className?: string
  id: number
  tokenId: boolean
}

export const ClientLink: React.FC<Props> = ({ id, tokenId }) => {
  const [createdLink, setCreatedLink] = React.useState<boolean>(tokenId)
  const handleGenerate = async () => {
    try {
      const res = await generateClientAccess(id)
      if (!res?.accessLink) return

      await navigator.clipboard.writeText(res.accessLink)
      toast.success("Ссылка скопирована в буфер обмена")
      setCreatedLink(true)
    } catch (error) {
      console.error("Failed to generate access link", error)
      toast.error("Ошибка при создании ссылки")
    }
  }
  return (
    <Button variant="outline" size="sm" onClick={handleGenerate}>
      <Link className="h-4 w-4" />
      {createdLink ? "Пересоздать ссылку" : "Создать ссылку"}
    </Button>
  )
}
