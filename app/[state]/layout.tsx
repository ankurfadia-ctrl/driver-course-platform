// app/[state]/layout.tsx

import type { Metadata } from "next"
import type { ReactNode } from "react"
import CourseHeader from "@/components/course-header"
import StateFooter from "@/components/state-footer"
import { getCourseConfig } from "@/lib/course-config"
import { getPublicBaseUrl } from "@/lib/runtime-config"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>
}): Promise<Metadata> {
  const { state } = await params
  const config = getCourseConfig(state)
  const baseUrl = getPublicBaseUrl()
  const canonicalUrl = `${baseUrl}/${config.stateSlug}`

  return {
    title: config.siteTitle,
    description: config.marketingDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: config.siteTitle,
      description: config.marketingDescription,
      url: canonicalUrl,
      siteName: config.brandName,
      images: [
        {
          url: `${baseUrl}${config.logoSrc}`,
          width: 256,
          height: 256,
          alt: config.brandName,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: config.siteTitle,
      description: config.marketingDescription,
      images: [`${baseUrl}${config.logoSrc}`],
    },
  }
}

export default async function StateLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ state: string }>
}) {
  const { state } = await params
  const config = getCourseConfig(state)

  return (
    <div className="public-shell min-h-screen">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[24rem] bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.16),transparent_46%)]" />
      <CourseHeader state={state} />

      <main
        className="mx-auto max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8"
        data-state={config.stateSlug}
      >
        {children}
      </main>

      <StateFooter state={state} />
    </div>
  )
}
