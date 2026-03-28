"use client"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { getCourseConfig, getDisclosuresRoute } from "@/lib/course-config"

export default function LoginPage() {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()

  const state =
    typeof params?.state === "string" ? params.state : "virginia"
  const config = getCourseConfig(state)

  const [mode, setMode] = useState<"login" | "signup">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          setMessage(error.message)
          return
        }

        setMessage("Login successful. Redirecting...")
        router.push(`/${state}/dashboard`)
        router.refresh()
        return
      }

      const origin =
        typeof window !== "undefined" ? window.location.origin : ""

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: origin
            ? `${origin}/${state}/dashboard`
            : undefined,
        },
      })

      if (error) {
        setMessage(error.message)
        return
      }

      setMessage(
        "Account created successfully. If email confirmation is enabled, check your email. Otherwise, you can log in now."
      )
      setMode("login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">
            {mode === "login" ? "Log in" : "Create account"}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            {mode === "login"
              ? "Access your student dashboard and course."
              : "Create a new student account for this state course."}
          </p>
        </div>

        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-slate-700">
          <div className="font-semibold text-amber-800">{config.approvalStatusLabel}</div>
          <p className="mt-2">
            Course acceptance and eligibility may depend on the student’s specific Virginia requirement. Review the course disclosures before enrolling or relying on completion.
          </p>
          <Link
            href={getDisclosuresRoute(state)}
            className="mt-3 inline-flex font-semibold text-amber-900 underline"
          >
            Read disclosures
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2"
            required
            autoComplete="email"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-slate-300 px-3 py-2"
            required
            autoComplete={mode === "login" ? "current-password" : "new-password"}
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-slate-900 px-4 py-2 text-white disabled:opacity-60"
          >
            {loading
              ? mode === "login"
                ? "Logging in..."
                : "Creating account..."
              : mode === "login"
              ? "Log in"
              : "Create account"}
          </button>
        </form>

        <div className="mt-4 text-sm text-slate-600">
          {mode === "login" ? (
            <p>
              New student?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("signup")
                  setMessage("")
                }}
                className="font-medium text-blue-600 underline"
              >
                Create an account
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("login")
                  setMessage("")
                }}
                className="font-medium text-blue-600 underline"
              >
                Log in
              </button>
            </p>
          )}
        </div>

        <div className="mt-6">
          <Link
            href={`/${state}/checkout`}
            className="text-sm text-slate-600 underline"
          >
            View course plans
          </Link>
        </div>

        {message ? (
          <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            {message}
          </div>
        ) : null}
      </div>
    </main>
  )
}
