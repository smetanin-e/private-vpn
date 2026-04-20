"use server"

import { peerRepository } from "@/entities/wg-peer/repository/peer-repository"
import { peerApi } from "../api"

export async function deletePeerAction(peerId: number) {
  try {
    const peer = await peerRepository.findPeerById(peerId)
    if (!peer) {
      return { success: false, message: "Конфигурация не найдена" }
    }

    await peerApi.delete(peer.id)
    await peerRepository.deletePeer(peer.id)
    return { success: true }
  } catch (error) {
    console.error("[DELETE_PEER] Server error", error)
    return { success: false, message: "Ошибка удаления пира" }
  }
}
