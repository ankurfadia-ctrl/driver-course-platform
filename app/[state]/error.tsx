"use client"

import Link from "next/link"

export default function StateErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
          Page error
        </div>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          This page couldn&apos;t finish loading.
        </h1>
        <p className="mt-4 leading-7 text-slate-700">
          Try again first. If the issue continues, return to the dashboard or
          contact support.
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
            href="/virginia/dashboard"
            className="rounded-2xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
