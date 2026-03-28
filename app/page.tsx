import Link from "next/link"
import { COURSE_CONFIGS } from "@/lib/course-config"

const states = Object.values(COURSE_CONFIGS)

export default function HomePage() {
  return (
    <main className="public-shell min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div className="space-y-6">
            <div className="section-label">Driver Course Platform</div>
            <h1 className="display-balance max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              A modern online driver improvement platform built to scale state by state.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              Students can sign up, purchase access, complete lessons, satisfy seat
              time, pass the final exam, receive a certificate, and verify completion
              inside one multistate-ready system.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/virginia"
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Launch Virginia
              </Link>
              <Link
                href="/virginia/login"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Student Login
              </Link>
              <Link
                href="/verify"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Verify Certificate
              </Link>
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] border-[#dbe7ff] bg-white">
            <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
              {[
                ["Student flow", "Signup, login, checkout, course, exam, certificate"],
                ["Operations", "Support inbox, compliance exports, admin review tools"],
                ["Multistate base", "State routing, disclosures, shared course architecture"],
                ["Launch ready", "Production deployment, health checks, verification pages"],
              ].map(([title, body]) => (
                <div
                  key={title}
                  className="rounded-3xl border border-[#e5edff] bg-[#f8fbff] p-5"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                    {title}
                  </div>
                  <div className="mt-3 text-base font-semibold text-slate-950">
                    {body}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="glass-panel rounded-[2rem] bg-white p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Built for the full course lifecycle
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "Student signup and login",
                "Protected Stripe checkout",
                "Seat-time tracking and lesson progression",
                "Timed final exam and attempt controls",
                "Certificate generation and verification",
                "Student support and admin workflows",
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

          <div className="glass-panel rounded-[2rem] bg-white p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Active states
            </div>
            <div className="mt-6 space-y-4">
              {states.map((config) => (
                <Link
                  key={config.stateSlug}
                  href={`/${config.stateSlug}`}
                  className="block rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-white"
                >
                  <div className="text-xl font-semibold text-slate-950">
                    {config.stateName}
                  </div>
                  <div className="mt-1 text-sm leading-6 text-slate-600">
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
