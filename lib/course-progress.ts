import { createClient } from "@/lib/supabase/client";

export type CourseProgressRow = {
  id?: number;
  user_id?: string;
  state: string;
  course_slug: string;
  lesson_slug: string;
  completed: boolean;
  score: number | null;
  completed_at: string | null;
  created_at?: string;
  updated_at?: string;
};

const COURSE_SLUG = "driver-improvement-course";

export async function getUserCourseProgress(
  state: string,
  courseSlug = COURSE_SLUG
) {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) return [];

  const { data, error } = await supabase
    .from("course_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("state", state)
    .eq("course_slug", courseSlug)
    .order("lesson_slug", { ascending: true });

  if (error) throw error;

  return (data ?? []) as CourseProgressRow[];
}

export async function markLessonComplete(
  state: string,
  lessonSlug: string,
  courseSlug = COURSE_SLUG
) {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error("User not authenticated");

  const payload = {
    user_id: user.id,
    state,
    course_slug: courseSlug,
    lesson_slug: lessonSlug,
    completed: true,
    score: null,
    completed_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("course_progress")
    .upsert(payload, {
      onConflict: "user_id,state,course_slug,lesson_slug",
    })
    .select()
    .single();

  if (error) throw error;

  return data as CourseProgressRow;
}

export async function saveQuizScore(
  state: string,
  lessonSlug: string,
  score: number,
  courseSlug = COURSE_SLUG
) {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error("User not authenticated");

  const payload = {
    user_id: user.id,
    state,
    course_slug: courseSlug,
    lesson_slug: lessonSlug,
    completed: score >= 80,
    score,
    completed_at: score >= 80 ? new Date().toISOString() : null,
  };

  const { data, error } = await supabase
    .from("course_progress")
    .upsert(payload, {
      onConflict: "user_id,state,course_slug,lesson_slug",
    })
    .select()
    .single();

  if (error) throw error;

  return data as CourseProgressRow;
}

export function isLessonCompleted(
  progress: CourseProgressRow[],
  lessonSlug: string
) {
  return progress.some(
    (item) => item.lesson_slug === lessonSlug && item.completed
  );
}

export function getLessonScore(
  progress: CourseProgressRow[],
  lessonSlug: string
) {
  const row = progress.find((item) => item.lesson_slug === lessonSlug);
  return row?.score ?? null;
}

export function isLessonUnlocked(
  lessons: { slug: string }[],
  progress: CourseProgressRow[],
  lessonSlug: string
) {
  const lessonIndex = lessons.findIndex((lesson) => lesson.slug === lessonSlug);

  if (lessonIndex === -1) return false;
  if (lessonIndex === 0) return true;

  const previousLesson = lessons[lessonIndex - 1];
  return isLessonCompleted(progress, previousLesson.slug);
}
