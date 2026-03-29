type TransactionalEmailPayload = {
  to: string
  subject: string
  html: string
  text: string
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
  certificateFilename?: string
  certificatePdfBase64?: string
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
  const subject = `${input.courseName} completion details`
  const html = `
    <div style="font-family:Segoe UI,Arial,sans-serif;line-height:1.6;color:#0f172a">
      <h1 style="font-size:24px;margin-bottom:12px;">Course completion recorded</h1>
      <p>You have completed <strong>${escapeHtml(input.courseName)}</strong>.</p>
      <p>Certificate ID: <strong>${escapeHtml(input.certificateId)}</strong></p>
      <p>Your certificate PDF is attached to this email.</p>
      <p>
        <a href="${input.certificateUrl}">Open certificate</a><br />
        <a href="${input.verifyUrl}">Verification page</a>
      </p>
    </div>
  `.trim()
  const text = [
    "Course completion recorded",
    "",
    `You have completed ${input.courseName}.`,
    `Certificate ID: ${input.certificateId}`,
    "Your certificate PDF is attached to this email.",
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
