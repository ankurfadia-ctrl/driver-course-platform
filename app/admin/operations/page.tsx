import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/admin-access"
import { IDENTITY_VERIFICATION_QUESTIONS } from "@/lib/identity-verification"

export const dynamic = "force-dynamic"

const providerWorkflow = [
  {
    title: "Purchase support",
    body:
      "Confirm the student email, state, paid status, and support tier in the compliance dashboard. If payment is valid but access is still blocked, confirm the checkout confirmation record and resend the purchase email if needed.",
  },
  {
    title: "Identity review",
    body:
      "Confirm that the student identity profile exists for the active state and that the student record includes legal name, date of birth, driver license number, and two stored security questions with answers.",
  },
  {
    title: "Exam issue handling",
    body:
      "Review seat-time completion, final exam score history, same-day attempt restrictions, and any identity-verification failure before approving any manual follow-up or support response.",
  },
  {
    title: "Certificate correction",
    body:
      "Verify the exact student identity record, passed exam record, completion timestamp, and certificate ID before correcting any displayed completion details or resending a completion email.",
  },
  {
    title: "External verification response",
    body:
      "Use the public certificate verification page and the compliance dashboard together to confirm whether a completion record exists and whether the certificate ID matches the stored exam result.",
  },
]

const identityFlow = [
  "The student creates an identity profile before the final exam by submitting legal first name, legal last name, date of birth, driver license number, and two custom security questions with answers.",
  "The profile is stored per user and per state in the student_identity_profiles table.",
  "Before the final exam unlocks, the student must answer both stored security questions correctly.",
  "During the final exam, the system can prompt a random stored security question again before the student continues.",
  "If the student cannot complete identity verification, the final exam remains blocked or interrupted until verification succeeds.",
]

const controlLinks = [
  {
    label: "Identity collection",
    href: "/virginia/identity",
  },
  {
    label: "Final exam flow",
    href: "/virginia/course/final-exam",
  },
  {
    label: "Compliance dashboard",
    href: "/admin/compliance",
  },
  {
    label: "Curriculum packet",
    href: "/admin/curriculum",
  },
]

export default async function AdminOperationsPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    redirect("/")
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Admin
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            Provider Operations Guide
          </h1>
          <p className="mt-2 max-w-3xl text-slate-600">
            Internal draft documentation for Virginia support operations,
            identity-validation methods, and completion record handling.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/virginia-readiness"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Virginia Readiness
          </Link>
          <Link
            href="/admin/compliance"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Compliance Dashboard
          </Link>
        </div>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Identity-validation method
        </h2>
        <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="font-semibold text-slate-900">
              Student identity fields collected
            </h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
              {IDENTITY_VERIFICATION_QUESTIONS.map((question) => (
                <li key={question.id}>
                  <span className="font-medium text-slate-900">
                    {question.prompt}:
                  </span>{" "}
                  {question.helpText}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <h3 className="font-semibold text-slate-900">
              Verification workflow
            </h3>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-700">
              {identityFlow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Provider workflow
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {providerWorkflow.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Operational control points
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {controlLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
