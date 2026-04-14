import PriceMatchGuaranteePanel from "@/components/site/price-match-guarantee-panel"
import {
  SOUTH_DAKOTA_PARENT_SITE_INCLUDED,
  SOUTH_DAKOTA_PARENT_SITE_INCLUDED_ES,
  SOUTH_DAKOTA_PARENT_SITE_PRICE_MATCH_TERMS,
  SOUTH_DAKOTA_PARENT_SITE_PRICE_MATCH_TERMS_ES,
  SOUTH_DAKOTA_PARENT_SITE_PRICING,
  SOUTH_DAKOTA_PARENT_SITE_PRICING_ES,
  SOUTH_DAKOTA_PARENT_SITE_SUPPORT,
} from "@/lib/south-dakota-parenting-site"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

export default async function SouthDakotaPricingPage() {
  const language = await getPreferredSiteLanguage()
  const isSpanish = language === "es"
  const pricing = isSpanish ? SOUTH_DAKOTA_PARENT_SITE_PRICING_ES : SOUTH_DAKOTA_PARENT_SITE_PRICING
  const included = isSpanish ? SOUTH_DAKOTA_PARENT_SITE_INCLUDED_ES : SOUTH_DAKOTA_PARENT_SITE_INCLUDED
  const priceMatchTerms = isSpanish
    ? SOUTH_DAKOTA_PARENT_SITE_PRICE_MATCH_TERMS_ES
    : SOUTH_DAKOTA_PARENT_SITE_PRICE_MATCH_TERMS
  const copy = isSpanish
    ? {
        label: "Precios",
        title:
          "Precios de bajo costo con revision por dificultad y igualación pública",
        intro:
          "Una matrícula estándar simple se combina con revision por dificultad, exención y una opción de igualación para familias que necesitan apoyo adicional.",
        includedLabel: "Incluido con la matrícula",
        helpLabel: "Necesitas ayuda antes de inscribirte?",
        helpBody:
          "Si el costo es una preocupacion o tienes preguntas antes de inscribirte, escribe a",
        helpJoiner: "o",
        priceMatchLabel: "Garantía de igualación de precio",
        priceMatchTitle:
          "Si un curso comparable de Dakota del Sur tiene un precio público mas bajo, lo revisamos y lo igualamos o mejoramos por $1.",
        priceMatchBody:
          "Si encuentras un precio público mas bajo para un curso comparable de Dakota del Sur, envia una solicitud para revision.",
        priceMatchCta: "Solicitar igualación",
      }
    : {
        label: "Pricing",
        title:
          "Low-cost South Dakota pricing with hardship review and a public price match",
        intro:
          "One simple standard tuition is paired with hardship review, a waiver path, and a price-match option for families who need extra help.",
        includedLabel: "Included with tuition",
        helpLabel: "Need help before you enroll?",
        helpBody:
          "If cost is a concern or you have questions before enrolling, reach out to",
        helpJoiner: "or",
        priceMatchLabel: "Price Match Guarantee",
        priceMatchTitle:
          "If a comparable South Dakota course posts a lower public price, we will review it and match it or beat it by $1.",
        priceMatchBody:
          "If you find a lower public price for a comparable South Dakota course, you can send a request here for review.",
        priceMatchCta: "Request a price match",
      }

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-[2rem] border-amber-100 bg-white p-8">
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
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-950">
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

        <div className="glass-panel rounded-[2rem] border-amber-100 bg-white p-8">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            {copy.helpLabel}
          </div>
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700">
            {copy.helpBody}{" "}
            <span className="font-semibold text-slate-900">
              {SOUTH_DAKOTA_PARENT_SITE_SUPPORT.email}
            </span>{" "}
            {copy.helpJoiner}{" "}
            <span className="font-semibold text-slate-900">
              {SOUTH_DAKOTA_PARENT_SITE_SUPPORT.phone}
            </span>
            .
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
        terms={priceMatchTerms}
      />
    </div>
  )
}
