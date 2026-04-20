import { peerApi } from "../api"

export const downloadConfig = async (peerId: number, peerName: string) => {
  try {
    const res = await peerApi.getConfig(peerId)

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
