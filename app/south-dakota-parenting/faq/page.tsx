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
        title: "Preguntas sobre precios, finalizacion, certificados y verificacion",
        intro:
          "Estas son las preguntas que las familias hacen con mas frecuencia antes de iniciar o despues de terminar el curso.",
        nextLabel: "Siguientes pasos",
        nextTitle: "Lista para revisar precios o detalles del certificado?",
        nextBody:
          "Puedes continuar desde aqui con las paginas que la mayoria de las familias revisan antes de inscribirse.",
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
