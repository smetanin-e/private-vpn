import React from "react"
import { cn } from "@/src/shared/lib/utils"

interface Props {
  text: string
  className?: string
}

export const ErrorText: React.FC<Props> = ({ text, className }) => {
  return (
    <p
      className={cn(
        "absolute -bottom-5 ml-2 text-[11px] text-red-500",
        className
      )}
    >
      {text}
    </p>
  )
}
