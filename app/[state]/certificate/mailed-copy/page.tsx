"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { getStudentIdentityProfile } from "@/lib/student-identity"
import {
  getCertificateMailPlanCode,
  getCertificateMailQuote,
  validateMailingAddress,
  type MailingAddress,
} from "@/lib/certificate-mail"
import { formatPriceFromCents } from "@/lib/payment/plans"
import { getCourseConfig } from "@/lib/course-config"

type CheckoutResponse =
  | { ok: true; url: string | null }
  | { ok: false; error: string }

const EMPTY_ADDRESS: MailingAddress = {
  firstName: "",
  lastName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "VA",
  postalCode: "",
  country: "US",
}

export default function MailedCertificateOrderPage() {
  const params = useParams()
  const searchParams = useSearchParams()

  const state =
    typeof params?.state === "string" ? params.state : "virginia"
  const certificateId = String(searchParams.get("certificateId") ?? "").trim()
  const config = getCourseConfig(state)
  const quote = getCertificateMailQuote()
  const planCode = getCertificateMailPlanCode(state)

  const [address, setAddress] = useState<MailingAddress>(EMPTY_ADDRESS)
  const [loadingIdentity, setLoadingIdentity] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadIdentity() {
      try {
        const profile = await getStudentIdentityProfile(state)

        if (!isMounted || !profile) {
          return
        }

        setAddress((current) => ({
          ...current,
          firstName: profile.first_name || current.firstName,
          lastName: profile.last_name || current.lastName,
        }))
      } catch (loadError) {
        console.error("Could not prefill mailing order identity:", loadError)
      } finally {
        if (isMounted) {
          setLoadingIdentity(false)
        }
      }
    }

    void loadIdentity()

    return () => {
      isMounted = false
    }
  }, [state])

  const handleFieldChange =
    (field: keyof MailingAddress) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      setAddress((current) => ({
        ...current,
        [field]: event.target.value,
      }))
    }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!certificateId) {
      setError("Missing certificate ID. Open this order page from your certificate screen.")
      return
    }

    try {
      setSubmitting(true)
      setError(null)
      validateMailingAddress(address)

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planCode,
          stateCode: state,
          certificateId,
          mailingAddress: address,
        }),
      })

      const data = (await response.json()) as CheckoutResponse

      if (!response.ok || !data.ok) {
        setError("error" in data ? data.error : "Could not prepare mailed certificate checkout.")
        return
      }

      if (!data.url) {
        setError("Stripe checkout URL was not returned.")
        return
      }

      window.location.href = data.url
    } catch (submitError) {
      console.error("Mailed certificate checkout failed:", submitError)
      setError("Could not prepare mailed certificate checkout.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <div className="section-label">{config.stateName} Certificate</div>
        <h1 className="mt-4 text-4xl font-semibold text-slate-950">
          Order a mailed certificate copy
        </h1>
        <p className="mt-3 max-w-3xl leading-8 text-slate-600">
          You can order a mailed letter copy of your certificate now or later.
          After payment, the order is sent to a third-party mail provider automatically.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="glass-panel rounded-[2rem] bg-white p-8">
          <h2 className="text-2xl font-semibold text-slate-950">
            Mailing address
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Enter the address where the mailed certificate copy should be sent.
          </p>

          {!certificateId ? (
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              Missing certificate ID. Return to your certificate page and use the mailed copy option from there.
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="First name"
                value={address.firstName}
                onChange={handleFieldChange("firstName")}
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                disabled={submitting || loadingIdentity}
              />
              <input
                type="text"
                placeholder="Last name"
                value={address.lastName}
                onChange={handleFieldChange("lastName")}
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                disabled={submitting || loadingIdentity}
              />
            </div>

            <input
              type="text"
              placeholder="Address line 1"
              value={address.addressLine1}
              onChange={handleFieldChange("addressLine1")}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
              disabled={submitting}
            />

            <input
              type="text"
              placeholder="Address line 2 (optional)"
              value={address.addressLine2 ?? ""}
              onChange={handleFieldChange("addressLine2")}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
              disabled={submitting}
            />

            <div className="grid gap-4 sm:grid-cols-[1.2fr_0.8fr_0.8fr]">
              <input
                type="text"
                placeholder="City"
                value={address.city}
                onChange={handleFieldChange("city")}
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                disabled={submitting}
              />
              <input
                type="text"
                placeholder="State"
                value={address.state}
                onChange={handleFieldChange("state")}
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                disabled={submitting}
              />
              <input
                type="text"
                placeholder="ZIP code"
                value={address.postalCode}
                onChange={handleFieldChange("postalCode")}
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                disabled={submitting}
              />
            </div>

            <select
              value={address.country}
              onChange={handleFieldChange("country")}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
              disabled={submitting}
            >
              <option value="US">United States</option>
            </select>

            {error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={submitting || !certificateId}
                className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {submitting ? "Preparing checkout..." : "Continue to Payment"}
              </button>

              <Link
                href={`/${state}/certificate`}
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Back to Certificate
              </Link>
            </div>
          </form>
        </section>

        <aside>
          <section className="glass-panel rounded-[2rem] bg-white p-8">
            <h2 className="text-2xl font-semibold text-slate-950">
              Order summary
            </h2>
            <div className="mt-5 space-y-4 text-sm text-slate-700">
              <div className="flex items-center justify-between gap-4">
                <span>Certificate copy price</span>
                <span className="font-semibold text-slate-950">
                  {formatPriceFromCents(quote.orderPriceCents)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Delivery method</span>
                <span className="font-semibold text-slate-950">
                  Standard mailed letter
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Address required</span>
                <span className="font-semibold text-slate-950">Yes</span>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}
