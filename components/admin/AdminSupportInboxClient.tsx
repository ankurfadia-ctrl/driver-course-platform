"use client"

import { useMemo, useState } from "react"
import Link from "next/link"

export type SupportRequestRow = {
  id: string
  state_code: string
  category: string
  subject: string
  message: string
  ai_summary: string | null
  ai_suggested_steps: string[] | null
  escalation_recommended: boolean
  escalation_reason: string | null
  priority_requested: boolean
  status: string
  created_at: string
}

type SupportFilter = "all" | "needs-review" | "auto-resolved" | "priority"

function formatDateTime(value: string) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

function titleize(value: string) {
  return String(value ?? "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export default function AdminSupportInboxClient({
  initialRequests,
}: {
  initialRequests: SupportRequestRow[]
}) {
  const [error, setError] = useState<string | null>(null)
  const [requests, setRequests] = useState<SupportRequestRow[]>(initialRequests)
  const [filter, setFilter] = useState<SupportFilter>("needs-review")
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  async function updateStatus(id: string, newStatus: string) {
    try {
      setUpdatingId(id)
      setError(null)

      const response = await fetch("/api/admin/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: newStatus }),
      })

      const data = (await response.json()) as { ok?: boolean; error?: string }

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Could not update support request status.")
      }

      setRequests((prev) =>
        prev.map((request) =>
          request.id === id ? { ...request, status: newStatus } : request
        )
      )
    } catch (err) {
      console.error(err)
      setError("Could not update support request status.")
    } finally {
      setUpdatingId(null)
    }
  }

  const filteredRequests = useMemo(() => {
    if (filter === "all") {
      return requests
    }

    if (filter === "needs-review") {
      return requests.filter((request) => request.escalation_recommended)
    }

    if (filter === "priority") {
      return requests.filter((request) => request.priority_requested)
    }

    return requests.filter((request) => !request.escalation_recommended)
  }, [requests, filter])

  const counts = useMemo(() => {
    const all = requests.length
    const needsReview = requests.filter((request) => request.escalation_recommended).length
    const autoResolved = requests.filter((request) => !request.escalation_recommended).length
    const resolved = requests.filter((request) => request.status === "resolved").length
    const open = requests.filter((request) => request.status !== "resolved").length
    const priority = requests.filter((request) => request.priority_requested).length

    return {
      all,
      needsReview,
      autoResolved,
      resolved,
      open,
      priority,
    }
  }, [requests])

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Admin
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Support Inbox</h1>
          <p className="mt-2 text-slate-600">
            Review escalated student issues without digging through every common question.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/api/admin/support/export"
            className="inline-flex rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white transition hover:bg-slate-800"
          >
            Export CSV
          </Link>
          <Link
            href="/admin/compliance"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Compliance Dashboard
          </Link>

          <Link
            href="/"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Back to Home
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">All requests</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">{counts.all}</div>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <div className="text-sm text-amber-700">Needs review</div>
          <div className="mt-2 text-3xl font-bold text-amber-900">
            {counts.needsReview}
          </div>
        </div>

        <div className="rounded-2xl border border-purple-200 bg-purple-50 p-5 shadow-sm">
          <div className="text-sm text-purple-700">Priority</div>
          <div className="mt-2 text-3xl font-bold text-purple-900">
            {counts.priority}
          </div>
        </div>

        <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
          <div className="text-sm text-green-700">Auto-resolved candidates</div>
          <div className="mt-2 text-3xl font-bold text-green-900">
            {counts.autoResolved}
          </div>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
          <div className="text-sm text-blue-700">Open</div>
          <div className="mt-2 text-3xl font-bold text-blue-900">{counts.open}</div>
        </div>

        <div className="rounded-2xl border border-slate-300 bg-slate-50 p-5 shadow-sm">
          <div className="text-sm text-slate-700">Resolved</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">{counts.resolved}</div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setFilter("needs-review")}
            className={`rounded-lg px-4 py-2 font-semibold transition ${
              filter === "needs-review"
                ? "bg-amber-600 text-white"
                : "border border-slate-300 text-slate-700 hover:bg-slate-50"
            }`}
          >
            Needs Review ({counts.needsReview})
          </button>

          <button
            type="button"
            onClick={() => setFilter("priority")}
            className={`rounded-lg px-4 py-2 font-semibold transition ${
              filter === "priority"
                ? "bg-purple-600 text-white"
                : "border border-slate-300 text-slate-700 hover:bg-slate-50"
            }`}
          >
            Priority ({counts.priority})
          </button>

          <button
            type="button"
            onClick={() => setFilter("auto-resolved")}
            className={`rounded-lg px-4 py-2 font-semibold transition ${
              filter === "auto-resolved"
                ? "bg-green-600 text-white"
                : "border border-slate-300 text-slate-700 hover:bg-slate-50"
            }`}
          >
            Auto-Resolved ({counts.autoResolved})
          </button>

          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`rounded-lg px-4 py-2 font-semibold transition ${
              filter === "all"
                ? "bg-slate-900 text-white"
                : "border border-slate-300 text-slate-700 hover:bg-slate-50"
            }`}
          >
            All ({counts.all})
          </button>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm text-red-700">
          {error}
        </div>
      ) : null}

      {filteredRequests.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          No support requests found for this filter.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request) => {
            const isResolved = request.status === "resolved"
            const isUpdating = updatingId === request.id

            return (
              <div
                key={request.id}
                className={`rounded-2xl border bg-white p-6 shadow-sm ${
                  request.priority_requested
                    ? "border-purple-300"
                    : "border-slate-200"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {String(request.state_code ?? "").toUpperCase()}
                      </span>

                      <span className="rounded-lg bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                        {titleize(request.category)}
                      </span>

                      {request.priority_requested ? (
                        <span className="rounded-lg bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-800">
                          Priority Requested
                        </span>
                      ) : null}

                      <span
                        className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                          request.escalation_recommended
                            ? "bg-amber-100 text-amber-800"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {request.escalation_recommended ? "Needs Review" : "Auto-Resolved"}
                      </span>

                      <span
                        className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                          isResolved
                            ? "bg-slate-200 text-slate-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {titleize(request.status)}
                      </span>
                    </div>

                    <h2 className="text-xl font-semibold text-slate-900">
                      {request.subject || "No subject"}
                    </h2>

                    <div className="text-sm text-slate-500">
                      Submitted {formatDateTime(request.created_at)}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={isUpdating || !isResolved}
                      onClick={() => updateStatus(request.id, "open")}
                      className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                        isResolved
                          ? "border border-slate-300 text-slate-700 hover:bg-slate-50"
                          : "cursor-not-allowed border border-slate-200 text-slate-400"
                      }`}
                    >
                      {isUpdating && isResolved ? "Updating..." : "Mark Open"}
                    </button>

                    <button
                      type="button"
                      disabled={isUpdating || isResolved}
                      onClick={() => updateStatus(request.id, "resolved")}
                      className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                        !isResolved
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "cursor-not-allowed bg-slate-300 text-white"
                      }`}
                    >
                      {isUpdating && !isResolved ? "Updating..." : "Mark Resolved"}
                    </button>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-sm font-semibold text-slate-700">
                      Student message
                    </div>
                    <div className="mt-2 whitespace-pre-wrap text-sm text-slate-900">
                      {request.message}
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-sm font-semibold text-slate-700">
                      AI summary
                    </div>
                    <div className="mt-2 text-sm text-slate-900">
                      {request.ai_summary || "No AI summary available."}
                    </div>

                    {Array.isArray(request.ai_suggested_steps) &&
                    request.ai_suggested_steps.length > 0 ? (
                      <div className="mt-4">
                        <div className="text-sm font-semibold text-slate-700">
                          Suggested steps
                        </div>
                        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-900">
                          {request.ai_suggested_steps.map((step) => (
                            <li key={step}>{step}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {request.escalation_reason ? (
                      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                        <span className="font-semibold">Escalation reason:</span>{" "}
                        {request.escalation_reason}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
