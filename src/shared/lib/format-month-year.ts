export function formatMonthYear(dateString: string | Date): string {
  const date = new Date(dateString)
  const formatted = date.toLocaleDateString("ru-RU", {
    month: "long",
    year: "numeric",
  })
  // Делаем первый символ заглавным
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}
