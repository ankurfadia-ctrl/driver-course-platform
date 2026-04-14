import { NextRequest, NextResponse } from "next/server"
import { getCourseConfig } from "@/lib/course-config"
import {
  getReasonForAttendingLabel,
  isCourtRelatedReason,
  type ReasonForAttendingCode,
} from "@/lib/student-attendance"
import { sendAccountConfirmationEmail } from "@/lib/email"
import { getPublicBaseUrl } from "@/lib/runtime-config"
import { createAdminClient } from "@/lib/supabase/admin"

type SignupRequestBody = {
  state?: string
  email?: string
  password?: string
  reasonForAttending?: ReasonForAttendingCode | ""
  firstName?: string
  middleName?: string
  lastName?: string
  dateOfBirth?: string
  driversLicenseNumber?: string
  courtName?: string
  caseOrTicketNumber?: string
  courtDocumentNotes?: string
  accuracyConfirmed?: boolean
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
    const body = (await request.json()) as SignupRequestBody
    const state = String(body.state ?? "virginia").trim().toLowerCase()
    const email = String(body.email ?? "").trim().toLowerCase()
    const password = String(body.password ?? "")
    const reasonForAttending = String(body.reasonForAttending ?? "").trim() as
      | ReasonForAttendingCode
      | ""
    const firstName = String(body.firstName ?? "").trim()
    const middleName = String(body.middleName ?? "").trim()
    const lastName = String(body.lastName ?? "").trim()
    const dateOfBirth = String(body.dateOfBirth ?? "").trim()
    const driversLicenseNumber = String(body.driversLicenseNumber ?? "").trim()
    const courtName = String(body.courtName ?? "").trim()
    const caseOrTicketNumber = String(body.caseOrTicketNumber ?? "").trim()
    const courtDocumentNotes = String(body.courtDocumentNotes ?? "").trim()
    const accuracyConfirmed = Boolean(body.accuracyConfirmed)

    const config = getCourseConfig(state)

    if (!config.enrollmentOpen) {
      return NextResponse.json(
        { ok: false, error: "Enrollment is not open for this course yet." },
        { status: 403 }
      )
    }

    if (
      !email ||
      !password ||
      !reasonForAttending ||
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !driversLicenseNumber ||
      !accuracyConfirmed
    ) {
      return NextResponse.json(
        { ok: false, error: "Complete all required signup fields first." },
        { status: 400 }
      )
    }

    if (isCourtRelatedReason(reasonForAttending) && (!courtName || !caseOrTicketNumber)) {
      return NextResponse.json(
        { ok: false, error: "Court name and case or ticket number are required." },
        { status: 400 }
      )
    }

    const redirectBaseUrl = getRedirectBaseUrl(request)
    const adminSupabase = createAdminClient()
    const { data, error } = await adminSupabase.auth.admin.generateLink({
      type: "signup",
      email,
      password,
      options: {
        data: {
          driverCourseProfile: {
            reasonForAttending,
            reasonForAttendingLabel:
              getReasonForAttendingLabel(reasonForAttending),
            firstName,
            lastName,
            dateOfBirth,
            driversLicenseNumber,
            courtName: isCourtRelatedReason(reasonForAttending) ? courtName : "",
            caseOrTicketNumber: isCourtRelatedReason(reasonForAttending)
              ? caseOrTicketNumber
              : "",
            courtDocumentNotes: isCourtRelatedReason(reasonForAttending)
              ? courtDocumentNotes
              : "",
            accuracyAcknowledged: true,
            accuracyAcknowledgedAt: new Date().toISOString(),
          },
          pendingIdentityProfile: {
            firstName,
            middleName,
            lastName,
            dateOfBirth,
            driversLicenseNumber,
          },
          registrationProfile: {
            middleName,
          },
        },
        redirectTo: `${redirectBaseUrl}/${state}/dashboard`,
      },
    })

    if (error || !data.properties?.action_link || !data.user?.id) {
      return NextResponse.json(
        { ok: false, error: error?.message ?? "Could not create the account." },
        { status: 400 }
      )
    }

    try {
      await sendAccountConfirmationEmail({
        email,
        stateName: config.stateName,
        courseName: config.courseName,
        confirmationUrl: data.properties.action_link,
        loginUrl: `${redirectBaseUrl}/${state}/login`,
        supportEmail: config.supportEmail,
        supportPhoneDisplay: config.supportPhoneDisplay,
      })
    } catch (emailError) {
      await adminSupabase.auth.admin.deleteUser(data.user.id)
      throw emailError
    }

    return NextResponse.json({
      ok: true,
      requiresEmailConfirmation: true,
      message:
        "Account created. Check your email and confirm your address before logging in.",
    })
  } catch (error) {
    console.error("Signup confirmation email route failed:", error)
    return NextResponse.json(
      { ok: false, error: "Could not create the account right now." },
      { status: 500 }
    )
  }
}
