import jsPDF from "jspdf"
import { formatCertificateCompletionDate } from "@/lib/certificate-reference"

type CertificatePdfInput = {
  state: string
  courseName: string
  certificateIssuerLine: string
  firstName: string
  lastName: string
  examScore: number | null
  examCompletedAt: string | null
  certificateId: string
  verifyUrl: string
}

function safeFilePart(value: string) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
}

export function buildCertificatePdfFilename(
  state: string,
  firstName: string,
  lastName: string
) {
  const safeStudentName =
    `${safeFilePart(firstName)}-${safeFilePart(lastName)}`.replace(
      /^-+|-+$/g,
      ""
    ) || "student"

  const safeState = safeFilePart(state) || "state"
  return `${safeState}-certificate-${safeStudentName}.pdf`
}

export function generateCertificatePdfArrayBuffer(input: CertificatePdfInput) {
  const pdfFullName =
    [input.firstName, input.lastName].filter(Boolean).join(" ").trim() ||
    "Student Name"
  const completionDate = formatCertificateCompletionDate(input.examCompletedAt)
  const scoreText =
    typeof input.examScore === "number" ? `${input.examScore}%` : "Passed"

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
  pdf.text(input.courseName, centerX, 145, {
    align: "center",
    maxWidth: innerWidth,
  })

  pdf.setFont("times", "normal")
  pdf.setFontSize(16)
  pdf.text("This certifies that", centerX, 190, { align: "center" })

  pdf.setFont("times", "bold")
  pdf.setFontSize(26)
  pdf.text(pdfFullName, centerX, 235, { align: "center", maxWidth: innerWidth })

  pdf.setLineWidth(1)
  pdf.line(centerX - 180, 245, centerX + 180, 245)

  const paragraph = `has successfully completed all requirements and passed the final exam for the ${input.courseName}.`
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
      value: input.state.toUpperCase(),
    },
    {
      x: startX + boxWidth + gap,
      label: "Final Exam Score",
      value: scoreText,
    },
    {
      x: startX + (boxWidth + gap) * 2,
      label: "Completion Date",
      value: completionDate || "-",
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

  pdf.setTextColor(71, 85, 105)
  pdf.setFont("helvetica", "normal")
  pdf.setFontSize(10)
  pdf.text("Certificate ID", centerX, footerY, { align: "center" })

  pdf.setTextColor(15, 23, 42)
  pdf.setFont("courier", "bold")
  pdf.setFontSize(14)
  pdf.text(input.certificateId, centerX, footerY + 18, { align: "center" })

  footerY += 42

  pdf.setTextColor(71, 85, 105)
  pdf.setFont("helvetica", "normal")
  pdf.setFontSize(9)
  pdf.text("Verify this certificate at", centerX, footerY, {
    align: "center",
  })

  pdf.setTextColor(15, 23, 42)
  pdf.setFont("courier", "normal")
  pdf.setFontSize(9)
  const verifyLines = pdf.splitTextToSize(input.verifyUrl, innerWidth - 60)
  pdf.text(verifyLines, centerX, footerY + 14, {
    align: "center",
  })

  pdf.setTextColor(107, 114, 128)
  pdf.setFont("helvetica", "normal")
  pdf.setFontSize(10)
  pdf.text(input.certificateIssuerLine, centerX, pageHeight - 50, {
    align: "center",
  })

  return pdf.output("arraybuffer")
}
