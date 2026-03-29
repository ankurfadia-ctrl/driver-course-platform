import { NextRequest, NextResponse } from "next/server"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { isAdminEmail } from "@/lib/admin-access"
import { createAdminSupportReply } from "@/lib/support-admin-replies"

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

      try {
        const result = await createAdminSupportReply({
          requestId: id,
          message,
          senderUserId: user.id,
        })

        return NextResponse.json({ ok: true, message: result.message })
      } catch (error) {
        console.error("Admin support reply insert failed:", error)
        return NextResponse.json(
          { ok: false, error: "Could not send support reply." },
          { status: 500 }
        )
      }
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
