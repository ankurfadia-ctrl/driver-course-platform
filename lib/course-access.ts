import { createClient } from "@/lib/supabase/client"

export type CourseAccessStatus = {
  isAuthenticated: boolean
  hasPaidAccess: boolean
  userId: string | null
  planCode: string | null
  supportTier: string | null
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
      .limit(1)

    if (error) {
      return {
        isAuthenticated: true,
        hasPaidAccess: false,
        userId: user.id,
        planCode: null,
        supportTier: null,
        error: "Could not verify course purchase.",
      }
    }

    const purchase = data?.[0]

    return {
      isAuthenticated: true,
      hasPaidAccess: Boolean(purchase),
      userId: user.id,
      planCode: purchase?.plan_code ?? null,
      supportTier: purchase?.support_tier ?? null,
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
      error: "Unexpected error while checking access.",
    }
  }
}
