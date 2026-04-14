import type { Metadata } from "next"
import Link from "next/link"
import PriceMatchGuaranteePanel from "@/components/site/price-match-guarantee-panel"
import { buildBoatingPriceMatchTerms } from "@/lib/price-match"
import { VIRGINIA_BOATING_CONFIG } from "@/lib/virginia-boating-config"
import { VIRGINIA_BOATING_PLANS } from "@/lib/virginia-boating-product"

export const metadata: Metadata = {
  title: `Virginia Boating Pricing | ${VIRGINIA_BOATING_CONFIG.brandName}`,
  description:
    "Planned Virginia boating safety course pricing and checkout structure before live payment activation.",
  alternates: {
    canonical: "/virginia-boating/pricing",
  },
}

export default function VirginiaBoatingPricingPage() {
  return (
    <main className="public-shell min-h-screen">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <section className="glass-panel rounded-[2rem] border-[#dbe7ff] bg-white p-7 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="space-y-4">
              <p className="section-label">Virginia Boating Pricing</p>
              <h1 className="text-4xl font-semibold text-slate-950">
                Virginia boating pricing and checkout
              </h1>
              <p className="max-w-3xl leading-8 text-slate-600">
                Choose a Virginia boating plan below. Checkout is wired, and the
                purchase will activate the Virginia boating student course flow
                for the signed-in account.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#e5edff] bg-[#f8fbff] p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                Before you pay
              </div>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                <p>Confirm Virginia proof-of-completion wording.</p>
                <p>Pick the tier that matches the amount of support you want.</p>
                <p>Keep exemptions and nonresident cases visible before payment.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {VIRGINIA_BOATING_PLANS.map((plan) => (
            <section
              key={plan.code}
              className="glass-panel rounded-[2rem] border-[#dbe7ff] bg-white p-6 sm:p-7"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                    {plan.status === "coming-soon" ? "Coming soon" : "Available"}
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
                  <div className="text-sm text-slate-500">one-time payment</div>
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
                  href={`/virginia-boating/checkout/${plan.code}`}
                  className="inline-flex rounded-xl bg-sky-700 px-4 py-3 font-semibold text-white hover:bg-sky-800"
                >
                  {plan.ctaLabel}
                </Link>
                <Link
                  href="/virginia-boating/disclosures"
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
            title="If a comparable Virginia boating course posts a lower public price, we will review it and match it or beat it by $1."
            description="The public Virginia boating pricing page now carries the same guarantee as the parenting and driver-improvement course families, with a dedicated request path before checkout."
            href="/virginia-boating/price-match"
            accent="sky"
            terms={buildBoatingPriceMatchTerms("Virginia")}
          />
        </div>
      </section>
    </main>
  )
}
