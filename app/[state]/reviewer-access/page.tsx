import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/admin-access"
import FloridaParentEducationReviewerPortal from "@/components/reviewer/florida-parent-education-reviewer-portal"
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
import {
  FLORIDA_BDI_MODULES,
  FLORIDA_BDI_MODULE_CONTENT,
  FLORIDA_BDI_TOPIC_MATRIX,
  FLORIDA_BDI_EXAM_CONTROLS,
  FLORIDA_BDI_VALIDATION_CONTROLS,
} from "@/lib/florida-bdi-course-content"

export const dynamic = "force-dynamic"

type PageProps = {
  params: Promise<{ state: string }>
  searchParams?: Promise<{ program?: string }>
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

export default async function ReviewerAccessPage({
  params,
  searchParams,
}: PageProps) {
  const { state } = await params
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const normalizedState = String(state ?? "").trim().toLowerCase()
  const reviewerProgram = String(
    resolvedSearchParams?.program ?? ""
  ).trim().toLowerCase()
  const config = getCourseConfig(normalizedState)
  const reviewerPath =
    reviewerProgram && normalizedState === "florida"
      ? `${getStateRoute(normalizedState, "reviewer-access")}?program=${encodeURIComponent(reviewerProgram)}`
      : getStateRoute(normalizedState, "reviewer-access")
  const reviewerLoginPath = `${getStateRoute(normalizedState, "login")}?reason=reviewer&next=${encodeURIComponent(reviewerPath)}`

  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(reviewerLoginPath)
  }

  if (!isReviewerEmail(user.email) && !isAdminEmail(user.email)) {
    redirect(reviewerLoginPath)
  }

  if (normalizedState === "florida") {
    if (reviewerProgram === "parent-education") {
      return <FloridaParentEducationReviewerPortal />
    }

    return <FloridaBDIReviewerPortal />
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

function FloridaBDIReviewerPortal() {
  const totalTopics = FLORIDA_BDI_TOPIC_MATRIX.length

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Header */}
      <section className="rounded-3xl border border-blue-200 bg-blue-50 p-8 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Reviewer Access — Florida BDI
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Florida Basic Driver Improvement Course
            </h1>
            <p className="mt-4 max-w-3xl leading-7 text-slate-700">
              This reviewer portal provides FLHSMV committee members and
              authorized reviewers with direct access to the Florida BDI course
              structure, module content, validation controls, final exam
              description, topic-to-page matrix, and pilot jurisdiction
              information. No admin access or live student data is exposed
              through this view.
            </p>
          </div>
          <div className="rounded-2xl border border-blue-200 bg-white px-5 py-4 shadow-sm">
            <div className="text-sm text-slate-500">Access type</div>
            <div className="mt-1 text-lg font-semibold text-slate-900">Reviewer only</div>
            <div className="mt-1 text-sm text-slate-500">Pilot jurisdiction</div>
            <div className="mt-1 font-semibold text-slate-900">
              {FLORIDA_BDI_EXAM_CONTROLS.pilotJurisdiction}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Course modules</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">
            {FLORIDA_BDI_MODULES.length}
          </div>
        </div>
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
          <div className="text-sm text-blue-700">Script pages</div>
          <div className="mt-2 text-3xl font-bold text-blue-900">18</div>
        </div>
        <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
          <div className="text-sm text-green-700">Question bank</div>
          <div className="mt-2 text-3xl font-bold text-green-900">
            {FLORIDA_BDI_EXAM_CONTROLS.questionBankSize}
          </div>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <div className="text-sm text-amber-700">Florida topics mapped</div>
          <div className="mt-2 text-3xl font-bold text-amber-900">{totalTopics}</div>
        </div>
      </div>

      {/* Public pages */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Public pages available to reviewers</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Link
            href="/florida"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-white"
          >
            <div className="font-semibold text-slate-900">Florida home</div>
            <div className="mt-2 text-sm leading-6 text-slate-600">
              Public state landing page and student-facing preparation information.
            </div>
          </Link>
          <Link
            href={getDisclosuresRoute("florida")}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-white"
          >
            <div className="font-semibold text-slate-900">Florida disclosures</div>
            <div className="mt-2 text-sm leading-6 text-slate-600">
              Florida-specific course status disclosures and acceptance information.
            </div>
          </Link>
          <Link
            href={getStateRoute("florida", "login")}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-white"
          >
            <div className="font-semibold text-slate-900">Registration portal</div>
            <div className="mt-2 text-sm leading-6 text-slate-600">
              Student sign-in and account-creation page.
            </div>
          </Link>
        </div>
      </section>

      {/* Course structure */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">1. Course structure</h2>
        <p className="mt-2 text-sm text-slate-600">
          Script version: {FLORIDA_BDI_EXAM_CONTROLS.scriptVersion}
        </p>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600">
                <th className="py-3 pr-4 font-semibold">Module</th>
                <th className="py-3 pr-4 font-semibold">Title</th>
                <th className="py-3 pr-4 font-semibold">Script pages</th>
                <th className="py-3 font-semibold">Est. minutes</th>
              </tr>
            </thead>
            <tbody>
              {FLORIDA_BDI_MODULES.map((mod) => (
                <tr key={mod.slug} className="border-b border-slate-100">
                  <td className="py-3 pr-4 font-medium text-slate-900">{mod.id}</td>
                  <td className="py-3 pr-4 text-slate-700">{mod.title}</td>
                  <td className="py-3 pr-4 text-slate-700">{mod.pages}</td>
                  <td className="py-3 text-slate-700">{mod.estimatedMinutes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Module content */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">2. Module content outlines</h2>
        <div className="mt-5 space-y-6">
          {FLORIDA_BDI_MODULES.map((mod) => {
            const content = FLORIDA_BDI_MODULE_CONTENT[mod.slug]
            if (!content) return null
            return (
              <article
                key={mod.slug}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold text-slate-900">{mod.title}</h3>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                    Script pp. {content.scriptPages}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-700">{content.intro}</p>
                <div className="mt-4 space-y-4">
                  {content.sections.map((section) => (
                    <div key={section.heading}>
                      <h4 className="font-semibold text-slate-900">{section.heading}</h4>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-7 text-slate-700">
                        {section.body.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                {content.validationNote && (
                  <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
                    <span className="font-semibold">Validation note:</span>{" "}
                    {content.validationNote}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </section>

      {/* Validation controls */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">3. Student validation and participation controls</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700">
          {FLORIDA_BDI_VALIDATION_CONTROLS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      {/* Final exam */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">4. Final exam and question bank</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <h3 className="font-semibold text-slate-900">Exam specifications</h3>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
              <li>
                <span className="font-medium text-slate-900">Question bank size:</span>{" "}
                {FLORIDA_BDI_EXAM_CONTROLS.questionBankSize} questions
              </li>
              <li>
                <span className="font-medium text-slate-900">Final exam length:</span>{" "}
                {FLORIDA_BDI_EXAM_CONTROLS.finalExamQuestions} questions (randomized)
              </li>
              <li>
                <span className="font-medium text-slate-900">Passing score:</span>{" "}
                {FLORIDA_BDI_EXAM_CONTROLS.passingScorePercent} percent
              </li>
              <li>
                <span className="font-medium text-slate-900">Randomized:</span> Yes — each
                student receives a unique selection from the full bank
              </li>
              <li>
                <span className="font-medium text-slate-900">Integrity controls:</span> Active
                during the final test through the last question
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="font-semibold text-slate-900">Question bank structure</h3>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700">
              <li>The full 500-question bank is maintained in the Florida BDI packet source set for reviewer packaging.</li>
              <li>Questions are distributed across all 10 modules and all major Florida BDI topic families.</li>
              <li>Each question includes the correct answer and the script-page reference for reviewer traceability.</li>
              <li>The bank supports the 40-question randomized final exam and alternate test forms.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Topic-to-page matrix */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">
          5. Florida topic-to-page reference matrix
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          All {totalTopics} Florida minimum-requirement topics mapped to script pages. Page references frozen to Script v0.2.
        </p>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600">
                <th className="py-3 pr-4 font-semibold">Topic family</th>
                <th className="py-3 pr-4 font-semibold">Specific requirement</th>
                <th className="py-3 pr-4 font-semibold">Module</th>
                <th className="py-3 font-semibold">Script pages</th>
              </tr>
            </thead>
            <tbody>
              {FLORIDA_BDI_TOPIC_MATRIX.map((row) => (
                <tr key={`${row.family}-${row.topic}`} className="border-b border-slate-100">
                  <td className="py-3 pr-4 font-medium text-slate-900">{row.family}</td>
                  <td className="py-3 pr-4 text-slate-700">{row.topic}</td>
                  <td className="py-3 pr-4 text-slate-700">{row.module}</td>
                  <td className="py-3 text-slate-700">{row.pages}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pilot jurisdiction */}
      <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">6. Pilot jurisdiction</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wide text-amber-700">
              Selected jurisdiction
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900">
              {FLORIDA_BDI_EXAM_CONTROLS.pilotJurisdiction}
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              The provider selects Miami-Dade County as the initial pilot jurisdiction
              pursuant to the pilot-test requirement for newly approved
              technology-delivered courses. Course operation will be limited to this
              jurisdiction until the statistical study conditions established by the
              Department are satisfied.
            </p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-white p-5">
            <h3 className="font-semibold text-slate-900">Provider contact</h3>
            <ul className="mt-3 space-y-1 text-sm leading-7 text-slate-700">
              <li><span className="font-medium">Entity:</span> Driver Course Platform LLC</li>
              <li><span className="font-medium">DBA:</span> Florida Driver Improvement Courses</li>
              <li><span className="font-medium">Public correspondence:</span> c/o Wythe County Community Hospital, 600 West Ridge Road, Wytheville, VA 24382</li>
              <li><span className="font-medium">Phone:</span> (703) 574-0146</li>
                      <li><span className="font-medium">Email:</span> admin@nationaldriverimprovement.com</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
