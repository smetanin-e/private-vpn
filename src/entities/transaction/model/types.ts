import { BalanceTransaction, Client } from "@/generated/prisma/client"
import { TransactionType } from "@/generated/prisma/enums"

export type CreateTransactionDTO = {
  clientId: number
  amount?: number
  type: TransactionType
}

export type TransactionTopUp = {
  clientId: number
  amount: number
}

export type TransactionDTO = BalanceTransaction & {
  client: Pick<Client, "id" | "name">
}
