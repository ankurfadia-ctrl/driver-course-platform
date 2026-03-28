"use client"

import Link from "next/link"

export default function AdminErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">
      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
        Admin error
      </div>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">
        This admin tool hit an error.
      </h1>
      <p className="mt-4 leading-7 text-slate-700">
        Try the action again. If the problem continues, use another admin page
        to confirm whether the issue is isolated or environment-related.
      </p>
      {error?.digest ? (
        <p className="mt-4 text-sm text-slate-500">Reference: {error.digest}</p>
      ) : null}
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Try Again
        </button>
        <Link
          href="/admin/compliance"
          className="rounded-2xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Open Compliance
        </Link>
      </div>
    </div>
  )
}
