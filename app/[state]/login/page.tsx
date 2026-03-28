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
    <main className="min-h-screen px-4 py-10 sm:py-14">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_1fr]">
        <section className="glass-panel rounded-[2rem] border-[#dbe7ff] bg-white p-7 sm:p-8">
          <div className="section-label">{config.stateName} Student Access</div>
          <h1 className="mt-5 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
            {mode === "login" ? "Return to your course." : "Create your student account."}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
            {mode === "login"
              ? "Access your dashboard, course progress, final exam, and certificate from one student account."
              : "Create a student account to purchase access and complete the course."}
          </p>

          <div className="mt-8 grid gap-4">
            {[
              "Student login and dashboard access",
              "Course progress, exam, and certificate tied to one account",
              "Support access during the course",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="glass-panel rounded-[2rem] bg-white p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-semibold text-slate-950">
              {mode === "login" ? "Log in" : "Create account"}
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              {mode === "login"
                ? "Access your student dashboard and continue where you left off."
                : "Create a new student account for this state course."}
            </p>
          </div>

          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-slate-700">
            <div className="font-semibold uppercase tracking-[0.16em] text-amber-700">
              {config.approvalStatusLabel}
            </div>
            <p className="mt-3 leading-7">
              Course acceptance and eligibility may depend on the student&apos;s specific {config.stateName} requirement. Review the course disclosures before enrolling or relying on completion.
            </p>
            <Link
              href={getDisclosuresRoute(state)}
              className="mt-4 inline-flex rounded-xl border border-amber-300 bg-white px-4 py-2 font-semibold text-amber-900 hover:bg-amber-100"
            >
              Read course information
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
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
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
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

          <div className="mt-5 text-sm text-slate-600">
            {mode === "login" ? (
              <p>
                New student?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup")
                    setMessage("")
                  }}
                  className="font-semibold text-blue-600 underline"
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
                  className="font-semibold text-blue-600 underline"
                >
                  Log in
                </button>
              </p>
            )}
          </div>

          <div className="mt-6">
            <Link
              href={`/${state}/checkout`}
              className="text-sm font-medium text-slate-600 underline"
            >
              View course plans
            </Link>
          </div>

          {message ? (
            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              {message}
            </div>
          ) : null}
        </section>
      </div>
    </main>
  )
}
