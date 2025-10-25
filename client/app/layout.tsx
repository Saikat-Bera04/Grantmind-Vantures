import type React from "react"
import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import "@rainbow-me/rainbowkit/styles.css"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { GL } from "@/components/gl"
import { Providers } from "@/providers"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Grantmind Ventures",
  description: "Investment strategies that outperform the market",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased`} suppressHydrationWarning>
        <Providers>
          <GL hovering={false} />
          <div className="relative z-10">
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
