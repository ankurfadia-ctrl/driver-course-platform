import { getCourseConfig } from "@/lib/course-config"

export default async function StatePrivacyPage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state } = await params
  const config = getCourseConfig(state)

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
          Privacy
        </div>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          {config.stateName} course privacy notice
        </h1>
        <p className="mt-4 leading-7 text-slate-700">
          This page explains the types of student information used by{" "}
          {config.brandName} to operate course enrollment, identity
          verification, seat-time tracking, final exam controls, certificate
          delivery, and support workflows.
        </p>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Information used by the platform
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
          <p>
            The platform may use account information, purchase details, identity
            profile information, course progress, seat-time activity, exam
            results, certificate records, and support submissions to operate the
            course and respond to student issues.
          </p>
          <p>
            Identity-related information may include legal name, date of birth,
            driver license number, and security-question answers submitted by
            the student for course controls.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Why information is used
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
          <p>
            Student information is used to authenticate access, process
            purchases, verify identity, enforce course controls, issue
            certificates, provide support, and maintain operational records.
          </p>
          <p>
            Information may also be reviewed internally for compliance,
            troubleshooting, fraud prevention, and course administration.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Questions about privacy
        </h2>
        <p className="mt-4 text-sm leading-7 text-slate-700">
          If you need help with account or record questions, contact{" "}
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
