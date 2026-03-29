"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import {
  formatPriceFromCents,
  getAvailableCoursePlans,
  type SupportTier,
} from "@/lib/payment/plans"
import { getCourseConfig, getDisclosuresRoute, getRefundsRoute } from "@/lib/course-config"
import { getCourseAccessStatus } from "@/lib/course-access"
import { usePreferredSiteLanguageClient } from "@/lib/site-language-client"

function getStateDisplayName(state: string) {
  const normalized = String(state ?? "").trim()
  if (!normalized) return "Virginia"
  return normalized.charAt(0).toUpperCase() + normalized.slice(1).toLowerCase()
}

function normalizeSupportTier(value: string | null): SupportTier | null {
  if (value === "priority") return "priority"
  if (value === "standard") return "standard"
  return null
}

export default function StateCheckoutPage() {
  const params = useParams()

  const state =
    typeof params?.state === "string" ? params.state : "virginia"
  const config = getCourseConfig(state)
  const language = usePreferredSiteLanguageClient()

  const [checkingPurchase, setCheckingPurchase] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasPaidPurchase, setHasPaidPurchase] = useState(false)
  const [purchasePlanCode, setPurchasePlanCode] = useState<string | null>(null)
  const [purchaseSupportTier, setPurchaseSupportTier] = useState<string | null>(null)
  const [purchaseError, setPurchaseError] = useState("")

  const stateDisplayName = useMemo(() => getStateDisplayName(state), [state])
  const normalizedSupportTier = normalizeSupportTier(purchaseSupportTier)
  const copy =
    language === "es"
      ? {
          checkingTitle: "Verificando tu compra...",
          checkingBody:
            `Espera mientras confirmamos si esta cuenta ya compro el curso de ${stateDisplayName}.`,
          purchasedLabel: "Ya comprado",
          purchasedTitle: `Ya tienes acceso al curso de ${stateDisplayName}`,
          purchasedBody:
            "Esta cuenta ya tiene una compra pagada con soporte prioritario para este estado, por lo que no es necesario pagar otra vez.",
          planCode: "Codigo del plan",
          supportTier: "Nivel de soporte",
          priority: "Prioritario",
          goCourse: "Ir al curso",
          goDashboard: "Ir al panel",
          openSupport: "Abrir soporte",
          sectionLabel: `${stateDisplayName} pago`,
          titleUpgrade: "Mejorar soporte",
          titleCheckout: "Inscripcion y pago del curso",
          bodyUpgrade:
            "Esta cuenta ya tiene el curso. Puedes mejorar a soporte prioritario abajo.",
          bodyCheckout:
            "Revisa las opciones disponibles abajo. El pago se completa de forma segura con Stripe despues de elegir un plan.",
          infoTitle: "Informacion importante antes de inscribirte",
          infoOne: "El acceso al curso es una compra unica para este estado.",
          infoTwo:
            "Los estudiantes deben planear completar el curso dentro de 90 dias desde la compra.",
          infoThreeUpgrade:
            "Las mejoras a soporte prioritario solo estan disponibles para compras estandar existentes.",
          infoThreeCheckout:
            "Siguen aplicando el tiempo del curso, las verificaciones de identidad, las reglas del examen final y cualquier plazo externo mas corto.",
          currentPlan: "Plan actual: soporte estandar",
          currentPlanBody:
            "Ya tienes acceso al curso. Si quieres una atencion mas rapida, puedes comprar la mejora a soporte prioritario abajo.",
          labelUpgrade: "Mejora",
          labelPriority: "Soporte prioritario",
          labelStandard: "Estandar",
          supportUpgradeDescription:
            "Mejora una compra estandar existente a soporte prioritario.",
          priorityDescription:
            "Incluye el curso completo, elegibilidad para certificado y soporte prioritario.",
          standardDescription:
            "Incluye el curso completo y elegibilidad para certificado.",
          oneTime: "pago unico",
          fullCourseAccess: "Acceso completo al curso",
          alreadyIncluded: "Ya incluido",
          included: "Incluido",
          certificateEligibility: "Elegibilidad para certificado",
          unchanged: "Sin cambios",
          supportTierLabel: "Nivel de soporte",
          selectUpgrade: "Mejorar a soporte prioritario",
          selectPriority: "Elegir prioritario",
          selectStandard: "Elegir estandar",
          enrollmentProcess: "Proceso de inscripcion",
          upgradeProcess: "Proceso de mejora",
          processUpgrade: [
            ["1. Elige la mejora", "Selecciona la opcion de mejora a soporte prioritario."],
            ["2. Completa el pago", "El pago seguro se realiza mediante Stripe."],
            ["3. Prioridad activada", "Despues del pago, el soporte prioritario queda activo en esta cuenta."],
          ] as const,
          processEnroll: [
            ["1. Elige un plan", "Selecciona la opcion del curso que quieres comprar."],
            ["2. Completa el pago", "El pago seguro se realiza mediante Stripe."],
            ["3. Comienza el curso", "Despues del pago, la cuenta puede entrar al flujo del curso."],
          ] as const,
          approvalLabel: "Aprobacion pendiente",
          reviewTitle: "Revisa la informacion del curso antes de comprar",
          reviewBody:
            "Los estudiantes deben confirmar la aceptacion del curso para su necesidad especifica ante tribunal, DMV, empleador o seguro antes de inscribirse. Tambien deben planear completar el curso dentro de 90 dias desde la compra, salvo que su requisito externo les otorgue menos tiempo.",
          reviewCta: `Leer informacion del curso de ${stateDisplayName}`,
          refundTitle: "Resumen de reembolso",
          refundBody:
            "Las solicitudes de reembolso pueden revisarse antes de un uso sustancial del curso. Despues de progreso importante, acceso al examen final, emision del certificado o cumplimiento de correo fisico, la compra normalmente deja de ser reembolsable.",
          refundCta: "Leer politica de reembolso",
          accountTitle: "Crea tu cuenta antes de pagar",
          accountBody:
            "Los estudiantes nuevos deben crear una cuenta o iniciar sesion antes del pago para que la compra quede guardada y el curso se desbloquee correctamente.",
          createAccount: "Crear cuenta",
          logIn: "Iniciar sesion",
          backCourse: "Volver al curso",
          questions: "Preguntas antes de comprar?",
        }
      : {
          checkingTitle: "Checking your purchase status...",
          checkingBody:
            `Please wait while we confirm whether this account already purchased the ${stateDisplayName} course.`,
          purchasedLabel: "Already purchased",
          purchasedTitle: `You already have access to the ${stateDisplayName} course`,
          purchasedBody:
            "This account already has a paid purchase with priority support for this state, so there is no need to check out again.",
          planCode: "Plan code",
          supportTier: "Support tier",
          priority: "Priority",
          goCourse: "Go to Course",
          goDashboard: "Go to Dashboard",
          openSupport: "Open Support",
          sectionLabel: `${stateDisplayName} Checkout`,
          titleUpgrade: "Upgrade support",
          titleCheckout: "Course enrollment and payment",
          bodyUpgrade:
            "This account already has the course. You can upgrade to priority support below.",
          bodyCheckout:
            "Review the available course options below. Payment is completed securely through Stripe after you choose a plan.",
          infoTitle: "Important information before enrollment",
          infoOne: "Course access is a one-time purchase for this state.",
          infoTwo: "Students should plan to complete the course within 90 days of purchase.",
          infoThreeUpgrade:
            "Priority support upgrades are available only for existing standard purchases.",
          infoThreeCheckout:
            "Seat-time, identity checks, final exam rules, and any earlier outside deadline still apply.",
          currentPlan: "Current plan: standard support",
          currentPlanBody:
            "You already have course access. If you want faster support handling, you can purchase the priority support upgrade below.",
          labelUpgrade: "Upgrade",
          labelPriority: "Priority Support",
          labelStandard: "Standard",
          supportUpgradeDescription:
            "Upgrades an existing standard purchase to priority support.",
          priorityDescription:
            "Includes the full course, certificate eligibility, and priority support.",
          standardDescription:
            "Includes the full course and certificate eligibility.",
          oneTime: "one-time payment",
          fullCourseAccess: "Full course access",
          alreadyIncluded: "Already included",
          included: "Included",
          certificateEligibility: "Certificate eligibility",
          unchanged: "Unchanged",
          supportTierLabel: "Support tier",
          selectUpgrade: "Upgrade to Priority Support",
          selectPriority: "Select Priority",
          selectStandard: "Select Standard",
          enrollmentProcess: "Enrollment process",
          upgradeProcess: "Upgrade process",
          processUpgrade: [
            ["1. Select upgrade", "Choose the priority support upgrade option."],
            ["2. Complete payment", "Secure checkout is completed through Stripe."],
            ["3. Priority enabled", "After payment, priority support becomes active for this account."],
          ] as const,
          processEnroll: [
            ["1. Select a plan", "Choose the course option you want to purchase."],
            ["2. Complete payment", "Secure checkout is completed through Stripe."],
            ["3. Begin the course", "After payment, the student account can enter the course flow."],
          ] as const,
          approvalLabel: config.approvalStatusLabel,
          reviewTitle: "Review course information before purchasing",
          reviewBody:
            "Students should confirm course acceptance for their specific court, DMV, employer, or insurance need before enrolling. Students should also plan to complete the course within 90 days of purchase, unless their outside requirement gives them less time.",
          reviewCta: `Read ${stateDisplayName} course information`,
          refundTitle: "Refund summary",
          refundBody:
            "Refund requests may be reviewed before substantial use of the course. After significant progress, final exam access, certificate issuance, or physical-mail fulfillment, the purchase is generally no longer refundable.",
          refundCta: "Read refund policy",
          accountTitle: "Create your account before payment",
          accountBody:
            "New students should create an account or log in before checkout so the purchase can be saved and the course unlocks correctly after payment.",
          createAccount: "Create account",
          logIn: "Log in",
          backCourse: "Back to Course",
          questions: "Questions Before Buying?",
        }

  const plans = useMemo(
    () =>
      getAvailableCoursePlans(
        state,
        {
          hasPaidAccess: hasPaidPurchase,
          supportTier: normalizedSupportTier,
        }
      ).filter((plan) => plan.planKind !== "certificate-mail"),
    [state, hasPaidPurchase, normalizedSupportTier]
  )

  useEffect(() => {
    let isMounted = true

    async function checkExistingPurchase() {
      try {
        setCheckingPurchase(true)
        setPurchaseError("")

        const access = await getCourseAccessStatus(state)

        if (!isMounted) return

        setIsAuthenticated(access.isAuthenticated)
        if (access.hasPaidAccess) {
          setHasPaidPurchase(true)
          setPurchasePlanCode(access.planCode)
          setPurchaseSupportTier(access.supportTier)
        } else {
          setHasPaidPurchase(false)
          setPurchasePlanCode(null)
          setPurchaseSupportTier(null)
        }

        setPurchaseError(access.error ?? "")
      } catch (error) {
        console.error("Unexpected checkout purchase check error:", error)

        if (!isMounted) return
        setHasPaidPurchase(false)
        setPurchaseError("Unexpected error while checking purchase status.")
      } finally {
        if (isMounted) {
          setCheckingPurchase(false)
        }
      }
    }

    void checkExistingPurchase()

    return () => {
      isMounted = false
    }
  }, [state])

  if (checkingPurchase) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="glass-panel rounded-[2rem] bg-white p-6">
          <h1 className="text-2xl font-bold text-slate-900">
            {copy.checkingTitle}
          </h1>
          <p className="mt-2 leading-7 text-slate-600">{copy.checkingBody}</p>
        </div>
      </div>
    )
  }

  if (hasPaidPurchase && normalizedSupportTier === "priority") {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="glass-panel rounded-[2rem] bg-white p-6 sm:p-7">
          <div className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            {copy.purchasedLabel}
          </div>

          <h1 className="mt-4 text-3xl font-semibold text-slate-950">
            {copy.purchasedTitle}
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            {copy.purchasedBody}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">{copy.planCode}</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">
                {purchasePlanCode ?? "Paid"}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm text-slate-500">{copy.supportTier}</div>
              <div className="mt-1 text-lg font-semibold text-slate-900">
                {copy.priority}
              </div>
            </div>
          </div>

          {purchaseError ? (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              {purchaseError}
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/${state}/course`}
              className="inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              {copy.goCourse}
            </Link>

            <Link
              href={`/${state}/dashboard`}
              className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              {copy.goDashboard}
            </Link>

            <Link
              href={`/${state}/support`}
              className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              {copy.openSupport}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="glass-panel rounded-[2rem] border-[#dbe7ff] bg-white p-7 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-4">
            <p className="section-label">{copy.sectionLabel}</p>
            <h1 className="text-4xl font-semibold text-slate-950">
              {hasPaidPurchase ? copy.titleUpgrade : copy.titleCheckout}
            </h1>
            <p className="max-w-3xl leading-8 text-slate-600">
              {hasPaidPurchase ? copy.bodyUpgrade : copy.bodyCheckout}
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-[#e5edff] bg-[#f8fbff] p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
              {copy.infoTitle}
            </div>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              <p>{copy.infoOne}</p>
              <p>{copy.infoTwo}</p>
              <p>{hasPaidPurchase ? copy.infoThreeUpgrade : copy.infoThreeCheckout}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          {copy.refundTitle}
        </div>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700">
          {copy.refundBody}
        </p>
        <Link
          href={getRefundsRoute(state)}
          className="mt-4 inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-900 hover:bg-slate-100"
        >
          {copy.refundCta}
        </Link>
      </section>

      {!isAuthenticated && !hasPaidPurchase ? (
        <section className="rounded-[1.75rem] border border-blue-200 bg-blue-50 p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
            {copy.accountTitle}
          </div>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700">
            {copy.accountBody}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={`/${state}/login?mode=signup`}
              className="inline-flex rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700"
            >
              {copy.createAccount}
            </Link>
            <Link
              href={`/${state}/login`}
              className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-900 hover:bg-slate-100"
            >
              {copy.logIn}
            </Link>
          </div>
        </section>
      ) : null}

      {purchaseError ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          {purchaseError}
        </div>
      ) : null}

      {hasPaidPurchase && normalizedSupportTier === "standard" ? (
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 text-sm text-slate-700">
          <div className="font-semibold text-blue-900">{copy.currentPlan}</div>
          <div className="mt-2">{copy.currentPlanBody}</div>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        {plans.map((plan) => {
          const isPriority = plan.includesPrioritySupport
          const isUpgrade = plan.planKind === "support-upgrade"

          return (
            <div
              key={plan.planCode}
              className="glass-panel rounded-[2rem] border-[#dbe7ff] bg-white p-6 sm:p-7"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                      isUpgrade
                        ? "bg-emerald-50 text-emerald-700"
                        : isPriority
                        ? "bg-blue-50 text-blue-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {isUpgrade
                      ? copy.labelUpgrade
                      : isPriority
                      ? copy.labelPriority
                      : copy.labelStandard}
                  </div>

                  <h2 className="mt-4 text-3xl font-semibold text-slate-950">
                    {plan.displayName}
                  </h2>

                  <p className="mt-3 max-w-xl leading-7 text-slate-600">
                    {plan.planKind === "support-upgrade"
                      ? copy.supportUpgradeDescription
                      : plan.includesPrioritySupport
                      ? copy.priorityDescription
                      : copy.standardDescription}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-right">
                  <div className="text-3xl font-semibold text-slate-950">
                    {formatPriceFromCents(plan.priceCents, plan.currency)}
                  </div>
                  <div className="text-sm text-slate-500">{copy.oneTime}</div>
                </div>
              </div>

              <div className="mt-6 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-slate-600">{copy.fullCourseAccess}</span>
                  <span className="font-semibold text-slate-900">
                    {isUpgrade ? copy.alreadyIncluded : copy.included}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-slate-600">{copy.certificateEligibility}</span>
                  <span className="font-semibold text-slate-900">
                    {plan.includesCertificate ? copy.included : copy.unchanged}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-slate-600">{copy.supportTierLabel}</span>
                  <span className="font-semibold text-slate-900">
                    {isPriority ? copy.priority : copy.labelStandard}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  href={`/${state}/checkout/${plan.planCode}`}
                  className={`inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-center font-semibold text-white ${
                    isUpgrade
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : isPriority
                      ? "bg-slate-900 hover:bg-slate-800"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isUpgrade
                    ? copy.selectUpgrade
                    : isPriority
                    ? copy.selectPriority
                    : copy.selectStandard}
                </Link>

                <div className="text-center text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  {copy.planCode}: {plan.planCode}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="glass-panel rounded-[2rem] bg-white p-6 sm:p-7">
          <h2 className="text-2xl font-semibold text-slate-950">
            {hasPaidPurchase ? copy.upgradeProcess : copy.enrollmentProcess}
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {(hasPaidPurchase ? copy.processUpgrade : copy.processEnroll).map(
              ([title, body]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="font-semibold text-slate-900">{title}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-600">{body}</div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
            {copy.approvalLabel}
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">
            {copy.reviewTitle}
          </h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">
            {copy.reviewBody}
          </p>
          <div className="mt-5">
            <Link
              href={getDisclosuresRoute(state)}
              className="inline-flex rounded-xl border border-amber-300 bg-white px-4 py-2.5 font-semibold text-amber-900 hover:bg-amber-100"
            >
              {copy.reviewCta}
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href={`/${state}/course`}
          className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
        >
          {copy.backCourse}
        </Link>

        <Link
          href={`/${state}/support`}
          className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
        >
          {copy.questions}
        </Link>
      </div>
    </div>
  )
}
