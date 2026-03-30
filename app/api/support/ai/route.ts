import { NextRequest, NextResponse } from "next/server"
import { getCourseConfig } from "@/lib/course-config"
import {
  getSupportAssistantResponse,
  type SupportAssistantResponse,
} from "@/lib/support-assistant"
import { getSupportFaqEntries } from "@/lib/support-faq"
import { normalizeSiteLanguage, type SiteLanguage } from "@/lib/site-language"

export const dynamic = "force-dynamic"

type SupportChatMessage = {
  role?: "student" | "assistant"
  text?: string
}

type SupportAiBody = {
  state?: string
  language?: SiteLanguage | string
  messages?: SupportChatMessage[]
}

function fallbackResponse(
  state: string,
  language: SiteLanguage,
  message: string
): SupportAssistantResponse {
  return getSupportAssistantResponse({
    state,
    category: "other",
    subject: message.slice(0, 80),
    message,
    language,
  })
}

function buildFaqContext(language: SiteLanguage) {
  return getSupportFaqEntries(language)
    .map((entry) => `Q: ${entry.question}\nA: ${entry.answer}`)
    .join("\n\n")
}

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

function parseAiResponse(text: string): SupportAssistantResponse | null {
  if (!text) {
    return null
  }

  try {
    const parsed = JSON.parse(text) as Partial<SupportAssistantResponse>

    if (typeof parsed.summary !== "string" || !parsed.summary.trim()) {
      return null
    }

    return {
      summary: parsed.summary.trim(),
      suggestedSteps: Array.isArray(parsed.suggestedSteps)
        ? parsed.suggestedSteps.filter((step): step is string => typeof step === "string")
        : [],
      escalationRecommended: Boolean(parsed.escalationRecommended),
      escalationReason:
        typeof parsed.escalationReason === "string" && parsed.escalationReason.trim()
          ? parsed.escalationReason.trim()
          : null,
    }
  } catch {
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SupportAiBody
    const state = String(body.state ?? "virginia").trim().toLowerCase()
    const language = normalizeSiteLanguage(body.language)
    const messages = Array.isArray(body.messages) ? body.messages : []
    const latestStudentMessage =
      [...messages]
        .reverse()
        .find((message) => message.role === "student" && typeof message.text === "string")
        ?.text?.trim() ?? ""

    if (!latestStudentMessage) {
      return NextResponse.json(
        { ok: false, error: "Missing support question." },
        { status: 400 }
      )
    }

    const apiKey = String(process.env.OPENAI_API_KEY ?? "").trim()
    const model = String(process.env.SUPPORT_AI_MODEL ?? "gpt-5-mini").trim()

    if (!apiKey) {
      return NextResponse.json({
        ok: true,
        response: fallbackResponse(state, language, latestStudentMessage),
        provider: "fallback",
      })
    }

    const config = getCourseConfig(state)
    const faqContext = buildFaqContext(language)
    const transcript = messages
      .slice(-8)
      .map((message) => `${message.role === "assistant" ? "Assistant" : "Student"}: ${String(message.text ?? "").trim()}`)
      .join("\n")

    const prompt = `
You are the student support assistant for ${config.courseName}.

Answer only with course-aware help for this website. Be direct, practical, and concise.
Prefer answering the question instead of escalating. Escalate only when the issue appears account-specific, payment-specific, or technically broken.
Treat short plain-language questions as valid. For example:
- "exam locked" means "why is my exam locked?"
- "money back" means "what is the refund policy?"
- "real person" means "can I talk to a real person and how does that work?"

Important facts for this course:
- Final exam unlocks after at least 7 hours of course instruction.
- Full course minimum is 8 hours total, including the final exam.
- Certificate stays locked until the student has both passed the final exam and completed the full 8 hours.
- Final exam passing score is ${config.passingScorePercent}%.
- Final exam can be taken only once per business day.
- Identity verification is required during the course and before the final exam.
- Standard support may take up to 3 business days for a first human response.
- Priority support is handled first and usually gets a first human response in less than 1 business day.

FAQ context:
${faqContext}

Recent chat:
${transcript}

Return JSON only with this shape:
{
  "summary": "direct answer to the student's latest question",
  "suggestedSteps": ["optional step 1", "optional step 2"],
  "escalationRecommended": false,
  "escalationReason": null
}
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
      const fallback = fallbackResponse(state, language, latestStudentMessage)
      return NextResponse.json({
        ok: true,
        response: fallback,
        provider: "fallback",
      })
    }

    const data = (await response.json()) as unknown
    const text = extractOutputText(data)
    const parsed = parseAiResponse(text)

    if (!parsed) {
      return NextResponse.json({
        ok: true,
        response: fallbackResponse(state, language, latestStudentMessage),
        provider: "fallback",
      })
    }

    return NextResponse.json({
      ok: true,
      response: parsed,
      provider: "openai",
    })
  } catch (error) {
    console.error("Support AI route failed:", error)

    return NextResponse.json(
      { ok: false, error: "Could not generate support response." },
      { status: 500 }
    )
  }
}
