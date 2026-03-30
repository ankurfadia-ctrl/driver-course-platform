"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { getCourseAccessStatus } from "@/lib/course-access"
import { getCourseConfig, getLessonLinks } from "@/lib/course-config"
import { getLatestCourseAttempt } from "@/lib/course-seat-time"
import { getUserCourseProgress, isLessonCompleted } from "@/lib/course-progress"
import {
  getFinalExamQuestions,
  getRandomExamQuestionsFromBank,
  type ExamQuestion,
} from "@/lib/final-exam"
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
import { useSeatTimeTracker } from "@/lib/course/seat-time/useSeatTimeTracker"
import {
  getStudentIdentityProfile,
  type StudentIdentityProfileRow,
} from "@/lib/student-identity"
import { usePreferredSiteLanguageClient } from "@/lib/site-language-client"

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

function formatRetakeEligibleAt(completedAt: string, locale = "en-US") {
  return getRetakeEligibleAt(completedAt).toLocaleString(locale, {
    localeMatcher: "best fit",
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
  const language = usePreferredSiteLanguageClient()

  const state =
    typeof params?.state === "string" ? params.state : "virginia"

  const config = getCourseConfig(state)
  const enrollmentOpen = config.enrollmentOpen
  const copy = useMemo(
    () =>
      language === "es"
      ? {
          checkingAccess: "Cargando acceso al examen final...",
          finalExamLocked: "Examen final bloqueado",
          purchaseNeeded: "Debes comprar este curso estatal antes de tomar el examen final.",
          purchaseCourse: "Comprar curso",
          dashboard: "Volver al panel",
          loadingExam: "Cargando examen final...",
          completeLessonsFirst: "Completa todas las lecciones antes de comenzar el examen final.",
          returnToCourse: "Volver al curso",
          seatTimeRequired: "Debes completar todas las lecciones y al menos 7 horas de instruccion antes de tomar el examen final.",
          approvedSeatTime: "Tiempo aprobado",
          unlockPoint: "Punto de desbloqueo del examen final",
          remaining: "Tiempo restante",
          finalExam: "Examen final",
          devBypass: "El modo de prueba esta activo. El bloqueo por tiempo del examen final esta temporalmente desactivado para pruebas.",
          dailyBypass: "El modo de prueba esta activo. El bloqueo de reintento del mismo dia esta temporalmente desactivado para este estado.",
          identitySetupRequired: "Se requiere configuracion de identidad antes de comenzar el examen final.",
          goToIdentity: "Ir a configuracion de identidad",
          todaysAttempt: "Intento de hoy",
          latestAttempt: "Ultimo intento guardado",
          passedShort: "APROBADO",
          failedShort: "NO APROBADO",
          passedMessage: "Felicidades. Aprobaste el examen final.",
          passedWaitMessagePrefix: "Felicidades. Aprobaste el examen final. Permanece en el curso por",
          passedWaitMessageSuffix: "mas antes de que tu certificado pueda liberarse.",
          failedMessagePrefix: "Lo sentimos. No aprobaste este intento. Espera al menos 24 horas antes de comenzar el examen final otra vez. Hora mas temprana para regresar:",
          viewCertificate: "Ver certificado",
          reviewCourse: "Repasar curso",
          identityVerification: "Verificacion de identidad",
          identityUnlock: "El tiempo de instruccion previo al examen ya esta completo. Verifica tu identidad para desbloquear el examen final. El tiempo en esta pagina del examen cuenta para el minimo total de 8 horas.",
          forgotIdentity: "Si olvidaste tus respuestas de identidad, vuelve a la configuracion de identidad y actualizalas antes de comenzar el examen final.",
          verifyIdentity: "Verificar identidad",
          updateAnswers: "Actualizar respuestas de identidad",
          examInstructions: "Instrucciones del examen final",
          identityVerified: "La identidad fue verificada correctamente. El examen final se abre despues de al menos 7 horas de instruccion, y el tiempo en esta pagina cuenta para el minimo total de 8 horas. El certificado sigue bloqueado hasta completar las 8 horas.",
          questionCount: "Numero de preguntas",
          passingScore: "Puntuacion para aprobar",
          timeLimit: "Limite de tiempo",
          examUnlockPoint: "Punto de desbloqueo del examen",
          fortyFiveMinutes: "45 minutos",
          sevenHours: "7 horas",
          instructionBullets: [
            "No cambies de pestaña ni salgas de la pagina del examen durante la prueba.",
            "El examen puede incluir verificaciones de identidad durante la prueba.",
            "Debes responder todas las preguntas antes de enviarlo manualmente.",
            "Si se acaba el tiempo, el examen se enviara automaticamente.",
            "Salir repetidamente de la pagina termina el intento del examen.",
          ],
          ackIdentity: "Confirmo que soy el estudiante inscrito que esta tomando este examen.",
          ackNoHelp: "Entiendo que debo completar este examen sin ayuda externa.",
          ackStay: "Entiendo que salir de la pagina del examen puede generar advertencias o terminar el intento.",
          ackReady: "Estoy listo para comenzar el examen final ahora.",
          startExam: "Comenzar examen final",
          doNotLeave: "No cambies de pestaña ni salgas de la pagina del examen.",
          warnings: "Advertencias",
          timeRemaining: "Tiempo restante",
          pausedWhileAway: "en pausa mientras estabas fuera",
          submitting: "Enviando...",
          submitExam: "Enviar examen",
          score: "Puntuacion",
          nextSteps: "Proximos pasos: repasa el material del curso, vuelve a tu panel y regresa despues de la hora de reintento si se permite otro intento.",
          suggestedLessons: "Lecciones sugeridas para repasar",
          answered: "Respondidas",
          identityCheckRequired: "Se requiere verificacion de identidad",
          answerVerification: "Responde esta pregunta de verificacion antes de continuar.",
          continueExam: "Continuar examen",
          verifyFailed: "La verificacion de identidad fallo. Intentalo otra vez.",
          answerAll: "Responde todas las preguntas.",
          tabWarning: (next: number) =>
            `Advertencia ${next} de 4: permanece en la pagina del examen final.`,
          examEndedAway:
            "El examen termino por alejarte repetidamente de la pagina del examen.",
          examEndedSaveError:
            "El examen termino por alejarte repetidamente, pero no se pudo guardar el resultado. Comunicate con soporte.",
          timeoutSaveError:
            "El tiempo se acabo, pero no se pudo guardar el examen. Comunicate con soporte.",
        }
      : {
          checkingAccess: "Checking final exam access...",
          finalExamLocked: "Final Exam Locked",
          purchaseNeeded: "You need to purchase this state course before taking the final exam.",
          purchaseCourse: "Purchase Course",
          dashboard: "Return to Dashboard",
          loadingExam: "Loading final exam...",
          completeLessonsFirst: "Complete every lesson before the final exam can begin.",
          returnToCourse: "Return to Course",
          seatTimeRequired: "You must complete all lessons and at least 7 hours of course instruction before taking the final exam.",
          approvedSeatTime: "Approved seat time",
          unlockPoint: "Final exam unlock point",
          remaining: "Remaining",
          finalExam: "Final Exam",
          devBypass: "Dev bypass is ON. Final exam seat-time lock is temporarily bypassed for testing.",
          dailyBypass: "Dev testing mode is ON. Same-day retake lock is temporarily bypassed for this state.",
          identitySetupRequired: "Identity setup is required before the final exam can begin.",
          goToIdentity: "Go to Identity Setup",
          todaysAttempt: "Today's attempt",
          latestAttempt: "Latest saved attempt",
          passedShort: "PASSED",
          failedShort: "FAILED",
          passedMessage: "Congratulations. You passed the final exam.",
          passedWaitMessagePrefix: "Congratulations. You passed the final exam. Stay in the course for",
          passedWaitMessageSuffix: "more before your certificate can be released.",
          failedMessagePrefix: "We are sorry, you did not pass this attempt. Please wait at least 24 hours before beginning the final exam again. Earliest return time:",
          viewCertificate: "View Certificate",
          reviewCourse: "Review Course",
          identityVerification: "Identity Verification",
          identityUnlock: "Final exam instruction time complete. Verify your identity to unlock the final exam. Time spent on this final exam page counts toward the full 8-hour course minimum.",
          forgotIdentity: "If you forgot your identity answers, return to identity setup and update them before beginning the final exam.",
          verifyIdentity: "Verify Identity",
          updateAnswers: "Update Identity Answers",
          examInstructions: "Final Exam Instructions",
          identityVerified: "Identity verified successfully. The final exam opens after at least 7 hours of instruction, and time spent on this exam page counts toward the full 8-hour minimum. Your certificate still stays locked until the full 8 hours is complete.",
          questionCount: "Question count",
          passingScore: "Passing score",
          timeLimit: "Time limit",
          examUnlockPoint: "Exam unlock point",
          fortyFiveMinutes: "45 minutes",
          sevenHours: "7 hours",
          instructionBullets: [
            "Do not switch tabs or leave the exam page during the exam.",
            "The exam may include mid-exam identity verification prompts.",
            "All questions must be answered before manual submission.",
            "If time expires, the exam will automatically submit.",
            "Repeated navigation away from the page ends the exam attempt.",
          ],
          ackIdentity: "I confirm that I am the enrolled student taking this exam.",
          ackNoHelp: "I understand that I should complete this exam without outside assistance.",
          ackStay: "I understand that leaving the exam page may trigger warnings or end the attempt.",
          ackReady: "I am ready to begin the final exam now.",
          startExam: "Start Final Exam",
          doNotLeave: "Do not switch tabs or leave the exam page.",
          warnings: "Warnings",
          timeRemaining: "Time remaining",
          pausedWhileAway: "paused while away",
          submitting: "Submitting...",
          submitExam: "Submit Exam",
          score: "Score",
          nextSteps: "Next steps: review the course material, return to your dashboard, and come back after the retake time if another attempt is allowed.",
          suggestedLessons: "Suggested lessons to review",
          answered: "Answered",
          identityCheckRequired: "Identity Check Required",
          answerVerification: "Please answer this verification question before continuing.",
          continueExam: "Continue Exam",
          verifyFailed: "Identity verification failed. Please try again.",
          answerAll: "Please answer all questions",
          tabWarning: (next: number) =>
            `Warning ${next} of 4: please remain on the exam page during the final exam.`,
          examEndedAway:
            "The exam was ended due to repeated navigation away from the exam page.",
          examEndedSaveError:
            "The exam ended due to repeated navigation away, but the result could not be saved. Please contact support.",
          timeoutSaveError:
            "Time expired, but the exam could not be saved. Please contact support.",
        },
    [language]
  )
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
  const [translatedQuestionBank, setTranslatedQuestionBank] = useState<ExamQuestion[] | null>(null)
  const [translationReady, setTranslationReady] = useState(language !== "es")
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

  const seatTimeTracker = useSeatTimeTracker({
    stateCode: state,
    lessonNumber: 9,
    pagePath: `/${state}/course/final-exam`,
    requiredSeconds: COURSE_TOTAL_REQUIRED_SECONDS,
    enabled: Boolean(hasAccess),
  })

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
    let cancelled = false

    async function loadSpanishExam() {
      if (language !== "es") {
        setTranslatedQuestionBank(null)
        setTranslationReady(true)
        return
      }

      setTranslationReady(false)

      try {
        const response = await fetch("/api/course-translation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            kind: "exam",
          }),
        })

        const data = (await response.json()) as {
          ok?: boolean
          translation?: ExamQuestion[]
        }

        if (!cancelled && data.ok && data.translation) {
          setTranslatedQuestionBank(data.translation)
        }
      } catch (error) {
        console.error("Could not load Spanish exam translation:", error)
        if (!cancelled) {
          setTranslatedQuestionBank(null)
        }
      } finally {
        if (!cancelled) {
          setTranslationReady(true)
        }
      }
    }

    void loadSpanishExam()

    return () => {
      cancelled = true
    }
  }, [language])

  useEffect(() => {
    if (seatTimeTracker.totalSeconds > 0) {
      setSeatTimeTotalSeconds(seatTimeTracker.totalSeconds)
      setSeatTimeComplete(seatTimeTracker.isCompleted)
      setSeatTimeReady(true)
    }
  }, [seatTimeTracker.isCompleted, seatTimeTracker.totalSeconds])

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
    const examQuestions =
      language === "es" && translatedQuestionBank
        ? getRandomExamQuestionsFromBank(
            translatedQuestionBank,
            config.finalExamQuestionCount
          )
        : getFinalExamQuestions(config.finalExamQuestionCount)
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
      setVerificationError(copy.verifyFailed)
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
      alert(copy.verifyFailed)
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
                alert(copy.examEndedAway)
              } catch (error) {
                console.error(error)
                setSaveError(
                  copy.examEndedSaveError
                )
              } finally {
                setSaving(false)
              }
            })()
          } else {
            alert(copy.tabWarning(next))
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
  }, [copy, examStarted, finalizeExam, locked, submitted, timerExpired, verified])

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
      alert(copy.answerAll)
      return
    }

    setSaving(true)
    setSaveError("")

    try {
      await finalizeExam()
    } catch (error) {
      console.error(error)
      setSaveError(
        language === "es"
          ? "No se pudo guardar el resultado del examen. Intentalo de nuevo."
          : "Could not save exam result. Please try again."
      )
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
            copy.timeoutSaveError
        )
      } finally {
        setSaving(false)
      }
    }

    void autoSubmit()
  }, [
    copy.timeoutSaveError,
    examStarted,
    finalizeExam,
    locked,
    saving,
    submitted,
    timerExpired,
    verified,
  ])

  if (!enrollmentOpen) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            {config.stateName} Final Exam
          </div>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            {language === "es"
              ? `El examen final de ${config.stateName} aun no esta disponible`
              : `${config.stateName} final exam is not available yet`}
          </h1>
        </div>
        <p className="leading-7 text-slate-600">
          {language === "es"
            ? `Este estado sigue en preparacion. El examen final se publicara solo despues de que el contenido, el flujo del certificado y los requisitos regulatorios esten listos.`
            : `This state is still in preparation. The final exam will open only after the course content, certificate flow, and regulator-facing requirements are ready.`}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${state}/disclosures`}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            {language === "es" ? "Leer informacion del curso" : "Read course information"}
          </Link>
          <Link
            href={`/${state}`}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
          >
            {language === "es" ? `Volver a ${config.stateName}` : `Back to ${config.stateName}`}
          </Link>
        </div>
      </div>
    )
  }

  if (hasAccess === null || !translationReady) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          {copy.checkingAccess}
        </div>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">{copy.finalExamLocked}</h1>
          <p className="mt-3 text-slate-600">
            {copy.purchaseNeeded}
          </p>

          {accessError ? (
            <p className="mt-3 text-sm text-amber-700">{accessError}</p>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={`/${state}/checkout`}
              className="rounded bg-blue-600 px-4 py-2 text-white"
            >
              {copy.purchaseCourse}
            </Link>

            <Link
              href={`/${state}/dashboard`}
              className="rounded bg-slate-200 px-4 py-2 text-slate-900"
            >
              {copy.dashboard}
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
          {copy.loadingExam}
        </div>
      </div>
    )
  }

  if (!allLessonsCompleted) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold">{copy.finalExamLocked}</h1>

        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
          {copy.completeLessonsFirst}
        </div>

        <Link
          href={`/${state}/course`}
          className="inline-block rounded bg-blue-600 px-4 py-2 text-white"
        >
          {copy.returnToCourse}
        </Link>
      </div>
    )
  }

  if (!finalExamUnlockedBySeatTime) {
    const remainingSeconds = getRemainingToFinalExam(effectiveSeatTimeForExam)

    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold">{copy.finalExamLocked}</h1>

        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
          {copy.seatTimeRequired}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">{copy.approvedSeatTime}</div>
          <div className="mt-1 text-xl font-semibold text-slate-900">
            {formatSeatTime(seatTimeTotalSeconds)}
          </div>

          <div className="mt-4 text-sm text-slate-500">{copy.unlockPoint}</div>
          <div className="mt-1 text-xl font-semibold text-slate-900">
            {formatCourseDuration(FINAL_EXAM_UNLOCK_SECONDS)}
          </div>

          <div className="mt-4 text-sm text-slate-500">{copy.remaining}</div>
          <div className="mt-1 text-xl font-semibold text-slate-900">
            {formatCourseDuration(remainingSeconds)}
          </div>
        </div>

        <Link
          href={`/${state}/course`}
          className="inline-block rounded bg-blue-600 px-4 py-2 text-white"
        >
          {copy.returnToCourse}
        </Link>
      </div>
    )
  }

  if (!identity) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">{copy.finalExam}</h1>

        {seatTimeBypassed && !seatTimeComplete && (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
            {copy.devBypass}
          </div>
        )}

        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
          {copy.identitySetupRequired}
        </div>

        <Link href={`/${state}/identity`} className="text-blue-600 underline">
          {copy.goToIdentity}
        </Link>
      </div>
    )
  }

  if (locked && lastAttempt) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold">{copy.finalExam}</h1>

        {seatTimeBypassed && !seatTimeComplete && (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
            {copy.devBypass}
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
            {lastAttempt.passed ? copy.passedShort : copy.failedShort}
          </div>
          <p className="mt-3 text-sm text-slate-600">
            {lastAttempt.passed
              ? certificateUnlockedBySeatTime
                ? copy.passedMessage
                : `${copy.passedWaitMessagePrefix} ${formatCourseDuration(
                    getRemainingToCertificate(effectiveSeatTimeForExam)
                  )} ${copy.passedWaitMessageSuffix}`
              : `${copy.failedMessagePrefix} ${formatRetakeEligibleAt(
                  lastAttempt.completedAt,
                  language === "es" ? "es-US" : "en-US"
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
                    ? copy.viewCertificate
                    : copy.returnToCourse}
                </Link>
                <Link
                  href={`/${state}/dashboard`}
                  className="rounded bg-slate-200 px-4 py-2 text-slate-900"
                >
                  {copy.dashboard}
                </Link>
              </>
            )}

            {!lastAttempt.passed && (
              <>
                <Link
                  href={`/${state}/course`}
                  className="rounded bg-blue-600 px-4 py-2 text-white"
                >
                  {copy.reviewCourse}
                </Link>
                <Link
                  href={`/${state}/dashboard`}
                  className="rounded bg-slate-200 px-4 py-2 text-slate-900"
                >
                  {copy.dashboard}
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
        <h1 className="text-2xl font-bold">{copy.identityVerification}</h1>

        {seatTimeBypassed && !seatTimeComplete && (
          <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
            {copy.devBypass}
          </div>
        )}

        {dailyAttemptLockBypassed && (
          <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
            {copy.dailyBypass}
          </div>
        )}

        {lastAttempt && (
          <div className="rounded border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            {copy.latestAttempt}: {lastAttempt.score}%{" "}
            {lastAttempt.passed ? `(${copy.passedShort.toLowerCase()})` : `(${copy.failedShort.toLowerCase()})`}
          </div>
        )}

        <div className="rounded border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">
          {copy.identityUnlock}
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

          <div className="rounded border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
            {copy.forgotIdentity}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleVerify}
              className="rounded bg-blue-600 px-4 py-2 text-white"
            >
              {copy.verifyIdentity}
            </button>

            <Link
              href={`/${state}/identity`}
              className="rounded border border-slate-300 px-4 py-2 text-slate-900"
            >
              {copy.updateAnswers}
            </Link>
          </div>
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
        <h1 className="text-2xl font-bold">{copy.examInstructions}</h1>

        {seatTimeBypassed && !seatTimeComplete && (
          <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
            {copy.devBypass}
          </div>
        )}

        {dailyAttemptLockBypassed && (
          <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
            {copy.dailyBypass}
          </div>
        )}

        {lastAttempt && (
          <div className="rounded border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            {copy.latestAttempt}: {lastAttempt.score}%{" "}
            {lastAttempt.passed ? `(${copy.passedShort.toLowerCase()})` : `(${copy.failedShort.toLowerCase()})`}
          </div>
        )}

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-900">
          {copy.identityVerified}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">{copy.questionCount}</div>
              <div className="mt-1 text-xl font-semibold text-slate-900">
                {config.finalExamQuestionCount}
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">{copy.passingScore}</div>
              <div className="mt-1 text-xl font-semibold text-slate-900">
                {config.passingScorePercent}%
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">{copy.timeLimit}</div>
              <div className="mt-1 text-xl font-semibold text-slate-900">
                {copy.fortyFiveMinutes}
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">{copy.examUnlockPoint}</div>
              <div className="mt-1 text-xl font-semibold text-slate-900">
                {copy.sevenHours}
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
                {copy.ackIdentity}
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
                {copy.ackNoHelp}
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
                {copy.ackStay}
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
                {copy.ackReady}
              </span>
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/${state}/course`}
              className="rounded bg-slate-200 px-4 py-2 text-slate-900"
            >
              {copy.returnToCourse}
            </Link>

            <button
              onClick={handleStartExam}
              disabled={!allChecked}
              className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
            >
              {copy.startExam}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">{copy.finalExam}</h1>

        {seatTimeBypassed && !seatTimeComplete && (
          <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
            {copy.devBypass}
          </div>
        )}

        {dailyAttemptLockBypassed && (
          <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
            {copy.dailyBypass}
          </div>
        )}

        <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
          {copy.doNotLeave} {copy.warnings}: {tabWarnings}/4
        </div>

        <div className="rounded border border-blue-300 bg-blue-50 p-3 text-sm font-semibold text-blue-800">
          {copy.timeRemaining}: {formatTimeRemaining(timeRemaining)}
          {timerPaused && (
            <span className="ml-2 text-amber-700">({copy.pausedWhileAway})</span>
          )}
        </div>

        {!submitted && (
          <button
            onClick={handleSubmit}
            disabled={saving || Boolean(midExamCheck) || timerExpired}
            className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-60"
          >
            {saving ? copy.submitting : copy.submitExam}
          </button>
        )}

        {saveError && (
          <div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
            {saveError}
          </div>
        )}

        {submitted && lastAttempt && (
          <div className="rounded-xl border bg-white p-4 shadow">
            <div className="text-lg font-semibold">{copy.score}: {lastAttempt.score}%</div>

            <div
              className={`font-bold ${
                lastAttempt.passed ? "text-green-600" : "text-red-600"
              }`}
            >
              {lastAttempt.passed ? copy.passedShort : copy.failedShort}
            </div>

            {lastAttempt.passed ? (
              <div className="mt-4 space-y-4">
                {certificateUnlockedBySeatTime ? (
                  <div className="rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-800">
                    {copy.passedMessage}{" "}
                    {language === "es"
                      ? "Tu siguiente paso es ver tu certificado."
                      : "Your next step is to view your certificate."}
                  </div>
                ) : (
                  <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
                    {copy.passedWaitMessagePrefix}{" "}
                    <span className="font-semibold">
                      {formatCourseDuration(
                        getRemainingToCertificate(effectiveSeatTimeForExam)
                      )}
                    </span>{" "}
                    {language === "es"
                      ? "mas antes de que tu certificado pueda liberarse al cumplir el minimo total de 8 horas."
                      : "more before your certificate can be released at the full 8-hour minimum."}
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
                      ? copy.viewCertificate
                      : copy.returnToCourse}
                  </Link>
                  <Link
                    href={`/${state}/dashboard`}
                    className="rounded bg-slate-200 px-4 py-2 text-slate-900"
                  >
                    {copy.dashboard}
                  </Link>
                </div>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
                  {copy.failedMessagePrefix}{" "}
                  <span className="font-semibold">
                    {formatRetakeEligibleAt(
                      lastAttempt.completedAt,
                      language === "es" ? "es-US" : "en-US"
                    )}
                  </span>
                  .
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                  {copy.nextSteps}
                </div>

                {failedReviewLessons.length > 0 && (
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900">
                    <div className="font-semibold">{copy.suggestedLessons}</div>
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
                    {copy.reviewCourse}
                  </Link>

                  <Link
                    href={`/${state}/dashboard`}
                    className="rounded bg-slate-200 px-4 py-2 text-slate-900"
                  >
                    {copy.dashboard}
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="rounded border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
          {copy.answered}: {answeredCount} / {questions.length}
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
              {saving ? copy.submitting : copy.submitExam}
            </button>
          </div>
        )}
      </div>

      {midExamCheck && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="text-lg font-bold text-slate-900">
              {copy.identityCheckRequired}
            </div>
            <p className="mt-2 text-sm text-slate-600">
              {copy.answerVerification}
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
              {copy.continueExam}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
