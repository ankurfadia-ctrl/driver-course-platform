import Link from "next/link"
import { COURSE_CONFIGS } from "@/lib/course-config"

const states = Object.values(COURSE_CONFIGS)

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f2f7ff_0%,#ffffff_48%,#f7fafc_100%)]">
      <section className="mx-auto flex max-w-6xl flex-col gap-14 px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            Driver Course Platform
          </div>
          <h1 className="max-w-4xl text-5xl font-black tracking-tight text-slate-950 sm:text-6xl">
            A Virginia-first online driver improvement platform built to expand state by state.
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-600">
            Students can sign up, purchase access, complete lessons, satisfy seat
            time, pass the final exam, receive a certificate, and submit support
            requests from one multistate-ready system.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/virginia"
              className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Launch Virginia
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

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Built for the full course lifecycle
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "Student signup and login",
                "Protected Stripe checkout",
                "Seat-time tracking",
                "Timed final exam",
                "Certificate generation and verification",
                "Student and admin support workflows",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-medium text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-blue-200 bg-[linear-gradient(180deg,#eff6ff_0%,#dbeafe_100%)] p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
              Active states
            </div>
            <div className="mt-6 space-y-4">
              {states.map((config) => (
                <Link
                  key={config.stateSlug}
                  href={`/${config.stateSlug}`}
                  className="block rounded-2xl border border-white/70 bg-white/80 p-5 transition hover:bg-white"
                >
                  <div className="text-xl font-bold text-slate-900">
                    {config.stateName}
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    {config.marketingDescription}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
