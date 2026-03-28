import Link from "next/link"
import { getCourseConfig, getDisclosuresRoute } from "@/lib/course-config"

export default async function StateHomePage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state } = await params
  const config = getCourseConfig(state)

  return (
    <div className="space-y-8">
      <section className="glass-panel overflow-hidden rounded-[2.25rem] p-8 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="max-w-4xl space-y-6">
            <div className="section-label">{config.stateName} Online Course</div>
            <h1 className="display-balance text-4xl font-semibold tracking-tight text-slate-950 [font-family:var(--font-display)] sm:text-5xl lg:text-6xl">
              {config.marketingHeadline}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-700">
              {config.marketingDescription}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${state}/checkout`}
                className="rounded-full bg-slate-950 px-6 py-3.5 font-semibold text-white shadow-[0_16px_30px_rgba(15,23,42,0.14)] transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                View Plans
              </Link>
              <Link
                href={`/${state}/login`}
                className="rounded-full border border-white/80 bg-white/80 px-6 py-3.5 font-semibold text-slate-800 shadow-[0_12px_24px_rgba(15,23,42,0.05)] transition hover:bg-white"
              >
                Student Login
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] bg-[linear-gradient(145deg,#203255_0%,#335899_100%)] p-6 text-white shadow-[0_24px_45px_rgba(28,42,77,0.24)] sm:p-7">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-100/90">
              Student Journey
            </div>
            <div className="mt-4 grid gap-4">
              {[
                ["1", "Choose a plan and create your account."],
                ["2", "Complete lessons and satisfy required seat time."],
                ["3", "Pass the final exam and unlock your certificate."],
              ].map(([step, body]) => (
                <div
                  key={step}
                  className="rounded-[1.4rem] border border-white/12 bg-white/8 p-4"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-100/80">
                    Step {step}
                  </div>
                  <div className="mt-2 text-base font-semibold leading-7 text-white">
                    {body}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <div className="glass-panel rounded-[1.75rem] p-6">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Step 1
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">
            Choose your plan
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            Start with standard access or add priority support for faster routing.
          </p>
        </div>

        <div className="glass-panel rounded-[1.75rem] p-6">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Step 2
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">
            Complete the course
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            Work through lessons, meet the seat-time requirement, and take the final exam.
          </p>
        </div>

        <div className="glass-panel rounded-[1.75rem] p-6">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Step 3
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">
            Get your certificate
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            Print, download, and verify course completion once requirements are met.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-panel rounded-[2rem] p-7">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Why students choose it
          </div>
          <div className="mt-5 grid gap-4">
            {[
              "Self-paced online access",
              "Structured lesson progression",
              "Seat-time and exam controls",
              "Certificate verification after completion",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[1.25rem] border border-white/70 bg-white/72 p-4 text-sm font-medium text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <section className="rounded-[2rem] border border-[rgba(166,117,63,0.18)] bg-[linear-gradient(180deg,rgba(255,248,236,0.9)_0%,rgba(255,241,214,0.75)_100%)] p-7 shadow-[0_18px_38px_rgba(138,98,36,0.08)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8d6d2b]">
                {config.approvalStatusLabel}
              </div>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950 [font-family:var(--font-display)]">
                Review {config.stateName} disclosures before enrolling
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                Students should confirm court, DMV, employer, or insurance acceptance before purchasing the course. Identity verification, seat-time controls, and final exam rules may apply.
              </p>
            </div>
            <Link
              href={getDisclosuresRoute(state)}
              className="rounded-full border border-[rgba(166,117,63,0.24)] bg-white/80 px-5 py-3 font-semibold text-[#6f5216] transition hover:bg-white"
            >
              Read Disclosures
            </Link>
          </div>
        </section>
      </section>
    </div>
  )
}
