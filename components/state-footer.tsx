import Link from "next/link"
import {
  getContactRoute,
  getCourseConfig,
  getDisclosuresRoute,
  getFaqRoute,
  getPrivacyRoute,
  getRefundsRoute,
  getTermsRoute,
} from "@/lib/course-config"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

export default async function StateFooter({ state }: { state: string }) {
  const config = getCourseConfig(state)
  const language = await getPreferredSiteLanguage()
  const copy =
    language === "es"
      ? {
          courseLabel: `Curso de ${config.stateName}`,
          title: `Curso de mejoramiento para conductores de ${config.stateName}.`,
          description: `Curso en línea claro y sencillo para estudiantes de ${config.stateName}.`,
          resources: "Recursos para estudiantes",
          disclosures: "Información",
          faq: "Preguntas frecuentes",
          privacy: "Privacidad",
          terms: "Términos",
          boating: "Seguridad náutica",
          refunds: "Reembolsos",
          contact: "Contacto",
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
          boating: "Boating Safety",
        }

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-slate-600 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {copy.courseLabel}
            </div>
            <div className="mt-3 text-2xl font-semibold text-slate-950">
              {copy.title}
            </div>
            <p className="mt-3 max-w-xl leading-7">{copy.description}</p>
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
              <Link href="/boating" className="hover:text-slate-950">
                {copy.boating}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
