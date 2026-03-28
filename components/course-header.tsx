// components/course-header.tsx

import Link from "next/link"
import Image from "next/image"
import { getCourseConfig, getDisclosuresRoute } from "@/lib/course-config"

export default function CourseHeader({ state }: { state: string }) {
  const config = getCourseConfig(state)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href={`/${state}`} className="flex min-w-0 items-center gap-3">
          <div className="rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-slate-200">
            <Image
              src={config.logoSrc}
              alt={config.brandName}
              width={42}
              height={42}
              priority
            />
          </div>

          <div className="min-w-0 leading-tight">
            <div className="truncate text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              {config.stateCode}
            </div>
            <div className="truncate text-base font-bold text-slate-900 sm:text-lg">
              {config.brandName}
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex sm:gap-2">
          <Link
            href={`/${state}/dashboard`}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
          >
            {config.dashboardLabel}
          </Link>

          <Link
            href={`/${state}/course`}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
          >
            {config.courseLabel}
          </Link>

          <Link
            href={`/${state}/identity`}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Identity
          </Link>

          <Link
            href={`/${state}/course/final-exam`}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
          >
            {config.finalExamLabel}
          </Link>

          <Link
            href={`/${state}/certificate`}
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {config.certificateLabel}
          </Link>

          <Link
            href={getDisclosuresRoute(state)}
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Disclosures
          </Link>
        </nav>
      </div>
    </header>
  )
}
