import { clientAxiosInstance } from "@/shared/service/instance"

export const showQrCode = async (peerId: number) => {
  try {
    console.log(peerId)
    const res = await clientAxiosInstance.get(`/api/peer/${peerId}/qr`, {
      responseType: "blob", // 👈 ВОТ ЭТО КЛЮЧ
    })
    console.log(res.data)
    return URL.createObjectURL(res.data)
  } catch (error) {
    console.error("[showQrCode]", error)
  }
}
