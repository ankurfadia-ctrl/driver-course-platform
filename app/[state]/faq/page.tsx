import Link from "next/link"
import {
  getCourseConfig,
  getDisclosuresRoute,
  getSupportRoute,
} from "@/lib/course-config"

export default async function StateFaqPage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state } = await params
  const config = getCourseConfig(state)

  const faqs = [
    {
      question: "Is this course approved?",
      answer:
        "Approval and acceptance depend on the state and the student's specific requirement. Review the disclosures carefully and confirm acceptance before purchasing or relying on completion.",
    },
    {
      question: "What do I need before I can finish the course?",
      answer:
        "Students generally need course access, required seat time, identity verification, and a passing final exam result before a certificate becomes available.",
    },
    {
      question: "Can I take the final exam right away?",
      answer:
        "Not usually. The course flow may require seat-time completion and identity verification before the final exam can be started.",
    },
    {
      question: "How do I get my certificate?",
      answer:
        "Once course requirements are complete and the final exam is passed, the certificate page unlocks so the student can view, download, print, and verify the certificate.",
    },
    {
      question: "What if I have an issue with payment, access, or my certificate?",
      answer:
        "Use the support page after signing in for help with payment, access, certificate, or course-related issues.",
    },
  ]

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          FAQ
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          {config.stateName} course questions and answers
        </h1>
        <p className="mt-4 leading-7 text-slate-700">
          This page provides general answers to common student questions before
          enrollment, during the course, and after completion.
        </p>
      </section>

      <section className="space-y-4">
        {faqs.map((item) => (
          <article
            key={item.question}
            className="glass-panel rounded-[1.75rem] bg-white p-6"
          >
            <h2 className="text-xl font-semibold text-slate-900">
              {item.question}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">{item.answer}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Need more information?
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          Review the course information page or start with the support page if
          you need help deciding whether this course is appropriate for your
          situation.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={getDisclosuresRoute(state)}
            className="rounded-xl border border-amber-300 bg-white px-5 py-3 font-semibold text-amber-900 transition hover:bg-amber-100"
          >
            Read Course Information
          </Link>
          <Link
            href={getSupportRoute(state)}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Open Support
          </Link>
        </div>
      </section>
    </div>
  )
}
