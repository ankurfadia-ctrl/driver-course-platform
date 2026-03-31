import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import { getAdminEmails } from "@/lib/admin-access"

export const metadata: Metadata = {
  title: "Admin | Driver Course Platform",
  description: "Internal admin tools for the driver course platform.",
  robots: {
    index: false,
    follow: false,
  },
}

const adminNavSections = [
  {
    title: "Overview",
    links: [
      { href: "/admin/state-tracker", label: "State Tracker" },
      { href: "/admin/launch-readiness", label: "Launch Readiness" },
      { href: "/admin/qa-checklist", label: "Hosted QA" },
    ],
  },
  {
    title: "Operations",
    links: [
      { href: "/admin/compliance", label: "Compliance" },
      { href: "/admin/support", label: "Support" },
      { href: "/admin/pricing", label: "Pricing" },
      { href: "/admin/curriculum", label: "Curriculum" },
      { href: "/admin/operations", label: "Operations" },
      { href: "/admin/reporting", label: "DMV Reporting" },
      { href: "/admin/outreach", label: "Regulatory Outreach" },
      { href: "/admin/course-types", label: "Course Types" },
    ],
  },
  {
    title: "Virginia",
    links: [
      { href: "/admin/virginia-readiness", label: "Virginia Readiness" },
      { href: "/admin/approval-packet", label: "Virginia Packet" },
    ],
  },
  {
    title: "Florida",
    links: [
      { href: "/admin/florida-readiness", label: "Florida Readiness" },
      { href: "/admin/florida-approval-packet", label: "Florida Packet" },
    ],
  },
  {
    title: "California",
    links: [
      { href: "/admin/california-readiness", label: "California Readiness" },
      { href: "/admin/california-approval-packet", label: "California Packet" },
    ],
  },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  const adminCount = getAdminEmails().length

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                Admin Workspace
              </div>
              <div className="mt-1 text-2xl font-bold text-slate-900">
                Driver Course Platform
              </div>
            </div>
            <Link
              href="/"
              className="inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Public Home
            </Link>
          </div>

        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-8">
        <aside className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Admin access
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900">
              {adminCount}
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Configured admin account{adminCount === 1 ? "" : "s"} with one
              grouped workspace for operations and state filings.
            </p>
          </div>

          <nav className="space-y-4">
            {adminNavSections.map((section) => (
              <section
                key={section.title}
                className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {section.title}
                </div>
                <div className="mt-3 flex flex-col gap-2">
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-slate-900"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </nav>
        </aside>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  )
}
