export const VIRGINIA_COURSE_ACCESS_DAYS = 90

function startOfDay(value: Date) {
  const next = new Date(value)
  next.setHours(0, 0, 0, 0)
  return next
}

export function getCourseAccessDeadline(
  purchasedAt: string | null | undefined,
  days = VIRGINIA_COURSE_ACCESS_DAYS
) {
  if (!purchasedAt) return null

  const purchaseDate = new Date(purchasedAt)

  if (Number.isNaN(purchaseDate.getTime())) {
    return null
  }

  const deadline = new Date(purchaseDate)
  deadline.setDate(deadline.getDate() + days)
  return deadline
}

export function isCourseAccessExpired(
  purchasedAt: string | null | undefined,
  days = VIRGINIA_COURSE_ACCESS_DAYS,
  now = new Date()
) {
  const deadline = getCourseAccessDeadline(purchasedAt, days)

  if (!deadline) return false

  return startOfDay(now) > startOfDay(deadline)
}

export function formatCourseAccessDeadline(
  purchasedAt: string | null | undefined,
  days = VIRGINIA_COURSE_ACCESS_DAYS
) {
  const deadline = getCourseAccessDeadline(purchasedAt, days)

  if (!deadline) return null

  return deadline.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}
