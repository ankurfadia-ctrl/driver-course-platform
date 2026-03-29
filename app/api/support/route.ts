import { NextRequest, NextResponse } from "next/server"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getAdminEmails } from "@/lib/admin-access"
import { getCourseConfig } from "@/lib/course-config"
import { getSupportReplyAddress } from "@/lib/support-email-routing"
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
    const priorityRequested = Boolean(body.priorityRequested)

    if (!stateCode || message.length < 5 || subject.length < 2) {
      return NextResponse.json(
        { ok: false, error: "Invalid support request." },
        { status: 400 }
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
      priority_requested: priorityRequested,
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

    if (priorityRequested) {
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
              priorityRequested,
              replyTo: getSupportReplyAddress(data.id) ?? undefined,
            })
          )
        )
      }
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
