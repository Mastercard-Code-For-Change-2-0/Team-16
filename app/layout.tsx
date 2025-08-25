import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/providers/auth-provider"
import { SocketProvider } from "@/components/providers/socket-provider"
import { MessageToastProvider } from "@/components/ui/message-toast"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "600", "700"],
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "DonateLink - Connect Donors with Receivers",
  description:
    "A modern donation matching portal by Seva Sahayog Foundation connecting donors with NGOs, schools, and community organizations.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable} antialiased`}>
      <body className="font-sans">
        <AuthProvider>
          <SocketProvider>
            <MessageToastProvider>{children}</MessageToastProvider>
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
