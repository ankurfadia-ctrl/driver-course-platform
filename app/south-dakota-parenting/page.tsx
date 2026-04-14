import type { Metadata } from "next"
import Link from "next/link"
import PriceMatchGuaranteePanel from "@/components/site/price-match-guarantee-panel"
import {
  SOUTH_DAKOTA_PARENT_SITE_FEATURES,
  SOUTH_DAKOTA_PARENT_SITE_FEATURES_ES,
  SOUTH_DAKOTA_PARENT_SITE_HIGHLIGHTS,
  SOUTH_DAKOTA_PARENT_SITE_HIGHLIGHTS_ES,
  SOUTH_DAKOTA_PARENT_SITE_JOURNEY,
  SOUTH_DAKOTA_PARENT_SITE_JOURNEY_ES,
  SOUTH_DAKOTA_PARENT_SITE_MODULES,
  SOUTH_DAKOTA_PARENT_SITE_MODULES_ES,
  SOUTH_DAKOTA_PARENT_SITE_PRICE_MATCH_TERMS,
  SOUTH_DAKOTA_PARENT_SITE_PRICE_MATCH_TERMS_ES,
} from "@/lib/south-dakota-parenting-site"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"
import { getPublicBaseUrl } from "@/lib/runtime-config"

const COURSE_PATH = "/south-dakota-parenting"

export function generateMetadata(): Metadata {
  const baseUrl = getPublicBaseUrl()
  const canonicalUrl = `${baseUrl}${COURSE_PATH}`

  return {
    title: "South Dakota Co-Parenting Foundations",
    description:
      "Online South Dakota parent education with curriculum, pricing, certificate details, FAQ, and price-match information.",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: "South Dakota Co-Parenting Foundations",
      description:
        "Online South Dakota parent education with curriculum, pricing, certificate details, FAQ, and price-match information.",
      url: canonicalUrl,
      siteName: "South Dakota Co-Parenting Foundations",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "South Dakota Co-Parenting Foundations",
      description:
        "Online South Dakota parent education with curriculum, pricing, certificate details, FAQ, and price-match information.",
    },
  }
}

export default async function SouthDakotaParentEducationPage() {
  const language = await getPreferredSiteLanguage()
  const isSpanish = language === "es"

  const highlights = isSpanish
    ? SOUTH_DAKOTA_PARENT_SITE_HIGHLIGHTS_ES
    : SOUTH_DAKOTA_PARENT_SITE_HIGHLIGHTS
  const features = isSpanish
    ? SOUTH_DAKOTA_PARENT_SITE_FEATURES_ES
    : SOUTH_DAKOTA_PARENT_SITE_FEATURES
  const journey = isSpanish
    ? SOUTH_DAKOTA_PARENT_SITE_JOURNEY_ES
    : SOUTH_DAKOTA_PARENT_SITE_JOURNEY
  const modules = isSpanish
    ? SOUTH_DAKOTA_PARENT_SITE_MODULES_ES
    : SOUTH_DAKOTA_PARENT_SITE_MODULES
  const previewModules = modules.slice(0, 4)
  const terms = isSpanish
    ? SOUTH_DAKOTA_PARENT_SITE_PRICE_MATCH_TERMS_ES
    : SOUTH_DAKOTA_PARENT_SITE_PRICE_MATCH_TERMS

  const copy = isSpanish
    ? {
        label: "Fundamentos de coparentalidad de Dakota del Sur",
        title:
          "Curso en linea claro y accesible basado en los temas oficiales de Dakota del Sur",
        intro:
          "Puedes revisar la matricula, comparar el plan de estudios, solicitar una igualacion de precio y entender el proceso del certificado antes de comenzar.",
        pricingCta: "Ver matricula y soporte",
        curriculumCta: "Explorar plan de estudios",
        certificateCta: "Revisar certificado",
        previewLabel: "Vista previa del curso",
        previewCta: "Ver los 8 modulos",
        journeyLabel: "Como funciona el curso",
        journeyStep: "Paso",
        priceMatchLabel: "Garantia de igualacion de precio",
        priceMatchTitle:
          "Si un curso comparable de Dakota del Sur tiene un precio publico mas bajo, lo revisamos y lo igualamos o lo mejoramos por $1.",
        priceMatchBody:
          "Si encuentras un precio publico mas bajo para un curso comparable, puedes enviar una solicitud para revision.",
        priceMatchCta: "Solicitar igualacion",
      }
    : {
        label: "South Dakota Co-Parenting Foundations",
        title:
          "A clear, low-cost online parenting course built around South Dakota's published parenting topics",
        intro:
          "You can review tuition, compare the curriculum, ask about a price match, and understand the certificate process before you begin.",
        pricingCta: "View pricing and support",
        curriculumCta: "Explore the curriculum",
        certificateCta: "Review certificate details",
        previewLabel: "Course preview",
        previewCta: "See all 8 modules",
        journeyLabel: "How the course works",
        journeyStep: "Step",
        priceMatchLabel: "Price Match Guarantee",
        priceMatchTitle:
          "If a comparable South Dakota course posts a lower public price, we will review it and match it or beat it by $1.",
        priceMatchBody:
          "If you find a lower public price for a comparable South Dakota course, you can send a request here for review.",
        priceMatchCta: "Request a price match",
      }

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-[2rem] border-[#f0e2c6] bg-white p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div className="space-y-6">
            <div className="section-label !bg-amber-50 !text-amber-900 before:!bg-amber-600">
              {copy.label}
            </div>
            <h2 className="display-balance text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              {copy.title}
            </h2>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              {copy.intro}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/south-dakota-parenting/pricing"
                className="rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700"
              >
                {copy.pricingCta}
              </Link>
              <Link
                href="/south-dakota-parenting/curriculum"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                {copy.curriculumCta}
              </Link>
              <Link
                href="/south-dakota-parenting/certificate"
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
                className="rounded-3xl border border-[#f0e2c6] bg-[#fff8ee] p-6"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
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
            className="glass-panel rounded-[2rem] border-[#f0e2c6] bg-white p-7"
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
                  <div className="rounded-full border border-amber-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-800">
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
            href="/south-dakota-parenting/curriculum"
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
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                  {copy.journeyStep} {index + 1}
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
        href="/south-dakota-parenting/price-match"
        ctaLabel={copy.priceMatchCta}
        accent="amber"
        terms={terms}
      />
    </div>
  )
}
