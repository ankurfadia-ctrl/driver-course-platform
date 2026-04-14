import Link from "next/link"
import {
  SOUTH_DAKOTA_PARENT_SITE_RESOURCES,
  SOUTH_DAKOTA_PARENT_SITE_RESOURCES_ES,
  SOUTH_DAKOTA_PARENT_SITE_REVIEW_STEPS,
  SOUTH_DAKOTA_PARENT_SITE_REVIEW_STEPS_ES,
  SOUTH_DAKOTA_PARENT_SITE_REVIEWER_POINTS,
  SOUTH_DAKOTA_PARENT_SITE_REVIEWER_POINTS_ES,
  SOUTH_DAKOTA_PARENT_SITE_SUPPORT,
} from "@/lib/south-dakota-parenting-site"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

export default async function SouthDakotaReviewerPage() {
  const language = await getPreferredSiteLanguage()
  const isSpanish = language === "es"
  const steps = isSpanish
    ? SOUTH_DAKOTA_PARENT_SITE_REVIEW_STEPS_ES
    : SOUTH_DAKOTA_PARENT_SITE_REVIEW_STEPS
  const points = isSpanish
    ? SOUTH_DAKOTA_PARENT_SITE_REVIEWER_POINTS_ES
    : SOUTH_DAKOTA_PARENT_SITE_REVIEWER_POINTS
  const resources = isSpanish
    ? SOUTH_DAKOTA_PARENT_SITE_RESOURCES_ES
    : SOUTH_DAKOTA_PARENT_SITE_RESOURCES
  const copy = isSpanish
    ? {
        label: "Revision judicial",
        title: "Un camino claro de revision para personal judicial y revisores",
        intro:
          "Esta página agrupa las secciones publicas principales, el orden sugerido y las referencias oficiales mas relevantes para el paquete.",
        stepsLabel: "Orden sugerido de revision",
        stepPrefix: "Paso de revision",
        overviewCta: "Abrir resumen",
        curriculumCta: "Abrir plan de estudios",
        pricingCta: "Abrir precios",
        strengthsLabel: "Fortalezas del sitio público",
        resourcesLabel: "Recursos oficiales de Dakota del Sur",
        followLabel: "Seguimiento",
        followBody:
          "Si Dakota del Sur necesita materiales adicionales o una revision mas profunda del flujo del curso, usa",
        followJoiner: "o",
      }
    : {
        label: "Court Review",
        title: "A clean review path for South Dakota court staff and packet reviewers",
        intro:
          "This page gathers the main public course sections, the suggested review order, and the official South Dakota references most relevant to the course packet.",
        stepsLabel: "Suggested review order",
        stepPrefix: "Review step",
        overviewCta: "Open overview",
        curriculumCta: "Open curriculum",
        pricingCta: "Open pricing",
        strengthsLabel: "Public-site strengths",
        resourcesLabel: "Official South Dakota resources",
        followLabel: "Review follow-up",
        followBody:
          "If South Dakota needs supplemental materials or a deeper walk-through of the course workflow, use",
        followJoiner: "or",
      }

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-[2rem] bg-white p-8">
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

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="glass-panel rounded-[2rem] bg-white p-8">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            {copy.stepsLabel}
          </div>
          <div className="mt-6 space-y-4">
            {steps.map((item, index) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
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
              href="/south-dakota-parenting"
              className="rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white hover:bg-amber-700"
            >
              {copy.overviewCta}
            </Link>
            <Link
              href="/south-dakota-parenting/curriculum"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              {copy.curriculumCta}
            </Link>
            <Link
              href="/south-dakota-parenting/pricing"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              {copy.pricingCta}
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel rounded-[2rem] bg-white p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {copy.strengthsLabel}
            </div>
            <div className="mt-6 space-y-4">
              {points.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

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
          {copy.followLabel}
        </div>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          {copy.followBody}{" "}
          <span className="font-semibold text-slate-900">
            {SOUTH_DAKOTA_PARENT_SITE_SUPPORT.email}
          </span>{" "}
          {copy.followJoiner}{" "}
          <span className="font-semibold text-slate-900">
            {SOUTH_DAKOTA_PARENT_SITE_SUPPORT.phone}
          </span>
          .
        </p>
      </section>
    </div>
  )
}
