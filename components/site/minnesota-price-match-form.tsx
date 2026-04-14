"use client"

import { useMemo, useState } from "react"

const SUPPORT_EMAIL = "admin@nationaldriverimprovement.com"

export default function MinnesotaPriceMatchForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [competitorUrl, setCompetitorUrl] = useState("")
  const [notes, setNotes] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const body = useMemo(() => {
    return [
      "Minnesota price match request",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Competitor URL: ${competitorUrl}`,
      "",
      "Notes:",
      notes || "(none)",
    ].join("\n")
  }, [competitorUrl, email, name, notes])

  function validate() {
    if (!name.trim() || !email.trim() || !competitorUrl.trim()) {
      setError("Include your name, email, and the competitor link.")
      return false
    }

    setError("")
    return true
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!validate()) {
      return
    }

    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
      "Minnesota price match request"
    )}&body=${encodeURIComponent(body)}`
  }

  async function handleCopyRequest() {
    if (!validate()) {
      return
    }

    await navigator.clipboard.writeText(body)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <div className="text-sm font-semibold text-slate-900">
            Parent or participant name
          </div>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900"
          />
        </label>

        <label className="space-y-2">
          <div className="text-sm font-semibold text-slate-900">
            Email address
          </div>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900"
          />
        </label>
      </div>

      <label className="space-y-2">
        <div className="text-sm font-semibold text-slate-900">
          Competitor course link
        </div>
        <input
          type="url"
          placeholder="https://..."
          value={competitorUrl}
          onChange={(event) => setCompetitorUrl(event.target.value)}
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900"
        />
      </label>

      <label className="space-y-2">
        <div className="text-sm font-semibold text-slate-900">
          Notes about the lower price
        </div>
        <textarea
          rows={5}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Add anything useful about the lower public price, whether it includes fees, or whether the course length is similar."
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900"
        />
      </label>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-2xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          Open email request
        </button>
        <button
          type="button"
          onClick={handleCopyRequest}
          className="rounded-2xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
        >
          Copy request details
        </button>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {copied ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          Price-match request copied to your clipboard.
        </div>
      ) : null}

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
        Opening the request creates a prefilled email to the tuition team.
        Copying the request gives you a plain-text version you can paste into
        any email or portal note if preferred.
      </div>
    </form>
  )
}
