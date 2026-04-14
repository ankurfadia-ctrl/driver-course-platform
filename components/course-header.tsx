import Link from "next/link"
import Image from "next/image"
import { redirect } from "next/navigation"
import LanguageToggle from "@/components/language-toggle"
import {
  getCourseConfig,
  getDisclosuresRoute,
  getFaqRoute,
  getSupportRoute,
} from "@/lib/course-config"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"
import { createClient } from "@/lib/supabase/server"

export default async function CourseHeader({ state }: { state: string }) {
  const config = getCourseConfig(state)
  const language = await getPreferredSiteLanguage()
  const brandName =
    language === "es" ? config.brandNameEs ?? config.brandName : config.brandName
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const labels =
    language === "es"
      ? {
          dashboard: "Panel",
          course: "Curso",
          identity: "Identidad",
          finalExam: "Examen final",
          disclosures: "Informacion",
          support: "Soporte",
          faq: "Preguntas",
          checkout: "Planes",
          certificate: "Certificado",
          logout: "Cerrar sesion",
          navigate: "Navegar",
        }
      : {
          dashboard: config.dashboardLabel,
          course: config.courseLabel,
          identity: "Identity",
          finalExam: config.finalExamLabel,
          disclosures: "Course Information",
          support: "Support",
          faq: "FAQ",
          checkout: "Plans",
          certificate: config.certificateLabel,
          logout: "Log out",
          navigate: "Navigate",
        }

  async function logout() {
    "use server"
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect(`/${state}/login`)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <details className="relative">
            <summary className="list-none cursor-pointer rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-950">
              {labels.navigate}
            </summary>

            <div className="absolute left-0 top-full z-50 mt-2 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
              <nav className="flex flex-col gap-1">
                <Link
                  href={`/${state}/dashboard`}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                >
                  {labels.dashboard}
                </Link>
                <Link
                  href={`/${state}/course`}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                >
                  {labels.course}
                </Link>
                <Link
                  href={`/${state}/identity`}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                >
                  {labels.identity}
                </Link>
                <Link
                  href={`/${state}/course/final-exam`}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                >
                  {labels.finalExam}
                </Link>
                <Link
                  href={`/${state}/certificate`}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                >
                  {labels.certificate}
                </Link>
                <Link
                  href={`/${state}/checkout`}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                >
                  {labels.checkout}
                </Link>
                <Link
                  href={getSupportRoute(state)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                >
                  {labels.support}
                </Link>
                <Link
                  href={getFaqRoute(state)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                >
                  {labels.faq}
                </Link>
                <Link
                  href={getDisclosuresRoute(state)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                >
                  {labels.disclosures}
                </Link>
              </nav>
            </div>
          </details>

          <Link href={`/${state}`} className="flex min-w-0 items-center gap-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
              <Image
                src={config.logoSrc}
                alt={brandName}
                width={42}
                height={42}
                priority
              />
            </div>

            <div className="hidden min-w-0 leading-tight sm:block">
              <div className="truncate text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                {config.stateCode}
              </div>
              <div className="truncate text-base font-semibold text-slate-950 sm:text-lg">
                {brandName}
              </div>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle language={language} compact />

          {user ? (
            <form action={logout}>
              <button
                type="submit"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-950"
              >
                {labels.logout}
              </button>
            </form>
          ) : (
            <Link
              href={`/${state}/login`}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-950"
            >
              {language === "es" ? "Iniciar sesion" : "Log in"}
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
