import { z } from "zod"

export const createServerSchema = z.object({
  serverName: z.string().min(2, { message: "Введите название сервера" }),
  serverDescription: z.string().min(2, { message: "Введите описание сервера" }),
  serverAddress: z.string().url({ message: "Введите корректный URL" }),
  apiToken: z.string().min(6, { message: "Введите корректный API ключ" }),
})

export type CreateServerType = z.infer<typeof createServerSchema>
