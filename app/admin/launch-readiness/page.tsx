import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { getAdminEmails, isAdminEmail } from "@/lib/admin-access"
import { getRuntimeLaunchSummary } from "@/lib/runtime-config"

export const dynamic = "force-dynamic"

function getReadinessItems() {
  const adminEmails = getAdminEmails()
  const emailProvider = String(process.env.EMAIL_PROVIDER ?? "log").trim().toLowerCase()
  const runtimeSummary = getRuntimeLaunchSummary()
  const liveEmailReady = runtimeSummary.checks.find(
    (check) => check.label === "Transactional email"
  )?.ready ?? false

  return [
    {
      title: "Production environment configuration",
      ready: runtimeSummary.launchConfigReady,
      detail:
        runtimeSummary.launchConfigReady
          ? "Runtime configuration looks launch-ready."
          : "One or more runtime deployment settings still need attention below.",
    },
    {
      title: "Admin operations access",
      ready: adminEmails.length > 0,
      detail:
        adminEmails.length > 0
          ? `Configured for ${adminEmails.length} admin account(s).`
          : "ADMIN_EMAILS is still empty, so protected admin workflows are not fully deploy-ready.",
    },
    {
      title: "Transactional email delivery",
      ready: liveEmailReady,
      detail:
        liveEmailReady
          ? `Email provider "${emailProvider}" is configured for live sending.`
          : "Purchase and completion email plumbing exists, but live delivery is not fully enabled yet.",
    },
    {
      title: "Public student disclosures",
      ready: true,
      detail:
        "Virginia disclosures and neutral approval-safe language are already in place. Keep this wording neutral until approval is granted.",
    },
    {
      title: "Approval-prep internal tooling",
      ready: true,
      detail:
        "Compliance dashboard, curriculum packet, operations guide, exports, and verification tools are in place.",
    },
    {
      title: "Final pre-launch QA",
      ready: false,
      detail:
        "Run a full production smoke test on the hosted deployment: signup, checkout, lesson access, identity setup, final exam, certificate, support, admin access, and email delivery.",
    },
  ]
}

const releaseChecklist = [
  "Connect the production domain and set NEXT_PUBLIC_BASE_URL to the live HTTPS URL.",
  "Add live Supabase and Stripe production secrets in the host environment.",
  "Set ADMIN_EMAILS for real admin accounts.",
  "Turn on live email delivery and test purchase/completion emails.",
  "Run end-to-end QA on the hosted environment with a real purchase flow and admin review.",
]

export default async function AdminLaunchReadinessPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    redirect("/")
  }

  const readinessItems = getReadinessItems()
  const readyCount = readinessItems.filter((item) => item.ready).length
  const runtimeSummary = getRuntimeLaunchSummary()

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Admin
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Launch Readiness</h1>
          <p className="mt-2 max-w-3xl text-slate-600">
            Use this page to track what is still left between the current build
            and a safe public launch.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/compliance"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Compliance Dashboard
          </Link>
          <Link
            href="/admin/qa-checklist"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Hosted QA Checklist
          </Link>
          <Link
            href="/admin/virginia-readiness"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Virginia Readiness
          </Link>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-sm text-slate-500">Go-live progress</div>
        <div className="mt-2 text-4xl font-bold text-slate-900">
          {readyCount}/{readinessItems.length}
        </div>
        <p className="mt-2 text-sm text-slate-600">
          The app is close, but final hosting configuration, live email, and
          production QA still need to be completed before public launch.
        </p>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-slate-900">
            Runtime deployment checks
          </h2>
          <div className="text-sm text-slate-500">
            {runtimeSummary.readyCount}/{runtimeSummary.totalCount} configured
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {runtimeSummary.checks.map((check) => (
            <div
              key={check.label}
              className={`rounded-2xl border p-4 ${
                check.ready
                  ? "border-green-200 bg-green-50"
                  : "border-amber-200 bg-amber-50"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="font-semibold text-slate-900">{check.label}</div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                    check.ready
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {check.ready ? "Ready" : "Check"}
                </span>
              </div>
              <p className="mt-2 text-sm leading-7 text-slate-700">
                {check.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-4">
        {readinessItems.map((item) => (
          <section
            key={item.title}
            className={`rounded-2xl border p-5 shadow-sm ${
              item.ready
                ? "border-green-200 bg-green-50"
                : "border-amber-200 bg-amber-50"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                  item.ready
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {item.ready ? "Ready" : "Remaining"}
              </span>
            </div>
            <p className="mt-2 text-sm leading-7 text-slate-700">{item.detail}</p>
          </section>
        ))}
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Recommended final steps
        </h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-700">
          {releaseChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>
    </div>
  )
}
