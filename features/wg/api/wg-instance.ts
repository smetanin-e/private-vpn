import axios from "axios"

export const wgInstance = axios.create({
  baseURL: process.env.WG_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.WG_API_TOKEN}`,
  },
})
