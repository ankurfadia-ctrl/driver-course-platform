import Link from "next/link"
import type { ReactNode } from "react"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"
import {
  MINNESOTA_PARENT_SITE_NAV,
  MINNESOTA_PARENT_SITE_NAV_ES,
  MINNESOTA_PARENT_SITE_SUPPORT,
} from "@/lib/minnesota-parent-education-site"

export default async function MinnesotaParentEducationLayout({
  children,
}: {
  children: ReactNode
}) {
  const language = await getPreferredSiteLanguage()
  const isSpanish = language === "es"
  const navItems = isSpanish ? MINNESOTA_PARENT_SITE_NAV_ES : MINNESOTA_PARENT_SITE_NAV

  return (
    <main className="public-shell min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="glass-panel overflow-hidden rounded-[2rem] border-[#d9efe7] bg-white">
          <div className="grid gap-6 border-b border-[#e3ece8] bg-[linear-gradient(135deg,#eefaf5_0%,#ffffff_52%,#f4fbff_100%)] px-6 py-8 lg:grid-cols-[1fr_auto] lg:items-start lg:px-8">
            <div className="space-y-4">
              <div className="section-label !bg-emerald-50 !text-emerald-800 before:!bg-emerald-600">
                {isSpanish ? "Educacion para padres de Minnesota" : "Minnesota Parent Education"}
              </div>
              <div>
                <Link
                  href="/"
                  className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 hover:text-slate-900"
                >
                  {isSpanish ? "Portal Nacional de Cursos" : "National Course Portal"}
                </Link>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  {isSpanish
                    ? "Fundamentos de Coparentalidad de Minnesota"
                    : "Minnesota Co-Parenting Foundations"}
                </h1>
                <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
                  {isSpanish
                    ? "Educacion para padres en linea enfocada en el bienestar infantil, comunicacion de menor conflicto y un certificado claro para asuntos familiares de Minnesota."
                    : "Online parent education focused on child well-being, lower-conflict communication, and a clear completion certificate for Minnesota family-law matters."}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/minnesota-parent-education/enroll"
                  className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
                >
                  {isSpanish ? "Inscripcion y matricula" : "Enrollment and tuition"}
                </Link>
                <Link
                  href="/minnesota-parent-education/curriculum"
                  className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  {isSpanish ? "Revisar plan de estudios" : "Review curriculum"}
                </Link>
              </div>
            </div>

            <div className="max-w-xs rounded-3xl border border-emerald-100 bg-white/90 px-5 py-4 text-sm leading-7 text-slate-700">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                {isSpanish ? "Necesitas ayuda?" : "Need help?"}
              </div>
              <div className="mt-3 font-semibold text-slate-950">
                {MINNESOTA_PARENT_SITE_SUPPORT.organization}
              </div>
              <div>{MINNESOTA_PARENT_SITE_SUPPORT.phone}</div>
              <div>{MINNESOTA_PARENT_SITE_SUPPORT.email}</div>
            </div>
          </div>

          <nav className="flex flex-wrap gap-3 px-6 py-5 lg:px-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8">{children}</div>
      </div>
    </main>
  )
}
