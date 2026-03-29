import { redirect } from "next/navigation"

export default async function LegacySignupPage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state } = await params
  redirect(`/${state}/login?mode=signup`)
}
