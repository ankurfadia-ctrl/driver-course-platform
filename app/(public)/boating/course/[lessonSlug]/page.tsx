import type { Metadata } from "next"
import Link from "next/link"
import {
  BOATING_LESSON_CHECKS,
  BOATING_LESSON_CONTENT,
  BOATING_LESSONS,
  getBoatingLessonBySlug,
} from "@/lib/boating-course-curriculum"
import { BOATING_PRODUCT_CONFIG } from "@/lib/boating-config"

type PageProps = {
  params: Promise<{ lessonSlug: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lessonSlug } = await params
  const lesson = getBoatingLessonBySlug(lessonSlug)

  if (!lesson) {
    return {
      title: `Boating Lesson | ${BOATING_PRODUCT_CONFIG.siteTitle}`,
    }
  }

  return {
    title: `${lesson.title} | ${BOATING_PRODUCT_CONFIG.siteTitle}`,
    description:
      BOATING_LESSON_CONTENT[lesson.slug]?.intro ??
      BOATING_PRODUCT_CONFIG.marketingDescription,
    alternates: {
      canonical: `/boating/course/${lesson.slug}`,
    },
  }
}

export default async function BoatingLessonPage({ params }: PageProps) {
  const { lessonSlug } = await params
  const lesson = getBoatingLessonBySlug(lessonSlug)

  if (!lesson) {
    return (
      <main className="public-shell min-h-screen">
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="section-label">Boating Curriculum</div>
            <h1 className="mt-4 text-4xl font-semibold text-slate-950">
              Lesson not found
            </h1>
            <p className="mt-4 leading-7 text-slate-600">
              This boating lesson route does not exist yet.
            </p>
            <Link
              href="/boating/course"
              className="mt-6 inline-flex rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800"
            >
              Back to Course Outline
            </Link>
          </div>
        </section>
      </main>
    )
  }

  const content = BOATING_LESSON_CONTENT[lesson.slug]
  const questions = BOATING_LESSON_CHECKS[lesson.slug] ?? []
  const previousLesson =
    BOATING_LESSONS.find((entry) => entry.id === lesson.id - 1) ?? null
  const nextLesson =
    BOATING_LESSONS.find((entry) => entry.id === lesson.id + 1) ?? null

  return (
    <main className="public-shell min-h-screen">
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-6">
          <Link
            href="/boating/course"
            className="text-sm font-medium text-sky-700 hover:text-sky-800"
          >
            Back to Course Outline
          </Link>
        </div>

        <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-sky-700">
              {lesson.moduleCode}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {lesson.estimatedMinutes} min
            </span>
          </div>

          <h1 className="mt-4 text-4xl font-semibold text-slate-950">
            {lesson.title}
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-700">
            {content.intro}
          </p>

          <div className="mt-8 space-y-8">
            {content.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold text-slate-950">
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-4">
                  {section.body.map((paragraph, index) => (
                    <p
                      key={`${section.heading}-${index}`}
                      className="leading-8 text-slate-700"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-slate-50 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-800">
              Key takeaway
            </h3>
            <p className="mt-2 leading-7 text-slate-700">{content.takeaway}</p>
          </div>
        </article>

        <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-sky-700">
              Knowledge Check
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {questions.length} questions
            </span>
          </div>
          <div className="mt-6 space-y-6">
            {questions.map((question, index) => (
              <section
                key={question.id}
                className="rounded-2xl border border-slate-200 p-6"
              >
                <h2 className="text-lg font-semibold text-slate-900">
                  {index + 1}. {question.question}
                </h2>
                <div className="mt-4 space-y-3">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={option}
                      className={`rounded-xl border p-4 ${
                        optionIndex === question.correctAnswer
                          ? "border-emerald-300 bg-emerald-50"
                          : "border-slate-200 bg-slate-50"
                      }`}
                    >
                      <div className="text-sm font-medium text-slate-800">
                        {option}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  {question.explanation}
                </div>
              </section>
            ))}
          </div>
        </section>

        <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {previousLesson ? (
              <Link
                href={`/boating/course/${previousLesson.slug}`}
                className="inline-flex rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Previous Lesson
              </Link>
            ) : (
              <Link
                href="/boating/course"
                className="inline-flex rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                Course Outline
              </Link>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            {nextLesson ? (
              <Link
                href={`/boating/course/${nextLesson.slug}`}
                className="inline-flex rounded-xl bg-sky-700 px-4 py-2 text-sm font-medium text-white hover:bg-sky-800"
              >
                Next Lesson
              </Link>
            ) : (
              <Link
                href="/boating"
                className="inline-flex rounded-xl bg-sky-700 px-4 py-2 text-sm font-medium text-white hover:bg-sky-800"
              >
                Return to Boating Gateway
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
