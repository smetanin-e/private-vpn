import { prisma } from "@/src/shared/lib/prisma"
import { UserDTO } from "../model/types"

const baseUserSelect = {
  id: true,
  login: true,
  name: true,
}

export const userRepository = {
  async findUserByLogin(login: string) {
    return prisma.user.findUnique({ where: { login } })
  },

  async findUserById(userId: number): Promise<UserDTO | null> {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: baseUserSelect,
      orderBy: {
        id: "asc",
      },
    })

    if (!user) return null
    return user
  },

  //   для смены пароля
  async findUserByIdWithPassword(userId: number) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        password: true,
        salt: true,
      },
    })
  },

  async updatePassword(userId: number, hashedPassword: string, salt: string) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        salt,
      },
    })
  },
}
