import Link from "next/link"
import {
  MINNESOTA_PARENT_SITE_RESOURCES,
  MINNESOTA_PARENT_SITE_RESOURCES_ES,
  MINNESOTA_PARENT_SITE_REVIEW_STEPS,
  MINNESOTA_PARENT_SITE_REVIEW_STEPS_ES,
  MINNESOTA_PARENT_SITE_SUPPORT,
} from "@/lib/minnesota-parent-education-site"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

export default async function MinnesotaReviewerPage() {
  const language = await getPreferredSiteLanguage()
  const isSpanish = language === "es"
  const reviewSteps = isSpanish
    ? MINNESOTA_PARENT_SITE_REVIEW_STEPS_ES
    : MINNESOTA_PARENT_SITE_REVIEW_STEPS
  const resources = isSpanish
    ? MINNESOTA_PARENT_SITE_RESOURCES_ES
    : MINNESOTA_PARENT_SITE_RESOURCES

  const copy = isSpanish
    ? {
        label: "Revision judicial",
        title: "Enlaces de revision del curso de Minnesota en un solo lugar",
        intro:
          "Esta página reune las secciones publicas principales, un orden de revision sugerido y los recursos oficiales de Minnesota mas relevantes.",
        stepsLabel: "Orden sugerido de revision",
        stepPrefix: "Paso de revision",
        overviewCta: "Abrir resumen",
        curriculumCta: "Abrir plan de estudios",
        certificateCta: "Abrir certificado",
        resourcesLabel: "Recursos oficiales de Minnesota",
        followUpLabel: "Seguimiento de revision",
        followUpBody:
          "Si Minnesota necesita materiales adicionales o un recorrido mas profundo del flujo del curso, usa",
        orLabel: "o",
      }
    : {
        label: "Court Review",
        title: "Minnesota course review links in one place",
        intro:
          "This page gathers the main public course sections, a simple suggested review order, and the official Minnesota resources most relevant to program review.",
        stepsLabel: "Suggested review order",
        stepPrefix: "Review step",
        overviewCta: "Open overview",
        curriculumCta: "Open curriculum",
        certificateCta: "Open certificate",
        resourcesLabel: "Official Minnesota resources",
        followUpLabel: "Review follow-up",
        followUpBody:
          "If Minnesota needs supplemental materials or a deeper walk-through of the course workflow, use",
        orLabel: "or",
      }

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-[2rem] bg-white p-8">
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

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="glass-panel rounded-[2rem] bg-white p-8">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            {copy.stepsLabel}
          </div>
          <div className="mt-6 space-y-4">
            {reviewSteps.map((item, index) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  {copy.stepPrefix} {index + 1}
                </div>
                <div className="mt-2 text-sm leading-7 text-slate-700">
                  {item}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/minnesota-parent-education"
              className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              {copy.overviewCta}
            </Link>
            <Link
              href="/minnesota-parent-education/curriculum"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              {copy.curriculumCta}
            </Link>
            <Link
              href="/minnesota-parent-education/certificate"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              {copy.certificateCta}
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel rounded-[2rem] bg-white p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {copy.resourcesLabel}
            </div>
            <div className="mt-6 space-y-4">
              {resources.map((resource) => (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="block rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700 hover:bg-white"
                >
                  {resource.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          {copy.followUpLabel}
        </div>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          {copy.followUpBody}{" "}
          <span className="font-semibold text-slate-900">
            {MINNESOTA_PARENT_SITE_SUPPORT.email}
          </span>{" "}
          {copy.orLabel}{" "}
          <span className="font-semibold text-slate-900">
            {MINNESOTA_PARENT_SITE_SUPPORT.phone}
          </span>
          .
        </p>
      </section>
    </div>
  )
}
