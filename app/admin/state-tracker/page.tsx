import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/admin-access"

export const dynamic = "force-dynamic"

const states = [
  {
    code: "VA",
    name: "Virginia",
    status: "Submitted",
    category: "Active regulator review",
    blocker: "Waiting on DMV review and follow-up",
    nextAction: "Watch for DMV response and keep receipts, packet, and support workflow ready.",
    route: "/admin/virginia-readiness",
    publicRoute: "/virginia",
    docsFolder:
      "C:/Users/ankur/Documents/Virginia Approval Submission",
  },
  {
    code: "FL",
    name: "Florida",
    status: "Criteria requested",
    category: "Waiting on regulator guidance",
    blocker: "FLHSMV minimum content criteria not received yet",
    nextAction: "Wait for FLHSMV reply, save the response, then build BDI first.",
    route: "/admin/florida-readiness",
    publicRoute: "/florida",
    docsFolder:
      "C:/Users/ankur/Documents/Florida Approval Submission",
  },
  {
    code: "CA",
    name: "California",
    status: "Name approval starting",
    category: "Low-regret first filing in motion",
    blocker: "Need OL 612 response before deeper spend",
    nextAction: "Mail OL 612, save proof of mailing, then wait before bond and licensing spend.",
    route: "/admin/california-readiness",
    publicRoute: "/california",
    docsFolder:
      "C:/Users/ankur/Documents/California Approval Submission",
  },
  {
    code: "TN",
    name: "Tennessee",
    status: "Instructor path pending",
    category: "Low-friction candidate",
    blocker: "Need Tennessee confirmation on acceptable instructor certification path",
    nextAction: "Wait for Tennessee response on NSC acceptability before paying for certification.",
    route: null,
    publicRoute: null,
    docsFolder:
      "C:/Users/ankur/Documents/Tennessee Approval Submission",
  },
  {
    code: "TX",
    name: "Texas",
    status: "On hold",
    category: "Apply-now but higher spend",
    blocker: "Registered agent, assumed name, bond, and fee cost",
    nextAction: "Only pursue after deciding the upfront spend is worth it.",
    route: null,
    publicRoute: null,
    docsFolder:
      "C:/Users/ankur/Documents/Texas Approval Submission",
  },
]

const bestUseOfTime = [
  "Respond quickly to any regulator email and save every reply into the matching state folder.",
  "Do not spend on Texas, California bond/fingerprints, or Tennessee certification until the current blockers clear.",
  "Keep public non-live states in prep-only mode until each state is actually ready.",
]

export default async function AdminStateTrackerPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    redirect("/")
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Admin
          </p>
          <h1 className="text-3xl font-bold text-slate-900">State Tracker</h1>
          <p className="mt-2 max-w-4xl text-slate-600">
            One place to see which states are submitted, blocked, in prep, or
            intentionally on hold. Use this page to avoid overspending and keep
            each state moving in the right lane.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="text-sm text-slate-500">Current focus</div>
          <div className="mt-1 text-lg font-semibold text-slate-900">
            Wait smart, not idle
          </div>
          <div className="mt-2 text-sm leading-6 text-slate-600">
            Virginia, Florida, California, and Tennessee all have active
            external blockers, so the job is tracking and responding fast.
          </div>
        </div>
      </div>

      <section className="grid gap-5 lg:grid-cols-2">
        {states.map((state) => (
          <article
            key={state.code}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                  {state.code}
                </div>
                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  {state.name}
                </h2>
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                {state.status}
              </div>
            </div>

            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              <p>
                <span className="font-semibold text-slate-900">Category:</span>{" "}
                {state.category}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Blocker:</span>{" "}
                {state.blocker}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Next action:</span>{" "}
                {state.nextAction}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Folder:</span>{" "}
                <a href={state.docsFolder} className="underline">
                  {state.docsFolder}
                </a>
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {state.route ? (
                <Link
                  href={state.route}
                  className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Open admin page
                </Link>
              ) : null}
              {state.publicRoute ? (
                <Link
                  href={state.publicRoute}
                  className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Open public page
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Best use of time right now
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
          {bestUseOfTime.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}
