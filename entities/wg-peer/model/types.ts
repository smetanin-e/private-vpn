import { Client, WireguardServer } from "@/generated/prisma/client"
import { WgPeerStatus } from "@/generated/prisma/enums"

export type PeerQueryType = {
  id: number
  wgPeerId: number
  peerName: string
  status: WgPeerStatus
  receivedBytes: number
  sentBytes: number
  client: Pick<
    Client,
    | "id"
    | "name"
    | "description"
    | "isFree"
    | "balance"
    | "tariff"
    | "accessTokenId"
  >
  wireguardServer: Pick<WireguardServer, "name"> | null
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

export interface PeersStats {
  userId: number
  active: number
  disabled: number
  total: number
}
