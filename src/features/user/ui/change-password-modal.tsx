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

import { KeyRound } from "lucide-react"
import { ChangePasswordForm } from "./change-password-form"

interface Props {
  className?: string
  id: number
}

export const ChangePasswordModal: React.FC<Props> = ({ id }) => {
  const [open, setOpen] = React.useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <KeyRound className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-sm bg-linear-to-br from-slate-900 via-blue-900 to-slate-900">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-center text-2xl font-bold">
            Смена пароля
          </DialogTitle>
          <DialogDescription className="text-center">
            Введите текущий и новый пароль, чтобы обновить свой аккаунт.
          </DialogDescription>
        </DialogHeader>
        <ChangePasswordForm id={id} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
