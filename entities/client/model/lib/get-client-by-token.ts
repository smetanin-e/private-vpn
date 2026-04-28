import { verifyToken } from "@/shared/lib/auth/password-utils"
import { clientRepository } from "../../repository/client-repository"

export async function getClientByToken(token: string) {
  const [tokenId, secret] = token.split(".")

  if (!tokenId || !secret) return null

  const client = await clientRepository.findByTokenId(tokenId)

  if (!client || !client.accessTokenHash) return null

  const isValid = await verifyToken(secret, client.accessTokenHash)

  if (!isValid) return null

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { accessTokenHash, ...clientWithoutHash } = client
  return clientWithoutHash
}
