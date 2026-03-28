"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import {
  formatPriceFromCents,
  getCoursePlans,
  type CoursePlan,
} from "@/lib/payment/plans"
import { getCourseConfig, getDisclosuresRoute } from "@/lib/course-config"
import { getCourseAccessStatus } from "@/lib/course-access"

function getStateDisplayName(state: string) {
  const normalized = String(state ?? "").trim()
  if (!normalized) return "Virginia"
  return normalized.charAt(0).toUpperCase() + normalized.slice(1).toLowerCase()
}

function getPlanDescription(plan: CoursePlan) {
  if (plan.includesPrioritySupport) {
    return "Includes the full course, certificate eligibility, and priority support routing."
  }

  return "Includes the full course and certificate eligibility."
}

export default function StateCheckoutPage() {
  const params = useParams()

  const state =
    typeof params?.state === "string" ? params.state : "virginia"
  const config = getCourseConfig(state)

  const [checkingPurchase, setCheckingPurchase] = useState(true)
  const [hasPaidPurchase, setHasPaidPurchase] = useState(false)
  const [purchasePlanCode, setPurchasePlanCode] = useState<string | null>(null)
  const [purchaseSupportTier, setPurchaseSupportTier] = useState<string | null>(null)
  const [purchaseError, setPurchaseError] = useState("")

  const stateDisplayName = useMemo(() => getStateDisplayName(state), [state])
  const plans = useMemo(() => getCoursePlans(state), [state])

  useEffect(() => {
    let isMounted = true

    async function checkExistingPurchase() {
      try {
        setCheckingPurchase(true)
        setPurchaseError("")

        const access = await getCourseAccessStatus(state)

        if (!isMounted) return

        if (access.hasPaidAccess) {
          setHasPaidPurchase(true)
          setPurchasePlanCode(access.planCode)
          setPurchaseSupportTier(access.supportTier)
        } else {
          setHasPaidPurchase(false)
          setPurchasePlanCode(null)
          setPurchaseSupportTier(null)
        }

        setPurchaseError(access.error ?? "")
      } catch (error) {
        console.error("Unexpected checkout purchase check error:", error)

        if (!isMounted) return
        setHasPaidPurchase(false)
        setPurchaseError("Unexpected error while checking purchase status.")
      } finally {
        if (isMounted) {
          setCheckingPurchase(false)
        }
      }
    }

    void checkExistingPurchase()

    return () => {
      isMounted = false
    }
  }, [state])

  if (checkingPurchase) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="glass-panel rounded-[2rem] p-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Checking your purchase status...
          </h1>
          <p className="mt-2 leading-7 text-slate-600">
            Please wait while we confirm whether this account already purchased the {stateDisplayName} course.
          </p>
        </div>
      </div>
    )
  }

  if (hasPaidPurchase) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="glass-panel rounded-[2rem] p-6 sm:p-7">
          <div className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Already purchased
          </div>

          <h1 className="mt-4 text-3xl font-semibold text-slate-950 [font-family:var(--font-display)]">
            You already have access to the {stateDisplayName} course
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            This account already has a paid purchase for this state, so there is no need to check out again.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.4rem] border border-white/70 bg-white/72 p-4">
              <div className="text-sm text-slate-500">Plan code</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">
                {purchasePlanCode ?? "Paid"}
              </div>
            </div>

            <div className="rounded-[1.4rem] border border-white/70 bg-white/72 p-4">
              <div className="text-sm text-slate-500">Support tier</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">
                {purchaseSupportTier ?? "Standard"}
              </div>
            </div>
          </div>

          {purchaseError ? (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              {purchaseError}
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/${state}/course`}
              className="inline-flex rounded-full bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Go to Course
            </Link>

            <Link
              href={`/${state}/dashboard`}
              className="inline-flex rounded-full border border-white/80 bg-white/80 px-5 py-3 font-semibold text-slate-700 transition hover:bg-white"
            >
              Go to Dashboard
            </Link>

            <Link
              href={`/${state}/support`}
              className="inline-flex rounded-full border border-white/80 bg-white/80 px-5 py-3 font-semibold text-slate-700 transition hover:bg-white"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="glass-panel rounded-[2.25rem] p-7 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-4">
            <p className="section-label">{stateDisplayName} Checkout</p>
            <h1 className="text-4xl font-semibold text-slate-950 [font-family:var(--font-display)]">
              Choose your course option
            </h1>
            <p className="max-w-3xl leading-8 text-slate-700">
              Start with the standard course or choose the priority support option for
              faster help routing. Stripe checkout comes next after this selection page.
            </p>
          </div>

          <div className="rounded-[1.8rem] bg-[linear-gradient(145deg,#203255_0%,#335899_100%)] p-6 text-white shadow-[0_24px_45px_rgba(28,42,77,0.24)]">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100/90">
              What you are buying
            </div>
            <div className="mt-4 space-y-3 text-sm leading-7 text-blue-50/90">
              <p>Course access is a one-time purchase for this state.</p>
              <p>Seat-time, identity checks, and final exam rules still apply.</p>
              <p>Students should review disclosures before relying on completion.</p>
            </div>
          </div>
        </div>
      </section>

      {purchaseError ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          {purchaseError}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        {plans.map((plan) => {
          const isPriority = plan.includesPrioritySupport

          return (
            <div
              key={plan.planCode}
              className={`glass-panel rounded-[2rem] p-6 sm:p-7 ${
                isPriority
                  ? "border-[rgba(48,84,165,0.18)]"
                  : "border-white/70"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                      isPriority
                        ? "bg-[#eef3ff] text-[#3054a5]"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {isPriority ? "Priority Support" : "Standard"}
                  </div>

                  <h2 className="mt-4 text-3xl font-semibold text-slate-950 [font-family:var(--font-display)]">
                    {plan.displayName}
                  </h2>

                  <p className="mt-3 max-w-xl leading-7 text-slate-600">
                    {getPlanDescription(plan)}
                  </p>
                </div>

                <div className="rounded-[1.3rem] border border-white/70 bg-white/72 px-5 py-4 text-right">
                  <div className="text-3xl font-semibold text-slate-950">
                    {formatPriceFromCents(plan.priceCents, plan.currency)}
                  </div>
                  <div className="text-sm text-slate-500">one-time payment</div>
                </div>
              </div>

              <div className="mt-6 space-y-3 rounded-[1.6rem] border border-white/70 bg-white/70 p-5">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-slate-600">Full course access</span>
                  <span className="font-semibold text-slate-900">Included</span>
                </div>

                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-slate-600">Certificate eligibility</span>
                  <span className="font-semibold text-slate-900">
                    {plan.includesCertificate ? "Included" : "No"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-slate-600">Support tier</span>
                  <span
                    className={`font-semibold ${
                      isPriority ? "text-[#3054a5]" : "text-slate-900"
                    }`}
                  >
                    {isPriority ? "Priority" : "Standard"}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  href={`/${state}/checkout/${plan.planCode}`}
                  className={`inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-center font-semibold text-white transition ${
                    isPriority
                      ? "bg-[#3054a5] hover:bg-[#27458c]"
                      : "bg-slate-950 hover:bg-slate-800"
                  }`}
                >
                  Select {isPriority ? "Priority" : "Standard"}
                </Link>

                <div className="text-center text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Plan code: {plan.planCode}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="glass-panel rounded-[2rem] p-6 sm:p-7">
          <h2 className="text-2xl font-semibold text-slate-950">
            What happens next?
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.4rem] border border-white/70 bg-white/72 p-4">
              <div className="font-semibold text-slate-900">1. Choose plan</div>
              <div className="mt-2 text-sm leading-6 text-slate-600">
                Pick the standard course or the priority support option.
              </div>
            </div>

            <div className="rounded-[1.4rem] border border-white/70 bg-white/72 p-4">
              <div className="font-semibold text-slate-900">2. Stripe checkout</div>
              <div className="mt-2 text-sm leading-6 text-slate-600">
                Next you will complete secure Stripe payment.
              </div>
            </div>

            <div className="rounded-[1.4rem] border border-white/70 bg-white/72 p-4">
              <div className="font-semibold text-slate-900">3. Start course</div>
              <div className="mt-2 text-sm leading-6 text-slate-600">
                After payment, the student can enter the course flow.
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[rgba(166,117,63,0.18)] bg-[linear-gradient(180deg,rgba(255,248,236,0.9)_0%,rgba(255,241,214,0.75)_100%)] p-6 shadow-[0_18px_38px_rgba(138,98,36,0.08)]">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8d6d2b]">
            {config.approvalStatusLabel}
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950 [font-family:var(--font-display)]">
            Review disclosures before purchasing
          </h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">
            Students should confirm course acceptance for their specific court, DMV, employer, or insurance need before enrolling. Identity checks, seat-time rules, and exam attempt limits may apply.
          </p>
          <div className="mt-5">
            <Link
              href={getDisclosuresRoute(state)}
              className="inline-flex rounded-full border border-[rgba(166,117,63,0.24)] bg-white/80 px-4 py-2.5 font-semibold text-[#6f5216] transition hover:bg-white"
            >
              Read {stateDisplayName} disclosures
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href={`/${state}/course`}
          className="inline-flex rounded-full border border-white/80 bg-white/80 px-4 py-2.5 font-semibold text-slate-700 transition hover:bg-white"
        >
          Back to Course
        </Link>

        <Link
          href={`/${state}/support`}
          className="inline-flex rounded-full border border-white/80 bg-white/80 px-4 py-2.5 font-semibold text-slate-700 transition hover:bg-white"
        >
          Questions Before Buying?
        </Link>
      </div>
    </div>
  )
}
