import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import {
  formatCourseAccessDeadline,
  isCourseAccessExpired,
  VIRGINIA_COURSE_ACCESS_DAYS,
} from '@/lib/course-deadline'
import { getCoursePlanByCode } from '@/lib/payment/plans'

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/${state}/login`)
  }

  const { data: purchases } = await supabase
    .from('course_purchases')
    .select('plan_code, purchase_status, purchased_at')
    .eq('user_id', user.id)
    .eq('state_code', state)
    .eq('purchase_status', 'paid')
    .order('purchased_at', { ascending: false })
    .limit(25)

  const hasPaidCourseAccess = Boolean(
    (purchases ?? []).find((purchase) => {
      const plan = getCoursePlanByCode(String(purchase.plan_code ?? ''))
      return (
        plan?.planKind === 'full-course' &&
        !isCourseAccessExpired(purchase.purchased_at)
      )
    })
  )

  const latestFullCoursePurchase =
    (purchases ?? []).find((purchase) => {
      const plan = getCoursePlanByCode(String(purchase.plan_code ?? ''))
      return plan?.planKind === 'full-course'
    }) ?? null

  const accessDeadline = formatCourseAccessDeadline(
    latestFullCoursePurchase?.purchased_at ?? null
  )
  const accessExpired = isCourseAccessExpired(
    latestFullCoursePurchase?.purchased_at ?? null
  )

  async function logout() {
    "use server"
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect(`/${state}/login`)
  }

  return (
    <main className="max-w-xl mx-auto mt-10 p-6 space-y-6">
      <h1 className="text-2xl font-bold">Student Dashboard</h1>

      <p className="text-slate-600">
        Logged in as <span className="font-medium">{user.email}</span>
      </p>

      {latestFullCoursePurchase ? (
        <div className={`rounded-xl border p-4 text-sm ${
          accessExpired
            ? 'border-amber-200 bg-amber-50 text-amber-900'
            : 'border-slate-200 bg-slate-50 text-slate-700'
        }`}>
          {accessExpired
            ? `Your ${state} course access has expired. Course access is available for ${VIRGINIA_COURSE_ACCESS_DAYS} days from purchase.`
            : `Your ${state} course access remains available through ${accessDeadline}.`}
        </div>
      ) : null}

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href={hasPaidCourseAccess ? `/${state}/course` : `/${state}/checkout`}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          {hasPaidCourseAccess ? 'Start Course' : 'View Plans'}
        </Link>

        {hasPaidCourseAccess ? (
          <Link
            href={`/${state}/checkout`}
            className="border border-slate-300 px-6 py-3 rounded-lg"
          >
            View Plans
          </Link>
        ) : null}
      </div>

      <form action={logout}>
        <button
          type="submit"
          className="mt-4 text-sm text-red-600 underline"
        >
          Log out
        </button>
      </form>
    </main>
  )
}
