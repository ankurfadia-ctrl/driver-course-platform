import Link from "next/link"
import PriceMatchGuaranteePanel from "@/components/site/price-match-guarantee-panel"
import {
  MINNESOTA_PARENT_SITE_INCLUDED,
  MINNESOTA_PARENT_SITE_INCLUDED_ES,
  MINNESOTA_PARENT_SITE_PRICE_MATCH_TERMS,
  MINNESOTA_PARENT_SITE_PRICE_MATCH_TERMS_ES,
  MINNESOTA_PARENT_SITE_PRICING,
  MINNESOTA_PARENT_SITE_PRICING_ES,
} from "@/lib/minnesota-parent-education-site"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

export default async function MinnesotaPricingPage() {
  const language = await getPreferredSiteLanguage()
  const isSpanish = language === "es"
  const pricing = isSpanish ? MINNESOTA_PARENT_SITE_PRICING_ES : MINNESOTA_PARENT_SITE_PRICING
  const included = isSpanish ? MINNESOTA_PARENT_SITE_INCLUDED_ES : MINNESOTA_PARENT_SITE_INCLUDED
  const priceMatchTerms = isSpanish
    ? MINNESOTA_PARENT_SITE_PRICE_MATCH_TERMS_ES
    : MINNESOTA_PARENT_SITE_PRICE_MATCH_TERMS
  const copy = isSpanish
    ? {
        label: "Matricula",
        title:
          "Matricula clara y de bajo costo con opciones de tarifa reducida y exencion",
        intro:
          "Puedes revisar una matricula estandar simple junto con opciones de tarifa reducida y exencion si el costo es una preocupacion.",
        includedLabel: "Incluido con la matricula",
        supportLabel: "Ayuda de pago y soporte",
        supportOne:
          "Las solicitudes de tarifa reducida pueden revisarse antes de cobrar la matricula estandar.",
        supportTwo:
          "Participantes que califican bajo Minn. Stat. Sec. 563.01 o un criterio comparable pueden usar la exencion.",
        supportThree:
          "Las preguntas de inscripcion y certificado pueden atenderse por correo o telefono.",
        priceMatchLabel: "Garantia de igualacion de precio",
        priceMatchTitle:
          "Si un curso comparable de Minnesota tiene un precio publico mas bajo, lo revisamos y lo igualamos o mejoramos por $1.",
        priceMatchBody:
          "Si encuentras un precio publico mas bajo para un curso comparable de Minnesota, puedes enviar una solicitud aqui para revision.",
        enrollmentLabel: "Inscripcion",
        enrollmentTitle: "Mira como funciona la inscripcion",
        enrollmentBody:
          "La pagina de inscripcion muestra la informacion que ingresaras, como se manejan las solicitudes de ayuda y que esperar antes de iniciar.",
        enrollmentCta: "Abrir pagina de inscripcion",
      }
    : {
        label: "Tuition",
        title:
          "Straightforward low-cost tuition with reduced-fee and waiver options",
        intro:
          "You can review one simple standard tuition along with reduced-fee and waiver options if cost is a concern.",
        includedLabel: "Included with tuition",
        supportLabel: "Fee relief and support",
        supportOne:
          "Reduced-fee requests can be reviewed before a participant is asked to pay standard tuition.",
        supportTwo:
          "Participants who qualify under Minn. Stat. Sec. 563.01 or a comparable court-approved indigency standard can use the fee-waiver path.",
        supportThree:
          "Enrollment and certificate questions can be handled by email or phone during normal support hours.",
        priceMatchLabel: "Price Match Guarantee",
        priceMatchTitle:
          "If a comparable Minnesota course posts a lower public price, we will review it and match it or beat it by $1.",
        priceMatchBody:
          "If you find a lower public price for a comparable Minnesota course, you can send a request here for review.",
        enrollmentLabel: "Enrollment",
        enrollmentTitle: "See how enrollment works",
        enrollmentBody:
          "The enrollment page shows the information you will enter, how fee-relief requests are handled, and what to expect before you begin the course.",
        enrollmentCta: "Open enrollment page",
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

      <section className="grid gap-5 lg:grid-cols-3">
        {pricing.map((tier) => (
          <article
            key={tier.name}
            className="glass-panel rounded-[2rem] bg-white p-8"
          >
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {tier.name}
            </div>
            <div className="mt-4 text-5xl font-semibold tracking-tight text-slate-950">
              {tier.price}
            </div>
            <p className="mt-4 leading-7 text-slate-600">{tier.description}</p>
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-7 text-emerald-950">
              {tier.note}
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel rounded-[2rem] bg-white p-8">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            {copy.includedLabel}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {included.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[2rem] border-[#d9efe7] bg-white p-8">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            {copy.supportLabel}
          </div>
          <div className="mt-6 grid gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700">
              {copy.supportOne}
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700">
              {copy.supportTwo}
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700">
              {copy.supportThree}
            </div>
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

      <section className="glass-panel rounded-[2rem] border-[#d9efe7] bg-white p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              {copy.enrollmentLabel}
            </div>
            <h3 className="mt-3 text-3xl font-semibold text-slate-950">
              {copy.enrollmentTitle}
            </h3>
            <p className="mt-4 leading-8 text-slate-600">
              {copy.enrollmentBody}
            </p>
          </div>
          <Link
            href="/minnesota-parent-education/enroll"
            className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            {copy.enrollmentCta}
          </Link>
        </div>
      </section>
    </div>
  )
}
