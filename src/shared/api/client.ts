import axios from "axios"

export const clientAxiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true, // чтобы куки отправлялись автоматически
})
