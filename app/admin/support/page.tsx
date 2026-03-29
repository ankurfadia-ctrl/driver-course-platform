import { redirect } from "next/navigation"
import AdminSupportInboxClient, {
  type SupportRequestRow,
} from "@/components/admin/AdminSupportInboxClient"
import { createAdminClient } from "@/lib/supabase/admin"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/admin-access"
import { attachSupportMessages, type SupportMessageRow } from "@/lib/support-thread"

export const dynamic = "force-dynamic"

export default async function AdminSupportInboxPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    redirect("/")
  }

  const adminSupabase = createAdminClient()
  const { data, error } = await adminSupabase
    .from("support_requests")
    .select(
      "id, user_id, state_code, category, subject, message, ai_summary, ai_suggested_steps, escalation_recommended, escalation_reason, priority_requested, status, created_at"
    )
    .order("created_at", { ascending: false })
    .limit(200)

  if (error) {
    console.error("Could not load admin support requests:", error)
  }

  const requestIds = (data ?? []).map((request) => request.id)
  let messages: SupportMessageRow[] = []

  if (requestIds.length > 0) {
    const { data: messageRows, error: messagesError } = await adminSupabase
      .from("support_messages")
      .select("id, request_id, sender_role, message, created_at")
      .in("request_id", requestIds)
      .order("created_at", { ascending: true })

    if (messagesError) {
      console.error("Could not load admin support messages:", messagesError)
    } else {
      messages = (messageRows ?? []) as SupportMessageRow[]
    }
  }

  return (
    <AdminSupportInboxClient
      initialRequests={attachSupportMessages(
        (data ?? []) as SupportRequestRow[],
        messages
      )}
    />
  )
}
