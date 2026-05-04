import React from "react"
import {
  Button,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "./ui"
import { ChangePasswordModal } from "@/src/features/user/ui/change-password-modal"
import { Logout } from "@/src/features/auth"
import { MenuIcon } from "lucide-react"
import { CreateWgServerModal } from "@/src/features/wg-server/ui/create-server-modal"

interface Props {
  className?: string
  userId: number
  name: string
  links: React.ReactNode
}

export const Menu: React.FC<Props> = ({ userId, name, links }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <MenuIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle className="flex items-center justify-between">
            <p className="text-lg text-white">{name}</p>
            <div className="flex items-center justify-end space-x-4 md:justify-baseline">
              <ChangePasswordModal id={userId} />
              <Logout />
            </div>
          </PopoverTitle>
          <PopoverDescription> </PopoverDescription>
        </PopoverHeader>
        <div>{links}</div>
      </PopoverContent>
    </Popover>
  )
}
