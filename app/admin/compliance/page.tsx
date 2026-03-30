import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { getAdminEmails, isAdminEmail } from "@/lib/admin-access"
import DeleteComplianceRecordButton from "@/components/admin/delete-compliance-record-button"
import {
  formatCurrency,
  getComplianceSummary,
  loadComplianceData,
  titleize,
} from "@/lib/admin-compliance"

export const dynamic = "force-dynamic"

export default async function AdminCompliancePage() {
  const authSupabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await authSupabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    redirect("/")
  }

  const { errors, purchases, records } = await loadComplianceData()
  const summary = getComplianceSummary(records, purchases)
  const recentPurchases = purchases.slice(0, 12)
  const emailProvider = String(process.env.EMAIL_PROVIDER ?? "log").trim().toLowerCase()
  const emailConfigured =
    emailProvider === "resend"
      ? Boolean(process.env.EMAIL_FROM && process.env.RESEND_API_KEY)
      : true
  const adminConfigured = getAdminEmails().length > 0

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Admin
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Compliance Dashboard</h1>
          <p className="mt-2 max-w-3xl text-slate-600">
            Monitor paid students, identity readiness, seat-time completion, exam outcomes, certificate issuance, and support load from one internal view.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/api/admin/compliance/export"
            className="inline-flex rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-800"
          >
            Export CSV
          </Link>
          <Link
            href="/admin/support"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Support Inbox
          </Link>
          <Link
            href="/admin/virginia-readiness"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Virginia Readiness
          </Link>
          <Link
            href="/admin/curriculum"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Curriculum Packet
          </Link>
          <Link
            href="/admin/operations"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Operations Guide
          </Link>
          <Link
            href="/admin/reporting"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            DMV Reporting
          </Link>
          <Link
            href="/admin/launch-readiness"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Launch Readiness
          </Link>
          <Link
            href="/admin/qa-checklist"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Hosted QA
          </Link>
          <Link
            href="/"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {errors.length > 0 ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
          Some compliance data could not be loaded from Supabase. Check server logs and row/table availability before relying on this dashboard for operations.
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Paid purchases</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">{summary.paidPurchases}</div>
        </div>
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
          <div className="text-sm text-blue-700">Identity on file</div>
          <div className="mt-2 text-3xl font-bold text-blue-900">{summary.identitiesOnFile}</div>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <div className="text-sm text-amber-700">Seat time complete</div>
          <div className="mt-2 text-3xl font-bold text-amber-900">{summary.seatTimeComplete}</div>
        </div>
        <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
          <div className="text-sm text-green-700">Exam passed</div>
          <div className="mt-2 text-3xl font-bold text-green-900">{summary.examPassed}</div>
        </div>
        <div className="rounded-2xl border border-purple-200 bg-purple-50 p-5 shadow-sm">
          <div className="text-sm text-purple-700">Certificates issued</div>
          <div className="mt-2 text-3xl font-bold text-purple-900">{summary.certificatesIssued}</div>
        </div>
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 shadow-sm">
          <div className="text-sm text-rose-700">Support open</div>
          <div className="mt-2 text-3xl font-bold text-rose-900">{summary.supportOpen}</div>
        </div>
        <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5 shadow-sm">
          <div className="text-sm text-cyan-700">DMV reporting pending</div>
          <div className="mt-2 text-3xl font-bold text-cyan-900">{summary.reportingPending}</div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-slate-900">Student compliance records</h2>
            <div className="text-sm text-slate-500">{records.length} paid student records</div>
          </div>

          {records.length === 0 ? (
            <div className="mt-4 rounded-xl bg-slate-50 p-4 text-slate-600">
              No paid student records found yet.
            </div>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Student</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Purchase</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Identity</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Seat time</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Lessons</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Exam</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Certificate</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Support</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {records.map((record) => (
                    <tr key={record.key} className="align-top">
                      <td className="px-4 py-4">
                        <div className="font-semibold text-slate-900">{record.studentName}</div>
                        <div className="text-slate-600">{record.email}</div>
                        <div className="text-xs uppercase tracking-wide text-slate-400">
                          {record.state} • {record.userId.slice(0, 8)}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-medium text-slate-900">{record.planCode}</div>
                        <div className="text-slate-600">{record.supportTier}</div>
                        <div className="text-slate-500">{record.purchaseStatus}</div>
                        <div className="text-slate-500">{record.purchasedAt}</div>
                      </td>
                      <td className="px-4 py-4 text-slate-700">{record.identityStatus}</td>
                      <td className="px-4 py-4">
                        <div className="font-medium text-slate-900">{record.seatTimeStatus}</div>
                        <div className="text-slate-600">{record.seatTimeHours}</div>
                      </td>
                      <td className="px-4 py-4 text-slate-700">{record.lessonProgress}</td>
                      <td className="px-4 py-4">
                        <div className="font-medium text-slate-900">{record.examStatus}</div>
                        {record.examFailureReason !== "-" ? (
                          <div className="mt-1 text-xs text-red-700">
                            {record.examFailureReason}
                          </div>
                        ) : null}
                        {record.examRetakeAt !== "-" ? (
                          <div className="mt-1 text-xs text-slate-500">
                            Retake eligible: {record.examRetakeAt}
                          </div>
                        ) : null}
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-mono text-xs text-slate-700">{record.certificateId}</div>
                      </td>
                      <td className="px-4 py-4 text-slate-700">{record.supportStatus}</td>
                      <td className="px-4 py-4">
                        <DeleteComplianceRecordButton
                          userId={record.userId}
                          state={record.state.toLowerCase()}
                          studentLabel={record.email !== "-" ? record.email : record.studentName}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">System readiness</h2>
            <div className="mt-4 grid gap-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Admin access</div>
                <div className="mt-1 font-semibold text-slate-900">
                  {adminConfigured ? "Configured" : "Missing ADMIN_EMAILS"}
                </div>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Email provider</div>
                <div className="mt-1 font-semibold text-slate-900">
                  {emailProvider || "log"}
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  {emailConfigured
                    ? "Transactional email mode is ready."
                    : "EMAIL_FROM or RESEND_API_KEY is still missing."}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Recent purchases</h2>
            <div className="mt-4 space-y-4">
              {recentPurchases.length === 0 ? (
                <div className="rounded-xl bg-slate-50 p-4 text-slate-600">
                  No purchases recorded yet.
                </div>
              ) : (
                recentPurchases.map((purchase) => (
                  <div key={purchase.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-semibold text-slate-900">
                        {purchase.stripe_customer_email ?? purchase.user_id}
                      </div>
                      <div className="text-sm font-medium text-slate-700">
                        {formatCurrency(purchase.amount_total, purchase.currency)}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-slate-600">
                      {String(purchase.state_code ?? "").toUpperCase()} • {purchase.plan_code ?? "-"} • {titleize(purchase.support_tier)}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      {purchase.purchased_at ?? purchase.created_at ?? "-"}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Approval prep notes</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
              <li>Use this page to spot missing identity records, incomplete seat time, and unresolved support before students reach certification.</li>
              <li>Export the CSV for Virginia approval prep and internal review packets.</li>
              <li>This dashboard reflects current Supabase records. It does not replace the separate application package, curriculum packet, or DMV paperwork.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
