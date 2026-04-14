import Link from "next/link"
import PriceMatchGuaranteePanel from "@/components/site/price-match-guarantee-panel"
import { getBoatingStateOverlay } from "@/lib/boating-state-overlays"
import { BOATING_LAUNCH_STATE_PLANS } from "@/lib/boating-launch-state-product"
import { buildBoatingPriceMatchTerms } from "@/lib/price-match"

type Props = {
  stateSlug: string
}

export default function BoatingStatePricingPage({ stateSlug }: Props) {
  const overlay = getBoatingStateOverlay(stateSlug)

  if (!overlay?.routeBase) {
    return null
  }

  return (
    <main className="public-shell min-h-screen">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <section className="glass-panel rounded-[2rem] border-[#dbe7ff] bg-white p-7 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="space-y-4">
              <p className="section-label">{overlay.stateName} Boating Pricing</p>
              <h1 className="text-4xl font-semibold text-slate-950">
                {overlay.stateName} boating pricing and launch plans
              </h1>
              <p className="max-w-3xl leading-8 text-slate-600">
                These launch plans show how the boating product can be packaged
                for {overlay.stateName}. Payments stay off until the state
                overlay, proof wording, and support flow are ready.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#e5edff] bg-[#f8fbff] p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                Before launch
              </div>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                <p>Confirm who is actually in scope in {overlay.stateName}.</p>
                <p>Lock the proof-of-completion wording for this state.</p>
                <p>Keep launch claims narrower than the actual state workflow.</p>
                <p>Do not activate payments until the accepted-course approval path is actually satisfied.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {BOATING_LAUNCH_STATE_PLANS.map((plan) => (
            <section
              key={plan.code}
              className="glass-panel rounded-[2rem] border-[#dbe7ff] bg-white p-6 sm:p-7"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                    {plan.status === "coming-soon" ? "Coming soon" : "Planned"}
                  </div>
                  <h2 className="mt-4 text-3xl font-semibold text-slate-950">
                    {plan.name}
                  </h2>
                  <p className="mt-3 max-w-xl leading-7 text-slate-600">
                    {plan.audience}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-right">
                  <div className="text-3xl font-semibold text-slate-950">
                    {plan.priceLabel}
                  </div>
                  <div className="text-sm text-slate-500">launch target</div>
                </div>
              </div>

              <div className="mt-6 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {plan.bullets.map((bullet) => (
                  <div key={bullet} className="text-sm leading-7 text-slate-700">
                    - {bullet}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`${overlay.routeBase}/checkout`}
                  className="inline-flex rounded-xl bg-sky-700 px-4 py-3 font-semibold text-white hover:bg-sky-800"
                >
                  {plan.ctaLabel}
                </Link>
                <Link
                  href={`${overlay.routeBase}/disclosures`}
                  className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Read disclosures
                </Link>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8">
          <PriceMatchGuaranteePanel
            label="Price Match Guarantee"
            title={`If a comparable ${overlay.stateName} boating course posts a lower public price, we will review it and match it or beat it by $1.`}
            description={`The pricing team reviews qualifying public competitor offers manually so families can stay on the ${overlay.stateName} course path without hunting for separate support contacts.`}
            href={`${overlay.routeBase}/price-match`}
            accent="sky"
            terms={buildBoatingPriceMatchTerms(overlay.stateName)}
          />
        </div>
      </section>
    </main>
  )
}
