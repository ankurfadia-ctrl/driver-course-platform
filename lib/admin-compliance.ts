import { createAdminClient } from "@/lib/supabase/admin"
import { getCourseConfig } from "@/lib/course-config"
import { getCoursePlanByCode } from "@/lib/payment/plans"
import {
  getReasonForAttendingLabel,
  isCourtRelatedReason,
  normalizeDriverCourseProfileMetadata,
  type DriverCourseProfileMetadata,
} from "@/lib/student-attendance"

export type PurchaseRow = {
  id: string
  user_id: string
  state_code: string
  plan_code: string | null
  support_tier: string | null
  purchase_status: string | null
  stripe_customer_email: string | null
  amount_total: number | null
  currency: string | null
  purchased_at: string | null
  created_at: string | null
}

export type ExamResultRow = {
  id: string
  user_id: string
  state: string
  course_slug: string | null
  score: number | null
  passed: boolean | null
  completed_at: string | null
  created_at: string | null
  certificate_id: string | null
}

export type IdentityRow = {
  user_id: string
  state: string
  first_name: string | null
  last_name: string | null
  updated_at: string | null
}

export type CourseAttemptRow = {
  id: string
  user_id: string
  state_code: string
  course_slug: string | null
  status: string | null
  required_seconds: number | null
  total_seconds: number | null
  current_lesson: number | null
  last_activity_at: string | null
  updated_at: string | null
}

export type SupportRow = {
  id: string
  user_id: string | null
  state_code: string | null
  category: string | null
  priority_requested: boolean | null
  escalation_recommended: boolean | null
  status: string | null
  created_at: string | null
}

export type ComplianceRecord = {
  key: string
  userId: string
  state: string
  studentName: string
  email: string
  planCode: string
  supportTier: string
  purchaseStatus: string
  purchasedAt: string
  identityStatus: string
  seatTimeStatus: string
  seatTimeHours: string
  lessonProgress: string
  examStatus: string
  examFailureReason: string
  examRetakeAt: string
  completedAt: string
  certificateId: string
  supportStatus: string
  reasonForAttending: string
  courtName: string
  caseOrTicketNumber: string
  accuracyStatus: string
  dmvReportStatus: string
  reportedAt: string
}

type AuthUserProfileRow = {
  userId: string
  email: string
  profile: DriverCourseProfileMetadata
}

function isMissingColumnError(
  error: { code?: string | null; message?: string | null } | null | undefined,
  columnName: string
) {
  return Boolean(
    error?.code === "42703" &&
      String(error?.message ?? "")
        .toLowerCase()
        .includes(columnName.toLowerCase())
  )
}

function formatDateTime(value: string | null | undefined) {
  if (!value) {
    return "-"
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

function getRetakeEligibleAt(value: string | null | undefined) {
  if (!value) {
    return "-"
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return "-"
  }

  date.setHours(date.getHours() + 24)
  return formatDateTime(date.toISOString())
}

function getExamFailureReason(args: {
  score: number | null
  passed: boolean | null
  state: string
}) {
  if (args.passed !== false) {
    return "-"
  }

  const passingScorePercent = getCourseConfig(args.state).passingScorePercent

  if (typeof args.score !== "number") {
    return `Below the ${passingScorePercent}% passing score.`
  }

  const totalQuestions = 50
  const currentCorrect = Math.round((args.score / 100) * totalQuestions)
  const neededCorrect = Math.ceil((passingScorePercent / 100) * totalQuestions)
  const moreNeeded = Math.max(0, neededCorrect - currentCorrect)

  if (moreNeeded <= 0) {
    return `Did not meet the ${passingScorePercent}% passing requirement.`
  }

  return `Below the ${passingScorePercent}% passing score; needed about ${moreNeeded} more correct answer${moreNeeded === 1 ? "" : "s"}.`
}

export function formatCurrency(amount: number | null, currency: string | null) {
  if (amount == null || !currency) {
    return "-"
  }

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100)
  } catch {
    return `${amount / 100} ${currency.toUpperCase()}`
  }
}

export function titleize(value: string | null | undefined) {
  if (!value) {
    return "-"
  }

  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export function buildComplianceRecords(args: {
  purchases: PurchaseRow[]
  exams: ExamResultRow[]
  identities: IdentityRow[]
  attempts: CourseAttemptRow[]
  progressRows: Array<{
    user_id: string
    state: string
    lesson_slug: string
    completed: boolean | null
  }>
  supportRows: SupportRow[]
  authUsers: AuthUserProfileRow[]
}) {
  const identityMap = new Map(
    args.identities.map((row) => [`${row.user_id}:${row.state}`, row])
  )

  const latestExamMap = new Map<string, ExamResultRow>()
  for (const exam of args.exams) {
    const key = `${exam.user_id}:${exam.state}`
    if (!latestExamMap.has(key)) {
      latestExamMap.set(key, exam)
    }
  }

  const latestAttemptMap = new Map<string, CourseAttemptRow>()
  for (const attempt of args.attempts) {
    const key = `${attempt.user_id}:${attempt.state_code}`
    if (!latestAttemptMap.has(key)) {
      latestAttemptMap.set(key, attempt)
    }
  }

  const completedLessonCountMap = new Map<string, number>()
  for (const row of args.progressRows) {
    if (!row.completed) continue
    const key = `${row.user_id}:${row.state}`
    completedLessonCountMap.set(key, (completedLessonCountMap.get(key) ?? 0) + 1)
  }

  const supportByStudentMap = new Map<string, SupportRow[]>()
  for (const row of args.supportRows) {
    if (!row.user_id || !row.state_code) continue
    const key = `${row.user_id}:${row.state_code}`
    const current = supportByStudentMap.get(key) ?? []
    current.push(row)
    supportByStudentMap.set(key, current)
  }

  const authUserMap = new Map(
    args.authUsers.map((row) => [row.userId, row])
  )

  return args.purchases.map((purchase) => {
    const key = `${purchase.user_id}:${purchase.state_code}`
    const identity = identityMap.get(key)
    const exam = latestExamMap.get(key)
    const attempt = latestAttemptMap.get(key)
    const supportRows = supportByStudentMap.get(key) ?? []
    const completedLessons = completedLessonCountMap.get(key) ?? 0
    const authUser = authUserMap.get(purchase.user_id)
    const driverCourseProfile = normalizeDriverCourseProfileMetadata(
      authUser?.profile
    )

    const studentName = [identity?.first_name, identity?.last_name]
      .filter(Boolean)
      .join(" ")
      .trim()

    const totalSeconds = attempt?.total_seconds ?? 0
    const requiredSeconds = attempt?.required_seconds ?? 28800
    const seatTimeHours = `${(totalSeconds / 3600).toFixed(1)} / ${(
      requiredSeconds / 3600
    ).toFixed(1)} hrs`

    let supportStatus = "No requests"
    if (supportRows.length > 0) {
      const priorityOpen = supportRows.find(
        (row) => row.priority_requested && row.status !== "resolved"
      )
      const escalatedOpen = supportRows.find(
        (row) => row.escalation_recommended && row.status !== "resolved"
      )
      const open = supportRows.find((row) => row.status !== "resolved")

      if (priorityOpen) {
        supportStatus = "Priority open"
      } else if (escalatedOpen) {
        supportStatus = "Escalated open"
      } else if (open) {
        supportStatus = "Open"
      } else {
        supportStatus = "Resolved"
      }
    }

    const completionReady = Boolean(exam?.passed && exam?.certificate_id)
    const completionTimestamp = exam?.completed_at ?? exam?.created_at ?? null
    let dmvReportStatus = "Not ready"
    let reportedAt = "-"
    const courtRelated = isCourtRelatedReason(driverCourseProfile.reasonForAttending)
    const hasCourtInfo = Boolean(
      driverCourseProfile.courtName?.trim() ||
        driverCourseProfile.caseOrTicketNumber?.trim() ||
        driverCourseProfile.courtDocumentNotes?.trim()
    )

    if (completionReady) {
      if (driverCourseProfile.dmvReportedAt) {
        dmvReportStatus = "Reported to DMV"
        reportedAt = formatDateTime(driverCourseProfile.dmvReportedAt)
      } else if (courtRelated && !hasCourtInfo) {
        dmvReportStatus = "Missing court document"
      } else if (completionTimestamp) {
        const completedAtDate = new Date(completionTimestamp)
        const isOverdue =
          !Number.isNaN(completedAtDate.getTime()) &&
          Date.now() - completedAtDate.getTime() > 24 * 60 * 60 * 1000

        dmvReportStatus = isOverdue ? "Ready to report" : "Ready to report"
      } else {
        dmvReportStatus = "Ready to report"
      }
    }

    return {
      key,
      userId: purchase.user_id,
      state: String(purchase.state_code ?? "").toUpperCase(),
      studentName: studentName || "Identity pending",
      email: purchase.stripe_customer_email ?? "-",
      planCode: purchase.plan_code ?? "-",
      supportTier: titleize(purchase.support_tier),
      purchaseStatus: titleize(purchase.purchase_status),
      purchasedAt: formatDateTime(purchase.purchased_at ?? purchase.created_at),
      identityStatus: identity ? "On file" : "Missing",
      seatTimeStatus:
        attempt && totalSeconds >= requiredSeconds
          ? "Complete"
          : attempt?.status === "in_progress"
          ? "In progress"
          : "Not started",
      seatTimeHours,
      lessonProgress: `${completedLessons} / 8 complete`,
      examStatus: exam
        ? `${exam.passed ? "Passed" : "Failed"}${
            exam.score != null ? ` (${exam.score}%)` : ""
          }`
        : "No attempt",
      examFailureReason: getExamFailureReason({
        score: exam?.score ?? null,
        passed: exam?.passed ?? null,
        state: purchase.state_code,
      }),
      examRetakeAt:
        exam?.passed === false
          ? getRetakeEligibleAt(exam.completed_at ?? exam.created_at)
          : "-",
      completedAt: formatDateTime(completionTimestamp),
      certificateId: exam?.certificate_id ?? "-",
      supportStatus,
      reasonForAttending: getReasonForAttendingLabel(
        driverCourseProfile.reasonForAttending
      ),
      courtName: driverCourseProfile.courtName?.trim() || "-",
      caseOrTicketNumber: driverCourseProfile.caseOrTicketNumber?.trim() || "-",
      accuracyStatus: driverCourseProfile.accuracyAcknowledged
        ? "Acknowledged"
        : "Missing",
      dmvReportStatus,
      reportedAt,
    } satisfies ComplianceRecord
  })
}

async function loadAuthUserProfiles() {
  const supabase = createAdminClient()
  const users: AuthUserProfileRow[] = []
  let page = 1
  const perPage = 200

  while (page <= 5) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page,
      perPage,
    })

    if (error) {
      throw error
    }

    const batch = data?.users ?? []
    users.push(
      ...batch.map((user) => ({
        userId: user.id,
        email: user.email ?? "-",
        profile: normalizeDriverCourseProfileMetadata(
          (user.user_metadata as Record<string, unknown> | undefined)
            ?.driverCourseProfile
        ),
      }))
    )

    if (batch.length < perPage) {
      break
    }

    page += 1
  }

  return users
}

async function loadExamResultsRows(supabase: ReturnType<typeof createAdminClient>) {
  const primaryResult = await supabase
    .from("exam_results")
    .select("id, user_id, state, course_slug, score, passed, completed_at, created_at, certificate_id")
    .order("completed_at", { ascending: false })
    .limit(500)

  if (!isMissingColumnError(primaryResult.error, "course_slug")) {
    return primaryResult
  }

  const fallbackResult = await supabase
    .from("exam_results")
    .select("id, user_id, state, score, passed, completed_at, created_at, certificate_id")
    .order("completed_at", { ascending: false })
    .limit(500)

  return {
    data: (fallbackResult.data ?? []).map((row) => ({
      ...row,
      course_slug: null,
    })),
    error: fallbackResult.error,
  }
}

export async function loadComplianceData() {
  const supabase = createAdminClient()

  const [
    purchasesResult,
    examsResult,
    identitiesResult,
    attemptsResult,
    progressResult,
    supportResult,
    authUsersResult,
  ] = await Promise.all([
    supabase
      .from("course_purchases")
      .select(
        "id, user_id, state_code, plan_code, support_tier, purchase_status, stripe_customer_email, amount_total, currency, purchased_at, created_at"
      )
      .eq("purchase_status", "paid")
      .order("purchased_at", { ascending: false })
      .limit(200),
    loadExamResultsRows(supabase),
    supabase
      .from("student_identity_profiles")
      .select("user_id, state, first_name, last_name, updated_at")
      .limit(500),
    supabase
      .from("course_attempts")
      .select("id, user_id, state_code, course_slug, status, required_seconds, total_seconds, current_lesson, last_activity_at, updated_at")
      .order("updated_at", { ascending: false })
      .limit(500),
    supabase
      .from("course_progress")
      .select("user_id, state, course_slug, lesson_slug, completed")
      .limit(2000),
    supabase
      .from("support_requests")
      .select("id, user_id, state_code, category, priority_requested, escalation_recommended, status, created_at")
      .order("created_at", { ascending: false })
      .limit(500),
    loadAuthUserProfiles(),
  ])

  const errors = [
    purchasesResult.error,
    examsResult.error,
    identitiesResult.error,
    attemptsResult.error,
    progressResult.error,
    supportResult.error,
  ].filter(Boolean)

  const purchases = (purchasesResult.data ?? []) as PurchaseRow[]
  const exams = ((examsResult.data ?? []) as ExamResultRow[]).filter(
    (row) => (row.course_slug ?? "driver-improvement") === "driver-improvement"
  )
  const identities = (identitiesResult.data ?? []) as IdentityRow[]
  const attempts = ((attemptsResult.data ?? []) as CourseAttemptRow[]).filter(
    (row) => (row.course_slug ?? "driver-improvement") === "driver-improvement"
  )
  const progressRows =
    (progressResult.data ?? []) as Array<{
      user_id: string
      state: string
      course_slug?: string | null
      lesson_slug: string
      completed: boolean | null
    }>
  const driverPurchases = purchases.filter((purchase) => {
    const plan = getCoursePlanByCode(String(purchase.plan_code ?? ""))
    return !plan || plan.courseSlug === "driver-improvement"
  })
  const driverProgressRows = progressRows.filter((row) =>
    ["driver-improvement", "driver-improvement-course"].includes(
      String(row.course_slug ?? "driver-improvement")
    )
  )
  const supportRows = (supportResult.data ?? []) as SupportRow[]
  const authUsers = authUsersResult ?? []

  return {
    errors,
    purchases: driverPurchases,
    records: buildComplianceRecords({
      purchases: driverPurchases,
      exams,
      identities,
      attempts,
      progressRows: driverProgressRows,
      supportRows,
      authUsers,
    }),
  }
}

export function getComplianceSummary(records: ComplianceRecord[], purchases: PurchaseRow[]) {
  return {
    paidPurchases: purchases.length,
    identitiesOnFile: records.filter((record) => record.identityStatus === "On file").length,
    seatTimeComplete: records.filter((record) => record.seatTimeStatus === "Complete").length,
    examPassed: records.filter((record) => record.examStatus.startsWith("Passed")).length,
    certificatesIssued: records.filter((record) => record.certificateId !== "-").length,
    supportOpen: records.filter((record) => record.supportStatus !== "No requests" && record.supportStatus !== "Resolved").length,
    reportingPending: records.filter(
      (record) =>
        record.dmvReportStatus === "Ready to report" ||
        record.dmvReportStatus === "Missing court document"
    ).length,
  }
}

export function getDmvReportingQueue(records: ComplianceRecord[]) {
  return records
    .filter(
      (record) =>
        record.certificateId !== "-" &&
        (record.dmvReportStatus === "Ready to report" ||
          record.dmvReportStatus === "Missing court document" ||
          record.dmvReportStatus === "Reported to DMV")
    )
    .sort((a, b) => {
      if (a.dmvReportStatus === b.dmvReportStatus) return 0
      if (a.dmvReportStatus === "Missing court document") return -1
      if (b.dmvReportStatus === "Missing court document") return 1
      if (a.dmvReportStatus === "Ready to report") return -1
      if (b.dmvReportStatus === "Ready to report") return 1
      return 0
    })
}

export function toCsv(records: ComplianceRecord[]) {
  const headers = [
    "state",
    "student_name",
    "email",
    "user_id",
    "plan_code",
    "support_tier",
    "purchase_status",
    "purchased_at",
    "identity_status",
    "seat_time_status",
    "seat_time_hours",
    "lesson_progress",
    "exam_status",
    "exam_failure_reason",
    "exam_retake_at",
    "completed_at",
    "certificate_id",
    "support_status",
    "reason_for_attending",
    "court_name",
    "case_or_ticket_number",
    "accuracy_status",
    "dmv_report_status",
    "reported_at",
  ]

  const rows = records.map((record) =>
    [
      record.state,
      record.studentName,
      record.email,
      record.userId,
      record.planCode,
      record.supportTier,
      record.purchaseStatus,
      record.purchasedAt,
      record.identityStatus,
      record.seatTimeStatus,
      record.seatTimeHours,
      record.lessonProgress,
      record.examStatus,
      record.examFailureReason,
      record.examRetakeAt,
      record.completedAt,
      record.certificateId,
      record.supportStatus,
      record.reasonForAttending,
      record.courtName,
      record.caseOrTicketNumber,
      record.accuracyStatus,
      record.dmvReportStatus,
      record.reportedAt,
    ]
      .map((value) => `"${String(value).replace(/"/g, '""')}"`)
      .join(",")
  )

  return [headers.join(","), ...rows].join("\n")
}
