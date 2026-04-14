import { NextRequest, NextResponse } from "next/server"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/admin-access"
import { createAdminClient } from "@/lib/supabase/admin"
import { getCoursePlans } from "@/lib/payment/plans"

type DeleteComplianceBody = {
  userId?: string
  state?: string
}

export async function POST(request: NextRequest) {
  try {
    const authSupabase = await createSupabaseServerClient()
    const {
      data: { user },
    } = await authSupabase.auth.getUser()

    if (!user || !isAdminEmail(user.email)) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized." },
        { status: 401 }
      )
    }

    const body = (await request.json()) as DeleteComplianceBody
    const userId = String(body.userId ?? "").trim()
    const state = String(body.state ?? "").trim().toLowerCase()

    if (!userId || !state) {
      return NextResponse.json(
        { ok: false, error: "Missing delete target." },
        { status: 400 }
      )
    }

    const adminSupabase = createAdminClient()
    const driverPlanCodes = getCoursePlans(state, "driver-improvement").map(
      (plan) => plan.planCode
    )

    const [
      purchasesResult,
      examsResult,
      identityResult,
      attemptsResult,
      progressResult,
      supportResult,
    ] = await Promise.all([
      adminSupabase
        .from("course_purchases")
        .delete()
        .eq("user_id", userId)
        .eq("state_code", state)
        .in("plan_code", driverPlanCodes),
      adminSupabase
        .from("exam_results")
        .delete()
        .eq("user_id", userId)
        .eq("state", state)
        .eq("course_slug", "driver-improvement"),
      adminSupabase
        .from("student_identity_profiles")
        .delete()
        .eq("user_id", userId)
        .eq("state", state),
      adminSupabase
        .from("course_attempts")
        .delete()
        .eq("user_id", userId)
        .eq("state_code", state)
        .eq("course_slug", "driver-improvement"),
      adminSupabase
        .from("course_progress")
        .delete()
        .eq("user_id", userId)
        .eq("state", state)
        .in("course_slug", ["driver-improvement", "driver-improvement-course"]),
      adminSupabase
        .from("support_requests")
        .delete()
        .eq("user_id", userId)
        .eq("state_code", state),
    ])

    const firstError =
      purchasesResult.error ||
      examsResult.error ||
      identityResult.error ||
      attemptsResult.error ||
      progressResult.error ||
      supportResult.error

    if (firstError) {
      console.error("Delete compliance records failed:", firstError)
      return NextResponse.json(
        { ok: false, error: "Could not delete dashboard records." },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Admin compliance delete route failed:", error)
    return NextResponse.json(
      { ok: false, error: "Could not delete dashboard records." },
      { status: 500 }
    )
  }
}
