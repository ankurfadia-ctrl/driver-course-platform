import { NextRequest, NextResponse } from "next/server"
import { Webhook } from "svix"
import { createAdminSupportReply } from "@/lib/support-admin-replies"
import {
  extractEmailAddress,
  getSupportRequestIdFromAddresses,
  trimInboundReplyText,
} from "@/lib/support-email-routing"
import { getAdminEmails } from "@/lib/admin-access"

type ResendReceivedEvent = {
  type?: string
  data?: {
    email_id?: string
    message_id?: string
    subject?: string
    from?: string
    to?: string[]
  }
}

type ReceivedEmailResponse = {
  id: string
  to: string[]
  from: string
  subject: string | null
  html: string | null
  text: string | null
  message_id: string | null
}

function verifyWebhookSignature(body: string, request: NextRequest) {
  const secret = String(process.env.RESEND_WEBHOOK_SECRET ?? "").trim()

  if (!secret) {
    throw new Error("Missing RESEND_WEBHOOK_SECRET.")
  }

  const webhook = new Webhook(secret)

  webhook.verify(body, {
    "svix-id": request.headers.get("svix-id") ?? "",
    "svix-timestamp": request.headers.get("svix-timestamp") ?? "",
    "svix-signature": request.headers.get("svix-signature") ?? "",
  })
}

async function getReceivedEmail(emailId: string) {
  const apiKey = String(process.env.RESEND_API_KEY ?? "").trim()

  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY.")
  }

  const response = await fetch(`https://api.resend.com/emails/receiving/${emailId}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    const raw = await response.text()
    throw new Error(`Resend receiving fetch failed (${response.status}): ${raw}`)
  }

  return (await response.json()) as ReceivedEmailResponse
}

function htmlToPlainText(value: string) {
  return String(value ?? "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim()
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    verifyWebhookSignature(rawBody, request)

    const event = JSON.parse(rawBody) as ResendReceivedEvent

    if (event.type !== "email.received" || !event.data?.email_id) {
      return NextResponse.json({ ok: true, ignored: true })
    }

    const senderEmail = extractEmailAddress(event.data.from ?? "")
    const adminEmails = getAdminEmails().map((email) => email.toLowerCase())

    if (!adminEmails.includes(senderEmail)) {
      return NextResponse.json({ ok: true, ignored: true, reason: "sender_not_admin" })
    }

    const requestId = getSupportRequestIdFromAddresses(event.data.to ?? [])

    if (!requestId) {
      return NextResponse.json({ ok: true, ignored: true, reason: "request_not_found" })
    }

    const email = await getReceivedEmail(event.data.email_id)
    const replyText = trimInboundReplyText(email.text || htmlToPlainText(email.html || ""))

    if (replyText.length < 2) {
      return NextResponse.json({ ok: true, ignored: true, reason: "empty_reply" })
    }

    const result = await createAdminSupportReply({
      requestId,
      message: replyText,
      senderUserId: null,
    })

    return NextResponse.json({
      ok: true,
      requestId,
      messageId: result.message.id,
    })
  } catch (error) {
    console.error("Support email reply webhook failed:", error)
    return NextResponse.json(
      { ok: false, error: "Support email reply webhook failed." },
      { status: 500 }
    )
  }
}

