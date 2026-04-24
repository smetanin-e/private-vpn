import { clientAxiosInstance } from "@/shared/service/instance"

export const showQrCode = async (peerId: number) => {
  try {
    const res = await clientAxiosInstance.get(`/api/peer/${peerId}/qr`, {
      responseType: "blob", // 👈 ВОТ ЭТО КЛЮЧ
    })

    return URL.createObjectURL(res.data)
  } catch (error) {
    console.error("[showQrCode]", error)
  }
}
