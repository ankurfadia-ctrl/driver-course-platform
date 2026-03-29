import { getCoursePlanByCode } from "@/lib/payment/plans"

export type StripeCheckoutPlan = {
  planCode: string
  stateCode: string
  courseSlug: string
  planKind: "full-course" | "support-upgrade"
  displayName: string
  unitAmount: number
  currency: "usd"
  supportTier: "standard" | "priority"
  includesPrioritySupport: boolean
}

export function getStripeCheckoutPlan(
  planCode: string
): StripeCheckoutPlan | null {
  const plan = getCoursePlanByCode(planCode)

  if (!plan || !plan.active) {
    return null
  }

  return {
    planCode: plan.planCode,
    stateCode: plan.stateCode,
    courseSlug: plan.courseSlug,
    planKind: plan.planKind,
    displayName: plan.displayName,
    unitAmount: plan.priceCents,
    currency: plan.currency,
    supportTier: plan.supportTier,
    includesPrioritySupport: plan.includesPrioritySupport,
  }
}

export function buildCheckoutSuccessUrl(stateCode: string) {
  return `/${stateCode}/checkout/success`
}

export function buildCheckoutCancelUrl(stateCode: string, planCode: string) {
  return `/${stateCode}/checkout/${planCode}`
}
