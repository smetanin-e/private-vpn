"use server"

import { peerRepository } from "@/entities/wg-peer/repository/peer-repository"
import { clientRepository } from "@/entities/client/repository/client-repository"
import { wgServerRepository } from "@/entities/wg-server/repository/wg-server-repository"
import { createPeerApi } from "../api/create-peer-api"
import { transactionRepository } from "@/entities/transaction/repository/transaction-repository"

export async function deletePeerAction(dbPeerId: number) {
  try {
    const peer = await peerRepository.findPeerById(dbPeerId)
    if (!peer) {
      return { success: false, message: "Конфигурация не найдена" }
    }

    const client = await clientRepository.findClientById(peer.clientId)
    if (!client) {
      return { success: false, message: "Клиент не найден" }
    }

    const server = await wgServerRepository.findById(peer.wireguardServerId)
    if (!server) {
      return { success: false, message: "Сервер не найден" }
    }

    const peerApiInstance = createPeerApi(server)

    await peerApiInstance.delete(peer.wgPeerId)
    //TODO Если база не доступна, то пир удалится на сервере, но останется в базе. Нужно как-то обрабатывать такие ситуации.
    await peerRepository.deletePeer(peer.id)
    await transactionRepository.deleteByClientId(client.id)
    await clientRepository.deleteClient(client.id)

    return { success: true }
  } catch (error) {
    console.error("[DELETE_PEER] Server error", error)
    return { success: false, message: "Ошибка удаления пира" }
  }
}
