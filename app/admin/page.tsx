import Link from "next/link"
import { redirect } from "next/navigation"
import { isAdminEmail } from "@/lib/admin-access"
import {
  ADMIN_WORKSPACE_GROUPS,
  ADMIN_WORKSPACE_PRIORITIES,
} from "@/lib/admin-workspace"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export default async function AdminHomePage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    redirect("/")
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Admin
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Workspace Home</h1>
          <p className="mt-2 max-w-4xl text-slate-600">
            The admin workspace is now grouped by course family so parenting,
            DMV, boating, and shared operations stay easier to scan.
          </p>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 shadow-sm">
          <div className="text-sm text-blue-700">Right now</div>
          <div className="mt-1 text-lg font-semibold text-blue-900">
            Filing follow-through beats new app sprawl
          </div>
          <div className="mt-2 max-w-md text-sm leading-6 text-slate-700">
            South Dakota is ready to mail, Florida parent education is waiting
            on DCF, and Florida BDI remains the main unsubmitted DMV lane.
          </div>
        </div>
      </div>

      <section className="grid gap-4 lg:grid-cols-3">
        {ADMIN_WORKSPACE_PRIORITIES.map((item) => (
          <article
            key={item.title}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Priority
            </div>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">
              {item.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              {item.detail}
            </p>
          </article>
        ))}
      </section>

      <section className="space-y-5">
        {ADMIN_WORKSPACE_GROUPS.map((group) => (
          <article
            key={group.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                  Group
                </div>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                  {group.title}
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                  {group.description}
                </p>
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                {group.links.length} link{group.links.length === 1 ? "" : "s"}
              </div>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-white"
                >
                  <div className="text-base font-semibold text-slate-900">
                    {link.label}
                  </div>
                  <p className="mt-2 text-sm leading-7 text-slate-700">
                    {link.summary}
                  </p>
                  <div className="mt-3 text-sm font-medium text-blue-700">
                    Open workspace
                  </div>
                </Link>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
