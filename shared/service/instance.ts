import axios from "axios"

const isServer = typeof window === "undefined"
const requestToken = isServer
  ? process.env.API_READ_KEY
  : process.env.NEXT_PUBLIC_API_READ_KEY

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    ...(requestToken && { Authorization: `Bearer ${requestToken}` }),
  },
})
