"use client"
import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui"
import { CircleDollarSign, CreditCard } from "lucide-react"
import { EmptyData, LoadingBounce, ShowMore } from "@/shared/components"

import { cn } from "@/shared/lib/utils"
import { useGetTransactions } from "@/entities/transaction/model/hooks"
import { TransactionItem } from "@/entities/transaction/ui"
import { TransactionType } from "@/generated/prisma/enums"
import { SearchTransaction } from "@/entities/transaction/ui/search-transaction"

interface Props {
  className?: string
}

export const Transactions: React.FC<Props> = ({ className }) => {
  const [searchValue, setSearchValue] = React.useState("")
  const { data, hasNextPage, isLoading, fetchNextPage, isFetchingNextPage } =
    useGetTransactions(searchValue)
  const transactions = data?.pages.flatMap((page) => page.transactions) ?? []

  return (
    <Card
      className={cn(
        "relative border-slate-700 bg-slate-800/50 pb-1 backdrop-blur-sm",
        className
      )}
    >
      <CardHeader>
        <CardTitle className="text-white">Транзакции</CardTitle>
        <CardDescription className="text-slate-300">
          Фиксация пополнений и ежедневных списаний
        </CardDescription>
        <SearchTransaction
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingBounce />
        ) : (
          <>
            {transactions.length === 0 ? (
              <EmptyData text="Транзакции отсутствуют" />
            ) : (
              <div>
                {transactions.map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    icon={
                      transaction.type === TransactionType.TOP_UP ? (
                        <CreditCard className="h-4 w-4 text-green-400" />
                      ) : (
                        <CircleDollarSign className="h-4 w-4 text-red-400" />
                      )
                    }
                    transaction={transaction}
                  />
                ))}
              </div>
            )}
          </>
        )}
        {hasNextPage && (
          <ShowMore
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          />
        )}
      </CardContent>
    </Card>
  )
}
