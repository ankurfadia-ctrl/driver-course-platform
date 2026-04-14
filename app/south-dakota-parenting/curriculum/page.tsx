import Link from "next/link"
import {
  SOUTH_DAKOTA_PARENT_SITE_MODULES,
  SOUTH_DAKOTA_PARENT_SITE_MODULES_ES,
  SOUTH_DAKOTA_PARENT_SITE_TEACHING_METHODS,
  SOUTH_DAKOTA_PARENT_SITE_TEACHING_METHODS_ES,
} from "@/lib/south-dakota-parenting-site"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

export default async function SouthDakotaCurriculumPage() {
  const language = await getPreferredSiteLanguage()
  const isSpanish = language === "es"
  const modules = isSpanish
    ? SOUTH_DAKOTA_PARENT_SITE_MODULES_ES
    : SOUTH_DAKOTA_PARENT_SITE_MODULES
  const teachingMethods = isSpanish
    ? SOUTH_DAKOTA_PARENT_SITE_TEACHING_METHODS_ES
    : SOUTH_DAKOTA_PARENT_SITE_TEACHING_METHODS
  const copy = isSpanish
    ? {
        label: "Plan de estudios",
        title:
          "Un curso claro de 4 horas centrado en los temas que Dakota del Sur pide comprender",
        intro:
          "Las lecciones son practicas, centradas en los hijos y faciles de seguir, con modulos sobre comunicacion, coparentalidad, necesidades infantiles, reduccion de conflictos y finalizacion del certificado.",
        methodsLabel: "Metodos de ensenanza",
        nextLabel: "Siguiente paso",
        nextTitle: "Revisa precios o detalles del certificado",
        nextBody:
          "Si el plan de estudios se ajusta a tu situacion, las siguientes paginas que suelen consultar las familias son precios y certificado.",
        pricingCta: "Ver precios",
        certificateCta: "Revisar certificado",
      }
    : {
        label: "Curriculum",
        title:
          "A clear 4-hour course focused on the parenting topics South Dakota families are asked to understand",
        intro:
          "The lessons stay practical, child-centered, and easy to follow, with clear modules on communication, co-parenting, children's needs, conflict reduction, and certificate completion.",
        methodsLabel: "Teaching methods",
        nextLabel: "Keep going",
        nextTitle: "Review pricing or see the certificate details next",
        nextBody:
          "If the lesson outline looks right for your situation, the next pages most families open are pricing and certificate details.",
        pricingCta: "View pricing",
        certificateCta: "Review certificate",
      }

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-[2rem] border-amber-100 bg-white p-8">
        <div className="section-label !bg-amber-50 !text-amber-900 before:!bg-amber-600">
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
              <div className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-900">
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

      <section className="glass-panel rounded-[2rem] border-amber-100 bg-white p-8">
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

      <section className="glass-panel rounded-[2rem] border-amber-100 bg-white p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
              {copy.nextLabel}
            </div>
            <h3 className="mt-3 text-3xl font-semibold text-slate-950">
              {copy.nextTitle}
            </h3>
            <p className="mt-4 leading-8 text-slate-600">{copy.nextBody}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/south-dakota-parenting/pricing"
              className="rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white hover:bg-amber-700"
            >
              {copy.pricingCta}
            </Link>
            <Link
              href="/south-dakota-parenting/certificate"
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
