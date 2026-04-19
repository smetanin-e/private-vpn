"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"

import { FormInput } from "@/shared/components/form"
import { Button } from "@/shared/components/ui"

import { toast } from "sonner"
import {
  changePasswordSchema,
  ChangePasswordType,
} from "../schemas/change-password-schema"
import { changeUserPasswordAction } from "../actions/change-user-password"

interface Props {
  className?: string
  id: number
  setOpen: (value: boolean) => void
}

export const ChangePasswordForm: React.FC<Props> = ({ id, setOpen }) => {
  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: ChangePasswordType) => {
    try {
      const res = await changeUserPasswordAction(id, data)
      if (!res.success) {
        toast.error(res.message ? res.message : "Ошибка")
        return
      }
      setOpen(false)
      toast.success("Пароль успешно изменен✅")
    } catch (error) {
      console.error("Error [LOGIN_FORM]", error)
      return toast.error(error instanceof Error ? error.message : "Ошибка ❌")
    }
  }
  return (
    <FormProvider {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput
          label="Текущий пароль"
          name="currentPassword"
          id="currentPassword"
          type="password"
          placeholder="Текущий пароль..."
          required
        />

        <FormInput
          label="Новый пароль"
          name="password"
          id="password"
          type="password"
          placeholder="Новый пароль..."
          required
        />
        <FormInput
          label="Подтверждение пароля"
          name="confirmPassword"
          id="confirmPassword"
          type="password"
          placeholder="Подтверждение пароля..."
          required
        />

        <Button
          disabled={form.formState.isSubmitting}
          className="mt-4 w-full"
          type="submit"
        >
          Изменить пароль
        </Button>
      </form>
    </FormProvider>
  )
}
