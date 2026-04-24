import { z } from "zod"

export const creditBalanceSchema = z.object({
  count: z.string().regex(/^\d+$/, { message: "Введите число" }),
  key: z.string().min(1, { message: "Введите секретный ключ пополнения" }),
})

export type CreditBalanceType = z.infer<typeof creditBalanceSchema>
