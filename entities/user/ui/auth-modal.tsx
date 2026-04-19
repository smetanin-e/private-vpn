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
import { LoginForm } from "@/features/auth"
import { LogIn } from "lucide-react"

interface Props {
  className?: string
}

export const AuthModal: React.FC<Props> = () => {
  const [open, setOpen] = React.useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-[200px]">
          <LogIn className="h-4 w-4" />
          Войти
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-sm bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-center text-2xl font-bold">
            Добро пожаловать
          </DialogTitle>
          <DialogDescription className="text-center">
            Введите логин и пароль для входа в аккаунт
          </DialogDescription>
        </DialogHeader>

        <LoginForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
