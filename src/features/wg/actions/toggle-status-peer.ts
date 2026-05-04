"use server"

import { peerRepository } from "@/src/entities/wg-peer/repository/peer-repository"
import { WgPeerStatus } from "@/generated/prisma/enums"
import { wgServerRepository } from "@/src/entities/wg-server/repository/wg-server-repository"
import { createPeerApi } from "../api/create-peer-api"

export async function togglePeerStatusAction(dbPeerId: number) {
  try {
    const peer = await peerRepository.findPeerById(dbPeerId)
    if (!peer) {
      return { success: false, message: "Конфигурация не найдена" }
    }

    const currentStatus = peer.status
    const isDeactivating = currentStatus === WgPeerStatus.ACTIVE

    const server = await wgServerRepository.findById(peer.wireguardServerId)
    if (!server) {
      return { success: false, message: "Сервер не найден" }
    }

    const peerApiInstance = createPeerApi(server)
    //меняем статус на сервере WG
    await peerApiInstance.changeEnable(peer.wgPeerId, !isDeactivating)

    //обновляем БД
    await peerRepository.updatePeerStatus(peer.id, !isDeactivating)

    return { success: true }
  } catch (error) {
    console.error("[TOGGLE_STATUS_PEER] Server error", error)
    return { success: false, message: "Ошибка изменения статуса" }
  }
}
