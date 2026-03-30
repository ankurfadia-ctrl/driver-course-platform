import Link from "next/link"
import { redirect } from "next/navigation"
import PrintPacketButton from "@/components/admin/print-packet-button"
import { isAdminEmail } from "@/lib/admin-access"
import { VIRGINIA_FINAL_EXAM_QUESTION_BANK } from "@/lib/final-exam"
import { IDENTITY_VERIFICATION_QUESTIONS } from "@/lib/identity-verification"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import {
  VIRGINIA_LESSON_CHECKS,
  VIRGINIA_LESSON_CONTENT,
  VIRGINIA_LESSONS,
} from "@/lib/virginia-course-curriculum"

export const dynamic = "force-dynamic"

const identityWorkflow = [
  "The student creates an identity profile that includes legal first name, legal last name, date of birth, driver's license number, and two custom security questions with answers.",
  "The identity profile is stored for that student and that state.",
  "The student must complete identity setup before beginning lesson progress.",
  "Before each lesson begins, the student must answer the stored identity questions correctly.",
  "Before the final exam begins, the student must complete identity verification again.",
  "If the student enters incorrect identity answers, the lesson or final exam stays blocked until the stored identity answers are updated and verified.",
]

const reportingWorkflow = [
  "After successful completion, the course record appears in the DMV reporting queue.",
  "The reporting queue marks each record as ready to report, missing court document, or reported to DMV.",
  "Court-related attendance records require the related court information before safe-driving points can be awarded.",
  "Virginia completion reporting is handled within the required 24-hour reporting window.",
]

export default async function ApprovalPacketReviewerPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    redirect("/")
  }

  const totalLessonChecks = Object.values(VIRGINIA_LESSON_CHECKS).reduce(
    (sum, questions) => sum + questions.length,
    0
  )

  return (
    <div className="mx-auto max-w-5xl space-y-8 print:max-w-none">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm print:shadow-none">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Virginia Reviewer Packet
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Virginia Driver Improvement Course Submission Packet
            </h1>
            <p className="mt-4 max-w-3xl leading-7 text-slate-700">
              This print-ready packet consolidates the current curriculum outline,
              lesson knowledge checks, final exam summary, identity-validation
              method, and completion/reporting workflow into one reviewer-facing
              document. Use your browser&apos;s print function to save this page
              as a PDF for packaging.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 print:hidden">
            <PrintPacketButton />
            <Link
              href="/admin/approval-packet"
              className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Back to Approval Packet
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm print:shadow-none">
          <div className="text-sm text-slate-500">Lessons</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">
            {VIRGINIA_LESSONS.length}
          </div>
        </div>
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm print:shadow-none">
          <div className="text-sm text-blue-700">Knowledge checks</div>
          <div className="mt-2 text-3xl font-bold text-blue-900">
            {totalLessonChecks}
          </div>
        </div>
        <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm print:shadow-none">
          <div className="text-sm text-green-700">Final exam questions</div>
          <div className="mt-2 text-3xl font-bold text-green-900">
            {VIRGINIA_FINAL_EXAM_QUESTION_BANK.length}
          </div>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm print:shadow-none">
          <div className="text-sm text-amber-700">Instruction target</div>
          <div className="mt-2 text-3xl font-bold text-amber-900">8 hours</div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm print:shadow-none">
        <h2 className="text-2xl font-semibold text-slate-900">
          1. Course structure summary
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600">
                <th className="py-3 pr-4 font-semibold">Lesson</th>
                <th className="py-3 pr-4 font-semibold">Title</th>
                <th className="py-3 pr-4 font-semibold">Estimated minutes</th>
                <th className="py-3 font-semibold">Knowledge checks</th>
              </tr>
            </thead>
            <tbody>
              {VIRGINIA_LESSONS.map((lesson) => (
                <tr key={lesson.slug} className="border-b border-slate-100">
                  <td className="py-3 pr-4 font-medium text-slate-900">
                    {lesson.slug}
                  </td>
                  <td className="py-3 pr-4 text-slate-700">{lesson.title}</td>
                  <td className="py-3 pr-4 text-slate-700">
                    {lesson.estimatedMinutes}
                  </td>
                  <td className="py-3 text-slate-700">
                    {(VIRGINIA_LESSON_CHECKS[lesson.slug] ?? []).length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm print:shadow-none">
        <h2 className="text-2xl font-semibold text-slate-900">
          2. Lesson outlines
        </h2>
        <div className="mt-5 space-y-6">
          {VIRGINIA_LESSONS.map((lesson) => {
            const content = VIRGINIA_LESSON_CONTENT[lesson.slug]
            if (!content) return null

            return (
              <article
                key={lesson.slug}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <h3 className="text-xl font-semibold text-slate-900">
                  {lesson.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {content.intro}
                </p>
                <div className="mt-4 space-y-4">
                  {content.sections.map((section) => (
                    <div key={section.heading}>
                      <h4 className="font-semibold text-slate-900">
                        {section.heading}
                      </h4>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-7 text-slate-700">
                        {section.body.map((paragraph) => (
                          <li key={paragraph}>{paragraph}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-700">
                  <span className="font-semibold text-slate-900">Takeaway:</span>{" "}
                  {content.takeaway}
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm print:shadow-none">
        <h2 className="text-2xl font-semibold text-slate-900">
          3. Lesson knowledge checks and final exam controls
        </h2>
        <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
          <p>
            Lesson knowledge checks are included throughout the curriculum. The
            final exam uses a 50-question bank with an 80% passing score.
          </p>
          <p>
            The final exam unlocks after lesson completion and at least 7 hours
            of course instruction. The full course minimum is 8 hours total,
            including final exam time. A certificate is not available until both
            the final exam is passed and the full 8-hour total is complete.
          </p>
        </div>
        <div className="mt-5 space-y-4">
          {VIRGINIA_FINAL_EXAM_QUESTION_BANK.map((question) => (
            <article
              key={question.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="font-semibold text-slate-900">
                {question.id}. {question.question}
              </div>
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-slate-700">
                {question.options.map((option) => (
                  <li key={option}>{option}</li>
                ))}
              </ol>
              <p className="mt-3 text-sm text-slate-700">
                Correct answer:{" "}
                <span className="font-semibold text-slate-900">
                  {question.options[question.correctIndex]}
                </span>
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm print:shadow-none">
        <h2 className="text-2xl font-semibold text-slate-900">
          4. Identity-validation method
        </h2>
        <div className="mt-4 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="font-semibold text-slate-900">
              Student identity data collected
            </h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
              {IDENTITY_VERIFICATION_QUESTIONS.map((question) => (
                <li key={question.id}>
                  <span className="font-medium text-slate-900">
                    {question.prompt}:
                  </span>{" "}
                  {question.helpText}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <h3 className="font-semibold text-slate-900">
              Verification workflow
            </h3>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700">
              {identityWorkflow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm print:shadow-none">
        <h2 className="text-2xl font-semibold text-slate-900">
          5. Completion reporting and record handling
        </h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700">
          {reportingWorkflow.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
    </div>
  )
}
