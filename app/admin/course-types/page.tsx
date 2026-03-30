import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/admin-access"
import { getAllCourseTypes } from "@/lib/course-types"

export const dynamic = "force-dynamic"

const nextMoves = [
  "Add course-type fields to purchase, progress, exam, and certificate records when the next state product is built.",
  "Split Florida pricing and disclosures by course type instead of assuming one shared state course.",
  "Build BDI first, then ADI, then TLSAE, then Mature Driver after FLHSMV criteria arrive.",
]

export default async function AdminCourseTypesPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    redirect("/")
  }

  const courseTypes = getAllCourseTypes()

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Admin
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            Course Type Scaffold
          </h1>
          <p className="mt-2 max-w-3xl text-slate-600">
            Shared state-plus-course-type planning layer for future multi-track
            products like Florida BDI, ADI, TLSAE, and Mature Driver.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/florida-readiness"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Florida Readiness
          </Link>
          <Link
            href="/admin/pricing"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Pricing
          </Link>
        </div>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Current course-type registry
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {courseTypes.map((courseType) => (
            <article
              key={`${courseType.stateSlug}:${courseType.code}`}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {courseType.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {courseType.stateCode} · {courseType.code}
                  </p>
                </div>
                <div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                  {courseType.status.replace("-", " ")}
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                {courseType.audience}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {courseType.notes}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Next moves</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
          {nextMoves.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}
