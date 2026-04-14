import type { Metadata } from "next"
import Link from "next/link"
import PriceMatchGuaranteePanel from "@/components/site/price-match-guarantee-panel"
import { buildBoatingPriceMatchTerms } from "@/lib/price-match"
import { VIRGINIA_BOATING_CONFIG } from "@/lib/virginia-boating-config"
import { getPublicBaseUrl } from "@/lib/runtime-config"

const baseUrl = getPublicBaseUrl()

export const metadata: Metadata = {
  title: VIRGINIA_BOATING_CONFIG.siteTitle,
  description: VIRGINIA_BOATING_CONFIG.marketingDescription,
  alternates: {
    canonical: "/virginia-boating",
  },
  openGraph: {
    title: VIRGINIA_BOATING_CONFIG.siteTitle,
    description: VIRGINIA_BOATING_CONFIG.marketingDescription,
    url: `${baseUrl}/virginia-boating`,
    siteName: VIRGINIA_BOATING_CONFIG.brandName,
    images: [
      {
        url: `${baseUrl}/logo.svg`,
        width: 256,
        height: 256,
        alt: VIRGINIA_BOATING_CONFIG.brandName,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: VIRGINIA_BOATING_CONFIG.siteTitle,
    description: VIRGINIA_BOATING_CONFIG.marketingDescription,
    images: [`${baseUrl}/logo.svg`],
  },
}

export default function VirginiaBoatingPage() {
  return (
    <main className="public-shell min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div className="space-y-6">
            <div className="section-label">Virginia Boating Launch</div>
            <h1 className="display-balance max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              Virginia boating safety product foundation
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              {VIRGINIA_BOATING_CONFIG.dwrSummary}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/virginia-boating/course"
                className="rounded-xl bg-sky-700 px-6 py-3 font-semibold text-white hover:bg-sky-800"
              >
                Open Virginia Curriculum
              </Link>
              <Link
                href="/virginia-boating/pricing"
                className="rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-3 font-semibold text-emerald-800 hover:bg-emerald-100"
              >
                View Pricing
              </Link>
              <Link
                href="/virginia-boating/disclosures"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Read Disclosures
              </Link>
              <Link
                href="/boating"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Back to Boating Gateway
              </Link>
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] border-[#d7eef7] bg-white p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              Virginia DWR Focus
            </div>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">
              What the first Virginia product has to say clearly
            </h2>
            <div className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
              {VIRGINIA_BOATING_CONFIG.sourceNotes.map((note) => (
                <div
                  key={note}
                  className="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-4"
                >
                  {note}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Core Requirements
            </div>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">
              Virginia rules to map into the product
            </h2>
            <div className="mt-6 space-y-4">
              {VIRGINIA_BOATING_CONFIG.requirements.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <h3 className="text-xl font-semibold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-700">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
              Exemptions and Edge Cases
            </div>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">
              Cases that should not be flattened into one generic checkout
            </h2>
            <div className="mt-6 space-y-4">
              {VIRGINIA_BOATING_CONFIG.exemptions.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-amber-200 bg-white p-5"
                >
                  <h3 className="text-xl font-semibold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-700">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-8">
          <PriceMatchGuaranteePanel
            label="Price Match Guarantee"
            title="If you find a lower public Virginia boating course price, we will review it and match it or beat it by $1."
            description="Virginia boating now follows the same public price-match pattern as the other course families, with a dedicated request page customers can open before buying."
            href="/virginia-boating/price-match"
            accent="sky"
            terms={buildBoatingPriceMatchTerms("Virginia")}
          />
        </div>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Build Notes
          </div>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950">
            What I would build next for Virginia
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {VIRGINIA_BOATING_CONFIG.buildNotes.map((note) => (
              <div
                key={note}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700"
              >
                {note}
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}
