import React from "react"

import { ArrowUpCircle, ArrowDownCircle, TrendingUp } from "lucide-react"
import { formatTraffic } from "@/src/shared/lib/format-traffic"
import { formatMonthYear } from "@/src/shared/lib/format-month-year"

interface MonthlyStatsItemProps {
  stat: any
}

export const MonthlyStatsItem: React.FC<MonthlyStatsItemProps> = ({ stat }) => {
  const received = stat.receivedBytes
  const sent = stat.sendBytes

  return (
    <div className="border-b border-slate-700 p-3 transition-colors hover:bg-slate-800/30">
      <div className="flex items-center gap-3">
        <TrendingUp className="h-4 w-4 text-blue-400" />
        <div className="flex grow justify-between">
          <p className="font-medium text-white">
            {formatMonthYear(stat.month)}
          </p>
          <div className="flex gap-4 text-slate-400">
            <p className="flex items-center gap-1">
              <ArrowDownCircle className="h-4 w-4 text-green-400" />

              <span> {formatTraffic(sent)}</span>
            </p>
            <p className="flex items-center gap-1">
              <ArrowUpCircle className="h-4 w-4 text-orange-400" />

              <span> {formatTraffic(received)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
