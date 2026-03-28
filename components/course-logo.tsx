// components/course-logo.tsx

import Image from "next/image"
import Link from "next/link"
import { getCourseRoute } from "@/lib/course-config"

type CourseLogoProps = {
  state: string
  brandName: string
  logoSrc: string
}

export default function CourseLogo({
  state,
  brandName,
  logoSrc,
}: CourseLogoProps) {
  return (
    <Link
      href={getCourseRoute(state)}
      className="flex min-w-0 items-center gap-3"
      aria-label={`${brandName} home`}
    >
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
        <div className="absolute inset-0 scale-[1.18] transform-gpu">
          <Image
            src={logoSrc}
            alt={brandName}
            fill
            priority
            className="object-contain"
            sizes="48px"
          />
        </div>
      </div>

      <div className="min-w-0 leading-tight">
        <div className="truncate text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
          {state}
        </div>
        <div className="truncate text-base font-bold text-slate-900 sm:text-lg">
          {brandName}
        </div>
      </div>
    </Link>
  )
}