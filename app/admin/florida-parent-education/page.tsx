import Link from "next/link"
import { redirect } from "next/navigation"
import { isAdminEmail } from "@/lib/admin-access"
import { FLORIDA_PARENT_EDUCATION_WORKSPACE } from "@/lib/florida-parent-education"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export default async function FloridaParentEducationPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    redirect("/")
  }

  const workspace = FLORIDA_PARENT_EDUCATION_WORKSPACE

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Admin
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            Florida Parent Education / Family Stabilization
          </h1>
          <p className="mt-2 max-w-3xl text-slate-600">
            {workspace.summary}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="text-sm text-slate-500">{workspace.approvalLabel}</div>
          <div className="mt-1 text-lg font-semibold text-slate-900">
            {workspace.approvalAuthority}
          </div>
          <div className="mt-2 text-sm leading-6 text-slate-600">
            Review window: {workspace.reviewWindow}. Approval term:{" "}
            {workspace.approvalTerm}.
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
          <div className="text-sm text-blue-700">Product lane</div>
          <div className="mt-2 text-2xl font-bold text-blue-900">
            Family stabilization
          </div>
        </div>
        <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
          <div className="text-sm text-green-700">Approval term</div>
          <div className="mt-2 text-2xl font-bold text-green-900">3 years</div>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <div className="text-sm text-amber-700">Review window</div>
          <div className="mt-2 text-2xl font-bold text-amber-900">
            30 business days
          </div>
        </div>
      </div>

      <section className="rounded-3xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Official anchors</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-700">
          {workspace.onlineCourseNote}
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {workspace.references.map((reference) => (
            <a
              key={reference.href}
              href={reference.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-sky-100 bg-white p-4 text-sm leading-6 text-slate-700 transition hover:bg-slate-50"
            >
              <div className="font-semibold text-slate-900">{reference.label}</div>
              <div className="mt-2 break-all text-blue-700">{reference.href}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {workspace.sections.map((section) => (
          <article
            key={section.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-slate-900">
              {section.title}
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Online controls</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
            {workspace.onlineControls.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Next actions</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
            {workspace.nextActions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Build notes</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {workspace.buildNotes.map((note) => (
            <div
              key={note}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700"
            >
              {note}
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/admin/florida-parent-education-packet"
            className="inline-flex rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Florida parent packet
          </Link>
          <Link
            href="/admin/florida-parent-education-controls"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Florida parent controls
          </Link>
          <Link
            href="/admin/florida-parent-education-submission"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Florida parent steps
          </Link>
          <Link
            href="/admin/parent-education-readiness"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Parent education rollout
          </Link>
          <Link
            href="/admin/florida-readiness"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Back to Florida readiness
          </Link>
          <Link
            href="/admin/florida-approval-packet"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Open Florida packet
          </Link>
        </div>
      </section>
    </div>
  )
}
