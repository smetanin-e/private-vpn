import { getUserSession } from "@/features/auth/actions/get-user-session"
import { Header } from "@/shared/components"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Page() {
  const user = await getUserSession()
  if (!user) return redirect("/")

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <Header userId={user.id} title="Личный кабинет" name={user.name} />
      <div></div>
      <Link href={"/dashboard"}>Клиенты</Link>
    </div>
  )
}
