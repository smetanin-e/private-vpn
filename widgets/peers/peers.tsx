"use client"
import React from "react"
import { cn } from "@/shared/lib/utils"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Switch,
} from "@/shared/components/ui"

import { Download, QrCode, Trash2 } from "lucide-react"
import { WgLogo } from "@/shared/components"

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
          <div className="flex space-x-6">Тут будет общее количество</div>
          <Button variant={"outline"} size={"sm"}>
            Добавить профиль
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 p-1">
        <div className="space-y-4">
          <div className="border-slate-700 bg-slate-900/50 p-4 transition-colors hover:border-slate-600">
            <p className="mb-1 text-right text-sm">Иван Иванов</p>

            <div className="grid grid-cols-[auto_1fr] items-center space-x-6">
              <div className="flex flex-col space-y-2">
                <div className="text-center">
                  <WgLogo width={25} height={25} />
                </div>

                <p className="text-xs">UID:1</p>
              </div>

              <div className="flex items-center justify-end gap-4">
                {/* Пополнение баланса */}
                <Button variant={"outline"} size={"sm"}>
                  Внести средства
                </Button>
                {/* Баланс */}
                <div>123 P.</div>
                {/* Платно / Бесплатно */}
                <div className="text-right md:text-center">
                  <Switch
                    disabled={false}
                    className="data-[state=checked]:bg-success data-[state=unchecked]:bg-gray-400"
                  />
                </div>
                {/* Активен / Неактивен */}
                <div className="text-right md:text-center">
                  <Switch
                    disabled={false}
                    className="data-[state=checked]:bg-success data-[state=unchecked]:bg-gray-400"
                  />
                </div>
                <div>
                  <Button size={"icon"} variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <Button size={"icon"} variant="outline">
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  size={"icon"}
                  variant="outline"
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="border-slate-700 bg-slate-900/50 p-4 transition-colors hover:border-slate-600">
            <p className="mb-1 text-right text-sm">Бойко А.П. Телефон жены</p>

            <div className="grid grid-cols-[auto_1fr] items-center space-x-6">
              <div className="flex flex-col space-y-2">
                <div className="text-center">
                  <WgLogo width={25} height={25} />
                </div>

                <p className="text-xs">vpn</p>
              </div>

              <div className="flex items-center justify-end gap-4">
                {/* Баланс */}
                <div>123 P.</div>
                {/* Платно / Бесплатно */}
                <div className="text-right md:text-center">
                  <Switch
                    disabled={false}
                    className="data-[state=checked]:bg-success data-[state=unchecked]:bg-gray-400"
                  />
                </div>
                {/* Активен / Неактивен */}
                <div className="text-right md:text-center">
                  <Switch
                    disabled={false}
                    className="data-[state=checked]:bg-success data-[state=unchecked]:bg-gray-400"
                  />
                </div>
                <div>
                  <Button size={"icon"} variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <Button size={"icon"} variant="outline">
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  size={"icon"}
                  variant="outline"
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="border-slate-700 bg-slate-900/50 p-4 transition-colors hover:border-slate-600">
            <p className="mb-1 text-right text-sm">Иван Иванов</p>

            <div className="grid grid-cols-[auto_1fr] items-center space-x-6">
              <div className="flex flex-col space-y-2">
                <div className="text-center">
                  <WgLogo width={25} height={25} />
                </div>

                <p className="text-xs">vpn</p>
              </div>

              <div className="flex items-center justify-end gap-4">
                {/* Баланс */}
                <div>123 P.</div>
                {/* Платно / Бесплатно */}
                <div className="text-right md:text-center">
                  <Switch
                    disabled={false}
                    className="data-[state=checked]:bg-success data-[state=unchecked]:bg-gray-400"
                  />
                </div>
                {/* Активен / Неактивен */}
                <div className="text-right md:text-center">
                  <Switch
                    disabled={false}
                    className="data-[state=checked]:bg-success data-[state=unchecked]:bg-gray-400"
                  />
                </div>
                <div>
                  <Button size={"icon"} variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <Button size={"icon"} variant="outline">
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  size={"icon"}
                  variant="outline"
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
