import { NextRequest } from "next/server"

export function validateApiToken(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization") || ""

  // Проверяем формат Bearer-токена
  if (!authHeader.startsWith("Bearer ")) {
    console.log("Authorization header missing or invalid format")
    return false
  }

  // Безопасно извлекаем токен
  const token = authHeader.substring(7).trim()

  // Один токен для API-валидации
  const validToken = process.env.INTERNAL_API_TOKEN
  console.log(token === validToken)
  return token === validToken
}
