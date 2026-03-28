export type SupportTier = "standard" | "priority"

export type CoursePlan = {
  stateCode: string
  courseSlug: string
  planCode: string
  displayName: string
  priceCents: number
  currency: "usd"
  supportTier: SupportTier
  includesCertificate: boolean
  includesPrioritySupport: boolean
  active: boolean
}

const COURSE_PLANS: CoursePlan[] = [
  {
    stateCode: "virginia",
    courseSlug: "driver-improvement",
    planCode: "va-standard",
    displayName: "Virginia Driver Improvement Course",
    priceCents: 1999,
    currency: "usd",
    supportTier: "standard",
    includesCertificate: true,
    includesPrioritySupport: false,
    active: true,
  },
  {
    stateCode: "virginia",
    courseSlug: "driver-improvement",
    planCode: "va-priority",
    displayName: "Virginia Driver Improvement Course + Priority Support",
    priceCents: 2499,
    currency: "usd",
    supportTier: "priority",
    includesCertificate: true,
    includesPrioritySupport: true,
    active: true,
  },
]

export function getCoursePlans(stateCode: string, courseSlug = "driver-improvement") {
  return COURSE_PLANS.filter(
    (plan) =>
      plan.active &&
      plan.stateCode === stateCode &&
      plan.courseSlug === courseSlug
  )
}

export function getCoursePlanByCode(planCode: string) {
  return COURSE_PLANS.find((plan) => plan.planCode === planCode) ?? null
}

export function formatPriceFromCents(priceCents: number, currency: "usd" = "usd") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(priceCents / 100)
}