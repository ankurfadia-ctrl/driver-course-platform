import { redirect } from "next/navigation"
import AdminSupportInboxClient, {
  type SupportRequestRow,
} from "@/components/admin/AdminSupportInboxClient"
import { createAdminClient } from "@/lib/supabase/admin"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/admin-access"

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
      "id, state_code, category, subject, message, ai_summary, ai_suggested_steps, escalation_recommended, escalation_reason, priority_requested, status, created_at"
    )
    .order("created_at", { ascending: false })
    .limit(200)

  if (error) {
    console.error("Could not load admin support requests:", error)
  }

  return (
    <AdminSupportInboxClient initialRequests={(data ?? []) as SupportRequestRow[]} />
  )
}
