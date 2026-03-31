import Link from "next/link"
import LanguageToggle from "@/components/language-toggle"
import {
  getContactRoute,
  getCourseConfig,
  getDisclosuresRoute,
  getFaqRoute,
  getPrivacyRoute,
  getRefundsRoute,
  getSupportRoute,
  getTermsRoute,
} from "@/lib/course-config"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

export default async function StateFooter({ state }: { state: string }) {
  const config = getCourseConfig(state)
  const language = await getPreferredSiteLanguage()
  const copy =
    language === "es"
      ? {
          courseLabel: `${config.stateName} Course`,
          title: `Curso de mejoramiento para conductores de ${config.stateName}.`,
          description: `Curso en linea claro y sencillo para estudiantes de ${config.stateName}.`,
          resources: "Recursos para estudiantes",
          disclosures: "Informacion",
          faq: "Preguntas",
          privacy: "Privacidad",
          terms: "Terminos",
          refunds: "Reembolsos",
          contact: "Contacto",
          support: "Soporte",
          supportTitle: "Empieza con soporte en linea",
          supportBody:
            "Usa la pagina de soporte primero para preguntas del curso, ayuda con la cuenta y problemas del certificado.",
          supportCta: "Abrir soporte",
        }
      : {
          courseLabel: `${config.stateName} Course`,
          title: `${config.stateName} driver improvement course.`,
          description: `Clear online course experience for ${config.stateName} students.`,
          resources: "Student Resources",
          disclosures: "Disclosures",
          faq: "FAQ",
          privacy: "Privacy",
          terms: "Terms",
          refunds: "Refunds",
          contact: "Contact",
          support: "Support",
          supportTitle: "Start with online support",
          supportBody:
            "Use the support page first for course questions, account help, and certificate issues.",
          supportCta: "Open Support",
        }

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-slate-600 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr_0.8fr]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {copy.courseLabel}
            </div>
            <div className="mt-3 text-2xl font-semibold text-slate-950">
              {copy.title}
            </div>
            <p className="mt-3 max-w-xl leading-7">{copy.description}</p>
            <div className="mt-4">
              <LanguageToggle language={language} />
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {copy.resources}
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              <Link href={getDisclosuresRoute(state)} className="hover:text-slate-950">
                {copy.disclosures}
              </Link>
              <Link href={getFaqRoute(state)} className="hover:text-slate-950">
                {copy.faq}
              </Link>
              <Link href={getPrivacyRoute(state)} className="hover:text-slate-950">
                {copy.privacy}
              </Link>
              <Link href={getTermsRoute(state)} className="hover:text-slate-950">
                {copy.terms}
              </Link>
              <Link href={getRefundsRoute(state)} className="hover:text-slate-950">
                {copy.refunds}
              </Link>
              <Link href={getContactRoute(state)} className="hover:text-slate-950">
                {copy.contact}
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {copy.support}
            </div>
            <div className="mt-3 font-semibold text-slate-950">
              {copy.supportTitle}
            </div>
            <p className="mt-2 leading-6">{copy.supportBody}</p>
            <Link
              href={getSupportRoute(state)}
              className="mt-4 inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-950 hover:bg-slate-100"
            >
              {copy.supportCta}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
