import Link from "next/link"
import { redirect } from "next/navigation"
import { isAdminEmail } from "@/lib/admin-access"
import { MINNESOTA_PARENT_EDUCATION_APPROVAL } from "@/lib/minnesota-parent-education-approval"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export default async function MinnesotaParentEducationReadinessPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    redirect("/")
  }

  const approval = MINNESOTA_PARENT_EDUCATION_APPROVAL

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Admin
          </p>
          <h1 className="text-3xl font-bold text-slate-900">{approval.title}</h1>
          <p className="mt-2 max-w-3xl text-slate-600">{approval.summary}</p>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 shadow-sm">
          <div className="text-sm text-blue-700">Current move</div>
          <div className="mt-1 text-lg font-semibold text-blue-900">
            {approval.currentMove}
          </div>
          <div className="mt-2 text-sm leading-6 text-slate-700">
            Minnesota already sent the application and attachments through the
            Parent Education Program inbox. The public Minnesota
            parent-education microsite is also live, so the practical next
            move is just fast regulator follow-up if SCAO asks for anything.
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Program profile</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
            {approval.programProfile.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Official rule points</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
            {approval.officialRulePoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Packet contents</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {approval.packetDocuments.map((document) => (
            <article
              key={document.name}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <h3 className="text-sm font-semibold text-slate-900">
                {document.name}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">
                {document.purpose}
              </p>
            </article>
          ))}
        </div>
      </section>

        <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Submission contact record
          </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {approval.contactFields.map((field) => (
            <article
              key={field.label}
              className="rounded-2xl border border-amber-200 bg-white p-4"
            >
              <h3 className="text-sm font-semibold text-slate-900">
                {field.label}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">
                {field.value}
              </p>
              {field.note ? (
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {field.note}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Original coordinator message
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
          {approval.contactMessage.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Next external steps</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-700">
          {approval.nextExternalSteps.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Official anchors</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {approval.references.map((reference) => (
            <a
              key={reference.href}
              href={reference.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-blue-700 transition hover:bg-white"
            >
              {reference.label}
            </a>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/admin/parent-education-readiness"
            className="inline-flex rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Parent education rollout
          </Link>
          <Link
            href="/admin/south-dakota-parenting-readiness"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            South Dakota parenting
          </Link>
          <Link
            href="/admin/florida-parent-education-submission"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Florida parent steps
          </Link>
        </div>
      </section>
    </div>
  )
}
