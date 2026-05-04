import { WireguardServer } from "@/generated/prisma/client"
import axios from "axios"

export function createWgClient(server: WireguardServer) {
  return axios.create({
    baseURL: server.baseUrl,
    headers: {
      Authorization: `Bearer ${server.apiToken}`,
    },
  })
}
