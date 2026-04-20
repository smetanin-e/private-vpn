import { peerApi } from "../api"

export const showQrCode = async (peerId: number) => {
  try {
    const res = await peerApi.getQr(peerId)
    return URL.createObjectURL(res.data)
  } catch (error) {
    console.error("[showQrCode]", error)
  }
}
