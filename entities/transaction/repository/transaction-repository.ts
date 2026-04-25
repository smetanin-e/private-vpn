import { prisma } from "@/shared/lib/prisma"
import { TransactionTopUp } from "../model/types"
import { TransactionType } from "@/generated/prisma/enums"

export const transactionRepository = {
  async getAll(search?: string, take?: number, skip?: number) {
    return prisma.balanceTransaction.findMany({
      where: search
        ? {
            OR: [
              ...(Number.isNaN(Number(search))
                ? []
                : [
                    {
                      clientId: Number(search),
                    },
                  ]),

              {
                client: {
                  name: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              },
            ],
          }
        : {},
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
}
