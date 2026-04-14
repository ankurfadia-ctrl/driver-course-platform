import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/admin-access"

export const dynamic = "force-dynamic"

const readinessItems = [
  {
    title: "NASBLA intake still paused",
    status: "Backlog nearly cleared",
    body:
      "As of April 10, 2026, NASBLA says it is close to clearing the Basic Boating Knowledge backlog, but new course and renewal applications are still paused while a new submission process is built. The current estimate is that new-course intake may reopen in roughly two to three months, with Phoebe Wallace building the new workflow.",
  },
  {
    title: "National course acceptance gate",
    status: "Blocked",
    body:
      "Do not activate boating payments in South Carolina or Ohio until the accepted-course approval path is satisfied. For these first two states, the commercial gate is not a separate heavy state-issued card workflow, but it is still an approved-course gate.",
  },
  {
    title: "Standards review can continue now",
    status: "Actionable now",
    body:
      "NASBLA specifically recommended continuing course development now by working directly against the American National Standards and the relevant Technical Reports. The standards are not expected to change materially, so standards-aligned curriculum work can keep moving even while intake is paused.",
  },
  {
    title: "South Carolina path",
    status: "Needs approval",
    body:
      "South Carolina is still a clean early market because the standard boater certificate path is NASBLA-friendly, but that still means the course has to fit the accepted-course path before you sell it as compliance-ready.",
  },
  {
    title: "Ohio path",
    status: "Needs approval",
    body:
      "Ohio law accepts a safe boater course approved by NASBLA or a qualifying proficiency examination. If this product is sold as the course path, the certificate and course approval status must line up with that requirement.",
  },
  {
    title: "Certificate wording",
    status: "Pending",
    body:
      "Ohio certificate details still need extra care because Ohio rules specify what must appear on the certificate, and NASBLA-approved certificates must show the NASBLA logo and approval wording.",
  },
]

const nextSteps = [
  "Review ANSI/NASBLA 100-2022 Core, ANSI/NASBLA 103-2022 Plus Power, and the relevant Technical Reports while the intake window is still closed.",
  "Prepare the boating approval package for the accepted-course path before turning on any non-Virginia boating payment flow.",
  "Treat June 2026 as the earliest realistic reopening watch window and July 2026 as the outer estimate based on NASBLA's latest guidance.",
  "Check the NASBLA course-approval page periodically rather than trying to submit a new course right now.",
  "Finalize certificate wording for South Carolina and Ohio so the proof language matches the accepted-course path.",
  "Keep South Carolina and Ohio pricing pages public if you want, but leave payment activation off until approval is in hand.",
  "Use Virginia as the live product reference build and South Carolina / Ohio as the first post-approval boating launches.",
]

const launchTargets = [
  {
    state: "South Carolina",
    route: "/south-carolina-boating",
    disclosureRoute: "/south-carolina-boating/disclosures",
    note: "Strong early NASBLA-friendly launch candidate after the approval gate is cleared.",
  },
  {
    state: "Ohio",
    route: "/ohio-boating",
    disclosureRoute: "/ohio-boating/disclosures",
    note: "Clean early powercraft market, but certificate wording and course approval status need to hold up.",
  },
]

export default async function AdminBoatingReadinessPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    redirect("/")
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Admin
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Boating Readiness</h1>
          <p className="mt-2 max-w-3xl text-slate-600">
            Use this page to keep the boating rollout honest. South Carolina and
            Ohio now have real product surfaces, but they should not be treated
            as live compliance products until the accepted-course gate is cleared.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/boating"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Boating Gateway
          </Link>
          <Link
            href="/virginia-boating"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Virginia Boating
          </Link>
          <Link
            href="/admin/launch-readiness"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Launch Readiness
          </Link>
        </div>
      </div>

      <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-wide text-amber-700">
          Current boating gate
        </div>
        <div className="mt-2 text-2xl font-bold text-slate-900">
          Approval prep only - do not activate South Carolina or Ohio payments yet
        </div>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700">
          Official state rules still support these as strong early boating
          markets, but they depend on an accepted-course approval path. NASBLA&apos;s
          latest direct guidance says the backlog is nearly resolved, new-course
          intake is still paused while a new process is finalized, and reopening
          is estimated in roughly two to three months. The app now has
          launch-state pages, disclosures, pricing, and checkout scaffolding;
          the missing piece is approval status, not product UI.
        </p>
      </section>

      <div className="grid gap-4">
        {readinessItems.map((item) => (
          <section
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
                {item.status}
              </span>
            </div>
            <p className="mt-2 text-sm leading-7 text-slate-700">{item.body}</p>
          </section>
        ))}
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          First boating launch targets
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {launchTargets.map((target) => (
            <article
              key={target.state}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <h3 className="text-xl font-semibold text-slate-900">
                {target.state}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">{target.note}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={target.route}
                  className="inline-flex rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
                >
                  Open state page
                </Link>
                <Link
                  href={target.disclosureRoute}
                  className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Open disclosures
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Immediate next steps</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-700">
          {nextSteps.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        <p className="mt-5 text-sm leading-7 text-slate-600">
          Internal planning doc:{" "}
          <a
            href="C:/Users/ankur/driver-course-platform/docs/boating-approval-path.md"
            className="underline"
          >
            C:/Users/ankur/driver-course-platform/docs/boating-approval-path.md
          </a>
          {" "}and{" "}
          <a
            href="C:/Users/ankur/driver-course-platform/docs/boating-standards-alignment.md"
            className="underline"
          >
            C:/Users/ankur/driver-course-platform/docs/boating-standards-alignment.md
          </a>
        </p>
      </section>
    </div>
  )
}
