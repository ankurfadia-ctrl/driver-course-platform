import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/admin-access"
import { getDmvReportingQueue, loadComplianceData } from "@/lib/admin-compliance"

export const dynamic = "force-dynamic"

export default async function AdminReportingPage() {
  const authSupabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await authSupabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    redirect("/")
  }

  const { records } = await loadComplianceData()
  const queue = getDmvReportingQueue(records)

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Admin
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            DMV Reporting Queue
          </h1>
          <p className="mt-2 max-w-3xl text-slate-600">
            Review course completions that are ready for Virginia DMV reporting.
            Court-related students show their court details here so the reporting
            workflow can be matched before completion credit is submitted.
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
            href="/api/admin/compliance/export"
            className="inline-flex rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-800"
          >
            Export CSV
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Queue size</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">
            {queue.length}
          </div>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <div className="text-sm text-amber-700">Ready to report</div>
          <div className="mt-2 text-3xl font-bold text-amber-900">
            {queue.filter((record) => record.dmvReportStatus === "Ready to report").length}
          </div>
        </div>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 shadow-sm">
          <div className="text-sm text-red-700">Missing court document</div>
          <div className="mt-2 text-3xl font-bold text-red-900">
            {queue.filter((record) => record.dmvReportStatus === "Missing court document").length}
          </div>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
          <div className="text-sm text-emerald-700">Reported to DMV</div>
          <div className="mt-2 text-3xl font-bold text-emerald-900">
            {queue.filter((record) => record.dmvReportStatus === "Reported to DMV").length}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-slate-900">
            Completion reporting queue
          </h2>
          <div className="text-sm text-slate-500">
            {queue.length} completion records
          </div>
        </div>

        {queue.length === 0 ? (
          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-slate-600">
            No completion records are waiting for DMV reporting right now.
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Student</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Reason</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Court info</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Completion</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Certificate</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Reporting</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-600">Reported at</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {queue.map((record) => (
                  <tr key={record.key} className="align-top">
                    <td className="px-4 py-4">
                      <div className="font-semibold text-slate-900">{record.studentName}</div>
                      <div className="text-slate-600">{record.email}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-slate-900">{record.reasonForAttending}</div>
                      <div className="text-slate-500">{record.accuracyStatus}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-slate-900">{record.courtName}</div>
                      <div className="text-slate-500">{record.caseOrTicketNumber}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-slate-900">{record.examStatus}</div>
                      <div className="text-slate-500">{record.completedAt}</div>
                    </td>
                    <td className="px-4 py-4 font-mono text-xs text-slate-700">
                      {record.certificateId}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          record.dmvReportStatus === "Missing court document"
                            ? "bg-red-100 text-red-700"
                            : record.dmvReportStatus === "Ready to report"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {record.dmvReportStatus}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{record.reportedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
