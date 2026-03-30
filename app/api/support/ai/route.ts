import { NextRequest, NextResponse } from "next/server"
import {
  getSupportAssistantResponse,
  inferSupportCategoryFromText,
} from "@/lib/support-assistant"
import { normalizeSiteLanguage, type SiteLanguage } from "@/lib/site-language"
import { searchSupportFaqEntries } from "@/lib/support-faq"

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

function buildSuggestedSteps(args: {
  baseSteps: string[]
  relatedQuestions: string[]
}) {
  const steps = [...args.baseSteps]

  for (const question of args.relatedQuestions) {
    if (steps.length >= 4) {
      break
    }

    steps.push(`Related help topic: ${question}`)
  }

  return Array.from(new Set(steps)).slice(0, 4)
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

    const recentStudentMessages = messages
      .filter((message) => message.role === "student" && typeof message.text === "string")
      .slice(-3)
      .map((message) => String(message.text ?? "").trim())
      .filter(Boolean)

    const searchText = recentStudentMessages.join(" ")
    const relatedEntries = searchSupportFaqEntries(searchText, language, 3)
    const category = inferSupportCategoryFromText(searchText)
    const assistantResponse = getSupportAssistantResponse({
      state,
      category,
      subject: latestStudentMessage,
      message: searchText,
      language,
    })

    const exactTopAnswer = relatedEntries[0]?.answer?.trim()
    const summary =
      exactTopAnswer && exactTopAnswer.length >= assistantResponse.summary.length * 0.6
        ? exactTopAnswer
        : assistantResponse.summary

    const suggestedSteps = buildSuggestedSteps({
      baseSteps: assistantResponse.suggestedSteps,
      relatedQuestions: relatedEntries
        .map((entry) => entry.question)
        .filter((question) => question && question !== latestStudentMessage),
    })

    return NextResponse.json({
      ok: true,
      response: {
        summary,
        suggestedSteps,
        escalationRecommended: assistantResponse.escalationRecommended,
        escalationReason: assistantResponse.escalationReason,
      },
      provider: "knowledge-base",
    })
  } catch (error) {
    console.error("Support knowledge-base route failed:", error)

    return NextResponse.json(
      { ok: false, error: "Could not generate support response." },
      { status: 500 }
    )
  }
}
