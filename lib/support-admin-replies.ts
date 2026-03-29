import { createAdminClient } from "@/lib/supabase/admin"
import { getCourseConfig, getSupportRoute } from "@/lib/course-config"
import { sendSupportReplyNotificationEmail } from "@/lib/email"

type CreateAdminSupportReplyInput = {
  requestId: string
  message: string
  senderUserId?: string | null
}

export async function createAdminSupportReply(input: CreateAdminSupportReplyInput) {
  const adminSupabase = createAdminClient()

  const { data: supportRequest, error: requestError } = await adminSupabase
    .from("support_requests")
    .select("id, user_id, state_code, subject")
    .eq("id", input.requestId)
    .maybeSingle()

  if (requestError || !supportRequest) {
    throw new Error("Support request not found.")
  }

  const { data: insertedMessage, error: insertError } = await adminSupabase
    .from("support_messages")
    .insert({
      request_id: input.requestId,
      sender_role: "admin",
      sender_user_id: input.senderUserId ?? null,
      message: input.message,
    })
    .select("id, request_id, sender_role, message, created_at")
    .single()

  if (insertError) {
    throw new Error("Could not send support reply.")
  }

  await adminSupabase
    .from("support_requests")
    .update({ status: "open" })
    .eq("id", input.requestId)

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
          replyMessage: input.message,
        })
      }
    }
  }

  return {
    request: supportRequest,
    message: insertedMessage,
  }
}

