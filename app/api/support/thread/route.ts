import { NextRequest, NextResponse } from "next/server"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import {
  attachSupportMessages,
  type SupportMessageRow,
} from "@/lib/support-thread"

type StudentReplyBody = {
  requestId?: string
  message?: string
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 })
    }

    const state = String(request.nextUrl.searchParams.get("state") ?? "")
      .trim()
      .toLowerCase()

    const adminSupabase = createAdminClient()
    let requestQuery = adminSupabase
      .from("support_requests")
      .select(
        "id, user_id, state_code, category, subject, message, ai_summary, ai_suggested_steps, escalation_recommended, escalation_reason, priority_requested, status, created_at"
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50)

    if (state) {
      requestQuery = requestQuery.eq("state_code", state)
    }

    const { data: requests, error: requestsError } = await requestQuery

    if (requestsError) {
      return NextResponse.json(
        { ok: false, error: "Could not load support requests." },
        { status: 500 }
      )
    }

    const requestIds = (requests ?? []).map((request) => request.id)
    let messages: SupportMessageRow[] = []

    if (requestIds.length > 0) {
      const { data: messageRows, error: messagesError } = await adminSupabase
        .from("support_messages")
        .select("id, request_id, sender_role, message, created_at")
        .in("request_id", requestIds)
        .order("created_at", { ascending: true })

      if (messagesError) {
        return NextResponse.json(
          { ok: false, error: "Could not load support conversation." },
          { status: 500 }
        )
      }

      messages = (messageRows ?? []) as SupportMessageRow[]
    }

    return NextResponse.json({
      ok: true,
      requests: attachSupportMessages((requests ?? []) as Array<{ id: string }>, messages),
    })
  } catch (error) {
    console.error("Support thread load failed:", error)
    return NextResponse.json(
      { ok: false, error: "Support thread load failed." },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 })
    }

    const body = (await request.json()) as StudentReplyBody
    const requestId = String(body.requestId ?? "").trim()
    const message = String(body.message ?? "").trim()

    if (!requestId || message.length < 2) {
      return NextResponse.json(
        { ok: false, error: "Invalid support reply." },
        { status: 400 }
      )
    }

    const adminSupabase = createAdminClient()
    const { data: existingRequest, error: requestError } = await adminSupabase
      .from("support_requests")
      .select("id, user_id, status")
      .eq("id", requestId)
      .eq("user_id", user.id)
      .maybeSingle()

    if (requestError || !existingRequest) {
      return NextResponse.json(
        { ok: false, error: "Support request not found." },
        { status: 404 }
      )
    }

    const { data: insertedMessage, error: insertError } = await adminSupabase
      .from("support_messages")
      .insert({
        request_id: requestId,
        sender_role: "student",
        sender_user_id: user.id,
        message,
      })
      .select("id, request_id, sender_role, message, created_at")
      .single()

    if (insertError) {
      return NextResponse.json(
        { ok: false, error: "Could not send support reply." },
        { status: 500 }
      )
    }

    if (existingRequest.status === "resolved") {
      await adminSupabase
        .from("support_requests")
        .update({ status: "open" })
        .eq("id", requestId)
    }

    return NextResponse.json({
      ok: true,
      message: insertedMessage,
    })
  } catch (error) {
    console.error("Student support reply failed:", error)
    return NextResponse.json(
      { ok: false, error: "Student support reply failed." },
      { status: 500 }
    )
  }
}
