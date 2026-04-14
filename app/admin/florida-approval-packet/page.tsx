import Link from "next/link"
import { redirect } from "next/navigation"
import { isAdminEmail } from "@/lib/admin-access"
import { FLORIDA_BDI_TOPIC_MATRIX } from "@/lib/florida-bdi-course-content"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

const packetSections = [
  {
    title: "Regulator criteria",
    status: "Confirmed",
    items: [
      "Forms confirmed current by Milton Grosz (FLHSMV) on March 31, 2026",
      "Separate approval packet required for each course type and delivery type",
      "Pilot test confirmed active — Miami-Dade County (11th Judicial Circuit) selected",
      "No additional forms or instructions expected — provider has all materials needed",
    ],
  },
  {
    title: "Provider application packet",
    status: "In progress",
    items: [
      "Provider: Driver Course Platform LLC, DBA Florida Driver Improvement Courses",
      "Address: 775 Red Hill Rd, Fairfield, VA 24435",
      "Phone: (703) 574-0146 | Email: admin@vadriverimprovementcourse.com",
      "Pending: Florida foreign LLC registration and registered agent details",
      "Pending: copyright and ownership documentation attachment",
    ],
  },
  {
    title: "BDI course packet",
    status: "Near complete",
    items: [
      "Script v0.2 paginated and page-frozen — 18 pages, 10 modules",
      `Topic-to-page matrix complete — ${FLORIDA_BDI_TOPIC_MATRIX.length} topic rows, all page-frozen`,
      "500-question bank complete with script-page references",
      "Cover letter drafted with Miami-Dade pilot jurisdiction declared",
      "All supporting documents drafted (TOC, timings, technology delivery, validation, exam, instructor, demo, manifest)",
      "Pending: add jurisdiction declaration to completed application form",
      "Pending: final PDF assembly with page references verified",
    ],
  },
  {
    title: "Operations and compliance packet",
    status: "Prepare after BDI",
    items: [
      "Florida certificate and completion workflow notes",
      "Florida reporting and notification workflow notes",
      "Support and escalation SOP",
      "Refund and dispute SOP",
      "Audit-response and correction workflow notes",
    ],
  },
]

const packetLinks = [
  {
    label: "Florida reviewer packet",
    href: "/admin/florida-approval-packet/reviewer",
    note: "Printable reviewer-facing packet for BDI course structure, topic map, validation controls, and final-exam setup.",
  },
  {
    label: "Florida BDI reviewer portal",
    href: "/florida/reviewer-access",
    note: "FLHSMV committee demo view — course structure, module content, validation controls, exam specs, and topic matrix.",
  },
  {
    label: "Florida readiness workspace",
    href: "/admin/florida-readiness",
    note: "Track confirmed items, BDI completion status, and remaining submission gaps.",
  },
  {
    label: "Florida BDI step-by-step workflow",
    href: "/admin/florida-bdi-submission",
    note: "Ordered checklist for LLC filing, application cleanup, attachments, PDF assembly, and submission handoff.",
  },
  {
    label: "Course type registry",
    href: "/admin/course-types",
    note: "Source of truth for BDI, ADI, TLSAE, and Mature Driver track status.",
  },
  {
    label: "Regulatory outreach",
    href: "/admin/outreach",
    note: "Prefilled outreach links for FLHSMV correspondence.",
  },
]

const nextActions = [
  "Complete Florida foreign LLC registration and obtain a Florida registered agent.",
  "Add Miami-Dade County (11th Judicial Circuit) pilot jurisdiction declaration to the completed application form.",
  "Attach copyright and ownership documentation to the packet.",
  "Assemble the final PDF packet in submission order, verifying all script-page references are preserved.",
  "Prepare demo environment for FLHSMV committee walkthrough.",
  "Do not open Florida enrollment or student accounts until the BDI packet is submitted and approval is granted.",
]

export default async function FloridaApprovalPacketPage() {
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
            Florida Approval Packet
          </h1>
          <p className="mt-2 max-w-3xl text-slate-600">
            Florida forms confirmed current. Pilot test confirmed active. Pilot
            jurisdiction selected: Miami-Dade County. BDI packet is near complete
            — remaining items are LLC registration, jurisdiction declaration on
            the form, copyright attachment, and final PDF assembly.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="text-sm text-slate-500">Current Florida status</div>
          <div className="mt-1 text-lg font-semibold text-slate-900">
            Forms received, packet assembly in progress
          </div>
          <div className="mt-2 text-sm leading-6 text-slate-600">
            Public pages stay prep-only until the Florida BDI packet is fully
            assembled and reviewed.
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
          <div className="text-sm text-blue-700">First build target</div>
          <div className="mt-2 text-2xl font-bold text-blue-900">BDI</div>
        </div>
        <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
          <div className="text-sm text-green-700">Pilot jurisdiction</div>
          <div className="mt-2 text-2xl font-bold text-green-900">
            Miami-Dade County
          </div>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <div className="text-sm text-amber-700">BDI packet status</div>
          <div className="mt-2 text-2xl font-bold text-amber-900">
            Near complete
          </div>
        </div>
      </div>

      <section className="rounded-3xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Reviewer-ready export
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-700">
              Open the printable Florida BDI reviewer packet when you need a
              clean PDF summary for committee review or packet assembly.
            </p>
          </div>
          <Link
            href="/admin/florida-approval-packet/reviewer"
            className="inline-flex rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Open Reviewer Packet
          </Link>
        </div>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          Use the logged-in reviewer portal when FLHSMV or internal reviewers
          need to browse the BDI structure interactively. Use the printable
          packet when you need a static reviewer bundle.
        </p>
      </section>

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
          Packet workspaces in the app
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {packetLinks.map((link) => (
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
          Immediate next actions
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
          {nextActions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}
