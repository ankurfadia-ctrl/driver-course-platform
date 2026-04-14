import Link from "next/link"
import LanguageToggle from "@/components/language-toggle"
import type { SiteLanguage } from "@/lib/site-language"

const navLinks = {
  en: [
    { label: "Home", href: "/" },
    { label: "Virginia Driver Improvement", href: "/virginia" },
    { label: "Minnesota Parenting", href: "/minnesota-parent-education" },
    { label: "South Dakota Parenting", href: "/south-dakota-parenting" },
    { label: "Boating Safety", href: "/boating" },
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
    { label: "Seguridad náutica", href: "/boating" },
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
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3 text-slate-900">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {isSpanish ? "Portal nacional de cursos" : "National Course Portal"}
            </span>
          </Link>
          <LanguageToggle language={language} compact />
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-slate-700">
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
