import type { Metadata } from "next"
import Link from "next/link"
import { BOATING_LESSONS } from "@/lib/boating-course-curriculum"
import { VIRGINIA_BOATING_CONFIG } from "@/lib/virginia-boating-config"

const virginiaOverlays = [
  {
    title: "Use Virginia proof language throughout the student flow",
    body:
      "The Virginia version should consistently explain that the student is earning course completion proof accepted under Virginia’s boating education requirement rather than using a broad generic license promise.",
  },
  {
    title: "Keep PWC eligibility visible, not hidden in fine print",
    body:
      "Virginia personal watercraft rules create a different student story for 14- and 15-year-old operators, so the product should explain that path clearly before checkout and before the final proof screen.",
  },
  {
    title: "Do not flatten exemptions into the main student path",
    body:
      "Some Virginia boaters may qualify through credentials, supervision, rental pathways, or other special cases. The course should help them identify that early instead of selling the same flow to everyone.",
  },
]

export const metadata: Metadata = {
  title: `Virginia Boating Curriculum | ${VIRGINIA_BOATING_CONFIG.brandName}`,
  description:
    "Virginia-specific boating curriculum overlay showing how the base NASBLA-aligned lessons will be adapted for Virginia boating education requirements.",
  alternates: {
    canonical: "/virginia-boating/course",
  },
}

export default function VirginiaBoatingCoursePage() {
  return (
    <main className="public-shell min-h-screen">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <section className="glass-panel rounded-[2rem] bg-white p-8">
          <div className="space-y-4">
            <div className="section-label">Virginia Curriculum Overlay</div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
              Virginia boating curriculum path
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              The base boating curriculum already exists. This page shows how the
              Virginia version should sit on top of it with Virginia rule
              reminders, proof language, and first-launch product decisions.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/boating/course"
                className="rounded-xl bg-sky-700 px-6 py-3 font-semibold text-white hover:bg-sky-800"
              >
                Open base boating curriculum
              </Link>
              <Link
                href="/virginia-boating"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Back to Virginia boating
              </Link>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Base lessons
            </div>
            <div className="mt-5 space-y-4">
              {BOATING_LESSONS.map((lesson) => (
                <article
                  key={lesson.slug}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-950">
                        {lesson.title}
                      </h2>
                      <div className="mt-1 text-sm text-slate-500">
                        {lesson.moduleCode} | {lesson.estimatedMinutes} min
                      </div>
                    </div>
                    <Link
                      href={`/boating/course/${lesson.slug}`}
                      className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Open
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
              Virginia overlay notes
            </div>
            <div className="mt-5 space-y-4">
              {virginiaOverlays.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-amber-200 bg-white p-5"
                >
                  <h2 className="text-xl font-semibold text-slate-950">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-700">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
