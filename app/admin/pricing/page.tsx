import { redirect } from "next/navigation"
import PriceMatchAdminClient from "@/components/admin/PriceMatchAdminClient"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/admin-access"
import { getCoursePlans } from "@/lib/payment/plans"

export const dynamic = "force-dynamic"

export default async function AdminPricingPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    redirect("/")
  }

  const plans = getCoursePlans("virginia")
    .filter((plan) => plan.planKind === "full-course")
    .map((plan) => ({
      planCode: plan.planCode,
      displayName: `${plan.displayName} (${plan.priceCents / 100})`,
      priceCents: plan.priceCents,
    }))

  return <PriceMatchAdminClient plans={plans} />
}
