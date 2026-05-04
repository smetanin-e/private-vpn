import { MonthlyStats } from "@/src/entities/traffic/ui/monthly-stats"
import { getUserSession } from "@/src/features/auth/actions/get-user-session"
import { Header } from "@/src/shared/components"
import { Button } from "@/src/shared/components/ui"
import { Transactions } from "@/src/widgets/transactions/transactions"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Page() {
  const user = await getUserSession()
  if (!user) return redirect("/")

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <Header
        userId={user.id}
        title="Панель транзакций"
        name={user.name}
        links={<Link href={"/dashboard"}>Панель управления</Link>}
      />
      <div className="m-2">
        <Link href={"/dashboard"}>
          {" "}
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4" />
            На главную
          </Button>
        </Link>
      </div>

      <Transactions />
      <MonthlyStats />
    </div>
  )
}
