import { Eye, EyeOff } from "lucide-react"
import React from "react"
import { cn } from "../lib/utils"

interface Props {
  className?: string
  showPassword: boolean
  setShowPassword: (show: boolean) => void
}

export const ShowPasswordIcon: React.FC<Props> = ({
  showPassword,
  setShowPassword,
  className,
}) => {
  const onClick = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div
      onClick={onClick}
      className={cn(
        "absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer opacity-30 hover:opacity-100",
        className
      )}
    >
      {showPassword ? (
        <EyeOff className="h-4 w-4" />
      ) : (
        <Eye className="h-4 w-4" />
      )}
    </div>
  )
}
