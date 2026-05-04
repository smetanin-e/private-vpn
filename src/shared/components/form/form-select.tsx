"use client"
import { Controller, useFormContext } from "react-hook-form"
import { ErrorText, RequiredSymbol } from "@/src/shared/components"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/components/ui"
import { WireguardServer } from "@/generated/prisma/client"

interface Props extends React.InputHTMLAttributes<HTMLSelectElement> {
  name: string
  label?: string
  required?: boolean
  className?: string
  data: WireguardServer[]
}

export const FormSelect: React.FC<Props> = ({
  name,
  label,
  required,
  data,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const errorText = errors[name]?.message as string

  return (
    <div className="relative">
      {label && (
        <p className="mb-0.5 text-sm font-medium">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          const value = field.value ?? ""
          return (
            <div className="relative">
              <Select value={value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full text-sm" size="sm">
                  <SelectValue placeholder="Выберите..." />
                </SelectTrigger>
                <SelectContent>
                  {data.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )
        }}
      />

      {errorText && (
        <ErrorText text={errorText} className="absolute right-0 text-[12px]" />
      )}
    </div>
  )
}
