// lib/exam-results.ts

import { createClient } from "@/lib/supabase/client"

export type ExamResultRow = {
  id: string
  user_id: string
  state: string
  course_slug: string
  score: number
  passed: boolean
  answers: number[]
  completed_at: string
  created_at: string
  certificate_id?: string | null
}

function normalizeState(state: string) {
  return String(state ?? "").trim().toLowerCase()
}

async function getAuthenticatedUserId() {
  const supabase = createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    throw error
  }

  if (!user) {
    throw new Error("User not authenticated")
  }

  return user.id
}

export async function saveExamResult({
  state,
  courseSlug = "driver-improvement",
  score,
  passed,
  answers,
}: {
  state: string
  courseSlug?: string
  score: number
  passed: boolean
  answers: number[]
}) {
  const supabase = createClient()
  const userId = await getAuthenticatedUserId()
  const normalizedState = normalizeState(state)
  const completedAt = new Date().toISOString()

  const { data, error } = await supabase
    .from("exam_results")
    .insert({
      user_id: userId,
      state: normalizedState,
      course_slug: courseSlug,
      score,
      passed,
      answers,
      completed_at: completedAt,
    })
    .select(
      "id, user_id, state, course_slug, score, passed, answers, completed_at, created_at, certificate_id"
    )
    .single()

  if (error) {
    throw error
  }

  return data as ExamResultRow
}

export async function getLatestExamResult(state: string) {
  return getLatestExamResultForCourse(state)
}

export async function getLatestExamResultForCourse(
  state: string,
  courseSlug = "driver-improvement"
) {
  const supabase = createClient()
  const normalizedState = normalizeState(state)

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    throw error
  }

  if (!user) {
    return null
  }

  const { data, error: fetchError } = await supabase
    .from("exam_results")
    .select(
      "id, user_id, state, course_slug, score, passed, answers, completed_at, created_at, certificate_id"
    )
    .eq("user_id", user.id)
    .eq("state", normalizedState)
    .eq("course_slug", courseSlug)
    .order("completed_at", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle()

  if (fetchError) {
    throw fetchError
  }

  return data as ExamResultRow | null
}

export async function getExamAttemptsForDate(
  state: string,
  dateKey: string,
  courseSlug = "driver-improvement"
) {
  const supabase = createClient()
  const normalizedState = normalizeState(state)

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    throw error
  }

  if (!user) {
    return []
  }

  const start = `${dateKey}T00:00:00.000Z`
  const end = `${dateKey}T23:59:59.999Z`

  const { data, error: fetchError } = await supabase
    .from("exam_results")
    .select(
      "id, user_id, state, course_slug, score, passed, answers, completed_at, created_at, certificate_id"
    )
    .eq("user_id", user.id)
    .eq("state", normalizedState)
    .eq("course_slug", courseSlug)
    .gte("completed_at", start)
    .lte("completed_at", end)
    .order("completed_at", { ascending: false })
    .order("created_at", { ascending: false })

  if (fetchError) {
    throw fetchError
  }

  return (data ?? []) as ExamResultRow[]
}

export async function hasExamAttemptOnDate(
  state: string,
  dateKey: string,
  courseSlug = "driver-improvement"
) {
  const attempts = await getExamAttemptsForDate(state, dateKey, courseSlug)
  return attempts.length > 0
}
