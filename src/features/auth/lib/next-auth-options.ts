import CredentialsProvider from "next-auth/providers/credentials"
import { AuthOptions } from "next-auth"
import { verifyPassword } from "@/src/shared/lib/auth/password-utils"
import { userRepository } from "@/src/entities/user/repository/user-repository"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        login: { label: "login", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.error("[NEXT_AUTH] No credentials provided")
          throw new Error("Ошибка авторизации")
        }
        const values = {
          login: credentials.login,
          password: credentials.password,
        }
        const findUser = await userRepository.findUserByLogin(values.login)

        if (!findUser) {
          console.error("[NEXT_AUTH] User not found")
          throw new Error("Неверный логин или пароль")
        }

        const isPasswordValid = await verifyPassword(
          values.password,
          findUser.password,
          findUser.salt!
        )

        if (!isPasswordValid) {
          console.error("[NEXT_AUTH] Invalid login or password")
          throw new Error("Неверный логин или пароль")
        }

        return {
          id: String(findUser.id),
          login: findUser.login,
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account }) {
      return account?.provider === "credentials"
    },

    async jwt({ token, user }) {
      try {
        // Добавляем user из authorize
        if (user) {
          token.id = user.id
          token.login = user.login
        }

        return token
      } catch (error) {
        console.error("Error in jwt callback:", error)
        return token
      }
    },

    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id
      }

      return session
    },
  },
}
