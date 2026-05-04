import { getUserSession } from "@/src/features/auth/actions/get-user-session"
import { Header } from "@/src/shared/components"
import { Peers } from "@/src/widgets/peers/peers"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Page() {
  const user = await getUserSession()
  if (!user) return redirect("/")

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <Header
        userId={user.id}
        title="Панель управления"
        name={user.name}
        links={<Link href={"/transaction"}>Транзакции</Link>}
      />

      <Peers />
    </div>
  )
}
