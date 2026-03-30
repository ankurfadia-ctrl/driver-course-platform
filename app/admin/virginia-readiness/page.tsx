import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/admin-access"

export const dynamic = "force-dynamic"

const productChecklist = [
  "Student auth, checkout, course access gating, seat-time tracking, final exam, certificate flow",
  "State disclosures page with neutral approval-safe language",
  "Internal compliance dashboard with CSV export",
  "Admin support inbox with status updates and CSV export",
  "Protected admin routes and env-based admin access",
  "Purchase confirmation and completion email plumbing",
]

const stillNeeded = [
  "Decide whether to use an approved curriculum vendor or submit your own curriculum",
  "Prepare the formal curriculum packet for Virginia review",
  "Prepare all quizzes and answer keys as a reviewer-friendly package",
  "Document identity validation methods in non-code form",
  "Prepare provider SOPs for support, disputes, certificate correction, and record lookup",
  "Complete Virginia application paperwork, fees, and Extranet setup",
]

const providerSops = [
  {
    title: "Purchase support",
    body:
      "Verify whether the student has a paid purchase, confirm state and plan, resend purchase confirmation if needed, and route unresolved payment discrepancies for manual review.",
  },
  {
    title: "Seat-time disputes",
    body:
      "Review course_attempts, lesson navigation, and last activity timestamps. Confirm whether the student remained active in the course and whether the required time threshold was actually met.",
  },
  {
    title: "Identity verification issues",
    body:
      "Confirm the student identity profile exists, review whether pre-exam and mid-exam verification were completed, and document what remediation path is allowed before another attempt.",
  },
  {
    title: "Exam lock and retake handling",
    body:
      "Review the latest exam result, same-day lock status, and any tab-navigation warnings. Do not promise overrides unless policy explicitly allows them.",
  },
  {
    title: "Certificate correction",
    body:
      "Verify the student identity record, exam pass result, seat-time completion, and certificate ID before making any correction to displayed or emailed completion details.",
  },
  {
    title: "Record lookup for courts or employers",
    body:
      "Use the compliance dashboard and certificate verification tools to confirm whether the certificate exists, whether the student passed, and which state/course record it belongs to.",
  },
]

const sourceOfTruthFiles = [
  {
    label: "Virginia lesson content and lesson knowledge checks",
    path: "C:/Users/ankur/driver-course-platform/lib/virginia-course-curriculum.ts",
  },
  {
    label: "Virginia final exam bank",
    path: "C:/Users/ankur/driver-course-platform/lib/final-exam.ts",
  },
  {
    label: "State configuration and disclosures",
    path: "C:/Users/ankur/driver-course-platform/lib/course-config.ts",
  },
  {
    label: "Compliance dashboard data source",
    path: "C:/Users/ankur/driver-course-platform/lib/admin-compliance.ts",
  },
  {
    label: "Seat-time tracker implementation",
    path: "C:/Users/ankur/driver-course-platform/lib/course/seat-time/useSeatTimeTracker.ts",
  },
]

const virginiaPaperwork = [
  "DIC 551 for online clinic provider application",
  "US 532 E/ER for Extranet access",
  "Application and Extranet fees",
  "Curriculum vendor agreement if using an approved vendor",
  "Or DI 14 plus curriculum packet if pursuing your own curriculum approval path",
]

export default async function VirginiaReadinessPage() {
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
            Virginia Approval Readiness
          </h1>
          <p className="mt-2 max-w-3xl text-slate-600">
            Use this workspace to align the current product, internal procedures, and Virginia submission materials before applying for approval.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/compliance"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Compliance Dashboard
          </Link>
          <Link
            href="/admin/curriculum"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Curriculum Packet
          </Link>
          <Link
            href="/admin/operations"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Operations Guide
          </Link>
          <Link
            href="/admin/approval-packet"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Approval Packet
          </Link>
          <Link
            href="/admin/launch-readiness"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Launch Readiness
          </Link>
          <Link
            href="/admin/support"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Support Inbox
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Product already in place</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
            {productChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Still needed before submission</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
            {stillNeeded.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Virginia paperwork pack</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
          {virginiaPaperwork.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Source-of-truth code references</h2>
        <div className="mt-4 grid gap-4">
          {sourceOfTruthFiles.map((file) => (
            <div key={file.path} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="font-medium text-slate-900">{file.label}</div>
              <div className="mt-1 text-sm text-slate-600">
                <a href={file.path} className="underline">
                  {file.path}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Provider SOP checklist</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {providerSops.map((sop) => (
            <article key={sop.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">{sop.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{sop.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
