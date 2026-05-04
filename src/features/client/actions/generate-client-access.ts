"use server"

import { clientRepository } from "@/src/entities/client/repository/client-repository"
import {
  generateAccessToken,
  hashToken,
} from "@/src/shared/lib/auth/password-utils"

export async function generateClientAccess(clientId: number) {
  const { tokenId, secret, fullToken } = generateAccessToken()
  const hash = await hashToken(secret)

  await clientRepository.updateToken(clientId, tokenId, hash)

  return {
    accessLink: `https://app.esmet.store/client/${fullToken}`,
  }
}
