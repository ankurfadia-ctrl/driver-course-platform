export type ReasonForAttendingCode =
  | "COU"
  | "DMV"
  | "INS"
  | "VOL"
  | "CMC"
  | "CMD"
  | "CMV"

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
  studentLabel: string
  description: string
}> = [
  {
    value: "COU",
    label: "Court Required (COU)",
    studentLabel: "Court required",
    description:
      "Choose this only if a court required you to complete a driver improvement course.",
  },
  {
    value: "DMV",
    label: "DMV Required (DMV)",
    studentLabel: "DMV required",
    description:
      "Choose this if DMV required you to complete the course.",
  },
  {
    value: "INS",
    label: "Insurance (INS)",
    studentLabel: "Insurance discount",
    description:
      "Choose this if you are taking the course for a possible insurance discount.",
  },
  {
    value: "VOL",
    label: "Volunteer (VOL)",
    studentLabel: "Voluntary / personal",
    description:
      "Choose this if you are taking the course voluntarily for safe driving points or personal improvement.",
  },
  {
    value: "CMC",
    label: "Commercial Driver Court Required (CMC)",
    studentLabel: "Commercial driver court required",
    description:
      "Choose this only if you are a CDL/commercial driver and a court required a commercial driver clinic.",
  },
  {
    value: "CMD",
    label: "Commercial Driver DMV Required (CMD)",
    studentLabel: "Commercial driver DMV required",
    description:
      "Choose this if you are a CDL/commercial driver and DMV required a commercial driver clinic.",
  },
  {
    value: "CMV",
    label: "Commercial Driver Volunteer (CMV)",
    studentLabel: "Commercial driver voluntary",
    description:
      "Choose this if you are a CDL/commercial driver taking the course voluntarily.",
  },
]

export function isCourtRelatedReason(value: string | null | undefined) {
  return value === "COU" || value === "CMC"
}

export function isCommercialReason(value: string | null | undefined) {
  return value === "CMC" || value === "CMD" || value === "CMV"
}

export function getReasonForAttendingLabel(value: string | null | undefined) {
  const match = REASON_FOR_ATTENDING_OPTIONS.find((option) => option.value === value)
  return match?.label ?? "-"
}

export function getReasonForAttendingStudentLabel(
  value: string | null | undefined
) {
  const match = REASON_FOR_ATTENDING_OPTIONS.find((option) => option.value === value)
  return match?.studentLabel ?? "-"
}

export function getReasonForAttendingDescription(
  value: string | null | undefined
) {
  const match = REASON_FOR_ATTENDING_OPTIONS.find((option) => option.value === value)
  return match?.description ?? ""
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
