import type { SupportMessageRow, SupportRequestWithThread } from "@/lib/support-thread"

type SupportThreadResponse =
  | { ok: true; requests: SupportRequestWithThread[] }
  | { ok: false; error: string }

type SupportReplyResponse =
  | { ok: true; message: SupportMessageRow }
  | { ok: false; error: string }

export async function loadStudentSupportThreads(state: string) {
  const response = await fetch(`/api/support/thread?state=${encodeURIComponent(state)}`)
  const data = (await response.json()) as SupportThreadResponse

  if (!response.ok || !data.ok) {
    throw new Error("error" in data ? data.error : "Could not load support requests.")
  }

  return data.requests
}

export async function sendStudentSupportReply(requestId: string, message: string) {
  const response = await fetch("/api/support/thread", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ requestId, message }),
  })

  const data = (await response.json()) as SupportReplyResponse

  if (!response.ok || !data.ok) {
    throw new Error("error" in data ? data.error : "Could not send support reply.")
  }

  return data.message
}
