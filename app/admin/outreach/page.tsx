import Link from "next/link"
import { redirect } from "next/navigation"
import RegulatoryOutreachClient from "@/components/admin/RegulatoryOutreachClient"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"
import { isAdminEmail } from "@/lib/admin-access"

export const dynamic = "force-dynamic"

const floridaCriteriaBody = `Hello,

I am writing on behalf of Driver Course Platform LLC to request the minimum course content criteria for the following Florida driver improvement course types:

1. Basic Driver Improvement (BDI)
2. Advanced Driver Improvement (ADI)
3. Traffic Law and Substance Abuse Education (TLSAE)
4. Mature Driver Discount Insurance course

Requested company and contact information:

Company Name:
Driver Course Platform LLC

Business Address:
775 Red Hill Rd
Fairfield, VA 24435

Business Phone Number:
(877) 798-0235

Contact Person:
Ankur Fadia

Contact Person Phone Number:
(877) 798-0235

Contact Person Email Address:
admin@vadriverimprovementcourse.com

Requested return method:
Please return the minimum course content criteria by email.

We are preparing to develop and submit Florida online driver improvement courses and would like the minimum content criteria for all four course types listed above so that our development and submission materials can be prepared correctly.

Thank you,

Ankur Fadia
President
Driver Course Platform LLC
admin@vadriverimprovementcourse.com
(877) 798-0235`

const virginiaFeeClarificationBody = `Hello,

I am preparing the application packet for Driver Course Platform LLC and would like to confirm the correct enclosed payment amount for a combined submission involving:

- DI 14
- DIC 550
- DIC 551
- US 532 E/ER

Please confirm whether the correct total payment amount is:

- $240 total ($150 application fee + $25 Extranet fee + $65 RSA token fee)
or
- a different total amount

If separate checks are required, please also confirm the required breakdown and payee name.

Thank you,

Ankur Fadia
President
Driver Course Platform LLC
admin@vadriverimprovementcourse.com
(877) 798-0235`

const templates = [
  {
    id: "florida-criteria",
    title: "Florida course content criteria request",
    recipient: "Driver-Education@flhsmv.gov",
    subject:
      "Request for Minimum Course Content Criteria for Florida Driver Improvement Courses",
    note:
      "Use this to request the official minimum course content criteria for BDI, ADI, TLSAE, and Mature Driver from FLHSMV.",
    body: floridaCriteriaBody,
  },
  {
    id: "virginia-fee-clarification",
    title: "Virginia fee clarification",
    recipient: "dmvclu@dmv.virginia.gov",
    subject: "Fee confirmation for online driver improvement application packet",
    note:
      "Use this if you want written DMV confirmation of the Virginia payment total before mailing the packet.",
    body: virginiaFeeClarificationBody,
  },
]

export default async function AdminOutreachPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    redirect("/")
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Admin
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            Regulatory Outreach
          </h1>
          <p className="mt-2 max-w-3xl text-slate-600">
            Open prewritten outreach drafts for state regulators and approval
            follow-up without depending on Gmail plugin permissions.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/approval-packet"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Approval Packet
          </Link>
          <Link
            href="/admin/operations"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Operations
          </Link>
        </div>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          One-click outreach drafts
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Each button opens a prefilled Gmail compose window in the browser.
          You can review and send from your normal Gmail session.
        </p>

        <div className="mt-5">
          <RegulatoryOutreachClient templates={templates} />
        </div>
      </section>
    </div>
  )
}
