import { NextRequest, NextResponse } from "next/server"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getCourseProductConfig } from "@/lib/course-products"
import { sendCompletionCertificateEmail } from "@/lib/email"
import {
  buildCertificatePdfFilename,
  generateCertificatePdfArrayBuffer,
} from "@/lib/certificate-pdf"

type NotifyCertificateBody = {
  state?: string
  courseSlug?: string
  certificateId?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as NotifyCertificateBody
    const state = String(body.state ?? "").trim().toLowerCase()
    const courseSlug = String(body.courseSlug ?? "driver-improvement").trim()
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
          .eq("course_slug", courseSlug)
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

    if (!examRow || !examRow.passed || !user.email) {
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

    const product = getCourseProductConfig(state, courseSlug)
    const verifyUrl = `${baseUrl}/verify/${certificateId}`
    const fallbackProfile =
      (user.user_metadata as Record<string, unknown> | undefined) ?? {}
    const driverCourseProfile =
      (fallbackProfile.driverCourseProfile as Record<string, unknown> | undefined) ??
      {}
    const pendingIdentityProfile =
      (fallbackProfile.pendingIdentityProfile as Record<string, unknown> | undefined) ??
      {}
    const firstName =
      String(identityRow?.first_name ?? driverCourseProfile.firstName ?? pendingIdentityProfile.firstName ?? "").trim()
    const lastName =
      String(identityRow?.last_name ?? driverCourseProfile.lastName ?? pendingIdentityProfile.lastName ?? "").trim()
    const certificatePdf = generateCertificatePdfArrayBuffer({
      state,
      courseName: product.courseName,
      certificateIssuerLine: product.certificateIssuerLine,
      firstName,
      lastName,
      examScore: typeof examRow.score === "number" ? examRow.score : null,
      examCompletedAt: examRow.completed_at ?? null,
      certificateId,
      verifyUrl,
    })

    const certificatePdfBase64 = Buffer.from(certificatePdf).toString("base64")
    const certificateFilename = buildCertificatePdfFilename(
      state,
      firstName,
      lastName
    )

    await sendCompletionCertificateEmail({
      email: user.email,
      stateName: product.stateName,
      courseName: product.courseName,
      certificateId,
      certificateUrl: `${baseUrl}${product.certificatePath}`,
      verifyUrl,
      providerEmail: product.supportEmail,
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
