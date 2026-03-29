import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"
import { getPublicBaseUrl } from "@/lib/runtime-config"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans-ui",
})

const baseUrl = getPublicBaseUrl()

export const metadata: Metadata = {
  title: "Driver Course Platform",
  description:
    "Online driver improvement courses with enrollment, progress tracking, final exam completion, and certificate delivery.",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Driver Course Platform",
    description:
      "Online driver improvement courses with enrollment, progress tracking, final exam completion, and certificate delivery.",
    url: baseUrl,
    siteName: "Driver Course Platform",
    images: [
      {
        url: `${baseUrl}/logo.svg`,
        width: 256,
        height: 256,
        alt: "Driver Course Platform logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Driver Course Platform",
    description:
      "Online driver improvement courses with enrollment, progress tracking, final exam completion, and certificate delivery.",
    images: [`${baseUrl}/logo.svg`],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const language = await getPreferredSiteLanguage()

  return (
    <html lang={language} className={`${inter.variable} h-full antialiased`}>
      <body className={`${inter.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  )
}
