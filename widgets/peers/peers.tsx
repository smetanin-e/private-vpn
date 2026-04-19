"use client"
import React from "react"
import { cn } from "@/shared/lib/utils"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui"

import { PeerCard } from "@/entities/wg-peer/ui"

interface Props {
  className?: string
}

export const Peers: React.FC<Props> = () => {
  return (
    <Card
      className={cn(
        "relative min-h-80 max-w-full border-blue-600 bg-slate-800/50 backdrop-blur-sm"
      )}
    >
      <CardHeader className="mb-0 pb-0">
        <CardTitle>Профили WireGuard</CardTitle>
        <div className="flex-wrap space-y-4 text-sm sm:flex sm:items-center sm:justify-between sm:space-y-0 sm:space-x-6 md:flex-nowrap">
          <div className="flex space-x-6">
            Тут будет общее количество и поиск
          </div>
          <Button variant={"outline"} size={"sm"}>
            Добавить профиль
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 p-1">
        <PeerCard
          name="Смолоперегонный Александр Иванович"
          description="Телефон жены Xiaomi"
          uid="10"
          balance={123}
        />
        <PeerCard
          name="Петровна"
          description="Компьютер домашний"
          uid="11"
          balance={0}
        />
        <PeerCard
          name="Юля Сестра"
          description="Роутер"
          uid="12"
          balance={20}
        />
        <PeerCard
          name="Юля Сестра"
          description="Телефон личный"
          uid="13"
          balance={20000}
        />
      </CardContent>
    </Card>
  )
}
