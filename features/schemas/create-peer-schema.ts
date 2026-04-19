import { z } from "zod"

export const createPeerSchema = z.object({
  peerName: z
    .string()
    .min(2, { message: "Введите название файла" })
    .regex(/^[A-Za-z].*$/, {
      message: "Название должно начинаться с латинской буквы",
    }),
  clientName: z.string().min(2, { message: "Введите имя клиента" }),
  clientDescription: z
    .string()
    .min(2, { message: "Введите описание - для какого устройства" }),
})

export type CreatePeerType = z.infer<typeof createPeerSchema>
