"use client"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/src/shared/components/ui"
import { FormInput } from "@/src/shared/components/form"
import { TopUpSchema, TopUpType } from "../model/schemas/top-up-schema"
import { useTransactionMutations } from "../model/hooks/use-transaction-mutations"

interface Props {
  className?: string
  clientId: number
  setOpen: (open: boolean) => void
}

export const TopUpForm: React.FC<Props> = ({ setOpen, clientId }) => {
  const { topUp } = useTransactionMutations()

  const form = useForm<TopUpType>({
    resolver: zodResolver(TopUpSchema),
  })

  const onSubmit = async (data: TopUpType) => {
    try {
      await topUp.mutateAsync({ ...data, clientId })
      setOpen(false)
    } catch (error) {
      console.error("Error [CREDIT_BALANCE_FORM]", error)
    }
  }
  return (
    <FormProvider {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div className="space-y-2">
            <FormInput
              label="Сумма пополнения"
              name="count"
              id="count"
              type="text"
              placeholder="Введите сумму пополнения"
              required
            />
          </div>
          <FormInput
            label="Секретный ключ"
            name="key"
            id="key"
            type="password"
            placeholder="Введите секретный ключ"
            required
          />
        </div>

        <Button
          disabled={form.formState.isSubmitting}
          className="mt-2 w-full"
          type="submit"
        >
          {form.formState.isSubmitting ? "Пополняется..." : "Пополнить баланс"}
        </Button>
      </form>
    </FormProvider>
  )
}
