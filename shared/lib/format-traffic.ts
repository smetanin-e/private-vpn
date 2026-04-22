export function formatTraffic(bytes: number) {
  const gb = bytes / 1024 ** 3

  if (gb < 1) {
    const mb = bytes / 1024 ** 2
    return `${mb.toFixed(2)} MB`
  }

  return `${gb.toFixed(2)} GB`
}
