import { getClientByToken } from "@/entities/client/model/lib/get-client-by-token"
import { WgPeerStatus } from "@/generated/prisma/enums"
import { WgLogo } from "@/shared/components"
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui"
import { cn } from "@/shared/lib/utils"

export default async function ClientInfoPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params

  const client = await getClientByToken(token)

  if (!client) {
    return <div>Invalid link</div>
  }

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="flex justify-center">
        <Card className="border-slate-700 bg-slate-900/50 transition-colors hover:border-slate-600">
          <CardHeader>
            <CardTitle>
              {" "}
              <div className="flex gap-2">
                <WgLogo width={25} height={25} />

                <span className="text-lg text-muted-foreground">
                  Client ID:{" "}
                </span>

                <code className="truncate font-mono text-lg">{client.id}</code>
              </div>
            </CardTitle>
            <CardDescription>
              Информационная страница вашего VPN
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p>
              Ваш баланс:{" "}
              <span
                className={cn(
                  client.balance <= 0 ? "text-red-400" : "text-green-400"
                )}
              >
                {client.balance} ₽
              </span>
            </p>
            <div className="flex items-center gap-2">
              <p>Статус VPN: </p>
              <Badge
                variant={
                  client.peer?.status === WgPeerStatus.ACTIVE
                    ? "success"
                    : "destructive"
                }
              >
                {client.peer?.status === WgPeerStatus.ACTIVE
                  ? "Активен"
                  : "Отключен"}
              </Badge>
            </div>

            <p>
              Ежедневное списание в размере{" "}
              {client.isFree ? "Бесплатно" : `${client.tariff} ₽`}{" "}
            </p>
          </CardContent>
          <CardFooter>
            <div>
              {" "}
              <p>
                Чтобы пополнить счет обратитесь к Евгению 😉 и сообщите свой
                Client ID
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
