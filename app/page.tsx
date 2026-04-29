import { AuthModal } from "@/entities/user/ui/auth-modal"
import { getUserSession } from "@/features/auth/actions/get-user-session"
import { redirect } from "next/navigation"

export default async function Page() {
  const user = await getUserSession()
  if (user) {
    return redirect("/dashboard")
  }
  return (
    <div className="flex min-h-screen flex-col bg-linear-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="flex grow flex-col items-center justify-center">
        <h1 className="mb-4 text-center text-4xl font-bold md:text-5xl">
          app.esmet.store
        </h1>

        <p className="text-l mb-8 max-w-xl p-2 text-center text-gray-300"></p>

        <AuthModal />
      </div>
    </div>
  )
}
