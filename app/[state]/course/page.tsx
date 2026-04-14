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
import {
  COURSE_TOTAL_REQUIRED_SECONDS,
  FINAL_EXAM_UNLOCK_SECONDS,
  formatCourseDuration,
  getRemainingToCertificate,
  getRemainingToFinalExam,
  isCertificateUnlockedBySeatTime,
  isFinalExamUnlockedBySeatTime,
} from "@/lib/course-timing"
import { getLatestExamResult } from "@/lib/exam-results"
import { isFinalExamSeatTimeBypassed } from "@/lib/dev-config"
import { getCourseConfig } from "@/lib/course-config"
import { hasStudentIdentityProfile } from "@/lib/student-identity"
import { usePreferredSiteLanguageClient } from "@/lib/site-language-client"

const VIRGINIA_LESSONS_EN = [
  { id: 1, slug: "lesson-1", title: "Lesson 1 - Course Introduction" },
  { id: 2, slug: "lesson-2", title: "Lesson 2 - Defensive Driving Habits" },
  { id: 3, slug: "lesson-3", title: "Lesson 3 - Speed Management and Following Distance" },
  { id: 4, slug: "lesson-4", title: "Lesson 4 - Distraction, Fatigue, and Impairment" },
  { id: 5, slug: "lesson-5", title: "Lesson 5 - Sharing the Road Safely" },
  { id: 6, slug: "lesson-6", title: "Lesson 6 - Virginia Traffic Laws and Consequences" },
  { id: 7, slug: "lesson-7", title: "Lesson 7 - Weather, Night Driving, and Emergencies" },
  { id: 8, slug: "lesson-8", title: "Lesson 8 - Attitude, Risk, and Long-Term Responsibility" },
]

const VIRGINIA_LESSONS_ES = [
  { id: 1, slug: "lesson-1", title: "Lección 1 - Introducción al curso" },
  { id: 2, slug: "lesson-2", title: "Lección 2 - Hábitos de conducción defensiva" },
  { id: 3, slug: "lesson-3", title: "Lección 3 - Control de velocidad y distancia de seguimiento" },
  { id: 4, slug: "lesson-4", title: "Lección 4 - Distracción, fatiga e impedimento" },
  { id: 5, slug: "lesson-5", title: "Lección 5 - Compartir la vía de forma segura" },
  { id: 6, slug: "lesson-6", title: "Lección 6 - Leyes de tránsito de Virginia y consecuencias" },
  { id: 7, slug: "lesson-7", title: "Lección 7 - Clima, conducción nocturna y emergencias" },
  { id: 8, slug: "lesson-8", title: "Lección 8 - Actitud, riesgo y responsabilidad a largo plazo" },
]

function getDefaultLessons(language: "en" | "es") {
  return Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    slug: `lesson-${index + 1}`,
    title:
      language === "es"
        ? `Lección ${index + 1}`
        : `Lesson ${index + 1}`,
  }))
}

export default function StateCoursePage() {
  const params = useParams()

  const state =
    typeof params?.state === "string" ? params.state : "virginia"
  const config = getCourseConfig(state)
  const enrollmentOpen = config.enrollmentOpen
  const language = usePreferredSiteLanguageClient()
  const isVirginia = config.stateSlug === "virginia"
  const lessons =
    language === "es"
      ? isVirginia
        ? VIRGINIA_LESSONS_ES
        : getDefaultLessons("es")
      : isVirginia
        ? VIRGINIA_LESSONS_EN
        : getDefaultLessons("en")
  const copy =
    language === "es"
      ? {
          checkingTitle: "Verificando acceso...",
          checkingBody: "Confirmando tu compra del curso para este estado.",
          expiredTitle: "Acceso al curso vencido",
          lockedTitle: "Curso bloqueado",
          expiredBody: `Este curso está disponible por ${VIRGINIA_COURSE_ACCESS_DAYS} días desde la compra.`,
          lockedBody:
            "Debes comprar este curso antes de acceder a las lecciones.",
          purchaseCourse: "Comprar curso",
          goDashboard: "Ir al panel",
          headerLabel: `${config.stateName} — Curso del estudiante`,
          identityTitle: "Se requiere verificación de identidad",
          identityBody:
            isVirginia
              ? "Virginia requiere verificación de identidad durante el curso y antes del examen final. Completa la configuración de identidad antes de comenzar el progreso de las lecciones y prepárate para verificar tu identidad otra vez antes de cada lección."
              : "La verificación de identidad puede formar parte del flujo del curso y del acceso al examen final. Completa la configuración de identidad antes de comenzar el progreso de las lecciones.",
          completeIdentity: "Completar configuración de identidad",
          needHelp: "¿Necesitas ayuda?",
          helpBody: "Obtén respuestas instantáneas o contacta soporte.",
          getHelp: "Obtener ayuda",
          finalExam: "Examen final",
          available: "Disponible",
          locked: "Bloqueado",
          identityFirst: "Completa identidad primero",
          finalExamLockedLessons:
            "Completa todas las lecciones antes de que se desbloquee el examen final.",
          finalExamUnlockTemplate: (remaining: string) =>
            `El examen final se desbloquea después de al menos ${formatCourseDuration(
              FINAL_EXAM_UNLOCK_SECONDS
            )} de instrucción del curso. Falta: ${remaining}.`,
          goToFinalExam: "Ir al examen final",
          certificate: "Certificado",
          certificateHoldTemplate: (remaining: string) =>
            `Aprobaste el examen final. Permanece en el curso durante ${remaining} más antes de que el certificado se desbloquee al llegar al mínimo total de 8 horas.`,
          view: "Ver",
          download: "Descargar",
          lessonsTitle: "Lecciones",
          completeIdentityFirst: "Completa identidad primero",
          completed: "Completada",
          notStarted: "No iniciada",
          open: "Abrir",
          verifyIdentity: "Verificar identidad",
        }
      : {
          checkingTitle: "Checking access...",
          checkingBody: "Verifying your course purchase for this state.",
          expiredTitle: "Course Access Expired",
          lockedTitle: "Course Locked",
          expiredBody: `This course is available for ${VIRGINIA_COURSE_ACCESS_DAYS} days from purchase.`,
          lockedBody:
            "You need to purchase this course before accessing lessons.",
          purchaseCourse: "Purchase Course",
          goDashboard: "Go to Dashboard",
          headerLabel: `${config.stateName} Student Course`,
          identityTitle: "Identity verification required",
          identityBody:
            isVirginia
              ? "Virginia requires identity verification throughout the course and before the final exam. Complete identity setup before starting lesson progress, and be ready to verify identity again before each lesson begins."
              : "Identity verification may be part of the course flow and final-exam access. Complete identity setup before starting lesson progress.",
          completeIdentity: "Complete Identity Setup",
          needHelp: "Need help?",
          helpBody: "Get instant answers or contact support.",
          getHelp: "Get Help",
          finalExam: "Final Exam",
          available: "Available",
          locked: "Locked",
          identityFirst: "Complete identity setup first",
          finalExamLockedLessons:
            "Complete every lesson before the final exam unlocks.",
          finalExamUnlockTemplate: (remaining: string) =>
            `The final exam unlocks after at least ${formatCourseDuration(
              FINAL_EXAM_UNLOCK_SECONDS
            )} of course instruction. Remaining: ${remaining}.`,
          goToFinalExam: "Go to Final Exam",
          certificate: "Certificate",
          certificateHoldTemplate: (remaining: string) =>
            `You passed the final exam. Stay in the course for ${remaining} more before the certificate unlocks at the full 8-hour minimum.`,
          view: "View",
          download: "Download",
          lessonsTitle: "Lessons",
          completeIdentityFirst: "Complete identity setup first",
          completed: "Completed",
          notStarted: "Not started",
          open: "Open",
          verifyIdentity: "Verify Identity",
        }

  const [progress, setProgress] = useState<CourseProgressRow[]>([])
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)
  const [accessError, setAccessError] = useState<string | null>(null)
  const [accessExpired, setAccessExpired] = useState(false)
  const [accessDeadline, setAccessDeadline] = useState<string | null>(null)
  const [identityReady, setIdentityReady] = useState<boolean | null>(null)
  const [seatTimeTotalSeconds, setSeatTimeTotalSeconds] = useState(0)
  const [examPassed, setExamPassed] = useState(false)

  const seatTimeBypassed = isFinalExamSeatTimeBypassed(state)
  const effectiveSeatTimeForExam = seatTimeBypassed
    ? COURSE_TOTAL_REQUIRED_SECONDS
    : seatTimeTotalSeconds

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
          setSeatTimeTotalSeconds(0)
          return
        }

        setSeatTimeTotalSeconds(attempt.total_seconds ?? 0)
      } catch (error) {
        console.error("Error loading seat time:", error)
        setSeatTimeTotalSeconds(0)
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
    () => lessons.every((lesson) => isLessonCompleted(progress, lesson.slug)),
    [lessons, progress]
  )

  const finalExamAvailable =
    allLessonsCompleted && isFinalExamUnlockedBySeatTime(effectiveSeatTimeForExam)
  const certificateAvailable =
    isCertificateUnlockedBySeatTime(
      seatTimeBypassed ? COURSE_TOTAL_REQUIRED_SECONDS : seatTimeTotalSeconds
    ) && examPassed
  const remainingToFinalExam = getRemainingToFinalExam(effectiveSeatTimeForExam)
  const remainingToCertificate = getRemainingToCertificate(
    seatTimeBypassed ? COURSE_TOTAL_REQUIRED_SECONDS : seatTimeTotalSeconds
  )

  if (!enrollmentOpen) {
    return (
      <div className="mx-auto mt-10 max-w-3xl space-y-4 rounded-xl border p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
          {config.stateName} Course Preparation
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          {language === "es"
            ? `Las lecciones de ${config.stateName} aun no estan publicadas`
            : `${config.stateName} lessons are not published yet`}
        </h1>
        <p className="leading-7 text-slate-600">
          {language === "es"
            ? `Las lecciones, el examen final y el certificado estaran disponibles cuando este curso abra.`
            : `Lessons, the final exam, and certificate access will be available when this course opens.`}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${state}/disclosures`}
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white"
          >
            {language === "es" ? "Leer informacion del curso" : "Read course information"}
          </Link>
          <Link
            href={`/${state}`}
            className="inline-block rounded-lg border border-slate-300 px-6 py-3"
          >
            {language === "es" ? `Volver a ${config.stateName}` : `Back to ${config.stateName}`}
          </Link>
        </div>
      </div>
    )
  }

  if (hasAccess === null || (hasAccess && identityReady === null)) {
    return (
      <div className="mx-auto mt-10 max-w-xl space-y-4 rounded-xl border p-6 text-center">
        <h1 className="text-2xl font-bold">{copy.checkingTitle}</h1>
        <p className="text-slate-600">{copy.checkingBody}</p>
      </div>
    )
  }

  if (!hasAccess) {
    return (
      <div className="mx-auto mt-10 max-w-xl space-y-4 rounded-xl border p-6 text-center">
        <h1 className="text-2xl font-bold">
          {accessExpired ? copy.expiredTitle : copy.lockedTitle}
        </h1>
        <p className="text-slate-600">
          {accessExpired ? copy.expiredBody : copy.lockedBody}
        </p>

        {accessExpired && accessDeadline ? (
          <p className="text-sm text-amber-700">
            {language === "es"
              ? `Tu acceso vencio despues de ${accessDeadline}.`
              : `Your access expired after ${accessDeadline}.`}
          </p>
        ) : null}

        {accessError ? (
          <p className="text-sm text-amber-700">{accessError}</p>
        ) : null}

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={`/${state}/checkout`}
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white"
          >
            {copy.purchaseCourse}
          </Link>

          <Link
            href={`/${state}/dashboard`}
            className="inline-block rounded-lg border border-slate-300 px-6 py-3"
          >
            {copy.goDashboard}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
          {copy.headerLabel}
        </p>
        <h1 className="text-3xl font-bold text-slate-900">{config.courseName}</h1>
      </div>

      {!identityReady ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            {copy.identityTitle}
          </h2>
          <p className="mt-2 text-slate-700">{copy.identityBody}</p>

          <Link
            href={`/${state}/identity`}
            className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            {copy.completeIdentity}
          </Link>
        </div>
      ) : null}

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
        <h2 className="text-xl font-semibold">{copy.needHelp}</h2>
        <p className="mt-2 text-slate-600">{copy.helpBody}</p>

        <Link
          href={`/${state}/support`}
          className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          {copy.getHelp}
        </Link>
      </div>

      <SeatTimeStatusCard
        stateCode={state}
        pagePath={`/${state}/course`}
        finalExamHref={`/${state}/course/final-exam`}
        lessonNumber={null}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border p-6">
          <h2 className="text-xl font-semibold">{copy.finalExam}</h2>
          <p className="mt-2 text-sm text-slate-600">
            {identityReady
              ? finalExamAvailable
                ? copy.available
                : copy.locked
              : copy.identityFirst}
          </p>

          {identityReady && !finalExamAvailable ? (
            <p className="mt-2 text-sm text-slate-500">
              {allLessonsCompleted
                ? copy.finalExamUnlockTemplate(
                    formatCourseDuration(remainingToFinalExam)
                  )
                : copy.finalExamLockedLessons}
            </p>
          ) : null}

          {identityReady ? (
            finalExamAvailable ? (
              <Link
                href={`/${state}/course/final-exam`}
                className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white"
              >
                {copy.goToFinalExam}
              </Link>
            ) : null
          ) : (
            <Link
              href={`/${state}/identity`}
              className="mt-4 inline-block rounded-lg border border-blue-600 px-4 py-2 text-blue-600"
            >
              {copy.completeIdentity}
            </Link>
          )}
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="text-xl font-semibold">{copy.certificate}</h2>
          <p className="mt-2 text-sm text-slate-600">
            {certificateAvailable ? copy.available : copy.locked}
          </p>

          {!certificateAvailable && examPassed ? (
            <p className="mt-2 text-sm text-slate-500">
              {copy.certificateHoldTemplate(
                formatCourseDuration(remainingToCertificate)
              )}
            </p>
          ) : null}

          <div className="mt-4 flex gap-3">
            <Link
              href={`/${state}/certificate`}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              {copy.view}
            </Link>

            {certificateAvailable && (
              <Link
                href={`/${state}/certificate?download=1`}
                className="rounded-lg border border-blue-600 px-4 py-2 text-blue-600"
              >
                {copy.download}
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-xl border p-6">
        <h2 className="text-xl font-semibold">{copy.lessonsTitle}</h2>
        <div className="mt-4 space-y-3">
          {lessons.map((lesson) => {
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
                      ? copy.completeIdentityFirst
                      : completed
                        ? copy.completed
                        : copy.notStarted}
                  </div>
                </div>

                {identityReady ? (
                  <Link
                    href={`/${state}/course/${lesson.slug}`}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                  >
                    {copy.open}
                  </Link>
                ) : (
                  <Link
                    href={`/${state}/identity`}
                    className="rounded-lg border border-blue-600 px-4 py-2 text-blue-600"
                  >
                    {copy.verifyIdentity}
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
