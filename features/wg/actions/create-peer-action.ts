"use server"
import { clientRepository } from "@/entities/client/repository/client-repository"
import { userRepository } from "@/entities/user/repository/user-repository"
import { peerRepository } from "@/entities/wg-peer/repository/peer-repository"

type CreatePeerData = {
  peerName: string
  clientName: string
  clientDescription: string
  adminId: number
}

export async function createPeerAction(data: CreatePeerData) {
  try {
    const user = await userRepository.findUserById(data.adminId)
    if (!user) {
      return { success: false, message: "Администратор не найден" }
    }

    // Создаём пира на wg-rest-api
    const peer = await peerRepository.createPeerOnWgServer(data.peerName)
    if (!peer) {
      return { success: false, message: "Ошибка при создании пира сервере WG" }
    }

    // Получаем конфиг напрямую из wg-rest-api
    const config = await peerRepository.getWgServerPeerConfig(peer.id)
    if (!config) {
      return { success: false, message: "Ошибка сервере WG при получении пира" }
    }

    // Парсим ключи и адрес из конфига
    const privateKey = config.match(/PrivateKey\s*=\s*(.+)/)?.[1] ?? ""
    const publicKey = config.match(/PublicKey\s*=\s*(.+)/)?.[1] ?? ""
    const address = config.match(/Address\s*=\s*(.+)/)?.[1] ?? ""

    if (!privateKey || !publicKey || !address) {
      console.error("Config parse error:", config)
      return {
        success: false,
        message: "Не удалось проанализировать конфигурацию WireGuard.",
      }
    }

    // Создаем владельца конфига.
    const client = await clientRepository.createClient(
      data.clientName,
      data.clientDescription
    )
    if (!client) {
      return { success: false, message: "Ошибка при создании клиента в БД" }
    }
    //Сохраняем в БД

    await peerRepository.createPeerDb(
      client.id,
      data.peerName,
      peer.id,
      publicKey,
      privateKey,
      address
    )

    return { success: true, message: "Пир успешно создан" }
  } catch (error) {
    //TODO Удалить пир, если что-то пошло не так
    console.error("[CREATE_PEER] Server error", error)
    return { success: false, message: "Ошибка создания пира" }
  }
}
