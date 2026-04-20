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
import { CreatePeerForm } from "./create-peer-form"
import { useUserSession } from "@/features/auth/model/hooks/use-session"

interface Props {
  className?: string
}

export const CreatePeerModal: React.FC<Props> = ({ className }) => {
  const [open, setOpen] = React.useState(false)
  const { user, isLoading } = useUserSession()

  return (
    <div className={className}>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          <Button
            variant={"outline"}
            disabled={isLoading}
            size="sm"
            className="w-full sm:w-auto"
          >
            Добавить клиента
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-sm bg-linear-to-br from-slate-900 via-blue-900 to-slate-900">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-center text-2xl font-bold">
              Создание конфигурации VPN
            </DialogTitle>
            <DialogDescription className="text-center">
              Введите название своего файла конфигурации
            </DialogDescription>
          </DialogHeader>
          {user?.id && (
            <CreatePeerForm setOpen={setOpen} userId={Number(user.id)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
