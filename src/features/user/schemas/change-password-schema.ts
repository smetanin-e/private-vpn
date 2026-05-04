import z from "zod"

import { passwordSchema } from "@/src/shared/lib/validation"

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Нужно ввести текущий пароль" }),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword
    },
    {
      message: "Пароли не совпадают",
      path: ["confirmPassword"],
    }
  )
  .refine((data) => data.password !== data.currentPassword, {
    message: "Новый пароль не должен совпадать с текущим",
    path: ["password"], // указываем, где показать ошибку
  })

export type ChangePasswordType = z.infer<typeof changePasswordSchema>
