"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { getCourseProductConfig } from "@/lib/course-products"
import { formatCertificateCompletionDate } from "@/lib/certificate-reference"
import { usePreferredSiteLanguageClient } from "@/lib/site-language-client"

type VerificationExamRow = {
  id: string
  user_id: string
  state: string
  course_slug: string
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
  courseName: string
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
  const language = usePreferredSiteLanguageClient()
  const isSpanish = language === "es"

  const copy = useMemo(
    () =>
      isSpanish
        ? {
            eyebrow: "Verificación de certificados",
            title: "Verificar certificado",
            intro:
              "Usa el ID del certificado tal como aparece impreso en el certificado.",
            certificateIdLabel: "ID de certificado",
            missingId: "No se proporcionó un ID de certificado",
            loading: "Cargando resultado de verificación...",
            verifiedLabel: "Verificado",
            verifiedTitle: "Certificado confirmado",
            studentName: "Nombre del estudiante",
            state: "Estado",
            course: "Curso",
            finalExamScore: "Puntuación del examen final",
            completionDate: "Fecha de finalización",
            status: "Estado",
            statusValue: "Aprobado y certificado validado",
            notVerified: "No verificado",
            notVerifiedBody: "No se pudo verificar el certificado.",
            notVerifiedHint:
              "Revisa el ID del certificado y vuelve a intentarlo.",
            back: "Volver al inicio",
            verifyAnother: "Verificar otro certificado",
            invalidId: "ID de certificado no válido.",
            notFound: "Certificado no encontrado.",
            verifyError: "No se pudo completar la verificación. Inténtalo de nuevo.",
            verifiedStudentFallback: "Estudiante verificado",
          }
        : {
            eyebrow: "Certificate Verification",
            title: "Verify Certificate",
            intro: "Use the certificate ID exactly as printed on the certificate.",
            certificateIdLabel: "Certificate ID",
            missingId: "No certificate ID provided",
            loading: "Loading verification result...",
            verifiedLabel: "Verified",
            verifiedTitle: "Certificate confirmed",
            studentName: "Student name",
            state: "State",
            course: "Course",
            finalExamScore: "Final exam score",
            completionDate: "Completion date",
            status: "Status",
            statusValue: "Passed and certificate validated",
            notVerified: "Not Verified",
            notVerifiedBody: "Certificate could not be verified.",
            notVerifiedHint: "Double-check the certificate ID and try again.",
            back: "Back to Home",
            verifyAnother: "Verify another certificate",
            invalidId: "Invalid certificate ID.",
            notFound: "Certificate not found.",
            verifyError: "Verification could not be completed. Please try again.",
            verifiedStudentFallback: "Verified Student",
          },
    [isSpanish]
  )

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
        setErrorMessage(copy.invalidId)
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setErrorMessage("")

        const { data: examRow, error: examError } = await supabase
          .from("exam_results")
          .select(
            "id, user_id, state, course_slug, score, passed, completed_at, certificate_id"
          )
          .eq("certificate_id", normalizedCertificateId)
          .maybeSingle()

        if (examError) {
          throw examError
        }

        if (!examRow || !examRow.passed) {
          setMatch(null)
          setErrorMessage(copy.notFound)
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
          courseName: getCourseProductConfig(
            exam.state,
            exam.course_slug
          ).courseName,
          score: exam.score,
          passed: exam.passed,
          completedAt: exam.completed_at,
          fullName: fullName || copy.verifiedStudentFallback,
        })
      } catch (error) {
        console.error(error)
        setMatch(null)
        setErrorMessage(copy.verifyError)
      } finally {
        setLoading(false)
      }
    }

    void loadVerification()
  }, [
    normalizedCertificateId,
    supabase,
    copy.invalidId,
    copy.notFound,
    copy.verifiedStudentFallback,
    copy.verifyError,
  ])

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          {copy.eyebrow}
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">{copy.title}</h1>
        <p className="mt-4 leading-7 text-slate-700">{copy.intro}</p>
        <div className="mt-5">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {copy.certificateIdLabel}
          </div>
          <div className="mt-2 break-words font-mono text-lg font-semibold text-slate-900">
            {normalizedCertificateId || copy.missingId}
          </div>
        </div>
      </section>

      {loading ? (
        <section className="glass-panel rounded-[2rem] bg-white p-8">
          <div className="flex items-center gap-3 text-slate-500">
            <svg className="h-5 w-5 animate-spin text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-sm font-medium">{copy.loading}</span>
          </div>
          <div className="mt-5 space-y-3">
            <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
          </div>
        </section>
      ) : match ? (
        <section className="rounded-[2rem] border border-green-200 bg-green-50 p-8 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-green-700">
            {copy.verifiedLabel}
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">
            {copy.verifiedTitle}
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-4">
              <div className="text-sm text-slate-500">{copy.studentName}</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">{match.fullName}</div>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <div className="text-sm text-slate-500">{copy.state}</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">{match.state}</div>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <div className="text-sm text-slate-500">{copy.course}</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">{match.courseName}</div>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <div className="text-sm text-slate-500">{copy.finalExamScore}</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">{match.score}%</div>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <div className="text-sm text-slate-500">{copy.completionDate}</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">
                {formatCertificateCompletionDate(match.completedAt)}
              </div>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <div className="text-sm text-slate-500">{copy.status}</div>
              <div className="mt-1 text-lg font-semibold text-green-700">{copy.statusValue}</div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/verify"
              className="rounded-xl border border-green-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-green-50"
            >
              {copy.verifyAnother}
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              {copy.back}
            </Link>
          </div>
        </section>
      ) : (
        <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-8 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
            {copy.notVerified}
          </div>
          <div className="mt-2 text-xl font-semibold text-slate-900">
            {errorMessage || copy.notVerifiedBody}
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            {copy.notVerifiedHint}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/verify"
              className="rounded-xl border border-amber-300 bg-white px-5 py-3 font-semibold text-amber-900 hover:bg-amber-100"
            >
              {copy.verifyAnother}
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              {copy.back}
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
