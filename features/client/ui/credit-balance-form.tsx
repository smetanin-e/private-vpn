"use client"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/shared/components/ui"
import { FormInput } from "@/shared/components/form"
import {
  creditBalanceSchema,
  CreditBalanceType,
} from "../model/schemas/credit-balance-schema"
import { useClientMutations } from "../model/hooks/use-client-mutations"

interface Props {
  className?: string
  clientId: number
  setOpen: (open: boolean) => void
}

export const CreditBalanceForm: React.FC<Props> = ({ setOpen, clientId }) => {
  const { creditBalance } = useClientMutations()

  const form = useForm<CreditBalanceType>({
    resolver: zodResolver(creditBalanceSchema),
  })

  const onSubmit = async (data: CreditBalanceType) => {
    try {
      await creditBalance.mutateAsync({ ...data, clientId })
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
