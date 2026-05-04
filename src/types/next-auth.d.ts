import "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    login: string
  }

  interface Session {
    user: {
      id: string
      login: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    login: string
  }
}
