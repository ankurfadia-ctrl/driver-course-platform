import Link from "next/link"
import { redirect } from "next/navigation"
import { isAdminEmail } from "@/lib/admin-access"
import { FLORIDA_PARENT_EDUCATION_ONLINE_CONTROLS } from "@/lib/florida-parent-education-online-controls"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export default async function FloridaParentEducationControlsPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    redirect("/")
  }

  const controls = FLORIDA_PARENT_EDUCATION_ONLINE_CONTROLS

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Admin
          </p>
          <h1 className="text-3xl font-bold text-slate-900">{controls.title}</h1>
          <p className="mt-2 max-w-3xl text-slate-600">{controls.summary}</p>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 shadow-sm">
          <div className="text-sm text-blue-700">Control packet status</div>
          <div className="mt-1 text-lg font-semibold text-blue-900">
            Drafted for approval packet
          </div>
          <div className="mt-2 max-w-md text-sm leading-6 text-slate-700">
            {controls.controlStatus}
          </div>
        </div>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Platform anchors</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
          {controls.platformAnchors.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {controls.seatTime.title}
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              The Florida internet course will require {controls.seatTime.requiredMinutes}{" "}
              minutes before completion can be recognized.
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {controls.seatTime.moduleBreakdown.map((module) => (
            <div
              key={module.title}
              className="rounded-2xl border border-green-200 bg-white p-4 text-sm leading-6 text-slate-700"
            >
              <div className="font-semibold text-slate-900">{module.title}</div>
              <div className="mt-1">{module.durationMinutes} minutes</div>
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-green-200 bg-white p-5">
            <h3 className="font-semibold text-slate-900">Seat-time controls</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
              {controls.seatTime.controls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border border-green-200 bg-white p-5">
            <h3 className="font-semibold text-slate-900">Evidence notes</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
              {controls.seatTime.evidenceNotes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            {controls.identity.title}
          </h2>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="font-semibold text-slate-900">Identity fields</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
              {controls.identity.collectedFields.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="font-semibold text-slate-900">Verification flow</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
              {controls.identity.controls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="font-semibold text-slate-900">Policy notes</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
              {controls.identity.policyNotes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </article>

        <article className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            {controls.support.title}
          </h2>
          <div className="mt-4 rounded-2xl border border-amber-200 bg-white p-4">
            <div className="font-semibold text-slate-900">Support channels</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
              {controls.support.channels.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4 rounded-2xl border border-amber-200 bg-white p-4">
            <div className="font-semibold text-slate-900">Response workflow</div>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700">
              {controls.support.workflow.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
          <div className="mt-4 rounded-2xl border border-amber-200 bg-white p-4">
            <div className="font-semibold text-slate-900">Escalation guardrails</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
              {controls.support.escalationRules.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          {controls.recordkeeping.title}
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
          {controls.recordkeeping.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Next implementation moves
        </h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-700">
          {controls.nextImplementationMoves.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/florida-parent-education-packet"
          className="inline-flex rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Florida parent packet
        </Link>
        <Link
          href="/admin/florida-parent-education-final-packet"
          className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Florida parent final packet
        </Link>
        <Link
          href="/admin/florida-parent-education-submission"
          className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Florida parent steps
        </Link>
      </div>
    </div>
  )
}
