import Link from "next/link"
import { redirect } from "next/navigation"
import PrintPacketButton from "@/components/admin/print-packet-button"
import { isAdminEmail } from "@/lib/admin-access"
import {
  FLORIDA_BDI_EXAM_CONTROLS,
  FLORIDA_BDI_MODULE_CONTENT,
  FLORIDA_BDI_MODULES,
  FLORIDA_BDI_TOPIC_MATRIX,
  FLORIDA_BDI_VALIDATION_CONTROLS,
} from "@/lib/florida-bdi-course-content"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

const remainingPacketItems = [
  "Florida foreign LLC registration filing details",
  "Florida registered agent details",
  "Pilot-jurisdiction declaration added to the completed application form",
  "Copyright and ownership attachment packaged for submission",
  "Final PDF and print review to preserve frozen page references",
]

const packetNotes = [
  "This printable packet summarizes the Florida BDI course structure, topic map, participation controls, and final-exam setup in reviewer-friendly form.",
  "The full 500-question bank and answer/page-reference package are maintained in the Florida BDI packet source documents and should be included as a separate submission attachment.",
  "Pilot-jurisdiction selection is Miami-Dade County (11th Judicial Circuit) for the initial technology-delivery approval path.",
]

export default async function FloridaApprovalPacketReviewerPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    redirect("/")
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 print:max-w-none">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm print:shadow-none">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Florida Submission Packet
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Florida Basic Driver Improvement Reviewer Packet
            </h1>
            <p className="mt-4 max-w-3xl leading-7 text-slate-700">
              This packet presents the current Florida BDI course structure,
              module outlines, topic-to-page map, validation controls, final
              exam setup, and pilot-jurisdiction notes in a format that is easy
              to print and package for review.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 print:hidden">
            <PrintPacketButton />
            <Link
              href="/admin/florida-approval-packet"
              className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Back to Florida Packet
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm print:shadow-none">
          <div className="text-sm text-slate-500">Modules</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">
            {FLORIDA_BDI_MODULES.length}
          </div>
        </div>
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm print:shadow-none">
          <div className="text-sm text-blue-700">Script pages</div>
          <div className="mt-2 text-3xl font-bold text-blue-900">18</div>
        </div>
        <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm print:shadow-none">
          <div className="text-sm text-green-700">Mapped topics</div>
          <div className="mt-2 text-3xl font-bold text-green-900">
            {FLORIDA_BDI_TOPIC_MATRIX.length}
          </div>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm print:shadow-none">
          <div className="text-sm text-amber-700">Question bank target</div>
          <div className="mt-2 text-3xl font-bold text-amber-900">
            {FLORIDA_BDI_EXAM_CONTROLS.questionBankSize}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm print:shadow-none">
        <h2 className="text-2xl font-semibold text-slate-900">
          1. Packet notes
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
          {packetNotes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm print:shadow-none">
        <h2 className="text-2xl font-semibold text-slate-900">
          2. Course structure overview
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          Script version: {FLORIDA_BDI_EXAM_CONTROLS.scriptVersion}
        </p>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600">
                <th className="py-3 pr-4 font-semibold">Module</th>
                <th className="py-3 pr-4 font-semibold">Title</th>
                <th className="py-3 pr-4 font-semibold">Script pages</th>
                <th className="py-3 font-semibold">Estimated minutes</th>
              </tr>
            </thead>
            <tbody>
              {FLORIDA_BDI_MODULES.map((module) => (
                <tr key={module.slug} className="border-b border-slate-100">
                  <td className="py-3 pr-4 font-medium text-slate-900">
                    {module.id}
                  </td>
                  <td className="py-3 pr-4 text-slate-700">{module.title}</td>
                  <td className="py-3 pr-4 text-slate-700">{module.pages}</td>
                  <td className="py-3 text-slate-700">
                    {module.estimatedMinutes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm print:shadow-none">
        <h2 className="text-2xl font-semibold text-slate-900">
          3. Module outlines
        </h2>
        <div className="mt-5 space-y-6">
          {FLORIDA_BDI_MODULES.map((module) => {
            const content = FLORIDA_BDI_MODULE_CONTENT[module.slug]
            if (!content) return null

            return (
              <article
                key={module.slug}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {module.title}
                  </h3>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                    Script pp. {content.scriptPages}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {content.intro}
                </p>
                <div className="mt-4 space-y-4">
                  {content.sections.map((section) => (
                    <div key={section.heading}>
                      <h4 className="font-semibold text-slate-900">
                        {section.heading}
                      </h4>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-7 text-slate-700">
                        {section.body.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                {content.validationNote ? (
                  <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
                    <span className="font-semibold">Validation note:</span>{" "}
                    {content.validationNote}
                  </div>
                ) : null}
              </article>
            )
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm print:shadow-none">
        <h2 className="text-2xl font-semibold text-slate-900">
          4. Validation controls and final exam setup
        </h2>
        <div className="mt-4 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="font-semibold text-slate-900">
              Student validation controls
            </h3>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700">
              {FLORIDA_BDI_VALIDATION_CONTROLS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <h3 className="font-semibold text-slate-900">
              Final exam documentation
            </h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
              <li>
                Question bank target:{" "}
                <span className="font-semibold text-slate-900">
                  {FLORIDA_BDI_EXAM_CONTROLS.questionBankSize} questions
                </span>
              </li>
              <li>
                Randomized final exam length:{" "}
                <span className="font-semibold text-slate-900">
                  {FLORIDA_BDI_EXAM_CONTROLS.finalExamQuestions} questions
                </span>
              </li>
              <li>
                Passing score:{" "}
                <span className="font-semibold text-slate-900">
                  {FLORIDA_BDI_EXAM_CONTROLS.passingScorePercent} percent
                </span>
              </li>
              <li>
                Integrity controls remain active through the final question.
              </li>
              <li>
                The full bank, answer key, and page-reference package are
                maintained in the Florida BDI packet source set and should be
                attached separately from this printable summary.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm print:shadow-none">
        <h2 className="text-2xl font-semibold text-slate-900">
          5. Topic-to-page reference matrix
        </h2>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600">
                <th className="py-3 pr-4 font-semibold">Topic family</th>
                <th className="py-3 pr-4 font-semibold">Specific requirement</th>
                <th className="py-3 pr-4 font-semibold">Module</th>
                <th className="py-3 font-semibold">Script pages</th>
              </tr>
            </thead>
            <tbody>
              {FLORIDA_BDI_TOPIC_MATRIX.map((row) => (
                <tr
                  key={`${row.family}-${row.topic}`}
                  className="border-b border-slate-100"
                >
                  <td className="py-3 pr-4 font-medium text-slate-900">
                    {row.family}
                  </td>
                  <td className="py-3 pr-4 text-slate-700">{row.topic}</td>
                  <td className="py-3 pr-4 text-slate-700">{row.module}</td>
                  <td className="py-3 text-slate-700">{row.pages}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm print:shadow-none">
        <h2 className="text-2xl font-semibold text-slate-900">
          6. Pilot and remaining packet items
        </h2>
        <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-amber-200 bg-white p-5">
            <h3 className="font-semibold text-slate-900">
              Pilot jurisdiction
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              {FLORIDA_BDI_EXAM_CONTROLS.pilotJurisdiction}
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              The packet assumes initial approval for a single-jurisdiction
              pilot, with statewide expansion deferred until the statistical
              study requirements are satisfied.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-white p-5">
            <h3 className="font-semibold text-slate-900">
              Remaining assembly items
            </h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
              {remainingPacketItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
