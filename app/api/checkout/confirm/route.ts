import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getCourseConfig } from "@/lib/course-config"
import { fulfillCertificateMailOrder } from "@/lib/certificate-mail"
import { sendPurchaseConfirmationEmail } from "@/lib/email"
import { getCoursePlanByCode } from "@/lib/payment/plans"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

type ConfirmCheckoutRequestBody = {
  sessionId?: string
}

async function confirmCheckoutSession(sessionId: string) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json(
      { ok: false, error: "You must be signed in to confirm this purchase." },
      { status: 401 }
    )
  }

  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId)

  if (!checkoutSession) {
    return NextResponse.json(
      { ok: false, error: "Stripe checkout session not found." },
      { status: 404 }
    )
  }

  if (checkoutSession.mode !== "payment") {
    return NextResponse.json(
      { ok: false, error: "Stripe session is not a one-time payment session." },
      { status: 400 }
    )
  }

  const sessionStatus = checkoutSession.status
  const paymentStatus = checkoutSession.payment_status

  if (sessionStatus !== "complete" || paymentStatus !== "paid") {
    return NextResponse.json(
      {
        ok: false,
        error: "Payment is not complete yet.",
        sessionStatus,
        paymentStatus,
      },
      { status: 400 }
    )
  }

  const metadata = checkoutSession.metadata ?? {}
  const stateCode = String(metadata.stateCode ?? "").trim().toLowerCase()
  const planCode = String(metadata.planCode ?? "").trim()
  const planKind = String(metadata.planKind ?? "").trim()
  const supportTier = String(metadata.supportTier ?? "").trim()
  const certificateId = String(metadata.certificateId ?? "").trim()

  if (!stateCode || !planCode || !supportTier || !planKind) {
    return NextResponse.json(
      { ok: false, error: "Stripe session metadata is incomplete." },
      { status: 400 }
    )
  }

  const plan = getCoursePlanByCode(planCode)

  if (!plan) {
    return NextResponse.json(
      { ok: false, error: "Checkout plan could not be resolved." },
      { status: 400 }
    )
  }

  const adminSupabase = createAdminClient()
  const { data: existingPurchase } = await adminSupabase
    .from("course_purchases")
    .select("id")
    .eq("stripe_checkout_session_id", checkoutSession.id)
    .maybeSingle()
  const wasAlreadyRecorded = Boolean(existingPurchase?.id)

  const purchasePayload = {
    user_id: user.id,
    state_code: stateCode,
    plan_code: planCode,
    support_tier: supportTier,
    stripe_checkout_session_id: checkoutSession.id,
    stripe_payment_intent_id:
      typeof checkoutSession.payment_intent === "string"
        ? checkoutSession.payment_intent
        : checkoutSession.payment_intent?.id ?? null,
    stripe_customer_email:
      checkoutSession.customer_details?.email ?? user.email ?? null,
    amount_total: checkoutSession.amount_total ?? null,
    currency: checkoutSession.currency ?? null,
    purchase_status: "paid",
  }

  const { data: insertedPurchase, error: insertError } = await adminSupabase
    .from("course_purchases")
    .upsert(purchasePayload, {
      onConflict: "stripe_checkout_session_id",
    })
    .select()
    .single()

  if (insertError) {
    console.error("Course purchase upsert error:", insertError)

    return NextResponse.json(
      { ok: false, error: "Failed to persist course purchase." },
      { status: 500 }
    )
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  if (plan.planKind === "certificate-mail" && baseUrl && !wasAlreadyRecorded) {
    const [{ data: examRow, error: examError }, { data: identityRow, error: identityError }] =
      await Promise.all([
        adminSupabase
          .from("exam_results")
          .select("certificate_id, completed_at, passed")
          .eq("user_id", user.id)
          .eq("state", stateCode)
          .eq("certificate_id", certificateId)
          .order("completed_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
        adminSupabase
          .from("student_identity_profiles")
          .select("first_name, last_name")
          .eq("user_id", user.id)
          .eq("state", stateCode)
          .maybeSingle(),
      ])

    if (examError || identityError || !examRow || !examRow.passed || !identityRow) {
      return NextResponse.json(
        { ok: false, error: "Could not validate mailed certificate order." },
        { status: 400 }
      )
    }

    try {
      await fulfillCertificateMailOrder({
        stateCode,
        stateName: getCourseConfig(stateCode).stateName,
        courseName: getCourseConfig(stateCode).courseName,
        certificateId,
        completionDate: examRow.completed_at ?? null,
        studentName: `${identityRow.first_name} ${identityRow.last_name}`.trim(),
        verifyUrl: `${baseUrl}/verify/${certificateId}`,
        mailingAddress: {
          firstName: String(metadata.mailFirstName ?? "").trim(),
          lastName: String(metadata.mailLastName ?? "").trim(),
          addressLine1: String(metadata.mailAddressLine1 ?? "").trim(),
          addressLine2: String(metadata.mailAddressLine2 ?? "").trim(),
          city: String(metadata.mailCity ?? "").trim(),
          state: String(metadata.mailState ?? "").trim(),
          postalCode: String(metadata.mailPostalCode ?? "").trim(),
          country: String(metadata.mailCountry ?? "US").trim(),
        },
      })
    } catch (mailError) {
      console.error("Certificate mail fulfillment failed:", mailError)

      return NextResponse.json(
        { ok: false, error: "Payment succeeded, but the mailed certificate order could not be submitted automatically." },
        { status: 500 }
      )
    }
  }

  if (user.email && baseUrl && !wasAlreadyRecorded && plan.planKind !== "certificate-mail") {
    const config = getCourseConfig(stateCode)

    try {
      await sendPurchaseConfirmationEmail({
        email: user.email,
        stateName: config.stateName,
        courseName: config.courseName,
        dashboardUrl: `${baseUrl}/${stateCode}/dashboard`,
        courseUrl: `${baseUrl}/${stateCode}/course`,
        supportUrl: `${baseUrl}/${stateCode}/support`,
        planName: planCode,
        supportTier,
      })
    } catch (emailError) {
      console.error("Purchase confirmation email failed:", emailError)
    }
  }

  return NextResponse.json({
    ok: true,
    purchase: insertedPurchase,
    accessGranted: true,
  })
}

export async function GET(request: NextRequest) {
  try {
    const sessionId = String(
      request.nextUrl.searchParams.get("session_id") ?? ""
    ).trim()

    if (!sessionId) {
      return NextResponse.json(
        { ok: false, error: "Missing session_id." },
        { status: 400 }
      )
    }

    return await confirmCheckoutSession(sessionId)
  } catch (error) {
    console.error("Checkout confirm GET error:", error)

    return NextResponse.json(
      { ok: false, error: "Checkout confirmation failed." },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ConfirmCheckoutRequestBody
    const sessionId = String(body?.sessionId ?? "").trim()

    if (!sessionId) {
      return NextResponse.json(
        { ok: false, error: "Missing sessionId." },
        { status: 400 }
      )
    }

    return await confirmCheckoutSession(sessionId)
  } catch (error) {
    console.error("Checkout confirm POST error:", error)

    return NextResponse.json(
      { ok: false, error: "Checkout confirmation failed." },
      { status: 500 }
    )
  }
}
