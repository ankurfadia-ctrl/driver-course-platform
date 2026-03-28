import { getCourseConfig } from "@/lib/course-config"

export default async function StateTermsPage({
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
          Terms
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          {config.stateName} course terms
        </h1>
        <p className="mt-4 leading-7 text-slate-700">
          These terms describe general student responsibilities and course-use
          expectations for the {config.brandName} online course experience.
        </p>
      </section>

      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-900">
          Student responsibilities
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
          <p>
            Students are responsible for providing accurate account and identity
            information, keeping login access secure, and completing the course
            personally.
          </p>
          <p>
            Students should confirm whether the course is acceptable for their
            court, DMV, employer, insurance, or other requirement before
            purchasing or relying on completion.
          </p>
        </div>
      </section>

      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-900">
          Course controls
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
          <p>
            The course may use seat-time tracking, identity verification,
            activity monitoring, and exam controls before completion or
            certificate access is granted.
          </p>
          <p>
            Failure to complete required course steps, identity checks, or exam
            requirements may prevent completion.
          </p>
        </div>
      </section>

      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <h2 className="text-xl font-semibold text-slate-900">
          Support
        </h2>
        <p className="mt-4 text-sm leading-7 text-slate-700">
          For account, course, or certificate issues, contact{" "}
          <a
            href={`mailto:${config.supportEmail}`}
            className="font-medium text-slate-900 underline"
          >
            {config.supportEmail}
          </a>
          .
        </p>
      </section>
    </div>
  )
}
