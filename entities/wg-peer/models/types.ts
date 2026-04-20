import { Client } from "@/generated/prisma/client"
import { WgPeerStatus } from "@/generated/prisma/enums"

export type PeerQueryType = {
  id: number
  peerName: string
  status: WgPeerStatus
  client: Pick<Client, "id" | "name" | "description" | "is_free" | "balance">
}

export interface WireguardServerPeer {
  id: number
  server_public_key: string
  address: string
  address_ipv6: string
  private_key: string
  public_key: string
  preshared_key: string
  enable: boolean
  allowed_ips: string
  dns: string | null
  persistent_keepalive: number
  endpoint: string
  last_online: string | Date | null
  traffic: {
    received: number
    sent: number
  } | null
  data: {
    name: string
  }
}
