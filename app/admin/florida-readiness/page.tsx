import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/admin-access"
import { getCourseConfig } from "@/lib/course-config"
import { getFloridaTrackRoute } from "@/lib/florida-course-tracks"
import { FLORIDA_BDI_TOPIC_MATRIX } from "@/lib/florida-bdi-course-content"

export const dynamic = "force-dynamic"

const platformReady = [
  "Shared auth, checkout, dashboard, support, and admin infrastructure already exists",
  "State configuration now includes a Florida scaffold and Florida course tracks",
  "Regulatory outreach workflow exists in admin for FLHSMV communication",
  "Knowledge-base support chat works without external AI billing",
  "Multi-state homepage and disclosure scaffolding is now in place",
]

const confirmedByFLHSMV = [
  "Forms confirmed current as of March 31, 2026 by Milton Grosz (FLHSMV)",
  "Separate approval packets required for each course type and each delivery type",
  "Pilot test confirmed active - course restricted to one jurisdiction after approval",
  "Selected pilot jurisdiction: Miami-Dade County (11th Judicial Circuit)",
  "~2,500 graduates with 2+ years post-course experience needed to complete the pilot study",
  "No additional forms or instructions - provider has all materials needed",
]

const buildSequence = [
  {
    title: "BDI first",
    body:
      "Basic Driver Improvement is the best first Florida build because it is the closest match to the current Virginia-style driver-improvement product.",
  },
  {
    title: "ADI second",
    body:
      "Advanced Driver Improvement should be mapped after BDI, using the same shared product infrastructure where possible.",
  },
  {
    title: "TLSAE third",
    body:
      "TLSAE has a different student story and licensing purpose, so it should be built after the core BDI and ADI flows are stable.",
  },
  {
    title: "Mature Driver fourth",
    body:
      "The Mature Driver insurance-discount course is a good later product line once the first three Florida tracks are framed correctly.",
  },
]

const nextBuildTargets = [
  "Florida foreign LLC packet completed, check prepared, and mailing scheduled for April 2, 2026",
  "Track Florida business-filing confirmation and update packet entity details once the filing is accepted",
  "Add pilot jurisdiction declaration (Miami-Dade County) to application form and cover letter",
  "Copyright and ownership documentation attachment",
  "Final PDF packet assembly with frozen script-page references preserved",
  "Demo environment ready for FLHSMV committee walkthrough",
]

const bdiCompleted = [
  "Script v0.2 paginated and page-frozen (18 pages, 10 modules)",
  `Topic-to-page matrix complete - all ${FLORIDA_BDI_TOPIC_MATRIX.length} topic rows page-frozen`,
  "500-question bank complete with script-page references",
  "Cover letter drafted with Miami-Dade pilot jurisdiction declared",
  "Submission manifest, table of contents, and all support documents drafted",
  "Florida foreign LLC mailing packet assembled with Virginia certificate, registered-agent details, and filing check",
]

export default async function FloridaReadinessPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    redirect("/")
  }

  const floridaConfig = getCourseConfig("florida")

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Admin
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            Florida Approval Readiness
          </h1>
          <p className="mt-2 max-w-3xl text-slate-600">
            Florida forms confirmed current by FLHSMV on March 31, 2026. Pilot
            test confirmed active. Pilot jurisdiction: Miami-Dade County. LLC
            filing packet is complete and queued for mailing on April 2, 2026.
            BDI packet near complete - application finalization, ownership
            attachment, and final PDF assembly remain.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/florida-approval-packet"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Florida Packet
          </Link>
          <Link
            href="/admin/florida-bdi-submission"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            BDI Step-by-Step
          </Link>
          <Link
            href="/admin/outreach"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Regulatory Outreach
          </Link>
          <Link
            href="/admin/operations"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Operations
          </Link>
          <Link
            href="/florida/reviewer-access"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Florida Reviewer Portal
          </Link>
          <Link
            href="/admin/florida-approval-packet/reviewer"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Reviewer Packet
          </Link>
          <Link
            href="/admin/florida-parent-education"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Parent Education
          </Link>
          <Link
            href="/florida"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Florida Public Page
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Platform already ready
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
            {platformReady.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-green-200 bg-green-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Confirmed by FLHSMV - March 31, 2026
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
            {confirmedByFLHSMV.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-slate-900">
            Florida course tracks
          </h2>
          <div className="text-sm text-slate-500">
            {floridaConfig.approvalStatusLabel}
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {(floridaConfig.courseTracks ?? []).map((track) => (
            <article
              key={track.code}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-900">{track.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{track.audience}</p>
                </div>
                <div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                  {track.status.replace("-", " ")}
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                {track.notes}
              </p>
              <div className="mt-4">
                <Link
                  href={getFloridaTrackRoute(track.code)}
                  className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Open public preview
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Recommended build order
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {buildSequence.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          BDI packet - completed items
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
          {bdiCompleted.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Remaining before submission
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
          {nextBuildTargets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="mt-5">
          <Link
            href="/admin/florida-approval-packet"
            className="inline-flex rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Open Florida Packet Workspace
          </Link>
        </div>
      </section>
    </div>
  )
}
