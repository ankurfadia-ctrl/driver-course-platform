"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { getCourseAccessStatus } from "@/lib/course-access"
import { getLatestExamResultForCourse } from "@/lib/exam-results"

const BOATING_COURSE_SLUG = "boating-safety"

export default function VirginiaBoatingDashboardPage() {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasPurchase, setHasPurchase] = useState(false)
  const [examPassed, setExamPassed] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function loadAccess() {
      const access = await getCourseAccessStatus("virginia", BOATING_COURSE_SLUG)

      if (!isMounted) return
      setIsAuthenticated(access.isAuthenticated)
      setHasPurchase(access.hasPaidAccess)

      if (access.hasPaidAccess) {
        const latestExam = await getLatestExamResultForCourse(
          "virginia",
          BOATING_COURSE_SLUG
        )

        if (!isMounted) return
        setExamPassed(Boolean(latestExam?.passed))
      }

      setLoading(false)
    }

    void loadAccess()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <main className="public-shell min-h-screen">
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="section-label">Virginia Boating Dashboard</div>
          <h1 className="text-4xl font-semibold text-slate-950">Student dashboard</h1>
          {loading ? (
            <p className="leading-7 text-slate-600">Checking account access...</p>
          ) : !isAuthenticated ? (
            <p className="leading-7 text-slate-600">
              Sign in to continue into the Virginia boating course.
            </p>
          ) : hasPurchase ? (
            <div className="space-y-3">
              <p className="leading-7 text-slate-600">
                Your Virginia boating course access is active. Continue through the
                lessons, then finish the final exam and certificate steps here.
              </p>
              <p className="text-sm text-slate-500">
                {examPassed
                  ? "Final exam status: passed. Your certificate is ready."
                  : "Final exam status: not passed yet."}
              </p>
            </div>
          ) : (
            <p className="leading-7 text-slate-600">
              This account does not have an active Virginia boating purchase yet.
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            {hasPurchase ? (
              <>
                <Link
                  href="/virginia-boating/learn"
                  className="rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800"
                >
                  Enter course
                </Link>
                <Link
                  href="/virginia-boating/exam"
                  className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Final exam
                </Link>
                {examPassed ? (
                  <Link
                    href="/virginia-boating/certificate"
                    className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Certificate
                  </Link>
                ) : null}
              </>
            ) : !isAuthenticated ? (
              <>
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
              </>
            ) : (
              <Link
                href="/virginia-boating/pricing"
                className="rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800"
              >
                View plans
              </Link>
            )}
            <Link
              href="/virginia-boating"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Back to Virginia boating
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
