import { NextRequest, NextResponse } from "next/server"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getAdminEmails } from "@/lib/admin-access"
import { getCourseConfig } from "@/lib/course-config"
import { getSupportReplyAddress } from "@/lib/support-email-routing"
import { getCoursePlanByCode } from "@/lib/payment/plans"
import {
  sendAdminPrioritySupportNotificationEmail,
} from "@/lib/email"

type CreateSupportRequestBody = {
  stateCode?: string
  category?: string
  subject?: string
  message?: string
  aiResponse?: {
    summary?: string | null
    suggestedSteps?: string[] | null
    escalationRecommended?: boolean | null
    escalationReason?: string | null
  } | null
  priorityRequested?: boolean
}

async function getStudentSupportTier(userId: string, stateCode: string) {
  const adminSupabase = createAdminClient()
  const { data, error } = await adminSupabase
    .from("course_purchases")
    .select("plan_code, support_tier, purchase_status, purchased_at")
    .eq("user_id", userId)
    .eq("state_code", stateCode)
    .eq("purchase_status", "paid")
    .order("purchased_at", { ascending: false })
    .limit(25)

  if (error) {
    throw error
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
      plan.planKind === "full-course" || plan.planKind === "support-upgrade"
    ) && purchase.support_tier === "priority"
  })

  return priorityPurchase ? "priority" : fullCoursePurchase?.support_tier ?? null
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized." },
        { status: 401 }
      )
    }

    const body = (await request.json()) as CreateSupportRequestBody
    const stateCode = String(body.stateCode ?? "").trim().toLowerCase()
    const category = String(body.category ?? "other").trim()
    const subject = String(body.subject ?? "").trim()
    const message = String(body.message ?? "").trim()
    if (!stateCode || message.length < 5 || subject.length < 2) {
      return NextResponse.json(
        { ok: false, error: "Invalid support request." },
        { status: 400 }
      )
    }

    const actualSupportTier = await getStudentSupportTier(user.id, stateCode)

    if (actualSupportTier !== "priority") {
      return NextResponse.json(
        {
          ok: false,
          error: "Human support requests are available only with priority support. Standard plans use the FAQ.",
        },
        { status: 403 }
      )
    }

    const adminSupabase = createAdminClient()
    const payload = {
      user_id: user.id,
      state_code: stateCode,
      category,
      subject,
      message,
      ai_summary: body.aiResponse?.summary ?? null,
      ai_suggested_steps: body.aiResponse?.suggestedSteps ?? [],
      escalation_recommended: body.aiResponse?.escalationRecommended ?? false,
      escalation_reason: body.aiResponse?.escalationReason ?? null,
      priority_requested: true,
      status: "open",
    }

    const { data, error } = await adminSupabase
      .from("support_requests")
      .insert(payload)
      .select("id")
      .single()

    if (error) {
      console.error("Error creating support request:", error)
      return NextResponse.json(
        { ok: false, error: "Could not save support request." },
        { status: 500 }
      )
    }

    const baseUrl = String(process.env.NEXT_PUBLIC_BASE_URL ?? "").trim()
    const adminEmails = getAdminEmails()
    const config = getCourseConfig(stateCode)

    if (baseUrl && adminEmails.length > 0 && user.email) {
      await Promise.all(
        adminEmails.map((email) =>
          sendAdminPrioritySupportNotificationEmail({
            email,
            stateName: config.stateName,
            subject,
            studentEmail: user.email ?? "Unknown",
            supportUrl: `${baseUrl}/admin/support`,
            message,
            priorityRequested: true,
            replyTo: getSupportReplyAddress(data.id) ?? undefined,
          })
        )
      )
    }

    return NextResponse.json({ ok: true, id: data.id })
  } catch (error) {
    console.error("Support request create route failed:", error)
    return NextResponse.json(
      { ok: false, error: "Could not save support request." },
      { status: 500 }
    )
  }
}
