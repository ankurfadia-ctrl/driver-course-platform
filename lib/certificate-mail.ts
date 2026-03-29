export type MailingAddress = {
  firstName: string
  lastName: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
}

type CertificateMailOrder = {
  stateCode: string
  stateName: string
  courseName: string
  certificateId: string
  completionDate: string | null
  studentName: string
  verifyUrl: string
  mailingAddress: MailingAddress
}

export type CertificateMailQuote = {
  orderPriceCents: number
  estimatedProviderCostCents: number
  estimatedGrossProfitCents: number
  estimatedMarginPercent: number
}

function formatMoneyParts(amountCents: number) {
  return (amountCents / 100).toFixed(2)
}

function getMailProviderConfig() {
  return {
    provider: String(process.env.PHYSICAL_MAIL_PROVIDER ?? "log")
      .trim()
      .toLowerCase(),
    lobApiKey: String(process.env.LOB_API_KEY ?? "").trim(),
    lobFromName: String(process.env.LOB_FROM_NAME ?? "").trim(),
    lobFromAddressLine1: String(process.env.LOB_FROM_ADDRESS_LINE1 ?? "").trim(),
    lobFromAddressLine2: String(process.env.LOB_FROM_ADDRESS_LINE2 ?? "").trim(),
    lobFromCity: String(process.env.LOB_FROM_ADDRESS_CITY ?? "").trim(),
    lobFromState: String(process.env.LOB_FROM_ADDRESS_STATE ?? "").trim(),
    lobFromZip: String(process.env.LOB_FROM_ADDRESS_ZIP ?? "").trim(),
    lobFromCountry: String(process.env.LOB_FROM_COUNTRY ?? "US").trim(),
  }
}

export function getCertificateMailQuote(): CertificateMailQuote {
  const orderPriceCents = 499
  const estimatedProviderCostCents = 59
  const estimatedGrossProfitCents =
    orderPriceCents - estimatedProviderCostCents

  return {
    orderPriceCents,
    estimatedProviderCostCents,
    estimatedGrossProfitCents,
    estimatedMarginPercent: Math.round(
      (estimatedGrossProfitCents / orderPriceCents) * 100
    ),
  }
}

export function getCertificateMailPlanCode(state: string) {
  if (String(state).trim().toLowerCase() === "virginia") {
    return "va-mailed-certificate"
  }

  return `${String(state).trim().toLowerCase()}-mailed-certificate`
}

export function validateMailingAddress(address: MailingAddress) {
  const requiredFields = [
    address.firstName,
    address.lastName,
    address.addressLine1,
    address.city,
    address.state,
    address.postalCode,
    address.country,
  ]

  if (requiredFields.some((value) => !String(value ?? "").trim())) {
    throw new Error("Complete all required mailing address fields.")
  }
}

function buildCertificateLetterHtml(order: CertificateMailOrder) {
  const recipientName = `${order.mailingAddress.firstName} ${order.mailingAddress.lastName}`.trim()

  return `
    <html>
      <body style="font-family: Georgia, 'Times New Roman', serif; color: #0f172a; padding: 48px;">
        <div style="border: 4px solid #cbd5e1; padding: 40px; text-align: center;">
          <div style="font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: #2563eb;">
            Certificate of Completion
          </div>
          <h1 style="margin: 28px 0 12px; font-size: 30px;">${order.courseName}</h1>
          <p style="font-size: 18px;">This certifies that</p>
          <div style="margin-top: 18px; font-size: 32px; font-weight: bold; text-decoration: underline;">
            ${order.studentName}
          </div>
          <p style="margin-top: 28px; font-size: 18px;">
            has successfully completed all requirements and passed the final exam.
          </p>
          <div style="margin-top: 28px; font-size: 16px;">
            Completion Date: ${order.completionDate ?? "Recorded"}
          </div>
          <div style="margin-top: 10px; font-size: 16px;">
            Certificate ID: ${order.certificateId}
          </div>
          <div style="margin-top: 24px; font-size: 12px; color: #475569;">
            Verify online: ${order.verifyUrl}
          </div>
        </div>
        <div style="margin-top: 28px; font-size: 12px; color: #475569;">
          Mailing copy requested for ${recipientName}
        </div>
      </body>
    </html>
  `.trim()
}

async function sendWithLob(order: CertificateMailOrder) {
  const config = getMailProviderConfig()

  if (
    !config.lobApiKey ||
    !config.lobFromName ||
    !config.lobFromAddressLine1 ||
    !config.lobFromCity ||
    !config.lobFromState ||
    !config.lobFromZip
  ) {
    throw new Error("Missing Lob mailing configuration.")
  }

  const auth = Buffer.from(`${config.lobApiKey}:`).toString("base64")
  const response = await fetch("https://api.lob.com/v1/letters", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description: `${order.stateName} mailed certificate ${order.certificateId}`,
      to: {
        name: `${order.mailingAddress.firstName} ${order.mailingAddress.lastName}`.trim(),
        address_line1: order.mailingAddress.addressLine1,
        address_line2: order.mailingAddress.addressLine2 || "",
        address_city: order.mailingAddress.city,
        address_state: order.mailingAddress.state,
        address_zip: order.mailingAddress.postalCode,
        address_country: order.mailingAddress.country || "US",
      },
      from: {
        name: config.lobFromName,
        address_line1: config.lobFromAddressLine1,
        address_line2: config.lobFromAddressLine2 || "",
        address_city: config.lobFromCity,
        address_state: config.lobFromState,
        address_zip: config.lobFromZip,
        address_country: config.lobFromCountry,
      },
      file: buildCertificateLetterHtml(order),
      color: false,
      double_sided: false,
    }),
  })

  if (!response.ok) {
    const raw = await response.text()
    throw new Error(`Lob letter creation failed (${response.status}): ${raw}`)
  }

  return response.json()
}

async function sendWithLog(order: CertificateMailOrder) {
  const quote = getCertificateMailQuote()

  console.info("Physical mail order logged.", {
    provider: getMailProviderConfig().provider,
    certificateId: order.certificateId,
    studentName: order.studentName,
    mailingAddress: order.mailingAddress,
    quotedPrice: formatMoneyParts(quote.orderPriceCents),
  })
}

export async function fulfillCertificateMailOrder(order: CertificateMailOrder) {
  const config = getMailProviderConfig()

  validateMailingAddress(order.mailingAddress)

  if (config.provider === "lob") {
    return sendWithLob(order)
  }

  return sendWithLog(order)
}
