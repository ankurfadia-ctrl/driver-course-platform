import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/admin-access"
import { formatPriceFromCents, getCoursePlanByCode } from "@/lib/payment/plans"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

type PriceMatchBody = {
  planCode?: string
  matchedPrice?: string
  competitorUrl?: string
  studentEmail?: string
}

function buildCode(planCode: string) {
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase()
  const cleanedPlan = planCode.replace(/[^A-Z0-9]/gi, "").toUpperCase()
  return `MATCH-${cleanedPlan.slice(-8)}-${suffix}`
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user || !isAdminEmail(user.email)) {
      return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 })
    }

    const body = (await request.json()) as PriceMatchBody
    const planCode = String(body.planCode ?? "").trim()
    const matchedPriceRaw = String(body.matchedPrice ?? "").trim()
    const matchedPriceCents = Math.round(Number(matchedPriceRaw) * 100)
    const competitorUrl = String(body.competitorUrl ?? "").trim()
    const studentEmail = String(body.studentEmail ?? "").trim()

    const plan = getCoursePlanByCode(planCode)

    if (!plan || plan.planKind !== "full-course") {
      return NextResponse.json(
        { ok: false, error: "Choose a valid full-course plan." },
        { status: 400 }
      )
    }

    if (!Number.isFinite(matchedPriceCents) || matchedPriceCents <= 0) {
      return NextResponse.json(
        { ok: false, error: "Enter a valid matched price." },
        { status: 400 }
      )
    }

    if (matchedPriceCents >= plan.priceCents) {
      return NextResponse.json(
        { ok: false, error: "Matched price must be lower than the current plan price." },
        { status: 400 }
      )
    }

    const amountOff = plan.priceCents - matchedPriceCents
    const code = buildCode(plan.planCode)
    const expiresAt = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60

    const coupon = await stripe.coupons.create({
      amount_off: amountOff,
      currency: plan.currency,
      duration: "once",
      name: `Price Match - ${plan.displayName}`,
      metadata: {
        planCode: plan.planCode,
        competitorUrl,
        studentEmail,
        approvedBy: user.email ?? "",
      },
    })

    await stripe.promotionCodes.create({
      promotion: {
        type: "coupon",
        coupon: coupon.id,
      },
      code,
      max_redemptions: 1,
      expires_at: expiresAt,
      metadata: {
        planCode: plan.planCode,
        competitorUrl,
        studentEmail,
      },
    })

    return NextResponse.json({
      ok: true,
      code,
      originalPrice: formatPriceFromCents(plan.priceCents, plan.currency),
      matchedPrice: formatPriceFromCents(matchedPriceCents, plan.currency),
      amountOff: formatPriceFromCents(amountOff, plan.currency),
      expiresAt: new Date(expiresAt * 1000).toLocaleString("en-US"),
      planName: plan.displayName,
    })
  } catch (error) {
    console.error("Price match code creation failed:", error)
    return NextResponse.json(
      { ok: false, error: "Could not create the price-match code." },
      { status: 500 }
    )
  }
}
