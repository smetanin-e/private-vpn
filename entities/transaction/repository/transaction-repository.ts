import { prisma } from "@/shared/lib/prisma"
import { TransactionTopUp } from "../model/types"
import { TransactionType } from "@/generated/prisma/enums"

export const transactionRepository = {
  async createTopUp(data: TransactionTopUp) {
    return prisma.balanceTransaction.create({
      data: {
        clientId: data.clientId,
        description: data.description,
        type: TransactionType.TOP_UP,
        amount: data.amount,
      },
    })
  },
}
