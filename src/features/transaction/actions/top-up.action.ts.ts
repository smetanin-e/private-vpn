"use server"

import { clientRepository } from "@/src/entities/client/repository/client-repository"
import { transactionRepository } from "@/src/entities/transaction/repository/transaction-repository"
import { peerRepository } from "@/src/entities/wg-peer/repository/peer-repository"
import { createPeerApi } from "@/src/features/wg/api/create-peer-api"
import { WgPeerStatus } from "@/generated/prisma/enums"

type CreditBalanceData = {
  clientId: number
  count: string
  key: string
}
export async function topUpAction(data: CreditBalanceData) {
  try {
    const client = await clientRepository.findClienWithRelations(data.clientId)
    if (!client) {
      return { success: false, message: "Клиент не найден" }
    }
    if (data.key !== process.env.CREDIT_BALANCE_SECRET) {
      return { success: false, message: "Неверный секретный ключ" }
    }
    const newBalance = client.balance + parseInt(data.count)
    await clientRepository.updateBalance(data.clientId, newBalance)

    await transactionRepository.createTopUp({
      clientId: data.clientId,
      amount: parseInt(data.count),
    })

    if (client.peer?.status === WgPeerStatus.INACTIVE && newBalance > 0) {
      const peerApiInstance = createPeerApi(client.peer.wireguardServer!)
      //меняем статус на сервере WG
      await peerApiInstance.changeEnable(client.peer!.wgPeerId, true)
      //обновляем БД
      await peerRepository.updatePeerStatus(client.peer.id, true)
    }

    return { success: true }
  } catch (error) {
    console.error("Error [CREDIT_BALANCE_ACTION]", error)
    return { success: false, message: "Ошибка при пополнении баланса" }
  }
}
