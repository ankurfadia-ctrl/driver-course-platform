import { NextResponse } from "next/server"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { isAdminEmail } from "@/lib/admin-access"

function toCsv(rows: Array<Record<string, unknown>>) {
  if (rows.length === 0) {
    return ""
  }

  const headers = Object.keys(rows[0])
  const data = rows.map((row) =>
    headers
      .map((header) => `"${String(row[header] ?? "").replace(/"/g, '""')}"`)
      .join(",")
  )

  return [headers.join(","), ...data].join("\n")
}

export async function GET() {
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

  const adminSupabase = createAdminClient()
  const { data, error } = await adminSupabase
    .from("support_requests")
    .select(
      "id, user_id, state_code, category, subject, message, ai_summary, escalation_recommended, escalation_reason, priority_requested, status, created_at"
    )
    .order("created_at", { ascending: false })
    .limit(1000)

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Could not export support requests." },
      { status: 500 }
    )
  }

  const csv = toCsv((data ?? []) as Array<Record<string, unknown>>)
  const filename = `support-requests-${new Date().toISOString().slice(0, 10)}.csv`

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  })
}
