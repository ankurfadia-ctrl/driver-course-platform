import type { Metadata } from "next"
import Link from "next/link"
import {
  getCourseConfig,
  getDisclosuresRoute,
} from "@/lib/course-config"
import { getSupportFaqEntries } from "@/lib/support-faq"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"
import { getPublicBaseUrl } from "@/lib/runtime-config"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>
}): Promise<Metadata> {
  const { state } = await params
  const config = getCourseConfig(state)
  const baseUrl = getPublicBaseUrl()
  const canonicalUrl = `${baseUrl}/${config.stateSlug}/faq`

  return {
    title: `${config.stateName} Driver Improvement FAQ | ${config.brandName}`,
    description:
      `${config.stateName} driver improvement course FAQ covering enrollment, timing, final exam, certificate access, DMV reporting, and support.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${config.stateName} Driver Improvement FAQ`,
      description:
        `${config.stateName} driver improvement course FAQ covering common student questions about the course, final exam, and certificate.`,
      url: canonicalUrl,
      siteName: config.brandName,
      locale: "en_US",
      type: "website",
    },
  }
}

export default async function StateFaqPage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state } = await params
  const config = getCourseConfig(state)
  const enrollmentOpen = config.enrollmentOpen
  const language = await getPreferredSiteLanguage()

  const faqs = getSupportFaqEntries(language, state)
  const baseUrl = getPublicBaseUrl()
  const canonicalUrl = `${baseUrl}/${config.stateSlug}/faq`
  const quickFacts =
    config.stateSlug === "virginia"
      ? [
          {
            label: language === "es" ? "Detalles del curso" : "Course details",
            value:
              language === "es"
                ? "Los detalles del curso de Virginia están listos a continuación."
                : "Your Virginia course details are ready below.",
          },
          {
            label: language === "es" ? "Duración total" : "Total course length",
            value:
              language === "es"
                ? "8 horas en total, incluido el examen final."
                : "8 hours total, including the final exam.",
          },
          {
            label: language === "es" ? "Puntuación aprobatoria" : "Passing score",
            value:
              language === "es"
                ? `${config.passingScorePercent}% en el examen final.`
                : `${config.passingScorePercent}% on the final exam.`,
          },
        ]
      : []
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: config.stateName,
        item: `${baseUrl}/${config.stateSlug}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: language === "es" ? "Preguntas frecuentes" : "FAQ",
        item: canonicalUrl,
      },
    ],
  }

  const copy =
    language === "es"
      ? {
          label: "Preguntas",
          title: `Preguntas y respuestas sobre el curso de ${config.stateName}`,
          intro:
            enrollmentOpen
              ? "Esta página ofrece respuestas generales a preguntas comunes antes de la inscripción, durante el curso y después de completarlo."
              : "Esta página ofrece respuestas generales y se actualizará a medida que haya más detalles disponibles.",
          moreInfo: "¿Necesitas más información?",
          moreInfoBody:
            enrollmentOpen
              ? "Revisa la página de información del curso si necesitas más detalles antes de inscribirte o depender de la finalización."
              : "Revisa la página del estado para ver la información disponible y futuras actualizaciones.",
          infoCta: "Leer información del curso",
          quickFactsTitle:
            config.stateSlug === "virginia"
              ? "Resumen rápido de Virginia"
              : null,
        }
      : {
          label: "FAQ",
          title: `${config.stateName} course questions and answers`,
          intro:
            enrollmentOpen
              ? "This page provides general answers to common student questions before enrollment, during the course, and after completion."
              : "This page provides general answers and will be updated as more course details become available.",
          moreInfo: "Need more information?",
          moreInfoBody:
            enrollmentOpen
              ? "Review the course information page if you want a closer look at enrollment, identity checks, and certificate details before you begin."
              : "Review the state page to see the current information and future updates.",
          infoCta: enrollmentOpen ? "Read Course Information" : "View State Page",
          quickFactsTitle:
            config.stateSlug === "virginia"
              ? "Virginia quick facts"
              : null,
        }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqSchema, breadcrumbSchema]),
        }}
      />
      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          {copy.label}
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          {copy.title}
        </h1>
        <p className="mt-4 leading-7 text-slate-700">{copy.intro}</p>
      </section>

      {quickFacts.length > 0 && copy.quickFactsTitle ? (
        <section className="glass-panel rounded-[2rem] bg-white p-8">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            {copy.quickFactsTitle}
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {quickFacts.map((fact) => (
              <article
                key={fact.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                  {fact.label}
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {fact.value}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="space-y-3">
        {faqs.map((item) => (
          <details
            key={item.question}
            className="group glass-panel rounded-[1.75rem] bg-white"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6">
              <h2 className="text-xl font-semibold text-slate-900">
                {item.question}
              </h2>
              <span className="flex-shrink-0 text-slate-400 transition-transform group-open:rotate-180" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </span>
            </summary>
            <div className="px-6 pb-6">
              <p className="text-sm leading-7 text-slate-700">{item.answer}</p>
            </div>
          </details>
        ))}
      </section>

      <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">{copy.moreInfo}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          {copy.moreInfoBody}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={enrollmentOpen ? getDisclosuresRoute(state) : `/${state}`}
            className="rounded-xl border border-amber-300 bg-white px-5 py-3 font-semibold text-amber-900 transition hover:bg-amber-100"
          >
            {copy.infoCta}
          </Link>
        </div>
      </section>
    </div>
  )
}
