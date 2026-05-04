"use client"

import React from "react"
import { useFormContext } from "react-hook-form"
import { CleareButton } from "../cleare-button"
import { ErrorText } from "../error-text"
import { Textarea } from "../ui"
import { cn } from "@/src/shared/lib/utils"

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
  name: string
  label?: string
  required?: boolean
}

export const FormTextarea: React.FC<Props> = ({
  className,
  name,
  label,
  required,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()

  const value = watch(name)
  const errorText = errors[name]?.message as string

  const onClickClear = () => {
    setValue(name, "")
  }

  return (
    <div className={cn("relative", className)}>
      <p className="mb-1 text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </p>

      <div className="relative">
        <Textarea className="text-md h-12" {...register(name)} {...props} />

        {value && <CleareButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText className="" text={errorText} />}
    </div>
  )
}
