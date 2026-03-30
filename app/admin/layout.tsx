import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Admin | Driver Course Platform",
  description: "Internal admin tools for the driver course platform.",
  robots: {
    index: false,
    follow: false,
  },
}

const adminNavLinks = [
  { href: "/admin/compliance", label: "Compliance" },
  { href: "/admin/support", label: "Support" },
  { href: "/admin/pricing", label: "Pricing" },
  { href: "/admin/curriculum", label: "Curriculum" },
  { href: "/admin/operations", label: "Operations" },
  { href: "/admin/reporting", label: "DMV Reporting" },
  { href: "/admin/approval-packet", label: "Approval Packet" },
  { href: "/admin/virginia-readiness", label: "Virginia Readiness" },
  { href: "/admin/launch-readiness", label: "Launch Readiness" },
  { href: "/admin/qa-checklist", label: "Hosted QA" },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
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

          <nav className="mt-4 flex flex-wrap gap-2">
            {adminNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
