import { createClient } from "@/lib/supabase/client"
import { isCourseAccessExpired } from "@/lib/course-deadline"
import { getCoursePlanByCode } from "@/lib/payment/plans"

export type CourseAccessStatus = {
  isAuthenticated: boolean
  hasPaidAccess: boolean
  userId: string | null
  planCode: string | null
  supportTier: string | null
  purchasedAt: string | null
  accessExpired: boolean
  error: string | null
}

function normalizeState(state: string) {
  return String(state ?? "").trim().toLowerCase()
}

export async function getCourseAccessStatus(
  state: string
): Promise<CourseAccessStatus> {
  const supabase = createClient()
  const normalizedState = normalizeState(state)

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
      return {
        isAuthenticated: false,
        hasPaidAccess: false,
        userId: null,
        planCode: null,
        supportTier: null,
        purchasedAt: null,
        accessExpired: false,
        error: "Could not verify signed-in user.",
      }
    }

    if (!user) {
      return {
        isAuthenticated: false,
        hasPaidAccess: false,
        userId: null,
        planCode: null,
        supportTier: null,
        purchasedAt: null,
        accessExpired: false,
        error: "No signed-in user found.",
      }
    }

    const { data, error } = await supabase
      .from("course_purchases")
      .select("plan_code, support_tier, purchase_status, purchased_at")
      .eq("user_id", user.id)
      .eq("state_code", normalizedState)
      .eq("purchase_status", "paid")
      .order("purchased_at", { ascending: false })
      .limit(25)

    if (error) {
      return {
        isAuthenticated: true,
        hasPaidAccess: false,
        userId: user.id,
        planCode: null,
        supportTier: null,
        purchasedAt: null,
        accessExpired: false,
        error: "Could not verify course purchase.",
      }
    }

    const purchases = data ?? []
    const fullCoursePurchase =
      purchases.find((purchase) => {
        const plan = getCoursePlanByCode(String(purchase.plan_code ?? ""))
        return plan?.planKind === "full-course"
      }) ?? null

    const priorityPurchase = purchases.find((purchase) => {
      const plan = getCoursePlanByCode(String(purchase.plan_code ?? ""))

      if (!plan) {
        return purchase.support_tier === "priority"
      }

      return (
        plan.planKind === "full-course" ||
        plan.planKind === "support-upgrade"
      ) && purchase.support_tier === "priority"
    })

    const accessExpired = isCourseAccessExpired(
      fullCoursePurchase?.purchased_at ?? null
    )

    return {
      isAuthenticated: true,
      hasPaidAccess: Boolean(fullCoursePurchase) && !accessExpired,
      userId: user.id,
      planCode: fullCoursePurchase?.plan_code ?? null,
      supportTier: priorityPurchase
        ? "priority"
        : fullCoursePurchase?.support_tier ?? null,
      purchasedAt: fullCoursePurchase?.purchased_at ?? null,
      accessExpired,
      error: null,
    }
  } catch (error) {
    console.error("Course access status lookup failed:", error)

    return {
      isAuthenticated: false,
      hasPaidAccess: false,
      userId: null,
      planCode: null,
      supportTier: null,
      purchasedAt: null,
      accessExpired: false,
      error: "Unexpected error while checking access.",
    }
  }
}
