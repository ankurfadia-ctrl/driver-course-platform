import Link from "next/link"
import { getBoatingStateOverlay } from "@/lib/boating-state-overlays"

type Props = {
  stateSlug: string
}

export default function BoatingStateDisclosuresPage({ stateSlug }: Props) {
  const overlay = getBoatingStateOverlay(stateSlug)

  if (!overlay?.routeBase) {
    return null
  }

  return (
    <main className="public-shell min-h-screen">
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <section className="glass-panel rounded-[2rem] bg-white p-8">
          <div className="space-y-4">
            <div className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
              {overlay.stateName} boating rule mapping
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
              {overlay.stateName} boating course information
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              Review this information before relying on a boating course for a{" "}
              {overlay.stateName} requirement. This launch-state product should
              be marketed as boating safety education and proof guidance, not as
              a guaranteed state-issued boating license unless the state
              workflow truly supports that claim.
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-5">
          <article className="glass-panel rounded-[1.75rem] bg-white p-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Compliance path
            </h2>
            <p className="mt-3 leading-7 text-slate-600">{overlay.proofSummary}</p>
          </article>

          {overlay.launchHighlights.map((item) => (
            <article
              key={item}
              className="glass-panel rounded-[1.75rem] bg-white p-6"
            >
              <h2 className="text-xl font-semibold text-slate-900">
                Launch note
              </h2>
              <p className="mt-3 leading-7 text-slate-600">{item}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Operational flags for this state
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-semibold text-slate-900">
                State approval
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {overlay.flags.requiresStateApproval
                  ? "Yes. Keep launch claims and payment activation aligned to the state approval/listing path."
                  : "No special approval path is modeled for this first launch slice, but the public proof language still matters."}
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-semibold text-slate-900">
                State card or state exam
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {overlay.flags.requiresStateCard || overlay.flags.requiresProctoredExam
                  ? "A state card, exam, or extra handoff still matters here, so keep the marketing and student instructions narrow."
                  : "The first launch version can stay certificate-focused without a separate state exam or card handoff."}
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-semibold text-slate-900">
                Reciprocity
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {overlay.flags.acceptsNasblaReciprocity
                  ? "NASBLA reciprocity is friendly enough that the product can center on accepted certificate proof."
                  : "Reciprocity is not the main marketing hook here; state-specific approval or state-issued workflow matters more."}
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-semibold text-slate-900">
                Resident split
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {overlay.flags.residentVsNonresidentSplit
                  ? "Residents and nonresidents should not be pushed through the exact same path."
                  : "The first launch page can stay on one path without a resident/nonresident split."}
              </p>
            </article>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-blue-200 bg-blue-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Launch approval guardrail
          </h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">
            Do not market this as an accepted {overlay.stateName} compliance
            course or turn on payment until the underlying accepted-course path
            is actually satisfied for this state. For South Carolina and Ohio,
            that means the accepted course approval path matters even though we
            are not modeling a separate heavy state-issued card workflow here.
          </p>
        </section>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Next step for students
          </h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Review planned pricing and the public boating curriculum before a
            live launch. The first launch version should make the {overlay.stateName}{" "}
            scope rules, proof language, and support path easy to understand
            before a student pays.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={`${overlay.routeBase}/pricing`}
              className="rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800"
            >
              View planned pricing
            </Link>
            <Link
              href="/boating/course"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              View boating curriculum
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
