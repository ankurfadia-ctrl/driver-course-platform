import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/admin-access"
import { getCourseConfig } from "@/lib/course-config"

export const dynamic = "force-dynamic"

const platformReady = [
  "Shared auth, support, checkout, dashboard, and admin infrastructure already exists",
  "Prep-only state gating already prevents California from opening publicly too early",
  "California submission workspace exists locally in Documents",
  "Official starting forms have been saved, including OL 612, OL 613, and OL 704B",
  "Cost estimate and California-versus-Florida decision notes are already prepared",
]

const californiaBlockers = [
  "California TVS name approval must be mailed and approved first",
  "Business office, property-use, and local-license requirements still need to be mapped to your situation",
  "Bond, fingerprint, operator, and instructor workflows add cost and operational complexity",
  "California internet curriculum review path must be chosen before deeper content build work",
]

const buildSequence = [
  {
    title: "Name approval first",
    body:
      "Mail OL 612 first and wait for California DMV name approval before spending on the heavier California occupational-licensing steps.",
  },
  {
    title: "Entity and office package second",
    body:
      "While name approval is pending, organize the business-office, property, local-license, and bond planning needed for the owner packet.",
  },
  {
    title: "Owner, operator, instructor path third",
    body:
      "California is not just a course packet. The operational licensing path includes owner, operator, and instructor requirements that should be staged together.",
  },
  {
    title: "Internet curriculum path fourth",
    body:
      "Only after the name and licensing path are real should you commit to the original internet curriculum review path and the deeper California content build.",
  },
]

const nextBuildTargets = [
  "California TVS owner packet organization",
  "California operator and instructor requirement checklist",
  "California bond and fingerprint prep notes",
  "California office and local-license evidence checklist",
]

export default async function CaliforniaReadinessPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    redirect("/")
  }

  const californiaConfig = getCourseConfig("california")

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Admin
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            California Approval Readiness
          </h1>
          <p className="mt-2 max-w-3xl text-slate-600">
            Use this workspace to prepare the California traffic violator school
            path without accidentally treating California like a simple second
            Virginia. The first low-regret step is name approval, then the
            heavier occupational-licensing path follows.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/california-approval-packet"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            California Packet
          </Link>
          <Link
            href="/admin/course-types"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Course Types
          </Link>
          <Link
            href="/california"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            California Public Page
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
            Main California blockers
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
            {californiaBlockers.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-slate-900">
            California course track
          </h2>
          <div className="text-sm text-slate-500">
            {californiaConfig.approvalStatusLabel}
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {(californiaConfig.courseTracks ?? []).map((track) => (
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
          Next build targets
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
          {nextBuildTargets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="mt-5">
          <Link
            href="/admin/california-approval-packet"
            className="inline-flex rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Open California Packet Workspace
          </Link>
        </div>
      </section>
    </div>
  )
}
