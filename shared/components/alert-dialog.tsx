"use client"
import React from "react"
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui"

import { TriangleAlert } from "lucide-react"

interface Props {
  className?: string
  trigger: React.ReactNode
  description: string
  onConfirm?: () => Promise<void> | void
}

export const AlertDialog: React.FC<Props> = ({
  trigger,
  description,
  onConfirm,
}) => {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const handleConfirm = async () => {
    try {
      setLoading(true)
      if (onConfirm) await onConfirm() // вызвать переданную функцию
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="min-w-sm bg-linear-to-br from-slate-900 via-blue-900 to-slate-900">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-center text-2xl font-bold">
            <div className="flex items-center justify-center space-x-4 text-orange-500">
              <TriangleAlert className="h-6 w-6" />
              <span>Внимание!</span>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center space-x-4">
          <Button
            disabled={loading}
            variant={"outline"}
            onClick={handleConfirm}
          >
            {loading ? "Удаляем..." : "Подтвердить"}
          </Button>
          <Button
            disabled={loading}
            variant={"outline"}
            onClick={() => setOpen(false)}
          >
            Отмена
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
