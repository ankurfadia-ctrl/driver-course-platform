import { NextRequest, NextResponse } from "next/server"
import { getCourseConfig } from "@/lib/course-config"
import { sendPasswordResetEmail } from "@/lib/email"
import { getPublicBaseUrl } from "@/lib/runtime-config"
import { createAdminClient } from "@/lib/supabase/admin"

type PasswordResetRequestBody = {
  state?: string
  email?: string
}

function getRedirectBaseUrl(request: NextRequest) {
  const configuredBaseUrl = getPublicBaseUrl()

  if (configuredBaseUrl && /^https?:\/\//.test(configuredBaseUrl)) {
    return configuredBaseUrl.replace(/\/$/, "")
  }

  return request.nextUrl.origin.replace(/\/$/, "")
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as PasswordResetRequestBody
    const state = String(body.state ?? "virginia").trim().toLowerCase()
    const email = String(body.email ?? "").trim().toLowerCase()

    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Enter your email first." },
        { status: 400 }
      )
    }

    const config = getCourseConfig(state)
    const redirectBaseUrl = getRedirectBaseUrl(request)
    const adminSupabase = createAdminClient()
    const { data, error } = await adminSupabase.auth.admin.generateLink({
      type: "recovery",
      email,
      options: {
        redirectTo: `${redirectBaseUrl}/${state}/reset-password`,
      },
    })

    if (error || !data.properties?.action_link) {
      return NextResponse.json({
        ok: true,
        message:
          "If an account exists for that email, a password reset link has been sent.",
      })
    }

    await sendPasswordResetEmail({
      email,
      stateName: config.stateName,
      courseName: config.courseName,
      resetUrl: data.properties.action_link,
      loginUrl: `${redirectBaseUrl}/${state}/login`,
      supportEmail: config.supportEmail,
      supportPhoneDisplay: config.supportPhoneDisplay,
    })

    return NextResponse.json({
      ok: true,
      message:
        "If an account exists for that email, a password reset link has been sent.",
    })
  } catch (error) {
    console.error("Password reset email route failed:", error)
    return NextResponse.json(
      { ok: false, error: "Could not send the password reset email right now." },
      { status: 500 }
    )
  }
}
