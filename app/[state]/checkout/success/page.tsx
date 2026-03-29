"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePreferredSiteLanguageClient } from "@/lib/site-language-client";

type SuccessPageProps = {
  params: Promise<{
    state: string;
  }>;
  searchParams?: Promise<{
    session_id?: string;
  }>;
};

type ConfirmResponse = {
  ok: boolean;
  error?: string;
  accessGranted?: boolean;
  purchase?: {
    id: string;
    state_code: string;
    plan_code: string;
    support_tier: string;
    purchase_status: string;
    amount_total: number | null;
    currency: string | null;
    stripe_checkout_session_id: string;
  };
};

function formatStateName(state: string) {
  return state.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

async function safeReadConfirmResponse(response: Response): Promise<ConfirmResponse> {
  const rawText = await response.text();

  if (!rawText) {
    return {
      ok: false,
      error: `Empty response from checkout confirmation route (HTTP ${response.status}).`,
    };
  }

  try {
    return JSON.parse(rawText) as ConfirmResponse;
  } catch {
    return {
      ok: false,
      error: `Invalid response from checkout confirmation route (HTTP ${response.status}).`,
    };
  }
}

export default function CheckoutSuccessPage({
  params,
  searchParams,
}: SuccessPageProps) {
  const language = usePreferredSiteLanguageClient();
  const [stateCode, setStateCode] = useState("");
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmResult, setConfirmResult] = useState<ConfirmResponse | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadRouteData() {
      const resolvedParams = await params;
      const resolvedSearchParams = searchParams ? await searchParams : undefined;

      if (!isMounted) return;

      setStateCode(resolvedParams.state);
      setSessionId(resolvedSearchParams?.session_id);
    }

    loadRouteData();

    return () => {
      isMounted = false;
    };
  }, [params, searchParams]);

  useEffect(() => {
    let isMounted = true;

    async function confirmCheckout() {
      if (!stateCode) {
        return;
      }

      if (!sessionId) {
        setConfirmResult({
          ok: false,
          error: "Missing Stripe session ID in the success URL.",
        });
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        const response = await fetch(
          `/api/checkout/confirm?session_id=${encodeURIComponent(sessionId)}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const result = await safeReadConfirmResponse(response);

        if (!isMounted) return;

        setConfirmResult(result);
      } catch (error) {
        console.error("Checkout success confirmation error:", error);

        if (!isMounted) return;

        setConfirmResult({
          ok: false,
          error: "We could not verify your purchase automatically.",
        });
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    confirmCheckout();

    return () => {
      isMounted = false;
    };
  }, [stateCode, sessionId]);

  const dashboardHref = useMemo(
    () => (stateCode ? `/${stateCode}/dashboard` : "#"),
    [stateCode]
  );

  const courseHref = useMemo(
    () => (stateCode ? `/${stateCode}/course` : "#"),
    [stateCode]
  );

  const stateDisplayName = stateCode ? formatStateName(stateCode) : "Driver Improvement";
  const isMailOrder =
    confirmResult?.purchase?.plan_code === "va-mailed-certificate";
  const copy =
    language === "es"
      ? {
          labelMail: "Pedido postal recibido",
          labelPayment: "Pago correcto",
          titleMail: `Tu pedido postal del certificado de ${stateDisplayName} esta completo`,
          titlePayment: `Tu compra del curso de mejoramiento para conductores de ${stateDisplayName} esta completa`,
          introMail:
            "Gracias. Ahora estamos verificando el pago y enviando el pedido del certificado postal.",
          introPayment:
            "Gracias. Ahora estamos verificando tu pago y activando el acceso para esta cuenta.",
          activation: "Estado de activacion",
          loadingSteps: [
            "Estamos confirmando los detalles de tu pago.",
            "Estamos asociando esta compra a tu cuenta.",
            "Tu acceso al curso estara listo en un momento.",
          ],
          successMail: [
            "1. Pago verificado correctamente.",
            "2. El pedido postal del certificado se guardo en tu cuenta.",
            "3. El pedido fue enviado para impresion y correo.",
          ],
          successCourse: [
            "1. Pago verificado correctamente.",
            "2. La compra se guardo en tu cuenta.",
            "3. El acceso al curso ya esta activo.",
          ],
          failureOne:
            "La pagina de pago se cargo, pero la activacion automatica no termino.",
          failureTwo:
            "Puedes ir a tu panel e intentarlo de nuevo, o usar soporte si el acceso no aparece.",
          startCourse: "Comenzar curso",
          backCertificate: "Volver al certificado",
          goDashboard: "Ir al panel",
        }
      : {
          labelMail: "Mail order received",
          labelPayment: "Payment successful",
          titleMail: `Your ${stateDisplayName} mailed certificate order is complete`,
          titlePayment: `Your ${stateDisplayName} driver improvement purchase is complete`,
          introMail:
            "Thank you. We are now verifying payment and submitting the mailed certificate order.",
          introPayment:
            "Thank you. We are now verifying your payment and activating access for this account.",
          activation: "Activation status",
          loadingSteps: [
            "We are confirming your checkout details.",
            "We are attaching this purchase to your account.",
            "Your course access will be ready in a moment.",
          ],
          successMail: [
            "1. Payment verified successfully.",
            "2. Mailed certificate order saved to your account.",
            "3. The order was submitted for mailing.",
          ],
          successCourse: [
            "1. Payment verified successfully.",
            "2. Purchase saved to your account.",
            "3. Course access is now active.",
          ],
          failureOne:
            "Your payment page loaded, but automatic activation did not finish.",
          failureTwo:
            "You can go to your dashboard and try again, or contact support if access does not appear.",
          startCourse: "Start course",
          backCertificate: "Back to certificate",
          goDashboard: "Go to dashboard",
        };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
          <div className="border-b border-emerald-100 bg-emerald-50 px-6 py-5">
            <div className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              {isMailOrder ? copy.labelMail : copy.labelPayment}
            </div>
            <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
              {isMailOrder ? copy.titleMail : copy.titlePayment}
            </h1>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              {isMailOrder ? copy.introMail : copy.introPayment}
            </p>
          </div>

          <div className="px-6 py-6">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                {copy.activation}
              </h2>

              {isLoading ? (
                <div className="mt-3 space-y-3 text-sm text-slate-700 sm:text-base">
                  {copy.loadingSteps.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              ) : confirmResult?.ok ? (
                <div className="mt-3 space-y-3 text-sm text-slate-700 sm:text-base">
                  {(isMailOrder ? copy.successMail : copy.successCourse).map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              ) : (
                <div className="mt-3 space-y-3 text-sm text-slate-700 sm:text-base">
                  <p>{copy.failureOne}</p>
                  <p>{copy.failureTwo}</p>
                </div>
              )}
            </div>

            {!isLoading && !confirmResult?.ok ? (
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                {confirmResult?.error ?? "We could not verify this purchase automatically."}
              </div>
            ) : null}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {confirmResult?.ok ? (
                <Link
                  href={isMailOrder ? `${stateCode ? `/${stateCode}/certificate` : "#"}` : courseHref}
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  {isMailOrder ? copy.backCertificate : copy.startCourse}
                </Link>
              ) : (
                <Link
                  href={dashboardHref}
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  {copy.goDashboard}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
