import Link from "next/link"
import { redirect } from "next/navigation"
import { isAdminEmail } from "@/lib/admin-access"
import { FLORIDA_PARENT_EDUCATION_GUIDEBOOK } from "@/lib/florida-parent-education-course-content"
import { FLORIDA_PARENT_EDUCATION_ONLINE_CONTROLS } from "@/lib/florida-parent-education-online-controls"
import { FLORIDA_PARENT_EDUCATION_FINAL_PACKET } from "@/lib/florida-parent-education-final-packet"
import { FLORIDA_PARENT_EDUCATION_PACKET_DRAFTS } from "@/lib/florida-parent-education-packet-drafts"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

function getStatusClasses(status: "drafted" | "pending-external") {
  if (status === "drafted") {
    return "bg-green-100 text-green-700"
  }

  return "bg-amber-100 text-amber-800"
}

export default async function FloridaParentEducationFinalPacketPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    redirect("/")
  }

  const finalPacket = FLORIDA_PARENT_EDUCATION_FINAL_PACKET
  const drafts = FLORIDA_PARENT_EDUCATION_PACKET_DRAFTS
  const guidebook = FLORIDA_PARENT_EDUCATION_GUIDEBOOK
  const controls = FLORIDA_PARENT_EDUCATION_ONLINE_CONTROLS

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Admin
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            {finalPacket.title}
          </h1>
          <p className="mt-2 max-w-3xl text-slate-600">
            {finalPacket.summary}
          </p>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 shadow-sm">
          <div className="text-sm text-blue-700">{finalPacket.submissionLabel}</div>
          <div className="mt-1 text-lg font-semibold text-blue-900">
            {finalPacket.submissionEmail}
          </div>
          <div className="mt-2 text-sm leading-6 text-slate-700">
            Review window: {finalPacket.reviewWindow}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm text-slate-500">Standard fee</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">
            {drafts.standardCourseFee}
          </div>
        </section>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm text-slate-500">Designated responder</div>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {drafts.designatedResponder}
          </div>
        </section>
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm text-slate-500">Course structure</div>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {guidebook.modules.length} modules / {guidebook.totalMinutes} min
          </div>
        </section>
      </div>

      <section className="space-y-4">
        {finalPacket.packetSections.map((section) => (
          <article
            key={section.order}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                  Section {section.order}
                </div>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                  {section.title}
                </h2>
                <div className="mt-2 text-sm text-slate-600">
                  Source: {section.sourceLabel}
                </div>
              </div>
              <div
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${getStatusClasses(section.status)}`}
              >
                {section.status === "drafted" ? "Drafted" : "Pending external"}
              </div>
            </div>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
              {section.notes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="mt-4">
              <Link
                href={section.sourceHref}
                className="inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Open source workspace
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Cover letter snapshot
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
            {drafts.introductionLetter.map((line, index) => (
              <p key={`${line}-${index}`}>{line || <span>&nbsp;</span>}</p>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Fee and hardship policy snapshot
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
            {drafts.indigentPolicy.policyText.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-green-200 bg-green-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Guidebook and final-test snapshot
          </h2>
          <div className="mt-4 rounded-2xl border border-green-200 bg-white p-4">
            <div className="font-semibold text-slate-900">
              {guidebook.officialCourseName}
            </div>
            <div className="mt-1 text-sm text-slate-600">
              Unique curriculum name: {guidebook.sampleCurriculumName}
            </div>
            <div className="mt-3 text-sm leading-7 text-slate-700">
              Total time: {guidebook.totalMinutes} minutes. Passing score:{" "}
              {guidebook.passingScorePercent}%. Instructor response window:{" "}
              {guidebook.instructorResponseWindow}.
            </div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
              {guidebook.finalTestPolicy.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </article>

        <article className="rounded-3xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Online-controls snapshot
          </h2>
          <div className="mt-4 rounded-2xl border border-blue-200 bg-white p-4">
            <div className="font-semibold text-slate-900">Seat-time</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
              {controls.seatTime.controls.slice(0, 4).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4 rounded-2xl border border-blue-200 bg-white p-4">
            <div className="font-semibold text-slate-900">Support and certificate controls</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
              {controls.support.workflow.slice(0, 3).map((item) => (
                <li key={item}>{item}</li>
              ))}
              {controls.recordkeeping.items.slice(0, 2).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Final assembly checklist
        </h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-700">
          {finalPacket.finalAssemblyChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Workspaces</h2>
        <div className="mt-4 flex flex-wrap gap-3">
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
        </div>
      </section>
    </div>
  )
}
