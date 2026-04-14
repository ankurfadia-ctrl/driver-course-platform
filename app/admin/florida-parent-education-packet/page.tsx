import Link from "next/link"
import { redirect } from "next/navigation"
import { isAdminEmail } from "@/lib/admin-access"
import { FLORIDA_PARENT_EDUCATION_GUIDEBOOK } from "@/lib/florida-parent-education-course-content"
import { FLORIDA_PARENT_EDUCATION_PACKET_DRAFTS } from "@/lib/florida-parent-education-packet-drafts"
import { FLORIDA_PARENT_EDUCATION_PACKET } from "@/lib/florida-parent-education-packet"
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export default async function FloridaParentEducationPacketPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || !isAdminEmail(user.email)) {
    redirect("/")
  }

  const packet = FLORIDA_PARENT_EDUCATION_PACKET
  const guidebook = FLORIDA_PARENT_EDUCATION_GUIDEBOOK
  const drafts = FLORIDA_PARENT_EDUCATION_PACKET_DRAFTS

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Admin
          </p>
          <h1 className="text-3xl font-bold text-slate-900">{packet.title}</h1>
          <p className="mt-2 max-w-3xl text-slate-600">{packet.summary}</p>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 shadow-sm">
          <div className="text-sm text-blue-700">Submission target</div>
          <div className="mt-1 text-lg font-semibold text-blue-900">
            parentstabilizationcourse@myflfamilies.com
          </div>
          <div className="mt-2 text-sm leading-6 text-slate-700">
            DCF asks for a digital packet by email and states a 30-working-day
            review window on the provider page.
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Provider profile
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
            {packet.providerProfile.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-green-200 bg-green-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Recommended launch profile
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
            {packet.recommendedLaunchProfile.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Locked working assumptions</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
            <p>
              <span className="font-semibold text-slate-900">Standard course fee:</span>{" "}
              {drafts.standardCourseFee}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Designated initial responder:</span>{" "}
              {drafts.designatedResponder}
            </p>
          </div>
        </article>
        <article className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Why this fee policy stays paid</h2>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            The packet now assumes a standard paid course with a documented-hardship
            review path only. That satisfies the Florida indigent-access discussion
            without turning the product into a free-for-all.
          </p>
        </article>
      </section>

      <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          {drafts.instructorQualificationMemoTitle}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">
          {drafts.instructorQualificationMemoSummary}
        </p>
        <div className="mt-4 space-y-3 rounded-2xl border border-amber-200 bg-white p-5 text-sm leading-7 text-slate-700">
          {drafts.instructorQualificationMemo.map((paragraph, index) =>
            paragraph ? (
              <p key={`${index}-${paragraph.slice(0, 24)}`}>{paragraph}</p>
            ) : (
              <div key={`spacer-${index}`} className="h-1" />
            )
          )}
        </div>
      </section>

      <section className="rounded-3xl border border-sky-200 bg-sky-50 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          {drafts.instructorCredentialAttachmentSetTitle}
        </h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700">
          {drafts.instructorCredentialAttachmentSetSummary}
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-sky-200 bg-white p-4 text-sm leading-7 text-slate-700">
            <div className="font-semibold text-slate-900">Repo folder</div>
            <p className="mt-2">{drafts.instructorCredentialRepoPath}</p>
          </div>
          <div className="rounded-2xl border border-sky-200 bg-white p-4 text-sm leading-7 text-slate-700">
            <div className="font-semibold text-slate-900">Submission folder</div>
            <p className="mt-2">{drafts.instructorCredentialSubmissionPath}</p>
          </div>
        </div>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
          {drafts.instructorCredentialAttachments.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          {drafts.finalReviewBundleTitle}
        </h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700">
          {drafts.finalReviewBundleSummary}
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-white p-4 text-sm leading-7 text-slate-700">
            <div className="font-semibold text-slate-900">Repo bundle</div>
            <p className="mt-2">{drafts.finalReviewBundleRepoPath}</p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-white p-4 text-sm leading-7 text-slate-700">
            <div className="font-semibold text-slate-900">Submission bundle</div>
            <p className="mt-2">{drafts.finalReviewBundleSubmissionPath}</p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-white p-4 text-sm leading-7 text-slate-700">
            <div className="font-semibold text-slate-900">PDF-only reviewer packet</div>
            <p className="mt-2">{drafts.finalReviewBundlePdfOnlyPath}</p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-white p-4 text-sm leading-7 text-slate-700">
            <div className="font-semibold text-slate-900">Email-ready zip</div>
            <p className="mt-2">{drafts.finalReviewBundleZipPath}</p>
          </div>
        </div>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
          {drafts.finalReviewBundleContents.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        {packet.packetSections.map((section) => (
          <article
            key={section.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-slate-900">
              {section.title}
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Required curriculum components
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
          {packet.requiredComponents.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Draft guidebook skeleton
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-700">
              This is the first packet-ready curriculum structure for the
              Florida internet course. It is sized to the 4-hour minimum and
              keeps the final assessment inside that total time.
            </p>
          </div>
          <div className="rounded-2xl border border-green-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700">
            <div>Total course time: {guidebook.totalMinutes} minutes</div>
            <div>Instruction/exercises: {guidebook.instructionMinutes} minutes</div>
            <div>Final assessment: {guidebook.finalAssessmentMinutes} minutes</div>
            <div>Passing score: {guidebook.passingScorePercent}%</div>
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {guidebook.modules.map((module) => (
            <article
              key={module.id}
              className="rounded-2xl border border-green-200 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-900">{module.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Primary rule topic: {module.primaryRuleTopic}
                  </p>
                </div>
                <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-700">
                  {module.durationMinutes} min
                </div>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                {module.summary}
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
                {module.activities.map((activity) => (
                  <li key={activity}>{activity}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Rule-mapped learning objectives
          </h2>
          <div className="mt-4 space-y-4">
            {guidebook.learningObjectives.map((objective) => (
              <div
                key={objective.objective}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="text-sm font-semibold text-slate-900">
                  {objective.mappedTopic}
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-700">
                  {objective.objective}
                </p>
                <div className="mt-2 text-xs font-medium uppercase tracking-wide text-blue-700">
                  {objective.modules.join(" + ")}
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Key terms for the guidebook
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {guidebook.keyTerms.map((term) => (
              <span
                key={term}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700"
              >
                {term}
              </span>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
            <div className="font-semibold text-slate-900">Support rules to document</div>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>Instructor response window: {guidebook.instructorResponseWindow}</li>
              <li>{guidebook.identityControl}</li>
            </ul>
          </div>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Exact disclaimer text
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
            <div className="rounded-2xl border border-amber-200 bg-white p-4">
              <div className="font-semibold text-slate-900">Mental health disclaimer</div>
              <p className="mt-2">{guidebook.requiredDisclaimers.mentalHealth}</p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-white p-4">
              <div className="font-semibold text-slate-900">Legal disclaimer</div>
              <p className="mt-2">{guidebook.requiredDisclaimers.legal}</p>
            </div>
          </div>
        </article>

        <article className="rounded-3xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Sample certificate package
          </h2>
          <div className="mt-4 rounded-2xl border border-blue-200 bg-white p-5">
            <div className="text-sm text-slate-500">Sample course certificate</div>
            <div className="mt-2 text-xl font-semibold text-slate-900">
              {guidebook.officialCourseName}
            </div>
            <div className="mt-1 text-sm text-slate-600">
              Unique curriculum name: {guidebook.sampleCurriculumName}
            </div>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              {guidebook.certificateFields.map((field) => (
                <div key={field.label} className="grid gap-1">
                  <div className="font-semibold text-slate-900">{field.label}</div>
                  <div>{field.sample}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-blue-200 bg-white p-4">
            <div className="font-semibold text-slate-900">
              Certificate authenticity workflow
            </div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
              {guidebook.authenticityWorkflow.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Final assessment rules
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
          {guidebook.finalTestPolicy.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Provider introduction letter draft
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
            {drafts.introductionLetter.map((line, index) => (
              <p key={`${line}-${index}`}>{line || <span>&nbsp;</span>}</p>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            {drafts.indigentPolicy.title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            {drafts.indigentPolicy.explanation}
          </p>
          <div className="mt-4 rounded-2xl border border-amber-200 bg-white p-4">
            <div className="font-semibold text-slate-900">Draft policy text</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
              {drafts.indigentPolicy.policyText.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4 rounded-2xl border border-amber-200 bg-white p-4">
            <div className="font-semibold text-slate-900">Operational guardrails</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
              {drafts.indigentPolicy.operationalRules.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            {drafts.supportSop.title}
          </h2>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="font-semibold text-slate-900">Service levels</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
              {drafts.supportSop.serviceLevels.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="font-semibold text-slate-900">Named responder</div>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              {drafts.supportSop.designatedResponderLine}
            </p>
          </div>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="font-semibold text-slate-900">Response flow</div>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700">
              {drafts.supportSop.responseFlow.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="font-semibold text-slate-900">Prohibited conduct</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
              {drafts.supportSop.prohibitedConduct.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </article>

        <article className="rounded-3xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Final sample certificate text
          </h2>
          <div className="mt-4 rounded-2xl border border-blue-200 bg-white p-5 text-sm leading-7 text-slate-700">
            {drafts.sampleCertificateText.map((line, index) => (
              <p key={`${line}-${index}`}>{line}</p>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Immediate next actions
        </h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-700">
          {packet.immediateNextActions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Official anchors</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {packet.references.map((reference) => (
            <a
              key={reference.href}
              href={reference.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-blue-700 transition hover:bg-white"
            >
              {reference.label}
            </a>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="https://prod.myflfamilies.com/services/child-family/child-and-family-well-being/pefs/course-providers"
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Open DCF provider page
          </a>
          <Link
            href="/admin/florida-parent-education-submission"
            className="inline-flex rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            Florida parent steps
          </Link>
          <Link
            href="/admin/florida-parent-education-controls"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Florida parent controls
          </Link>
          <Link
            href="/admin/florida-parent-education-final-packet"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Florida parent final packet
          </Link>
          <Link
            href="/admin/florida-parent-education"
            className="inline-flex rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Florida parent education
          </Link>
        </div>
      </section>
    </div>
  )
}
