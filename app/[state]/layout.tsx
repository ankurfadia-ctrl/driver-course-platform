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
    <div className="min-h-screen bg-slate-50">
      <CourseHeader state={state} />

      <main
        className="mx-auto max-w-6xl flex-1 px-4 py-6"
        data-state={config.stateSlug}
      >
        {children}
      </main>

      <StateFooter state={state} />
    </div>
  )
}
