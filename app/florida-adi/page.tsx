import type { Metadata } from "next"
import FloridaTrackPreviewPage from "@/components/florida-track-preview-page"
import { getFloridaTrackPreview } from "@/lib/florida-course-tracks"
import { getPublicBaseUrl } from "@/lib/runtime-config"

const preview = getFloridaTrackPreview("fl-adi")
const baseUrl = getPublicBaseUrl()

export const metadata: Metadata = {
  title: preview?.name ?? "Florida ADI Preview",
  description:
    preview?.summary ??
    "Florida Advanced Driver Improvement preview and approval-readiness notes.",
  alternates: {
    canonical: "/florida-adi",
  },
  openGraph: {
    title: preview?.name ?? "Florida ADI Preview",
    description:
      preview?.summary ??
      "Florida Advanced Driver Improvement preview and approval-readiness notes.",
    url: `${baseUrl}/florida-adi`,
    siteName: "Florida Driver Improvement Courses",
    images: [
      {
        url: `${baseUrl}/logo.svg`,
        width: 256,
        height: 256,
        alt: preview?.name ?? "Florida ADI Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: preview?.name ?? "Florida ADI Preview",
    description:
      preview?.summary ??
      "Florida Advanced Driver Improvement preview and approval-readiness notes.",
    images: [`${baseUrl}/logo.svg`],
  },
}

export default function FloridaADIPage() {
  return <FloridaTrackPreviewPage trackCode="fl-adi" />
}
