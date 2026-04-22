"use server"

import { peerRepository } from "@/entities/wg-peer/repository/peer-repository"
import { peerApi } from "../api"
import { clientRepository } from "@/entities/client/repository/client-repository"

export async function deletePeerAction(peerId: number) {
  try {
    const peer = await peerRepository.findPeerByWgId(peerId)
    if (!peer) {
      return { success: false, message: "Конфигурация не найдена" }
    }

    const client = await clientRepository.findClientById(peer.clientId)
    if (!client) {
      return { success: false, message: "Клиент не найден" }
    }

    await peerApi.delete(peer.wgPeerId)
    await peerRepository.deletePeer(peer.id)
    await clientRepository.deleteClient(client.id)

    return { success: true }
  } catch (error) {
    console.error("[DELETE_PEER] Server error", error)
    return { success: false, message: "Ошибка удаления пира" }
  }
}
