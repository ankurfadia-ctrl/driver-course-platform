"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ADMIN_WORKSPACE_GROUPS } from "@/lib/admin-workspace"

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function AdminSidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="space-y-4">
      {ADMIN_WORKSPACE_GROUPS.map((section) => {
        const sectionIsActive = section.links.some((link) =>
          isActivePath(pathname, link.href),
        )

        return (
          <section
            key={section.title}
            className={`rounded-3xl border bg-white p-4 shadow-sm transition ${
              sectionIsActive
                ? "border-blue-200 shadow-blue-100/60"
                : "border-slate-200"
            }`}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {section.title}
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {section.description}
            </p>
            <div className="mt-4 flex flex-col gap-2">
              {section.links.map((link) => {
                const isActive = isActivePath(pathname, link.href)

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? "border-blue-200 bg-blue-50 text-blue-900"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-white hover:text-slate-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </section>
        )
      })}
    </nav>
  )
}
