"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function ResetPasswordPage() {
  const params = useParams()
  const supabase = createClient()

  const state =
    typeof params?.state === "string" ? params.state : "virginia"

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)
  const [recoveryDetected, setRecoveryDetected] = useState(false)

  useEffect(() => {
    let mounted = true

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return

      if (event === "PASSWORD_RECOVERY" || Boolean(session)) {
        setRecoveryDetected(true)
        setReady(true)
      }
    })

    void supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return

      if (data.session) {
        setRecoveryDetected(true)
      }

      setReady(true)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [supabase.auth])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!password.trim() || password.length < 8) {
      setMessage("Enter a new password with at least 8 characters.")
      return
    }

    if (password !== confirmPassword) {
      setMessage("The passwords do not match.")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) {
        setMessage(error.message)
        return
      }

      setPassword("")
      setConfirmPassword("")
      setMessage("Your password has been updated. You can now log in.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
          Password Reset
        </div>
        <h1 className="mt-3 text-4xl font-semibold text-slate-950">
          Set a new password.
        </h1>
        <p className="mt-4 max-w-2xl leading-8 text-slate-600">
          Use the recovery link from your email to set a new password for your
          student account.
        </p>

        {!ready ? (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700">
            Checking your recovery link...
          </div>
        ) : recoveryDetected ? (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
              required
              autoComplete="new-password"
            />

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
              required
              autoComplete="new-password"
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Updating password..." : "Update password"}
            </button>
          </form>
        ) : (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-slate-700">
            This recovery link is missing, expired, or no longer active. Return
            to login and request a new password reset email.
          </div>
        )}

        <div className="mt-6">
          <Link
            href={`/${state}/login`}
            className="text-sm font-semibold text-blue-600 underline"
          >
            Back to login
          </Link>
        </div>

        {message ? (
          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            {message}
          </div>
        ) : null}
      </div>
    </main>
  )
}
