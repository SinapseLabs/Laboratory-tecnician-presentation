import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Técnico de Laboratório: Um Profissional Essencial",
  description: "Informações sobre a carreira de Técnico de Laboratório, formação, mercado de trabalho e salário.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1", // Otimizado para mobile
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
