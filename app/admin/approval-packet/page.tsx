import Link from "next/link"
import { redirect } from "next/navigation"
import { isAdminEmail } from "@/lib/admin-access"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

const packetSections = [
  {
    title: "Provider application packet",
    status: "External paperwork",
    items: [
      "DIC 551 online clinic provider application",
      "US 532 E/ER Extranet access form",
      "Virginia application and Extranet fees",
      "Business phone line and contact details",
      "Business support/contact workflow summary",
    ],
  },
  {
    title: "Curriculum review packet",
    status: "Ready in app",
    items: [
      "Virginia lesson content packet",
      "Lesson knowledge checks with answer keys",
      "Final exam bank with answer key",
      "Eight-hour timing and final-exam timing explanation",
      "English-language course scope disclosure",
    ],
  },
  {
    title: "Identity-validation packet",
    status: "Ready in app",
    items: [
      "Student identity fields collected",
      "Lesson-entry verification workflow",
      "Final-exam verification workflow",
      "Stored security-question method",
      "Remediation path when identity answers fail",
    ],
  },
  {
    title: "Completion and reporting packet",
    status: "Ready in app",
    items: [
      "Certificate issuance workflow",
      "DMV reporting queue process",
      "Court-document dependency for court-related attendance",
      "24-hour completion reporting obligation note",
      "Record lookup and certificate verification process",
    ],
  },
  {
    title: "Provider operations packet",
    status: "Package next",
    items: [
      "Support SOP",
      "Seat-time dispute SOP",
      "Identity issue SOP",
      "Exam failure and retake handling SOP",
      "Certificate correction SOP",
      "Refund and charge-dispute SOP",
    ],
  },
]

const sourceLinks = [
  {
    label: "Virginia curriculum packet",
    href: "/admin/curriculum",
    note: "Lessons, knowledge checks, and final exam bank",
  },
  {
    label: "Provider operations guide",
    href: "/admin/operations",
    note: "Identity, support, certificate, and review procedures",
  },
  {
    label: "DMV reporting queue",
    href: "/admin/reporting",
    note: "Ready to report, missing court document, and reported records",
  },
  {
    label: "Virginia readiness workspace",
    href: "/admin/virginia-readiness",
    note: "Submission checklist and readiness notes",
  },
  {
    label: "Compliance dashboard",
    href: "/admin/compliance",
    note: "Student purchase, identity, exam, certificate, and export data",
  },
]

const submissionNotes = [
  "Keep Virginia-facing wording neutral until formal approval is granted.",
  "Match the student-facing final-exam rule to the Virginia wording you intend to operate under before submission.",
  "Keep the phone line listed as a backup/support contact, with website support as the primary student path.",
  "Package reviewer materials in a non-code format before submission, even though the source-of-truth lives in the admin pages.",
  "Keep copies of the final packet, fee receipts, and any DMV correspondence together.",
]

export default async function AdminApprovalPacketPage() {
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
            Virginia Approval Packet
          </h1>
          <p className="mt-2 max-w-3xl text-slate-600">
            Use this page as the single checklist for packaging your Virginia
            provider submission materials. The app already holds most of the
            operating, curriculum, and reporting detail. This page tells you
            what to gather and where each source lives.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="text-sm text-slate-500">Primary business phone</div>
          <div className="mt-1 text-lg font-semibold text-slate-900">
            (703) 574-0146
          </div>
          <div className="mt-2 text-sm leading-6 text-slate-600">
            Keep voicemail-first handling active and keep online support as the
            main student path.
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
          <div className="text-sm text-blue-700">Submission focus</div>
          <div className="mt-2 text-2xl font-bold text-blue-900">
            Provider approval
          </div>
        </div>
        <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
          <div className="text-sm text-green-700">Most ready now</div>
          <div className="mt-2 text-2xl font-bold text-green-900">
            Curriculum + reporting
          </div>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <div className="text-sm text-amber-700">Still packaging</div>
          <div className="mt-2 text-2xl font-bold text-amber-900">
            Non-code reviewer docs
          </div>
        </div>
      </div>

      <section className="grid gap-5 lg:grid-cols-2">
        {packetSections.map((section) => (
          <article
            key={section.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-slate-900">
                {section.title}
              </h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {section.status}
              </span>
            </div>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Source pages to package from
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {sourceLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-white"
            >
              <div className="font-semibold text-slate-900">{link.label}</div>
              <div className="mt-2 text-sm leading-6 text-slate-600">
                {link.note}
              </div>
              <div className="mt-3 text-sm font-medium text-blue-700">
                Open page
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Final packaging notes
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
          {submissionNotes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}
