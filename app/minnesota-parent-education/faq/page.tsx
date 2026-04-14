import Link from "next/link"
import {
  MINNESOTA_PARENT_SITE_FAQS,
  MINNESOTA_PARENT_SITE_FAQS_ES,
} from "@/lib/minnesota-parent-education-site"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

export default async function MinnesotaFaqPage() {
  const language = await getPreferredSiteLanguage()
  const isSpanish = language === "es"
  const faqs = isSpanish ? MINNESOTA_PARENT_SITE_FAQS_ES : MINNESOTA_PARENT_SITE_FAQS

  const copy = isSpanish
    ? {
        label: "Preguntas frecuentes",
        title: "Preguntas sobre matrícula, finalización, exenciones y certificados",
        intro:
          "Estas son las preguntas que la mayoría de las familias hacen antes de inscribirse o después de terminar el curso.",
        nextLabel: "Siguientes pasos",
        nextTitle: "¿Listo para revisar la matrícula o el certificado?",
        nextBody:
          "Puedes pasar de las preguntas a los detalles que más quieren ver las familias sin saltar por todo el sitio.",
        pricingCta: "Ver matrícula",
        certificateCta: "Revisar certificado",
      }
    : {
        label: "FAQ",
        title: "Questions about tuition, completion, fee waivers, and certificates",
        intro:
          "These are the questions people most often ask before enrolling or after finishing the course.",
        nextLabel: "Next steps",
        nextTitle: "Ready to compare tuition or review the certificate?",
        nextBody:
          "You can move from questions to the details most families want to see next without jumping around the site.",
        pricingCta: "View tuition",
        certificateCta: "Review certificate",
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

      <section className="grid gap-4">
        {faqs.map((item) => (
          <details
            key={item.question}
            className="group glass-panel rounded-[2rem] bg-white"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-8">
              <h3 className="text-2xl font-semibold text-slate-950">
                {item.question}
              </h3>
              <span className="flex-shrink-0 text-slate-400 transition-transform group-open:rotate-180" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </span>
            </summary>
            <div className="px-8 pb-8">
              <p className="max-w-4xl leading-8 text-slate-600">{item.answer}</p>
            </div>
          </details>
        ))}
      </section>

      <section className="glass-panel rounded-[2rem] border-emerald-100 bg-white p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              {copy.nextLabel}
            </div>
            <h3 className="mt-3 text-3xl font-semibold text-slate-950">
              {copy.nextTitle}
            </h3>
            <p className="mt-4 leading-8 text-slate-600">{copy.nextBody}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/minnesota-parent-education/pricing"
              className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              {copy.pricingCta}
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
