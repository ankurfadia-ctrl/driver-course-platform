"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LessonNavigation from "@/components/course/LessonNavigation";
import LessonVisuals from "@/components/course/LessonVisuals";
import SeatTimeStatusCard from "@/components/course/SeatTimeStatusCard";
import { getCourseAccessStatus } from "@/lib/course-access";
import {
  getUserCourseProgress,
  isLessonCompleted,
  type CourseProgressRow,
} from "@/lib/course-progress";
import {
  getVirginiaLessonBySlug,
  VIRGINIA_LESSON_CHECKS,
  VIRGINIA_LESSON_CONTENT,
} from "@/lib/virginia-course-curriculum";
import { verifyIdentityAnswer } from "@/lib/identity-verification-utils";
import {
  getStudentIdentityProfile,
  type StudentIdentityProfileRow,
} from "@/lib/student-identity";


function LessonCheckSection({
  lessonSlug,
}: {
  lessonSlug: string;
}) {
  const questions = useMemo(() => VIRGINIA_LESSON_CHECKS[lessonSlug] ?? [], [lessonSlug]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    if (!submitted || questions.length === 0) return 0;

    let correctCount = 0;

    for (const question of questions) {
      if (answers[question.id] === question.correctAnswer) {
        correctCount += 1;
      }
    }

    return Math.round((correctCount / questions.length) * 100);
  }, [answers, questions, submitted]);

  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-blue-700">
          Knowledge Check
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          {questions.length} Questions
        </span>
      </div>

      <h2 className="mt-4 text-2xl font-bold text-slate-900">
        Check your understanding
      </h2>

      <p className="mt-2 text-slate-600">
        This review is for learning reinforcement. It does not replace the final exam.
      </p>

      <div className="mt-8 space-y-8">
        {questions.map((question, index) => {
          const selectedAnswer = answers[question.id];
          const isCorrect = selectedAnswer === question.correctAnswer;

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
                  const checked = selectedAnswer === optionIndex;

                  let optionClasses =
                    "flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 transition";

                  if (!submitted) {
                    optionClasses += checked
                      ? " border-blue-600 bg-blue-50"
                      : " hover:bg-slate-50";
                  }

                  if (submitted && optionIndex === question.correctAnswer) {
                    optionClasses += " border-green-600 bg-green-50";
                  } else if (
                    submitted &&
                    checked &&
                    optionIndex !== question.correctAnswer
                  ) {
                    optionClasses += " border-red-600 bg-red-50";
                  }

                  return (
                    <label key={optionIndex} className={optionClasses}>
                      <input
                        type="radio"
                        name={`lesson-check-${lessonSlug}-${question.id}`}
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
                  );
                })}
              </div>

              {submitted ? (
                <div className="mt-4 rounded-xl bg-slate-50 p-4">
                  <p
                    className={`text-sm font-semibold ${
                      isCorrect ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {isCorrect ? "Correct" : "Incorrect"}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {question.explanation}
                  </p>
                </div>
              ) : null}
            </section>
          );
        })}
      </div>

      {!submitted ? (
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Submit Knowledge Check
          </button>
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-xl font-semibold text-slate-900">
            Knowledge Check Score
          </h3>
          <p className="mt-2 text-slate-700">
            You scored <span className="font-semibold">{score}%</span>.
          </p>

          <button
            type="button"
            onClick={() => {
              setAnswers({});
              setSubmitted(false);
            }}
            className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Retake Knowledge Check
          </button>
        </div>
      )}
    </div>
  );
}

function LessonContentPage({
  state,
  lessonSlug,
  progress,
}: {
  state: string;
  lessonSlug: string;
  progress: CourseProgressRow[];
}) {
  const router = useRouter();
  const lesson = getVirginiaLessonBySlug(lessonSlug);
  const lessonContent = VIRGINIA_LESSON_CONTENT[lessonSlug];
  const lessonNumber =
    Number.parseInt(lessonSlug.replace("lesson-", ""), 10) || 1;

  useEffect(() => {
    if (!lesson || !lessonContent) {
      router.replace(`/${state}/course`);
      return;
    }
  }, [lesson, lessonContent, router, state]);

  if (!lesson || !lessonContent) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm text-slate-600">Loading lesson...</p>
        </div>
      </main>
    );
  }

  const completed = isLessonCompleted(progress, lesson.slug);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <Link
            href={`/${state}/course`}
            className="text-sm font-medium text-blue-700 hover:text-blue-800"
          >
            Back to Course Outline
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
              Virginia Course
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {lesson.estimatedMinutes} min
            </span>

            {completed ? (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                Completed
              </span>
            ) : null}
          </div>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            {lesson.title}
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-700">
            {lessonContent.intro}
          </p>

          <div className="mt-8 space-y-8">
            {lessonContent.sections.map((section) => (
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

          <LessonVisuals lessonSlug={lessonSlug} />

          <div className="mt-8 rounded-2xl bg-slate-50 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-800">
              Key takeaway
            </h3>
            <p className="mt-2 leading-7 text-slate-700">
              {lessonContent.takeaway}
            </p>
          </div>
        </article>

        <LessonCheckSection lessonSlug={lessonSlug} />

        <div className="mt-6">
          <LessonNavigation
            state={state}
            currentLessonSlug={lesson.slug}
          />
        </div>
      </div>
    </main>
  );
}

export default function LessonPage() {
  const params = useParams();

  const state =
    typeof params.state === "string" ? params.state : "virginia";
  const lessonSlug =
    typeof params.lessonSlug === "string" ? params.lessonSlug : "";

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<CourseProgressRow[]>([]);
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [accessError, setAccessError] = useState<string | null>(null);
  const [identityReady, setIdentityReady] = useState<boolean | null>(null);
  const [identityProfile, setIdentityProfile] =
    useState<StudentIdentityProfileRow | null>(null);
  const [verificationAnswers, setVerificationAnswers] = useState({
    q1: "",
    q2: "",
  });
  const [verificationError, setVerificationError] = useState("");
  const [lessonVerified, setLessonVerified] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function checkAccess() {
      const access = await getCourseAccessStatus(state);

      if (!isMounted) return;
      setHasAccess(access.hasPaidAccess);
      setAccessError(access.error);
    }

    void checkAccess();

    return () => {
      isMounted = false;
    };
  }, [state]);

  useEffect(() => {
    let isMounted = true;

    async function loadIdentityStatus() {
      try {
        const profile = await getStudentIdentityProfile(state);

        if (!isMounted) return;
        setIdentityProfile(profile);
        setIdentityReady(Boolean(profile));
      } catch (error) {
        console.error("Error loading identity status:", error);

        if (!isMounted) return;
        setIdentityProfile(null);
        setIdentityReady(false);
      }
    }

    if (hasAccess) {
      void loadIdentityStatus();
    }

    return () => {
      isMounted = false;
    };
  }, [state, hasAccess]);

  useEffect(() => {
    setLessonVerified(false);
    setVerificationAnswers({ q1: "", q2: "" });
    setVerificationError("");
  }, [lessonSlug]);

  function handleVerifyLessonIdentity() {
    if (!identityProfile) return;

    const firstMatches = verifyIdentityAnswer(
      identityProfile.security_answer_1,
      verificationAnswers.q1
    );
    const secondMatches = verifyIdentityAnswer(
      identityProfile.security_answer_2,
      verificationAnswers.q2
    );

    if (!firstMatches || !secondMatches) {
      setVerificationError(
        "Identity answers did not match the student profile. Please try again."
      );
      return;
    }

    setVerificationError("");
    setLessonVerified(true);
  }

  useEffect(() => {
    async function loadProgress() {
      try {
        const rows = await getUserCourseProgress(state);
        setProgress(rows);
      } catch (error) {
        console.error("Error loading lesson progress:", error);
      } finally {
        setLoading(false);
      }
    }

    if (hasAccess) {
      void loadProgress();
    } else if (hasAccess === false) {
      setLoading(false);
    }
  }, [state, hasAccess]);

  if (hasAccess === null || (hasAccess && identityReady === null) || loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm text-slate-600">Loading...</p>
        </div>
      </main>
    );
  }

  if (!hasAccess) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Lesson Locked</h1>
          <p className="mt-3 text-slate-600">
            You need to purchase this state course before accessing lessons.
          </p>

          {accessError ? (
            <p className="mt-3 text-sm text-amber-700">{accessError}</p>
          ) : null}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href={`/${state}/checkout`}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              Purchase Course
            </Link>

            <Link
              href={`/${state}/dashboard`}
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!identityReady) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-xl rounded-2xl border border-amber-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Identity Verification Required
          </h1>
          <p className="mt-3 text-slate-600">
            Complete identity setup before starting lesson progress for this
            Virginia course.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href={`/${state}/identity`}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              Complete Identity Setup
            </Link>

            <Link
              href={`/${state}/course`}
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Back to Course
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!lessonVerified && identityProfile) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-xl space-y-6">
          <h1 className="text-2xl font-bold">Lesson Identity Verification</h1>

          <div className="rounded border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">
            Verify your identity before beginning this lesson.
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
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

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleVerifyLessonIdentity}
                className="rounded bg-blue-600 px-4 py-2 text-white"
              >
                Verify Identity
              </button>

              <Link
                href={`/${state}/course`}
                className="rounded border border-slate-300 px-4 py-2 text-center text-slate-700"
              >
                Back to Course
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <LessonContentPage
      state={state}
      lessonSlug={lessonSlug}
      progress={progress}
    />
  );
}
