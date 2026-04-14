import type { Metadata } from "next"
import Link from "next/link"
import PriceMatchGuaranteePanel from "@/components/site/price-match-guarantee-panel"
import {
  MINNESOTA_PARENT_SITE_FEATURES,
  MINNESOTA_PARENT_SITE_HIGHLIGHTS,
  MINNESOTA_PARENT_SITE_JOURNEY,
  MINNESOTA_PARENT_SITE_MODULES,
  MINNESOTA_PARENT_SITE_PRICE_MATCH_TERMS,
  MINNESOTA_PARENT_SITE_FEATURES_ES,
  MINNESOTA_PARENT_SITE_HIGHLIGHTS_ES,
  MINNESOTA_PARENT_SITE_JOURNEY_ES,
  MINNESOTA_PARENT_SITE_MODULES_ES,
  MINNESOTA_PARENT_SITE_PRICE_MATCH_TERMS_ES,
} from "@/lib/minnesota-parent-education-site"
import { getPublicBaseUrl } from "@/lib/runtime-config"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

const COURSE_PATH = "/minnesota-parent-education"

export function generateMetadata(): Metadata {
  const baseUrl = getPublicBaseUrl()
  const canonicalUrl = `${baseUrl}${COURSE_PATH}`

  return {
    title: "Minnesota Co-Parenting Foundations",
    description:
      "Online Minnesota parent education with curriculum, tuition, enrollment information, certificate details, and support information.",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "Minnesota Co-Parenting Foundations",
      description:
        "Online Minnesota parent education with curriculum, tuition, enrollment information, certificate details, and support information.",
      url: canonicalUrl,
      siteName: "Minnesota Co-Parenting Foundations",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "Minnesota Co-Parenting Foundations",
      description:
        "Online Minnesota parent education with curriculum, tuition, enrollment information, certificate details, and support information.",
    },
  }
}

export default async function MinnesotaParentEducationPage() {
  const language = await getPreferredSiteLanguage()
  const isSpanish = language === "es"
  const modules = isSpanish ? MINNESOTA_PARENT_SITE_MODULES_ES : MINNESOTA_PARENT_SITE_MODULES
  const previewModules = modules.slice(0, 4)
  const highlights = isSpanish ? MINNESOTA_PARENT_SITE_HIGHLIGHTS_ES : MINNESOTA_PARENT_SITE_HIGHLIGHTS
  const features = isSpanish ? MINNESOTA_PARENT_SITE_FEATURES_ES : MINNESOTA_PARENT_SITE_FEATURES
  const journey = isSpanish ? MINNESOTA_PARENT_SITE_JOURNEY_ES : MINNESOTA_PARENT_SITE_JOURNEY
  const priceMatchTerms = isSpanish
    ? MINNESOTA_PARENT_SITE_PRICE_MATCH_TERMS_ES
    : MINNESOTA_PARENT_SITE_PRICE_MATCH_TERMS

  const copy = isSpanish
    ? {
        label: "Fundamentos de Coparentalidad de Minnesota",
        headline:
          "Un curso en linea claro y accesible de educacion para padres para asuntos familiares de Minnesota",
        intro:
          "Este curso esta disenado para padres que atraviesan custodia, tiempo de crianza o asuntos familiares relacionados y necesitan un programa educativo estructurado con certificado al finalizar.",
        enrollCta: "Ver inscripcion y matricula",
        curriculumCta: "Explorar plan de estudios",
        certificateCta: "Revisar certificado",
        previewLabel: "Vista previa del curso",
        previewCta: "Ver los 7 modulos",
        journeyLabel: "Como funciona el curso",
        stepLabel: "Paso",
        priceMatchLabel: "Garantia de igualacion de precio",
        priceMatchTitle:
          "Si un curso comparable de Minnesota tiene un precio publico mas bajo, lo revisamos y lo igualamos o mejoramos por $1.",
        priceMatchBody:
          "Si encuentras un precio publico mas bajo para un curso comparable de Minnesota, puedes enviar una solicitud aqui para revision.",
      }
    : {
        label: "Minnesota Co-Parenting Foundations",
        headline:
          "A clear, affordable online parent education course for Minnesota family-law matters",
        intro:
          "This course is designed for parents working through custody, parenting-time, or related family-court matters who need a structured, easy-to-follow educational program with a completion certificate when they finish.",
        enrollCta: "View enrollment and tuition",
        curriculumCta: "Explore the curriculum",
        certificateCta: "Review certificate details",
        previewLabel: "Course preview",
        previewCta: "See all 7 modules",
        journeyLabel: "How the course works",
        stepLabel: "Step",
        priceMatchLabel: "Price Match Guarantee",
        priceMatchTitle:
          "If a comparable Minnesota course posts a lower public price, we will review it and match it or beat it by $1.",
        priceMatchBody:
          "If you find a lower public price for a comparable Minnesota course, you can send a request here for review.",
      }

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-[2rem] border-[#d9efe7] bg-white p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div className="space-y-6">
            <div className="section-label !bg-emerald-50 !text-emerald-800 before:!bg-emerald-600">
              {copy.label}
            </div>
            <h2 className="display-balance text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              {copy.headline}
            </h2>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              {copy.intro}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/minnesota-parent-education/enroll"
                className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
              >
                {copy.enrollCta}
              </Link>
              <Link
                href="/minnesota-parent-education/curriculum"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                {copy.curriculumCta}
              </Link>
              <Link
                href="/minnesota-parent-education/certificate"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                {copy.certificateCta}
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-[#d9efe7] bg-[#f4fbf7] p-6"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  {item.label}
                </div>
                <div className="mt-3 text-xl font-semibold text-slate-950">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {features.map((item) => (
          <article
            key={item.title}
            className="glass-panel rounded-[2rem] border-[#d9efe7] bg-white p-7"
          >
            <h3 className="text-xl font-semibold text-slate-950">
              {item.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              {item.body}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="glass-panel rounded-[2rem] bg-white p-8">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            {copy.previewLabel}
          </div>
          <div className="mt-6 space-y-4">
            {previewModules.map((module) => (
              <article
                key={module.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold text-slate-950">
                    {module.title}
                  </h3>
                  <div className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">
                    {module.duration}
                  </div>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {module.focus}
                </p>
              </article>
            ))}
          </div>
          <Link
            href="/minnesota-parent-education/curriculum"
            className="mt-6 inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
          >
            {copy.previewCta}
          </Link>
        </div>

        <div className="glass-panel rounded-[2rem] bg-white p-8">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            {copy.journeyLabel}
          </div>
          <div className="mt-6 space-y-4">
            {journey.map((item, index) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  {copy.stepLabel} {index + 1}
                </div>
                <div className="mt-2 text-lg font-semibold text-slate-950">
                  {item.title}
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PriceMatchGuaranteePanel
        label={copy.priceMatchLabel}
        title={copy.priceMatchTitle}
        description={copy.priceMatchBody}
        href="/minnesota-parent-education/price-match"
        ctaLabel={isSpanish ? "Solicitar igualacion" : "Request a price match"}
        accent="emerald"
        terms={priceMatchTerms}
      />
    </div>
  )
}
