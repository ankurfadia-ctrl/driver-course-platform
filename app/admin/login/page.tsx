"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function AdminLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const nextPath = searchParams.get("next") || "/admin/compliance"
  const reason = searchParams.get("reason")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState(
    reason === "admin"
      ? "Sign in with an authorized admin email to open the admin workspace."
      : ""
  )
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setMessage(error.message)
        return
      }

      router.push(nextPath)
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
        Admin Sign In
      </div>
      <h1 className="mt-3 text-4xl font-semibold text-slate-950">
        Open the admin workspace.
      </h1>
      <p className="mt-4 max-w-2xl leading-8 text-slate-600">
        Sign in with the authorized admin email for this site to access
        compliance, support, and launch-readiness tools.
      </p>

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-slate-700">
        <div className="font-semibold uppercase tracking-[0.16em] text-amber-700">
          Restricted access
        </div>
        <p className="mt-3">
          This area is limited to email addresses configured as admins for the
          production site.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <input
          type="email"
          placeholder="Admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
          required
          autoComplete="email"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
          required
          autoComplete="current-password"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Open Admin Workspace"}
        </button>
      </form>

      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <Link
          href="/"
          className="font-semibold text-slate-600 underline"
        >
          Back to public site
        </Link>
      </div>

      {message ? (
        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
          {message}
        </div>
      ) : null}
    </div>
  )
}
