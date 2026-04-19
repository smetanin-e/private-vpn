"use client"
import React from "react"

import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import { Button } from "@/shared/components/ui"
import { toast } from "sonner"

interface Props {
  className?: string
}
export const Logout: React.FC<Props> = () => {
  const logout = async () => {
    await signOut({ callbackUrl: "/" })

    toast("Выход из аккаунта")
  }
  return (
    <Button variant={"ghost"} size={"sm"} onClick={logout}>
      <LogOut className="h-4 w-4" />
    </Button>
  )
}
