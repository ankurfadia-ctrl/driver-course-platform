"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { formatCertificateCompletionDate } from "@/lib/certificate-reference"

type VerificationExamRow = {
  id: string
  user_id: string
  state: string
  score: number
  passed: boolean
  completed_at: string
  certificate_id: string | null
}

type VerificationStudentRow = {
  user_id: string
  state: string
  first_name: string | null
  last_name: string | null
}

type VerificationMatch = {
  certificateReference: string
  state: string
  score: number
  passed: boolean
  completedAt: string
  fullName: string
}

function normalizeIncomingCertificateId(value: string) {
  return String(value ?? "").trim().toUpperCase()
}

export default function VerifyCertificatePage() {
  const params = useParams()
  const supabase = createClient()

  const certificateId =
    typeof params?.certificateId === "string" ? params.certificateId : ""

  const normalizedCertificateId = useMemo(
    () => normalizeIncomingCertificateId(certificateId),
    [certificateId]
  )

  const [loading, setLoading] = useState(true)
  const [match, setMatch] = useState<VerificationMatch | null>(null)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const loadVerification = async () => {
      if (!normalizedCertificateId) {
        setMatch(null)
        setErrorMessage("Invalid certificate ID.")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setErrorMessage("")

        // 🔥 NEW: Direct lookup (NO scanning)
        const { data: examRow, error: examError } = await supabase
          .from("exam_results")
          .select("id, user_id, state, score, passed, completed_at, certificate_id")
          .eq("certificate_id", normalizedCertificateId)
          .maybeSingle()

        if (examError) {
          throw examError
        }

        if (!examRow || !examRow.passed) {
          setMatch(null)
          setErrorMessage("Certificate not found.")
          setLoading(false)
          return
        }

        const exam = examRow as VerificationExamRow

        const { data: studentRow, error: studentError } = await supabase
          .from("student_identity_profiles")
          .select("user_id, state, first_name, last_name")
          .eq("user_id", exam.user_id)
          .eq("state", exam.state)
          .maybeSingle()

        if (studentError) {
          throw studentError
        }

        const student = studentRow as VerificationStudentRow | null

        const fullName = [student?.first_name, student?.last_name]
          .filter(Boolean)
          .join(" ")
          .trim()

        setMatch({
          certificateReference: normalizedCertificateId,
          state: exam.state.toUpperCase(),
          score: exam.score,
          passed: exam.passed,
          completedAt: exam.completed_at,
          fullName: fullName || "Verified Student",
        })
      } catch (error) {
        console.error(error)
        setMatch(null)
        setErrorMessage(
          "Verification could not be completed. Please try again."
        )
      } finally {
        setLoading(false)
      }
    }

    void loadVerification()
  }, [normalizedCertificateId, supabase])

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Certificate Verification
        </p>
        <h1 className="text-3xl font-bold text-slate-900">Verify Certificate</h1>
        <p className="mt-2 text-slate-600">
          Use the certificate ID exactly as printed on the certificate.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-sm text-slate-500">Certificate ID</div>
        <div className="mt-2 break-all font-mono text-lg font-semibold text-slate-900">
          {normalizedCertificateId || "No certificate ID provided"}
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          Loading verification result...
        </div>
      ) : match ? (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-wide text-green-700">
            Verified
          </div>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Certificate confirmed
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-white p-4">
              <div className="text-sm text-slate-500">Student name</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">
                {match.fullName}
              </div>
            </div>

            <div className="rounded-xl bg-white p-4">
              <div className="text-sm text-slate-500">State</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">
                {match.state}
              </div>
            </div>

            <div className="rounded-xl bg-white p-4">
              <div className="text-sm text-slate-500">Final exam score</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">
                {match.score}%
              </div>
            </div>

            <div className="rounded-xl bg-white p-4">
              <div className="text-sm text-slate-500">Completion date</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">
                {formatCertificateCompletionDate(match.completedAt)}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-white p-4">
            <div className="text-sm text-slate-500">Status</div>
            <div className="mt-1 text-lg font-semibold text-green-700">
              Passed and certificate validated
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-wide text-amber-700">
            Not Verified
          </div>
          <div className="mt-2 text-lg font-semibold text-slate-900">
            {errorMessage || "Certificate could not be verified."}
          </div>
          <p className="mt-2 text-sm text-slate-600">
            Double-check the certificate ID and try again.
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}