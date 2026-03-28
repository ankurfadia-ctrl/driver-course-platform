import Link from "next/link"
import { COURSE_CONFIGS } from "@/lib/course-config"

const states = Object.values(COURSE_CONFIGS)

export default function HomePage() {
  return (
    <main className="public-shell min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(144,172,255,0.28),transparent_46%)]" />

      <section className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-7">
            <div className="section-label">Driver Course Platform</div>
            <h1 className="display-balance max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 [font-family:var(--font-display)] sm:text-6xl lg:text-7xl">
              Driver improvement that feels clear, modern, and ready to scale.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-700">
              Launch a student from signup to certificate inside one Virginia-first
              system with checkout, lessons, seat-time controls, exam workflows,
              certificate verification, and support operations already connected.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/virginia"
                className="rounded-full bg-slate-950 px-6 py-3.5 font-semibold text-white shadow-[0_16px_30px_rgba(15,23,42,0.14)] transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Launch Virginia
              </Link>
              <Link
                href="/virginia/login"
                className="rounded-full border border-white/80 bg-white/75 px-6 py-3.5 font-semibold text-slate-800 shadow-[0_12px_24px_rgba(15,23,42,0.05)] transition hover:bg-white"
              >
                Student Login
              </Link>
              <Link
                href="/verify"
                className="rounded-full border border-white/80 bg-white/75 px-6 py-3.5 font-semibold text-slate-800 shadow-[0_12px_24px_rgba(15,23,42,0.05)] transition hover:bg-white"
              >
                Verify Certificate
              </Link>
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Student flow", "Signup, login, checkout, course, exam, certificate"],
                ["Operations", "Support inbox, compliance exports, admin review tools"],
                ["Multistate base", "State routing, disclosures, shared course architecture"],
                ["Launch ready", "Production deployment, health checks, verification pages"],
              ].map(([title, body]) => (
                <div
                  key={title}
                  className="rounded-[1.5rem] border border-white/70 bg-white/70 p-5"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8d6d2b]">
                    {title}
                  </div>
                  <div className="mt-3 text-base font-semibold text-slate-950">
                    {body}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[1.5rem] bg-[linear-gradient(135deg,#1c2a4d_0%,#304f8c_100%)] p-6 text-white shadow-[0_20px_36px_rgba(28,42,77,0.22)]">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-100/90">
                Virginia First
              </div>
              <div className="mt-3 text-2xl font-semibold [font-family:var(--font-display)]">
                Approval-safe public experience, provider-ready internal tooling.
              </div>
              <p className="mt-3 max-w-md text-sm leading-7 text-blue-50/90">
                The site keeps neutral public language now while preserving the
                operational structure you&apos;ll need as approval work moves forward.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="glass-panel rounded-[2rem] p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Full Course Lifecycle
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
                  className="rounded-[1.5rem] border border-white/70 bg-white/72 p-5 text-sm font-medium leading-6 text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Active States
            </div>
            <div className="mt-6 space-y-4">
              {states.map((config) => (
                <Link
                  key={config.stateSlug}
                  href={`/${config.stateSlug}`}
                  className="block rounded-[1.5rem] border border-white/75 bg-white/76 p-5 shadow-[0_10px_24px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xl font-semibold text-slate-950">
                        {config.stateName}
                      </div>
                      <div className="mt-1 text-sm leading-6 text-slate-600">
                        {config.marketingDescription}
                      </div>
                    </div>
                    <div className="rounded-full bg-[#eef3ff] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#3054a5]">
                      Live
                    </div>
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
