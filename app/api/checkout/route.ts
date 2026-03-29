import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import {
  buildCheckoutCancelUrl,
  buildCheckoutSuccessUrl,
  getStripeCheckoutPlan,
} from "@/lib/payment/stripe"
import { getPlanEligibility } from "@/lib/payment/plans"
import {
  type MailingAddress,
  validateMailingAddress,
} from "@/lib/certificate-mail"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

type CheckoutRequestBody = {
  planCode?: string
  stateCode?: string
  certificateId?: string
  mailingAddress?: Partial<MailingAddress>
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CheckoutRequestBody

    const planCode = String(body?.planCode ?? "").trim()
    const stateCode = String(body?.stateCode ?? "").trim().toLowerCase()
    const certificateId = String(body?.certificateId ?? "").trim()

    if (!planCode || !stateCode) {
      return NextResponse.json(
        { ok: false, error: "Missing planCode or stateCode." },
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
        { ok: false, error: "You must be signed in before checkout." },
        { status: 401 }
      )
    }

    const plan = getStripeCheckoutPlan(planCode)

    if (!plan) {
      return NextResponse.json(
        { ok: false, error: "Invalid checkout plan." },
        { status: 404 }
      )
    }

    if (plan.stateCode !== stateCode) {
      return NextResponse.json(
        { ok: false, error: "Plan does not match requested state." },
        { status: 400 }
      )
    }

    const adminSupabase = createAdminClient()

    const { data: existingPurchases, error: existingPurchaseError } =
      await adminSupabase
        .from("course_purchases")
        .select("id, plan_code, support_tier, purchase_status, purchased_at")
        .eq("user_id", user.id)
        .eq("state_code", stateCode)
        .eq("purchase_status", "paid")
        .order("purchased_at", { ascending: false })
        .limit(1)

    if (existingPurchaseError) {
      console.error(
        "Existing paid purchase check failed:",
        existingPurchaseError
      )

      return NextResponse.json(
        { ok: false, error: "Could not verify existing purchase status." },
        { status: 500 }
      )
    }

    const existingPurchase = existingPurchases?.[0]
    const purchaseContext = {
      hasPaidAccess: Boolean(existingPurchase),
      supportTier:
        existingPurchase?.support_tier === "priority"
          ? "priority"
          : existingPurchase?.support_tier === "standard"
          ? "standard"
          : null,
    } as const

    const eligibility = getPlanEligibility(plan, purchaseContext)

    if (!eligibility.allowed) {
      const redirectTo =
        purchaseContext.supportTier === "standard"
          ? `/${stateCode}/checkout`
          : `/${stateCode}/course`

      return NextResponse.json(
        {
          ok: false,
          error:
            eligibility.reason ??
            "This account is not eligible for that purchase.",
          alreadyPurchased: purchaseContext.hasPaidAccess,
          redirectTo,
        },
        { status: 409 }
      )
    }

    let mailingAddress: MailingAddress | null = null

    if (plan.planKind === "certificate-mail") {
      if (!certificateId) {
        return NextResponse.json(
          { ok: false, error: "Missing certificateId for mailed certificate order." },
          { status: 400 }
        )
      }

      mailingAddress = {
        firstName: String(body?.mailingAddress?.firstName ?? "").trim(),
        lastName: String(body?.mailingAddress?.lastName ?? "").trim(),
        addressLine1: String(body?.mailingAddress?.addressLine1 ?? "").trim(),
        addressLine2: String(body?.mailingAddress?.addressLine2 ?? "").trim(),
        city: String(body?.mailingAddress?.city ?? "").trim(),
        state: String(body?.mailingAddress?.state ?? "").trim().toUpperCase(),
        postalCode: String(body?.mailingAddress?.postalCode ?? "").trim(),
        country: String(body?.mailingAddress?.country ?? "US").trim().toUpperCase(),
      }

      try {
        validateMailingAddress(mailingAddress)
      } catch (error) {
        return NextResponse.json(
          { ok: false, error: error instanceof Error ? error.message : "Invalid mailing address." },
          { status: 400 }
        )
      }
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    if (!baseUrl) {
      return NextResponse.json(
        { ok: false, error: "Missing NEXT_PUBLIC_BASE_URL." },
        { status: 500 }
      )
    }

    const successUrl = `${baseUrl}${buildCheckoutSuccessUrl(
      stateCode
    )}?session_id={CHECKOUT_SESSION_ID}`

    const cancelUrl = `${baseUrl}${buildCheckoutCancelUrl(
      stateCode,
      planCode
    )}`

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: plan.currency,
            product_data: {
              name: plan.displayName,
            },
            unit_amount: plan.unitAmount,
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: user.id,
        userEmail: user.email ?? "",
        planCode: plan.planCode,
        planKind: plan.planKind,
        stateCode: plan.stateCode,
        supportTier: plan.supportTier,
        certificateId,
        mailFirstName: mailingAddress?.firstName ?? "",
        mailLastName: mailingAddress?.lastName ?? "",
        mailAddressLine1: mailingAddress?.addressLine1 ?? "",
        mailAddressLine2: mailingAddress?.addressLine2 ?? "",
        mailCity: mailingAddress?.city ?? "",
        mailState: mailingAddress?.state ?? "",
        mailPostalCode: mailingAddress?.postalCode ?? "",
        mailCountry: mailingAddress?.country ?? "",
      },
    })

    return NextResponse.json({
      ok: true,
      url: session.url,
    })
  } catch (error) {
    console.error("Stripe checkout error:", error)

    return NextResponse.json(
      { ok: false, error: "Stripe checkout failed." },
      { status: 500 }
    )
  }
}
