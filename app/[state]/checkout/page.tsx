"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import {
  formatPriceFromCents,
  getAvailableCoursePlans,
  getCoursePlanByCode,
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

function getPlanPresentation(planCode: string, language: "en" | "es") {
  if (language === "es") {
    switch (planCode) {
      case "va-priority":
        return {
          marketingTitle: "Curso + Soporte Prioritario",
          audience:
            "Ideal para estudiantes con fecha limite o que quieren ayuda mas rapida.",
          bullets: [
            "Curso completo de Virginia",
            "Elegibilidad para certificado despues de cumplir todos los requisitos",
            "Soporte prioritario con primera respuesta humana normalmente en menos de 1 dia habil",
          ],
          highlight: "Mejor valor",
        }
      case "va-premium-bundle":
        return {
          marketingTitle: "Paquete Premium",
          audience:
            "Ideal para estudiantes dirigidos por la corte o para quienes quieren la opcion mas completa desde el inicio.",
          bullets: [
            "Curso completo de Virginia",
            "Soporte prioritario con respuestas humanas mas rapidas",
            "Revision administrativa de documentos de la corte",
            "Una copia del certificado enviada por correo despues de completar el curso",
          ],
          highlight: "Todo incluido",
        }
      case "va-standard":
        return {
          marketingTitle: "Curso Estandar",
          audience:
            "Ideal para estudiantes que quieren el curso completo al precio mas bajo.",
          bullets: [
            "Curso completo de Virginia",
            "Elegibilidad para certificado despues de cumplir todos los requisitos",
            "Soporte estandar con ayuda inicial por IA",
          ],
          highlight: null,
        }
      case "va-court-review":
        return {
          marketingTitle: "Revision de Documentos Judiciales",
          audience:
            "Ideal para estudiantes dirigidos por la corte que quieren una revision administrativa adicional de sus documentos.",
          bullets: [
            "Revision administrativa de la informacion judicial cargada",
            "Ayuda para confirmar que los detalles judiciales clave parezcan completos",
            "No incluye asesoria legal ni garantiza resultados judiciales o del DMV",
          ],
          highlight: null,
        }
      default:
        return {
          marketingTitle: "Mejora a Soporte Prioritario",
          audience: "Solo para cuentas que ya compraron el curso estandar.",
          bullets: [
            "Convierte una compra estandar en soporte prioritario",
            "Tus solicitudes pasan al frente de la cola estandar",
            "Mantienes el mismo acceso al curso y al certificado",
          ],
          highlight: null,
        }
    }
  }

  switch (planCode) {
    case "va-priority":
      return {
        marketingTitle: "Course + Priority Support",
        audience:
          "Best for students on a deadline or students who want faster help.",
        bullets: [
          "Full Virginia course access",
          "Certificate eligibility after all course requirements are met",
          "Priority support with a first human response usually in less than 1 business day",
        ],
        highlight: "Best value",
      }
    case "va-premium-bundle":
      return {
        marketingTitle: "Premium Bundle",
        audience:
          "Best for court-directed students or anyone who wants the most complete option from the start.",
        bullets: [
          "Full Virginia course access",
          "Priority support with faster human responses",
          "Administrative court document review",
          "One mailed certificate copy after successful completion",
        ],
        highlight: "All-in-one",
      }
    case "va-standard":
      return {
        marketingTitle: "Standard Course",
        audience:
          "Best for students who want the full course at the lowest price.",
        bullets: [
          "Full Virginia course access",
          "Certificate eligibility after all course requirements are met",
          "Standard support with AI help first",
        ],
        highlight: null,
      }
    case "va-court-review":
      return {
        marketingTitle: "Court Document Review",
        audience:
          "Best for court-directed students who want an extra administrative review of their uploaded court details.",
        bullets: [
          "Administrative review of uploaded court details",
          "Helps confirm key court information appears complete",
          "Does not include legal advice or guarantee court or DMV outcomes",
        ],
        highlight: null,
      }
    default:
      return {
        marketingTitle: "Priority Support Upgrade",
        audience:
          "Only for accounts that already purchased the standard course.",
        bullets: [
          "Upgrades an existing standard purchase to priority support",
          "Moves your requests ahead of standard support",
          "Keeps the same course and certificate access",
        ],
        highlight: null,
      }
  }
}

function getPlanFeatureValues(planCode: string, language: "en" | "es") {
  const yes = language === "es" ? "Incluido" : "Included"
  const no = language === "es" ? "No incluido" : "Not included"
  const standard = language === "es" ? "Estandar" : "Standard"
  const priority = language === "es" ? "Prioritario" : "Priority"
  const sameCourse = language === "es" ? "Ya incluido" : "Already included"
  const unchanged = language === "es" ? "Sin cambios" : "Unchanged"

  switch (planCode) {
    case "va-premium-bundle":
      return {
        courseAccess: yes,
        certificate: yes,
        support: priority,
        courtReview: yes,
        mailedCertificate: yes,
      }
    case "va-priority":
      return {
        courseAccess: yes,
        certificate: yes,
        support: priority,
        courtReview: no,
        mailedCertificate: no,
      }
    case "va-standard":
      return {
        courseAccess: yes,
        certificate: yes,
        support: standard,
        courtReview: no,
        mailedCertificate: no,
      }
    case "va-priority-upgrade":
      return {
        courseAccess: sameCourse,
        certificate: unchanged,
        support: priority,
        courtReview: no,
        mailedCertificate: no,
      }
    case "va-court-review":
      return {
        courseAccess: sameCourse,
        certificate: unchanged,
        support: standard,
        courtReview: yes,
        mailedCertificate: no,
      }
    default:
      return {
        courseAccess: no,
        certificate: no,
        support: standard,
        courtReview: no,
        mailedCertificate: no,
      }
  }
}

function getPlanPriceLabel(planCode: string) {
  const plan = getCoursePlanByCode(planCode)

  if (!plan) {
    return ""
  }

  return formatPriceFromCents(plan.priceCents, plan.currency)
}

export default function StateCheckoutPage() {
  const params = useParams()

  const state =
    typeof params?.state === "string" ? params.state : "virginia"
  const config = getCourseConfig(state)
  const enrollmentOpen = config.enrollmentOpen
  const language = usePreferredSiteLanguageClient()

  const [checkingPurchase, setCheckingPurchase] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasPaidPurchase, setHasPaidPurchase] = useState(false)
  const [purchasePlanCode, setPurchasePlanCode] = useState<string | null>(null)
  const [purchaseSupportTier, setPurchaseSupportTier] = useState<string | null>(null)
  const [purchaseError, setPurchaseError] = useState("")

  const stateDisplayName = useMemo(() => getStateDisplayName(state), [state])
  const normalizedSupportTier = normalizeSupportTier(purchaseSupportTier)
  const priorityUpgradePrice = useMemo(() => getPlanPriceLabel("va-priority-upgrade"), [])
  const mailedCertificatePrice = useMemo(() => getPlanPriceLabel("va-mailed-certificate"), [])
  const courtReviewPrice = useMemo(() => getPlanPriceLabel("va-court-review"), [])
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
            "Elige una opcion abajo. El pago se completa de forma segura con Stripe.",
          compareLabel: "Elige la opcion que mejor se adapte a ti",
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
          labelBundle: "Paquete",
          labelUpgrade: "Mejora",
          labelPriority: "Soporte prioritario",
          labelStandard: "Estandar",
          supportUpgradeDescription:
            "Mejora una compra estandar existente a soporte prioritario.",
          priorityDescription:
            "Incluye el curso completo, elegibilidad para certificado y soporte prioritario.",
          standardDescription:
            "Incluye el curso completo y elegibilidad para certificado.",
          priorityPricingDetail:
            "Compra ahora y ahorra $5 frente a comprar el curso estandar y la mejora despues.",
          bundlePricingDetail:
            "Ahorra $9.97 frente a comprar estos extras por separado despues.",
          courtReviewPricingDetail:
            "Disponible despues de comprar el curso.",
          standardPricingDetail:
            "Puedes agregar extras despues si los necesitas.",
          oneTime: "pago unico",
          fullCourseAccess: "Acceso completo al curso",
          alreadyIncluded: "Ya incluido",
          included: "Incluido",
          notIncluded: "No incluido",
          certificateEligibility: "Elegibilidad para certificado",
          unchanged: "Sin cambios",
          supportTierLabel: "Nivel de soporte",
          courtReviewLabel: "Revision de documentos judiciales",
          mailedCertificateLabel: "Copia del certificado por correo",
          prioritySupportInfo:
            "Las preguntas y solicitudes con soporte prioritario se atienden antes que las solicitudes estandar y normalmente reciben la primera respuesta en menos de 1 dia habil.",
          standardSupportInfo:
            "El soporte estandar incluye FAQ y chat con IA. Para soporte humano, el estudiante debe mejorar a soporte prioritario.",
          optionalAddOns: "Complementos opcionales",
          addOnsBody:
            "Estos extras pueden comprarse despues del curso base.",
          addOnMail: "Copia del certificado por correo",
          addOnMailBody:
            "Compra despues de completar el curso exitosamente.",
          addOnUpgrade: "Mejora a soporte prioritario",
          addOnUpgradeBody:
            "Para soporte humano mas rapido.",
          addOnCourt: "Revision de Documentos Judiciales",
          addOnCourtBody:
            "Revision administrativa adicional para estudiantes dirigidos por la corte.",
          boughtLater: "Si se compra despues",
          selectBundle: "Elegir premium",
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
          priceMatchTitle: "Proteccion de precio",
          priceMatchBody:
            "Si encuentras un precio publico mas bajo para un curso equivalente de mejoramiento de manejo de Virginia en linea, contactanos antes de comprar y revisaremos una posible igualacion de precio.",
          priceMatchNote:
            "Las revisiones de igualacion de precio no incluyen cupones privados, promociones vencidas, paquetes, ofertas ocultas ni cursos no equivalentes.",
          priceMatchCta: "Solicitar igualacion de precio",
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
            "Choose an option below. Payment is completed securely through Stripe.",
          compareLabel: "Choose the option that fits you best",
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
          labelBundle: "Bundle",
          labelUpgrade: "Upgrade",
          labelPriority: "Priority Support",
          labelStandard: "Standard",
          supportUpgradeDescription:
            "Upgrades an existing standard purchase to priority support.",
          priorityDescription:
            "Includes the full course, certificate eligibility, and priority support.",
          standardDescription:
            "Includes the full course and certificate eligibility.",
          priorityPricingDetail:
            "Buy now and save $5 compared with buying standard first and upgrading later.",
          bundlePricingDetail:
            "Save $9.97 compared with buying these extras separately later.",
          courtReviewPricingDetail:
            "Available after course purchase.",
          standardPricingDetail:
            "Add extras later only if you need them.",
          oneTime: "one-time payment",
          fullCourseAccess: "Full course access",
          alreadyIncluded: "Already included",
          included: "Included",
          notIncluded: "Not included",
          certificateEligibility: "Certificate eligibility",
          unchanged: "Unchanged",
          supportTierLabel: "Support tier",
          courtReviewLabel: "Court document review",
          mailedCertificateLabel: "Mailed certificate copy",
          prioritySupportInfo:
            "Priority support questions and requests are handled before any standard ones and usually receive a first response in less than 1 business day.",
          standardSupportInfo:
            "Standard support includes FAQ and AI chat. Human support requires a priority support upgrade.",
          optionalAddOns: "Optional add-ons",
          addOnsBody:
            "These extras can be purchased later after the base course.",
          addOnMail: "Mailed Certificate Copy",
          addOnMailBody:
            "Buy after successful completion.",
          addOnUpgrade: "Priority Support Upgrade",
          addOnUpgradeBody:
            "For faster human support.",
          addOnCourt: "Court Document Review",
          addOnCourtBody:
            "Extra administrative review for court-directed students.",
          boughtLater: "If purchased later",
          selectBundle: "Select Premium",
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
          priceMatchTitle: "Price-match protection",
          priceMatchBody:
            "If you find a lower publicly advertised price for an equivalent Virginia online driver improvement course, contact us before purchase and we will review it for a possible price match.",
          priceMatchNote:
            "Price-match reviews do not include private coupon codes, expired promotions, bundles, hidden-fee offers, or nonequivalent courses.",
          priceMatchCta: "Request Price Match",
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

  if (!enrollmentOpen) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <section className="glass-panel rounded-[2rem] border-[#dbe7ff] bg-white p-7 sm:p-8">
          <div className="section-label">{stateDisplayName} Checkout</div>
          <h1 className="text-4xl font-semibold text-slate-950">
            {language === "es"
              ? `La inscripcion para ${stateDisplayName} aun no esta abierta`
              : `${stateDisplayName} enrollment is not open yet`}
          </h1>
          <p className="mt-4 max-w-3xl leading-8 text-slate-600">
            {language === "es"
              ? `Los planes, precios y complementos finales para ${stateDisplayName} se publicaran cuando la aprobacion estatal y los requisitos del curso esten listos.`
              : `Final plans, pricing, and add-ons for ${stateDisplayName} will be published after the state-specific approval and course requirements are ready.`}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={getDisclosuresRoute(state)}
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              {copy.reviewCta}
            </Link>
            <Link
              href={`/${state}`}
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              {language === "es" ? `Volver a ${stateDisplayName}` : `Back to ${stateDisplayName}`}
            </Link>
          </div>
        </section>
      </div>
    )
  }

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

  if (hasPaidPurchase && normalizedSupportTier === "priority" && plans.length === 0) {
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
        <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            {copy.priceMatchTitle}
          </div>
          <p className="mt-2 text-sm leading-7 text-slate-700">
            {copy.priceMatchBody}
          </p>
          <p className="mt-2 text-xs leading-6 text-slate-500">
            {copy.priceMatchNote}
          </p>
          <Link
            href={`/${state}/price-match`}
            className="mt-3 inline-flex rounded-xl border border-emerald-300 bg-white px-4 py-2 font-semibold text-emerald-900 hover:bg-emerald-100"
          >
            {copy.priceMatchCta}
          </Link>
        </div>
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

      <section className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          {copy.compareLabel}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {plans.map((plan) => {
          const isBundle = plan.planCode === "va-premium-bundle"
          const isCourtReview = plan.planCode === "va-court-review"
          const isPriority = plan.includesPrioritySupport
          const isUpgrade = plan.planKind === "support-upgrade"
          const presentation = getPlanPresentation(plan.planCode, language)
          const featureValues = getPlanFeatureValues(plan.planCode, language)

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
                        : isBundle
                        ? "bg-amber-50 text-amber-700"
                        : isPriority
                        ? "bg-blue-50 text-blue-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {isUpgrade
                      ? copy.labelUpgrade
                      : isBundle
                      ? copy.labelBundle
                      : isPriority
                      ? copy.labelPriority
                      : copy.labelStandard}
                  </div>

                  <h2 className="mt-4 text-3xl font-semibold text-slate-950">
                    {presentation.marketingTitle}
                  </h2>

                  <p className="mt-3 max-w-xl leading-7 text-slate-600">
                    {presentation.audience}
                  </p>

                  {presentation.highlight ? (
                    <div className="mt-3 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                      {presentation.highlight}
                    </div>
                  ) : null}

                  {plan.planKind === "full-course" && plan.includesPrioritySupport ? (
                    <p className="mt-3 max-w-xl text-sm leading-6 text-blue-700">
                      {isBundle ? copy.bundlePricingDetail : copy.priorityPricingDetail}
                    </p>
                  ) : null}

                  {plan.planKind === "full-course" && !plan.includesPrioritySupport ? (
                    <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                      {copy.standardPricingDetail}
                    </p>
                  ) : null}

                  {isCourtReview ? (
                    <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                      {copy.courtReviewPricingDetail}
                    </p>
                  ) : null}
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
                    {featureValues.courseAccess}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-slate-600">{copy.certificateEligibility}</span>
                  <span className="font-semibold text-slate-900">
                    {featureValues.certificate}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-slate-600">{copy.supportTierLabel}</span>
                  {isPriority ? (
                    <details className="text-right">
                      <summary className="cursor-pointer list-none font-semibold text-slate-900 underline decoration-dotted underline-offset-4">
                        {copy.priority}
                      </summary>
                      <div className="mt-2 max-w-xs rounded-xl border border-blue-200 bg-blue-50 p-3 text-left text-xs leading-5 text-blue-900">
                        {copy.prioritySupportInfo}
                      </div>
                    </details>
                  ) : (
                    <details className="text-right">
                      <summary className="cursor-pointer list-none font-semibold text-slate-900 underline decoration-dotted underline-offset-4">
                        {copy.labelStandard}
                      </summary>
                        <div className="mt-2 max-w-xs rounded-xl border border-slate-200 bg-white p-3 text-left text-xs leading-5 text-slate-700">
                          {copy.standardSupportInfo}
                        </div>
                      </details>
                  )}
                </div>

                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-slate-600">{copy.courtReviewLabel}</span>
                  <span className="font-semibold text-slate-900">
                    {featureValues.courtReview}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-slate-600">{copy.mailedCertificateLabel}</span>
                  <span className="font-semibold text-slate-900">
                    {featureValues.mailedCertificate}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  href={`/${state}/checkout/${plan.planCode}`}
                  className={`inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-center font-semibold text-white ${
                    isUpgrade
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : isBundle
                      ? "bg-amber-600 hover:bg-amber-700"
                      : isPriority
                      ? "bg-slate-900 hover:bg-slate-800"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isUpgrade
                    ? copy.selectUpgrade
                    : isBundle
                    ? copy.selectBundle
                    : isPriority
                    ? copy.selectPriority
                    : copy.selectStandard}
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {!hasPaidPurchase ? (
        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-semibold text-slate-950">
            {copy.optionalAddOns}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            {copy.addOnsBody}
          </p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-semibold text-slate-900">{copy.addOnMail}</div>
                  <div className="text-sm font-semibold text-slate-900">
                    {mailedCertificatePrice}
                  </div>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {copy.addOnMailBody}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                  {copy.boughtLater}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-semibold text-slate-900">{copy.addOnUpgrade}</div>
                  <div className="text-sm font-semibold text-slate-900">
                    {priorityUpgradePrice}
                  </div>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {copy.addOnUpgradeBody}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                  {copy.boughtLater}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-semibold text-slate-900">{copy.addOnCourt}</div>
                  <div className="text-sm font-semibold text-slate-900">
                    {courtReviewPrice}
                  </div>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {copy.addOnCourtBody}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                  {copy.boughtLater}
                </p>
              </div>
            </div>
        </section>
      ) : null}

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
