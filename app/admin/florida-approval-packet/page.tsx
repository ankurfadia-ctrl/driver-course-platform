import Link from "next/link"
import { redirect } from "next/navigation"
import { isAdminEmail } from "@/lib/admin-access"
import { getCourseConfig } from "@/lib/course-config"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

const packetSections = [
  {
    title: "Regulator criteria packet",
    status: "Waiting on FLHSMV",
    items: [
      "Reply from FLHSMV with minimum content criteria",
      "Any official provider application forms or instructions",
      "Any hard-copy course submission formatting guidance",
      "Any course demo or online demonstration instructions",
    ],
  },
  {
    title: "Provider application packet",
    status: "Structure ready",
    items: [
      "Florida legal entity and contact details",
      "Provider application forms once FLHSMV supplies them",
      "Business contact phone and email details",
      "Entity proof, receipts, and correspondence folder",
      "Submission cover checklist by course type",
    ],
  },
  {
    title: "Per-course hard-copy packet",
    status: "Scaffolded",
    items: [
      "BDI curriculum outline and course packet",
      "ADI curriculum outline and course packet",
      "TLSAE curriculum outline and course packet",
      "Mature Driver curriculum outline and course packet",
      "Course demo notes for each Florida course type",
    ],
  },
  {
    title: "Operations and compliance packet",
    status: "Prepare next",
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
    label: "Florida readiness workspace",
    href: "/admin/florida-readiness",
    note: "Track waiting items, rollout status, and build sequence.",
  },
  {
    label: "Course type registry",
    href: "/admin/course-types",
    note: "Use this as the source of truth for BDI, ADI, TLSAE, and Mature Driver.",
  },
  {
    label: "Regulatory outreach",
    href: "/admin/outreach",
    note: "Open the prefilled Gmail outreach links for FLHSMV and DMV.",
  },
  {
    label: "Operations workspace",
    href: "/admin/operations",
    note: "Use this to adapt certificate, support, and compliance workflows once Florida rules arrive.",
  },
]

const nextActions = [
  "Save the FLHSMV reply and any attachments into the Florida Approval Submission folder.",
  "Confirm whether Florida wants one provider path for all four course types or separate packets.",
  "Build BDI first once criteria arrive, then ADI, TLSAE, and Mature Driver in that order.",
  "Do not open Florida enrollment, pricing, or student accounts until FLHSMV guidance is in hand.",
]

export default async function FloridaApprovalPacketPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    redirect("/")
  }

  const floridaConfig = getCourseConfig("florida")

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
            Use this page as the single Florida packet workspace while waiting
            on FLHSMV. It keeps the provider path, per-course packet structure,
            and next packaging steps in one place without guessing at Florida
            course content before the official criteria arrive.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="text-sm text-slate-500">Current Florida status</div>
          <div className="mt-1 text-lg font-semibold text-slate-900">
            {floridaConfig.approvalStatusLabel}
          </div>
          <div className="mt-2 text-sm leading-6 text-slate-600">
            Public pages stay prep-only until FLHSMV returns the minimum course
            content criteria.
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
          <div className="text-sm text-blue-700">First build target</div>
          <div className="mt-2 text-2xl font-bold text-blue-900">BDI</div>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <div className="text-sm text-amber-700">Main blocker</div>
          <div className="mt-2 text-2xl font-bold text-amber-900">
            FLHSMV criteria
          </div>
        </div>
        <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
          <div className="text-sm text-green-700">Platform status</div>
          <div className="mt-2 text-2xl font-bold text-green-900">
            Infrastructure ready
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
