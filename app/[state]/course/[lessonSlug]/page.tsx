"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import LessonNavigation from "@/components/course/LessonNavigation"
import LessonVisuals from "@/components/course/LessonVisuals"
import SeatTimeStatusCard from "@/components/course/SeatTimeStatusCard"
import { getCourseAccessStatus } from "@/lib/course-access"
import {
  getUserCourseProgress,
  isLessonCompleted,
  type CourseProgressRow,
} from "@/lib/course-progress"
import {
  getVirginiaLessonBySlug,
  VIRGINIA_LESSON_CHECKS,
  VIRGINIA_LESSON_CONTENT,
  type LessonCheckQuestion,
} from "@/lib/virginia-course-curriculum"
import {
  VIRGINIA_SPANISH_LESSON_CONTENT,
  type SpanishLessonPayload,
} from "@/lib/virginia-course-curriculum-es"
import { verifyIdentityAnswer } from "@/lib/identity-verification-utils"
import {
  getStudentIdentityProfile,
  type StudentIdentityProfileRow,
} from "@/lib/student-identity"
import { getCourseConfig } from "@/lib/course-config"
import { usePreferredSiteLanguageClient } from "@/lib/site-language-client"

function LessonCheckSection({
  questions,
  language,
}: {
  questions: LessonCheckQuestion[]
  language: "en" | "es"
}) {
  const copy =
    language === "es"
      ? {
          label: "Revision de conocimiento",
          questionCount: "Preguntas",
          title: "Comprueba tu comprension",
          body:
            "Esta revision sirve para reforzar el aprendizaje. No reemplaza el examen final.",
          submit: "Enviar revision",
          scoreTitle: "Puntuación de la revision",
          scoreBody: "Tu puntuación fue",
          retake: "Repetir revision",
          correct: "Correcta",
          incorrect: "Incorrecta",
        }
      : {
          label: "Knowledge Check",
          questionCount: "Questions",
          title: "Check your understanding",
          body:
            "This review is for learning reinforcement. It does not replace the final exam.",
          submit: "Submit Knowledge Check",
          scoreTitle: "Knowledge Check Score",
          scoreBody: "You scored",
          retake: "Retake Knowledge Check",
          correct: "Correct",
          incorrect: "Incorrect",
        }
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const score = useMemo(() => {
    if (!submitted || questions.length === 0) return 0

    let correctCount = 0

    for (const question of questions) {
      if (answers[question.id] === question.correctAnswer) {
        correctCount += 1
      }
    }

    return Math.round((correctCount / questions.length) * 100)
  }, [answers, questions, submitted])

  if (questions.length === 0) {
    return null
  }

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-blue-700">
          {copy.label}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          {questions.length} {copy.questionCount}
        </span>
      </div>

      <h2 className="mt-4 text-2xl font-bold text-slate-900">
        {copy.title}
      </h2>

      <p className="mt-2 text-slate-600">{copy.body}</p>

      <div className="mt-8 space-y-8">
        {questions.map((question, index) => {
          const selectedAnswer = answers[question.id]
          const isCorrect = selectedAnswer === question.correctAnswer

          return (
            <section
              key={question.id}
              className="rounded-2xl border border-slate-200 p-6"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {index + 1}. {question.question}
              </h3>

              <div className="mt-4 space-y-3">
                {question.options.map((option, optionIndex) => {
                  const checked = selectedAnswer === optionIndex

                  let optionClasses =
                    "flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 transition"

                  if (!submitted) {
                    optionClasses += checked
                      ? " border-blue-600 bg-blue-50"
                      : " hover:bg-slate-50"
                  }

                  if (submitted && optionIndex === question.correctAnswer) {
                    optionClasses += " border-green-600 bg-green-50"
                  } else if (
                    submitted &&
                    checked &&
                    optionIndex !== question.correctAnswer
                  ) {
                    optionClasses += " border-red-600 bg-red-50"
                  }

                  return (
                    <label key={optionIndex} className={optionClasses}>
                      <input
                        type="radio"
                        name={`lesson-check-${question.id}`}
                        checked={checked}
                        onChange={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            [question.id]: optionIndex,
                          }))
                        }
                        disabled={submitted}
                        className="mt-1"
                      />
                      <span className="text-slate-700">{option}</span>
                    </label>
                  )
                })}
              </div>

              {submitted ? (
                <div className="mt-4 rounded-xl bg-slate-50 p-4">
                  <p
                    className={`text-sm font-semibold ${
                      isCorrect ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {isCorrect ? copy.correct : copy.incorrect}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {question.explanation}
                  </p>
                </div>
              ) : null}
            </section>
          )
        })}
      </div>

      {!submitted ? (
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {copy.submit}
          </button>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-xl font-semibold text-slate-900">
            {copy.scoreTitle}
          </h3>
          <p className="mt-2 text-slate-700">
            {copy.scoreBody} <span className="font-semibold">{score}%</span>.
          </p>

          <button
            type="button"
            onClick={() => {
              setAnswers({})
              setSubmitted(false)
            }}
            className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {copy.retake}
          </button>
        </div>
      )}
    </div>
  )
}

function LessonContentPage({
  state,
  lessonSlug,
  progress,
  language,
  spanishLesson,
}: {
  state: string
  lessonSlug: string
  progress: CourseProgressRow[]
  language: "en" | "es"
  spanishLesson: SpanishLessonPayload | null
}) {
  const router = useRouter()
  const lesson = getVirginiaLessonBySlug(lessonSlug)
  const lessonContent = VIRGINIA_LESSON_CONTENT[lessonSlug]
  const lessonNumber =
    Number.parseInt(lessonSlug.replace("lesson-", ""), 10) || 1
  const copy =
    language === "es"
      ? {
          loadingLesson: "Cargando lección...",
          backToCourse: "Volver al esquema del curso",
          courseLabel: "Curso de Virginia",
          minutesLabel: "min",
          completed: "Completada",
          takeaway: "Idea clave",
        }
      : {
          loadingLesson: "Loading lesson...",
          backToCourse: "Back to Course Outline",
          courseLabel: "Virginia Course",
          minutesLabel: "min",
          completed: "Completed",
          takeaway: "Key takeaway",
        }

  useEffect(() => {
    if (!lesson || !lessonContent) {
      router.replace(`/${state}/course`)
      return
    }
  }, [lesson, lessonContent, router, state])

  if (!lesson || !lessonContent) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm text-slate-600">{copy.loadingLesson}</p>
        </div>
      </main>
    )
  }

  const completed = isLessonCompleted(progress, lesson.slug)
  const renderedLesson = spanishLesson
    ? {
        title: spanishLesson.title,
        intro: spanishLesson.intro,
        sections: spanishLesson.sections,
        takeaway: spanishLesson.takeaway,
      }
    : {
        title: lesson.title,
        intro: lessonContent.intro,
        sections: lessonContent.sections,
        takeaway: lessonContent.takeaway,
      }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <Link
            href={`/${state}/course`}
            className="text-sm font-medium text-blue-700 hover:text-blue-800"
          >
            {copy.backToCourse}
          </Link>
        </div>

        <div className="mb-6">
          <SeatTimeStatusCard
            stateCode={state}
            lessonNumber={lessonNumber}
            pagePath={`/${state}/course/${lessonSlug}`}
            finalExamHref={`/${state}/course/final-exam`}
          />
        </div>

        <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-blue-700">
              {copy.courseLabel}
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {lesson.estimatedMinutes} {copy.minutesLabel}
            </span>

            {completed ? (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                {copy.completed}
              </span>
            ) : null}
          </div>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            {renderedLesson.title}
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-700">
            {renderedLesson.intro}
          </p>

          <div className="mt-8 space-y-8">
            {renderedLesson.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-semibold text-slate-900">
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

          <LessonVisuals lessonSlug={lessonSlug} language={language} />

          <div className="mt-8 rounded-2xl bg-slate-50 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-800">
              {copy.takeaway}
            </h3>
            <p className="mt-2 leading-7 text-slate-700">
              {renderedLesson.takeaway}
            </p>
          </div>
        </article>

        <LessonCheckSection
          questions={spanishLesson?.checks ?? VIRGINIA_LESSON_CHECKS[lessonSlug] ?? []}
          language={language}
        />

        <div className="mt-6">
          <LessonNavigation
            state={state}
            currentLessonSlug={lesson.slug}
          />
        </div>
      </div>
    </main>
  )
}

export default function LessonPage() {
  const params = useParams()
  const language = usePreferredSiteLanguageClient()
  const state =
    typeof params.state === "string" ? params.state : "virginia"
  const config = getCourseConfig(state)
  const enrollmentOpen = config.enrollmentOpen
  const lessonSlug =
    typeof params.lessonSlug === "string" ? params.lessonSlug : ""
  const copy =
    language === "es"
      ? {
          loading: "Cargando...",
          lessonLocked: "Leccion bloqueada",
          purchaseNeeded:
            "Debes comprar este curso estatal antes de acceder a las lecciones.",
          purchaseCourse: "Comprar curso",
          goDashboard: "Ir al panel",
          identityRequired: "Se requiere verificación de identidad",
          identitySetupBody:
            "Completa la configuracion de identidad antes de comenzar el progreso de las lecciones para este curso de Virginia.",
          completeIdentity: "Completar configuracion de identidad",
          backToCourse: "Volver al curso",
          lessonIdentityTitle: "Verificacion de identidad para la lección",
          lessonIdentityBody:
            "Verifica tu identidad antes de comenzar esta lección.",
          identityMismatch:
            "Las respuestas de identidad no coinciden con el perfil del estudiante. Intentalo otra vez.",
          forgotAnswers:
            "Si olvidaste tus respuestas de identidad, vuelve a la configuracion de identidad y actualizalas antes de comenzar esta lección.",
          verifyIdentity: "Verificar identidad",
          updateAnswers: "Actualizar respuestas de identidad",
        }
      : {
          loading: "Loading...",
          lessonLocked: "Lesson Locked",
          purchaseNeeded:
            "You need to purchase this state course before accessing lessons.",
          purchaseCourse: "Purchase Course",
          goDashboard: "Go to Dashboard",
          identityRequired: "Identity Verification Required",
          identitySetupBody:
            "Complete identity setup before starting lesson progress for this Virginia course.",
          completeIdentity: "Complete Identity Setup",
          backToCourse: "Back to Course",
          lessonIdentityTitle: "Lesson Identity Verification",
          lessonIdentityBody:
            "Verify your identity before beginning this lesson.",
          identityMismatch:
            "Identity answers did not match the student profile. Please try again.",
          forgotAnswers:
            "If you forgot your identity answers, return to identity setup and update them before starting this lesson.",
          verifyIdentity: "Verify Identity",
          updateAnswers: "Update Identity Answers",
        }

  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState<CourseProgressRow[]>([])
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)
  const [accessError, setAccessError] = useState<string | null>(null)
  const [identityReady, setIdentityReady] = useState<boolean | null>(null)
  const [identityProfile, setIdentityProfile] =
    useState<StudentIdentityProfileRow | null>(null)
  const [verificationAnswers, setVerificationAnswers] = useState({
    q1: "",
    q2: "",
  })
  const [verificationError, setVerificationError] = useState("")
  const [lessonVerified, setLessonVerified] = useState(false)
  const spanishLesson =
    language === "es" ? VIRGINIA_SPANISH_LESSON_CONTENT[lessonSlug] ?? null : null

  useEffect(() => {
    let isMounted = true

    async function checkAccess() {
      const access = await getCourseAccessStatus(state)

      if (!isMounted) return
      setHasAccess(access.hasPaidAccess)
      setAccessError(access.error)
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
        const profile = await getStudentIdentityProfile(state)

        if (!isMounted) return
        setIdentityProfile(profile)
        setIdentityReady(Boolean(profile))
      } catch (error) {
        console.error("Error loading identity status:", error)

        if (!isMounted) return
        setIdentityProfile(null)
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
    setLessonVerified(false)
    setVerificationAnswers({ q1: "", q2: "" })
    setVerificationError("")
  }, [lessonSlug])

  function handleVerifyLessonIdentity() {
    if (!identityProfile) return

    const firstMatches = verifyIdentityAnswer(
      identityProfile.security_answer_1,
      verificationAnswers.q1
    )
    const secondMatches = verifyIdentityAnswer(
      identityProfile.security_answer_2,
      verificationAnswers.q2
    )

    if (!firstMatches || !secondMatches) {
      setVerificationError(copy.identityMismatch)
      return
    }

    setVerificationError("")
    setLessonVerified(true)
  }

  useEffect(() => {
    async function loadProgress() {
      try {
        const rows = await getUserCourseProgress(state)
        setProgress(rows)
      } catch (error) {
        console.error("Error loading lesson progress:", error)
      } finally {
        setLoading(false)
      }
    }

    if (hasAccess) {
      void loadProgress()
    } else if (hasAccess === false) {
      setLoading(false)
    }
  }, [state, hasAccess])

  if (!enrollmentOpen) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            {config.stateName} Course Preparation
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">
            {language === "es"
              ? `Las lecciones de ${config.stateName} aun no estan publicadas`
              : `${config.stateName} lessons are not published yet`}
          </h1>
          <p className="mt-4 leading-7 text-slate-600">
            {language === "es"
              ? `Las lecciones estaran disponibles cuando este curso abra.`
              : `Lessons will be available when this course opens.`}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/${state}/disclosures`}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              {language === "es" ? "Leer información del curso" : "Read course information"}
            </Link>
            <Link
              href={`/${state}`}
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {language === "es" ? `Volver a ${config.stateName}` : `Back to ${config.stateName}`}
            </Link>
          </div>
        </div>
      </main>
    )
  }

  if (
    hasAccess === null ||
    (hasAccess && identityReady === null) ||
    loading
  ) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm text-slate-600">{copy.loading}</p>
        </div>
      </main>
    )
  }

  if (!hasAccess) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">{copy.lessonLocked}</h1>
          <p className="mt-3 text-slate-600">{copy.purchaseNeeded}</p>

          {accessError ? (
            <p className="mt-3 text-sm text-amber-700">{accessError}</p>
          ) : null}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href={`/${state}/checkout`}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              {copy.purchaseCourse}
            </Link>

            <Link
              href={`/${state}/dashboard`}
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {copy.goDashboard}
            </Link>
          </div>
        </div>
      </main>
    )
  }

  if (!identityReady) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-xl rounded-2xl border border-amber-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            {copy.identityRequired}
          </h1>
          <p className="mt-3 text-slate-600">{copy.identitySetupBody}</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href={`/${state}/identity`}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              {copy.completeIdentity}
            </Link>

            <Link
              href={`/${state}/course`}
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {copy.backToCourse}
            </Link>
          </div>
        </div>
      </main>
    )
  }

  if (!lessonVerified && identityProfile) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-xl space-y-6">
          <h1 className="text-2xl font-bold">{copy.lessonIdentityTitle}</h1>

          <div className="rounded border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">
            {copy.lessonIdentityBody}
          </div>

          <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div>
              <label className="block text-sm font-medium text-slate-900">
                {identityProfile.security_question_1}
              </label>
              <input
                className="mt-1 w-full rounded border p-2"
                value={verificationAnswers.q1}
                onChange={(e) =>
                  setVerificationAnswers((prev) => ({
                    ...prev,
                    q1: e.target.value,
                  }))
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900">
                {identityProfile.security_question_2}
              </label>
              <input
                className="mt-1 w-full rounded border p-2"
                value={verificationAnswers.q2}
                onChange={(e) =>
                  setVerificationAnswers((prev) => ({
                    ...prev,
                    q2: e.target.value,
                  }))
                }
              />
            </div>

            {verificationError ? (
              <div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
                {verificationError}
              </div>
            ) : null}

            <div className="rounded border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              {copy.forgotAnswers}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleVerifyLessonIdentity}
                className="rounded bg-blue-600 px-4 py-2 text-white"
              >
                {copy.verifyIdentity}
              </button>

              <Link
                href={`/${state}/course`}
                className="rounded border border-slate-300 px-4 py-2 text-center text-slate-700"
              >
                {copy.backToCourse}
              </Link>

              <Link
                href={`/${state}/identity`}
                className="rounded border border-slate-300 px-4 py-2 text-center text-slate-700"
              >
                {copy.updateAnswers}
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <LessonContentPage
      state={state}
      lessonSlug={lessonSlug}
      progress={progress}
      language={language}
      spanishLesson={spanishLesson}
    />
  )
}
