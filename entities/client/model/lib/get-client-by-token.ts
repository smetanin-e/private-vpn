import { verifyToken } from "@/shared/lib/auth/password-utils"
import { clientRepository } from "../../repository/client-repository"

export async function getClientByToken(token: string) {
  const [tokenId, secret] = token.split(".")

  if (!tokenId || !secret) return null

  const client = await clientRepository.findByTokenId(tokenId)

  if (!client || !client.accessTokenHash) return null

  const isValid = await verifyToken(secret, client.accessTokenHash)

  return isValid ? client : null
}
