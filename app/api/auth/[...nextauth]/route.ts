import NextAuth from "next-auth"

import { authOptions } from "@/src/features/auth/lib/next-auth-options"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
