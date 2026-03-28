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
      <section className="glass-panel rounded-[2rem] border-[#dbe7ff] bg-white p-8 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div className="max-w-4xl space-y-5">
            <div className="section-label">{config.stateName} Online Course</div>
            <h1 className="display-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {config.marketingHeadline}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              Complete lessons online, satisfy the required seat time, take the
              final exam, and unlock your completion certificate once course
              requirements are met.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${state}/checkout`}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                View Plans
              </Link>
              <Link
                href={`/${state}/login`}
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Student Login
              </Link>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-[#e5edff] bg-[#f8fbff] p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
              Virginia course expectations
            </div>
            <div className="mt-5 space-y-3">
              {[
                "8-hour online course with required seat-time tracking",
                "Identity verification may be required during course milestones and before or during the final exam",
                "Final exam attempts may be limited to one attempt per business day",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[#dbe7ff] bg-white p-4 text-sm font-medium text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          ["Step 1", "Enroll and create your account", "Purchase course access and log in with your student account before beginning coursework."],
          ["Step 2", "Complete the required course time", "Work through the online lessons, remain active in the course, and satisfy the full time requirement."],
          ["Step 3", "Pass the final exam and receive your certificate", "After you meet the course requirements and pass the exam, you can access your completion certificate."],
        ].map(([step, title, body]) => (
          <div key={step} className="glass-panel rounded-[1.75rem] bg-white p-6">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {step}
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">{title}</h2>
            <p className="mt-3 leading-7 text-slate-600">{body}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-7 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
              {config.approvalStatusLabel}
            </div>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">
              Review Virginia disclosures before enrolling
            </h2>
            <p className="mt-4 leading-7 text-slate-700">
              Students are responsible for confirming whether an online Virginia
              driver improvement course is acceptable for their specific court,
              employer, insurance, or DMV requirement before purchasing. Identity
              verification, seat-time controls, and final exam rules may apply.
            </p>
          </div>
          <Link
            href={getDisclosuresRoute(state)}
            className="rounded-xl border border-amber-300 bg-white px-5 py-3 font-semibold text-amber-900 transition hover:bg-amber-100"
          >
            Read Disclosures
          </Link>
        </div>
      </section>
    </div>
  )
}
