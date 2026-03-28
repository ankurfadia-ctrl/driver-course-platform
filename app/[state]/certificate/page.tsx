"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import jsPDF from "jspdf"
import { createClient } from "@/lib/supabase/client"
import { getCourseConfig } from "@/lib/course-config"
import { getLatestCourseAttempt } from "@/lib/course-seat-time"
import { getLatestExamResult } from "@/lib/exam-results"
import { isFinalExamSeatTimeBypassed } from "@/lib/dev-config"
import {
  getStudentIdentityProfile,
} from "@/lib/student-identity"
import {
  formatCertificateCompletionDate,
  getOrCreateCertificateId,
} from "@/lib/certificate-reference"

type CertificateStudent = {
  firstName: string
  lastName: string
}

function safeFilePart(value: string) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
}

function buildVerifyUrl(certificateId: string) {
  if (typeof window === "undefined") {
    return `/verify/${certificateId}`
  }

  return `${window.location.origin}/verify/${certificateId}`
}

export default function CertificatePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const autoDownloadTriggeredRef = useRef(false)

  const state =
    typeof params?.state === "string" ? params.state : "virginia"

  const config = getCourseConfig(state)
  const seatTimeBypassed = isFinalExamSeatTimeBypassed(state)

  const [loading, setLoading] = useState(true)
  const [downloadingPdf, setDownloadingPdf] = useState(false)
  const [student, setStudent] = useState<CertificateStudent | null>(null)

  const [seatTimeComplete, setSeatTimeComplete] = useState(false)

  const [examPassed, setExamPassed] = useState(false)
  const [examScore, setExamScore] = useState<number | null>(null)
  const [examCompletedAt, setExamCompletedAt] = useState<string | null>(null)

  const [certificateId, setCertificateId] = useState<string | null>(null)
  const [emailingCertificate, setEmailingCertificate] = useState(false)
  const [emailMessage, setEmailMessage] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const identityProfile = await getStudentIdentityProfile(state)

        if (identityProfile) {
          setStudent({
            firstName: String(identityProfile.first_name ?? "").trim(),
            lastName: String(identityProfile.last_name ?? "").trim(),
          })
        } else {
          setStudent(null)
        }

        const latestExam = await getLatestExamResult(state)

        if (latestExam) {
          const passed = Boolean(latestExam.passed)
          const completedAt = latestExam.completed_at ?? null
          const resultId = latestExam.id

          setExamPassed(passed)
          setExamScore(latestExam.score ?? null)
          setExamCompletedAt(completedAt)

          if (
            passed &&
            completedAt &&
            identityProfile?.user_id &&
            resultId
          ) {
            const persistedCertificateId = await getOrCreateCertificateId({
              supabase,
              examResultId: resultId,
              state,
              userId: identityProfile.user_id,
              completedAt,
            })

            setCertificateId(persistedCertificateId)
          } else {
            setCertificateId(null)
          }
        } else {
          setExamPassed(false)
          setExamScore(null)
          setExamCompletedAt(null)
          setCertificateId(null)
        }

        const latestAttempt = await getLatestCourseAttempt(state)

        if (latestAttempt) {
          const totalSeconds = latestAttempt.total_seconds ?? 0
          const requiredSeconds = latestAttempt.required_seconds ?? 28800
          const complete =
            latestAttempt.status === "completed" ||
            totalSeconds >= requiredSeconds

          setSeatTimeComplete(complete)
        } else {
          setSeatTimeComplete(false)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [state, supabase])

  const effectiveSeatTimeComplete = seatTimeComplete || seatTimeBypassed
  const unlocked = effectiveSeatTimeComplete && examPassed

  const fullName = [student?.firstName, student?.lastName]
    .filter(Boolean)
    .join(" ")

  const verifyUrl = certificateId ? buildVerifyUrl(certificateId) : null

  const handleDownloadPdf = useCallback(async () => {
    if (downloadingPdf || !unlocked) {
      return
    }

    try {
      setDownloadingPdf(true)

      const pdfFullName =
        [student?.firstName, student?.lastName]
          .filter(Boolean)
          .join(" ")
          .trim() || "Student Name"

      const pdfCertificateId = certificateId
      const pdfVerifyUrl = pdfCertificateId ? buildVerifyUrl(pdfCertificateId) : null
      const courseName = config.courseName
      const completionDate = formatCertificateCompletionDate(examCompletedAt)
      const scoreText =
        typeof examScore === "number" ? `${examScore}%` : "Passed"

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: "letter",
      })

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 36
      const innerWidth = pageWidth - margin * 2 - 36
      const centerX = pageWidth / 2

      pdf.setFillColor(255, 255, 255)
      pdf.rect(0, 0, pageWidth, pageHeight, "F")

      pdf.setDrawColor(203, 213, 225)
      pdf.setLineWidth(3)
      pdf.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2)

      pdf.setLineWidth(1)
      pdf.rect(
        margin + 12,
        margin + 12,
        pageWidth - (margin + 12) * 2,
        pageHeight - (margin + 12) * 2
      )

      pdf.setTextColor(37, 99, 235)
      pdf.setFont("helvetica", "bold")
      pdf.setFontSize(12)
      pdf.text("CERTIFICATE OF COMPLETION", centerX, 95, { align: "center" })

      pdf.setTextColor(15, 23, 42)
      pdf.setFont("times", "bold")
      pdf.setFontSize(28)
      pdf.text(courseName, centerX, 145, { align: "center", maxWidth: innerWidth })

      pdf.setFont("times", "normal")
      pdf.setFontSize(16)
      pdf.text("This certifies that", centerX, 190, { align: "center" })

      pdf.setFont("times", "bold")
      pdf.setFontSize(26)
      pdf.text(pdfFullName, centerX, 235, { align: "center", maxWidth: innerWidth })

      pdf.setLineWidth(1)
      pdf.line(centerX - 180, 245, centerX + 180, 245)

      const paragraph =
        `has successfully completed all requirements and passed the final exam for the ${courseName}.`

      pdf.setFont("times", "normal")
      pdf.setFontSize(15)
      const paragraphLines = pdf.splitTextToSize(paragraph, innerWidth - 40)
      pdf.text(paragraphLines, centerX, 285, { align: "center" })

      const infoTop = 355
      const boxWidth = 180
      const boxHeight = 62
      const gap = 18
      const totalWidth = boxWidth * 3 + gap * 2
      const startX = (pageWidth - totalWidth) / 2

      const boxes = [
        {
          x: startX,
          label: "State",
          value: state.toUpperCase(),
        },
        {
          x: startX + boxWidth + gap,
          label: "Final Exam Score",
          value: scoreText,
        },
        {
          x: startX + (boxWidth + gap) * 2,
          label: "Completion Date",
          value: completionDate || "—",
        },
      ]

      boxes.forEach((box) => {
        pdf.setDrawColor(226, 232, 240)
        pdf.setFillColor(248, 250, 252)
        pdf.roundedRect(box.x, infoTop, boxWidth, boxHeight, 8, 8, "FD")

        pdf.setTextColor(100, 116, 139)
        pdf.setFont("helvetica", "normal")
        pdf.setFontSize(10)
        pdf.text(box.label, box.x + boxWidth / 2, infoTop + 20, {
          align: "center",
        })

        pdf.setTextColor(15, 23, 42)
        pdf.setFont("helvetica", "bold")
        pdf.setFontSize(14)
        pdf.text(box.value, box.x + boxWidth / 2, infoTop + 42, {
          align: "center",
          maxWidth: boxWidth - 16,
        })
      })

      let footerY = 455

      if (pdfCertificateId) {
        pdf.setTextColor(71, 85, 105)
        pdf.setFont("helvetica", "normal")
        pdf.setFontSize(10)
        pdf.text("Certificate ID", centerX, footerY, { align: "center" })

        pdf.setTextColor(15, 23, 42)
        pdf.setFont("courier", "bold")
        pdf.setFontSize(14)
        pdf.text(pdfCertificateId, centerX, footerY + 18, { align: "center" })

        footerY += 42
      }

      if (pdfVerifyUrl) {
        pdf.setTextColor(71, 85, 105)
        pdf.setFont("helvetica", "normal")
        pdf.setFontSize(9)
        pdf.text("Verify this certificate at", centerX, footerY, {
          align: "center",
        })

        pdf.setTextColor(15, 23, 42)
        pdf.setFont("courier", "normal")
        pdf.setFontSize(9)
        const verifyLines = pdf.splitTextToSize(pdfVerifyUrl, innerWidth - 60)
        pdf.text(verifyLines, centerX, footerY + 14, {
          align: "center",
        })

        footerY += 34
      }

      pdf.setTextColor(107, 114, 128)
      pdf.setFont("helvetica", "normal")
      pdf.setFontSize(10)
      pdf.text(
        config.certificateIssuerLine,
        centerX,
        pageHeight - 50,
        { align: "center" }
      )

      const safeStudentName =
        `${safeFilePart(student?.firstName ?? "")}-${safeFilePart(student?.lastName ?? "")}`
          .replace(/^-+|-+$/g, "") || "student"

      const safeState = safeFilePart(state) || "state"
      const filename = `${safeState}-certificate-${safeStudentName}.pdf`

      pdf.save(filename)
    } catch (error) {
      console.error("PDF download failed:", error)
      alert("Could not generate PDF. Please try again.")
    } finally {
      setDownloadingPdf(false)
    }
  }, [
    certificateId,
    config.certificateIssuerLine,
    config.courseName,
    downloadingPdf,
    examCompletedAt,
    examScore,
    state,
    student?.firstName,
    student?.lastName,
    unlocked,
  ])

  useEffect(() => {
    if (loading || !unlocked || !certificateId) {
      return
    }

    const shouldAutoDownload = searchParams.get("download") === "1"

    if (!shouldAutoDownload || autoDownloadTriggeredRef.current) {
      return
    }

    autoDownloadTriggeredRef.current = true
    void handleDownloadPdf()
  }, [certificateId, handleDownloadPdf, loading, searchParams, unlocked])

  const handleSendCertificateEmail = useCallback(async () => {
    if (!certificateId || emailingCertificate) {
      return
    }

    try {
      setEmailingCertificate(true)
      setEmailMessage(null)

      const response = await fetch("/api/certificates/notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          state,
          certificateId,
        }),
      })

      const data = (await response.json()) as { ok?: boolean; error?: string }

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Could not send completion email.")
      }

      setEmailMessage("Completion email sent.")
    } catch (error) {
      console.error("Completion email trigger failed:", error)
      setEmailMessage("Could not send completion email right now.")
    } finally {
      setEmailingCertificate(false)
    }
  }, [certificateId, emailingCertificate, state])

  if (loading) return <div className="p-6">Loading certificate...</div>

  if (!unlocked) return <div className="p-6">Certificate Locked</div>

  return (
    <>
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }

          body {
            background: white !important;
          }
        }
      `}</style>

      <div className="mx-auto max-w-5xl space-y-6">
        <div className="no-print flex flex-wrap gap-3">
          <Link href={`/${state}/course`} className="rounded border px-4 py-2">
            Back
          </Link>

          <button
            onClick={() => window.print()}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Print
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={downloadingPdf}
            className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-60"
          >
            {downloadingPdf ? "Generating PDF..." : "Download PDF"}
          </button>

          <button
            onClick={() => void handleSendCertificateEmail()}
            disabled={emailingCertificate || !certificateId}
            className="rounded border border-slate-300 px-4 py-2 text-slate-700 disabled:opacity-60"
          >
            {emailingCertificate ? "Sending Email..." : "Email Certificate"}
          </button>
        </div>

        {emailMessage ? (
          <div className="no-print rounded border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            {emailMessage}
          </div>
        ) : null}

        <div className="bg-white p-6">
          <div className="border-4 border-slate-300 bg-white p-12 text-center shadow-sm">
            <h2 className="text-sm uppercase tracking-widest text-blue-600">
              Certificate of Completion
            </h2>

            <h1 className="mt-6 text-4xl font-bold">
              {config.courseName}
            </h1>

            <p className="mt-8 text-lg">This certifies that</p>

            <div className="mt-4 text-4xl font-bold underline">
              {fullName || "Student Name"}
            </div>

            <p className="mt-8 text-lg">
              has successfully completed all requirements and passed the final exam.
            </p>

            <div className="mt-10 text-lg">
              Score: {typeof examScore === "number" ? `${examScore}%` : "Passed"}
            </div>

            <div className="mt-4 text-lg">
              Date: {formatCertificateCompletionDate(examCompletedAt)}
            </div>

            {certificateId && (
              <div className="mt-10 text-sm text-slate-700">
                Certificate ID:
                <div className="mt-1 font-mono text-lg font-semibold text-slate-900">
                  {certificateId}
                </div>
              </div>
            )}

            {verifyUrl && (
              <div className="mt-6 text-xs text-slate-500">
                Verify this certificate at:
                <div className="mt-1 break-all font-mono">
                  {verifyUrl}
                </div>
              </div>
            )}

            <div className="mt-16 text-sm text-gray-500">
              {config.certificateIssuerLine}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
