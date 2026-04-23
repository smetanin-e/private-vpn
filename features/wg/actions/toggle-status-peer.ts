"use server"

import { peerRepository } from "@/entities/wg-peer/repository/peer-repository"
import { WgPeerStatus } from "@/generated/prisma/enums"
import { peerApi } from "../api"

export async function togglePeerStatusAction(dbPeerId: number) {
  try {
    const peer = await peerRepository.findPeerById(dbPeerId)
    if (!peer) {
      return { success: false, message: "Конфигурация не найдена" }
    }

    const currentStatus = peer.status
    const isDeactivating = currentStatus === WgPeerStatus.ACTIVE

    //меняем статус на сервере WG
    await peerApi.changeEnable(peer.wgPeerId, !isDeactivating)

    //обновляем БД
    await peerRepository.updatePeerStatus(peer.id, !isDeactivating)

    return { success: true }
  } catch (error) {
    console.error("[TOGGLE_STATUS_PEER] Server error", error)
    return { success: false, message: "Ошибка изменения статуса" }
  }
}
