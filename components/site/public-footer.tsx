import Link from "next/link"
import type { SiteLanguage } from "@/lib/site-language"

const footerLinks = {
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

export default function PublicFooter({ language = "en" }: { language?: SiteLanguage }) {
  const year = new Date().getFullYear()
  const isSpanish = language === "es"
  const links = isSpanish ? footerLinks.es : footerLinks.en

  return (
    <footer className="border-t border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {isSpanish ? "Portal nacional de cursos" : "National Course Portal"}
            </div>
            <p className="text-sm leading-7 text-slate-600">
              {isSpanish
                ? "Mejoramiento para conductores, educacion para padres y soporte de certificados en un solo lugar."
                : "Online driver improvement, parenting education, and certificate support in one place."}
            </p>
            <p className="text-sm leading-7 text-slate-600">
              {isSpanish ? "Soporte:" : "Support:"}{" "}
              <a
                href="mailto:admin@nationaldriverimprovement.com"
                className="font-semibold text-slate-900 hover:text-blue-700"
              >
                admin@nationaldriverimprovement.com
              </a>
            </p>
          </div>

          <nav className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-slate-700 hover:text-slate-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {isSpanish
              ? `Copyright ${year} Portal nacional de cursos. Todos los derechos reservados.`
              : `Copyright ${year} National Course Portal. All rights reserved.`}
          </div>
          <div>
            {isSpanish
              ? "La disponibilidad del curso varia segun el estado y el estatus de aprobación."
              : "Course availability varies by state and approval status."}
          </div>
        </div>
      </div>
    </footer>
  )
}
