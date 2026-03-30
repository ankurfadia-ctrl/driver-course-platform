import { NextRequest, NextResponse } from "next/server"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { getCourseConfig } from "@/lib/course-config"
import { createAdminClient } from "@/lib/supabase/admin"
import { sendCompletionCertificateEmail } from "@/lib/email"
import {
  buildCertificatePdfFilename,
  generateCertificatePdfArrayBuffer,
} from "@/lib/certificate-pdf"

type NotifyCertificateBody = {
  state?: string
  certificateId?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as NotifyCertificateBody
    const state = String(body.state ?? "").trim().toLowerCase()
    const certificateId = String(body.certificateId ?? "").trim()

    if (!state || !certificateId) {
      return NextResponse.json(
        { ok: false, error: "Missing state or certificateId." },
        { status: 400 }
      )
    }

    const supabase = await createSupabaseServerClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { ok: false, error: "You must be signed in to send completion email." },
        { status: 401 }
      )
    }

    const adminSupabase = createAdminClient()
    const [{ data: examRow, error: examError }, { data: identityRow, error: identityError }] =
      await Promise.all([
        adminSupabase
          .from("exam_results")
          .select("certificate_id, passed, score, completed_at")
          .eq("user_id", user.id)
          .eq("state", state)
          .eq("certificate_id", certificateId)
          .order("completed_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
        adminSupabase
          .from("student_identity_profiles")
          .select("user_id, first_name, last_name")
          .eq("user_id", user.id)
          .eq("state", state)
          .maybeSingle(),
      ])

    if (examError || identityError) {
      return NextResponse.json(
        { ok: false, error: "Could not validate certificate email request." },
        { status: 500 }
      )
    }

    if (!examRow || !examRow.passed || !identityRow || !user.email) {
      return NextResponse.json(
        { ok: false, error: "Completion email not available." },
        { status: 400 }
      )
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    if (!baseUrl) {
      return NextResponse.json(
        { ok: false, error: "Missing NEXT_PUBLIC_BASE_URL." },
        { status: 500 }
      )
    }

    const config = getCourseConfig(state)
    const verifyUrl = `${baseUrl}/verify/${certificateId}`
    const certificatePdf = generateCertificatePdfArrayBuffer({
      state,
      courseName: config.courseName,
      certificateIssuerLine: config.certificateIssuerLine,
      firstName: String(identityRow.first_name ?? "").trim(),
      lastName: String(identityRow.last_name ?? "").trim(),
      examScore: typeof examRow.score === "number" ? examRow.score : null,
      examCompletedAt: examRow.completed_at ?? null,
      certificateId,
      verifyUrl,
    })

    const certificatePdfBase64 = Buffer.from(certificatePdf).toString("base64")
    const certificateFilename = buildCertificatePdfFilename(
      state,
      String(identityRow.first_name ?? "").trim(),
      String(identityRow.last_name ?? "").trim()
    )

    await sendCompletionCertificateEmail({
      email: user.email,
      stateName: config.stateName,
      courseName: config.courseName,
      certificateId,
      certificateUrl: `${baseUrl}/${state}/certificate`,
      verifyUrl,
      providerEmail: config.supportEmail,
      certificateFilename,
      certificatePdfBase64,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Certificate completion email failed:", error)
    return NextResponse.json(
      { ok: false, error: "Completion email failed." },
      { status: 500 }
    )
  }
}
