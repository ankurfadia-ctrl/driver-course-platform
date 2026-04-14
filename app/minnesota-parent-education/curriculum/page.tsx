import Link from "next/link"
import {
  MINNESOTA_PARENT_SITE_MODULES,
  MINNESOTA_PARENT_SITE_MODULES_ES,
  MINNESOTA_PARENT_SITE_TEACHING_METHODS,
  MINNESOTA_PARENT_SITE_TEACHING_METHODS_ES,
} from "@/lib/minnesota-parent-education-site"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

export default async function MinnesotaCurriculumPage() {
  const language = await getPreferredSiteLanguage()
  const isSpanish = language === "es"
  const modules = isSpanish ? MINNESOTA_PARENT_SITE_MODULES_ES : MINNESOTA_PARENT_SITE_MODULES
  const teachingMethods = isSpanish
    ? MINNESOTA_PARENT_SITE_TEACHING_METHODS_ES
    : MINNESOTA_PARENT_SITE_TEACHING_METHODS
  const copy = isSpanish
    ? {
        label: "Plan de estudios",
        title: "Un curso paso a paso para familias de Minnesota",
        intro:
          "La secuencia esta disenada para expectativas del tribunal familiar de Minnesota, reduccion de conflicto centrada en los hijos y orientacion practica de coparentalidad.",
        methodsLabel: "Metodos de ensenanza",
        keepGoing: "Sigue adelante",
        keepGoingTitle: "Revisa matricula o el certificado",
        keepGoingBody:
          "Si el plan de estudios es adecuado, las siguientes paginas son matricula y certificado.",
        tuitionCta: "Ver matricula",
        certificateCta: "Revisar certificado",
        stepLabel: "Paso",
        previewLabel: "Vista previa del curso",
      }
    : {
        label: "Curriculum",
        title: "A step-by-step course built for Minnesota families",
        intro:
          "The course sequence is designed around Minnesota family-court expectations, child-focused conflict reduction, and practical co-parenting guidance rather than generic national copy.",
        methodsLabel: "Teaching methods",
        keepGoing: "Keep going",
        keepGoingTitle: "Review tuition or see how completion works",
        keepGoingBody:
          "If the course outline looks right, the next helpful pages are tuition and certificate details.",
        tuitionCta: "View tuition",
        certificateCta: "Review certificate",
        stepLabel: "Step",
        previewLabel: "Course preview",
      }

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-[2rem] border-emerald-100 bg-white p-8">
        <div className="section-label !bg-emerald-50 !text-emerald-800 before:!bg-emerald-600">
          {copy.label}
        </div>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          {copy.title}
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          {copy.intro}
        </p>
      </section>

      <section className="grid gap-5">
        {modules.map((module) => (
          <article
            key={module.title}
            className="glass-panel rounded-[2rem] bg-white p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-slate-950">
                  {module.title}
                </h3>
                <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                  {module.focus}
                </p>
              </div>
              <div className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-900">
                {module.duration}
              </div>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {module.outcomes.map((outcome) => (
                <div
                  key={outcome}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700"
                >
                  {outcome}
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="glass-panel rounded-[2rem] border-emerald-100 bg-white p-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          {copy.methodsLabel}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {teachingMethods.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="glass-panel rounded-[2rem] border-emerald-100 bg-white p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              {copy.keepGoing}
            </div>
            <h3 className="mt-3 text-3xl font-semibold text-slate-950">
              {copy.keepGoingTitle}
            </h3>
            <p className="mt-4 leading-8 text-slate-600">
              {copy.keepGoingBody}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/minnesota-parent-education/pricing"
              className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              {copy.tuitionCta}
            </Link>
            <Link
              href="/minnesota-parent-education/certificate"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              {copy.certificateCta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
