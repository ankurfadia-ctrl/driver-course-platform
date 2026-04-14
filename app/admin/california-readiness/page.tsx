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
  "Official California forms and references are already saved locally, including OL 612, OL 613, and OL 704B",
  "Cost estimate and California-versus-Florida decision notes are already prepared",
]

const californiaBlockers = [
  "The California TVS market appears crowded and highly price-sensitive, including competitors advertising all-in pricing as low as $5",
  "A real California LLC path would likely mean foreign registration, annual tax exposure, DMV owner licensing costs, bond, fingerprinting, and operator/instructor compliance",
  "Low advertised course pricing makes it harder to justify the startup spend compared with Florida and parenting-course lanes",
  "Business office, property-use, and local-license requirements still need to be mapped if California is ever reactivated",
  "California internet curriculum review still adds another meaningful decision and cost layer if you revive the lane later",
]

const buildSequence = [
  {
    title: "Hold first",
    body:
      "Treat California as paused instead of forcing momentum into a crowded, low-margin market. The next move is strategic review, not filing.",
  },
  {
    title: "Re-open only if the market case improves",
    body:
      "Only revive California if you decide the market size and acquisition path justify California foreign registration, annual taxes, and licensing overhead.",
  },
  {
    title: "Portal path remains the technical entry point",
    body:
      "If you restart California later, begin in the Occupational Licensing portal rather than with the older mail-first name approval materials.",
  },
  {
    title: "Deeper compliance only after a go decision",
    body:
      "Do not spend on bonds, fingerprinting, operator/instructor steps, or internet-course review until you affirmatively decide California is worth pursuing.",
  },
]

const nextBuildTargets = [
  "Keep the California workspace archived as a later-option lane",
  "Revisit California only if you want a national TVS footprint badly enough to absorb the low-price market",
  "Preserve the DMV portal notes so the process is ready if you restart it",
  "Keep comparing California against higher-leverage lanes like Florida BDI and parenting approvals",
  "Avoid new California spend until a clear go decision is made",
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
            Use this workspace as a hold-state reference, not an active build
            queue. California remains documented here, but the market looks
            crowded and low-margin enough that it is not a priority right now.
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
            Recommended posture
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
            Next California actions
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
            Open California Reference Workspace
          </Link>
        </div>
      </section>
    </div>
  )
}
