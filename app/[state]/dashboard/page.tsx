import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import {
  formatCourseAccessDeadline,
  isCourseAccessExpired,
  VIRGINIA_COURSE_ACCESS_DAYS,
} from '@/lib/course-deadline'
import { getCoursePlanByCode } from '@/lib/payment/plans'
import { getCourseConfig } from '@/lib/course-config'
import { getPreferredSiteLanguage } from '@/lib/site-language-server'

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state } = await params
  const supabase = await createClient()
  const config = getCourseConfig(state)
  const language = await getPreferredSiteLanguage()

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

  const isEs = language === "es"
  const copy = isEs
    ? {
        label: `Panel de estudiante — ${config.stateName}`,
        heading: "Panel del estudiante",
        loggedInAs: "Sesión iniciada como",
        accessActive: `Tu acceso al curso de ${config.stateName} está disponible hasta el ${accessDeadline}.`,
        accessExpired: `Tu acceso al curso de ${config.stateName} venció. El acceso está disponible por ${VIRGINIA_COURSE_ACCESS_DAYS} días desde la compra.`,
        startCourse: "Ir al curso",
        viewPlans: "Ver planes",
        logout: "Cerrar sesión",
      }
    : {
        label: `Student Dashboard — ${config.stateName}`,
        heading: "Student Dashboard",
        loggedInAs: "Logged in as",
        accessActive: `Your ${config.stateName} course access is available through ${accessDeadline}.`,
        accessExpired: `Your ${config.stateName} course access has expired. Course access is available for ${VIRGINIA_COURSE_ACCESS_DAYS} days from purchase.`,
        startCourse: hasPaidCourseAccess ? "Go to Course" : "View Plans",
        viewPlans: "View Plans",
        logout: "Log out",
      }

  async function logout() {
    "use server"
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect(`/${state}/login`)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
          {copy.label}
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">
          {copy.heading}
        </h1>
        <p className="mt-3 text-slate-600">
          {copy.loggedInAs}{" "}
          <span className="font-medium text-slate-900">{user.email}</span>
        </p>
      </section>

      {latestFullCoursePurchase ? (
        <section
          className={`rounded-[1.75rem] border p-6 text-sm leading-7 ${
            accessExpired
              ? "border-amber-200 bg-amber-50 text-amber-900"
              : "border-emerald-200 bg-emerald-50 text-emerald-900"
          }`}
        >
          {accessExpired ? copy.accessExpired : copy.accessActive}
        </section>
      ) : null}

      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <div className="flex flex-wrap gap-3">
          <Link
            href={hasPaidCourseAccess ? `/${state}/course` : `/${state}/checkout`}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            {isEs
              ? hasPaidCourseAccess
                ? "Ir al curso"
                : "Ver planes"
              : copy.startCourse}
          </Link>

          {hasPaidCourseAccess ? (
            <Link
              href={`/${state}/checkout`}
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              {copy.viewPlans}
            </Link>
          ) : null}
        </div>

        <form action={logout} className="mt-6 border-t border-slate-100 pt-6">
          <button
            type="submit"
            className="text-sm font-medium text-red-600 underline underline-offset-4 hover:text-red-800"
          >
            {copy.logout}
          </button>
        </form>
      </section>
    </div>
  )
}
