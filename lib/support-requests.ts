import type { SupportAssistantResponse, SupportCategory } from "@/lib/support-assistant"

export type CreateSupportRequestInput = {
  stateCode: string
  category: SupportCategory
  subject: string
  message: string
  aiResponse: SupportAssistantResponse | null
  priorityRequested: boolean
}

export async function createSupportRequest(input: CreateSupportRequestInput) {
  const response = await fetch("/api/support", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })

  const data = (await response.json()) as { ok?: boolean; error?: string; id?: string }

  if (!response.ok || !data.ok) {
    console.error("Error creating support request:", data.error)
    throw new Error("Could not save support request.")
  }

  return data
}
