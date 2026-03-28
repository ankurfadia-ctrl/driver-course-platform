"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { markLessonComplete } from "@/lib/course-progress";

type LessonNavigationProps = {
  state: string;
  currentLessonSlug: string;
};

const LESSONS = [
  { id: 1, slug: "lesson-1", title: "Lesson 1 - Course Introduction" },
  { id: 2, slug: "lesson-2", title: "Lesson 2 - Defensive Driving Habits" },
  { id: 3, slug: "lesson-3", title: "Lesson 3 - Speed Management and Following Distance" },
  { id: 4, slug: "lesson-4", title: "Lesson 4 - Distraction, Fatigue, and Impairment" },
  { id: 5, slug: "lesson-5", title: "Lesson 5 - Sharing the Road Safely" },
  { id: 6, slug: "lesson-6", title: "Lesson 6 - Virginia Traffic Laws and Consequences" },
  { id: 7, slug: "lesson-7", title: "Lesson 7 - Weather, Night Driving, and Emergencies" },
  { id: 8, slug: "lesson-8", title: "Lesson 8 - Attitude, Risk, and Long-Term Responsibility" },
];

function getLessonBySlug(slug: string) {
  return LESSONS.find((lesson) => lesson.slug === slug) ?? null;
}

function getPreviousLesson(slug: string) {
  const current = getLessonBySlug(slug);
  if (!current) return null;
  return LESSONS.find((lesson) => lesson.id === current.id - 1) ?? null;
}

function getNextLesson(slug: string) {
  const current = getLessonBySlug(slug);
  if (!current) return null;
  return LESSONS.find((lesson) => lesson.id === current.id + 1) ?? null;
}

export default function LessonNavigation({
  state,
  currentLessonSlug,
}: LessonNavigationProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const previousLesson = getPreviousLesson(currentLessonSlug);
  const nextLesson = getNextLesson(currentLessonSlug);
  const isLastLesson = !nextLesson;

  async function handleCompleteAndContinue() {
    try {
      setSaving(true);

      await markLessonComplete(state, currentLessonSlug);

      if (nextLesson) {
        router.push(`/${state}/course/${nextLesson.slug}`);
      } else {
        router.push(`/${state}/course`);
      }

      router.refresh();
    } catch (error) {
      console.error("Error completing lesson:", error);
      alert("Could not save lesson completion. Please try again.");
    } finally {
      setSaving(false);
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
            ← Previous Lesson
          </Link>
        ) : (
          <Link
            href={`/${state}/course`}
            className="inline-flex rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            ← Back to Course Outline
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
            ? "Saving..."
            : isLastLesson
              ? "Finish Lesson"
              : "Mark Complete & Continue →"}
        </button>
      </div>
    </div>
  );
}