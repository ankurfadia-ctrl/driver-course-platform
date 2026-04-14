import Link from "next/link"
import { redirect } from "next/navigation"
import { isAdminEmail } from "@/lib/admin-access"
import { FLORIDA_BDI_SUBMISSION_WORKFLOW } from "@/lib/florida-bdi-submission"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

function getStatusClasses(status: "active" | "next" | "pending") {
  if (status === "active") {
    return "bg-blue-100 text-blue-700"
  }

  if (status === "next") {
    return "bg-amber-100 text-amber-800"
  }

  return "bg-slate-100 text-slate-700"
}

export default async function FloridaBDISubmissionPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    redirect("/")
  }

  const workflow = FLORIDA_BDI_SUBMISSION_WORKFLOW

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Admin
          </p>
          <h1 className="text-3xl font-bold text-slate-900">{workflow.title}</h1>
          <p className="mt-2 max-w-3xl text-slate-600">{workflow.summary}</p>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 shadow-sm">
          <div className="text-sm text-blue-700">Current next move</div>
          <div className="mt-1 text-lg font-semibold text-blue-900">
            Mail the Florida LLC packet, then finalize the BDI application
          </div>
          <div className="mt-2 max-w-md text-sm leading-6 text-slate-700">
            {workflow.currentFocus}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-green-200 bg-green-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Already completed
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
            {workflow.doneAlready.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Guardrails before filing
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
            {workflow.criticalRules.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="space-y-4">
        {workflow.stages.map((stage) => (
          <article
            key={stage.step}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                  {stage.step}
                </div>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                  {stage.title}
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">
                  {stage.outcome}
                </p>
              </div>
              <div
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${getStatusClasses(stage.status)}`}
              >
                {stage.status}
              </div>
            </div>

            <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
              {stage.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Florida workspaces</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/admin/florida-readiness"
            className="inline-flex rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Florida Readiness
          </Link>
          <Link
            href="/admin/florida-approval-packet"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Florida Packet
          </Link>
          <Link
            href="/admin/florida-approval-packet/reviewer"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Reviewer Packet
          </Link>
          <Link
            href="/florida-bdi"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            BDI Preview
          </Link>
        </div>
      </section>
    </div>
  )
}
