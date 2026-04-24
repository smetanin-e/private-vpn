import { TransactionType } from "@/generated/prisma/enums"

export type CreateTransactionDTO = {
  clientId: number
  amount?: number
  type: TransactionType
}

export type TransactionTopUp = {
  clientId: number
  description: string
  amount: number
}
