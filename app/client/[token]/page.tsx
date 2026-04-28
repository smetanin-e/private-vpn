import { getClientByToken } from "@/entities/client/model/lib/get-client-by-token"

export default async function ClientInfoPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params

  const client = await getClientByToken(token)
  console.log(client)
  if (!client) {
    return <div>Invalid link</div>
  }

  return (
    <div>
      <h1>{client.id}</h1>
      <p>Balance: {client.balance}</p>
      <p>Status: {client.peer?.status}</p>
      <p>Списание в день: {client.tariff}</p>
    </div>
  )
}
