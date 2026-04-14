import type { Metadata } from "next"
import Link from "next/link"
import { VIRGINIA_BOATING_CONFIG } from "@/lib/virginia-boating-config"

export const metadata: Metadata = {
  title: `Virginia Boating Course Information | ${VIRGINIA_BOATING_CONFIG.brandName}`,
  description:
    "Virginia boating safety course information covering who needs boating education, accepted proof, PWC age rules, exemptions, and product-launch notes.",
  alternates: {
    canonical: "/virginia-boating/disclosures",
  },
}

export default function VirginiaBoatingDisclosuresPage() {
  return (
    <main className="public-shell min-h-screen">
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <section className="glass-panel rounded-[2rem] bg-white p-8">
          <div className="space-y-4">
            <div className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
              Virginia DWR rule mapping
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
              Virginia boating course information
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              Review this information before relying on a boating course for a
              Virginia requirement. This product should be marketed as Virginia
              boating safety education and proof of completion, not as a generic
              guaranteed boating license.
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-5">
          {VIRGINIA_BOATING_CONFIG.requirements.map((item) => (
            <article
              key={item.title}
              className="glass-panel rounded-[1.75rem] bg-white p-6"
            >
              <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-3 leading-7 text-slate-600">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Exemptions and special cases
          </h2>
          <div className="mt-4 grid gap-4">
            {VIRGINIA_BOATING_CONFIG.exemptions.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Next step for students
          </h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Review pricing and the Virginia curriculum overlay before checkout
            goes live. The first launch version should make the Virginia proof,
            age, and PWC rules easy to understand before a student pays.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/virginia-boating/pricing"
              className="rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800"
            >
              View planned pricing
            </Link>
            <Link
              href="/virginia-boating/course"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              View Virginia curriculum
            </Link>
            <Link
              href="/virginia-boating"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Back to Virginia boating
            </Link>
          </div>
        </section>
      </section>
    </main>
  )
}
