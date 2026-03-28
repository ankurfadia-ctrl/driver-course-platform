import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/admin-access"

export const dynamic = "force-dynamic"

const qaSections = [
  {
    title: "Public marketing flow",
    items: [
      "Open the home page and Virginia landing page on desktop and mobile widths.",
      "Confirm disclosures, privacy, terms, contact, and certificate verification pages load.",
      "Confirm approval language remains neutral and does not claim DMV approval.",
    ],
  },
  {
    title: "Student account flow",
    items: [
      "Create a fresh student account and confirm login works.",
      "Open checkout and confirm plan pages load without errors.",
      "Confirm a paid student is blocked from repurchasing the same state course.",
    ],
  },
  {
    title: "Paid course flow",
    items: [
      "Complete a real or controlled Stripe purchase in the hosted environment.",
      "Confirm checkout success persists the purchase and unlocks the course.",
      "Open the dashboard, course outline, lesson pages, identity page, and support page.",
    ],
  },
  {
    title: "Course controls",
    items: [
      "Confirm seat-time tracking advances only for the signed-in student.",
      "Complete identity setup and confirm the final exam requires verification.",
      "Confirm same-day exam lock behavior and passing flow operate as expected.",
    ],
  },
  {
    title: "Completion flow",
    items: [
      "Confirm certificate unlocks only after seat time and a passing exam result.",
      "Download the PDF certificate and verify public verification works with the certificate ID.",
      "Use the certificate email action and confirm completion email behavior in production.",
    ],
  },
  {
    title: "Admin flow",
    items: [
      "Log in as an admin email and confirm protected admin pages load.",
      "Review compliance, curriculum, operations, launch readiness, and support pages.",
      "Export compliance/support CSVs and confirm the health endpoint responds.",
    ],
  },
]

export default async function AdminQaChecklistPage() {
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
            Hosted QA Checklist
          </h1>
          <p className="mt-2 max-w-3xl text-slate-600">
            Use this checklist for the final hosted smoke test before posting
            the site online.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/launch-readiness"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Launch Readiness
          </Link>
          <Link
            href="/api/health"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Open Health Endpoint
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {qaSections.map((section) => (
          <section
            key={section.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-slate-900">
              {section.title}
            </h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-700">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  )
}
