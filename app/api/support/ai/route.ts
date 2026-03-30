import { NextRequest, NextResponse } from "next/server"
import { getCourseConfig } from "@/lib/course-config"
import type { SupportAssistantResponse } from "@/lib/support-assistant"
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
    const sanitized = text
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/, "")
      .trim()

    const parsed = JSON.parse(sanitized) as Partial<SupportAssistantResponse>

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

async function callOpenAi(args: {
  apiKey: string
  model: string
  prompt: string
}) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${args.apiKey}`,
    },
    body: JSON.stringify({
      model: args.model,
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: args.prompt,
            },
          ],
        },
      ],
    }),
  })

  return response
}

async function callOpenAiChatCompletions(args: {
  apiKey: string
  model: string
  prompt: string
}) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${args.apiKey}`,
    },
    body: JSON.stringify({
      model: args.model,
      messages: [
        {
          role: "user",
          content: args.prompt,
        },
      ],
      temperature: 0.2,
      response_format: {
        type: "json_object",
      },
    }),
  })

  return response
}

function extractChatCompletionText(data: unknown) {
  if (!data || typeof data !== "object") {
    return ""
  }

  const record = data as Record<string, unknown>
  const choices = Array.isArray(record.choices) ? record.choices : []
  const firstChoice =
    choices[0] && typeof choices[0] === "object"
      ? (choices[0] as Record<string, unknown>)
      : null
  const message =
    firstChoice?.message && typeof firstChoice.message === "object"
      ? (firstChoice.message as Record<string, unknown>)
      : null

  return typeof message?.content === "string" ? message.content.trim() : ""
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
    const configuredModel = String(process.env.SUPPORT_AI_MODEL ?? "gpt-4.1-mini").trim()

    if (!apiKey) {
      return NextResponse.json(
        {
          ok: false,
          error: "AI support is not configured right now. Please try again in a moment.",
        },
        { status: 503 }
      )
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
- "do i have to spend certain amount of time on each page" means there is no fixed minimum on each page, but the student still must complete the required total course time.

Important facts for this course:
- Final exam unlocks after at least 7 hours of course instruction.
- Full course minimum is 8 hours total, including the final exam.
- There is not a fixed required time on each individual page. Time is tracked across active participation in the course while course pages are open and the student is actively working through them.
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

    const modelCandidates = Array.from(
      new Set([configuredModel, "gpt-4.1-mini", "gpt-4o-mini"].filter(Boolean))
    )

    let text = ""
    let lastStatus = 502
    let lastError = "AI support is temporarily unavailable. Please try again in a moment."

    for (const model of modelCandidates) {
      const responsesApi = await callOpenAi({
        apiKey,
        model,
        prompt,
      })

      if (responsesApi.ok) {
        const data = (await responsesApi.json()) as unknown
        text = extractOutputText(data)
        if (parseAiResponse(text)) {
          lastError = ""
          break
        }
        console.error(`Support AI responses output was not parseable (${model}).`)
      } else {
        lastStatus = responsesApi.status
        const errorText = await responsesApi.text()
        console.error(`Support AI responses API failed (${model}):`, errorText)
      }

      const chatCompletionsApi = await callOpenAiChatCompletions({
        apiKey,
        model,
        prompt,
      })

      if (!chatCompletionsApi.ok) {
        lastStatus = chatCompletionsApi.status
        const errorText = await chatCompletionsApi.text()
        console.error(`Support AI chat completions failed (${model}):`, errorText)
        continue
      }

      const completionData = (await chatCompletionsApi.json()) as unknown
      text = extractChatCompletionText(completionData)

      if (parseAiResponse(text)) {
        lastError = ""
        break
      }

      console.error(`Support AI chat completion output was not parseable (${model}).`)
    }

    if (!text) {
      return NextResponse.json(
        {
          ok: false,
          error:
            lastStatus === 401 || lastStatus === 403
              ? "AI support is not authorized right now. Please verify the OpenAI API key in production settings."
              : lastError,
        },
        { status: 502 }
      )
    }

    const parsed = parseAiResponse(text)

    if (!parsed) {
      return NextResponse.json(
        {
          ok: false,
          error: "AI support could not finish that answer. Please try asking again.",
        },
        { status: 502 }
      )
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
