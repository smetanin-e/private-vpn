import { passwordSchema } from "@/shared/lib/validation"
import { z } from "zod"

export const loginSchema = z.object({
  login: z
    .string()
    .min(2, { message: "Введите логин" })
    .regex(/^[A-Za-z].*$/, {
      message: "Логин должен начинаться с латинской буквы",
    }),
  password: passwordSchema,
})

export type LoginFormType = z.infer<typeof loginSchema>
