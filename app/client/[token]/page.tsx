import { getClientByToken } from "@/entities/client/model/lib/get-client-by-token"

export default async function ClientPage({
  params,
}: {
  params: { token: string }
}) {
  const token = (await params).token
  const client = await getClientByToken(token)

  if (!client) {
    return <div>Invalid link</div>
  }

  return (
    <div>
      <h1>{client.name}</h1>
      <p>Balance: {client.balance}</p>
      <p>Status: {client.peer?.status}</p>
    </div>
  )
}
