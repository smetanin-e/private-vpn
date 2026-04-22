export function validateCronToken(req: Request) {
  const authHeader = req.headers.get("authorization")
  if (!authHeader) return false

  const token = authHeader.replace("Bearer ", "")
  return token === process.env.CRON_SECRET
}
