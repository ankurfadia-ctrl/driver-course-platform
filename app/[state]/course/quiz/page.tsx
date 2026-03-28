"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { saveQuizScore } from "@/lib/course-progress";

type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What is a key principle of defensive driving?",
    options: [
      "Assume other road users will always do the right thing",
      "Look only at the vehicle directly ahead",
      "Anticipate hazards before they become emergencies",
      "Drive faster than traffic to avoid problems",
    ],
    correctAnswer: 2,
    explanation:
      "Defensive driving means scanning ahead, anticipating hazards, and giving yourself time and space to respond safely.",
  },
  {
    id: 2,
    question: "Why is following too closely dangerous?",
    options: [
      "It improves traffic flow",
      "It reduces the time available to stop safely",
      "It helps prevent lane changes",
      "It makes other drivers pay attention",
    ],
    correctAnswer: 1,
    explanation:
      "Following too closely is dangerous because it reduces reaction time and stopping distance, increasing the risk of a rear-end collision.",
  },
  {
    id: 3,
    question: "What should a driver do in poor weather?",
    options: [
      "Increase speed to get through it faster",
      "Drive normally if using headlights",
      "Slow down and increase following distance",
      "Brake and steer suddenly when traction drops",
    ],
    correctAnswer: 2,
    explanation:
      "Poor weather reduces visibility and traction, so drivers should slow down and leave more space.",
  },
  {
    id: 4,
    question: "Which is true about distracted driving?",
    options: [
      "Hands-free means zero risk",
      "Short glances away from the road are harmless",
      "Distraction can be visual, manual, and mental",
      "Only texting counts as distraction",
    ],
    correctAnswer: 2,
    explanation:
      "Distractions can involve your eyes, hands, or mind. Any of these can reduce safe driving performance.",
  },
  {
    id: 5,
    question: "What is the safest approach around motorcycles?",
    options: [
      "Share the same lane if there is room",
      "Assume they are farther away than they look",
      "Give them a full lane and check blind spots carefully",
      "Pass quickly without signaling",
    ],
    correctAnswer: 2,
    explanation:
      "Motorcycles are smaller and harder to judge, so drivers should give them a full lane and check carefully before moving.",
  },
  {
    id: 6,
    question: "Why is attitude important in driving?",
    options: [
      "Because confidence removes risk",
      "Because emotions can affect judgment and decisions",
      "Because aggressive driving saves time",
      "Because rules matter less than experience",
    ],
    correctAnswer: 1,
    explanation:
      "Anger, impatience, and overconfidence can all lead to unsafe decisions behind the wheel.",
  },
  {
    id: 7,
    question: "What is true about speed limits?",
    options: [
      "They are always safe no matter the conditions",
      "They only apply in clear weather",
      "They are maximums under ideal conditions, not guarantees of safety",
      "They can be ignored if traffic is light",
    ],
    correctAnswer: 2,
    explanation:
      "Drivers must adjust speed to weather, visibility, traffic, curves, and road conditions.",
  },
  {
    id: 8,
    question: "What is the safest response to drowsy driving?",
    options: [
      "Turn up the radio and continue",
      "Open a window and keep driving",
      "Drink water and ignore the fatigue",
      "Stop driving and rest",
    ],
    correctAnswer: 3,
    explanation:
      "Drowsiness seriously impairs reaction time and judgment. The safe choice is to stop and rest.",
  },
  {
    id: 9,
    question: "What should you do when emergency vehicles approach with lights or sirens?",
    options: [
      "Continue normally if they are in another lane",
      "Move safely as required by law",
      "Brake suddenly in your lane",
      "Speed up to stay ahead of them",
    ],
    correctAnswer: 1,
    explanation:
      "Drivers must respond safely and follow the law when emergency vehicles approach.",
  },
  {
    id: 10,
    question: "What is the main goal of this course?",
    options: [
      "Teach drivers how to avoid all traffic laws",
      "Encourage safer habits, better judgment, and reduced risk",
      "Help drivers finish quickly with no learning",
      "Focus only on passing a final quiz",
    ],
    correctAnswer: 1,
    explanation:
      "The course is designed to improve habits, decision-making, and overall road safety.",
  },
];

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();

  const state =
    typeof params.state === "string" ? params.state : "virginia";

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [finalScore, setFinalScore] = useState<number | null>(null);

  const answeredCount = useMemo(() => {
    return QUIZ_QUESTIONS.filter(
      (question) => answers[question.id] !== undefined
    ).length;
  }, [answers]);

  const allAnswered = QUIZ_QUESTIONS.every(
    (question) => answers[question.id] !== undefined
  );

  const passed = finalScore !== null && finalScore >= 80;

  function handleSelect(questionId: number, optionIndex: number) {
    if (submitted) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  }

  async function handleSubmit() {
    if (!allAnswered) {
      setError("Please answer every question before submitting the quiz.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      let correctCount = 0;

      for (const question of QUIZ_QUESTIONS) {
        if (answers[question.id] === question.correctAnswer) {
          correctCount += 1;
        }
      }

      const score = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);

      await saveQuizScore(state, "quiz", score);
      setFinalScore(score);
      setSubmitted(true);
      router.refresh();
    } catch (err) {
      console.error("Error saving quiz score:", err);
      setError("Could not save your quiz result. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <Link
            href={`/${state}/course`}
            className="text-sm font-medium text-blue-700 hover:text-blue-800"
          >
            ← Back to Course Outline
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-blue-700">
              Final Quiz
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              10 Questions
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              Passing Score: 80%
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            Virginia Driver Improvement Final Quiz
          </h1>

          <p className="mt-3 text-slate-600">
            Answer all questions, then submit your quiz. A score of 80% or
            higher is required to complete the course.
          </p>

          <div className="mt-8 rounded-2xl bg-slate-50 p-5">
            {!submitted ? (
              <>
                <p className="text-sm text-slate-500">Quiz Progress</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {answeredCount} of {QUIZ_QUESTIONS.length} answered
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-slate-500">Final Score</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {finalScore}%
                </p>
              </>
            )}
          </div>

          <div className="mt-8 space-y-8">
            {QUIZ_QUESTIONS.map((question, index) => {
              const selectedAnswer = answers[question.id];
              const isCorrect = selectedAnswer === question.correctAnswer;

              return (
                <section
                  key={question.id}
                  className="rounded-2xl border border-slate-200 p-6"
                >
                  <h2 className="text-lg font-semibold text-slate-900">
                    {index + 1}. {question.question}
                  </h2>

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
                            name={`question-${question.id}`}
                            checked={checked}
                            onChange={() =>
                              handleSelect(question.id, optionIndex)
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

          {error ? (
            <p className="mt-4 text-sm font-medium text-red-600">{error}</p>
          ) : null}

          {!submitted ? (
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {saving ? "Saving..." : "Submit Quiz"}
              </button>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900">
                {passed ? "You passed!" : "You did not pass yet."}
              </h2>

              <p className="mt-2 text-slate-700">
                Your score: <span className="font-semibold">{finalScore}%</span>
              </p>

              {passed ? (
                <>
                  <p className="mt-2 text-slate-700">
                    Congratulations. Your quiz result has been saved and your
                    course is complete.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href={`/${state}/certificate`}
                      className="rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                    >
                      Get Certificate →
                    </Link>

                    <Link
                      href={`/${state}/course`}
                      className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                    >
                      Back to Course Outline
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <p className="mt-2 text-slate-700">
                    You need at least 80% to pass. Review the lessons and retake
                    the quiz.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href={`/${state}/course`}
                      className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                    >
                      Back to Course Outline
                    </Link>

                    <button
                      onClick={() => {
                        setAnswers({});
                        setSubmitted(false);
                        setError("");
                        setFinalScore(null);
                      }}
                      className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      Retake Quiz
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}