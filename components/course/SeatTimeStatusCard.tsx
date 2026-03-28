"use client"

import Link from "next/link"
import { useMemo } from "react"
import { useSeatTimeTracker } from "@/lib/course/seat-time/useSeatTimeTracker"

type SeatTimeStatusCardProps = {
  stateCode: string
  lessonNumber?: number | null
  pagePath: string
  courseSlug?: string
  requiredSeconds?: number
  heartbeatSeconds?: number
  showExamLockMessage?: boolean
  finalExamHref?: string
}

function formatPercent(percent: number) {
  return `${Math.max(0, Math.min(100, percent))}%`
}

function formatSeatTime(seconds: number) {
  const safeSeconds = Math.max(0, Math.floor(seconds))
  const hours = Math.floor(safeSeconds / 3600)
  const minutes = Math.floor((safeSeconds % 3600) / 60)
  const secs = safeSeconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`
  }

  if (minutes > 0) {
    return `${minutes}m ${secs}s`
  }

  return `${secs}s`
}

export default function SeatTimeStatusCard({
  stateCode,
  lessonNumber = null,
  pagePath,
  courseSlug = "driver-improvement",
  requiredSeconds = 28800,
  heartbeatSeconds = 30,
  showExamLockMessage = true,
  finalExamHref,
}: SeatTimeStatusCardProps) {
  const {
    loading,
    totalSeconds,
    remainingSeconds,
    percentComplete,
    isCompleted,
    isTabVisible,
  } = useSeatTimeTracker({
    stateCode,
    courseSlug,
    lessonNumber,
    pagePath,
    requiredSeconds,
    heartbeatSeconds,
    enabled: true,
  })

  const progressWidth = useMemo(() => formatPercent(percentComplete), [percentComplete])

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Course Seat Time</h2>
          <p className="mt-1 text-sm text-slate-600">
            Virginia requires 8 hours of approved instruction time before course completion.
          </p>
        </div>

        <div
          className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${
            isCompleted
              ? "bg-emerald-100 text-emerald-700"
              : isTabVisible
                ? "bg-blue-100 text-blue-700"
                : "bg-amber-100 text-amber-700"
          }`}
        >
          {isCompleted
            ? "Seat time complete"
            : isTabVisible
              ? "Tracking active"
              : "Paused while tab hidden"}
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
        {isCompleted ? (
          <>Required seat time is complete.</>
        ) : isTabVisible ? (
          <>
            Time is being tracked right now. The display updates live, and progress syncs automatically every 30 seconds.
          </>
        ) : (
          <>Time pauses when this tab is not visible. Return to this lesson tab to continue earning seat time.</>
        )}
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-slate-700">Progress</span>
          <span className="font-semibold text-slate-900">{formatPercent(percentComplete)}</span>
        </div>

        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              isCompleted ? "bg-emerald-500" : "bg-blue-600"
            }`}
            style={{ width: progressWidth }}
          />
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Approved time
          </div>
          <div className="mt-1 text-xl font-bold text-slate-900">
            {formatSeatTime(totalSeconds)}
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Remaining time
          </div>
          <div className="mt-1 text-xl font-bold text-slate-900">
            {isCompleted ? "0s" : formatSeatTime(remainingSeconds)}
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Current status
          </div>
          <div className="mt-1 text-base font-semibold text-slate-900">
            {isCompleted
              ? "Eligible for final exam"
              : isTabVisible
                ? "Actively earning time"
                : "Tab not visible"}
          </div>
        </div>
      </div>

      {loading && (
        <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
          Loading seat-time progress...
        </div>
      )}

      {!loading && showExamLockMessage && !isCompleted && (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          The final exam stays locked until the full required seat time has been completed.
        </div>
      )}

      {!loading && isCompleted && finalExamHref && (
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Your required seat time is complete. You can now take the final exam.{" "}
          <Link href={finalExamHref} className="font-semibold underline">
            Go to final exam
          </Link>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
        <span className="rounded-full bg-slate-100 px-2.5 py-1">
          Lesson: {lessonNumber ?? "Course overview"}
        </span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1">
          State: {stateCode.toUpperCase()}
        </span>
        <span className="rounded-full bg-slate-100 px-2.5 py-1">
          Course: {courseSlug}
        </span>
      </div>
    </div>
  )
}