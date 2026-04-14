"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  formatPriceFromCents,
  getCoursePlanByCode,
} from "@/lib/payment/plans"
import { getCourseAccessStatus } from "@/lib/course-access"

const BOATING_COURSE_SLUG = "boating-safety"

type CheckoutApiSuccess = {
  ok: true
  url: string | null
}

type CheckoutApiError = {
  ok: false
  error: string
  alreadyPurchased?: boolean
  redirectTo?: string
}

export default function VirginiaBoatingPlanCheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const planCode =
    typeof params?.planCode === "string" ? params.planCode : ""
  const plan = useMemo(() => getCoursePlanByCode(planCode), [planCode])
  const [checkingAccess, setCheckingAccess] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasPurchase, setHasPurchase] = useState(false)
  const [loadingCheckout, setLoadingCheckout] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const planMatches =
    plan &&
    plan.stateCode === "virginia" &&
    plan.courseSlug === BOATING_COURSE_SLUG &&
    plan.active

  useEffect(() => {
    let isMounted = true

    async function loadAccess() {
      const access = await getCourseAccessStatus("virginia", BOATING_COURSE_SLUG)

      if (!isMounted) return
      setIsAuthenticated(access.isAuthenticated)
      setHasPurchase(access.hasPaidAccess)
      setCheckingAccess(false)
    }

    void loadAccess()

    return () => {
      isMounted = false
    }
  }, [])

  async function handleCheckout() {
    if (!planMatches || loadingCheckout) return

    try {
      setLoadingCheckout(true)
      setError(null)

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planCode: plan.planCode,
          stateCode: "virginia",
        }),
      })

      const data = (await response.json()) as CheckoutApiSuccess | CheckoutApiError

      if (!response.ok || !data.ok) {
        if ("redirectTo" in data && data.redirectTo) {
          router.push("/virginia-boating/dashboard")
          return
        }

        setError("error" in data ? data.error : "Could not prepare checkout.")
        return
      }

      if (!data.url) {
        setError("Stripe checkout URL was not returned.")
        return
      }

      window.location.href = data.url
    } catch (checkoutError) {
      console.error("Virginia boating checkout failed:", checkoutError)
      setError("Could not prepare checkout.")
    } finally {
      setLoadingCheckout(false)
    }
  }

  if (!planMatches) {
    return (
      <main className="public-shell min-h-screen">
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-semibold text-slate-950">Invalid boating plan</h1>
            <Link
              href="/virginia-boating/pricing"
              className="mt-6 inline-flex rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800"
            >
              Back to pricing
            </Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="public-shell min-h-screen">
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="section-label">Virginia Boating Checkout</div>
          <h1 className="text-4xl font-semibold text-slate-950">{plan.displayName}</h1>
          <div className="text-3xl font-semibold text-slate-950">
            {formatPriceFromCents(plan.priceCents, plan.currency)}
          </div>
          <p className="leading-7 text-slate-600">
            This checkout activates the Virginia boating course product, not the
            Virginia driver improvement course.
          </p>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-slate-700">
            Review the Virginia boating disclosures before paying. Exemptions,
            PWC age rules, and Virginia-specific proof language still matter.
          </div>

          {checkingAccess ? (
            <div className="text-sm text-slate-600">Checking your account...</div>
          ) : hasPurchase ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-7 text-emerald-900">
              This account already has Virginia boating course access.
            </div>
          ) : null}

          {!checkingAccess && !isAuthenticated ? (
            <div className="flex flex-wrap gap-3">
              <Link
                href="/virginia/login?mode=signup"
                className="rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800"
              >
                Create account
              </Link>
              <Link
                href="/virginia/login"
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Log in
              </Link>
            </div>
          ) : !checkingAccess && hasPurchase ? (
            <div className="flex flex-wrap gap-3">
              <Link
                href="/virginia-boating/dashboard"
                className="rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800"
              >
                Open dashboard
              </Link>
              <Link
                href="/virginia-boating/learn"
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Enter course
              </Link>
            </div>
          ) : (
            <button
              onClick={handleCheckout}
              disabled={loadingCheckout}
              className="rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {loadingCheckout ? "Preparing checkout..." : "Continue to payment"}
            </button>
          )}

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              {error}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <Link
              href="/virginia-boating/disclosures"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Read disclosures
            </Link>
            <Link
              href="/virginia-boating/pricing"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Back to pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
