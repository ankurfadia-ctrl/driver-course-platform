import type { Metadata } from "next"
import FloridaTrackPreviewPage from "@/components/florida-track-preview-page"
import { getFloridaTrackPreview } from "@/lib/florida-course-tracks"
import { getPublicBaseUrl } from "@/lib/runtime-config"

const preview = getFloridaTrackPreview("fl-mature-driver")
const baseUrl = getPublicBaseUrl()

export const metadata: Metadata = {
  title: preview?.name ?? "Florida Mature Driver Preview",
  description:
    preview?.summary ??
    "Florida Mature Driver preview and approval-readiness notes.",
  alternates: {
    canonical: "/florida-mature-driver",
  },
  openGraph: {
    title: preview?.name ?? "Florida Mature Driver Preview",
    description:
      preview?.summary ??
      "Florida Mature Driver preview and approval-readiness notes.",
    url: `${baseUrl}/florida-mature-driver`,
    siteName: "Florida Driver Improvement Courses",
    images: [
      {
        url: `${baseUrl}/logo.svg`,
        width: 256,
        height: 256,
        alt: preview?.name ?? "Florida Mature Driver Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: preview?.name ?? "Florida Mature Driver Preview",
    description:
      preview?.summary ??
      "Florida Mature Driver preview and approval-readiness notes.",
    images: [`${baseUrl}/logo.svg`],
  },
}

export default function FloridaMatureDriverPage() {
  return <FloridaTrackPreviewPage trackCode="fl-mature-driver" />
}
