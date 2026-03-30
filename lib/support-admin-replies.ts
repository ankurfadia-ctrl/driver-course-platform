import { createAdminClient } from "@/lib/supabase/admin"
import { getCourseConfig, getSupportRoute } from "@/lib/course-config"
import { sendSupportReplyNotificationEmail } from "@/lib/email"

type CreateAdminSupportReplyInput = {
  requestId: string
  message: string
  senderUserId?: string | null
}

async function resolveStudentSupportEmail(args: {
  adminSupabase: ReturnType<typeof createAdminClient>
  userId: string
  stateCode: string
}) {
  const authLookup = await args.adminSupabase.auth.admin.getUserById(args.userId)
  const authEmail = authLookup.data.user?.email?.trim()

  if (authEmail) {
    return authEmail
  }

  const { data: purchaseRows, error: purchaseError } = await args.adminSupabase
    .from("course_purchases")
    .select("stripe_customer_email, purchased_at, created_at")
    .eq("user_id", args.userId)
    .eq("state_code", args.stateCode)
    .order("purchased_at", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(5)

  if (purchaseError) {
    console.error("Support email fallback lookup failed:", purchaseError)
    return null
  }

  const purchaseEmail = purchaseRows?.find((row) =>
    String(row.stripe_customer_email ?? "").trim()
  )?.stripe_customer_email

  return purchaseEmail ? String(purchaseEmail).trim() : null
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
    const studentEmail = await resolveStudentSupportEmail({
      adminSupabase,
      userId: supportRequest.user_id,
      stateCode: supportRequest.state_code,
    })

    if (studentEmail) {
      try {
        const config = getCourseConfig(supportRequest.state_code)
        const baseUrl = String(process.env.NEXT_PUBLIC_BASE_URL ?? "").trim()

        if (baseUrl) {
          await sendSupportReplyNotificationEmail({
            email: studentEmail,
            stateName: config.stateName,
            subject: supportRequest.subject || "Support request",
            supportUrl: `${baseUrl}${getSupportRoute(supportRequest.state_code)}`,
            replyMessage: input.message,
          })
        }
      } catch (emailError) {
        console.error("Support reply notification email failed:", emailError)
      }
    }
  }

  return {
    request: supportRequest,
    message: insertedMessage,
  }
}
