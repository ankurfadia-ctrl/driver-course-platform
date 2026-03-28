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
    <div className="space-y-10">
      <section className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_42%,#f8fafc_100%)] p-8 shadow-sm sm:p-10">
        <div className="max-w-4xl space-y-5">
          <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            {config.stateName} Online Course
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            {config.marketingHeadline}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-600">
            {config.marketingDescription}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${state}/checkout`}
              className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              View Plans
            </Link>
            <Link
              href={`/${state}/login`}
              className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Student Login
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Step 1
          </div>
          <h2 className="mt-3 text-xl font-bold text-slate-900">
            Choose your plan
          </h2>
          <p className="mt-2 text-slate-600">
            Start with standard access or add priority support for faster routing.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Step 2
          </div>
          <h2 className="mt-3 text-xl font-bold text-slate-900">
            Complete the course
          </h2>
          <p className="mt-2 text-slate-600">
            Work through lessons, meet the seat-time requirement, and take the final exam.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Step 3
          </div>
          <h2 className="mt-3 text-xl font-bold text-slate-900">
            Get your certificate
          </h2>
          <p className="mt-2 text-slate-600">
            Print, download, and verify course completion once requirements are met.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
              {config.approvalStatusLabel}
            </div>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              Review {config.stateName} disclosures before enrolling
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              Students should confirm court, DMV, employer, or insurance acceptance before purchasing the course. Identity verification, seat-time controls, and final exam rules may apply.
            </p>
          </div>
          <Link
            href={getDisclosuresRoute(state)}
            className="rounded-2xl border border-amber-300 bg-white px-5 py-3 font-semibold text-amber-900 transition hover:bg-amber-100"
          >
            Read Disclosures
          </Link>
        </div>
      </section>
    </div>
  )
}
