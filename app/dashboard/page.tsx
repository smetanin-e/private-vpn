import { getUserSession } from "@/features/auth/actions/get-user-session"
import { Header } from "@/shared/components"
import { Peers } from "@/widgets/peers/peers"
import { redirect } from "next/navigation"

export default async function Page() {
  const user = await getUserSession()
  if (!user) return redirect("/")

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 text-center">
      <Header userId={user.id} title="Личный кабинет" name={user.name} />
      <Peers />
    </div>
  )
}
