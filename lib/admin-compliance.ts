import { createAdminClient } from "@/lib/supabase/admin"
import {
  getReasonForAttendingLabel,
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
  completedAt: string
  certificateId: string
  supportStatus: string
  reasonForAttending: string
  courtName: string
  caseOrTicketNumber: string
  accuracyStatus: string
  dmvReportStatus: string
}

type AuthUserProfileRow = {
  userId: string
  email: string
  profile: DriverCourseProfileMetadata
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

    if (completionReady) {
      if (driverCourseProfile.dmvReportedAt) {
        dmvReportStatus = `Reported ${formatDateTime(
          driverCourseProfile.dmvReportedAt
        )}`
      } else if (completionTimestamp) {
        const completedAtDate = new Date(completionTimestamp)
        const isOverdue =
          !Number.isNaN(completedAtDate.getTime()) &&
          Date.now() - completedAtDate.getTime() > 24 * 60 * 60 * 1000

        dmvReportStatus = isOverdue ? "Overdue" : "Pending"
      } else {
        dmvReportStatus = "Pending"
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
    supabase
      .from("exam_results")
      .select("id, user_id, state, score, passed, completed_at, created_at, certificate_id")
      .order("completed_at", { ascending: false })
      .limit(500),
    supabase
      .from("student_identity_profiles")
      .select("user_id, state, first_name, last_name, updated_at")
      .limit(500),
    supabase
      .from("course_attempts")
      .select("id, user_id, state_code, status, required_seconds, total_seconds, current_lesson, last_activity_at, updated_at")
      .order("updated_at", { ascending: false })
      .limit(500),
    supabase
      .from("course_progress")
      .select("user_id, state, lesson_slug, completed")
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
  const exams = (examsResult.data ?? []) as ExamResultRow[]
  const identities = (identitiesResult.data ?? []) as IdentityRow[]
  const attempts = (attemptsResult.data ?? []) as CourseAttemptRow[]
  const progressRows =
    (progressResult.data ?? []) as Array<{
      user_id: string
      state: string
      lesson_slug: string
      completed: boolean | null
    }>
  const supportRows = (supportResult.data ?? []) as SupportRow[]
  const authUsers = authUsersResult ?? []

  return {
    errors,
    purchases,
    records: buildComplianceRecords({
      purchases,
      exams,
      identities,
      attempts,
      progressRows,
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
        record.dmvReportStatus === "Pending" ||
        record.dmvReportStatus === "Overdue"
    ).length,
  }
}

export function getDmvReportingQueue(records: ComplianceRecord[]) {
  return records
    .filter(
      (record) =>
        record.certificateId !== "-" &&
        (record.dmvReportStatus === "Pending" ||
          record.dmvReportStatus === "Overdue" ||
          record.dmvReportStatus.startsWith("Reported"))
    )
    .sort((a, b) => {
      if (a.dmvReportStatus === b.dmvReportStatus) return 0
      if (a.dmvReportStatus === "Overdue") return -1
      if (b.dmvReportStatus === "Overdue") return 1
      if (a.dmvReportStatus === "Pending") return -1
      if (b.dmvReportStatus === "Pending") return 1
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
    "completed_at",
    "certificate_id",
    "support_status",
    "reason_for_attending",
    "court_name",
    "case_or_ticket_number",
    "accuracy_status",
    "dmv_report_status",
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
      record.completedAt,
      record.certificateId,
      record.supportStatus,
      record.reasonForAttending,
      record.courtName,
      record.caseOrTicketNumber,
      record.accuracyStatus,
      record.dmvReportStatus,
    ]
      .map((value) => `"${String(value).replace(/"/g, '""')}"`)
      .join(",")
  )

  return [headers.join(","), ...rows].join("\n")
}
