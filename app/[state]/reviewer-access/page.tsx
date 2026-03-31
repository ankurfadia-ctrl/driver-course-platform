import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/admin-access"
import { isReviewerEmail } from "@/lib/reviewer-access"
import {
  getCourseConfig,
  getDisclosuresRoute,
  getFaqRoute,
  getStateRoute,
} from "@/lib/course-config"
import { VIRGINIA_FINAL_EXAM_QUESTION_BANK } from "@/lib/final-exam"
import { IDENTITY_VERIFICATION_QUESTIONS } from "@/lib/identity-verification"
import {
  VIRGINIA_LESSON_CHECKS,
  VIRGINIA_LESSON_CONTENT,
  VIRGINIA_LESSONS,
} from "@/lib/virginia-course-curriculum"

export const dynamic = "force-dynamic"

type PageProps = {
  params: Promise<{ state: string }>
}

const identityWorkflow = [
  "The student creates an identity profile with legal name, date of birth, license or customer number, and two custom security questions.",
  "Identity setup must be completed before lesson progress begins.",
  "The student must answer identity prompts before each lesson begins.",
  "The student must complete identity verification again before the final exam begins.",
  "Incorrect identity answers keep the lesson or final exam blocked until identity details are corrected.",
]

const reportingWorkflow = [
  "After successful completion, the course record appears in the internal reporting queue.",
  "Reporting status distinguishes ready-to-report, missing-court-document, and reported records.",
  "Court-related attendance requires related court information before safe-driving points can be awarded.",
  "Completion reporting is handled within the required 24-hour reporting window.",
]

export default async function ReviewerAccessPage({ params }: PageProps) {
  const { state } = await params
  const normalizedState = String(state ?? "").trim().toLowerCase()
  const config = getCourseConfig(normalizedState)

  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(getStateRoute(normalizedState, "login"))
  }

  if (!isReviewerEmail(user.email) && !isAdminEmail(user.email)) {
    redirect(getStateRoute(normalizedState, "login"))
  }

  if (normalizedState !== "virginia") {
    return (
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Reviewer Access
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            {config.stateName} reviewer access is not published yet
          </h1>
          <p className="mt-4 max-w-3xl leading-7 text-slate-700">
            This reviewer portal is currently only prepared for Virginia. Other
            state reviewer views will be added when their application and
            curriculum review materials are ready.
          </p>
        </section>
      </div>
    )
  }

  const totalLessonChecks = Object.values(VIRGINIA_LESSON_CHECKS).reduce(
    (sum, questions) => sum + questions.length,
    0
  )

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="rounded-3xl border border-blue-200 bg-blue-50 p-8 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Reviewer Access
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Virginia reviewer portal
            </h1>
            <p className="mt-4 max-w-3xl leading-7 text-slate-700">
              This logged-in reviewer view is intended for Virginia DMV or other
              packet reviewers who need username-and-password access to inspect
              the registration flow, course structure, identity controls, final
              exam content, and completion workflow without receiving admin
              access or touching live student records.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-white px-5 py-4 shadow-sm">
            <div className="text-sm text-slate-500">Access type</div>
            <div className="mt-1 text-lg font-semibold text-slate-900">
              Reviewer only
            </div>
            <div className="mt-2 text-sm leading-6 text-slate-600">
              No admin tools, no live purchase requirement, no student data
              exposure.
            </div>
          </div>
        </div>
      </section>

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
          <div className="text-sm text-amber-700">Instruction target</div>
          <div className="mt-2 text-3xl font-bold text-amber-900">8 hours</div>
        </div>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">
          Public pages available to reviewers
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Link
            href={getStateRoute("virginia")}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-white"
          >
            <div className="font-semibold text-slate-900">Virginia home</div>
            <div className="mt-2 text-sm leading-6 text-slate-600">
              Public state landing page and student-facing positioning.
            </div>
          </Link>
          <Link
            href={getStateRoute("virginia", "login")}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-white"
          >
            <div className="font-semibold text-slate-900">Registration portal</div>
            <div className="mt-2 text-sm leading-6 text-slate-600">
              Student sign-in and account-creation page with required portal
              fields and notices.
            </div>
          </Link>
          <Link
            href={getDisclosuresRoute("virginia")}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-white"
          >
            <div className="font-semibold text-slate-900">Disclosures</div>
            <div className="mt-2 text-sm leading-6 text-slate-600">
              Virginia student disclosures, timing, certificate, and support
              notices.
            </div>
          </Link>
        </div>
        <div className="mt-4">
          <Link
            href={getFaqRoute("virginia")}
            className="text-sm font-medium text-blue-700 hover:text-blue-800"
          >
            Open Virginia FAQ
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">
          Lesson outlines
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
              </article>
            )
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">
          Final exam and course controls
        </h2>
        <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
          <p>
            Lesson knowledge checks are included throughout the curriculum. The
            final exam uses a 50-question bank and requires a passing score of
            80 percent.
          </p>
          <p>
            The final exam unlocks after lesson completion and at least 7 hours
            of course instruction. A certificate is issued only after the
            student passes the final exam and completes the full 8-hour course
            minimum.
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

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">
          Identity-validation method
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

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">
          Completion reporting workflow
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
