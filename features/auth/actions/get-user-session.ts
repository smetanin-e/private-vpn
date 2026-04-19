import { getServerSession } from "next-auth"
import { userRepository } from "@/entities/user/repository/user-repository"
import { authOptions } from "@/features/auth/lib/next-auth-options"

export const getUserSession = async () => {
  const session = await getServerSession(authOptions)

  const sessionUser = session?.user
  if (!sessionUser) return null

  const user = await userRepository.findUserById(Number(sessionUser.id))

  if (!user) return null
  return user
}
