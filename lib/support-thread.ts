export type SupportMessageRow = {
  id: string
  request_id: string
  sender_role: "admin" | "student"
  message: string
  created_at: string
}

export type SupportRequestWithThread = {
  id: string
  user_id: string | null
  state_code: string
  category: string
  subject: string
  message: string
  ai_summary: string | null
  ai_suggested_steps: string[] | null
  escalation_recommended: boolean
  escalation_reason: string | null
  priority_requested: boolean
  status: string
  created_at: string
  messages: SupportMessageRow[]
}

export function attachSupportMessages<
  T extends {
    id: string
  }
>(
  requests: T[],
  messages: SupportMessageRow[]
): Array<T & { messages: SupportMessageRow[] }> {
  const byRequestId = new Map<string, SupportMessageRow[]>()

  for (const message of messages) {
    const current = byRequestId.get(message.request_id) ?? []
    current.push(message)
    byRequestId.set(message.request_id, current)
  }

  return requests.map((request) => ({
    ...request,
    messages: (byRequestId.get(request.id) ?? []).sort((a, b) =>
      a.created_at.localeCompare(b.created_at)
    ),
  }))
}
