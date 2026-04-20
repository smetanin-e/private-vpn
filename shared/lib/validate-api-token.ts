import { NextRequest } from "next/server"

export function validateApiToken(req: NextRequest) {
  const authHeader = req.headers.get("authorization")

  if (!authHeader?.startsWith("Bearer ")) {
    console.log("No Bearer token found")
    return false
  }

  const token = authHeader.split(" ")[1]
  const isValid =
    token === process.env.INTERNAL_API_TOKEN ||
    token === process.env.API_READ_KEY ||
    token === process.env.NEXT_PUBLIC_API_READ_KEY

  return isValid
}
