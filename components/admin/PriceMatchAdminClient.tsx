"use client"

import { useState } from "react"

type PlanOption = {
  planCode: string
  displayName: string
  priceCents: number
}

type Props = {
  plans: PlanOption[]
}

type PriceMatchResponse = {
  ok: true
  code: string
  originalPrice: string
  matchedPrice: string
  amountOff: string
  expiresAt: string
  planName: string
}

export default function PriceMatchAdminClient({ plans }: Props) {
  const [planCode, setPlanCode] = useState(plans[0]?.planCode ?? "")
  const [matchedPrice, setMatchedPrice] = useState("")
  const [competitorUrl, setCompetitorUrl] = useState("")
  const [studentEmail, setStudentEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<PriceMatchResponse | null>(null)

  async function handleCreateCode() {
    if (!planCode || !matchedPrice.trim()) {
      setError("Choose a plan and enter the approved matched price.")
      return
    }

    setLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch("/api/admin/pricing/price-match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planCode,
          matchedPrice,
          competitorUrl,
          studentEmail,
        }),
      })

      const data = (await response.json()) as
        | PriceMatchResponse
        | { ok: false; error?: string }

      if (!response.ok || !data.ok) {
        setError("error" in data ? data.error ?? "Could not create code." : "Could not create code.")
        return
      }

      setResult(data)
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Could not create code."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Pricing Tools</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Create a one-time Stripe promotion code for an approved price match.
          The student can enter the code during checkout.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4">
            <label className="space-y-2">
              <div className="text-sm font-semibold text-slate-900">Plan</div>
              <select
                value={planCode}
                onChange={(event) => setPlanCode(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900"
              >
                {plans.map((plan) => (
                  <option key={plan.planCode} value={plan.planCode}>
                    {plan.displayName}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <div className="text-sm font-semibold text-slate-900">
                Matched price
              </div>
              <input
                value={matchedPrice}
                onChange={(event) => setMatchedPrice(event.target.value)}
                placeholder="21.99"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900"
              />
            </label>

            <label className="space-y-2">
              <div className="text-sm font-semibold text-slate-900">
                Student email (optional)
              </div>
              <input
                value={studentEmail}
                onChange={(event) => setStudentEmail(event.target.value)}
                placeholder="student@example.com"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900"
              />
            </label>

            <label className="space-y-2">
              <div className="text-sm font-semibold text-slate-900">
                Competitor URL (optional)
              </div>
              <input
                value={competitorUrl}
                onChange={(event) => setCompetitorUrl(event.target.value)}
                placeholder="https://..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900"
              />
            </label>

            <button
              type="button"
              onClick={() => void handleCreateCode()}
              disabled={loading}
              className="inline-flex w-fit rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating code..." : "Create price-match code"}
            </button>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            ) : null}
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Workflow
            </div>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              <p>1. Review the competitor link before approving any match.</p>
              <p>2. Generate a one-time code here for the approved matched price.</p>
              <p>3. Send the code to the student and tell them to enter it during checkout.</p>
              <p>4. Keep price matches limited to equivalent public Virginia online offers.</p>
            </div>
          </section>

          {result ? (
            <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Code ready
              </div>
              <div className="mt-3 text-3xl font-bold text-slate-950">
                {result.code}
              </div>
              <div className="mt-4 space-y-2 text-sm leading-7 text-slate-700">
                <p>Plan: {result.planName}</p>
                <p>Original price: {result.originalPrice}</p>
                <p>Matched price: {result.matchedPrice}</p>
                <p>Discount amount: {result.amountOff}</p>
                <p>Expires: {result.expiresAt}</p>
              </div>
            </section>
          ) : null}
        </div>
      </section>
    </div>
  )
}
