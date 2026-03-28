import Link from "next/link"
import { getCourseConfig } from "@/lib/course-config"

export default async function StateContactPage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state } = await params
  const config = getCourseConfig(state)

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          Contact
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          Contact {config.brandName}
        </h1>
        <p className="mt-4 leading-7 text-slate-700">
          Use the student support process for course-specific issues, or use the
          contact information below for general questions.
        </p>
      </section>

      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-900">Support options</h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
          <p>
            Student support email:{" "}
            <a
              href={`mailto:${config.supportEmail}`}
              className="font-medium text-slate-900 underline"
            >
              {config.supportEmail}
            </a>
          </p>
          <p>
            Logged-in students may also submit an issue through the{" "}
            <Link
              href={`/${state}/support`}
              className="font-medium text-slate-900 underline"
            >
              support page
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
