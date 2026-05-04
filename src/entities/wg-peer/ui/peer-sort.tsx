"use client"

import React from "react"
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/shared/components/ui"

import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

export type SortField = "balance" | "lastActivity" | "sendBytes"
export type SortOrder = "asc" | "desc"

interface PeerSortProps {
  sortField: SortField
  sortOrder: SortOrder
  onSort: (field: SortField, order: SortOrder) => void
}

const sortLabels: Record<SortField, string> = {
  balance: "Баланс",
  lastActivity: "Последняя активность",
  sendBytes: "Использованно трафика",
}

export const PeerSort: React.FC<PeerSortProps> = ({
  sortField = "sendBytes", // добавлено значение по умолчанию
  sortOrder = "desc",
  onSort,
}) => {
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Если сортируем по тому же полю, меняем порядок
      onSort(field, sortOrder === "asc" ? "desc" : "asc")
    } else {
      // Новое поле - по умолчанию desc
      onSort(field, "desc")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <ArrowUpDown className="h-3.5 w-3.5" />
          Сортировка: {sortLabels[sortField]} ({sortOrder === "asc" ? "↑" : "↓"}
          )
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(sortLabels).map(([field, label]) => (
          <DropdownMenuItem
            key={field}
            onClick={() => handleSort(field as SortField)}
            className="flex justify-between"
          >
            {label}
            {sortField === field &&
              (sortOrder === "asc" ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              ))}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
