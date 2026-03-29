"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { getCourseAccessStatus } from "@/lib/course-access"
import { getCourseConfig, getLessonLinks } from "@/lib/course-config"
import { getLatestCourseAttempt } from "@/lib/course-seat-time"
import { getUserCourseProgress, isLessonCompleted } from "@/lib/course-progress"
import { getFinalExamQuestions, type ExamQuestion } from "@/lib/final-exam"
import { verifyIdentityAnswer } from "@/lib/identity-verification-utils"
import {
  getLatestExamResult,
  hasExamAttemptOnDate,
  saveExamResult,
  type ExamResultRow,
} from "@/lib/exam-results"
import { isFinalExamSeatTimeBypassed } from "@/lib/dev-config"
import {
  COURSE_TOTAL_REQUIRED_SECONDS,
  FINAL_EXAM_UNLOCK_SECONDS,
  formatCourseDuration,
  getRemainingToCertificate,
  getRemainingToFinalExam,
  isCertificateUnlockedBySeatTime,
  isFinalExamUnlockedBySeatTime,
} from "@/lib/course-timing"
import {
  getStudentIdentityProfile,
  type StudentIdentityProfileRow,
} from "@/lib/student-identity"

type ExamAttemptRecord = {
  date: string
  score: number
  passed: boolean
  completedAt: string
}

type MidExamCheckState = {
  checkpoint: number
  prompt: string
  expectedAnswer: string
  value: string
}

type ExamAcknowledgements = {
  identityConfirmed: boolean
  noOutsideHelp: boolean
  remainOnPage: boolean
  readyToBegin: boolean
}

const FINAL_EXAM_REVIEW_MAP: Record<number, number[]> = {
  1: [3],
  2: [2],
  3: [3],
  4: [7],
  5: [2],
  6: [3],
  7: [2, 5],
  8: [2],
  9: [8],
  10: [7],
  11: [3, 7],
  12: [4],
  13: [3, 7],
  14: [5],
  15: [7],
  16: [3, 7],
  17: [4],
  18: [4],
  19: [3, 8],
  20: [2, 3],
  21: [3, 8],
  22: [2, 8],
  23: [6],
  24: [6, 8],
  25: [7],
  26: [4],
  27: [8],
  28: [8],
  29: [3],
  30: [2, 5],
  31: [5, 6],
  32: [4],
  33: [3, 7],
  34: [7],
  35: [2, 5],
  36: [5],
  37: [5, 6],
  38: [4],
  39: [8],
  40: [8],
  41: [5, 6],
  42: [7],
  43: [5, 8],
  44: [8],
  45: [2, 5],
  46: [6, 7],
  47: [2, 8],
  48: [7],
  49: [2, 5],
  50: [2, 8],
}

const REQUIRED_LESSON_SLUGS = Array.from({ length: 8 }, (_, index) => `lesson-${index + 1}`)

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

function formatSeatTime(totalSeconds: number) {
  const safeSeconds = Math.max(0, totalSeconds)
  const hours = Math.floor(safeSeconds / 3600)
  const minutes = Math.floor((safeSeconds % 3600) / 60)
  const seconds = safeSeconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`
  }

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`
  }

  return `${seconds}s`
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
    date: getDateKeyFromIso(row.completed_at),
    score: row.score,
    passed: row.passed,
    completedAt: row.completed_at,
  }
}

export default function FinalExamPage() {
  const params = useParams()

  const state =
    typeof params?.state === "string" ? params.state : "virginia"

  const config = getCourseConfig(state)
  const todayKey = getTodayKey()
  const seatTimeBypassed = isFinalExamSeatTimeBypassed(state)
  const dailyAttemptLockBypassed = seatTimeBypassed

  const [hasAccess, setHasAccess] = useState<boolean | null>(null)
  const [accessError, setAccessError] = useState("")
  const [allLessonsCompleted, setAllLessonsCompleted] = useState(false)

  const [seatTimeReady, setSeatTimeReady] = useState(false)
  const [seatTimeComplete, setSeatTimeComplete] = useState(false)
  const [seatTimeTotalSeconds, setSeatTimeTotalSeconds] = useState(0)

  const [identity, setIdentity] =
    useState<StudentIdentityProfileRow | null>(null)

  const [verified, setVerified] = useState(false)
  const [verificationAnswers, setVerificationAnswers] = useState({
    q1: "",
    q2: "",
  })
  const [verificationError, setVerificationError] = useState("")
  const [examStarted, setExamStarted] = useState(false)

  const [acknowledgements, setAcknowledgements] =
    useState<ExamAcknowledgements>({
      identityConfirmed: false,
      noOutsideHelp: false,
      remainOnPage: false,
      readyToBegin: false,
    })

  const [questions, setQuestions] = useState<ExamQuestion[]>([])
  const [answers, setAnswers] = useState<number[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [locked, setLocked] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState("")
  const [lastAttempt, setLastAttempt] = useState<ExamAttemptRecord | null>(null)
  const [ready, setReady] = useState(false)

  const [midExamCheck, setMidExamCheck] = useState<MidExamCheckState | null>(
    null
  )
  const [completedCheckpoints, setCompletedCheckpoints] = useState<number[]>([])
  const [tabWarnings, setTabWarnings] = useState(0)

  const [timeRemaining, setTimeRemaining] = useState(45 * 60)
  const [timerStarted, setTimerStarted] = useState(false)
  const [timerExpired, setTimerExpired] = useState(false)
  const [timerPaused, setTimerPaused] = useState(false)

  const checkpoints = useMemo(() => [15, 35], [])
  const effectiveSeatTimeForExam = seatTimeBypassed
    ? COURSE_TOTAL_REQUIRED_SECONDS
    : seatTimeTotalSeconds
  const finalExamUnlockedBySeatTime =
    seatTimeBypassed || isFinalExamUnlockedBySeatTime(effectiveSeatTimeForExam)
  const certificateUnlockedBySeatTime =
    seatTimeBypassed ||
    isCertificateUnlockedBySeatTime(
      seatTimeBypassed ? COURSE_TOTAL_REQUIRED_SECONDS : seatTimeTotalSeconds
    )
  const lessonLinks = useMemo(() => getLessonLinks(state), [state])

  useEffect(() => {
    let isMounted = true

    async function checkAccess() {
      const access = await getCourseAccessStatus(state)

      if (!isMounted) return
      setHasAccess(access.hasPaidAccess)
      setAccessError(access.error ?? "")
    }

    void checkAccess()

    return () => {
      isMounted = false
    }
  }, [state])

  useEffect(() => {
    if (!hasAccess) {
      return
    }

    const loadSeatTime = async () => {
      try {
        const latestAttempt = await getLatestCourseAttempt(state)

        if (!latestAttempt) {
          setSeatTimeTotalSeconds(0)
          setSeatTimeComplete(false)
          return
        }

        const totalSeconds = latestAttempt.total_seconds ?? 0
        const requiredSeconds = latestAttempt.required_seconds ?? 28800
        const complete =
          latestAttempt.status === "completed" ||
          totalSeconds >= requiredSeconds

        setSeatTimeTotalSeconds(totalSeconds)
        setSeatTimeComplete(complete)
      } catch (error) {
        console.error("Unexpected seat time load error:", error)
        setSeatTimeComplete(false)
      } finally {
        setSeatTimeReady(true)
      }
    }

    void loadSeatTime()
  }, [hasAccess, state])

  useEffect(() => {
    if (!hasAccess) {
      return
    }

    const loadPage = async () => {
      try {
        const [dbIdentity, latestResult, hasAttemptToday, progressRows] = await Promise.all([
          getStudentIdentityProfile(state),
          getLatestExamResult(state),
          dailyAttemptLockBypassed
            ? Promise.resolve(false)
            : hasExamAttemptOnDate(state, todayKey),
          getUserCourseProgress(state),
        ])

        setIdentity(dbIdentity)

        if (latestResult) {
          const normalizedAttempt = mapExamResultToAttemptRecord(latestResult)
          setLastAttempt(normalizedAttempt)
        } else {
          setLastAttempt(null)
        }

        setAllLessonsCompleted(
          REQUIRED_LESSON_SLUGS.every((slug) => isLessonCompleted(progressRows, slug))
        )

        if (!dailyAttemptLockBypassed && hasAttemptToday) {
          setLocked(true)
          setSubmitted(true)
        } else {
          setLocked(false)
          setSubmitted(false)
        }
      } catch (error) {
        console.error(error)
        setLocked(false)
        setSubmitted(false)
      } finally {
        setReady(true)
      }
    }

    void loadPage()
  }, [dailyAttemptLockBypassed, hasAccess, state, todayKey])

  const initializeExamQuestions = () => {
    const examQuestions = getFinalExamQuestions(config.finalExamQuestionCount)
    setQuestions(examQuestions)
    setAnswers(Array(examQuestions.length).fill(-1))
    setMidExamCheck(null)
    setCompletedCheckpoints([])
    setTabWarnings(0)
    setTimeRemaining(45 * 60)
    setTimerStarted(false)
    setTimerExpired(false)
    setTimerPaused(false)
    setSubmitted(false)
    setLocked(false)
    setSaveError("")
    setExamStarted(false)
  }

  const handleVerify = () => {
    if (!identity) return

    setVerificationError("")

    const correct1 = verifyIdentityAnswer(
      identity.security_answer_1,
      verificationAnswers.q1
    )

    const correct2 = verifyIdentityAnswer(
      identity.security_answer_2,
      verificationAnswers.q2
    )

    if (!correct1 || !correct2) {
      setVerificationError("Identity verification failed. Please try again.")
      return
    }

    setVerified(true)
    initializeExamQuestions()
  }

  const handleStartExam = () => {
    const allChecked =
      acknowledgements.identityConfirmed &&
      acknowledgements.noOutsideHelp &&
      acknowledgements.remainOnPage &&
      acknowledgements.readyToBegin

    if (!allChecked) {
      return
    }

    setExamStarted(true)
    setTimerStarted(true)
    setTimerExpired(false)
    setTimerPaused(false)
    setSaveError("")
  }

  const openMidExamCheck = useCallback((checkpoint: number) => {
    if (!identity) return

    const useFirstQuestion = checkpoint === 15

    setMidExamCheck({
      checkpoint,
      prompt: useFirstQuestion
        ? identity.security_question_1
        : identity.security_question_2,
      expectedAnswer: useFirstQuestion
        ? identity.security_answer_1
        : identity.security_answer_2,
      value: "",
    })
  }, [identity])

  const handleMidExamCheckSubmit = () => {
    if (!midExamCheck) return

    const ok = verifyIdentityAnswer(
      midExamCheck.expectedAnswer,
      midExamCheck.value
    )

    if (!ok) {
      alert("Identity verification failed")
      return
    }

    setCompletedCheckpoints((prev) => [...prev, midExamCheck.checkpoint])
    setMidExamCheck(null)
  }

  const handleSelect = (qIndex: number, optionIndex: number) => {
    if (
      submitted ||
      locked ||
      saving ||
      !verified ||
      !examStarted ||
      midExamCheck ||
      timerExpired
    ) {
      return
    }

    setAnswers((prev) => {
      const next = [...prev]
      next[qIndex] = optionIndex
      return next
    })
  }

  const answeredCount = answers.filter((value) => value !== -1).length

  const failedReviewLessons = useMemo(() => {
    if (!submitted || !lastAttempt || lastAttempt.passed) {
      return []
    }

    const lessonScores = new Map<number, number>()

    questions.forEach((question, index) => {
      if (answers[index] === question.correctIndex) {
        return
      }

      for (const lessonId of FINAL_EXAM_REVIEW_MAP[question.id] ?? []) {
        lessonScores.set(lessonId, (lessonScores.get(lessonId) ?? 0) + 1)
      }
    })

    return [...lessonScores.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([lessonId]) => lessonLinks.find((lesson) => lesson.id === lessonId))
      .filter((lesson): lesson is NonNullable<typeof lesson> => Boolean(lesson))
  }, [answers, lastAttempt, lessonLinks, questions, submitted])

  useEffect(() => {
    if (
      !verified ||
      !examStarted ||
      submitted ||
      locked ||
      midExamCheck ||
      timerExpired
    ) {
      return
    }

    for (const checkpoint of checkpoints) {
      if (
        answeredCount === checkpoint &&
        !completedCheckpoints.includes(checkpoint)
      ) {
        openMidExamCheck(checkpoint)
        break
      }
    }
  }, [
    answeredCount,
    checkpoints,
    completedCheckpoints,
    examStarted,
    locked,
    midExamCheck,
    openMidExamCheck,
    submitted,
    timerExpired,
    verified,
  ])

  const correctCount = questions.reduce((acc, q, i) => {
    return acc + (answers[i] === q.correctIndex ? 1 : 0)
  }, 0)

  const score =
    questions.length > 0
      ? Math.round((correctCount / questions.length) * 100)
      : 0

  const passed = score >= config.passingScorePercent
  const unanswered = answers.filter((a) => a === -1).length

  const finalizeExam = useCallback(async (override?: { score: number; passed: boolean }) => {
    const finalScore = override?.score ?? score
    const finalPassed = override?.passed ?? passed

    const savedResult = await saveExamResult({
      state,
      score: finalScore,
      passed: finalPassed,
      answers,
    })

    const record = mapExamResultToAttemptRecord(savedResult)

    setLastAttempt(record)
    setSubmitted(true)
    setLocked(!dailyAttemptLockBypassed)
    setTimerStarted(false)
    setTimerPaused(false)
    setExamStarted(false)
  }, [answers, dailyAttemptLockBypassed, passed, score, state])

  useEffect(() => {
    if (
      !verified ||
      !examStarted ||
      submitted ||
      locked ||
      timerExpired
    ) {
      return
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTimerPaused(true)

        setTabWarnings((prev) => {
          const next = prev + 1

          if (next >= 4) {
            void (async () => {
              try {
                setSaving(true)
                setSaveError("")
                await finalizeExam({ score: 0, passed: false })
                alert(
                  "The exam was ended due to repeated navigation away from the exam page."
                )
              } catch (error) {
                console.error(error)
                setSaveError(
                  "The exam ended due to repeated navigation away, but the result could not be saved. Please contact support."
                )
              } finally {
                setSaving(false)
              }
            })()
          } else {
            alert(
              `Warning ${next} of 4: please remain on the exam page during the final exam.`
            )
          }

          return next
        })
      } else {
        setTimerPaused(false)
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [examStarted, finalizeExam, locked, submitted, timerExpired, verified])

  useEffect(() => {
    if (
      !timerStarted ||
      !examStarted ||
      submitted ||
      locked ||
      !verified ||
      saving ||
      midExamCheck ||
      timerExpired ||
      timerPaused
    ) {
      return
    }

    const interval = window.setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          window.clearInterval(interval)
          setTimerExpired(true)
          return 0
        }

        return prev - 1
      })
    }, 1000)

    return () => {
      window.clearInterval(interval)
    }
  }, [
    examStarted,
    locked,
    midExamCheck,
    saving,
    submitted,
    timerExpired,
    timerPaused,
    timerStarted,
    verified,
  ])

  const handleSubmit = async () => {
    if (
      locked ||
      submitted ||
      saving ||
      !verified ||
      !examStarted ||
      midExamCheck ||
      timerExpired
    ) {
      return
    }

    if (unanswered > 0) {
      alert("Please answer all questions")
      return
    }

    setSaving(true)
    setSaveError("")

    try {
      await finalizeExam()
    } catch (error) {
      console.error(error)
      setSaveError("Could not save exam result. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    if (
      !timerExpired ||
      submitted ||
      locked ||
      saving ||
      !verified ||
      !examStarted
    ) {
      return
    }

    const autoSubmit = async () => {
      setSaving(true)
      setSaveError("")

      try {
        await finalizeExam()
      } catch (error) {
        console.error(error)
        setSaveError(
          "Time expired, but the exam could not be saved. Please contact support."
        )
      } finally {
        setSaving(false)
      }
    }

    void autoSubmit()
  }, [examStarted, finalizeExam, locked, saving, submitted, timerExpired, verified])

  if (hasAccess === null) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          Checking final exam access...
        </div>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Final Exam Locked</h1>
          <p className="mt-3 text-slate-600">
            You need to purchase this state course before taking the final exam.
          </p>

          {accessError ? (
            <p className="mt-3 text-sm text-amber-700">{accessError}</p>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={`/${state}/checkout`}
              className="rounded bg-blue-600 px-4 py-2 text-white"
            >
              Purchase Course
            </Link>

            <Link
              href={`/${state}/dashboard`}
              className="rounded bg-slate-200 px-4 py-2 text-slate-900"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!ready || !seatTimeReady) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          Loading final exam...
        </div>
      </div>
    )
  }

  if (!allLessonsCompleted) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold">Final Exam Locked</h1>

        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
          Complete every lesson before the final exam can begin.
        </div>

        <Link
          href={`/${state}/course`}
          className="inline-block rounded bg-blue-600 px-4 py-2 text-white"
        >
          Return to Course
        </Link>
      </div>
    )
  }

  if (!finalExamUnlockedBySeatTime) {
    const remainingSeconds = getRemainingToFinalExam(effectiveSeatTimeForExam)

    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold">Final Exam Locked</h1>

        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
          You must complete all lessons and at least 7 hours of course instruction before taking the final exam.
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Approved seat time</div>
          <div className="mt-1 text-xl font-semibold text-slate-900">
            {formatSeatTime(seatTimeTotalSeconds)}
          </div>

          <div className="mt-4 text-sm text-slate-500">Final exam unlock point</div>
          <div className="mt-1 text-xl font-semibold text-slate-900">
            {formatCourseDuration(FINAL_EXAM_UNLOCK_SECONDS)}
          </div>

          <div className="mt-4 text-sm text-slate-500">Remaining</div>
          <div className="mt-1 text-xl font-semibold text-slate-900">
            {formatCourseDuration(remainingSeconds)}
          </div>
        </div>

        <Link
          href={`/${state}/course`}
          className="inline-block rounded bg-blue-600 px-4 py-2 text-white"
        >
          Return to Course
        </Link>
      </div>
    )
  }

  if (!identity) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Final Exam</h1>

        {seatTimeBypassed && !seatTimeComplete && (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
            Dev bypass is ON. Final exam seat-time lock is temporarily bypassed for testing.
          </div>
        )}

        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
          Identity setup is required before the final exam can begin.
        </div>

        <Link href={`/${state}/identity`} className="text-blue-600 underline">
          Go to Identity Setup
        </Link>
      </div>
    )
  }

  if (locked && lastAttempt) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold">Final Exam</h1>

        {seatTimeBypassed && !seatTimeComplete && (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
            Dev bypass is ON. Final exam seat-time lock is temporarily bypassed for testing.
          </div>
        )}

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Today’s attempt</div>
          <div className="mt-2 text-2xl font-bold text-slate-900">
            {lastAttempt.score}%
          </div>
          <div
            className={`mt-2 text-lg font-semibold ${
              lastAttempt.passed ? "text-green-600" : "text-red-600"
            }`}
          >
            {lastAttempt.passed ? "PASSED" : "FAILED"}
          </div>
          <p className="mt-3 text-sm text-slate-600">
            {lastAttempt.passed
              ? certificateUnlockedBySeatTime
                ? "Congratulations. You passed the final exam."
                : `Congratulations. You passed the final exam. Stay in the course for ${formatCourseDuration(
                    getRemainingToCertificate(effectiveSeatTimeForExam)
                  )} more before your certificate can be released.`
              : `We are sorry, you did not pass this attempt. Please wait at least 24 hours before beginning the final exam again. Earliest return time: ${formatRetakeEligibleAt(
                  lastAttempt.completedAt
                )}.`}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {lastAttempt.passed && (
              <>
                <Link
                  href={
                    certificateUnlockedBySeatTime
                      ? `/${state}/certificate`
                      : `/${state}/course`
                  }
                  className="rounded bg-blue-600 px-4 py-2 text-white"
                >
                  {certificateUnlockedBySeatTime
                    ? "View Certificate"
                    : "Return to Course"}
                </Link>
                <Link
                  href={`/${state}/dashboard`}
                  className="rounded bg-slate-200 px-4 py-2 text-slate-900"
                >
                  Return to Dashboard
                </Link>
              </>
            )}

            {!lastAttempt.passed && (
              <>
                <Link
                  href={`/${state}/course`}
                  className="rounded bg-blue-600 px-4 py-2 text-white"
                >
                  Review Course
                </Link>
                <Link
                  href={`/${state}/dashboard`}
                  className="rounded bg-slate-200 px-4 py-2 text-slate-900"
                >
                  Return to Dashboard
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (!verified) {
    return (
      <div className="mx-auto max-w-xl space-y-6">
        <h1 className="text-2xl font-bold">Identity Verification</h1>

        {seatTimeBypassed && !seatTimeComplete && (
          <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
            Dev bypass is ON. Final exam seat-time lock is temporarily bypassed for testing.
          </div>
        )}

        {dailyAttemptLockBypassed && (
          <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
            Dev testing mode is ON. Same-day retake lock is temporarily bypassed for this state.
          </div>
        )}

        {lastAttempt && (
          <div className="rounded border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            Latest saved attempt: {lastAttempt.score}%{" "}
            {lastAttempt.passed ? "(passed)" : "(failed)"}
          </div>
        )}

        <div className="rounded border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">
          Final exam instruction time complete. Verify your identity to unlock the final exam.
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-900">
              {identity.security_question_1}
            </label>
            <input
              className="mt-1 w-full rounded border p-2"
              value={verificationAnswers.q1}
              onChange={(e) =>
                setVerificationAnswers((p) => ({ ...p, q1: e.target.value }))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900">
              {identity.security_question_2}
            </label>
            <input
              className="mt-1 w-full rounded border p-2"
              value={verificationAnswers.q2}
              onChange={(e) =>
                setVerificationAnswers((p) => ({ ...p, q2: e.target.value }))
              }
            />
          </div>

          {verificationError && (
            <div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
              {verificationError}
            </div>
          )}

          <button
            onClick={handleVerify}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Verify Identity
          </button>
        </div>
      </div>
    )
  }

  if (!examStarted) {
    const allChecked =
      acknowledgements.identityConfirmed &&
      acknowledgements.noOutsideHelp &&
      acknowledgements.remainOnPage &&
      acknowledgements.readyToBegin

    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-2xl font-bold">Final Exam Instructions</h1>

        {seatTimeBypassed && !seatTimeComplete && (
          <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
            Dev bypass is ON. Final exam seat-time lock is temporarily bypassed for testing.
          </div>
        )}

        {dailyAttemptLockBypassed && (
          <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
            Dev testing mode is ON. Same-day retake lock is temporarily bypassed for this state.
          </div>
        )}

        {lastAttempt && (
          <div className="rounded border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            Latest saved attempt: {lastAttempt.score}%{" "}
            {lastAttempt.passed ? "(passed)" : "(failed)"}
          </div>
        )}

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-900">
          Identity verified successfully. The final exam opens after at least 7 hours of instruction, but the full 8-hour minimum is still required before your certificate can be released.
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Question count</div>
              <div className="mt-1 text-xl font-semibold text-slate-900">
                {config.finalExamQuestionCount}
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Passing score</div>
              <div className="mt-1 text-xl font-semibold text-slate-900">
                {config.passingScorePercent}%
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Time limit</div>
              <div className="mt-1 text-xl font-semibold text-slate-900">
                45 minutes
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Exam unlock point</div>
              <div className="mt-1 text-xl font-semibold text-slate-900">
                7 hours
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
            <div>• Do not switch tabs or leave the exam page during the exam.</div>
            <div>• The exam may include mid-exam identity verification prompts.</div>
            <div>• All questions must be answered before manual submission.</div>
            <div>• If time expires, the exam will automatically submit.</div>
            <div>• Repeated navigation away from the page ends the exam attempt.</div>
          </div>

          <div className="mt-6 space-y-3">
            <label className="flex items-start gap-3 rounded-lg border border-slate-200 p-3">
              <input
                type="checkbox"
                className="mt-1"
                checked={acknowledgements.identityConfirmed}
                onChange={(e) =>
                  setAcknowledgements((prev) => ({
                    ...prev,
                    identityConfirmed: e.target.checked,
                  }))
                }
              />
              <span className="text-sm text-slate-700">
                I confirm that I am the enrolled student taking this exam.
              </span>
            </label>

            <label className="flex items-start gap-3 rounded-lg border border-slate-200 p-3">
              <input
                type="checkbox"
                className="mt-1"
                checked={acknowledgements.noOutsideHelp}
                onChange={(e) =>
                  setAcknowledgements((prev) => ({
                    ...prev,
                    noOutsideHelp: e.target.checked,
                  }))
                }
              />
              <span className="text-sm text-slate-700">
                I understand that I should complete this exam without outside assistance.
              </span>
            </label>

            <label className="flex items-start gap-3 rounded-lg border border-slate-200 p-3">
              <input
                type="checkbox"
                className="mt-1"
                checked={acknowledgements.remainOnPage}
                onChange={(e) =>
                  setAcknowledgements((prev) => ({
                    ...prev,
                    remainOnPage: e.target.checked,
                  }))
                }
              />
              <span className="text-sm text-slate-700">
                I understand that leaving the exam page may trigger warnings or end the attempt.
              </span>
            </label>

            <label className="flex items-start gap-3 rounded-lg border border-slate-200 p-3">
              <input
                type="checkbox"
                className="mt-1"
                checked={acknowledgements.readyToBegin}
                onChange={(e) =>
                  setAcknowledgements((prev) => ({
                    ...prev,
                    readyToBegin: e.target.checked,
                  }))
                }
              />
              <span className="text-sm text-slate-700">
                I am ready to begin the final exam now.
              </span>
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/${state}/course`}
              className="rounded bg-slate-200 px-4 py-2 text-slate-900"
            >
              Back to Course
            </Link>

            <button
              onClick={handleStartExam}
              disabled={!allChecked}
              className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
            >
              Start Final Exam
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Final Exam</h1>

        {seatTimeBypassed && !seatTimeComplete && (
          <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
            Dev bypass is ON. Final exam seat-time lock is temporarily bypassed for testing.
          </div>
        )}

        {dailyAttemptLockBypassed && (
          <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
            Dev testing mode is ON. Same-day retake lock is temporarily bypassed for this state.
          </div>
        )}

        <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
          Do not switch tabs or leave the exam page. Warnings: {tabWarnings}/4
        </div>

        <div className="rounded border border-blue-300 bg-blue-50 p-3 text-sm font-semibold text-blue-800">
          Time remaining: {formatTimeRemaining(timeRemaining)}
          {timerPaused && (
            <span className="ml-2 text-amber-700">(paused while away)</span>
          )}
        </div>

        {!submitted && (
          <button
            onClick={handleSubmit}
            disabled={saving || Boolean(midExamCheck) || timerExpired}
            className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-60"
          >
            {saving ? "Submitting..." : "Submit Exam"}
          </button>
        )}

        {saveError && (
          <div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
            {saveError}
          </div>
        )}

        {submitted && lastAttempt && (
          <div className="rounded-xl border bg-white p-4 shadow">
            <div className="text-lg font-semibold">Score: {lastAttempt.score}%</div>

            <div
              className={`font-bold ${
                lastAttempt.passed ? "text-green-600" : "text-red-600"
              }`}
            >
              {lastAttempt.passed ? "PASSED" : "FAILED"}
            </div>

            {lastAttempt.passed ? (
              <div className="mt-4 space-y-4">
                {certificateUnlockedBySeatTime ? (
                  <div className="rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-800">
                    Congratulations. You passed the final exam. Your next step is to view your certificate.
                  </div>
                ) : (
                  <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
                    Congratulations. You passed the final exam. Stay in the course for{" "}
                    <span className="font-semibold">
                      {formatCourseDuration(
                        getRemainingToCertificate(effectiveSeatTimeForExam)
                      )}
                    </span>{" "}
                    more before your certificate can be released at the full 8-hour minimum.
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={
                      certificateUnlockedBySeatTime
                        ? `/${state}/certificate`
                        : `/${state}/course`
                    }
                    className="inline-block rounded bg-blue-600 px-4 py-2 text-white"
                  >
                    {certificateUnlockedBySeatTime
                      ? "View Certificate"
                      : "Return to Course"}
                  </Link>
                  <Link
                    href={`/${state}/dashboard`}
                    className="rounded bg-slate-200 px-4 py-2 text-slate-900"
                  >
                    Return to Dashboard
                  </Link>
                </div>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
                  We are sorry, you did not pass this attempt. Please wait at least 24 hours before beginning the final exam again. Earliest return time:{" "}
                  <span className="font-semibold">
                    {formatRetakeEligibleAt(lastAttempt.completedAt)}
                  </span>
                  .
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                  Next steps: review the course material, return to your dashboard, and come back after the retake time if another attempt is allowed.
                </div>

                {failedReviewLessons.length > 0 && (
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900">
                    <div className="font-semibold">Suggested lessons to review</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {failedReviewLessons.map((lesson) => (
                        <Link
                          key={lesson.id}
                          href={lesson.href}
                          className="rounded-full border border-blue-300 bg-white px-3 py-1.5 text-blue-900"
                        >
                          {lesson.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/${state}/course`}
                    className="rounded bg-blue-600 px-4 py-2 text-white"
                  >
                    Review Course
                  </Link>

                  <Link
                    href={`/${state}/dashboard`}
                    className="rounded bg-slate-200 px-4 py-2 text-slate-900"
                  >
                    Return to Dashboard
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="rounded border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
          Answered: {answeredCount} / {questions.length}
        </div>

        <div className="space-y-4">
          {questions.map((q, i) => (
            <div key={`${q.id}-${i}`} className="rounded border p-4">
              <div className="font-semibold">
                {i + 1}. {q.question}
              </div>

              {q.options.map((opt, j) => {
                const selected = answers[i] === j

                return (
                  <button
                    key={j}
                    onClick={() => handleSelect(i, j)}
                    disabled={
                      submitted ||
                      saving ||
                      Boolean(midExamCheck) ||
                      timerExpired
                    }
                    className={`mt-1 block w-full rounded border p-2 text-left ${
                      selected ? "border-blue-400 bg-blue-100" : ""
                    }`}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        {!submitted && (
          <div className="flex justify-center pt-6">
            <button
              onClick={handleSubmit}
              disabled={saving || Boolean(midExamCheck) || timerExpired}
              className="rounded bg-blue-600 px-6 py-3 text-lg font-semibold text-white disabled:opacity-60"
            >
              {saving ? "Submitting..." : "Submit Exam"}
            </button>
          </div>
        )}
      </div>

      {midExamCheck && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="text-lg font-bold text-slate-900">
              Identity Check Required
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Please answer this verification question before continuing.
            </p>

            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-900">
                {midExamCheck.prompt}
              </label>
              <input
                className="mt-2 w-full rounded border p-2"
                value={midExamCheck.value}
                onChange={(e) =>
                  setMidExamCheck((prev) =>
                    prev ? { ...prev, value: e.target.value } : prev
                  )
                }
              />
            </div>

            <button
              type="button"
              onClick={handleMidExamCheckSubmit}
              className="mt-4 w-full rounded bg-blue-600 px-4 py-2 text-white"
            >
              Continue Exam
            </button>
          </div>
        </div>
      )}
    </>
  )
}
