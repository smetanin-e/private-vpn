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

  // 🧩 Правильный AllowedIPs, чтобы локальная сеть не обрывалась
  const allowedIPs = "0.0.0.0/0, 128.0.0.0/0, ::/0"
  config = config.replace(/AllowedIPs\s*=\s*.+/i, `AllowedIPs = ${allowedIPs}`)
  return config
}
