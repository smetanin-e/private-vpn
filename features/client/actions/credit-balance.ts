"use server"

import { clientRepository } from "@/entities/client/repository/client-repository"

type CreditBalanceData = {
  clientId: number
  count: string
  key: string
}
export async function creditBalanceAction(data: CreditBalanceData) {
  try {
    const client = await clientRepository.findClientById(data.clientId)
    if (!client) {
      return { success: false, message: "Клиент не найден" }
    }
    if (data.key !== process.env.CREDIT_BALANCE_SECRET) {
      return { success: false, message: "Неверный секретный ключ" }
    }
    const newBalance = client.balance + parseInt(data.count)
    await clientRepository.updateBalance(data.clientId, newBalance)
    return { success: true }
  } catch (error) {
    console.error("Error [CREDIT_BALANCE_ACTION]", error)
    return { success: false, message: "Ошибка при пополнении баланса" }
  }
}
