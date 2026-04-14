import Link from "next/link"
import { redirect } from "next/navigation"
import { isAdminEmail } from "@/lib/admin-access"
import { PARENT_EDUCATION_ROLLOUT } from "@/lib/parent-education-rollout"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

const statusStyles = {
  best: "border-green-200 bg-green-50 text-green-700",
  good: "border-blue-200 bg-blue-50 text-blue-700",
  medium: "border-amber-200 bg-amber-50 text-amber-700",
  poor: "border-rose-200 bg-rose-50 text-rose-700",
} as const

export default async function ParentEducationReadinessPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    redirect("/")
  }

  const rollout = PARENT_EDUCATION_ROLLOUT

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Admin
          </p>
          <h1 className="text-3xl font-bold text-slate-900">{rollout.title}</h1>
          <p className="mt-2 max-w-3xl text-slate-600">{rollout.summary}</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="text-sm text-slate-500">Recommended order</div>
          <div className="mt-2 space-y-2 text-sm leading-6 text-slate-700">
            {rollout.recommendedOrder.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        {rollout.strategyNotes.map((note) => (
          <article
            key={note}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm leading-7 text-slate-700">{note}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">State targets</h2>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {rollout.states.map((state) => (
            <article
              key={state.state}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {state.state}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {state.recommendation}
                  </p>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                    statusStyles[state.status]
                  }`}
                >
                  {state.status}
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-700">
                {state.summary}
              </p>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-sm font-semibold text-slate-900">
                  Approval path
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-700">
                  {state.approvalPath}
                </p>
              </div>

              <div className="mt-4">
                <div className="text-sm font-semibold text-slate-900">
                  Online / course rules
                </div>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
                  {state.onlineRules.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="text-sm font-semibold text-slate-900">
                  Why it matters
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-700">
                  {state.whyItMatters}
                </p>
              </div>

              <div className="mt-4 grid gap-2">
                {state.references.map((reference) => (
                  <a
                    key={reference.href}
                    href={reference.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-blue-700 transition hover:bg-slate-100"
                  >
                    {reference.label}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Next actions</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-700">
          {rollout.nextActions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/florida-parent-education"
          className="inline-flex rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Open Florida parent education
        </Link>
        <Link
          href="/admin/florida-parent-education-packet"
          className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Florida parent packet
        </Link>
        <Link
          href="/admin/south-dakota-parenting-readiness"
          className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          South Dakota parenting
        </Link>
        <Link
          href="/admin/minnesota-parent-education-readiness"
          className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Minnesota parenting
        </Link>
        <Link
          href="/admin/launch-readiness"
          className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Back to launch readiness
        </Link>
      </div>
    </div>
  )
}
