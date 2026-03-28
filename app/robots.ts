import type { MetadataRoute } from "next"
import { getPublicBaseUrl } from "@/lib/runtime-config"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getPublicBaseUrl()

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
