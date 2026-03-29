"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import SeatTimeStatusCard from "@/components/course/SeatTimeStatusCard"
import { getCourseAccessStatus } from "@/lib/course-access"
import { getLatestCourseAttempt } from "@/lib/course-seat-time"
import {
  getUserCourseProgress,
  isLessonCompleted,
  type CourseProgressRow,
} from "@/lib/course-progress"
import {
  formatCourseAccessDeadline,
  VIRGINIA_COURSE_ACCESS_DAYS,
} from "@/lib/course-deadline"
import { getLatestExamResult } from "@/lib/exam-results"
import { isFinalExamSeatTimeBypassed } from "@/lib/dev-config"
import { getCourseConfig } from "@/lib/course-config"
import { hasStudentIdentityProfile } from "@/lib/student-identity"

const LESSONS = [
  { id: 1, slug: "lesson-1", title: "Lesson 1 - Course Introduction" },
  { id: 2, slug: "lesson-2", title: "Lesson 2 - Defensive Driving Habits" },
  { id: 3, slug: "lesson-3", title: "Lesson 3 - Speed Management and Following Distance" },
  { id: 4, slug: "lesson-4", title: "Lesson 4 - Distraction, Fatigue, and Impairment" },
  { id: 5, slug: "lesson-5", title: "Lesson 5 - Sharing the Road Safely" },
  { id: 6, slug: "lesson-6", title: "Lesson 6 - Virginia Traffic Laws and Consequences" },
  { id: 7, slug: "lesson-7", title: "Lesson 7 - Weather, Night Driving, and Emergencies" },
  { id: 8, slug: "lesson-8", title: "Lesson 8 - Attitude, Risk, and Long-Term Responsibility" },
]

export default function StateCoursePage() {
  const params = useParams()

  const state =
    typeof params?.state === "string" ? params.state : "virginia"
  const config = getCourseConfig(state)

  const [progress, setProgress] = useState<CourseProgressRow[]>([])

  const [hasAccess, setHasAccess] = useState<boolean | null>(null)
  const [accessError, setAccessError] = useState<string | null>(null)
  const [accessExpired, setAccessExpired] = useState(false)
  const [accessDeadline, setAccessDeadline] = useState<string | null>(null)
  const [identityReady, setIdentityReady] = useState<boolean | null>(null)

  const [seatTimeComplete, setSeatTimeComplete] = useState(false)

  const [examPassed, setExamPassed] = useState(false)

  const seatTimeBypassed = isFinalExamSeatTimeBypassed(state)
  const effectiveSeatTimeComplete = seatTimeComplete || seatTimeBypassed

  useEffect(() => {
    let isMounted = true

    async function checkAccess() {
      const access = await getCourseAccessStatus(state)

      if (!isMounted) return
      setHasAccess(access.hasPaidAccess)
      setAccessError(access.error)
      setAccessExpired(access.accessExpired)
      setAccessDeadline(formatCourseAccessDeadline(access.purchasedAt))
    }

    void checkAccess()

    return () => {
      isMounted = false
    }
  }, [state])

  useEffect(() => {
    let isMounted = true

    async function loadIdentityStatus() {
      try {
        const ready = await hasStudentIdentityProfile(state)

        if (!isMounted) return
        setIdentityReady(ready)
      } catch (error) {
        console.error("Error loading identity status:", error)
        if (!isMounted) return
        setIdentityReady(false)
      }
    }

    if (hasAccess) {
      void loadIdentityStatus()
    }

    return () => {
      isMounted = false
    }
  }, [state, hasAccess])

  useEffect(() => {
    async function loadProgress() {
      try {
        const rows = await getUserCourseProgress(state)
        setProgress(rows)
      } catch (error) {
        console.error(error)
      }
    }

    if (hasAccess) {
      void loadProgress()
    }
  }, [state, hasAccess])

  useEffect(() => {
    async function loadSeatTime() {
      try {
        const attempt = await getLatestCourseAttempt(state)

        if (!attempt) {
          setSeatTimeComplete(false)
          return
        }

        const complete =
          attempt.status === "completed" ||
          attempt.total_seconds >= attempt.required_seconds

        setSeatTimeComplete(complete)
      } catch (error) {
        console.error("Error loading seat time:", error)
        setSeatTimeComplete(false)
      }
    }

    if (hasAccess) {
      void loadSeatTime()
    }
  }, [state, hasAccess])

  useEffect(() => {
    async function loadExamStatus() {
      const exam = await getLatestExamResult(state)

      if (exam) {
        setExamPassed(Boolean(exam.passed))
      }
    }

    if (hasAccess) {
      void loadExamStatus()
    }
  }, [state, hasAccess])

  const allLessonsCompleted = useMemo(
    () => LESSONS.every((l) => isLessonCompleted(progress, l.slug)),
    [progress]
  )

  const finalExamAvailable = allLessonsCompleted && effectiveSeatTimeComplete
  const certificateAvailable = effectiveSeatTimeComplete && examPassed

  if (hasAccess === null || (hasAccess && identityReady === null)) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl text-center space-y-4">
        <h1 className="text-2xl font-bold">Checking access...</h1>
        <p className="text-slate-600">
          Verifying your course purchase for this state.
        </p>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl text-center space-y-4">
        <h1 className="text-2xl font-bold">
          {accessExpired ? "Course Access Expired" : "Course Locked"}
        </h1>
        <p className="text-slate-600">
          {accessExpired
            ? `This course is available for ${VIRGINIA_COURSE_ACCESS_DAYS} days from purchase.`
            : "You need to purchase this course before accessing lessons."}
        </p>

        {accessExpired && accessDeadline ? (
          <p className="text-sm text-amber-700">
            Your access expired after {accessDeadline}.
          </p>
        ) : null}

        {accessError ? (
          <p className="text-sm text-amber-700">{accessError}</p>
        ) : null}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/${state}/checkout`}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Purchase Course
          </Link>

          <Link
            href={`/${state}/dashboard`}
            className="inline-block border border-slate-300 px-6 py-3 rounded-lg"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
          {config.stateName} Student Course
        </p>
        <h1 className="text-3xl font-bold text-slate-900">{config.courseName}</h1>
      </div>

      {!identityReady ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Identity verification required
          </h2>
          <p className="mt-2 text-slate-700">
            Virginia requires identity verification throughout the course and
            before the final exam. Complete identity setup before starting
            lesson progress, and be ready to verify identity again before each
            lesson begins.
          </p>

          <Link
            href={`/${state}/identity`}
            className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            Complete Identity Setup
          </Link>
        </div>
      ) : null}

      <div className="rounded-xl bg-blue-50 p-6 border border-blue-200">
        <h2 className="text-xl font-semibold">Need help?</h2>
        <p className="mt-2 text-slate-600">
          Get instant answers or contact support.
        </p>

        <Link
          href={`/${state}/support`}
          className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Get Help
        </Link>
      </div>

      <SeatTimeStatusCard
        stateCode={state}
        pagePath={`/${state}/course`}
        finalExamHref={`/${state}/course/final-exam`}
        lessonNumber={null}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-6 border rounded-xl">
          <h2 className="text-xl font-semibold">Final Exam</h2>
          <p className="mt-2 text-sm text-slate-600">
            {identityReady
              ? finalExamAvailable
                ? "Available"
                : "Locked"
              : "Complete identity setup first"}
          </p>

          {identityReady ? (
            <Link
              href={`/${state}/course/final-exam`}
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Go to Final Exam
            </Link>
          ) : (
            <Link
              href={`/${state}/identity`}
              className="mt-4 inline-block border border-blue-600 px-4 py-2 rounded-lg text-blue-600"
            >
              Complete Identity Setup
            </Link>
          )}
        </div>

        <div className="p-6 border rounded-xl">
          <h2 className="text-xl font-semibold">Certificate</h2>
          <p className="mt-2 text-sm text-slate-600">
            {certificateAvailable ? "Available" : "Locked"}
          </p>

          <div className="mt-4 flex gap-3">
            <Link
              href={`/${state}/certificate`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              View
            </Link>

            {certificateAvailable && (
              <Link
                href={`/${state}/certificate?download=1`}
                className="border border-blue-600 px-4 py-2 rounded-lg text-blue-600"
              >
                Download
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-xl border p-6">
        <h2 className="text-xl font-semibold">Lessons</h2>
        <div className="mt-4 space-y-3">
          {LESSONS.map((lesson) => {
            const completed = isLessonCompleted(progress, lesson.slug)

            return (
              <div
                key={lesson.slug}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <div className="font-medium">{lesson.title}</div>
                  <div className="text-sm text-slate-600">
                    {!identityReady
                      ? "Complete identity setup first"
                      : completed
                      ? "Completed"
                      : "Not started"}
                  </div>
                </div>

                {identityReady ? (
                  <Link
                    href={`/${state}/course/${lesson.slug}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Open
                  </Link>
                ) : (
                  <Link
                    href={`/${state}/identity`}
                    className="border border-blue-600 px-4 py-2 rounded-lg text-blue-600"
                  >
                    Verify Identity
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
