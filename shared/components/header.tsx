import { Logout } from "@/features/auth"
import { ChangePasswordModal } from "@/features/user/ui/change-password-modal"

import React from "react"

interface Props {
  className?: string
  title: string
  name: string
  userId: number
}

export const Header: React.FC<Props> = ({ title, name, userId }) => {
  return (
    <div className="mb-4 flex-wrap md:mb-6 md:flex md:items-center md:justify-between md:space-x-4">
      <h1 className="mb-2 text-center text-3xl font-bold md:text-left">
        {title}
      </h1>

      <div className="flex items-center justify-end space-x-4 md:justify-baseline">
        <p className="text-lg text-white">{name}</p>
        <ChangePasswordModal id={userId} />
        <Logout />
      </div>
    </div>
  )
}
