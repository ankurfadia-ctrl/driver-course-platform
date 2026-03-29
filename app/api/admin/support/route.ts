import { NextRequest, NextResponse } from "next/server"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { isAdminEmail } from "@/lib/admin-access"
import { getCourseConfig, getSupportRoute } from "@/lib/course-config"
import { sendSupportReplyNotificationEmail } from "@/lib/email"

type UpdateSupportStatusBody = {
  action?: "status" | "reply"
  id?: string
  status?: string
  message?: string
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user || !isAdminEmail(user.email)) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized." },
        { status: 401 }
      )
    }

    const body = (await request.json()) as UpdateSupportStatusBody
    const action = String(body.action ?? "status").trim()
    const id = String(body.id ?? "").trim()
    const status = String(body.status ?? "").trim()
    const message = String(body.message ?? "").trim()

    const adminSupabase = createAdminClient()

    if (action === "reply") {
      if (!id || message.length < 2) {
        return NextResponse.json(
          { ok: false, error: "Invalid support reply." },
          { status: 400 }
        )
      }

      const { data: supportRequest, error: requestError } = await adminSupabase
        .from("support_requests")
        .select("id, user_id, state_code, subject")
        .eq("id", id)
        .maybeSingle()

      if (requestError || !supportRequest) {
        return NextResponse.json(
          { ok: false, error: "Support request not found." },
          { status: 404 }
        )
      }

      const { data: insertedMessage, error: insertError } = await adminSupabase
        .from("support_messages")
        .insert({
          request_id: id,
          sender_role: "admin",
          sender_user_id: user.id,
          message,
        })
        .select("id, request_id, sender_role, message, created_at")
        .single()

      if (insertError) {
        console.error("Admin support reply insert failed:", insertError)
        return NextResponse.json(
          { ok: false, error: "Could not send support reply." },
          { status: 500 }
        )
      }

      await adminSupabase
        .from("support_requests")
        .update({ status: "open" })
        .eq("id", id)

      if (supportRequest.user_id) {
        const {
          data: { user: targetUser },
        } = await adminSupabase.auth.admin.getUserById(supportRequest.user_id)

        if (targetUser?.email) {
          const config = getCourseConfig(supportRequest.state_code)
          const baseUrl = String(process.env.NEXT_PUBLIC_BASE_URL ?? "").trim()

          if (baseUrl) {
            await sendSupportReplyNotificationEmail({
              email: targetUser.email,
              stateName: config.stateName,
              subject: supportRequest.subject || "Support request",
              supportUrl: `${baseUrl}${getSupportRoute(supportRequest.state_code)}`,
              replyMessage: message,
            })
          }
        }
      }

      return NextResponse.json({ ok: true, message: insertedMessage })
    }

    if (!id || !["open", "resolved"].includes(status)) {
      return NextResponse.json(
        { ok: false, error: "Invalid support status update." },
        { status: 400 }
      )
    }

    const { error } = await adminSupabase
      .from("support_requests")
      .update({ status })
      .eq("id", id)

    if (error) {
      console.error("Admin support status update failed:", error)
      return NextResponse.json(
        { ok: false, error: "Could not update support request status." },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Admin support route failed:", error)
    return NextResponse.json(
      { ok: false, error: "Admin support update failed." },
      { status: 500 }
    )
  }
}
