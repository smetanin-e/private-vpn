import { Peers } from "@/widgets/peers/peers"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-center">
      <h1 className="text-2xl font-medium">Это будет самый крутой ВПН!</h1>
      <Peers />
    </div>
  )
}
