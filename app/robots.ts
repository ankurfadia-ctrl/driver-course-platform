import type { MetadataRoute } from "next"
import { getPublicPreviewRobotsDisallowPaths } from "@/lib/public-site-visibility"
import { getPublicBaseUrl } from "@/lib/runtime-config"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getPublicBaseUrl()

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/admin/",
          ...getPublicPreviewRobotsDisallowPaths(),
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
