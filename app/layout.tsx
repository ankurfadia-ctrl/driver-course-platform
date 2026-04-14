import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { getPublicBaseUrl } from "@/lib/runtime-config"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans-ui",
})

const baseUrl = getPublicBaseUrl()

export const metadata: Metadata = {
  title: "National Course Portal",
  description:
    "Online parenting education, driver improvement, and boating safety course pages with enrollment, review guidance, and certificate support.",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "National Course Portal",
    description:
      "Online parenting education, driver improvement, and boating safety course pages with enrollment, review guidance, and certificate support.",
    url: baseUrl,
    siteName: "National Course Portal",
    images: [
      {
        url: `${baseUrl}/logo.svg`,
        width: 256,
        height: 256,
        alt: "National Course Portal logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "National Course Portal",
    description:
      "Online parenting education, driver improvement, and boating safety course pages with enrollment, review guidance, and certificate support.",
    images: [`${baseUrl}/logo.svg`],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className={`${inter.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  )
}
