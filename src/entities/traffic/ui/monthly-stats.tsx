"use client"
import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/shared/components/ui"
import { TrendingUp } from "lucide-react"
import { EmptyData, LoadingBounce, ShowMore } from "@/src/shared/components"
import { cn } from "@/src/shared/lib/utils"
import { useMonthlyStats } from "../hooks/use-monthly-stats"
import { MonthlyStatsItem } from "@/src/entities/traffic/ui/monthly-stats-item"

interface Props {
  className?: string
  peerId?: number
  title?: string
  description?: string
}

export const MonthlyStats: React.FC<Props> = ({
  className,
  peerId,
  title = "Статистика трафика по месяцам",
  description = "Данные о полученном и отправленном трафике за прошлые месяцы",
}) => {
  const { data, hasNextPage, isLoading, fetchNextPage, isFetchingNextPage } =
    useMonthlyStats(peerId)

  const stats = data?.pages.flatMap((page) => page) ?? []

  return (
    <Card
      className={cn(
        "relative mx-2 border-slate-700 bg-slate-800/50 pb-1 backdrop-blur-sm",
        className
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          {title}
        </CardTitle>
        <CardDescription className="text-slate-300">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingBounce />
        ) : (
          <>
            {stats.length === 0 ? (
              <EmptyData text="Статистика трафика отсутствует" />
            ) : (
              <div>
                {stats.map((stat) => (
                  <MonthlyStatsItem key={stat.id} stat={stat} />
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
