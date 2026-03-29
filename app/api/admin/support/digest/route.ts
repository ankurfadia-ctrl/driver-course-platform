import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getAdminEmails } from "@/lib/admin-access"
import { getCourseConfig } from "@/lib/course-config"
import { sendAdminStandardSupportDigestEmail } from "@/lib/email"

function isAuthorized(request: NextRequest) {
  const bearer = request.headers.get("authorization") ?? ""
  const expectedSecrets = [
    String(process.env.SUPPORT_DIGEST_SECRET ?? "").trim(),
    String(process.env.CRON_SECRET ?? "").trim(),
  ].filter(Boolean)

  if (expectedSecrets.length === 0) {
    return false
  }

  return expectedSecrets.some((secret) => bearer === `Bearer ${secret}`)
}

export async function GET(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 })
    }

    const adminEmails = getAdminEmails()
    const baseUrl = String(process.env.NEXT_PUBLIC_BASE_URL ?? "").trim()

    if (adminEmails.length === 0 || !baseUrl) {
      return NextResponse.json(
        { ok: false, error: "Missing admin email or base URL configuration." },
        { status: 500 }
      )
    }

    const adminSupabase = createAdminClient()
    const { data: requests, error } = await adminSupabase
      .from("support_requests")
      .select("id, user_id, state_code, subject, priority_requested, status, created_at")
      .eq("status", "open")
      .eq("priority_requested", false)
      .order("created_at", { ascending: true })

    if (error) {
      console.error("Standard support digest query failed:", error)
      return NextResponse.json(
        { ok: false, error: "Could not load support requests." },
        { status: 500 }
      )
    }

    const unresolvedStandardRequests = requests ?? []

    if (unresolvedStandardRequests.length === 0) {
      return NextResponse.json({ ok: true, sent: 0, requests: 0 })
    }

    const uniqueUserIds = [
      ...new Set(
        unresolvedStandardRequests
          .map((request) => request.user_id)
          .filter((value): value is string => Boolean(value))
      ),
    ]

    const userEmailMap = new Map<string, string>()

    await Promise.all(
      uniqueUserIds.map(async (userId) => {
        const {
          data: { user },
        } = await adminSupabase.auth.admin.getUserById(userId)

        if (user?.email) {
          userEmailMap.set(userId, user.email)
        }
      })
    )

    const digestItems = unresolvedStandardRequests.map((request) => ({
      stateName: getCourseConfig(String(request.state_code ?? "virginia")).stateName,
      subject: String(request.subject ?? "Support request"),
      studentEmail: userEmailMap.get(String(request.user_id ?? "")) ?? "Unknown",
      createdAt: new Date(String(request.created_at ?? "")).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
      supportUrl: `${baseUrl}/admin/support`,
    }))

    await Promise.all(
      adminEmails.map((email) =>
        sendAdminStandardSupportDigestEmail({
          email,
          requests: digestItems,
        })
      )
    )

    return NextResponse.json({
      ok: true,
      sent: adminEmails.length,
      requests: digestItems.length,
    })
  } catch (error) {
    console.error("Standard support digest route failed:", error)
    return NextResponse.json(
      { ok: false, error: "Standard support digest failed." },
      { status: 500 }
    )
  }
}
