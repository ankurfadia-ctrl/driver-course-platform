import Link from "next/link"

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_55%,#f8fafc_100%)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Page Not Found
        </div>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Try returning to the Virginia course home, student login, or
          certificate verification page.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/virginia"
            className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Go to Virginia Home
          </Link>
          <Link
            href="/virginia/login"
            className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Student Login
          </Link>
          <Link
            href="/verify"
            className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Verify Certificate
          </Link>
        </div>
      </div>
    </main>
  )
}
