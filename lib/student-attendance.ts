export type ReasonForAttendingCode =
  | "court-required"
  | "court-voluntary"
  | "dmv"
  | "insurance"
  | "employer"
  | "personal"

export type DriverCourseProfileMetadata = {
  reasonForAttending: ReasonForAttendingCode | ""
  courtName?: string
  caseOrTicketNumber?: string
  courtDocumentNotes?: string
  accuracyAcknowledged?: boolean
  accuracyAcknowledgedAt?: string
  dmvReportedAt?: string
  dmvReportedBy?: string
}

export const REASON_FOR_ATTENDING_OPTIONS: Array<{
  value: ReasonForAttendingCode
  label: string
}> = [
  { value: "court-required", label: "Court required" },
  { value: "court-voluntary", label: "Court related / voluntary" },
  { value: "dmv", label: "DMV related" },
  { value: "insurance", label: "Insurance related" },
  { value: "employer", label: "Employer related" },
  { value: "personal", label: "Personal improvement" },
]

export function isCourtRelatedReason(value: string | null | undefined) {
  return value === "court-required" || value === "court-voluntary"
}

export function getReasonForAttendingLabel(value: string | null | undefined) {
  const match = REASON_FOR_ATTENDING_OPTIONS.find((option) => option.value === value)
  return match?.label ?? "-"
}

export function normalizeDriverCourseProfileMetadata(
  value: unknown
): DriverCourseProfileMetadata {
  const raw =
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {}

  return {
    reasonForAttending:
      typeof raw.reasonForAttending === "string"
        ? (raw.reasonForAttending as ReasonForAttendingCode | "")
        : "",
    courtName: typeof raw.courtName === "string" ? raw.courtName : "",
    caseOrTicketNumber:
      typeof raw.caseOrTicketNumber === "string" ? raw.caseOrTicketNumber : "",
    courtDocumentNotes:
      typeof raw.courtDocumentNotes === "string" ? raw.courtDocumentNotes : "",
    accuracyAcknowledged:
      typeof raw.accuracyAcknowledged === "boolean"
        ? raw.accuracyAcknowledged
        : false,
    accuracyAcknowledgedAt:
      typeof raw.accuracyAcknowledgedAt === "string"
        ? raw.accuracyAcknowledgedAt
        : "",
    dmvReportedAt:
      typeof raw.dmvReportedAt === "string" ? raw.dmvReportedAt : "",
    dmvReportedBy:
      typeof raw.dmvReportedBy === "string" ? raw.dmvReportedBy : "",
  }
}
