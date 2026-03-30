import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/admin-access"
import { getCourseConfig } from "@/lib/course-config"

export const dynamic = "force-dynamic"

const platformReady = [
  "Shared auth, checkout, dashboard, support, and admin infrastructure already exists",
  "State configuration now includes a Florida scaffold and Florida course tracks",
  "Regulatory outreach workflow exists in admin for FLHSMV communication",
  "Knowledge-base support chat works without external AI billing",
  "Multi-state homepage and disclosure scaffolding is now in place",
]

const waitingOnFlorida = [
  "Minimum course content criteria from FLHSMV for BDI, ADI, TLSAE, and Mature Driver",
  "Florida provider application materials and hard-copy submission details",
  "Florida certificate, completion reporting, and course-demo requirements",
  "Any Florida-specific support, refund, or operational rules that differ by course type",
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
  "Florida state-specific disclosures",
  "Florida support FAQ pack",
  "Florida course-track selection model",
  "Florida approval-packet folder and printed checklist",
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
            Use this workspace to prepare the Florida rollout for BDI, ADI,
            TLSAE, and Mature Driver while waiting for FLHSMV to return the
            official minimum content criteria.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
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

        <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Still waiting on FLHSMV
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
            {waitingOnFlorida.map((item) => (
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

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Next build targets while waiting
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
          {nextBuildTargets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}
