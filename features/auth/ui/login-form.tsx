"use client"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/shared/components/ui"
import { FormInput } from "@/shared/components/form"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { LoginFormType, loginSchema } from "../model/schemas/login-schema"

import { toast } from "sonner"

interface Props {
  className?: string
  onClose?: () => void
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const router = useRouter()
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  })
  const onSubmit = async (data: LoginFormType) => {
    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      })

      if (res?.error) {
        return toast.error(res.error) // покажет текст из throw new Error('...')
      }

      //закрыть модалку
      onClose?.()
      router.push("/dashboard")
      toast.success("Успешная авторизация!")
    } catch (error) {
      console.error("Error [LOGIN]", error)
      return toast.error(
        error instanceof Error ? error.message : "Не удалось войти в аккаунт ❌"
      )
    }
  }
  return (
    <FormProvider {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput
          label="Логин"
          name="login"
          id="login"
          type="text"
          placeholder="Логин..."
          required
        />

        <FormInput
          label="Пароль"
          name="password"
          id="password"
          type="password"
          placeholder="Введите пароль"
          required
        />

        <Button
          disabled={form.formState.isSubmitting}
          className="mt-0 w-full"
          type="submit"
        >
          Войти
        </Button>
      </form>
    </FormProvider>
  )
}
