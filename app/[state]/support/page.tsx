"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { useParams } from "next/navigation"
import {
  getSupportAssistantResponse,
  type SupportCategory,
} from "@/lib/support-assistant"
import { createSupportRequest } from "@/lib/support-requests"

const CATEGORY_OPTIONS: { value: SupportCategory; label: string }[] = [
  { value: "course-access", label: "Course access / login" },
  { value: "seat-time", label: "Seat time / timer issue" },
  { value: "final-exam", label: "Final exam issue" },
  { value: "certificate", label: "Certificate / completion issue" },
  { value: "technical", label: "Technical website issue" },
  { value: "other", label: "Other question" },
]

function getStateDisplayName(state: string) {
  const normalized = String(state ?? "").trim()
  if (!normalized) return "Virginia"
  return normalized.charAt(0).toUpperCase() + normalized.slice(1).toLowerCase()
}

export default function StateSupportPage() {
  const params = useParams()

  const state =
    typeof params?.state === "string" ? params.state : "virginia"

  const [category, setCategory] = useState<SupportCategory>("other")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [priority, setPriority] = useState(false)

  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const stateDisplayName = useMemo(() => getStateDisplayName(state), [state])

  const trimmedSubject = subject.trim()
  const trimmedMessage = message.trim()

  const effectiveText = `${trimmedSubject} ${trimmedMessage}`.trim()

  const canPreview = effectiveText.length >= 5
  const canSubmit = effectiveText.length >= 5 && !saving

  const aiResponse = useMemo(() => {
    if (!canPreview) return null

    return getSupportAssistantResponse({
      state,
      category,
      subject: trimmedSubject || effectiveText,
      message: trimmedMessage || effectiveText,
    })
  }, [state, category, trimmedSubject, trimmedMessage, effectiveText, canPreview])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!canSubmit) return

    try {
      setSaving(true)
      setError(null)

      await createSupportRequest({
        stateCode: state,
        category,
        subject: trimmedSubject || effectiveText,
        message: trimmedMessage || effectiveText,
        aiResponse,
        priorityRequested: priority,
      })

      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setError("Something went wrong saving your request. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const resetForm = () => {
    setSubmitted(false)
    setSaving(false)
    setError(null)
    setPriority(false)
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          {stateDisplayName} Student Support
        </p>
        <h1 className="text-3xl font-bold text-slate-900">Help & Support</h1>
        <p className="mt-2 max-w-3xl text-slate-600">
          Most issues are resolved instantly. Only complex issues are reviewed.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Common questions
            </h2>
            <p className="mt-2 text-slate-600">
              Many issues are resolved with the instant guidance shown as students type.
            </p>

            <div className="mt-5 space-y-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="font-semibold text-slate-900">
                  Why is my final exam locked?
                </div>
                <div className="mt-2 text-sm leading-6 text-slate-600">
                  The final exam stays locked until all lessons are completed and your required seat time is satisfied.
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="font-semibold text-slate-900">
                  Why is my certificate locked?
                </div>
                <div className="mt-2 text-sm leading-6 text-slate-600">
                  Your certificate is available only after required seat time is complete and you have passed the final exam.
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="font-semibold text-slate-900">
                  Why is my timer not done yet?
                </div>
                <div className="mt-2 text-sm leading-6 text-slate-600">
                  Seat time is tracked across your course activity. Keep progressing through lessons and remain active on the course pages until the required time is completed.
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">Quick links</h2>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href={`/${state}/course`}
                className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Course Dashboard
              </Link>

              <Link
                href={`/${state}/course/final-exam`}
                className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Final Exam
              </Link>

              <Link
                href={`/${state}/certificate`}
                className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Certificate
              </Link>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Ask a question
          </h2>
          <p className="mt-2 text-slate-600">
            Type your issue below. Even short messages like “exam locked” work.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="support-category"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Category
                </label>
                <select
                  id="support-category"
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value as SupportCategory)
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500"
                >
                  {CATEGORY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="support-subject"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Subject
                </label>
                <input
                  id="support-subject"
                  type="text"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  placeholder="Example: Exam locked"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="support-message"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Message
                </label>
                <textarea
                  id="support-message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Describe your issue"
                  rows={6}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500"
                />
              </div>

              {!canPreview ? (
                <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                  Enter at least 5 total characters in Subject or Message to get an instant answer.
                </div>
              ) : null}

              {aiResponse ? (
                <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
                  <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                    Instant suggested answer
                  </div>

                  <h3 className="mt-2 text-lg font-semibold text-slate-900">
                    Suggested next steps
                  </h3>

                  <p className="mt-2 text-slate-700">{aiResponse.summary}</p>

                  <div className="mt-4">
                    <div className="text-sm font-medium text-slate-700">
                      Try these steps:
                    </div>
                    <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-slate-700">
                      {aiResponse.suggestedSteps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ul>
                  </div>

                  {aiResponse.escalationRecommended ? (
                    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                      This issue may need extra support review if the suggested steps do not solve it.
                    </div>
                  ) : (
                    <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800">
                      This looks like a common issue that is often resolved using the steps above.
                    </div>
                  )}
                </div>
              ) : null}

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={priority}
                    onChange={(event) => setPriority(event.target.checked)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-semibold text-slate-900">
                      Priority support request
                    </div>
                    <div className="mt-1 text-sm text-slate-600">
                      You can mark this request as priority now. This is saved for future paid priority support workflow and admin triage.
                    </div>
                  </div>
                </label>
              </div>

              {error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={!canSubmit}
                className={`inline-flex rounded-lg px-4 py-2 font-semibold text-white transition ${
                  canSubmit
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "cursor-not-allowed bg-slate-400"
                }`}
              >
                {saving ? "Saving..." : "Send Support Request"}
              </button>
            </form>
          ) : (
            <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-5">
              <div className="text-sm font-semibold uppercase tracking-wide text-green-700">
                Support request submitted
              </div>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">
                Your request has been saved
              </h3>
              <p className="mt-2 text-slate-600">
                Most issues are resolved with the instant steps above. Unresolved issues can be reviewed next.
              </p>

              {priority ? (
                <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">
                  Priority support was requested for this submission.
                </div>
              ) : null}

              {aiResponse ? (
                <div className="mt-5 rounded-xl bg-white p-4">
                  <div className="text-sm text-slate-500">AI suggested summary</div>
                  <div className="mt-1 text-slate-900">{aiResponse.summary}</div>
                </div>
              ) : null}

              <div className="mt-5 space-y-3 rounded-xl bg-white p-4">
                <div>
                  <div className="text-sm text-slate-500">Category</div>
                  <div className="font-medium text-slate-900">
                    {CATEGORY_OPTIONS.find((option) => option.value === category)?.label}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-slate-500">Subject</div>
                  <div className="font-medium text-slate-900">
                    {trimmedSubject || "—"}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-slate-500">Message</div>
                  <div className="whitespace-pre-wrap text-slate-900">
                    {trimmedMessage || "—"}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-slate-500">Priority requested</div>
                  <div className="font-medium text-slate-900">
                    {priority ? "Yes" : "No"}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={resetForm}
                className="mt-4 inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                New Request
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}