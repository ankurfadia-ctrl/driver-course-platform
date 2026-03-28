import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import {
  buildCheckoutCancelUrl,
  buildCheckoutSuccessUrl,
  getStripeCheckoutPlan,
} from "@/lib/payment/stripe"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

type CheckoutRequestBody = {
  planCode?: string
  stateCode?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CheckoutRequestBody

    const planCode = String(body?.planCode ?? "").trim()
    const stateCode = String(body?.stateCode ?? "").trim().toLowerCase()

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

    if (existingPurchase) {
      return NextResponse.json(
        {
          ok: false,
          error: "This account already has a paid purchase for this state.",
          alreadyPurchased: true,
          redirectTo: `/${stateCode}/course`,
        },
        { status: 409 }
      )
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
        stateCode: plan.stateCode,
        supportTier: plan.supportTier,
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