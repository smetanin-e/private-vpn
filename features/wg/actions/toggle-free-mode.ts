"use server"

import { peerRepository } from "@/entities/wg-peer/repository/peer-repository"
import { peerApi } from "../api"
import { clientRepository } from "@/entities/client/repository/client-repository"

export async function toggleFreeModeAction(peerId: number) {
  try {
    const peer = await peerRepository.findPeerById(peerId)
    if (!peer) {
      return { success: false, message: "Конфигурация не найдена" }
    }

    const client = await clientRepository.findClientById(peer.clientId)
    if (!client) {
      return { success: false, message: "Клиент не найден" }
    }

    const currentMode = client.is_free

    //меняем статус на сервере WG
    await peerApi.changeEnable(peer.id, !currentMode)

    //обновляем БД

    await clientRepository.updateFreeMode(peer.clientId, !currentMode)

    return { success: true }
  } catch (error) {
    console.error("[TOGGLE_FREE_MODE] Server error", error)
    return { success: false, message: "Ошибка изменения статуса тарифа" }
  }
}
