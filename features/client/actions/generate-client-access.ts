"use server"

import { clientRepository } from "@/entities/client/repository/client-repository"
import {
  generateAccessToken,
  hashToken,
} from "@/shared/lib/auth/password-utils"

export async function generateClientAccess(clientId: number) {
  const { tokenId, secret, fullToken } = generateAccessToken()
  const hash = await hashToken(secret)

  await clientRepository.updateToken(clientId, tokenId, hash)

  //TODO ИСПРАВИТЬ ССЫЛКУ ПРИ ДЕПЛОЕ
  return {
    accessLink: `http://localhost:3000/client/${fullToken}`,
  }
}
