import type { Metadata } from "next"
import FloridaTrackPreviewPage from "@/components/florida-track-preview-page"
import { getFloridaTrackPreview } from "@/lib/florida-course-tracks"
import { getPublicBaseUrl } from "@/lib/runtime-config"

const preview = getFloridaTrackPreview("fl-tlsae")
const baseUrl = getPublicBaseUrl()

export const metadata: Metadata = {
  title: preview?.name ?? "Florida TLSAE Preview",
  description:
    preview?.summary ??
    "Florida Traffic Law and Substance Abuse Education preview and approval-readiness notes.",
  alternates: {
    canonical: "/florida-tlsae",
  },
  openGraph: {
    title: preview?.name ?? "Florida TLSAE Preview",
    description:
      preview?.summary ??
      "Florida Traffic Law and Substance Abuse Education preview and approval-readiness notes.",
    url: `${baseUrl}/florida-tlsae`,
    siteName: "Florida Driver Improvement Courses",
    images: [
      {
        url: `${baseUrl}/logo.svg`,
        width: 256,
        height: 256,
        alt: preview?.name ?? "Florida TLSAE Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: preview?.name ?? "Florida TLSAE Preview",
    description:
      preview?.summary ??
      "Florida Traffic Law and Substance Abuse Education preview and approval-readiness notes.",
    images: [`${baseUrl}/logo.svg`],
  },
}

export default function FloridaTLSAEPage() {
  return <FloridaTrackPreviewPage trackCode="fl-tlsae" />
}
