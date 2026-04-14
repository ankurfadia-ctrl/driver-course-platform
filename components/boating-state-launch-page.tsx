import Link from "next/link"
import PriceMatchGuaranteePanel from "@/components/site/price-match-guarantee-panel"
import { buildBoatingPriceMatchTerms } from "@/lib/price-match"
import {
  getBoatingStateOverlay,
  getBoatingStateOverlays,
  type BoatingComplianceMotion,
} from "@/lib/boating-state-overlays"

type Props = {
  stateSlug: string
}

const MOTION_LABELS: Record<BoatingComplianceMotion, string> = {
  "info-only": "Info only",
  "nasbla-friendly": "NASBLA friendly",
  "state-approved": "State approved",
  "state-issued": "State issued",
}

function flagValue(value: boolean) {
  return value ? "Yes" : "No"
}

export default function BoatingStateLaunchPage({ stateSlug }: Props) {
  const overlay = getBoatingStateOverlay(stateSlug)

  if (!overlay) {
    return null
  }

  const siblingStates = getBoatingStateOverlays().filter(
    (item) => item.stateSlug !== overlay.stateSlug
  )

  return (
    <main className="public-shell min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div className="space-y-6">
            <div className="section-label">{overlay.sectionLabel}</div>
            <h1 className="display-balance max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              {overlay.siteTitle}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              {overlay.requirementSummary}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/boating/course"
                className="rounded-xl bg-sky-700 px-6 py-3 font-semibold text-white hover:bg-sky-800"
              >
                Open boating curriculum
              </Link>
              <Link
                href={`${overlay.routeBase}/pricing`}
                className="rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-3 font-semibold text-emerald-800 hover:bg-emerald-100"
              >
                View planned pricing
              </Link>
              <Link
                href={`${overlay.routeBase}/disclosures`}
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Read disclosures
              </Link>
              <Link
                href="/boating"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Back to boating gateway
              </Link>
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] border-[#d7eef7] bg-white p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              Market motion
            </div>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">
              {MOTION_LABELS[overlay.marketMotion]}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              {overlay.proofSummary}
            </p>
            <a
              href={overlay.officialSourceUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-semibold text-sky-800 hover:bg-sky-100"
            >
              Read official source
            </a>
            <div className="mt-5 text-sm leading-7 text-slate-600">
              Source: {overlay.officialSourceLabel}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">State approval</div>
            <div className="mt-2 text-2xl font-bold text-slate-900">
              {flagValue(overlay.flags.requiresStateApproval)}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">State card</div>
            <div className="mt-2 text-2xl font-bold text-slate-900">
              {flagValue(overlay.flags.requiresStateCard)}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">Proctored exam</div>
            <div className="mt-2 text-2xl font-bold text-slate-900">
              {flagValue(overlay.flags.requiresProctoredExam)}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">Reciprocity friendly</div>
            <div className="mt-2 text-2xl font-bold text-slate-900">
              {flagValue(overlay.flags.acceptsNasblaReciprocity)}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">Resident split</div>
            <div className="mt-2 text-2xl font-bold text-slate-900">
              {flagValue(overlay.flags.residentVsNonresidentSplit)}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Intended audience
            </div>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">
              Who this state overlay is for
            </h2>
            <p className="mt-6 text-sm leading-7 text-slate-700">
              {overlay.audience}
            </p>
            <div className="mt-6 space-y-3 text-sm leading-7 text-slate-700">
              {overlay.launchHighlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
              Next build steps
            </div>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">
              What this state needs next
            </h2>
            <div className="mt-6 space-y-4">
              {overlay.nextBuildSteps.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-amber-200 bg-white p-5 text-sm leading-7 text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-8">
          <PriceMatchGuaranteePanel
            label="Price Match Guarantee"
            title={`If you find a lower public ${overlay.stateName} boating course price, we will review it and match it or beat it by $1.`}
            description={`Every public ${overlay.stateName} boating page now includes a price-match request path so families can ask for a manual tuition review before launch decisions are final.`}
            href={`${overlay.routeBase}/price-match`}
            accent="sky"
            terms={buildBoatingPriceMatchTerms(overlay.stateName)}
          />
        </div>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Related launch states
          </div>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950">
            Other early boating overlays
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {siblingStates.map((item) => (
              <article
                key={item.stateSlug}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                  {item.stateCode}
                </div>
                <h3 className="mt-3 text-xl font-semibold text-slate-950">
                  {item.stateName}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  {item.requirementSummary}
                </p>
                <Link
                  href={item.routeBase ?? "/boating"}
                  className="mt-5 inline-flex rounded-xl border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Open state page
                </Link>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}
