"use server"

import { clientRepository } from "@/entities/client/repository/client-repository"
import { transactionRepository } from "@/entities/transaction/repository/transaction-repository"

type CreditBalanceData = {
  clientId: number
  count: string
  key: string
}
export async function creditBalanceAction(data: CreditBalanceData) {
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

    //создаем транзакцию пополнения баланса
    const transactionDesctiption = `Пополнение баланса на ${data.count} руб. 
Клиент: ${client.name} (Client-ID: ${client.id}). 
DB-Peer-ID: ${client.peer!.id}.
WG-Peer-ID: ${client.peer!.wgPeerId}.
Сервер: ${client.peer!.wireguardServer!.name}`

    await transactionRepository.createTopUp({
      clientId: data.clientId,
      amount: parseInt(data.count),
      description: transactionDesctiption,
    })
    return { success: true }
  } catch (error) {
    console.error("Error [CREDIT_BALANCE_ACTION]", error)
    return { success: false, message: "Ошибка при пополнении баланса" }
  }
}
