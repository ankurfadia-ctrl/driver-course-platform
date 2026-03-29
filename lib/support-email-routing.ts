const SUPPORT_REPLY_LOCAL_PREFIX = "support-request-"

export function getSupportReplyDomain() {
  return String(process.env.SUPPORT_REPLY_DOMAIN ?? "").trim().toLowerCase()
}

export function getSupportReplyAddress(requestId: string) {
  const domain = getSupportReplyDomain()

  if (!domain) {
    return null
  }

  return `${SUPPORT_REPLY_LOCAL_PREFIX}${requestId}@${domain}`
}

export function extractEmailAddress(value: string) {
  const raw = String(value ?? "").trim()
  const match = raw.match(/<([^>]+)>/)

  return (match?.[1] ?? raw).trim().toLowerCase()
}

export function getSupportRequestIdFromAddresses(addresses: string[]) {
  for (const address of addresses) {
    const email = extractEmailAddress(address)
    const match = email.match(
      new RegExp(`^${SUPPORT_REPLY_LOCAL_PREFIX}([0-9a-f-]{36})@`, "i")
    )

    if (match?.[1]) {
      return match[1].toLowerCase()
    }
  }

  return null
}

export function trimInboundReplyText(value: string) {
  const text = String(value ?? "").replace(/\r\n/g, "\n").trim()

  if (!text) {
    return ""
  }

  const stopPatterns = [
    /^On .+ wrote:$/im,
    /^From:\s.+$/im,
    /^Sent from my /im,
    /^>+/m,
    /^---+\s*Original Message\s*---+$/im,
  ]

  let cutoff = text.length

  for (const pattern of stopPatterns) {
    const match = pattern.exec(text)

    if (match?.index !== undefined && match.index < cutoff) {
      cutoff = match.index
    }
  }

  return text
    .slice(0, cutoff)
    .trim()
}

