"use client"

import { useMemo } from "react"
import { normalizeSiteLanguage, type SiteLanguage } from "@/lib/site-language"

function readSiteLanguageFromDocument(): SiteLanguage {
  if (typeof document === "undefined") {
    return "en"
  }

  const cookieValue = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith("site-language="))
    ?.split("=")[1]

  return normalizeSiteLanguage(cookieValue)
}

export function usePreferredSiteLanguageClient(): SiteLanguage {
  return useMemo(() => readSiteLanguageFromDocument(), [])
}
