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
        <div className="glass-panel rounded-[2rem] bg-white p-6">
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
        <div className="glass-panel rounded-[2rem] bg-white p-6 sm:p-7">
          <div className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Already purchased
          </div>

          <h1 className="mt-4 text-3xl font-semibold text-slate-950">
            You already have access to the {stateDisplayName} course
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            This account already has a paid purchase for this state, so there is no need to check out again.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">Plan code</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">
                {purchasePlanCode ?? "Paid"}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
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
              className="inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Go to Course
            </Link>

            <Link
              href={`/${state}/dashboard`}
              className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Go to Dashboard
            </Link>

            <Link
              href={`/${state}/support`}
              className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
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
      <section className="glass-panel rounded-[2rem] border-[#dbe7ff] bg-white p-7 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-4">
            <p className="section-label">{stateDisplayName} Checkout</p>
            <h1 className="text-4xl font-semibold text-slate-950">
              Course enrollment and payment
            </h1>
            <p className="max-w-3xl leading-8 text-slate-600">
              Review the available enrollment options below. Secure payment is completed through Stripe after you choose a plan.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-[#e5edff] bg-[#f8fbff] p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
              Important information before enrollment
            </div>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              <p>Course access is a one-time purchase for this state.</p>
              <p>Seat-time, identity checks, and final exam rules still apply.</p>
              <p>Students should confirm course acceptance for their specific requirement before relying on completion.</p>
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
              className="glass-panel rounded-[2rem] border-[#dbe7ff] bg-white p-6 sm:p-7"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                      isPriority
                        ? "bg-blue-50 text-blue-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {isPriority ? "Priority Support" : "Standard"}
                  </div>

                  <h2 className="mt-4 text-3xl font-semibold text-slate-950">
                    {plan.displayName}
                  </h2>

                  <p className="mt-3 max-w-xl leading-7 text-slate-600">
                    {getPlanDescription(plan)}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-right">
                  <div className="text-3xl font-semibold text-slate-950">
                    {formatPriceFromCents(plan.priceCents, plan.currency)}
                  </div>
                  <div className="text-sm text-slate-500">one-time payment</div>
                </div>
              </div>

              <div className="mt-6 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
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
                  <span className="font-semibold text-slate-900">
                    {isPriority ? "Priority" : "Standard"}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  href={`/${state}/checkout/${plan.planCode}`}
                  className={`inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-center font-semibold text-white ${
                    isPriority
                      ? "bg-slate-900 hover:bg-slate-800"
                      : "bg-blue-600 hover:bg-blue-700"
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
        <div className="glass-panel rounded-[2rem] bg-white p-6 sm:p-7">
          <h2 className="text-2xl font-semibold text-slate-950">
            Enrollment process
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              ["1. Select a plan", "Choose the course option you want to purchase."],
              ["2. Complete payment", "Secure checkout is completed through Stripe."],
              ["3. Begin the course", "After payment, the student account can enter the course flow."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="font-semibold text-slate-900">{title}</div>
                <div className="mt-2 text-sm leading-6 text-slate-600">{body}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
            {config.approvalStatusLabel}
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">
            Review course information before purchasing
          </h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">
            Students should confirm course acceptance for their specific court, DMV, employer, or insurance need before enrolling. Identity checks, seat-time rules, and exam attempt limits may apply.
          </p>
          <div className="mt-5">
            <Link
              href={getDisclosuresRoute(state)}
              className="inline-flex rounded-xl border border-amber-300 bg-white px-4 py-2.5 font-semibold text-amber-900 hover:bg-amber-100"
            >
              Read {stateDisplayName} course information
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href={`/${state}/course`}
          className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
        >
          Back to Course
        </Link>

        <Link
          href={`/${state}/support`}
          className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
        >
          Questions Before Buying?
        </Link>
      </div>
    </div>
  )
}
