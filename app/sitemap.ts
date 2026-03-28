import type { MetadataRoute } from "next"
import { COURSE_CONFIGS } from "@/lib/course-config"
import { getPublicBaseUrl } from "@/lib/runtime-config"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getPublicBaseUrl()
  const now = new Date()
  const stateSlugs = Object.keys(COURSE_CONFIGS)
  const stateRoutes = stateSlugs.flatMap((state) => [
    `/${state}`,
    `/${state}/login`,
    `/${state}/signup`,
    `/${state}/checkout`,
    `/${state}/disclosures`,
    `/${state}/faq`,
    `/${state}/privacy`,
    `/${state}/terms`,
    `/${state}/contact`,
  ])

  return [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/verify`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...stateRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: route.endsWith("/checkout") ? 0.9 : 0.8,
    })),
  ]
}
