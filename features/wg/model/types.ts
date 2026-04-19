export interface WireGuardPeerResponse {
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
  last_online: string | null
  traffic: WireGuardTraffic | null
  data: PeerName
}

interface WireGuardTraffic {
  received: number
  sent: number
  total: number
}

interface PeerName {
  name: string
}
