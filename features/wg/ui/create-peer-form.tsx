"use client"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/shared/components/ui"
import { FormInput, FormTextarea } from "@/shared/components/form"
import { usePeerMutations } from "../model/hooks/use-peer-mutations"
import {
  createPeerSchema,
  CreatePeerType,
} from "@/features/schemas/create-peer-schema"

interface Props {
  className?: string
  userId: number
  setOpen: (open: boolean) => void
}

export const CreatePeerForm: React.FC<Props> = ({ setOpen, userId }) => {
  const { createPeer } = usePeerMutations()
  const form = useForm<CreatePeerType>({
    resolver: zodResolver(createPeerSchema),
  })

  const onSubmit = async (data: CreatePeerType) => {
    try {
      await createPeer.mutateAsync({ ...data, adminId: userId })
      setOpen(false)
    } catch (error) {
      console.error("Error [CREATE_PEER_FORM]", error)
    }
  }
  return (
    <FormProvider {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <FormInput
            label="Имя клиента"
            name="clientName"
            id="clientName"
            type="text"
            placeholder="Введите имя клиента"
            required
          />
        </div>
        <div className="space-y-2">
          <FormTextarea
            label="Описание"
            name="clientDescription"
            id="clientDescription"
            placeholder="Введите описание"
            required
          />
        </div>
        <div className="space-y-2">
          <FormInput
            label="Название файла конфигурации"
            name="peerName"
            id="peerName"
            type="text"
            placeholder="Введите название файла. Например: vpn"
            required
          />
        </div>

        <Button
          disabled={form.formState.isSubmitting}
          className="w-full"
          type="submit"
        >
          {form.formState.isSubmitting ? "Создание конфигурации" : "Создать"}
        </Button>
      </form>
    </FormProvider>
  )
}
