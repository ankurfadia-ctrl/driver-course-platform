import Link from "next/link"
import { getCourseConfig, getDisclosuresRoute } from "@/lib/course-config"

export default async function StateDisclosuresPage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state } = await params
  const config = getCourseConfig(state)

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="space-y-4">
          <div className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
            {config.approvalStatusLabel}
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-950">
            {config.stateName} Course Disclosures
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-600">
            {config.disclosuresIntro}
          </p>
        </div>
      </section>

      <section className="grid gap-5">
        {config.disclosures.map((item) => (
          <article
            key={item.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold text-slate-900">{item.title}</h2>
            <p className="mt-3 leading-7 text-slate-600">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-xl font-bold text-slate-900">Next steps for students</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={`/${state}/checkout`}
            className="rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            View Course Plans
          </Link>
          <Link
            href={`/${state}/login`}
            className="rounded-2xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Student Login
          </Link>
          <Link
            href={`/${state}`}
            className="rounded-2xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Back to {config.stateName}
          </Link>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          Direct link: {getDisclosuresRoute(state)}
        </p>
      </section>
    </div>
  )
}
