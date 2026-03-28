import { NextRequest, NextResponse } from "next/server"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { isAdminEmail } from "@/lib/admin-access"

type UpdateSupportStatusBody = {
  id?: string
  status?: string
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
    const id = String(body.id ?? "").trim()
    const status = String(body.status ?? "").trim()

    if (!id || !["open", "resolved"].includes(status)) {
      return NextResponse.json(
        { ok: false, error: "Invalid support status update." },
        { status: 400 }
      )
    }

    const adminSupabase = createAdminClient()
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
