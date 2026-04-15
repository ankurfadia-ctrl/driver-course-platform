import Link from "next/link"
import LanguageToggle from "@/components/language-toggle"
import type { SiteLanguage } from "@/lib/site-language"

const navLinks = {
  en: [
    { label: "Home", href: "/" },
    { label: "Virginia Driver Improvement", href: "/virginia" },
    { label: "Minnesota Parenting", href: "/minnesota-parent-education" },
    { label: "South Dakota Parenting", href: "/south-dakota-parenting" },
    { label: "Certificate Verification", href: "/verify" },
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Copyright", href: "/copyright" },
  ],
  es: [
    { label: "Inicio", href: "/" },
    { label: "Mejoramiento para conductores de Virginia", href: "/virginia" },
    { label: "Educación para padres de Minnesota", href: "/minnesota-parent-education" },
    { label: "Educación para padres de Dakota del Sur", href: "/south-dakota-parenting" },
    { label: "Verificación de certificados", href: "/verify" },
    { label: "Términos", href: "/terms" },
    { label: "Privacidad", href: "/privacy" },
    { label: "Copyright", href: "/copyright" },
  ],
} as const

export default function PublicHeader({ language = "en" }: { language?: SiteLanguage }) {
  const isSpanish = language === "es"
  const links = isSpanish ? navLinks.es : navLinks.en

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3 text-slate-900">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {isSpanish ? "Portal nacional de cursos" : "National Course Portal"}
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageToggle language={language} compact />

            {/* Mobile hamburger menu */}
            <details className="group relative sm:hidden">
              <summary
                className="flex cursor-pointer list-none items-center rounded-lg border border-slate-300 p-2 text-slate-700 hover:bg-slate-50"
                aria-label={isSpanish ? "Abrir menú" : "Open menu"}
              >
                <svg className="h-5 w-5 group-open:hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg className="hidden h-5 w-5 group-open:block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </summary>
              <nav className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                {links.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </details>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="mt-3 hidden flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-slate-700 sm:flex">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-slate-950">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
