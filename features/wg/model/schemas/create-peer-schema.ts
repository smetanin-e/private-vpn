import { z } from "zod"

export const createPeerSchema = z.object({
  server: z.string().min(1, { message: "Выберите сервер" }),
  tariff: z.coerce.number().positive({ message: "Число должно быть больше 0" }),

  clientName: z.string().min(2, { message: "Введите имя клиента" }),
  clientDescription: z
    .string()
    .min(2, { message: "Введите описание - для какого устройства" }),
})

export type CreatePeerType = z.infer<typeof createPeerSchema>
