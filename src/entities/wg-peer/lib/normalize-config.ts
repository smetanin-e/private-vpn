export const normalizeWgConfig = (config: string) => {
  if (!config.includes("DNS")) {
    config = config.replace("[Interface]", `[Interface]\nDNS = 1.1.1.1`)
  }
  if (!config.includes("PersistentKeepalive")) {
    config = config.replace(
      "Endpoint =",
      "PersistentKeepalive = 25\nEndpoint ="
    )
  }
  // Ищем строки вида "Endpoint = домен:порт" и заменяем порт 51820 на 51821
  //   config = config.replace(
  //     /Endpoint\s*=\s*([^:]+):51820/g,
  //     "Endpoint = $1:51821"
  //   )

  // 🧩 Правильный AllowedIPs, чтобы локальная сеть не обрывалась
  const allowedIPs = "0.0.0.0/1, 128.0.0.0/1, ::/0"
  config = config.replace(/AllowedIPs\s*=\s*.+/i, `AllowedIPs = ${allowedIPs}`)
  return config
}
