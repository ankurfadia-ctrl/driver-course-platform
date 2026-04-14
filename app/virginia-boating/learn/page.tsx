"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { BOATING_LESSONS } from "@/lib/boating-course-curriculum"
import { getLatestExamResultForCourse } from "@/lib/exam-results"
import {
  getUserCourseProgress,
  isLessonCompleted,
  type CourseProgressRow,
} from "@/lib/course-progress"
import { getCourseAccessStatus } from "@/lib/course-access"

const BOATING_COURSE_SLUG = "boating-safety"

export default function VirginiaBoatingLearnPage() {
  const [loading, setLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const [progress, setProgress] = useState<CourseProgressRow[]>([])
  const [examPassed, setExamPassed] = useState(false)

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

      const [rows, latestExam] = await Promise.all([
        getUserCourseProgress("virginia", BOATING_COURSE_SLUG),
        getLatestExamResultForCourse("virginia", BOATING_COURSE_SLUG),
      ])

      if (!isMounted) return
      setHasAccess(true)
      setProgress(rows)
      setExamPassed(Boolean(latestExam?.passed))
      setLoading(false)
    }

    void loadData()

    return () => {
      isMounted = false
    }
  }, [])

  const allLessonsCompleted = BOATING_LESSONS.every((lesson) =>
    isLessonCompleted(progress, lesson.slug)
  )

  return (
    <main className="public-shell min-h-screen">
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="section-label">Virginia Boating Student Course</div>
          <h1 className="text-4xl font-semibold text-slate-950">Course lessons</h1>
          {loading ? (
            <p className="leading-7 text-slate-600">Loading your course access...</p>
          ) : !hasAccess ? (
            <div className="space-y-4">
              <p className="leading-7 text-slate-600">
                You need an active Virginia boating purchase before entering the
                student course flow.
              </p>
              <Link
                href="/virginia-boating/pricing"
                className="inline-flex rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800"
              >
                View plans
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5">
                <h2 className="text-xl font-semibold text-slate-950">
                  Final assessment
                </h2>
                <p className="mt-2 leading-7 text-slate-700">
                  {allLessonsCompleted
                    ? examPassed
                      ? "You passed the Virginia boating final exam. Your completion certificate is ready."
                      : "All lessons are complete. You can move into the Virginia boating final exam now."
                    : `Finish all ${BOATING_LESSONS.length} lessons to unlock the Virginia boating final exam.`}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/virginia-boating/exam"
                    className="rounded-xl bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800"
                  >
                    {allLessonsCompleted ? "Open final exam" : "View final exam"}
                  </Link>
                  {examPassed ? (
                    <Link
                      href="/virginia-boating/certificate"
                      className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      View certificate
                    </Link>
                  ) : null}
                </div>
              </div>

              {BOATING_LESSONS.map((lesson) => (
                <article
                  key={lesson.slug}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-950">
                        {lesson.title}
                      </h2>
                      <div className="mt-1 text-sm text-slate-500">
                        {lesson.estimatedMinutes} min | {lesson.moduleCode}
                      </div>
                      <div className="mt-2 text-sm text-slate-700">
                        {isLessonCompleted(progress, lesson.slug)
                          ? "Completed"
                          : "Not completed"}
                      </div>
                    </div>
                    <Link
                      href={`/virginia-boating/learn/${lesson.slug}`}
                      className="rounded-xl bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800"
                    >
                      Open lesson
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
