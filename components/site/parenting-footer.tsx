import Link from "next/link"
import type { SiteLanguage } from "@/lib/site-language"

type NavItem = { label: string; href: string }
type SupportInfo = { organization: string; phone: string; email: string }

type ParentingFooterProps = {
  language?: SiteLanguage
  courseLabel: string
  courseLabelEs: string
  title: string
  titleEs: string
  navItems: readonly NavItem[]
  navItemsEs: readonly NavItem[]
  support: SupportInfo
}

export default function ParentingFooter({
  language = "en",
  courseLabel,
  courseLabelEs,
  title,
  titleEs,
  navItems,
  navItemsEs,
  support,
}: ParentingFooterProps) {
  const isSpanish = language === "es"
  const nav = isSpanish ? navItemsEs : navItems
  const label = isSpanish ? courseLabelEs : courseLabel
  const heading = isSpanish ? titleEs : title

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-slate-600 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {label}
            </div>
            <div className="mt-3 text-2xl font-semibold text-slate-950">
              {heading}
            </div>
            <p className="mt-3 leading-7">
              {isSpanish
                ? `Soporte: `
                : `Support: `}
              <a
                href={`mailto:${support.email}`}
                className="font-semibold text-slate-900 hover:text-blue-700"
              >
                {support.email}
              </a>
            </p>
            <p className="mt-1 leading-7">
              <a href={`tel:${support.phone.replace(/\D/g, "")}`} className="hover:text-slate-950">
                {support.phone}
              </a>
            </p>
            <p className="mt-4">
              <Link href="/" className="font-semibold text-slate-700 hover:text-slate-950">
                {isSpanish ? "← Portal Nacional de Cursos" : "← National Course Portal"}
              </Link>
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {isSpanish ? "Recursos" : "Course Pages"}
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-slate-950">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
