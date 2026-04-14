import type { Metadata } from "next"
import Link from "next/link"
import { VIRGINIA_BOATING_CONFIG } from "@/lib/virginia-boating-config"

export const metadata: Metadata = {
  title: `Virginia Boating Checkout | ${VIRGINIA_BOATING_CONFIG.brandName}`,
  description:
    "Virginia boating checkout scaffold describing what will happen before payments and student course access are activated.",
  alternates: {
    canonical: "/virginia-boating/checkout",
  },
}

export default function VirginiaBoatingCheckoutPage() {
  const steps = [
    [
      "1. Review eligibility",
      "Students confirm whether they need Virginia boating education, whether exemptions may apply, and whether they are pursuing general motorboat proof or PWC eligibility.",
    ],
    [
      "2. Create account",
      "The future live checkout will require an account so payment, course access, and proof-of-completion records stay attached to the right student.",
    ],
    [
      "3. Activate course access",
      "After launch, payment will unlock the Virginia boating curriculum, knowledge checks, and final proof workflow.",
    ],
  ] as const

  return (
    <main className="public-shell min-h-screen">
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <section className="glass-panel rounded-[2rem] bg-white p-8">
          <div className="space-y-4">
            <div className="section-label">Virginia Boating Checkout</div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
              Choose your Virginia boating checkout path
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              Payments now flow through the individual plan pages. Start from the
              pricing page, pick the plan you want, then continue to Stripe from
              the plan-specific checkout screen.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">
            Planned checkout sequence
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {steps.map(([title, body]) => (
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
            Next step
          </div>
          <p className="mt-3 leading-7 text-slate-700">
            Use the pricing page to choose a plan, then continue into the
            Virginia boating dashboard after purchase to access the lesson flow.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/virginia-boating/pricing"
              className="rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800"
            >
              Back to pricing
            </Link>
            <Link
              href="/virginia-boating/disclosures"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Read disclosures
            </Link>
          </div>
        </section>
      </section>
    </main>
  )
}
