import axios from "axios"
import "server-only"

export const serverAxiosInstance = axios.create({
  baseURL: process.env.API_URL_SERVER || "http://localhost:3000",
})

serverAxiosInstance.interceptors.request.use((config) => {
  const token = process.env.INTERNAL_API_TOKEN
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
