import { createClient } from "@/lib/supabase/client"

export type CourseAttemptRow = {
  id: string
  user_id: string
  state_code: string
  course_slug: string
  status: "in_progress" | "completed" | "expired"
  required_seconds: number
  total_seconds: number
  started_at: string | null
  completed_at: string | null
  last_activity_at: string | null
  current_lesson: number | null
  current_path: string | null
  created_at: string
  updated_at: string
}

function normalizeState(state: string) {
  return String(state ?? "").trim().toLowerCase()
}

export async function getLatestCourseAttempt(
  state: string,
  courseSlug = "driver-improvement"
) {
  const supabase = createClient()
  const normalizedState = normalizeState(state)

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    throw userError
  }

  if (!user) {
    return null
  }

  const { data, error } = await supabase
    .from("course_attempts")
    .select(
      "id, user_id, state_code, course_slug, status, required_seconds, total_seconds, started_at, completed_at, last_activity_at, current_lesson, current_path, created_at, updated_at"
    )
    .eq("user_id", user.id)
    .eq("state_code", normalizedState)
    .eq("course_slug", courseSlug)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data as CourseAttemptRow | null
}
