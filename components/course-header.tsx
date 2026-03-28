// components/course-header.tsx

import Link from "next/link"
import Image from "next/image"
import { getCourseConfig, getDisclosuresRoute } from "@/lib/course-config"

export default function CourseHeader({ state }: { state: string }) {
  const config = getCourseConfig(state)

  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-[rgba(247,242,232,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href={`/${state}`} className="flex min-w-0 items-center gap-3">
          <div className="rounded-[1.35rem] border border-white/70 bg-white/80 p-1.5 shadow-[0_12px_30px_rgba(15,23,42,0.07)]">
            <Image
              src={config.logoSrc}
              alt={config.brandName}
              width={42}
              height={42}
              priority
            />
          </div>

          <div className="min-w-0 leading-tight">
            <div className="truncate text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#8d6d2b]">
              {config.stateCode}
            </div>
            <div className="truncate text-base font-semibold text-slate-950 sm:text-lg">
              {config.brandName}
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/70 bg-white/65 p-1 shadow-[0_10px_24px_rgba(15,23,42,0.05)] sm:flex sm:gap-1">
          <Link
            href={`/${state}/dashboard`}
            className="rounded-full px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-slate-950"
          >
            {config.dashboardLabel}
          </Link>

          <Link
            href={`/${state}/course`}
            className="rounded-full px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-slate-950"
          >
            {config.courseLabel}
          </Link>

          <Link
            href={`/${state}/identity`}
            className="rounded-full px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-slate-950"
          >
            Identity
          </Link>

          <Link
            href={`/${state}/course/final-exam`}
            className="rounded-full px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-slate-950"
          >
            {config.finalExamLabel}
          </Link>

          <Link
            href={`/${state}/certificate`}
            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {config.certificateLabel}
          </Link>

          <Link
            href={getDisclosuresRoute(state)}
            className="rounded-full px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-slate-950"
          >
            Disclosures
          </Link>
        </nav>
      </div>
    </header>
  )
}
