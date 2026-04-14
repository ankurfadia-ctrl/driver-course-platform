import Link from "next/link"
import { redirect } from "next/navigation"
import { isAdminEmail } from "@/lib/admin-access"
import { getCourseConfig } from "@/lib/course-config"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

const packetSections = [
  {
    title: "Name approval packet",
    status: "Ready now",
    items: [
      "California Occupational Licensing portal account setup",
      "Proposed California school name and owner details prepared for portal entry",
      "OL 612 form saved locally as legacy reference material",
      "Portal-first note so the team does not keep mailing the old form workflow",
    ],
  },
  {
    title: "Owner licensing packet",
    status: "Prepare next",
    items: [
      "California owner-license account and filing path",
      "Business entity and ownership documents",
      "Business office, property, and signage evidence",
      "Local business license documentation",
      "Fingerprint and occupational licensing readiness",
    ],
  },
  {
    title: "Operator and instructor path",
    status: "Plan before spend",
    items: [
      "Operator license requirements and exam plan",
      "Instructor license requirements and exam plan",
      "Live Scan or out-of-state fingerprint process",
      "People coverage for the California TVS structure",
    ],
  },
  {
    title: "Internet curriculum and bond packet",
    status: "Later commitment",
    items: [
      "Original course review path versus approved lesson-plan authorization path",
      "OL 613 topic and standards mapping",
      "OL 704B bond planning for internet or home-study delivery",
      "California cost and timing decision before deeper content work",
    ],
  },
]

const packetLinks = [
  {
    label: "California readiness workspace",
    href: "/admin/california-readiness",
    note: "Track blockers, build order, and go or no-go decisions.",
  },
  {
    label: "Course type registry",
    href: "/admin/course-types",
    note: "California now appears as a real prep-only state and course track in the registry.",
  },
  {
    label: "Regulatory outreach",
    href: "/admin/outreach",
    note: "Use outreach workflows when you need regulator clarification emails later.",
  },
  {
    label: "Operations workspace",
    href: "/admin/operations",
    note: "Use this for support, certificate, and reporting workflow planning after California becomes worth deeper investment.",
  },
]

const nextActions = [
  "Create the California DMV Occupational Licensing portal account and begin the TVS owner workflow online.",
  "Use the proposed school name in the portal and confirm the current online name-verification path before sending anything by mail.",
  "Do not buy the California bond or start fingerprint spend until the name step is moving and California still looks worth it.",
  "Map the office, property, and local-license requirements against your real situation.",
  "Decide whether California is worth pursuing before committing to the owner, operator, instructor, and curriculum-review costs.",
]

export default async function CaliforniaApprovalPacketPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    redirect("/")
  }

  const californiaConfig = getCourseConfig("california")

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Admin
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            California Approval Packet
          </h1>
          <p className="mt-2 max-w-3xl text-slate-600">
            Use this page as the California packet workspace while the
            portal-based name and owner-setup step is underway. It keeps the
            packet sections in one place so you can see the full California
            path without spending too early on the occupational-licensing
            pieces.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="text-sm text-slate-500">Current California status</div>
          <div className="mt-1 text-lg font-semibold text-slate-900">
            {californiaConfig.approvalStatusLabel}
          </div>
          <div className="mt-2 text-sm leading-6 text-slate-600">
            California stays prep-only until name approval and the licensing
            path are real.
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
          <div className="text-sm text-blue-700">First filing step</div>
          <div className="mt-2 text-2xl font-bold text-blue-900">
            OL portal start
          </div>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <div className="text-sm text-amber-700">Main cost drivers</div>
          <div className="mt-2 text-2xl font-bold text-amber-900">
            Bond + licensing
          </div>
        </div>
        <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
          <div className="text-sm text-green-700">Public status</div>
          <div className="mt-2 text-2xl font-bold text-green-900">
            Prep only
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
