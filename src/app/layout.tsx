import "./globals.css"
import type { ReactNode } from "react"

export const metadata = {
  title: "Петров Продукт",
  description: "B2B Mini App",
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-[#F5F7FA] text-[#1A1A1A] antialiased">
        {children}
      </body>
    </html>
  )
}