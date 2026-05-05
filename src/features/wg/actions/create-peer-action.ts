"use server"
import { clientRepository } from "@/src/entities/client/repository/client-repository"
import { userRepository } from "@/src/entities/user/repository/user-repository"
import { peerRepository } from "@/src/entities/wg-peer/repository/peer-repository"
import { wgServerRepository } from "@/src/entities/wg-server/repository/wg-server-repository"
import { createPeerApi } from "../api/create-peer-api"

type CreatePeerData = {
  server: number
  tariff: number
  clientName: string
  clientDescription: string
  adminId: number
}

export async function createPeerAction(data: CreatePeerData) {
  let createdPeerId: number | null = null
  let peerApiInstance: ReturnType<typeof createPeerApi> | null = null
  try {
    const user = await userRepository.findUserById(data.adminId)
    if (!user) {
      return { success: false, message: "Администратор не найден" }
    }

    const server = await wgServerRepository.findById(data.server)
    if (!server) {
      return { success: false, message: "Сервер не найден" }
    }

    peerApiInstance = createPeerApi(server)

    // Создаём пира на wg-rest-api
    const peer = await peerApiInstance.create("wgconfig")
    if (!peer) {
      return { success: false, message: "Ошибка при создании пира сервере WG" }
    }

    createdPeerId = peer.id

    const privateKey = peer.private_key
    const publicKey = peer.public_key
    const address = peer.address

    if (!privateKey || !publicKey || !address) {
      // Логируем, что именно отсутствует
      console.error("Invalid peer data from WG API:", peer)
      throw new Error("Некорректные данные от WG API")
    }

    // Создаем владельца конфига.

    const client = await clientRepository.createClient(
      data.clientName,
      data.clientDescription,
      data.tariff
    )
    if (!client) {
      return { success: false, message: "Ошибка при создании клиента в БД" }
    }
    //Сохраняем в БД

    await peerRepository.createPeerDb(
      client.id,
      server.id,
      "wgconfig",
      peer.id,
      publicKey,
      privateKey,
      address
    )

    return { success: true, message: "Пир успешно создан" }
  } catch (error) {
    // 💥 Удалить пир, если что-то пошло не так
    if (createdPeerId && peerApiInstance) {
      try {
        await peerApiInstance.delete(createdPeerId)
        console.log(`Rollback: peer ${createdPeerId} удалён`)
      } catch (deleteError) {
        console.error("Rollback failed: не удалось удалить пир", deleteError)
      }
    }
    console.error("[CREATE_PEER] Server error", error)
    return { success: false, message: "Ошибка создания пира" }
  }
}
