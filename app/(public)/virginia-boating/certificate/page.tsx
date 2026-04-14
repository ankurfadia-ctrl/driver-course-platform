"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { getCourseProductConfig } from "@/lib/course-products"
import { getLatestExamResultForCourse } from "@/lib/exam-results"
import {
  formatCertificateCompletionDate,
  getOrCreateCertificateId,
} from "@/lib/certificate-reference"
import {
  buildCertificatePdfFilename,
  generateCertificatePdfArrayBuffer,
} from "@/lib/certificate-pdf"
import { getStudentIdentityProfile } from "@/lib/student-identity"

const BOATING_COURSE_SLUG = "boating-safety"

type CertificateStudent = {
  firstName: string
  lastName: string
}

function buildVerifyUrl(certificateId: string) {
  if (typeof window === "undefined") {
    return `/verify/${certificateId}`
  }

  return `${window.location.origin}/verify/${certificateId}`
}

function downloadArrayBuffer(filename: string, buffer: ArrayBuffer) {
  const blob = new Blob([buffer], { type: "application/pdf" })
  const url = window.URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = filename
  anchor.click()
  window.URL.revokeObjectURL(url)
}

export default function VirginiaBoatingCertificatePage() {
  const supabase = createClient()
  const product = useMemo(
    () => getCourseProductConfig("virginia", BOATING_COURSE_SLUG),
    []
  )
  const [loading, setLoading] = useState(true)
  const [student, setStudent] = useState<CertificateStudent | null>(null)
  const [examPassed, setExamPassed] = useState(false)
  const [examScore, setExamScore] = useState<number | null>(null)
  const [examCompletedAt, setExamCompletedAt] = useState<string | null>(null)
  const [certificateId, setCertificateId] = useState<string | null>(null)
  const [downloading, setDownloading] = useState(false)
  const [emailing, setEmailing] = useState(false)
  const [emailMessage, setEmailMessage] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      try {
        const [authResult, identityProfile, latestExam] = await Promise.all([
          supabase.auth.getUser(),
          getStudentIdentityProfile("virginia"),
          getLatestExamResultForCourse("virginia", BOATING_COURSE_SLUG),
        ])

        if (!isMounted) return

        const user = authResult.data.user
        const metadata = (user?.user_metadata as Record<string, unknown> | undefined) ?? {}
        const driverCourseProfile =
          (metadata.driverCourseProfile as Record<string, unknown> | undefined) ?? {}
        const pendingIdentityProfile =
          (metadata.pendingIdentityProfile as Record<string, unknown> | undefined) ?? {}

        const firstName = String(
          identityProfile?.first_name ??
            driverCourseProfile.firstName ??
            pendingIdentityProfile.firstName ??
            ""
        ).trim()
        const lastName = String(
          identityProfile?.last_name ??
            driverCourseProfile.lastName ??
            pendingIdentityProfile.lastName ??
            ""
        ).trim()

        setStudent(
          user
            ? {
                firstName,
                lastName,
              }
            : null
        )

        if (latestExam?.passed && latestExam.completed_at && user?.id) {
          setExamPassed(true)
          setExamScore(latestExam.score ?? null)
          setExamCompletedAt(latestExam.completed_at)

          const persistedCertificateId = await getOrCreateCertificateId({
            supabase,
            examResultId: latestExam.id,
            state: "virginia",
            courseSlug: BOATING_COURSE_SLUG,
            userId: user.id,
            completedAt: latestExam.completed_at,
          })

          if (!isMounted) return
          setCertificateId(persistedCertificateId)
        } else {
          setExamPassed(false)
          setExamScore(null)
          setExamCompletedAt(null)
          setCertificateId(null)
        }
      } catch (error) {
        console.error("Could not load Virginia boating certificate:", error)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    void loadData()

    return () => {
      isMounted = false
    }
  }, [supabase])

  const verifyUrl = certificateId ? buildVerifyUrl(certificateId) : null
  const fullName = [student?.firstName, student?.lastName].filter(Boolean).join(" ")

  const handleDownloadPdf = useCallback(async () => {
    if (!certificateId || !examPassed || downloading) {
      return
    }

    try {
      setDownloading(true)
      const pdf = generateCertificatePdfArrayBuffer({
        state: "virginia",
        courseName: product.courseName,
        certificateIssuerLine: product.certificateIssuerLine,
        firstName: student?.firstName ?? "",
        lastName: student?.lastName ?? "",
        examScore,
        examCompletedAt,
        certificateId,
        verifyUrl: verifyUrl ?? "",
      })
      const filename = buildCertificatePdfFilename(
        "virginia-boating",
        student?.firstName ?? "",
        student?.lastName ?? ""
      )
      downloadArrayBuffer(filename, pdf)
    } catch (error) {
      console.error("Could not download Virginia boating certificate:", error)
    } finally {
      setDownloading(false)
    }
  }, [
    certificateId,
    downloading,
    examCompletedAt,
    examPassed,
    examScore,
    product.certificateIssuerLine,
    product.courseName,
    student?.firstName,
    student?.lastName,
    verifyUrl,
  ])

  const handleSendCertificateEmail = useCallback(async () => {
    if (!certificateId || emailing) {
      return
    }

    try {
      setEmailing(true)
      setEmailMessage(null)

      const response = await fetch("/api/certificates/notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          state: "virginia",
          courseSlug: BOATING_COURSE_SLUG,
          certificateId,
        }),
      })

      const data = (await response.json()) as { ok?: boolean; error?: string }

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Could not send certificate email.")
      }

      setEmailMessage("Certificate email sent.")
    } catch (error) {
      console.error("Could not email Virginia boating certificate:", error)
      setEmailMessage("Could not send certificate email right now.")
    } finally {
      setEmailing(false)
    }
  }, [certificateId, emailing])

  if (loading) {
    return (
      <main className="public-shell min-h-screen">
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            Loading your certificate...
          </div>
        </section>
      </main>
    )
  }

  if (!examPassed) {
    return (
      <main className="public-shell min-h-screen">
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-semibold text-slate-950">Certificate locked</h1>
            <p className="mt-4 leading-7 text-slate-600">
              Pass the Virginia boating final exam before your completion certificate is available.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/virginia-boating/exam"
                className="rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800"
              >
                Go to final exam
              </Link>
              <Link
                href="/virginia-boating/learn"
                className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Review lessons
              </Link>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="public-shell min-h-screen">
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/virginia-boating/exam"
              className="rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Back to exam
            </Link>
            <button
              onClick={() => void handleDownloadPdf()}
              disabled={downloading}
              className="rounded-xl bg-sky-700 px-4 py-2 font-semibold text-white hover:bg-sky-800 disabled:bg-slate-400"
            >
              {downloading ? "Generating PDF..." : "Download PDF"}
            </button>
            <button
              onClick={() => void handleSendCertificateEmail()}
              disabled={emailing || !certificateId}
              className="rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50 disabled:bg-slate-100"
            >
              {emailing ? "Sending..." : "Email certificate"}
            </button>
          </div>

          {emailMessage ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              {emailMessage}
            </div>
          ) : null}

          <div className="border-4 border-slate-300 bg-white p-10 text-center shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
              Certificate of Completion
            </div>
            <h1 className="mt-6 text-4xl font-semibold text-slate-950">
              {product.courseName}
            </h1>
            <p className="mt-8 text-lg text-slate-700">This certifies that</p>
            <div className="mt-4 text-4xl font-bold text-slate-950 underline">
              {fullName || "Student Name"}
            </div>
            <p className="mt-8 text-lg text-slate-700">
              has successfully completed the Virginia boating safety course requirements and passed the final exam.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-sm text-slate-500">State</div>
                <div className="mt-1 text-xl font-semibold text-slate-950">Virginia</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Final exam score</div>
                <div className="mt-1 text-xl font-semibold text-slate-950">
                  {typeof examScore === "number" ? `${examScore}%` : "Passed"}
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Completion date</div>
                <div className="mt-1 text-xl font-semibold text-slate-950">
                  {formatCertificateCompletionDate(examCompletedAt)}
                </div>
              </div>
            </div>

            {certificateId ? (
              <div className="mt-10 text-sm text-slate-700">
                Certificate ID
                <div className="mt-2 font-mono text-lg font-semibold text-slate-950">
                  {certificateId}
                </div>
              </div>
            ) : null}

            {verifyUrl ? (
              <div className="mt-6 text-xs text-slate-500">
                Verify this certificate at
                <div className="mt-2 break-all font-mono text-slate-700">
                  {verifyUrl}
                </div>
              </div>
            ) : null}

            <div className="mt-14 text-sm text-slate-500">
              {product.certificateIssuerLine}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
