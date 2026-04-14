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
        title: "Preguntas sobre matricula, finalizacion, exenciones y certificados",
        intro:
          "Estas son las preguntas que la mayoria de las familias hacen antes de inscribirse o despues de terminar el curso.",
        nextLabel: "Siguientes pasos",
        nextTitle: "Listo para revisar la matricula o el certificado?",
        nextBody:
          "Puedes pasar de las preguntas a los detalles que mas quieren ver las familias sin saltar por todo el sitio.",
        pricingCta: "Ver matricula",
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
      <section className="glass-panel rounded-[2rem] border-[#d9efe7] bg-white p-8">
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
        {faqs.map((item) => (
          <article
            key={item.question}
            className="glass-panel rounded-[2rem] bg-white p-8"
          >
            <h3 className="text-2xl font-semibold text-slate-950">
              {item.question}
            </h3>
            <p className="mt-4 max-w-4xl leading-8 text-slate-600">
              {item.answer}
            </p>
          </article>
        ))}
      </section>

      <section className="glass-panel rounded-[2rem] border-[#d9efe7] bg-white p-8">
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
