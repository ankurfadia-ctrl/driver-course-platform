export type SiteLanguage = "en" | "es"

export const SITE_LANGUAGE_COOKIE = "site-language"

export function normalizeSiteLanguage(value?: string | null): SiteLanguage {
  return value === "es" ? "es" : "en"
}
