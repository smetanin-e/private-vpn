import { prisma } from "@/src/shared/lib/prisma"
import { TransactionTopUp } from "../model/types"
import { TransactionType } from "@/generated/prisma/enums"
import { BalanceTransactionWhereInput } from "@/generated/prisma/models"
import { Prisma } from "@/generated/prisma/client"

export const transactionRepository = {
  async getAll(
    search?: string,
    take?: number,
    skip?: number,
    clientId?: number
  ) {
    const where: BalanceTransactionWhereInput = {}
    if (clientId) {
      where.clientId = clientId // ← фильтрация по клиенту
    }

    if (search) {
      const orConditions: Prisma.BalanceTransactionWhereInput[] = [
        {
          client: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      ]
      // Добавляем поиск по clientId, если search является числом
      const numericSearch = Number(search)
      if (!Number.isNaN(numericSearch)) {
        orConditions.unshift({ clientId: numericSearch })
      }
      where.OR = orConditions
    }

    return prisma.balanceTransaction.findMany({
      where,
      take,
      skip,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
  },
  async createTopUp(data: TransactionTopUp) {
    return prisma.balanceTransaction.create({
      data: {
        clientId: data.clientId,
        type: TransactionType.TOP_UP,
        amount: data.amount,
      },
    })
  },

  async createDailyCharge() {},

  async deleteByClientId(clientId: number) {
    return prisma.balanceTransaction.deleteMany({
      where: { clientId },
    })
  },
}
