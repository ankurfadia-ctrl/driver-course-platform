"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"
import {
  getLatestExamResultForCourse,
  hasExamAttemptOnDate,
  saveExamResult,
  type ExamResultRow,
} from "@/lib/exam-results"
import { getCourseAccessStatus } from "@/lib/course-access"
import {
  getUserCourseProgress,
  isLessonCompleted,
  type CourseProgressRow,
} from "@/lib/course-progress"
import { BOATING_LESSONS } from "@/lib/boating-course-curriculum"
import { getVirginiaBoatingExamQuestions } from "@/lib/virginia-boating-exam"
import type { ExamQuestion } from "@/lib/final-exam"

const BOATING_COURSE_SLUG = "boating-safety"
const PASSING_SCORE = 80
const QUESTION_COUNT = 25
const TIME_LIMIT_SECONDS = 35 * 60
const TAB_SWITCH_WARNING_THRESHOLD = 1

type ExamAttemptRecord = {
  score: number
  passed: boolean
  completedAt: string
}

function getTodayKey() {
  return new Date().toISOString().split("T")[0]
}

function getDateKeyFromIso(value: string) {
  return new Date(value).toISOString().split("T")[0]
}

function formatTimeRemaining(totalSeconds: number) {
  const safeSeconds = Math.max(0, totalSeconds)
  const minutes = Math.floor(safeSeconds / 60)
  const seconds = safeSeconds % 60
  return `${minutes}:${String(seconds).padStart(2, "0")}`
}

function getRetakeEligibleAt(completedAt: string) {
  const next = new Date(completedAt)
  next.setHours(next.getHours() + 24)
  return next
}

function formatRetakeEligibleAt(completedAt: string) {
  return getRetakeEligibleAt(completedAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

function mapExamResultToAttemptRecord(row: ExamResultRow): ExamAttemptRecord {
  return {
    score: row.score,
    passed: row.passed,
    completedAt: row.completed_at,
  }
}

export default function VirginiaBoatingExamPage() {
  const [loading, setLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const [progress, setProgress] = useState<CourseProgressRow[]>([])
  const [questions, setQuestions] = useState<ExamQuestion[]>([])
  const [answers, setAnswers] = useState<number[]>([])
  const [started, setStarted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [saveError, setSaveError] = useState("")
  const [lastAttempt, setLastAttempt] = useState<ExamAttemptRecord | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(TIME_LIMIT_SECONDS)
  const [timeExpired, setTimeExpired] = useState(false)
  const [integrityConfirmed, setIntegrityConfirmed] = useState(false)
  const [tabSwitchCount, setTabSwitchCount] = useState(0)
  const todayKey = getTodayKey()

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      try {
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
        setLastAttempt(latestExam ? mapExamResultToAttemptRecord(latestExam) : null)
      } catch (error) {
        console.error("Could not load Virginia boating exam:", error)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    void loadData()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!started || submitted) {
      return
    }

    const timer = window.setInterval(() => {
      setTimeRemaining((current) => {
        if (current <= 1) {
          window.clearInterval(timer)
          setTimeExpired(true)
          return 0
        }

        return current - 1
      })
    }, 1000)

    return () => {
      window.clearInterval(timer)
    }
  }, [started, submitted])

  useEffect(() => {
    if (!started || submitted) {
      return
    }

    function handleBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault()
      event.returnValue = ""
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        setTabSwitchCount((current) => current + 1)
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [started, submitted])

  const allLessonsCompleted = useMemo(
    () => BOATING_LESSONS.every((lesson) => isLessonCompleted(progress, lesson.slug)),
    [progress]
  )
  const answeredCount = useMemo(
    () => answers.filter((answer) => answer >= 0).length,
    [answers]
  )
  const attemptedToday =
    lastAttempt && getDateKeyFromIso(lastAttempt.completedAt) === todayKey
  const passedAttempt = Boolean(lastAttempt?.passed)

  const persistExamResult = useCallback(async (nextAnswers: number[]) => {
    const correctCount = questions.reduce((count, question, index) => {
      return count + (nextAnswers[index] === question.correctIndex ? 1 : 0)
    }, 0)
    const score = Math.round((correctCount / questions.length) * 100)
    const passed = score >= PASSING_SCORE

    const saved = await saveExamResult({
      state: "virginia",
      courseSlug: BOATING_COURSE_SLUG,
      score,
      passed,
      answers: nextAnswers,
    })

    const record = mapExamResultToAttemptRecord(saved)
    setLastAttempt(record)
    setSubmitted(true)
    setStarted(false)
  }, [questions])

  async function handleStartExam() {
    setSaveError("")

    if (!integrityConfirmed) {
      setSaveError("Please confirm the final exam rules before you start.")
      return
    }

    if (attemptedToday && !passedAttempt) {
      return
    }

    const attemptedTodayFromServer = await hasExamAttemptOnDate(
      "virginia",
      todayKey,
      BOATING_COURSE_SLUG
    )

    if (attemptedTodayFromServer && !passedAttempt) {
      setSaveError("You can try the Virginia boating final exam again after 24 hours.")
      return
    }

    const nextQuestions = getVirginiaBoatingExamQuestions(QUESTION_COUNT)
    setQuestions(nextQuestions)
    setAnswers(new Array(nextQuestions.length).fill(-1))
    setTimeRemaining(TIME_LIMIT_SECONDS)
    setTimeExpired(false)
    setSubmitted(false)
    setTabSwitchCount(0)
    setStarted(true)
  }

  async function handleSubmitExam() {
    if (saving || submitted || questions.length === 0) {
      return
    }

    if (!timeExpired && answeredCount < questions.length) {
      setSaveError("Please answer every question before submitting.")
      return
    }

    try {
      setSaving(true)
      setSaveError("")
      await persistExamResult(answers)
    } catch (error) {
      console.error("Could not save Virginia boating exam:", error)
      setSaveError("We could not save your exam right now. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    if (!timeExpired || submitted || saving || questions.length === 0) {
      return
    }

    const normalizedAnswers = answers.map((answer) => (answer >= 0 ? answer : -1))
    void (async () => {
      try {
        setSaving(true)
        setSaveError("")
        await persistExamResult(normalizedAnswers)
      } catch (error) {
        console.error("Could not auto-submit Virginia boating exam:", error)
        setSaveError("Time expired, but we could not save your exam. Please contact support.")
      } finally {
        setSaving(false)
      }
    })()
  }, [answers, persistExamResult, questions.length, saving, submitted, timeExpired])

  if (loading) {
    return (
      <main className="public-shell min-h-screen">
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            Loading Virginia boating final exam...
          </div>
        </section>
      </main>
    )
  }

  if (!hasAccess) {
    return (
      <main className="public-shell min-h-screen">
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-semibold text-slate-950">Course access required</h1>
            <p className="mt-4 leading-7 text-slate-600">
              Purchase the Virginia boating course before taking the final exam.
            </p>
            <Link
              href="/virginia-boating/pricing"
              className="mt-6 inline-flex rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800"
            >
              View plans
            </Link>
          </div>
        </section>
      </main>
    )
  }

  if (!allLessonsCompleted) {
    return (
      <main className="public-shell min-h-screen">
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-semibold text-slate-950">Finish the lessons first</h1>
            <p className="mt-4 leading-7 text-slate-600">
              Complete all Virginia boating lessons before opening the final exam.
            </p>
            <Link
              href="/virginia-boating/learn"
              className="mt-6 inline-flex rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800"
            >
              Return to lessons
            </Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="public-shell min-h-screen">
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="section-label">Virginia Boating Final Exam</div>
          <h1 className="text-4xl font-semibold text-slate-950">Final assessment</h1>

          {lastAttempt ? (
            <div
              className={`rounded-2xl border p-5 ${
                lastAttempt.passed
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-amber-200 bg-amber-50"
              }`}
            >
              <div className="text-sm font-semibold uppercase tracking-wide">
                {lastAttempt.passed ? "Passed" : "Latest attempt"}
              </div>
              <p className="mt-2 leading-7 text-slate-700">
                Score: {lastAttempt.score}% on{" "}
                {new Date(lastAttempt.completedAt).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
                .
              </p>
              {lastAttempt.passed ? (
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/virginia-boating/certificate"
                    className="rounded-xl bg-sky-700 px-4 py-2 font-semibold text-white hover:bg-sky-800"
                  >
                    View certificate
                  </Link>
                  <Link
                    href="/virginia-boating/learn"
                    className="rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Review lessons
                  </Link>
                </div>
              ) : attemptedToday ? (
                <p className="mt-3 text-sm text-slate-700">
                  You can retake the exam after{" "}
                  <span className="font-semibold">
                    {formatRetakeEligibleAt(lastAttempt.completedAt)}
                  </span>
                  .
                </p>
              ) : null}
            </div>
          ) : null}

          {!started && !passedAttempt ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-white p-4">
                  <div className="text-sm text-slate-500">Questions</div>
                  <div className="mt-1 text-2xl font-semibold text-slate-950">
                    {QUESTION_COUNT}
                  </div>
                </div>
                <div className="rounded-2xl bg-white p-4">
                  <div className="text-sm text-slate-500">Passing score</div>
                  <div className="mt-1 text-2xl font-semibold text-slate-950">
                    {PASSING_SCORE}%
                  </div>
                </div>
                <div className="rounded-2xl bg-white p-4">
                  <div className="text-sm text-slate-500">Time limit</div>
                  <div className="mt-1 text-2xl font-semibold text-slate-950">
                    35 minutes
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2 text-sm leading-7 text-slate-700">
                <p>Complete the final assessment in one sitting.</p>
                <p>Questions are drawn from a randomized pool and must be completed personally.</p>
                <p>Keep the exam in the active browser window and do not use outside help.</p>
                <p>If you do not pass, wait 24 hours before the next attempt.</p>
              </div>

              <label className="mt-5 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
                <input
                  type="checkbox"
                  checked={integrityConfirmed}
                  onChange={(event) => setIntegrityConfirmed(event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-700 focus:ring-sky-500"
                />
                <span>
                  I will complete this final exam myself, without outside assistance,
                  and I will keep the exam in the active browser window until I submit it.
                </span>
              </label>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/virginia-boating/learn"
                  className="rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Review lessons
                </Link>
                <button
                  onClick={() => void handleStartExam()}
                  disabled={attemptedToday === true || !integrityConfirmed}
                  className="rounded-xl bg-sky-700 px-4 py-2 font-semibold text-white hover:bg-sky-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  Start final exam
                </button>
              </div>
            </div>
          ) : null}

          {saveError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {saveError}
            </div>
          ) : null}

          {started ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-4">
                <div className="text-sm font-semibold text-sky-900">
                  Time remaining: {formatTimeRemaining(timeRemaining)}
                </div>
                <div className="text-sm text-sky-900">
                  Answered: {answeredCount} / {questions.length}
                </div>
              </div>

              {tabSwitchCount >= TAB_SWITCH_WARNING_THRESHOLD ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                  Keep the exam window active until you finish. We detected{" "}
                  <span className="font-semibold">{tabSwitchCount}</span>{" "}
                  {tabSwitchCount === 1 ? "window change" : "window changes"} during
                  this attempt.
                </div>
              ) : null}

              <div className="space-y-4">
                {questions.map((question, index) => (
                  <article
                    key={`${question.id}-${index}`}
                    className="rounded-2xl border border-slate-200 p-6"
                  >
                    <h2 className="text-lg font-semibold text-slate-950">
                      {index + 1}. {question.question}
                    </h2>
                    <div className="mt-4 space-y-3">
                      {question.options.map((option, optionIndex) => {
                        const selected = answers[index] === optionIndex

                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() =>
                              setAnswers((current) => {
                                const next = [...current]
                                next[index] = optionIndex
                                return next
                              })
                            }
                            className={`block w-full rounded-xl border px-4 py-3 text-left text-sm ${
                              selected
                                ? "border-sky-400 bg-sky-100 text-slate-950"
                                : "border-slate-200 bg-slate-50 text-slate-700"
                            }`}
                          >
                            {option}
                          </button>
                        )
                      })}
                    </div>
                  </article>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => void handleSubmitExam()}
                  disabled={saving || submitted}
                  className="rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {saving ? "Submitting..." : "Submit final exam"}
                </button>
              </div>
            </>
          ) : null}
        </div>
      </section>
    </main>
  )
}
