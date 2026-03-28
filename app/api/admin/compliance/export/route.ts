import { NextResponse } from "next/server"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/admin-access"
import { loadComplianceData, toCsv } from "@/lib/admin-compliance"

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

  const { records } = await loadComplianceData()
  const csv = toCsv(records)
  const filename = `compliance-export-${new Date().toISOString().slice(0, 10)}.csv`

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  })
}
