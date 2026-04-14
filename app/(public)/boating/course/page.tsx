import type { Metadata } from "next"
import Link from "next/link"
import {
  BOATING_LESSON_CHECKS,
  BOATING_LESSONS,
} from "@/lib/boating-course-curriculum"
import { BOATING_PRODUCT_CONFIG } from "@/lib/boating-config"

export const metadata: Metadata = {
  title: `Boating Course Outline | ${BOATING_PRODUCT_CONFIG.siteTitle}`,
  description:
    "Public boating course outline with NASBLA-aligned lesson structure covering core boating knowledge and powerboat-specific foundations.",
  alternates: {
    canonical: "/boating/course",
  },
}

export default function BoatingCoursePage() {
  const totalMinutes = BOATING_LESSONS.reduce(
    (sum, lesson) => sum + lesson.estimatedMinutes,
    0
  )

  return (
    <main className="public-shell min-h-screen">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="space-y-6">
          <div className="section-label">Boating Curriculum</div>
          <h1 className="display-balance max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            Public boating course outline
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-600">
            This boating curriculum is structured around the national basic
            boating knowledge standards first, then extended for powerboat and
            water-jet realities so state-specific rules, testing, and certificate
            language can be layered on cleanly.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/boating"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Back to Boating
            </Link>
            <div className="rounded-xl bg-sky-50 px-6 py-3 font-semibold text-sky-800">
              {BOATING_LESSONS.length} lessons | about {totalMinutes} minutes
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Lesson Outline
            </div>
            <div className="mt-6 space-y-4">
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
                      className="rounded-xl bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800"
                    >
                      Open Lesson
                    </Link>
                  </div>
                  <div className="mt-3 text-sm leading-6 text-slate-600">
                    {BOATING_LESSON_CHECKS[lesson.slug]?.length ?? 0} knowledge
                    check questions included in this lesson scaffold.
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
              Standards Alignment
            </div>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">
              What this course structure is built to cover
            </h2>
            <div className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
              <div className="rounded-2xl border border-amber-200 bg-white px-4 py-4">
                National boating core first, with dedicated operator,
                emergency, stewardship, and navigation coverage before the
                state overlays begin.
              </div>
              <div className="rounded-2xl border border-amber-200 bg-white px-4 py-4">
                Separate powerboat lesson coverage for preventive checks,
                fueling, ventilation, engine cut-off habits, and fire-control
                systems.
              </div>
              <div className="rounded-2xl border border-amber-200 bg-white px-4 py-4">
                Low-speed operations, anchoring, towing, and personal
                watercraft or water-jet handling are treated as real safety
                skills instead of side notes.
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
