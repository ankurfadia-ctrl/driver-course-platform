import type { Metadata } from "next"
import Link from "next/link"
import { Inter, Plus_Jakarta_Sans, Public_Sans } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--preview-inter",
})

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--preview-public-sans",
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--preview-jakarta",
})

export const metadata: Metadata = {
  title: "Style Preview",
  description: "Internal style direction previews for Driver Course Platform.",
  robots: {
    index: false,
    follow: false,
  },
}

function OptionShell({
  title,
  tag,
  className,
  children,
}: {
  title: string
  tag: string
  className: string
  children: React.ReactNode
}) {
  return (
    <section className={`rounded-[2rem] border p-5 shadow-sm ${className}`}>
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] opacity-70">
            {tag}
          </div>
          <h2 className="mt-2 text-2xl font-semibold">{title}</h2>
        </div>
      </div>
      {children}
    </section>
  )
}

export default function StylePreviewPage() {
  return (
    <main className="min-h-screen bg-[#eef3f9] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Style Preview
          </div>
          <h1 className="mt-3 text-4xl font-semibold text-slate-950">
            Pick the direction you want for the whole site.
          </h1>
          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            These are visual mock directions, not final pages. Once you pick one,
            I&apos;ll apply it consistently across the public/student-facing site.
          </p>
          <div className="mt-5">
            <Link
              href="/virginia"
              className="inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Back to live site
            </Link>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <OptionShell
            title="Option A"
            tag="Government / Compliance Clean"
            className={`${publicSans.className} border-slate-200 bg-white text-slate-900`}
          >
            <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Virginia Driver Improvement
                  </div>
                  <div className="mt-1 text-base font-semibold">
                    Virginia Driver Improvement Course
                  </div>
                </div>
                <div className="rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white">
                  Student Login
                </div>
              </div>

              <div className="px-5 py-7">
                <div className="max-w-sm">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Virginia Online Course
                  </div>
                  <h3 className="mt-3 text-3xl font-semibold leading-tight">
                    Complete your driver improvement course online.
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Clear enrollment, clear disclosures, and a straightforward student flow.
                  </p>
                </div>

                <div className="mt-6 flex gap-3">
                  <div className="rounded-md bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">
                    View Plans
                  </div>
                  <div className="rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700">
                    Read Disclosures
                  </div>
                </div>

                <div className="mt-7 grid gap-3">
                  {[
                    "State-specific disclosures",
                    "Protected checkout",
                    "Course, exam, and certificate flow",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </OptionShell>

          <OptionShell
            title="Option B"
            tag="Clean SaaS"
            className={`${inter.className} border-[#dbe7ff] bg-[linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)] text-slate-900`}
          >
            <div className="overflow-hidden rounded-[1.5rem] border border-[#dbe7ff] bg-white shadow-[0_16px_30px_rgba(37,99,235,0.08)]">
              <div className="flex items-center justify-between px-5 py-4">
                <div className="text-sm font-semibold text-slate-900">
                  Driver Course Platform
                </div>
                <div className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                  Launch Virginia
                </div>
              </div>

              <div className="border-t border-[#e5edff] px-5 py-7">
                <div className="max-w-sm">
                  <div className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700">
                    Virginia-first
                  </div>
                  <h3 className="mt-4 text-3xl font-semibold leading-tight">
                    A clean online driver improvement experience.
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Modern, simple, product-style layout with strong blue CTAs and quiet supporting surfaces.
                  </p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    "Student login and account creation",
                    "Checkout and course access controls",
                    "Final exam and certificate tools",
                    "Support and verification pages",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-[#e5edff] bg-[#f8fbff] p-4 text-sm text-slate-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </OptionShell>

          <OptionShell
            title="Option C"
            tag="Earlier Look, Cleaner"
            className={`${jakarta.className} border-slate-200 bg-[#f7f9fc] text-slate-900`}
          >
            <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
              <div className="bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] px-5 py-6">
                <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700">
                  Virginia Driver Course
                </div>
                <h3 className="mt-4 max-w-sm text-3xl font-bold leading-tight text-slate-950">
                  Complete your Virginia driver improvement course online.
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-slate-600">
                  This keeps the earlier blue-and-white feel, but sharpens the spacing, hierarchy, and consistency.
                </p>

                <div className="mt-6 flex gap-3">
                  <div className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white">
                    View Plans
                  </div>
                  <div className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700">
                    Student Login
                  </div>
                </div>
              </div>

              <div className="grid gap-3 px-5 py-5">
                {[
                  "Simple course overview cards",
                  "Cleaner buttons and spacing",
                  "Less decorative typography",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </OptionShell>
        </div>
      </div>
    </main>
  )
}
