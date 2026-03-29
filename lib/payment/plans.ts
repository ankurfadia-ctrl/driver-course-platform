export type SupportTier = "standard" | "priority"
export type PlanKind = "full-course" | "support-upgrade" | "certificate-mail"

export type CoursePlan = {
  stateCode: string
  courseSlug: string
  planCode: string
  planKind: PlanKind
  displayName: string
  priceCents: number
  currency: "usd"
  supportTier: SupportTier
  includesCertificate: boolean
  includesPrioritySupport: boolean
  active: boolean
}

export type PurchaseContext = {
  hasPaidAccess: boolean
  supportTier: SupportTier | null
}

export type PlanEligibility = {
  allowed: boolean
  reason: string | null
}

type EligiblePlanShape = Pick<CoursePlan, "planKind" | "supportTier">

const COURSE_PLANS: CoursePlan[] = [
  {
    stateCode: "virginia",
    courseSlug: "driver-improvement",
    planCode: "va-standard",
    planKind: "full-course",
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
    planKind: "full-course",
    displayName: "Virginia Driver Improvement Course + Priority Support",
    priceCents: 2499,
    currency: "usd",
    supportTier: "priority",
    includesCertificate: true,
    includesPrioritySupport: true,
    active: true,
  },
  {
    stateCode: "virginia",
    courseSlug: "driver-improvement",
    planCode: "va-priority-upgrade",
    planKind: "support-upgrade",
    displayName: "Priority Support Upgrade",
    priceCents: 999,
    currency: "usd",
    supportTier: "priority",
    includesCertificate: false,
    includesPrioritySupport: true,
    active: true,
  },
  {
    stateCode: "virginia",
    courseSlug: "driver-improvement",
    planCode: "va-mailed-certificate",
    planKind: "certificate-mail",
    displayName: "Mailed Certificate Copy",
    priceCents: 499,
    currency: "usd",
    supportTier: "standard",
    includesCertificate: false,
    includesPrioritySupport: false,
    active: true,
  },
]

export function getCoursePlans(
  stateCode: string,
  courseSlug = "driver-improvement"
) {
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

export function getPlanEligibility(
  plan: EligiblePlanShape,
  purchase: PurchaseContext
): PlanEligibility {
  if (plan.planKind === "support-upgrade") {
    if (!purchase.hasPaidAccess) {
      return {
        allowed: false,
        reason: "You must purchase the course before buying a support upgrade.",
      }
    }

    if (purchase.supportTier === "priority") {
      return {
        allowed: false,
        reason: "This account already has priority support.",
      }
    }

    if (purchase.supportTier !== "standard") {
      return {
        allowed: false,
        reason: "A standard course purchase is required before buying this upgrade.",
      }
    }

    return {
      allowed: true,
      reason: null,
    }
  }

  if (plan.planKind === "certificate-mail") {
    if (!purchase.hasPaidAccess) {
      return {
        allowed: false,
        reason: "You must complete a paid course purchase before ordering a mailed certificate copy.",
      }
    }

    return {
      allowed: true,
      reason: null,
    }
  }

  if (purchase.hasPaidAccess) {
    return {
      allowed: false,
      reason: "This account already has a paid course purchase for this state.",
    }
  }

  return {
    allowed: true,
    reason: null,
  }
}

export function getAvailableCoursePlans(
  stateCode: string,
  purchase: PurchaseContext,
  courseSlug = "driver-improvement"
) {
  return getCoursePlans(stateCode, courseSlug).filter(
    (plan) => getPlanEligibility(plan, purchase).allowed
  )
}

export function formatPriceFromCents(
  priceCents: number,
  currency: "usd" = "usd"
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(priceCents / 100)
}
