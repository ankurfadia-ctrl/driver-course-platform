import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/admin-access"
import { VIRGINIA_FINAL_EXAM_QUESTION_BANK } from "@/lib/final-exam"
import {
  VIRGINIA_LESSON_CHECKS,
  VIRGINIA_LESSON_CONTENT,
  VIRGINIA_LESSONS,
} from "@/lib/virginia-course-curriculum"

export const dynamic = "force-dynamic"

export default async function AdminCurriculumPage() {
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
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Admin
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            Virginia Curriculum Packet
          </h1>
          <p className="mt-2 max-w-3xl text-slate-600">
            Use this internal packet to review the current Virginia lesson
            content, lesson knowledge checks, and final exam bank before
            packaging materials for approval.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/virginia-readiness"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Virginia Readiness
          </Link>
          <Link
            href="/admin/compliance"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Compliance Dashboard
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Lessons</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">
            {VIRGINIA_LESSONS.length}
          </div>
        </div>
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
          <div className="text-sm text-blue-700">Knowledge checks</div>
          <div className="mt-2 text-3xl font-bold text-blue-900">
            {totalLessonChecks}
          </div>
        </div>
        <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
          <div className="text-sm text-green-700">Final exam questions</div>
          <div className="mt-2 text-3xl font-bold text-green-900">
            {VIRGINIA_FINAL_EXAM_QUESTION_BANK.length}
          </div>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <div className="text-sm text-amber-700">Instruction time target</div>
          <div className="mt-2 text-3xl font-bold text-amber-900">8 hours</div>
        </div>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Lesson packet</h2>
        <div className="mt-6 space-y-6">
          {VIRGINIA_LESSONS.map((lesson) => {
            const content = VIRGINIA_LESSON_CONTENT[lesson.slug]
            const questions = VIRGINIA_LESSON_CHECKS[lesson.slug] ?? []

            if (!content) {
              return null
            }

            return (
              <article
                key={lesson.slug}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                    {lesson.slug}
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                    {lesson.estimatedMinutes} minutes
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                    {questions.length} knowledge check questions
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-bold text-slate-900">
                  {lesson.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-700">{content.intro}</p>

                <div className="mt-6 space-y-5">
                  {content.sections.map((section) => (
                    <section key={section.heading}>
                      <h4 className="text-lg font-semibold text-slate-900">
                        {section.heading}
                      </h4>
                      <div className="mt-3 space-y-3">
                        {section.body.map((paragraph, index) => (
                          <p
                            key={`${lesson.slug}-${section.heading}-${index}`}
                            className="text-sm leading-7 text-slate-700"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-800">
                    Key takeaway
                  </h4>
                  <p className="mt-2 text-sm leading-7 text-slate-700">
                    {content.takeaway}
                  </p>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-slate-900">
                    Knowledge check
                  </h4>
                  <div className="mt-4 space-y-4">
                    {questions.map((question) => (
                      <div
                        key={`${lesson.slug}-${question.id}`}
                        className="rounded-2xl border border-slate-200 bg-white p-4"
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
                            {question.options[question.correctAnswer]}
                          </span>
                        </p>
                        <p className="mt-2 text-sm text-slate-600">
                          {question.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Final exam bank</h2>
        <div className="mt-4 space-y-4">
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
    </div>
  )
}
