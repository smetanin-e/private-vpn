import { z } from "zod"

export const TopUpSchema = z.object({
  count: z.string().regex(/^\d+$/, { message: "Введите число" }),
  key: z.string().min(1, { message: "Введите секретный ключ пополнения" }),
})

export type TopUpType = z.infer<typeof TopUpSchema>
