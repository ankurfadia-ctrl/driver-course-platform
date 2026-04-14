import Link from "next/link"
import {
  SOUTH_DAKOTA_PARENT_SITE_FAQS,
  SOUTH_DAKOTA_PARENT_SITE_FAQS_ES,
} from "@/lib/south-dakota-parenting-site"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

export default async function SouthDakotaFaqPage() {
  const language = await getPreferredSiteLanguage()
  const isSpanish = language === "es"
  const faqs = isSpanish ? SOUTH_DAKOTA_PARENT_SITE_FAQS_ES : SOUTH_DAKOTA_PARENT_SITE_FAQS
  const copy = isSpanish
    ? {
        label: "Preguntas",
        title: "Preguntas sobre precios, finalización, certificados y verificación",
        intro:
          "Estas son las preguntas que las familias hacen con más frecuencia antes de iniciar o después de terminar el curso.",
        nextLabel: "Siguientes pasos",
        nextTitle: "¿Lista para revisar precios o detalles del certificado?",
        nextBody:
          "Puedes continuar desde aquí con las páginas que la mayoría de las familias revisan antes de inscribirse.",
        pricingCta: "Ver precios",
        certificateCta: "Revisar certificado",
      }
    : {
        label: "FAQ",
        title: "Questions about pricing, completion, certificates, and verification",
        intro:
          "These are the questions people most often ask before starting or after finishing the course.",
        nextLabel: "Next steps",
        nextTitle: "Ready to review pricing or see the certificate details?",
        nextBody:
          "You can keep going from here with the next pages most families check before they enroll.",
        pricingCta: "View pricing",
        certificateCta: "Review certificate",
      }

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-[2rem] border-[#f0e2c6] bg-white p-8">
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

      <section className="glass-panel rounded-[2rem] border-[#f0e2c6] bg-white p-8">
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
