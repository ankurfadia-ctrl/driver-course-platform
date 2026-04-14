import type { Metadata } from "next"
import { Inter } from "next/font/google"
import PublicHeader from "@/components/site/public-header"
import PublicFooter from "@/components/site/public-footer"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const language = await getPreferredSiteLanguage()

  return (
    <html lang={language} className={`${inter.variable} h-full antialiased`}>
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <PublicHeader language={language} />
        {children}
        <PublicFooter language={language} />
      </body>
    </html>
  )
}
