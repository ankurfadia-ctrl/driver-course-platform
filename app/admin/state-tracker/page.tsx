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
    blocker: "Waiting on DMV review and follow-up.",
    nextAction:
      "Watch for DMV response and keep receipts, packet, and support workflow ready.",
    route: "/admin/virginia-readiness",
    publicRoute: "/virginia",
    docsFolder: "C:/Users/ankur/Documents/Virginia Approval Submission",
  },
  {
    code: "FL",
    name: "Florida",
    status: "DCF review active",
    category: "Parent education acknowledged; BDI still assembling",
    blocker:
      "Florida parent education is in DCF review after the April 3, 2026 acknowledgment email, while Florida BDI still needs the remaining legal/business and final-packet cleanup work.",
    nextAction:
      "Hold the parent-education packet steady unless DCF asks for something, treat Monday, May 18, 2026 as the safe follow-up date if the thread stays quiet, and keep pushing the BDI lane toward final submission.",
    route: "/admin/florida-readiness",
    publicRoute: null,
    docsFolder: "C:/Users/ankur/Documents/Florida Approval Submission",
  },
  {
    code: "SD",
    name: "South Dakota",
    status: "Mailing pending",
    category: "Parenting-course request packet assembled",
    blocker:
      "No regulator blocker yet. The only remaining hold is physical mailing of the signed request packet and saving proof of mailing.",
    nextAction:
      "Mail the signed South Dakota parenting packet as soon as possible, save proof of mailing, and then wait for court-administration follow-up.",
    route: "/admin/south-dakota-parenting-readiness",
    publicRoute: null,
    docsFolder: "C:/Users/ankur/Documents/South Dakota Approval Submission",
  },
  {
    code: "MN",
    name: "Minnesota",
    status: "Submitted",
    category: "SCAO submission sent; public microsite live",
    blocker:
      "No drafting blocker remains. The remaining work is regulator follow-up only unless SCAO asks for clarification, revisions, or reviewer access.",
    nextAction:
      "Watch the Minnesota Parent Education Program inbox, keep the packet and public microsite stable, and respond quickly if SCAO asks for clarifications or additional materials.",
    route: "/admin/minnesota-parent-education-readiness",
    publicRoute: "/minnesota-parent-education",
    docsFolder: "C:/Users/ankur/Documents/Minnesota Approval Submission",
  },
  {
    code: "CA",
    name: "California",
    status: "On hold",
    category: "High-cost, saturated TVS market",
    blocker:
      "California now appears to be a low-price, crowded traffic-school market with meaningful setup overhead, including California foreign LLC registration, annual tax, DMV owner licensing, bond, fingerprinting, and operator/instructor compliance.",
    nextAction:
      "Keep California paused for now. Do not register the LLC in California, start the DMV portal, or spend on bond, fingerprinting, or curriculum review unless the market case changes materially.",
    route: "/admin/california-readiness",
    publicRoute: null,
    docsFolder: "C:/Users/ankur/Documents/California Approval Submission",
  },
  {
    code: "TN",
    name: "Tennessee",
    status: "Instructor path pending",
    category: "Low-friction candidate",
    blocker:
      "Need Tennessee confirmation on acceptable instructor certification path.",
    nextAction:
      "Wait for Tennessee response on NSC acceptability before paying for certification.",
    route: null,
    publicRoute: null,
    docsFolder: "C:/Users/ankur/Documents/Tennessee Approval Submission",
  },
  {
    code: "TX",
    name: "Texas",
    status: "On hold",
    category: "Apply-now but higher spend",
    blocker: "Registered agent, assumed name, bond, and fee cost.",
    nextAction: "Only pursue after deciding the upfront spend is worth it.",
    route: null,
    publicRoute: null,
    docsFolder: "C:/Users/ankur/Documents/Texas Approval Submission",
  },
] as const

const bestUseOfTime = [
  "Mail the South Dakota parenting packet and save proof of mailing.",
  "Watch for Florida DCF parent-education follow-up, reply quickly if they ask for clarification or reviewer access, and use Monday, May 18, 2026 as the safe no-news follow-up date.",
  "Keep pushing Florida BDI toward submission because that remains the main unsubmitted Florida revenue lane.",
  "Watch the Minnesota Parent Education Program thread, keep the public Minnesota microsite stable, and answer any SCAO follow-up quickly.",
  "Keep boating in standards-review and reopening-watch mode. NASBLA says new course intake is still paused but may reopen in roughly June to July 2026.",
  "Keep California TVS on hold unless you decide the economics justify California registration, annual taxes, DMV licensing costs, and a race-to-the-bottom price market.",
  "Do not spin up any new public state app just to stay busy. Most value right now is in filing follow-through, tracker accuracy, and regulator-facing packet work.",
] as const

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
            South Dakota mailing, Florida DCF review, Minnesota SCAO follow-up, and NASBLA watch
          </div>
          <div className="mt-2 text-sm leading-6 text-slate-600">
            South Dakota parenting still needs the physical mailing step and
            proof of mailing. Florida parent education received a DCF
            acknowledgment on April 3, 2026 and is now in regulator-review
            mode, while Minnesota has already been submitted and now needs
            fast follow-up if SCAO asks for anything. Boating should stay in
            standards-review and reopen-watch mode after NASBLA&apos;s April 10,
            2026 guidance pointing to a roughly two-to-three-month wait for new
            course intake. California is intentionally paused rather than
            treated like an active build lane.
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
