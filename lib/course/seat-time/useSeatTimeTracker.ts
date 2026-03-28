"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { createClient } from "@/lib/supabase/client"

type CourseAttempt = {
  id: string
  user_id: string
  state_code: string
  course_slug: string
  status: "in_progress" | "completed" | "expired"
  required_seconds: number
  total_seconds: number
  started_at: string
  completed_at: string | null
  last_activity_at: string | null
  current_lesson: number | null
  current_path: string | null
  created_at: string
  updated_at: string
}

type UseSeatTimeTrackerParams = {
  stateCode: string
  courseSlug?: string
  lessonNumber?: number | null
  pagePath: string
  requiredSeconds?: number
  heartbeatSeconds?: number
  enabled?: boolean
}

type UseSeatTimeTrackerReturn = {
  loading: boolean
  totalSeconds: number
  requiredSeconds: number
  remainingSeconds: number
  percentComplete: number
  isCompleted: boolean
  isTabVisible: boolean
}

const DEFAULT_COURSE_SLUG = "driver-improvement"
const DEFAULT_REQUIRED_SECONDS = 28800
const DEFAULT_HEARTBEAT_SECONDS = 30

export function useSeatTimeTracker({
  stateCode,
  courseSlug = DEFAULT_COURSE_SLUG,
  lessonNumber = null,
  pagePath,
  requiredSeconds = DEFAULT_REQUIRED_SECONDS,
  heartbeatSeconds = DEFAULT_HEARTBEAT_SECONDS,
  enabled = true,
}: UseSeatTimeTrackerParams): UseSeatTimeTrackerReturn {
  const supabase = useMemo(() => createClient(), [])

  const [loading, setLoading] = useState(true)
  const [attempt, setAttempt] = useState<CourseAttempt | null>(null)
  const [isTabVisible, setIsTabVisible] = useState(true)
  const [displaySeconds, setDisplaySeconds] = useState(0)

  const mountedRef = useRef(true)
  const heartbeatIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const displayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const initializingRef = useRef(false)
  const lastHeartbeatAtRef = useRef<number>(Date.now())
  const attemptRef = useRef<CourseAttempt | null>(null)
  const displaySecondsRef = useRef(0)
  const isFlushingRef = useRef(false)

  useEffect(() => {
    attemptRef.current = attempt
  }, [attempt])

  useEffect(() => {
    displaySecondsRef.current = displaySeconds
  }, [displaySeconds])

  const clearIntervals = useCallback(() => {
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current)
      heartbeatIntervalRef.current = null
    }

    if (displayIntervalRef.current) {
      clearInterval(displayIntervalRef.current)
      displayIntervalRef.current = null
    }
  }, [])

  const refreshAttempt = useCallback(async () => {
    if (!enabled) {
      if (mountedRef.current) {
        setLoading(false)
      }
      return
    }

    try {
      const { data, error } = await supabase.rpc("get_or_create_course_attempt", {
        p_state_code: stateCode,
        p_course_slug: courseSlug,
        p_required_seconds: requiredSeconds,
      })

      if (error) {
        throw error
      }

      if (mountedRef.current && data) {
        const nextAttempt = data as CourseAttempt
        setAttempt(nextAttempt)
        setDisplaySeconds(nextAttempt.total_seconds ?? 0)
        setIsTabVisible(!document.hidden)
        lastHeartbeatAtRef.current = Date.now()
      }
    } catch (error) {
      console.error("refreshAttempt error", error)
    } finally {
      if (mountedRef.current) {
        setLoading(false)
      }
    }
  }, [courseSlug, enabled, requiredSeconds, stateCode, supabase])

  const recordEvent = useCallback(
    async (
      eventType:
        | "session_started"
        | "tab_hidden"
        | "tab_visible"
        | "lesson_changed"
        | "session_paused"
        | "session_resumed"
        | "session_ended",
      metadata: Record<string, unknown> = {}
    ) => {
      if (!enabled || !attemptRef.current?.id) return

      try {
        const { error } = await supabase.rpc("record_seat_time_event", {
          p_attempt_id: attemptRef.current.id,
          p_state_code: stateCode,
          p_course_slug: courseSlug,
          p_event_type: eventType,
          p_lesson_number: lessonNumber,
          p_page_path: pagePath,
          p_tab_hidden: document.hidden,
          p_visibility_state: document.visibilityState,
          p_client_timestamp: new Date().toISOString(),
          p_metadata: metadata,
        })

        if (error) {
          throw error
        }
      } catch (error) {
        console.error(`recordEvent(${eventType}) error`, error)
      }
    },
    [courseSlug, enabled, lessonNumber, pagePath, stateCode, supabase]
  )

  const flushPendingTime = useCallback(async () => {
    const currentAttempt = attemptRef.current

    if (!enabled || !currentAttempt?.id) return
    if (currentAttempt.status === "completed") return
    if (document.hidden) return
    if (isFlushingRef.current) return

    const pendingSeconds = Math.max(
      0,
      Math.floor(displaySecondsRef.current - (currentAttempt.total_seconds ?? 0))
    )

    if (pendingSeconds <= 0) return

    isFlushingRef.current = true

    try {
      const { data, error } = await supabase.rpc("record_seat_time_heartbeat", {
        p_attempt_id: currentAttempt.id,
        p_state_code: stateCode,
        p_course_slug: courseSlug,
        p_approved_seconds: Math.min(pendingSeconds, heartbeatSeconds),
        p_lesson_number: lessonNumber,
        p_page_path: pagePath,
        p_tab_hidden: document.hidden,
        p_visibility_state: document.visibilityState,
        p_client_timestamp: new Date().toISOString(),
        p_metadata: {
          source: "useSeatTimeTracker_flush",
          heartbeat_seconds: heartbeatSeconds,
          pending_seconds_before_flush: pendingSeconds,
        },
      })

      if (error) {
        throw error
      }

      if (data) {
        const nextAttempt = data as CourseAttempt
        attemptRef.current = nextAttempt

        if (mountedRef.current) {
          setAttempt(nextAttempt)
          setDisplaySeconds(Math.max(displaySecondsRef.current, nextAttempt.total_seconds ?? 0))
        }
      }

      lastHeartbeatAtRef.current = Date.now()
    } catch (error) {
      console.error("flushPendingTime error", error)
    } finally {
      isFlushingRef.current = false
    }
  }, [
    courseSlug,
    enabled,
    heartbeatSeconds,
    lessonNumber,
    pagePath,
    stateCode,
    supabase,
  ])

  const sendHeartbeat = useCallback(async () => {
    const currentAttempt = attemptRef.current

    if (!enabled || !currentAttempt?.id) return
    if (document.hidden) return
    if (currentAttempt.status === "completed") return

    const now = Date.now()
    const elapsedSeconds = Math.floor((now - lastHeartbeatAtRef.current) / 1000)
    const pendingSeconds = Math.max(
      0,
      Math.floor(displaySecondsRef.current - (currentAttempt.total_seconds ?? 0))
    )

    const approvedSeconds = Math.max(
      0,
      Math.min(Math.max(elapsedSeconds, pendingSeconds), heartbeatSeconds)
    )

    if (approvedSeconds <= 0) return

    lastHeartbeatAtRef.current = now

    try {
      const { data, error } = await supabase.rpc("record_seat_time_heartbeat", {
        p_attempt_id: currentAttempt.id,
        p_state_code: stateCode,
        p_course_slug: courseSlug,
        p_approved_seconds: approvedSeconds,
        p_lesson_number: lessonNumber,
        p_page_path: pagePath,
        p_tab_hidden: document.hidden,
        p_visibility_state: document.visibilityState,
        p_client_timestamp: new Date().toISOString(),
        p_metadata: {
          source: "useSeatTimeTracker",
          heartbeat_seconds: heartbeatSeconds,
          elapsed_seconds: elapsedSeconds,
          pending_seconds: pendingSeconds,
        },
      })

      if (error) {
        throw error
      }

      if (mountedRef.current && data) {
        const nextAttempt = data as CourseAttempt
        setAttempt(nextAttempt)
        setDisplaySeconds(Math.max(displaySecondsRef.current, nextAttempt.total_seconds ?? 0))
      } else if (data) {
        attemptRef.current = data as CourseAttempt
      }
    } catch (error) {
      console.error("sendHeartbeat error", error)
    }
  }, [
    courseSlug,
    enabled,
    heartbeatSeconds,
    lessonNumber,
    pagePath,
    stateCode,
    supabase,
  ])

  useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false
      clearIntervals()
    }
  }, [clearIntervals])

  useEffect(() => {
    if (!enabled) {
      setLoading(false)
      return
    }

    if (initializingRef.current) return
    initializingRef.current = true

    void refreshAttempt().finally(() => {
      initializingRef.current = false
    })
  }, [enabled, refreshAttempt])

  useEffect(() => {
    if (!enabled || !attempt?.id) return

    void recordEvent("lesson_changed", {
      lesson_number: lessonNumber,
      page_path: pagePath,
    })
  }, [attempt?.id, enabled, lessonNumber, pagePath, recordEvent])

  useEffect(() => {
    if (!enabled || !attempt?.id) return

    const handleVisibilityChange = () => {
      const visible = !document.hidden
      setIsTabVisible(visible)

      if (visible) {
        lastHeartbeatAtRef.current = Date.now()
        void recordEvent("tab_visible", { reason: "visibilitychange" })
      } else {
        void flushPendingTime()
        void recordEvent("tab_hidden", { reason: "visibilitychange" })
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [attempt?.id, enabled, flushPendingTime, recordEvent])

  useEffect(() => {
    if (!enabled || !attempt?.id || attempt.status === "completed") return

    displayIntervalRef.current = setInterval(() => {
      if (!document.hidden) {
        setDisplaySeconds((prev) => prev + 1)
      }
    }, 1000)

    return () => {
      if (displayIntervalRef.current) {
        clearInterval(displayIntervalRef.current)
        displayIntervalRef.current = null
      }
    }
  }, [attempt?.id, attempt?.status, enabled])

  useEffect(() => {
    if (!enabled || !attempt?.id || attempt.status === "completed") return

    lastHeartbeatAtRef.current = Date.now()

    heartbeatIntervalRef.current = setInterval(() => {
      void sendHeartbeat()
    }, heartbeatSeconds * 1000)

    return () => {
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current)
        heartbeatIntervalRef.current = null
      }
    }
  }, [attempt?.id, attempt?.status, enabled, heartbeatSeconds, sendHeartbeat])

  useEffect(() => {
    if (!enabled || !attempt?.id) return

    const handlePageHide = () => {
      void flushPendingTime()
      void recordEvent("session_ended", { reason: "pagehide" })
    }

    const handleBeforeUnload = () => {
      void flushPendingTime()
      void recordEvent("session_ended", { reason: "beforeunload" })
    }

    window.addEventListener("pagehide", handlePageHide)
    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("pagehide", handlePageHide)
      window.removeEventListener("beforeunload", handleBeforeUnload)
      void flushPendingTime()
    }
  }, [attempt?.id, enabled, flushPendingTime, recordEvent])

  const totalSeconds = displaySeconds
  const effectiveRequiredSeconds = attempt?.required_seconds ?? requiredSeconds
  const remainingSeconds = Math.max(0, effectiveRequiredSeconds - totalSeconds)
  const percentComplete = Math.min(
    100,
    Math.max(0, Math.round((totalSeconds / Math.max(1, effectiveRequiredSeconds)) * 100))
  )
  const isCompleted =
    attempt?.status === "completed" || totalSeconds >= effectiveRequiredSeconds

  return {
    loading,
    totalSeconds,
    requiredSeconds: effectiveRequiredSeconds,
    remainingSeconds,
    percentComplete,
    isCompleted,
    isTabVisible,
  }
}