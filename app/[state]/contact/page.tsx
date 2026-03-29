import Link from "next/link"
import { getCourseConfig, getSupportRoute } from "@/lib/course-config"

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
          Start with the student support process for course-specific questions,
          account issues, certificate issues, and most general requests.
        </p>
      </section>

      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-900">Support options</h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
          <p>
            The support page provides instant guidance first and captures
            unresolved issues for follow-up review.
          </p>
          <p>
            Logged-in students can submit an issue through the{" "}
            <Link
              href={getSupportRoute(state)}
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
