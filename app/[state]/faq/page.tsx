import Link from "next/link"
import {
  getCourseConfig,
  getDisclosuresRoute,
} from "@/lib/course-config"
import { getSupportFaqEntries } from "@/lib/support-faq"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

export default async function StateFaqPage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state } = await params
  const config = getCourseConfig(state)
  const language = await getPreferredSiteLanguage()

  const faqs = getSupportFaqEntries(language)

  const copy =
    language === "es"
      ? {
          label: "Preguntas",
          title: `Preguntas y respuestas sobre el curso de ${config.stateName}`,
          intro:
            "Esta pagina ofrece respuestas generales a preguntas comunes antes de la inscripcion, durante el curso y despues de completarlo.",
          moreInfo: "Necesitas mas informacion?",
          moreInfoBody:
            "Revisa la pagina de informacion del curso si necesitas mas detalles antes de inscribirte o depender de la finalizacion.",
          infoCta: "Leer informacion del curso",
        }
      : {
          label: "FAQ",
          title: `${config.stateName} course questions and answers`,
          intro:
            "This page provides general answers to common student questions before enrollment, during the course, and after completion.",
          moreInfo: "Need more information?",
          moreInfoBody:
            "Review the course information page if you need more detail before enrolling or relying on completion.",
          infoCta: "Read Course Information",
        }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          {copy.label}
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          {copy.title}
        </h1>
        <p className="mt-4 leading-7 text-slate-700">{copy.intro}</p>
      </section>

      <section className="space-y-4">
        {faqs.map((item) => (
          <article
            key={item.question}
            className="glass-panel rounded-[1.75rem] bg-white p-6"
          >
            <h2 className="text-xl font-semibold text-slate-900">
              {item.question}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">{item.answer}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">{copy.moreInfo}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          {copy.moreInfoBody}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={getDisclosuresRoute(state)}
            className="rounded-xl border border-amber-300 bg-white px-5 py-3 font-semibold text-amber-900 transition hover:bg-amber-100"
          >
            {copy.infoCta}
          </Link>
        </div>
      </section>
    </div>
  )
}
