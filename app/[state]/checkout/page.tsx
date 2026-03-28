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
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Checking your purchase status...
          </h1>
          <p className="mt-2 text-slate-600">
            Please wait while we confirm whether this account already purchased the {stateDisplayName} course.
          </p>
        </div>
      </div>
    )
  }

  if (hasPaidPurchase) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm">
          <div className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Already purchased
          </div>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            You already have access to the {stateDisplayName} course
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            This account already has a paid purchase for this state, so there is no need to check out again.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Plan code</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">
                {purchasePlanCode ?? "Paid"}
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
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
              className="inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Go to Course
            </Link>

            <Link
              href={`/${state}/dashboard`}
              className="inline-flex rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Go to Dashboard
            </Link>

            <Link
              href={`/${state}/support`}
              className="inline-flex rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
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
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          {stateDisplayName} Checkout
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          Choose your course option
        </h1>
        <p className="max-w-3xl text-slate-600">
          Start with the standard course or choose the priority support option for
          faster help routing. Stripe checkout comes next after this selection page.
        </p>
      </div>

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
              className={`rounded-3xl border bg-white p-6 shadow-sm ${
                isPriority ? "border-purple-300" : "border-slate-200"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      isPriority
                        ? "bg-purple-100 text-purple-800"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {isPriority ? "Priority Support" : "Standard"}
                  </div>

                  <h2 className="mt-4 text-2xl font-bold text-slate-900">
                    {plan.displayName}
                  </h2>

                  <p className="mt-2 text-slate-600">
                    {getPlanDescription(plan)}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-bold text-slate-900">
                    {formatPriceFromCents(plan.priceCents, plan.currency)}
                  </div>
                  <div className="text-sm text-slate-500">one-time payment</div>
                </div>
              </div>

              <div className="mt-6 space-y-3 rounded-2xl bg-slate-50 p-4">
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
                      isPriority ? "text-purple-700" : "text-slate-900"
                    }`}
                  >
                    {isPriority ? "Priority" : "Standard"}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  href={`/${state}/checkout/${plan.planCode}`}
                  className={`inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-center font-semibold text-white transition ${
                    isPriority
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  Select {isPriority ? "Priority" : "Standard"}
                </Link>

                <div className="text-center text-xs text-slate-500">
                  Plan code: {plan.planCode}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          What happens next?
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="font-semibold text-slate-900">1. Choose plan</div>
            <div className="mt-2 text-sm text-slate-600">
              Pick the standard course or the priority support option.
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="font-semibold text-slate-900">2. Stripe checkout</div>
            <div className="mt-2 text-sm text-slate-600">
              Next you will complete secure Stripe payment.
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="font-semibold text-slate-900">3. Start course</div>
            <div className="mt-2 text-sm text-slate-600">
              After payment, the student can enter the course flow.
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
          {config.approvalStatusLabel}
        </div>
        <h2 className="mt-2 text-xl font-semibold text-slate-900">
          Review disclosures before purchasing
        </h2>
        <p className="mt-2 max-w-3xl text-slate-700">
          Students should confirm course acceptance for their specific court, DMV, employer, or insurance need before enrolling. Identity checks, seat-time rules, and exam attempt limits may apply.
        </p>
        <div className="mt-4">
          <Link
            href={getDisclosuresRoute(state)}
            className="inline-flex rounded-xl border border-amber-300 bg-white px-4 py-2 font-semibold text-amber-900 transition hover:bg-amber-100"
          >
            Read {stateDisplayName} disclosures
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href={`/${state}/course`}
          className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Back to Course
        </Link>

        <Link
          href={`/${state}/support`}
          className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Questions Before Buying?
        </Link>
      </div>
    </div>
  )
}
