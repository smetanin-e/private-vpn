import { clientAxiosInstance } from "@/shared/service/instance"

export const downloadConfig = async (peerId: number, peerName: string) => {
  try {
    const res = await clientAxiosInstance.get(`/api/peer/${peerId}/config`, {
      responseType: "blob",
    })
    // создаём ссылку и скачиваем файл
    const url = window.URL.createObjectURL(res.data)
    const a = document.createElement("a")
    a.href = url
    a.download = `${peerName}.conf`
    a.click()
    window.URL.revokeObjectURL(url)

    return { success: true }
  } catch (error) {
    console.error("[downloadConfig]", error)
    return {
      success: false,
      message: "Ошибка при скачивании файла конфигурации",
    }
  }
}
