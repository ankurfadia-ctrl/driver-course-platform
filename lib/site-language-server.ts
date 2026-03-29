import { cookies } from "next/headers"
import { normalizeSiteLanguage, type SiteLanguage } from "@/lib/site-language"

export async function getPreferredSiteLanguage(): Promise<SiteLanguage> {
  const cookieStore = await cookies()
  return normalizeSiteLanguage(cookieStore.get("site-language")?.value)
}
