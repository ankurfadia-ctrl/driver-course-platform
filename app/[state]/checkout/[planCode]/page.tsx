"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  formatPriceFromCents,
  getCoursePlanByCode,
  getPlanEligibility,
  type SupportTier,
} from "@/lib/payment/plans"
import { getCourseConfig, getDisclosuresRoute } from "@/lib/course-config"
import { getCourseAccessStatus } from "@/lib/course-access"
import { usePreferredSiteLanguageClient } from "@/lib/site-language-client"

type CheckoutApiSuccess = {
  ok: true
  url: string | null
}

type CheckoutApiError = {
  ok: false
  error: string
  alreadyPurchased?: boolean
  redirectTo?: string
}

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

export default function StatePlanCheckoutPage() {
  const params = useParams()
  const router = useRouter()

  const state =
    typeof params?.state === "string" ? params.state : "virginia"
  const config = getCourseConfig(state)
  const language = usePreferredSiteLanguageClient()

  const planCode =
    typeof params?.planCode === "string" ? params.planCode : ""

  const [loadingCheckout, setLoadingCheckout] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [checkingPurchase, setCheckingPurchase] = useState(true)
  const [hasPaidPurchase, setHasPaidPurchase] = useState(false)
  const [purchaseSupportTier, setPurchaseSupportTier] = useState<string | null>(null)
  const [purchaseError, setPurchaseError] = useState("")

  const stateDisplayName = useMemo(() => getStateDisplayName(state), [state])
  const normalizedSupportTier = normalizeSupportTier(purchaseSupportTier)
  const plan = useMemo(() => getCoursePlanByCode(planCode), [planCode])
  const copy =
    language === "es"
      ? {
          checking: "Verificando compra...",
          invalidPlan: "Plan no valido",
          notAvailable: "Compra no disponible",
          notAvailableBody:
            `Esta compra no esta disponible para la cuenta de ${stateDisplayName}.`,
          returnCheckout: "Volver al pago",
          sectionLabel: `${stateDisplayName} pago`,
          supportUpgradeBody:
            "Esta mejora mantiene activo el acceso al curso y cambia tu nivel de soporte a prioritario despues del pago.",
          approvalLabel: "Aprobacion pendiente",
          approvalBody:
            "Antes de pagar, confirma que este curso en linea es aceptable para tu requisito especifico en Virginia. Revisa la informacion sobre identidad, tiempo del curso y reglas del examen.",
          disclosuresCta: "Leer informacion del curso",
          continuePayment: "Continuar al pago",
          preparing: "Preparando pago...",
          prepareError: "No se pudo preparar el pago. Intentalo de nuevo.",
        }
      : {
          checking: "Checking purchase...",
          invalidPlan: "Invalid plan",
          notAvailable: "Purchase not available",
          notAvailableBody:
            `This purchase is not available for the ${stateDisplayName} account.`,
          returnCheckout: "Return to Checkout",
          sectionLabel: `${stateDisplayName} Checkout`,
          supportUpgradeBody:
            "This upgrade keeps your course access active and changes your support tier to priority after payment.",
          approvalLabel: config.approvalStatusLabel,
          approvalBody:
            "Before paying, confirm that this online course is acceptable for your specific Virginia requirement. Review disclosures for identity, seat-time, and exam rules.",
          disclosuresCta: "Read course information",
          continuePayment: "Continue to Payment",
          preparing: "Preparing checkout...",
          prepareError: "Could not prepare checkout. Please try again.",
        }

  const planMatchesState =
    plan &&
    plan.stateCode === state &&
    plan.courseSlug === "driver-improvement" &&
    plan.active

  const eligibility = useMemo(() => {
    if (!plan || !planMatchesState) {
      return null
    }

    return getPlanEligibility(plan, {
      hasPaidAccess: hasPaidPurchase,
      supportTier: normalizedSupportTier,
    })
  }, [plan, planMatchesState, hasPaidPurchase, normalizedSupportTier])

  useEffect(() => {
    let isMounted = true

    async function checkExistingPurchase() {
      try {
        setCheckingPurchase(true)
        setPurchaseError("")

        const access = await getCourseAccessStatus(state)

        if (!isMounted) return

        if (access.hasPaidAccess) {
          setHasPaidPurchase(true)
          setPurchaseSupportTier(access.supportTier)
        } else {
          setHasPaidPurchase(false)
          setPurchaseSupportTier(null)
        }

        setPurchaseError(access.error ?? "")
      } finally {
        if (isMounted) setCheckingPurchase(false)
      }
    }

    void checkExistingPurchase()

    return () => {
      isMounted = false
    }
  }, [state])

  async function handleContinueToPayment() {
    if (!plan || !planMatchesState || loadingCheckout || !eligibility?.allowed) {
      return
    }

    try {
      setLoadingCheckout(true)
      setCheckoutError(null)

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planCode: plan.planCode,
          stateCode: state,
        }),
      })

      const data = (await response.json()) as
        | CheckoutApiSuccess
        | CheckoutApiError

      if (!response.ok || !data.ok) {
        if ("alreadyPurchased" in data && data.alreadyPurchased) {
          const redirectTo = data.redirectTo || `/${state}/course`
          router.push(redirectTo)
          return
        }

        setCheckoutError("error" in data ? data.error : copy.prepareError)
        return
      }

      if (!data.url) {
        setCheckoutError("Stripe checkout URL was not returned.")
        return
      }

      window.location.href = data.url
    } catch (error) {
      console.error("Checkout handoff failed:", error)
      setCheckoutError(copy.prepareError)
    } finally {
      setLoadingCheckout(false)
    }
  }

  if (checkingPurchase) {
    return <div className="p-6">{copy.checking}</div>
  }

  if (!plan || !planMatchesState) {
    return <div className="p-6">{copy.invalidPlan}</div>
  }

  if (!eligibility?.allowed) {
    return (
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">{copy.notAvailable}</h1>
        <p>{eligibility?.reason ?? copy.notAvailableBody}</p>
        {purchaseError ? <div className="text-sm text-amber-700">{purchaseError}</div> : null}
        <Link href={`/${state}/checkout`} className="text-blue-600 underline">
          {copy.returnCheckout}
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
          {copy.sectionLabel}
        </div>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{plan.displayName}</h1>
      </div>

      <div className="text-lg font-semibold text-slate-900">
        {formatPriceFromCents(plan.priceCents, plan.currency)}
      </div>

      {plan.planKind === "support-upgrade" ? (
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-slate-700">
          {copy.supportUpgradeBody}
        </div>
      ) : null}

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-slate-700">
        <div className="font-semibold text-amber-800">{copy.approvalLabel}</div>
        <p className="mt-2">{copy.approvalBody}</p>
        <Link
          href={getDisclosuresRoute(state)}
          className="mt-3 inline-flex font-semibold text-amber-900 underline"
        >
          {copy.disclosuresCta}
        </Link>
      </div>

      <button
        onClick={handleContinueToPayment}
        className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        {loadingCheckout ? copy.preparing : copy.continuePayment}
      </button>

      {checkoutError && <div className="text-red-600">{checkoutError}</div>}
    </div>
  )
}
