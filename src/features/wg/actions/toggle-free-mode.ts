"use server"

import { peerRepository } from "@/src/entities/wg-peer/repository/peer-repository"
import { clientRepository } from "@/src/entities/client/repository/client-repository"

export async function toggleFreeModeAction(dbPeerId: number) {
  try {
    const peer = await peerRepository.findPeerById(dbPeerId)
    if (!peer) {
      return { success: false, message: "Конфигурация не найдена" }
    }

    const client = await clientRepository.findClientById(peer.clientId)
    if (!client) {
      return { success: false, message: "Клиент не найден" }
    }

    const currentMode = client.isFree

    //обновляем БД

    await clientRepository.updateFreeMode(peer.clientId, !currentMode)

    return { success: true }
  } catch (error) {
    console.error("[TOGGLE_FREE_MODE] Server error", error)
    return { success: false, message: "Ошибка изменения статуса тарифа" }
  }
}
