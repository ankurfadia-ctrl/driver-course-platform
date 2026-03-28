import { createClient } from "@/lib/supabase/client"
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
  const supabase = createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError) {
    console.error("Error loading authenticated user for support request:", authError)
  }

  const payload = {
    user_id: user?.id ?? null,
    state_code: input.stateCode,
    category: input.category,
    subject: input.subject,
    message: input.message,

    ai_summary: input.aiResponse?.summary ?? null,
    ai_suggested_steps: input.aiResponse?.suggestedSteps ?? [],
    escalation_recommended: input.aiResponse?.escalationRecommended ?? false,
    escalation_reason: input.aiResponse?.escalationReason ?? null,

    priority_requested: input.priorityRequested ?? false,

    status: "open",
  }

  const { data, error } = await supabase
    .from("support_requests")
    .insert(payload)
    .select("id")
    .single()

  if (error) {
    console.error("Error creating support request:", error)
    throw new Error("Could not save support request.")
  }

  return data
}