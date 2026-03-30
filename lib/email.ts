type TransactionalEmailPayload = {
  to: string
  subject: string
  html: string
  text: string
  replyTo?: string
  headers?: Record<string, string>
  attachments?: Array<{
    filename: string
    content: string
  }>
}

type PurchaseEmailInput = {
  email: string
  stateName: string
  courseName: string
  dashboardUrl: string
  courseUrl: string
  supportUrl: string
  planName: string
  supportTier: string
}

type CompletionEmailInput = {
  email: string
  stateName: string
  courseName: string
  certificateId: string
  certificateUrl: string
  verifyUrl: string
  providerEmail: string
  certificateFilename?: string
  certificatePdfBase64?: string
}

type SupportReplyEmailInput = {
  email: string
  stateName: string
  subject: string
  supportUrl: string
  replyMessage: string
}

type AdminSupportNotificationEmailInput = {
  email: string
  stateName: string
  subject: string
  studentEmail: string
  supportUrl: string
  message: string
  priorityRequested: boolean
  replyTo?: string
}

type StandardSupportDigestItem = {
  stateName: string
  subject: string
  studentEmail: string
  createdAt: string
  supportUrl: string
}

type StandardSupportDigestEmailInput = {
  email: string
  requests: StandardSupportDigestItem[]
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function getEmailConfig() {
  return {
    provider: String(process.env.EMAIL_PROVIDER ?? "log").trim().toLowerCase(),
    from: String(process.env.EMAIL_FROM ?? "").trim(),
    resendApiKey: String(process.env.RESEND_API_KEY ?? "").trim(),
  }
}

async function sendWithResend(payload: TransactionalEmailPayload) {
  const config = getEmailConfig()

  if (!config.from || !config.resendApiKey) {
    throw new Error("Missing EMAIL_FROM or RESEND_API_KEY for Resend.")
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: [payload.to],
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
      reply_to: payload.replyTo ? [payload.replyTo] : undefined,
      headers: payload.headers,
      attachments: payload.attachments,
    }),
  })

  if (!response.ok) {
    const raw = await response.text()
    throw new Error(`Resend send failed (${response.status}): ${raw}`)
  }
}

async function sendWithLog(payload: TransactionalEmailPayload) {
  console.info("Transactional email skipped or logged.", {
    provider: getEmailConfig().provider,
    to: payload.to,
    subject: payload.subject,
  })
}

export async function sendTransactionalEmail(payload: TransactionalEmailPayload) {
  const config = getEmailConfig()

  if (!payload.to) {
    return
  }

  if (config.provider === "resend") {
    await sendWithResend(payload)
    return
  }

  await sendWithLog(payload)
}

export async function sendPurchaseConfirmationEmail(input: PurchaseEmailInput) {
  const subject = `${input.courseName} purchase confirmed`
  const html = `
    <div style="font-family:Segoe UI,Arial,sans-serif;line-height:1.6;color:#0f172a">
      <h1 style="font-size:24px;margin-bottom:12px;">Purchase confirmed</h1>
      <p>Your ${escapeHtml(input.stateName)} purchase is complete for <strong>${escapeHtml(
    input.courseName
  )}</strong>.</p>
      <p>Plan: <strong>${escapeHtml(input.planName)}</strong><br />Support tier: <strong>${escapeHtml(
    input.supportTier
  )}</strong></p>
      <p>You can start the course now or return to your dashboard at any time.</p>
      <p>
        <a href="${input.courseUrl}">Start course</a><br />
        <a href="${input.dashboardUrl}">Open dashboard</a><br />
        <a href="${input.supportUrl}">Contact support</a>
      </p>
    </div>
  `.trim()
  const text = [
    "Purchase confirmed",
    "",
    `Your ${input.stateName} purchase is complete for ${input.courseName}.`,
    `Plan: ${input.planName}`,
    `Support tier: ${input.supportTier}`,
    `Start course: ${input.courseUrl}`,
    `Dashboard: ${input.dashboardUrl}`,
    `Support: ${input.supportUrl}`,
  ].join("\n")

  await sendTransactionalEmail({
    to: input.email,
    subject,
    html,
    text,
  })
}

export async function sendCompletionCertificateEmail(input: CompletionEmailInput) {
  const subject = "Eight-Hour Online Driver Improvement Clinic Course"
  const html = `
    <div style="font-family:Segoe UI,Arial,sans-serif;line-height:1.6;color:#0f172a">
      <h1 style="font-size:24px;margin-bottom:12px;">Eight-Hour Online Driver Improvement Clinic Course</h1>
      <p>Your electronic certificate of completion is attached which indicates that you successfully completed an Eight-Hour Online Driver Improvement Clinic Course. Your completion of the online driver improvement clinic will be posted to your driving record within 24 hours of the completion date of the course.</p>
      <p>
        Provider email: <strong>${escapeHtml(input.providerEmail)}</strong><br />
        Student email: <strong>${escapeHtml(input.email)}</strong>
      </p>
      <p>Certificate ID: <strong>${escapeHtml(input.certificateId)}</strong></p>
      <p>
        <a href="${input.certificateUrl}">Open certificate</a><br />
        <a href="${input.verifyUrl}">Verification page</a>
      </p>
    </div>
  `.trim()
  const text = [
    "Eight-Hour Online Driver Improvement Clinic Course",
    "",
    "Your electronic certificate of completion is attached which indicates that you successfully completed an Eight-Hour Online Driver Improvement Clinic Course. Your completion of the online driver improvement clinic will be posted to your driving record within 24 hours of the completion date of the course.",
    "",
    `Provider email: ${input.providerEmail}`,
    `Student email: ${input.email}`,
    "",
    `Certificate ID: ${input.certificateId}`,
    `Certificate: ${input.certificateUrl}`,
    `Verification: ${input.verifyUrl}`,
  ].join("\n")

  await sendTransactionalEmail({
    to: input.email,
    subject,
    html,
    text,
    attachments:
      input.certificateFilename && input.certificatePdfBase64
        ? [
            {
              filename: input.certificateFilename,
              content: input.certificatePdfBase64,
            },
          ]
        : undefined,
  })
}

export async function sendSupportReplyNotificationEmail(
  input: SupportReplyEmailInput
) {
  const subject = `New support reply: ${input.subject}`
  const html = `
    <div style="font-family:Segoe UI,Arial,sans-serif;line-height:1.6;color:#0f172a">
      <h1 style="font-size:24px;margin-bottom:12px;">New support reply</h1>
      <p>You have a new support reply for your ${escapeHtml(input.stateName)} course account.</p>
      <div style="margin:16px 0;padding:16px;border:1px solid #cbd5e1;border-radius:12px;background:#f8fafc;">
        ${escapeHtml(input.replyMessage).replace(/\n/g, "<br />")}
      </div>
      <p><a href="${input.supportUrl}">Open support</a></p>
    </div>
  `.trim()
  const text = [
    "New support reply",
    "",
    `You have a new support reply for your ${input.stateName} course account.`,
    "",
    input.replyMessage,
    "",
    `Open support: ${input.supportUrl}`,
  ].join("\n")

  await sendTransactionalEmail({
    to: input.email,
    subject,
    html,
    text,
  })
}

export async function sendAdminPrioritySupportNotificationEmail(
  input: AdminSupportNotificationEmailInput
) {
  const subject = `Priority support request: ${input.subject}`
  const html = `
    <div style="font-family:Segoe UI,Arial,sans-serif;line-height:1.6;color:#0f172a">
      <h1 style="font-size:24px;margin-bottom:12px;">Priority support request</h1>
      <p>A new priority support request was submitted for the <strong>${escapeHtml(
        input.stateName
      )}</strong> course.</p>
      <p>
        Student email: <strong>${escapeHtml(input.studentEmail)}</strong><br />
        Priority requested: <strong>${input.priorityRequested ? "Yes" : "No"}</strong>
      </p>
      <div style="margin:16px 0;padding:16px;border:1px solid #cbd5e1;border-radius:12px;background:#f8fafc;">
        ${escapeHtml(input.message).replace(/\n/g, "<br />")}
      </div>
      ${
        input.replyTo
          ? `<p>Reply directly to this email to send a response back into the student support thread.</p>`
          : ""
      }
      <p><a href="${input.supportUrl}">Open admin support inbox</a></p>
    </div>
  `.trim()
  const text = [
    "Priority support request",
    "",
    `A new priority support request was submitted for the ${input.stateName} course.`,
    `Student email: ${input.studentEmail}`,
    `Priority requested: ${input.priorityRequested ? "Yes" : "No"}`,
    "",
    input.message,
    "",
    ...(input.replyTo
      ? ["Reply directly to this email to send a response back into the student support thread.", ""]
      : []),
    `Open admin support inbox: ${input.supportUrl}`,
  ].join("\n")

  await sendTransactionalEmail({
    to: input.email,
    subject,
    html,
    text,
    replyTo: input.replyTo,
  })
}

export async function sendAdminStandardSupportDigestEmail(
  input: StandardSupportDigestEmailInput
) {
  if (input.requests.length === 0) {
    return
  }

  const subject = `Daily standard support summary (${input.requests.length})`
  const htmlItems = input.requests
    .map(
      (request) => `
        <li style="margin-bottom:12px;">
          <strong>${escapeHtml(request.stateName)}</strong><br />
          ${escapeHtml(request.subject)}<br />
          Student: ${escapeHtml(request.studentEmail)}<br />
          Created: ${escapeHtml(request.createdAt)}<br />
          <a href="${request.supportUrl}">Open admin support inbox</a>
        </li>
      `
    )
    .join("")

  const html = `
    <div style="font-family:Segoe UI,Arial,sans-serif;line-height:1.6;color:#0f172a">
      <h1 style="font-size:24px;margin-bottom:12px;">Daily standard support summary</h1>
      <p>You have ${input.requests.length} unresolved standard support request(s).</p>
      <ul style="padding-left:20px;">
        ${htmlItems}
      </ul>
    </div>
  `.trim()

  const text = [
    `Daily standard support summary (${input.requests.length})`,
    "",
    ...input.requests.flatMap((request) => [
      `${request.stateName}: ${request.subject}`,
      `Student: ${request.studentEmail}`,
      `Created: ${request.createdAt}`,
      `Open: ${request.supportUrl}`,
      "",
    ]),
  ].join("\n")

  await sendTransactionalEmail({
    to: input.email,
    subject,
    html,
    text,
  })
}
