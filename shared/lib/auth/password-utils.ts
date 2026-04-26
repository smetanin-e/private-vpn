import crypto from "crypto"
import bcrypt from "bcrypt"

export function hashPassword(password: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, 64, (error, hash) => {
      if (error) reject(error)
      resolve(hash.toString("hex").normalize())
    })
  })
}

export function generateSalt() {
  return crypto.randomBytes(16).toString("hex").normalize()
}

export async function verifyPassword(
  inputPassword: string,
  storedHash: string,
  storedSalt: string
): Promise<boolean> {
  const hash = await hashPassword(inputPassword, storedSalt)
  return storedHash === hash
}

//Утилиты для генерации токена клиента по которому он будет проверять баланс
export function generateAccessToken() {
  const tokenId = crypto.randomBytes(8).toString("hex")
  const secret = crypto.randomBytes(32).toString("hex")

  return {
    tokenId,
    secret,
    fullToken: `${tokenId}.${secret}`,
  }
}

export async function hashToken(secret: string) {
  return bcrypt.hash(secret, 10)
}

export async function verifyToken(secret: string, hash: string) {
  return bcrypt.compare(secret, hash)
}
