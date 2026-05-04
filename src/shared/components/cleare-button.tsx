import React from "react"
import { X } from "lucide-react"
import { cn } from "@/src/shared/lib/utils"

interface Props {
  className?: string
  onClick?: VoidFunction
}

export const CleareButton: React.FC<Props> = ({ onClick, className }) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-gray-500 opacity-40 hover:opacity-100",
        className
      )}
    >
      <X className="h-5 w-5" />
    </div>
  )
}
