export type ClientDTO = {
  id: number
  name: string
  description: string
  tariff: number
  peer: {
    id: number
    wgPeerId: number
    server: {
      name: string
    }
  }
}
