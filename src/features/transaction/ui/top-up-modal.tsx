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
} from "@/src/shared/components/ui"
import { TopUpForm } from "./top-up-form"
import { Plus } from "lucide-react"

interface Props {
  className?: string
  clientId: number
}

export const TopUpModal: React.FC<Props> = ({ className, clientId }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <div className={className}>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          <Button variant={"outline"} className="w-full sm:w-auto">
            <Plus className="size-4" />
            Пополнить
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-sm bg-linear-to-br from-slate-900 via-blue-900 to-slate-900">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-center text-2xl font-bold">
              Пополнение баланса
            </DialogTitle>
            <DialogDescription className="text-center">
              Введите сумму для пополнения баланса и секретный ключ
            </DialogDescription>
          </DialogHeader>
          {clientId && <TopUpForm setOpen={setOpen} clientId={clientId} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
