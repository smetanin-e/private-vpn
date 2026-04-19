import "./globals.css"
import { Geist, Geist_Mono } from "next/font/google"
import { cn } from "@/shared/lib/utils"
import { ThemeProvider } from "@/shared/components/theme-provider"
import { Toaster } from "@/shared/components/ui"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ThemeProvider>
          {children} <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
