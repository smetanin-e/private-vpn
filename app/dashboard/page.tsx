import { Logout } from "@/features/auth"
import { getUserSession } from "@/features/auth/actions/get-user-session"
import { Peers } from "@/widgets/peers/peers"
import { redirect } from "next/navigation"

export default async function Page() {
  const user = await getUserSession()
  if (!user) return redirect("/")

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-center">
      <h1 className="text-2xl font-medium">Панель управления</h1> <Logout />
      <Peers />
    </div>
  )
}
