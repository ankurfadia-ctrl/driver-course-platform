import type { MetadataRoute } from "next"
import { COURSE_CONFIGS } from "@/lib/course-config"
import { PUBLIC_SITE_STATE_SLUGS } from "@/lib/public-site-visibility"
import { getPublicBaseUrl } from "@/lib/runtime-config"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getPublicBaseUrl()
  const now = new Date()
  const stateSlugs = PUBLIC_SITE_STATE_SLUGS.filter(
    (stateSlug) => COURSE_CONFIGS[stateSlug]
  )
  const stateRoutes = stateSlugs.flatMap((state) => [
    `/${state}`,
    `/${state}/login`,
    `/${state}/signup`,
    `/${state}/checkout`,
    `/${state}/price-match`,
    `/${state}/disclosures`,
    `/${state}/faq`,
    `/${state}/privacy`,
    `/${state}/terms`,
    `/${state}/refunds`,
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
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/copyright`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/verify`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/minnesota-parent-education`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/minnesota-parent-education/curriculum`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/minnesota-parent-education/pricing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/minnesota-parent-education/enroll`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/minnesota-parent-education/price-match`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/minnesota-parent-education/certificate`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/minnesota-parent-education/faq`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/minnesota-parent-education/reviewer`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/south-dakota-parenting`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/south-dakota-parenting/curriculum`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/south-dakota-parenting/pricing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/south-dakota-parenting/price-match`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/south-dakota-parenting/certificate`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/south-dakota-parenting/faq`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/south-dakota-parenting/reviewer`,
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
