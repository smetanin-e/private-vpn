import React from "react"
import { TransactionDTO } from "../model/types"
import { formatDate } from "@/shared/lib/format-date"
import { TransactionType } from "@/generated/prisma/enums"

interface Props {
  className?: string
  icon: React.ReactNode
  transaction: TransactionDTO
  clientId?: number
}

export const TransactionItem: React.FC<Props> = ({
  icon,
  transaction,
  clientId,
}) => {
  return (
    <div className="mb-4 flex items-start gap-4">
      <div className="mt-2"> {icon}</div>

      <div className="flex-1">
        <div className="text-md gap-4 text-white">
          {transaction.type === TransactionType.TOP_UP ? (
            <>
              <span className="">Пополнение счета в размере - </span>
              <span className="text-green-400">{transaction.amount} ₽.</span>
            </>
          ) : (
            <>
              <span>Списание средств в размере - </span>
              <span className="text-red-400">{transaction.amount} ₽.</span>
            </>
          )}
          {!clientId && (
            <>
              {" "}
              <span> Клиент: </span>
              <span className="text-orange-400">
                {transaction.client.name}.
              </span>
              <span> Client ID: </span>
              <span className="text-orange-400">{transaction.client.id} </span>
            </>
          )}

          <div className="text-xs text-slate-400">
            {formatDate(transaction.createdAt.toLocaleString())}
          </div>
        </div>
      </div>
    </div>
  )
}
