import { NextRequest, NextResponse } from "next/server"
import {
  VIRGINIA_LESSON_CHECKS,
  VIRGINIA_LESSON_CONTENT,
  getVirginiaLessonBySlug,
} from "@/lib/virginia-course-curriculum"
import { VIRGINIA_FINAL_EXAM_QUESTION_BANK } from "@/lib/final-exam"

export const dynamic = "force-dynamic"

type CourseTranslationBody = {
  kind?: "lesson" | "exam"
  lessonSlug?: string
}

type CachedTranslation = Record<string, unknown> | unknown[]

const translationCache = new Map<string, CachedTranslation>()

function extractOutputText(data: unknown) {
  if (!data || typeof data !== "object") {
    return ""
  }

  const record = data as Record<string, unknown>

  if (typeof record.output_text === "string") {
    return record.output_text
  }

  const output = Array.isArray(record.output) ? record.output : []

  const chunks = output.flatMap((item) => {
    if (!item || typeof item !== "object") {
      return []
    }

    const content = Array.isArray((item as Record<string, unknown>).content)
      ? ((item as Record<string, unknown>).content as Array<Record<string, unknown>>)
      : []

    return content
      .map((part) => {
        if (typeof part?.text === "string") {
          return part.text
        }

        const nestedText = part?.text
        if (nestedText && typeof nestedText === "object" && "value" in nestedText) {
          return String((nestedText as Record<string, unknown>).value ?? "")
        }

        return ""
      })
      .filter(Boolean)
  })

  return chunks.join("\n").trim()
}

function buildLessonPayload(lessonSlug: string) {
  const lesson = getVirginiaLessonBySlug(lessonSlug)
  const content = VIRGINIA_LESSON_CONTENT[lessonSlug]
  const checks = VIRGINIA_LESSON_CHECKS[lessonSlug] ?? []

  if (!lesson || !content) {
    return null
  }

  return {
    title: lesson.title,
    intro: content.intro,
    sections: content.sections,
    takeaway: content.takeaway,
    checks,
  }
}

async function translateJson({
  cacheKey,
  payload,
  instruction,
}: {
  cacheKey: string
  payload: unknown
  instruction: string
}) {
  const cached = translationCache.get(cacheKey)

  if (cached) {
    return cached
  }

  const apiKey = String(process.env.OPENAI_API_KEY ?? "").trim()
  const model = String(process.env.SUPPORT_AI_MODEL ?? "gpt-5-mini").trim()

  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY for course translation.")
  }

  const prompt = `
Translate the following driving-course content from English into neutral, natural Spanish.

Rules:
- Preserve the JSON structure exactly.
- Do not summarize, shorten, or omit content.
- Preserve all ids, numeric values, array order, answer indexes, and field names.
- Translate all student-facing text into Spanish.
- Keep legal and instructional language clear and formal enough for a driver improvement course.
- Return JSON only.

${instruction}

JSON:
${JSON.stringify(payload)}
`.trim()

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  })

  if (!response.ok) {
    const raw = await response.text()
    throw new Error(`Course translation failed (${response.status}): ${raw}`)
  }

  const data = (await response.json()) as unknown
  const text = extractOutputText(data)
  const parsed = JSON.parse(text) as CachedTranslation
  translationCache.set(cacheKey, parsed)
  return parsed
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CourseTranslationBody
    const kind = body.kind

    if (kind === "lesson") {
      const lessonSlug = String(body.lessonSlug ?? "").trim()
      const payload = buildLessonPayload(lessonSlug)

      if (!payload) {
        return NextResponse.json(
          { ok: false, error: "Lesson not found." },
          { status: 404 }
        )
      }

      const translated = await translateJson({
        cacheKey: `lesson:${lessonSlug}`,
        payload,
        instruction:
          "This JSON contains a lesson title, lesson body content, and lesson knowledge-check questions. Preserve question ids and correctAnswer values exactly.",
      })

      return NextResponse.json({ ok: true, translation: translated })
    }

    if (kind === "exam") {
      const translated = await translateJson({
        cacheKey: "exam",
        payload: VIRGINIA_FINAL_EXAM_QUESTION_BANK,
        instruction:
          "This JSON contains the final exam question bank. Preserve id and correctIndex values exactly.",
      })

      return NextResponse.json({ ok: true, translation: translated })
    }

    return NextResponse.json(
      { ok: false, error: "Unsupported translation request." },
      { status: 400 }
    )
  } catch (error) {
    console.error("Course translation route failed:", error)

    return NextResponse.json(
      { ok: false, error: "Could not load Spanish course content." },
      { status: 500 }
    )
  }
}
