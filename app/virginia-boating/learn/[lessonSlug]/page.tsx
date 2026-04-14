"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  BOATING_LESSON_CONTENT,
  BOATING_LESSON_CHECKS,
  BOATING_LESSONS,
  getBoatingLessonBySlug,
} from "@/lib/boating-course-curriculum"
import {
  markLessonComplete,
} from "@/lib/course-progress"
import { getCourseAccessStatus } from "@/lib/course-access"

const BOATING_COURSE_SLUG = "boating-safety"

export default function VirginiaBoatingLessonPage() {
  const params = useParams()
  const router = useRouter()
  const lessonSlug =
    typeof params?.lessonSlug === "string" ? params.lessonSlug : ""
  const lesson = useMemo(() => getBoatingLessonBySlug(lessonSlug), [lessonSlug])
  const content = lesson ? BOATING_LESSON_CONTENT[lesson.slug] : null
  const questions = lesson ? BOATING_LESSON_CHECKS[lesson.slug] ?? [] : []
  const [loading, setLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const [saving, setSaving] = useState(false)
  const previousLesson =
    lesson ? BOATING_LESSONS.find((entry) => entry.id === lesson.id - 1) ?? null : null
  const nextLesson =
    lesson ? BOATING_LESSONS.find((entry) => entry.id === lesson.id + 1) ?? null : null

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      const access = await getCourseAccessStatus("virginia", BOATING_COURSE_SLUG)

      if (!isMounted) return

      if (!access.hasPaidAccess) {
        setHasAccess(false)
        setLoading(false)
        return
      }

      setHasAccess(true)
      setLoading(false)
    }

    void loadData()

    return () => {
      isMounted = false
    }
  }, [lessonSlug])

  async function handleCompleteAndContinue() {
    if (!lesson) return

    try {
      setSaving(true)
      await markLessonComplete("virginia", lesson.slug, BOATING_COURSE_SLUG)

      if (nextLesson) {
        router.push(`/virginia-boating/learn/${nextLesson.slug}`)
      } else {
        router.push("/virginia-boating/learn")
      }
    } catch (error) {
      console.error("Could not save boating lesson progress:", error)
    } finally {
      setSaving(false)
    }
  }

  if (!lesson || !content) {
    return (
      <main className="public-shell min-h-screen">
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-semibold text-slate-950">Lesson not found</h1>
            <Link
              href="/virginia-boating/learn"
              className="mt-6 inline-flex rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800"
            >
              Back to course
            </Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="public-shell min-h-screen">
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-6">
          <Link
            href="/virginia-boating/learn"
            className="text-sm font-medium text-sky-700 hover:text-sky-800"
          >
            Back to student course
          </Link>
        </div>

        {!loading && !hasAccess ? (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-semibold text-slate-950">Course access required</h1>
            <p className="mt-4 leading-7 text-slate-600">
              You need an active Virginia boating purchase before entering the
              student lesson flow.
            </p>
            <Link
              href="/virginia-boating/pricing"
              className="mt-6 inline-flex rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800"
            >
              View plans
            </Link>
          </div>
        ) : loading ? (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm text-slate-600">
            Loading lesson access...
          </div>
        ) : (
          <>
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
                    href={`/virginia-boating/learn/${previousLesson.slug}`}
                    className="inline-flex rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  >
                    Previous lesson
                  </Link>
                ) : (
                  <Link
                    href="/virginia-boating/learn"
                    className="inline-flex rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  >
                    Course outline
                  </Link>
                )}
              </div>

              <button
                onClick={handleCompleteAndContinue}
                disabled={saving}
                className="inline-flex rounded-xl bg-sky-700 px-4 py-2 text-sm font-medium text-white hover:bg-sky-800 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {saving
                  ? "Saving..."
                  : nextLesson
                  ? "Mark complete and continue"
                  : "Finish lesson"}
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  )
}
