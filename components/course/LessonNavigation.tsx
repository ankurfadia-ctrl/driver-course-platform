"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { markLessonComplete } from "@/lib/course-progress"
import { usePreferredSiteLanguageClient } from "@/lib/site-language-client"

type LessonNavigationProps = {
  state: string
  currentLessonSlug: string
}

const LESSONS_EN = [
  { id: 1, slug: "lesson-1", title: "Lesson 1 - Course Introduction" },
  { id: 2, slug: "lesson-2", title: "Lesson 2 - Defensive Driving Habits" },
  { id: 3, slug: "lesson-3", title: "Lesson 3 - Speed Management and Following Distance" },
  { id: 4, slug: "lesson-4", title: "Lesson 4 - Distraction, Fatigue, and Impairment" },
  { id: 5, slug: "lesson-5", title: "Lesson 5 - Sharing the Road Safely" },
  { id: 6, slug: "lesson-6", title: "Lesson 6 - Virginia Traffic Laws and Consequences" },
  { id: 7, slug: "lesson-7", title: "Lesson 7 - Weather, Night Driving, and Emergencies" },
  { id: 8, slug: "lesson-8", title: "Lesson 8 - Attitude, Risk, and Long-Term Responsibility" },
]

const LESSONS_ES = [
  { id: 1, slug: "lesson-1", title: "Leccion 1 - Introduccion al curso" },
  { id: 2, slug: "lesson-2", title: "Leccion 2 - Habitos de conduccion defensiva" },
  { id: 3, slug: "lesson-3", title: "Leccion 3 - Control de velocidad y distancia de seguimiento" },
  { id: 4, slug: "lesson-4", title: "Leccion 4 - Distraccion, fatiga e impedimento" },
  { id: 5, slug: "lesson-5", title: "Leccion 5 - Compartir la via de forma segura" },
  { id: 6, slug: "lesson-6", title: "Leccion 6 - Leyes de transito de Virginia y consecuencias" },
  { id: 7, slug: "lesson-7", title: "Leccion 7 - Clima, conduccion nocturna y emergencias" },
  { id: 8, slug: "lesson-8", title: "Leccion 8 - Actitud, riesgo y responsabilidad a largo plazo" },
]

function getLessonBySlug(
  lessons: { id: number; slug: string; title: string }[],
  slug: string
) {
  return lessons.find((lesson) => lesson.slug === slug) ?? null
}

export default function LessonNavigation({
  state,
  currentLessonSlug,
}: LessonNavigationProps) {
  const router = useRouter()
  const language = usePreferredSiteLanguageClient()
  const lessons = language === "es" ? LESSONS_ES : LESSONS_EN
  const copy =
    language === "es"
      ? {
          saving: "Guardando...",
          finishLesson: "Finalizar leccion",
          completeContinue: "Marcar completa y continuar ->",
          previousLesson: "<- Leccion anterior",
          courseOutline: "<- Volver al esquema del curso",
          error: "No se pudo guardar el progreso de la leccion. Intentalo otra vez.",
        }
      : {
          saving: "Saving...",
          finishLesson: "Finish Lesson",
          completeContinue: "Mark Complete & Continue ->",
          previousLesson: "<- Previous Lesson",
          courseOutline: "<- Back to Course Outline",
          error: "Could not save lesson completion. Please try again.",
        }
  const [saving, setSaving] = useState(false)

  const current = getLessonBySlug(lessons, currentLessonSlug)
  const previousLesson =
    current ? lessons.find((lesson) => lesson.id === current.id - 1) ?? null : null
  const nextLesson =
    current ? lessons.find((lesson) => lesson.id === current.id + 1) ?? null : null
  const isLastLesson = !nextLesson

  async function handleCompleteAndContinue() {
    try {
      setSaving(true)

      await markLessonComplete(state, currentLessonSlug)

      if (nextLesson) {
        router.push(`/${state}/course/${nextLesson.slug}`)
      } else {
        router.push(`/${state}/course`)
      }

      router.refresh()
    } catch (error) {
      console.error("Error completing lesson:", error)
      alert(copy.error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        {previousLesson ? (
          <Link
            href={`/${state}/course/${previousLesson.slug}`}
            className="inline-flex rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            {copy.previousLesson}
          </Link>
        ) : (
          <Link
            href={`/${state}/course`}
            className="inline-flex rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            {copy.courseOutline}
          </Link>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleCompleteAndContinue}
          disabled={saving}
          className="inline-flex rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {saving
            ? copy.saving
            : isLastLesson
              ? copy.finishLesson
              : copy.completeContinue}
        </button>
      </div>
    </div>
  )
}
