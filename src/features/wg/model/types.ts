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

// Возвращает peerApiInstance.create --
// {
//   id: 96,
//   server_public_key: 'zBRt439jllZU+vCiWk/qQfK5tMDqEzc23YQWrw8EODk=',
//   address: '10.8.0.50/24',
//   address_ipv6: 'fdcc:ad94:bacf:61a4::cafe:32/120',
//   private_key: '4HfnbZSlj08jG9vAq4dwOwB/g5L8Ik3YmajG1JUT8G0=',
//   public_key: 'Y/upsLyomkswZQ3I559FtzuMazIMU43VOqgOUuDfkH8=',
//   preshared_key: 'KGav2Zq9dJo0DNvS7qd0KzPExdAy/fVETqE0Ji+SyHk=',
//   enable: true,
//   allowed_ips: '0.0.0.0/0, ::/0',
//   dns: null,
//   persistent_keepalive: 0,
//   endpoint: '91.201.114.180:51820',
//   last_online: null,
//   traffic: null,
//   data: { name: 'wgconfig' }
// }

interface WireGuardTraffic {
  received: number
  sent: number
  total: number
}

interface PeerName {
  name: string
}
