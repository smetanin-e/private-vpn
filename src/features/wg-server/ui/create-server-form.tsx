"use client"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/src/shared/components/ui"
import { FormInput, FormTextarea } from "@/src/shared/components/form"
import {
  createServerSchema,
  CreateServerType,
} from "../model/schemas/create-server-schema"
import { useWgServerMutations } from "../model/hooks/use-server-mutations"

interface Props {
  className?: string

  setOpen: (open: boolean) => void
}

export const CreateWgServerForm: React.FC<Props> = ({ setOpen }) => {
  const { createServer } = useWgServerMutations()

  const form = useForm<CreateServerType>({
    resolver: zodResolver(createServerSchema),
  })

  const onSubmit = async (data: CreateServerType) => {
    try {
      await createServer.mutateAsync(data)
      setOpen(false)
    } catch (error) {
      console.error("Error [CREATE_SERVER_FORM]", error)
    }
  }
  return (
    <FormProvider {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <FormInput
            label="Имя сервера"
            name="serverName"
            id="serverName"
            type="text"
            placeholder="Введите название сервера"
            required
          />
        </div>
        <div className="space-y-2">
          <FormTextarea
            label="Описание"
            name="serverDescription"
            id="serverDescription"
            placeholder="Введите описание"
            required
          />
        </div>

        <div className="space-y-2">
          <FormInput
            label="Адрес сервера"
            name="serverAddress"
            id="serverAddress"
            type="text"
            placeholder="http://example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <FormInput
            label="API ключ"
            name="apiToken"
            id="apiToken"
            type="password"
            placeholder="Введите API ключ для доступа к серверу"
            required
          />
        </div>

        <Button
          disabled={form.formState.isSubmitting}
          className="mt-2 w-full"
          type="submit"
        >
          {form.formState.isSubmitting ? "Создание конфигурации" : "Создать"}
        </Button>
      </form>
    </FormProvider>
  )
}
