"use client"

export default function RootErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_55%,#f8fafc_100%)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-red-200 bg-white p-10 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
          Something went wrong
        </div>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
          We hit an unexpected error.
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Please try again. If the issue continues, contact support and include
          the time the problem happened.
        </p>
        {error?.digest ? (
          <p className="mt-4 text-sm text-slate-500">Reference: {error.digest}</p>
        ) : null}
        <div className="mt-8">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    </main>
  )
}
