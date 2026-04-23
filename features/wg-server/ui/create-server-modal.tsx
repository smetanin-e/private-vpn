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
} from "@/shared/components/ui"
import { CreateWgServerForm } from "./create-server-form"

interface Props {
  className?: string
}

export const CreateWgServerModal: React.FC<Props> = ({ className }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <div className={className}>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          <Button variant={"outline"} className="w-full sm:w-auto">
            Добавить сервер
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-sm bg-linear-to-br from-slate-900 via-blue-900 to-slate-900">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-center text-2xl font-bold">
              Создание Сервера WireGuard
            </DialogTitle>
            <DialogDescription className="text-center">
              Заполните форму ниже, чтобы создать новый сервер WireGuard.
            </DialogDescription>
          </DialogHeader>

          <CreateWgServerForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
