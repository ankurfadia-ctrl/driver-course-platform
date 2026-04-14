import Link from "next/link"
import { BOATING_LAUNCH_CHECKOUT_STEPS } from "@/lib/boating-launch-state-product"
import { getBoatingStateOverlay } from "@/lib/boating-state-overlays"

type Props = {
  stateSlug: string
}

export default function BoatingStateCheckoutPage({ stateSlug }: Props) {
  const overlay = getBoatingStateOverlay(stateSlug)

  if (!overlay?.routeBase) {
    return null
  }

  return (
    <main className="public-shell min-h-screen">
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <section className="glass-panel rounded-[2rem] bg-white p-8">
          <div className="space-y-4">
            <div className="section-label">{overlay.stateName} Boating Checkout</div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
              Choose your {overlay.stateName} boating launch path
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              This state overlay is staged for launch preparation. Pricing and
              disclosures are now in place, but live payment should remain off
              until the {overlay.stateName} proof language and support flow are
              fully locked.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">
            Planned checkout sequence
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {BOATING_LAUNCH_CHECKOUT_STEPS.map(([title, body]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="font-semibold text-slate-900">{title}</div>
                <div className="mt-2 text-sm leading-6 text-slate-600">{body}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
            Launch guardrail
          </div>
          <p className="mt-3 leading-7 text-slate-700">
            Keep payment activation off until the certificate wording, student
            instructions, and support answer set for {overlay.stateName} are ready
            to hold up under regulator or student scrutiny, and until the
            accepted-course approval path for this state is actually satisfied.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={`${overlay.routeBase}/pricing`}
              className="rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800"
            >
              Back to pricing
            </Link>
            <Link
              href={`${overlay.routeBase}/disclosures`}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Read disclosures
            </Link>
            <Link
              href={overlay.routeBase}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Back to {overlay.stateName} boating
            </Link>
          </div>
        </section>
      </section>
    </main>
  )
}
