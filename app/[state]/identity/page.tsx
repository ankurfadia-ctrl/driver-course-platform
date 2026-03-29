// app/[state]/identity/page.tsx

"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  EMPTY_IDENTITY_VERIFICATION_ANSWERS,
  IDENTITY_VERIFICATION_QUESTIONS,
  getIdentityVerificationStorageKey,
  type IdentityVerificationAnswerSet,
} from "@/lib/identity-verification"
import {
  getStudentIdentityProfile,
  saveStudentIdentityProfile,
} from "@/lib/student-identity"

export default function IdentitySetupPage() {
  const params = useParams()
  const router = useRouter()
  const state =
    typeof params?.state === "string" ? params.state : "virginia"

  const storageKey = getIdentityVerificationStorageKey(state)

  const [form, setForm] = useState<IdentityVerificationAnswerSet>(
    EMPTY_IDENTITY_VERIFICATION_ANSWERS
  )
  const [ready, setReady] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState("")

  useEffect(() => {
    const loadIdentity = async () => {
      try {
        const dbIdentity = await getStudentIdentityProfile(state)

        if (dbIdentity) {
          const mapped: IdentityVerificationAnswerSet = {
            firstName: dbIdentity.first_name,
            lastName: dbIdentity.last_name,
            dateOfBirth: dbIdentity.date_of_birth,
            driversLicenseNumber: dbIdentity.drivers_license_number,
            securityQuestion1: dbIdentity.security_question_1,
            securityAnswer1: dbIdentity.security_answer_1,
            securityQuestion2: dbIdentity.security_question_2,
            securityAnswer2: dbIdentity.security_answer_2,
          }

          setForm(mapped)
          localStorage.setItem(storageKey, JSON.stringify(mapped))
          setReady(true)
          return
        }

        const raw = localStorage.getItem(storageKey)

        if (raw) {
          try {
            const parsed = JSON.parse(raw) as IdentityVerificationAnswerSet
            setForm({
              ...EMPTY_IDENTITY_VERIFICATION_ANSWERS,
              ...parsed,
            })
          } catch {
            localStorage.removeItem(storageKey)
          }
        }
      } catch (error) {
        console.error(error)

        const raw = localStorage.getItem(storageKey)

        if (raw) {
          try {
            const parsed = JSON.parse(raw) as IdentityVerificationAnswerSet
            setForm({
              ...EMPTY_IDENTITY_VERIFICATION_ANSWERS,
              ...parsed,
            })
          } catch {
            localStorage.removeItem(storageKey)
          }
        }
      } finally {
        setReady(true)
      }
    }

    loadIdentity()
  }, [state, storageKey])

  const updateField = (
    key: keyof IdentityVerificationAnswerSet,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSave = async () => {
    const hasEmptyField = Object.values(form).some(
      (value) => value.trim() === ""
    )

    if (hasEmptyField) {
      alert("Please complete all identity verification fields.")
      return
    }

    setSaving(true)
    setSaveError("")

    try {
      await saveStudentIdentityProfile({
        state,
        answers: form,
      })

      localStorage.setItem(storageKey, JSON.stringify(form))
      router.push(`/${state}/course`)
    } catch (error) {
      console.error(error)
      setSaveError("Could not save identity profile. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  if (!ready) return null

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          {state}
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          Identity Verification Setup
        </h1>
        <p className="mt-2 text-slate-600">
          Save the student identity answers now so they can be reused before
          quizzes and the final exam.
        </p>
      </div>

      {saveError && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          {saveError}
        </div>
      )}

      <div className="space-y-4">
        {IDENTITY_VERIFICATION_QUESTIONS.map((field) => {
          const value =
            form[field.id as keyof IdentityVerificationAnswerSet] ?? ""

          return (
            <div
              key={field.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <label className="block text-sm font-semibold text-slate-900">
                {field.prompt}
              </label>
              <p className="mt-1 text-sm text-slate-500">{field.helpText}</p>

              <input
                type={field.id === "dateOfBirth" ? "date" : "text"}
                value={value}
                onChange={(e) =>
                  updateField(
                    field.id as keyof IdentityVerificationAnswerSet,
                    e.target.value
                  )
                }
                className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-0 transition focus:border-blue-500"
                disabled={saving}
              />
            </div>
          )
        })}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save and Continue"}
        </button>
      </div>
    </div>
  )
}
