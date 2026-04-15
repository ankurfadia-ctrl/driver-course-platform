import Link from "next/link"
import type { ReactNode } from "react"
import {
  SOUTH_DAKOTA_PARENT_SITE_NAV,
  SOUTH_DAKOTA_PARENT_SITE_NAV_ES,
  SOUTH_DAKOTA_PARENT_SITE_SUPPORT,
} from "@/lib/south-dakota-parenting-site"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"
import ParentingFooter from "@/components/site/parenting-footer"

export default async function SouthDakotaParentingLayout({
  children,
}: {
  children: ReactNode
}) {
  const language = await getPreferredSiteLanguage()
  const isSpanish = language === "es"
  const nav = isSpanish ? SOUTH_DAKOTA_PARENT_SITE_NAV_ES : SOUTH_DAKOTA_PARENT_SITE_NAV

  return (
    <main className="public-shell min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="glass-panel overflow-hidden rounded-[2rem] border-amber-100 bg-white">
          <div className="grid gap-6 border-b border-amber-100 bg-[linear-gradient(135deg,#fff7eb_0%,#ffffff_52%,#fdfaf2_100%)] px-6 py-8 lg:grid-cols-[1fr_auto] lg:items-start lg:px-8">
            <div className="space-y-4">
              <div className="section-label !bg-amber-50 !text-amber-900 before:!bg-amber-600">
                {isSpanish
                  ? "Curso de coparentalidad de Dakota del Sur"
                  : "South Dakota Parenting Course"}
              </div>
              <div>
                <Link
                  href="/"
                  className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 hover:text-slate-900"
                >
                  {isSpanish ? "Portal nacional de cursos" : "National Course Portal"}
                </Link>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                  {isSpanish
                    ? "Fundamentos de coparentalidad de Dakota del Sur"
                    : "South Dakota Co-Parenting Foundations"}
                </h1>
                <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
                  {isSpanish
                    ? "Educación para padres en línea basada en los temas publicados por Dakota del Sur, con matrícula accesible y verificación clara del certificado."
                    : "Online parent education organized around South Dakota&apos;s published parenting-course topics, low-cost tuition, and a simple certificate-verification process."}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/south-dakota-parenting/pricing"
                  className="rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white hover:bg-amber-700"
                >
                  {isSpanish ? "Revisar matrícula" : "Review pricing"}
                </Link>
                <Link
                  href="/south-dakota-parenting/price-match"
                  className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  {isSpanish ? "Solicitar igualación" : "Request a price match"}
                </Link>
              </div>
            </div>

            <div className="max-w-xs rounded-3xl border border-amber-100 bg-white/90 px-5 py-4 text-sm leading-7 text-slate-700">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                {isSpanish ? "¿Necesitas ayuda?" : "Need help?"}
              </div>
              <div className="mt-3 font-semibold text-slate-950">
                {SOUTH_DAKOTA_PARENT_SITE_SUPPORT.organization}
              </div>
              <div>{SOUTH_DAKOTA_PARENT_SITE_SUPPORT.phone}</div>
              <div>{SOUTH_DAKOTA_PARENT_SITE_SUPPORT.email}</div>
            </div>
          </div>

          <nav className="flex flex-wrap gap-3 px-6 py-5 lg:px-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8">{children}</div>
      </div>
    </main>
    <ParentingFooter
      language={language}
      courseLabel="South Dakota Parenting Course"
      courseLabelEs="Curso de coparentalidad de Dakota del Sur"
      title="South Dakota Co-Parenting Foundations."
      titleEs="Fundamentos de coparentalidad de Dakota del Sur."
      navItems={SOUTH_DAKOTA_PARENT_SITE_NAV}
      navItemsEs={SOUTH_DAKOTA_PARENT_SITE_NAV_ES}
      support={SOUTH_DAKOTA_PARENT_SITE_SUPPORT}
    />
  )
}
