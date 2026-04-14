"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useTransition } from "react"
import {
  type SiteLanguage,
} from "@/lib/site-language"

export default function LanguageToggle({
  language,
  compact = false,
}: {
  language: SiteLanguage
  compact?: boolean
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [pending, startTransition] = useTransition()

  function setLanguage(nextLanguage: SiteLanguage) {
    if (nextLanguage === language) return

    const redirectTarget = `${pathname}${searchParams.size ? `?${searchParams.toString()}` : ""}`
    const nextUrl = `/api/language?value=${nextLanguage}&redirect=${encodeURIComponent(redirectTarget)}`

    startTransition(() => {
      window.location.assign(nextUrl)
    })
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm ${
        compact ? "" : ""
      }`}
      aria-label="Language selector"
    >
      {([
        ["en", "English"],
        ["es", "Español"],
      ] as const).map(([value, label]) => {
        const active = language === value

        return (
          <button
            key={value}
            type="button"
            onClick={() => setLanguage(value)}
            disabled={pending}
            aria-pressed={active}
            aria-current={active ? "true" : undefined}
            className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
              active
                ? "bg-slate-950 text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            } ${pending ? "opacity-70" : ""}`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
