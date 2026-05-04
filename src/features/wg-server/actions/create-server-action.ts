"use server"
import { CreateServerType } from "../model/schemas/create-server-schema"
import { wgServerRepository } from "@/src/entities/wg-server/repository/wg-server-repository"

export async function createWgServerAction(data: CreateServerType) {
  try {
    // Создаём пира на wg-rest-api
    const server = await wgServerRepository.createServer(data)
    if (!server) {
      return { success: false, message: "Ошибка при создании сервере WG" }
    }

    return { success: true, message: "Сервер успешно создан" }
  } catch (error) {
    // 💥 Удалить пир, если что-то пошло не так

    console.error("[CREATE_SERVER] Server error", error)
    return { success: false, message: "Ошибка создания сервера" }
  }
}
