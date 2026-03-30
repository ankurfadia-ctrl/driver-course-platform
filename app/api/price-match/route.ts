import { NextRequest, NextResponse } from "next/server"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

type PriceMatchRequestBody = {
  stateCode?: string
  subject?: string
  message?: string
  competitorUrl?: string
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
        { ok: false, error: "You must be signed in before requesting a price match." },
        { status: 401 }
      )
    }

    const body = (await request.json()) as PriceMatchRequestBody
    const stateCode = String(body.stateCode ?? "").trim().toLowerCase()
    const subject = String(body.subject ?? "").trim()
    const message = String(body.message ?? "").trim()
    const competitorUrl = String(body.competitorUrl ?? "").trim()

    if (!stateCode || subject.length < 3 || message.length < 10) {
      return NextResponse.json(
        { ok: false, error: "Please include the request details and competitor link." },
        { status: 400 }
      )
    }

    const adminSupabase = createAdminClient()
    const combinedMessage = competitorUrl
      ? `${message}\n\nCompetitor URL: ${competitorUrl}`
      : message

    const { data, error } = await adminSupabase
      .from("support_requests")
      .insert({
        user_id: user.id,
        state_code: stateCode,
        category: "price-match",
        subject,
        message: combinedMessage,
        ai_summary: "Price-match request submitted for manual review.",
        ai_suggested_steps: [
          "Review the competitor link.",
          "Confirm the offer is a public equivalent Virginia online course.",
          "If approved, create a one-time code in the admin pricing page.",
        ],
        escalation_recommended: true,
        escalation_reason: "Price-match requests require manual admin review.",
        priority_requested: false,
        status: "open",
      })
      .select("id")
      .single()

    if (error) {
      console.error("Could not save price-match request:", error)
      return NextResponse.json(
        { ok: false, error: "Could not save the price-match request." },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true, id: data.id })
  } catch (error) {
    console.error("Price-match route failed:", error)
    return NextResponse.json(
      { ok: false, error: "Could not send the price-match request." },
      { status: 500 }
    )
  }
}
