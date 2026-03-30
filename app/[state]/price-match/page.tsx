"use client"

import Link from "next/link"
import { useState } from "react"
import { useParams } from "next/navigation"
import { getCourseConfig } from "@/lib/course-config"

export default function StatePriceMatchPage() {
  const params = useParams()
  const state = typeof params?.state === "string" ? params.state : "virginia"
  const config = getCourseConfig(state)
  const enrollmentOpen = config.enrollmentOpen
  const [subject, setSubject] = useState("Price match request")
  const [competitorUrl, setCompetitorUrl] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  if (!enrollmentOpen) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Price Match
          </div>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Price match is not open for this state yet
          </h1>
          <p className="mt-3 text-slate-600">
            {config.stateName} is still in preparation, so public pricing and price-match
            requests will open only after the course launch details are finalized.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={`/${state}`}
              className="inline-flex rounded-xl bg-slate-900 px-4 py-2.5 font-semibold text-white hover:bg-slate-800"
            >
              Back to state page
            </Link>
            <Link
              href={`/${state}/disclosures`}
              className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Read course information
            </Link>
          </div>
        </section>
      </div>
    )
  }

  async function handleSubmit() {
    if (!message.trim() || !competitorUrl.trim()) {
      setError("Include the competitor link and a short note about which offer you want matched.")
      return
    }

    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      const response = await fetch("/api/price-match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stateCode: state,
          subject,
          competitorUrl,
          message,
        }),
      })

      const data = (await response.json()) as
        | { ok: true; id: string }
        | { ok: false; error?: string }

      if (!response.ok || !data.ok) {
        setError("error" in data ? data.error ?? "Could not send request." : "Could not send request.")
        return
      }

      setSuccess(true)
      setCompetitorUrl("")
      setMessage("")
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Could not send request."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Price Match
        </div>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Request a price match
        </h1>
        <p className="mt-3 text-slate-600">
          Send one public competitor link for an equivalent Virginia online driver
          improvement course. This request stays in the site for manual review and
          does not create an instant email blast.
        </p>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="grid gap-4">
          <label className="space-y-2">
            <div className="text-sm font-semibold text-slate-900">Subject</div>
            <input
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900"
            />
          </label>

          <label className="space-y-2">
            <div className="text-sm font-semibold text-slate-900">Competitor URL</div>
            <input
              value={competitorUrl}
              onChange={(event) => setCompetitorUrl(event.target.value)}
              placeholder="https://..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900"
            />
          </label>

          <label className="space-y-2">
            <div className="text-sm font-semibold text-slate-900">Notes</div>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={5}
              placeholder="Tell us which plan you want matched and anything important about the competitor offer."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900"
            />
          </label>

          <button
            type="button"
            onClick={() => void handleSubmit()}
            disabled={loading}
            className="inline-flex w-fit rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send price-match request"}
          </button>

          {success ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
              Your request was sent for manual review.
            </div>
          ) : null}

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          ) : null}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          Before you send
        </div>
        <div className="mt-4 space-y-2 text-sm leading-7 text-slate-700">
          <p>- Use one active public price for an equivalent Virginia online course.</p>
          <p>- Private coupon codes, expired promos, bundles, and hidden-fee offers are not included.</p>
          <p>- If approved, you will receive a one-time checkout code.</p>
        </div>
        <div className="mt-4">
          <Link
            href={`/${state}/checkout`}
            className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Back to checkout
          </Link>
        </div>
      </section>
    </div>
  )
}
