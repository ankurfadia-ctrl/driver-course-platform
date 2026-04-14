"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

type ConfirmResponse = {
  ok: boolean
  error?: string
}

export default function VirginiaBoatingCheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState<ConfirmResponse | null>(null)

  useEffect(() => {
    let isMounted = true

    async function confirmPurchase() {
      if (!sessionId) {
        setResult({ ok: false, error: "Missing Stripe session ID." })
        setLoading(false)
        return
      }

      try {
        const response = await fetch(
          `/api/checkout/confirm?session_id=${encodeURIComponent(sessionId)}`,
          {
            method: "GET",
            cache: "no-store",
          }
        )

        const data = (await response.json()) as ConfirmResponse

        if (!isMounted) return
        setResult(data)
      } catch (error) {
        console.error("Virginia boating checkout confirmation failed:", error)
        if (!isMounted) return
        setResult({ ok: false, error: "Could not verify your purchase automatically." })
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    void confirmPurchase()

    return () => {
      isMounted = false
    }
  }, [sessionId])

  return (
    <main className="public-shell min-h-screen">
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="rounded-[2rem] border border-emerald-200 bg-white shadow-sm">
          <div className="border-b border-emerald-100 bg-emerald-50 px-6 py-5">
            <div className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Virginia boating payment
            </div>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Purchase confirmation
            </h1>
            <p className="mt-2 text-slate-600">
              We are verifying your Virginia boating purchase and attaching it to
              your account.
            </p>
          </div>

          <div className="px-6 py-6">
            {loading ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                Confirming payment and activating access...
              </div>
            ) : result?.ok ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                Payment verified successfully. Your Virginia boating course access
                is now active.
              </div>
            ) : (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                {result?.error ??
                  "Your payment page loaded, but automatic activation did not finish."}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
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
          </div>
        </div>
      </section>
    </main>
  )
}
