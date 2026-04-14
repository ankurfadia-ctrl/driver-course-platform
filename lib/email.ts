import { getPublicBaseUrl } from "@/lib/runtime-config"

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

type AccountConfirmationEmailInput = {
  email: string
  stateName: string
  courseName: string
  confirmationUrl: string
  loginUrl: string
  supportEmail: string
  supportPhoneDisplay: string
}

type PasswordResetEmailInput = {
  email: string
  stateName: string
  courseName: string
  resetUrl: string
  loginUrl: string
  supportEmail: string
  supportPhoneDisplay: string
}

type EmailAction = {
  label: string
  href: string
  tone?: "primary" | "secondary"
}

type BrandedEmailTemplateInput = {
  eyebrow: string
  title: string
  intro: string
  preheader: string
  bodyHtml?: string
  actions?: EmailAction[]
  footerNote?: string
  supportEmail?: string
  supportPhoneDisplay?: string
}

const EMAIL_BRAND_NAME = "National Course Portal"

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function formatMultilineHtml(value: string) {
  return escapeHtml(value).replace(/\n/g, "<br />")
}

function getEmailConfig() {
  return {
    provider: String(process.env.EMAIL_PROVIDER ?? "log").trim().toLowerCase(),
    from: String(process.env.EMAIL_FROM ?? "").trim(),
    resendApiKey: String(process.env.RESEND_API_KEY ?? "").trim(),
  }
}

function buildActionButtons(actions: EmailAction[]) {
  return actions
    .map((action) => {
      const isPrimary = action.tone !== "secondary"
      const background = isPrimary ? "#2563eb" : "#eff6ff"
      const color = isPrimary ? "#ffffff" : "#1d4ed8"
      const border = isPrimary ? "#2563eb" : "#bfdbfe"

      return `
        <a
          href="${escapeHtml(action.href)}"
          style="
            display:inline-block;
            margin:0 12px 12px 0;
            border-radius:12px;
            border:1px solid ${border};
            background:${background};
            color:${color};
            font-size:14px;
            font-weight:700;
            letter-spacing:0.01em;
            padding:12px 18px;
            text-decoration:none;
          "
        >
          ${escapeHtml(action.label)}
        </a>
      `.trim()
    })
    .join("")
}

function buildSupportBlock(
  supportEmail?: string,
  supportPhoneDisplay?: string
) {
  if (!supportEmail && !supportPhoneDisplay) {
    return ""
  }

  const pieces = [
    supportEmail
      ? `<a href="mailto:${escapeHtml(supportEmail)}" style="color:#1d4ed8;text-decoration:none;">${escapeHtml(
          supportEmail
        )}</a>`
      : "",
    supportPhoneDisplay
      ? `<span style="color:#475569;">${escapeHtml(supportPhoneDisplay)}</span>`
      : "",
  ].filter(Boolean)

  return `
    <div
      style="
        margin-top:20px;
        border-radius:16px;
        border:1px solid rgba(191,219,254,0.9);
        background:#f8fbff;
        padding:16px 18px;
        color:#334155;
        font-size:14px;
        line-height:1.7;
      "
    >
      <div style="font-weight:700;color:#0f172a;margin-bottom:6px;">Need help?</div>
      <div>Reply path: ${pieces.join(" <span style=\"color:#cbd5e1;\">|</span> ")}</div>
    </div>
  `.trim()
}

function buildBrandedEmailHtml(input: BrandedEmailTemplateInput) {
  const publicBaseUrl = getPublicBaseUrl().replace(/\/$/, "")
  const actionButtons = input.actions?.length
    ? `<div style="margin-top:26px;">${buildActionButtons(input.actions)}</div>`
    : ""
  const supportBlock = buildSupportBlock(
    input.supportEmail,
    input.supportPhoneDisplay
  )
  const footerNote = input.footerNote
    ? `<p style="margin:20px 0 0;color:#64748b;font-size:13px;line-height:1.7;">${escapeHtml(
        input.footerNote
      )}</p>`
    : ""

  return `
    <!doctype html>
    <html lang="en">
      <body style="margin:0;padding:0;background:#f4f7fb;color:#172033;font-family:Inter,Segoe UI,Arial,sans-serif;">
        <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
          ${escapeHtml(input.preheader)}
        </div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f7fb;padding:28px 0;">
          <tr>
            <td align="center">
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                style="
                  width:100%;
                  max-width:680px;
                  overflow:hidden;
                  border:1px solid rgba(148,163,184,0.22);
                  border-radius:28px;
                  background:linear-gradient(180deg,#f8fbff 0%,#ffffff 34%,#ffffff 100%);
                  box-shadow:0 18px 42px rgba(15,23,42,0.08);
                "
              >
                <tr>
                  <td style="padding:28px 30px 12px;">
                    <div
                      style="
                        display:inline-block;
                        border-radius:999px;
                        background:#eff6ff;
                        color:#1d4ed8;
                        font-size:11px;
                        font-weight:800;
                        letter-spacing:0.16em;
                        padding:8px 12px;
                        text-transform:uppercase;
                      "
                    >
                      ${escapeHtml(input.eyebrow)}
                    </div>
                    <div style="margin-top:18px;font-size:13px;font-weight:700;letter-spacing:0.08em;color:#64748b;text-transform:uppercase;">
                      ${escapeHtml(EMAIL_BRAND_NAME)}
                    </div>
                    <h1 style="margin:10px 0 0;font-size:32px;line-height:1.2;color:#0f172a;">
                      ${escapeHtml(input.title)}
                    </h1>
                    <p style="margin:16px 0 0;font-size:16px;line-height:1.8;color:#475569;">
                      ${escapeHtml(input.intro)}
                    </p>
                    ${
                      input.bodyHtml
                        ? `<div style="margin-top:20px;font-size:15px;line-height:1.8;color:#334155;">${input.bodyHtml}</div>`
                        : ""
                    }
                    ${actionButtons}
                    ${supportBlock}
                    ${footerNote}
                  </td>
                </tr>
                <tr>
                  <td
                    style="
                      padding:18px 30px 26px;
                      border-top:1px solid rgba(226,232,240,0.9);
                      color:#64748b;
                      font-size:12px;
                      line-height:1.8;
                    "
                  >
                    <div>${escapeHtml(EMAIL_BRAND_NAME)}</div>
                    <div>
                      <a href="${escapeHtml(publicBaseUrl)}" style="color:#1d4ed8;text-decoration:none;">${escapeHtml(
    publicBaseUrl
  )}</a>
                    </div>
                    <div>This email was sent in response to a student account or course activity request.</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `.trim()
}

function buildBrandedEmailText(input: {
  title: string
  intro: string
  bodyLines?: string[]
  actions?: EmailAction[]
  supportEmail?: string
  supportPhoneDisplay?: string
  footerNote?: string
}) {
  const lines = [
    input.title,
    "",
    input.intro,
    "",
    ...(input.bodyLines ?? []),
    ...(input.actions?.length
      ? [
          "Links:",
          ...input.actions.map((action) => `- ${action.label}: ${action.href}`),
          "",
        ]
      : []),
    ...(input.supportEmail || input.supportPhoneDisplay
      ? [
          "Support:",
          ...(input.supportEmail ? [`- Email: ${input.supportEmail}`] : []),
          ...(input.supportPhoneDisplay
            ? [`- Phone: ${input.supportPhoneDisplay}`]
            : []),
          "",
        ]
      : []),
    ...(input.footerNote ? [input.footerNote, ""] : []),
    `${EMAIL_BRAND_NAME}`,
    getPublicBaseUrl(),
  ]

  return lines.join("\n")
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

export async function sendAccountConfirmationEmail(
  input: AccountConfirmationEmailInput
) {
  const subject = `${input.courseName} account confirmation`
  const actions: EmailAction[] = [
    {
      label: "Confirm email and open account",
      href: input.confirmationUrl,
      tone: "primary",
    },
    {
      label: "Back to student login",
      href: input.loginUrl,
      tone: "secondary",
    },
  ]

  const bodyHtml = `
    <p style="margin:0 0 12px;"><strong>Course:</strong> ${escapeHtml(
      input.courseName
    )}</p>
    <p style="margin:0;">
      Click the confirmation button below to activate your email address and finish creating your ${escapeHtml(
        input.stateName
      )} student account.
    </p>
  `.trim()

  const html = buildBrandedEmailHtml({
    eyebrow: `${input.stateName} student account`,
    title: "Confirm your email to finish creating your account.",
    intro: `Your student account for ${input.courseName} is almost ready.`,
    preheader: `Confirm your email for ${input.courseName}.`,
    bodyHtml,
    actions,
    supportEmail: input.supportEmail,
    supportPhoneDisplay: input.supportPhoneDisplay,
    footerNote:
      "If you did not request this account, you can ignore this email and no course access will be activated.",
  })

  const text = buildBrandedEmailText({
    title: "Confirm your email to finish creating your account.",
    intro: `Your student account for ${input.courseName} is almost ready.`,
    bodyLines: [
      `Course: ${input.courseName}`,
      `State: ${input.stateName}`,
      "",
      "Use the confirmation link below to activate your email address and finish creating your student account.",
    ],
    actions,
    supportEmail: input.supportEmail,
    supportPhoneDisplay: input.supportPhoneDisplay,
    footerNote:
      "If you did not request this account, you can ignore this email and no course access will be activated.",
  })

  await sendTransactionalEmail({
    to: input.email,
    subject,
    html,
    text,
  })
}

export async function sendPasswordResetEmail(input: PasswordResetEmailInput) {
  const subject = `${input.courseName} password reset`
  const actions: EmailAction[] = [
    {
      label: "Reset password",
      href: input.resetUrl,
      tone: "primary",
    },
    {
      label: "Return to login",
      href: input.loginUrl,
      tone: "secondary",
    },
  ]

  const bodyHtml = `
    <p style="margin:0 0 12px;">
      We received a request to reset the password for your <strong>${escapeHtml(
        input.courseName
      )}</strong> student account.
    </p>
    <p style="margin:0;">
      Use the reset button below to choose a new password. If you did not request this change, you can ignore this email.
    </p>
  `.trim()

  const html = buildBrandedEmailHtml({
    eyebrow: `${input.stateName} account recovery`,
    title: "Reset your student account password.",
    intro: `Securely choose a new password and return to ${input.courseName}.`,
    preheader: `Reset your password for ${input.courseName}.`,
    bodyHtml,
    actions,
    supportEmail: input.supportEmail,
    supportPhoneDisplay: input.supportPhoneDisplay,
    footerNote:
      "For security, use the most recent password reset email you receive and discard any older recovery links.",
  })

  const text = buildBrandedEmailText({
    title: "Reset your student account password.",
    intro: `Securely choose a new password and return to ${input.courseName}.`,
    bodyLines: [
      `Course: ${input.courseName}`,
      "",
      "Use the reset link below to choose a new password. If you did not request this change, you can ignore this email.",
    ],
    actions,
    supportEmail: input.supportEmail,
    supportPhoneDisplay: input.supportPhoneDisplay,
    footerNote:
      "For security, use the most recent password reset email you receive and discard any older recovery links.",
  })

  await sendTransactionalEmail({
    to: input.email,
    subject,
    html,
    text,
  })
}

export async function sendPurchaseConfirmationEmail(input: PurchaseEmailInput) {
  const subject = `${input.courseName} purchase confirmed`
  const actions: EmailAction[] = [
    {
      label: "Start course",
      href: input.courseUrl,
      tone: "primary",
    },
    {
      label: "Open dashboard",
      href: input.dashboardUrl,
      tone: "secondary",
    },
    {
      label: "Contact support",
      href: input.supportUrl,
      tone: "secondary",
    },
  ]
  const bodyHtml = `
    <p style="margin:0 0 12px;">
      Your <strong>${escapeHtml(input.stateName)}</strong> purchase is complete for <strong>${escapeHtml(
    input.courseName
  )}</strong>.
    </p>
    <p style="margin:0;">
      <strong>Plan:</strong> ${escapeHtml(input.planName)}<br />
      <strong>Support tier:</strong> ${escapeHtml(input.supportTier)}
    </p>
  `.trim()
  const html = buildBrandedEmailHtml({
    eyebrow: `${input.stateName} course purchase`,
    title: "Your purchase is confirmed.",
    intro: `You can start ${input.courseName} now or return to your dashboard at any time.`,
    preheader: `Your ${input.courseName} purchase is complete.`,
    bodyHtml,
    actions,
  })
  const text = buildBrandedEmailText({
    title: "Your purchase is confirmed.",
    intro: `You can start ${input.courseName} now or return to your dashboard at any time.`,
    bodyLines: [
      `State: ${input.stateName}`,
      `Course: ${input.courseName}`,
      `Plan: ${input.planName}`,
      `Support tier: ${input.supportTier}`,
    ],
    actions,
  })

  await sendTransactionalEmail({
    to: input.email,
    subject,
    html,
    text,
  })
}

export async function sendCompletionCertificateEmail(input: CompletionEmailInput) {
  const subject = `${input.courseName} certificate of completion`
  const actions: EmailAction[] = [
    {
      label: "Open certificate",
      href: input.certificateUrl,
      tone: "primary",
    },
    {
      label: "Verify certificate",
      href: input.verifyUrl,
      tone: "secondary",
    },
  ]
  const bodyHtml = `
    <p style="margin:0 0 12px;">
      Your electronic certificate of completion is attached for <strong>${escapeHtml(
        input.courseName
      )}</strong>.
    </p>
    <p style="margin:0;">
      <strong>Provider email:</strong> ${escapeHtml(input.providerEmail)}<br />
      <strong>Student email:</strong> ${escapeHtml(input.email)}<br />
      <strong>Certificate ID:</strong> ${escapeHtml(input.certificateId)}
    </p>
  `.trim()
  const html = buildBrandedEmailHtml({
    eyebrow: `${input.stateName} completion record`,
    title: "Your certificate of completion is ready.",
    intro: `Keep this email and certificate ID for your records.`,
    preheader: `Your ${input.courseName} certificate is attached.`,
    bodyHtml,
    actions,
    supportEmail: input.providerEmail,
  })
  const text = buildBrandedEmailText({
    title: "Your certificate of completion is ready.",
    intro: `Keep this email and certificate ID for your records.`,
    bodyLines: [
      `Course: ${input.courseName}`,
      `Student email: ${input.email}`,
      `Provider email: ${input.providerEmail}`,
      `Certificate ID: ${input.certificateId}`,
    ],
    actions,
    supportEmail: input.providerEmail,
  })

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
  const html = buildBrandedEmailHtml({
    eyebrow: `${input.stateName} support reply`,
    title: "You have a new support reply.",
    intro: `A new support response is waiting in your ${input.stateName} course thread.`,
    preheader: `A new support reply is waiting in your ${input.stateName} course account.`,
    bodyHtml: `
      <div style="border-radius:16px;border:1px solid rgba(203,213,225,0.9);background:#f8fafc;padding:18px;">
        ${formatMultilineHtml(input.replyMessage)}
      </div>
    `.trim(),
    actions: [],
  })
  const text = buildBrandedEmailText({
    title: "You have a new support reply.",
    intro: `A new support response is waiting in your ${input.stateName} course thread.`,
    bodyLines: [input.replyMessage],
    actions: [],
  })

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
  const html = buildBrandedEmailHtml({
    eyebrow: `${input.stateName} priority support`,
    title: "A priority support request needs review.",
    intro: `A new priority support request was submitted for the ${input.stateName} course.`,
    preheader: `Priority support request submitted for ${input.stateName}.`,
    bodyHtml: `
      <p style="margin:0 0 12px;">
        <strong>Student email:</strong> ${escapeHtml(input.studentEmail)}<br />
        <strong>Priority requested:</strong> ${input.priorityRequested ? "Yes" : "No"}
      </p>
      <div style="border-radius:16px;border:1px solid rgba(203,213,225,0.9);background:#f8fafc;padding:18px;">
        ${formatMultilineHtml(input.message)}
      </div>
      ${
        input.replyTo
          ? `<p style="margin:14px 0 0;">Reply directly to this email to send a response back into the student support thread.</p>`
          : ""
      }
    `.trim(),
    actions: [
      {
        label: "Open admin support inbox",
        href: input.supportUrl,
        tone: "primary",
      },
    ],
  })
  const text = buildBrandedEmailText({
    title: "A priority support request needs review.",
    intro: `A new priority support request was submitted for the ${input.stateName} course.`,
    bodyLines: [
      `Student email: ${input.studentEmail}`,
      `Priority requested: ${input.priorityRequested ? "Yes" : "No"}`,
      "",
      input.message,
      ...(input.replyTo
        ? [
            "",
            "Reply directly to this email to send a response back into the student support thread.",
          ]
        : []),
    ],
    actions: [
      {
        label: "Open admin support inbox",
        href: input.supportUrl,
      },
    ],
  })

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
          <a href="${escapeHtml(
            request.supportUrl
          )}" style="color:#1d4ed8;text-decoration:none;">Open admin support inbox</a>
        </li>
      `
    )
    .join("")

  const html = buildBrandedEmailHtml({
    eyebrow: "Admin support digest",
    title: "Daily standard support summary",
    intro: `You have ${input.requests.length} unresolved standard support request(s).`,
    preheader: `Daily standard support summary: ${input.requests.length} unresolved request(s).`,
    bodyHtml: `<ul style="margin:0;padding-left:20px;">${htmlItems}</ul>`,
  })

  const text = buildBrandedEmailText({
    title: "Daily standard support summary",
    intro: `You have ${input.requests.length} unresolved standard support request(s).`,
    bodyLines: input.requests.flatMap((request) => [
      `${request.stateName}: ${request.subject}`,
      `Student: ${request.studentEmail}`,
      `Created: ${request.createdAt}`,
      `Open: ${request.supportUrl}`,
      "",
    ]),
  })

  await sendTransactionalEmail({
    to: input.email,
    subject,
    html,
    text,
  })
}
