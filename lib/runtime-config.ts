type RuntimeConfigCheck = {
  label: string
  ready: boolean
  detail: string
}

function getTrimmedEnvValue(name: string) {
  return String(process.env[name] ?? "").trim()
}

function isLiveHttpsUrl(value: string) {
  if (!value) return false

  try {
    const parsed = new URL(value)
    return parsed.protocol === "https:" && parsed.hostname !== "localhost"
  } catch {
    return false
  }
}

export function getPublicBaseUrl() {
  const baseUrl = getTrimmedEnvValue("NEXT_PUBLIC_BASE_URL")

  if (!baseUrl) {
    return "http://localhost:3000"
  }

  return baseUrl
}

export function getRuntimeConfigChecks(): RuntimeConfigCheck[] {
  const supabaseUrl = getTrimmedEnvValue("NEXT_PUBLIC_SUPABASE_URL")
  const supabaseAnonKey = getTrimmedEnvValue("NEXT_PUBLIC_SUPABASE_ANON_KEY")
  const supabaseServiceRoleKey = getTrimmedEnvValue("SUPABASE_SERVICE_ROLE_KEY")
  const stripeSecretKey = getTrimmedEnvValue("STRIPE_SECRET_KEY")
  const baseUrl = getTrimmedEnvValue("NEXT_PUBLIC_BASE_URL")
  const adminEmails = getTrimmedEnvValue("ADMIN_EMAILS")
  const emailProvider = getTrimmedEnvValue("EMAIL_PROVIDER").toLowerCase() || "log"
  const emailFrom = getTrimmedEnvValue("EMAIL_FROM")
  const resendApiKey = getTrimmedEnvValue("RESEND_API_KEY")

  return [
    {
      label: "Supabase public config",
      ready: Boolean(supabaseUrl && supabaseAnonKey),
      detail: supabaseUrl && supabaseAnonKey
        ? "Public Supabase URL and anon key are set."
        : "NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing.",
    },
    {
      label: "Supabase service role",
      ready: Boolean(supabaseServiceRoleKey),
      detail: supabaseServiceRoleKey
        ? "Service role key is configured for admin server workflows."
        : "SUPABASE_SERVICE_ROLE_KEY is missing.",
    },
    {
      label: "Stripe secret key",
      ready: Boolean(stripeSecretKey),
      detail: stripeSecretKey
        ? "Stripe secret key is present."
        : "STRIPE_SECRET_KEY is missing.",
    },
    {
      label: "Base URL",
      ready: isLiveHttpsUrl(baseUrl),
      detail: isLiveHttpsUrl(baseUrl)
        ? `Live base URL configured: ${baseUrl}`
        : "NEXT_PUBLIC_BASE_URL should be the live HTTPS site URL, not localhost.",
    },
    {
      label: "Admin emails",
      ready: Boolean(adminEmails),
      detail: adminEmails
        ? "ADMIN_EMAILS is configured."
        : "ADMIN_EMAILS is empty.",
    },
    {
      label: "Transactional email",
      ready:
        emailProvider === "resend" &&
        Boolean(emailFrom) &&
        Boolean(resendApiKey),
      detail:
        emailProvider === "resend" && emailFrom && resendApiKey
          ? `Live email delivery is configured with provider "${emailProvider}".`
          : `Email provider is "${emailProvider}". Live purchase/completion email still needs EMAIL_FROM and RESEND_API_KEY with EMAIL_PROVIDER=resend.`,
    },
  ]
}

export function getRuntimeLaunchSummary() {
  const checks = getRuntimeConfigChecks()
  const readyCount = checks.filter((check) => check.ready).length

  return {
    checks,
    readyCount,
    totalCount: checks.length,
    launchConfigReady: readyCount === checks.length,
  }
}
