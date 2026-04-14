import Link from "next/link"
import { FLORIDA_PARENT_EDUCATION_GUIDEBOOK } from "@/lib/florida-parent-education-course-content"
import { FLORIDA_PARENT_EDUCATION_PACKET } from "@/lib/florida-parent-education-packet"

const REVIEWER_ROUTE =
  "/florida/reviewer-access?program=parent-education"
const REVIEWER_LOGIN_ROUTE =
  "/florida/login?reason=reviewer&next=%2Fflorida%2Freviewer-access%3Fprogram%3Dparent-education"

const instructionalTechniques = [
  "Narrated educational lessons with plain-language written support.",
  "Guided reading and reflection prompts for parent self-assessment.",
  "Scenario-based examples focused on child-centered communication.",
  "Message-rewrite exercises to reduce conflict and keep children out of the middle.",
  "Developmental-stage comparisons to show how children of different ages process separation differently.",
  "Final knowledge assessment with remediation routing before retake.",
]

const supportBoundaries = [
  "Course-content questions are answered within 1 business day.",
  "The course remains educational and does not provide individualized legal advice.",
  "The course does not provide mental-health therapy or diagnosis.",
  "Case-specific legal questions are directed to licensed attorneys.",
  "Therapy or crisis concerns are directed to licensed mental-health providers, advocates, or emergency resources.",
]

const participantResources = [
  "Emergency services: 911",
  "988 Suicide and Crisis Lifeline: 988",
  "Florida Abuse Hotline: 1-800-962-2873",
  "Florida Domestic Violence Hotline: 1-800-500-1119",
  "Florida Relay / TTY: 711 or 1-800-955-8771",
]

const finalAssessmentQuestions = [
  {
    id: 1,
    question:
      "The Parent Education and Family Stabilization Course is intended primarily to provide:",
    options: [
      "A. individualized legal advice",
      "B. educational information for parents",
      "C. court advocacy",
      "D. mental health diagnosis",
    ],
    answer: "B. educational information for parents",
  },
  {
    id: 2,
    question: "Divorce as loss means:",
    options: [
      "A. parenting ends when the adult relationship ends",
      "B. family routines and structure change, but the parental role continues",
      "C. children should be asked to decide which parent needs more support",
      "D. the child should manage adult emotions",
    ],
    answer:
      "B. family routines and structure change, but the parental role continues",
  },
  {
    id: 3,
    question: "A key goal of the course is to help parents:",
    options: [
      "A. keep children out of the middle of conflict",
      "B. prove fault against the other parent",
      "C. avoid all communication forever",
      "D. give legal advice to one another",
    ],
    answer: "A. keep children out of the middle of conflict",
  },
  {
    id: 4,
    question: "Children of different ages often:",
    options: [
      "A. react in exactly the same way to divorce",
      "B. do not notice parental conflict",
      "C. understand divorce differently depending on developmental stage",
      "D. benefit from hearing adult accusations",
    ],
    answer:
      "C. understand divorce differently depending on developmental stage",
  },
  {
    id: 5,
    question:
      "A developmentally appropriate conversation with a child should be:",
    options: [
      "A. age-appropriate and reassuring",
      "B. highly detailed about litigation strategy",
      "C. based on blame",
      "D. used to turn the child into a messenger",
    ],
    answer: "A. age-appropriate and reassuring",
  },
  {
    id: 6,
    question:
      "Which is the best example of keeping children out of the middle?",
    options: [
      "A. asking the child to report on the other parent",
      "B. criticizing the other parent at exchange time",
      "C. discussing pickup details directly with the other parent",
      "D. asking the child to choose the schedule",
    ],
    answer: "C. discussing pickup details directly with the other parent",
  },
  {
    id: 7,
    question:
      "If a participant has a case-specific legal question, the course directs them to:",
    options: [
      "A. get legal advice from the course materials",
      "B. ask the other parent",
      "C. consult a licensed attorney",
      "D. skip the issue entirely",
    ],
    answer: "C. consult a licensed attorney",
  },
  {
    id: 8,
    question:
      "If a participant has an immediate domestic-violence safety emergency, the most appropriate first step is:",
    options: [
      "A. wait to finish the module",
      "B. call 911 and use safety resources",
      "C. ask the child to mediate",
      "D. send a long argument message",
    ],
    answer: "B. call 911 and use safety resources",
  },
  {
    id: 9,
    question: "The final certificate may be issued only after:",
    options: [
      "A. the participant requests it",
      "B. one module is viewed",
      "C. seat time, identity verification, and passing score are complete",
      "D. the other parent approves it",
    ],
    answer:
      "C. seat time, identity verification, and passing score are complete",
  },
  {
    id: 10,
    question: "If a participant scores below 70 percent:",
    options: [
      "A. the provider may charge a new fee",
      "B. the participant must review missed material before retaking the test",
      "C. the participant automatically passes on the second try",
      "D. the course ends permanently",
    ],
    answer:
      "B. the participant must review missed material before retaking the test",
  },
  {
    id: 11,
    question: "Florida's course rules require the course to include:",
    options: [
      "A. case-specific legal strategy",
      "B. general Florida family-law information only",
      "C. therapy treatment planning",
      "D. private custody recommendations",
    ],
    answer: "B. general Florida family-law information only",
  },
  {
    id: 12,
    question:
      "A stable and consistent relationship with both parents is discussed in the course as:",
    options: [
      "A. potentially beneficial when safe and appropriate",
      "B. never relevant",
      "C. legally identical in all cases",
      "D. less important than adult anger",
    ],
    answer: "A. potentially beneficial when safe and appropriate",
  },
  {
    id: 13,
    question: "Which is an appropriate co-parenting communication habit?",
    options: [
      "A. brief, factual, child-focused messages",
      "B. repeating accusations in front of the child",
      "C. letting the child carry adult complaints",
      "D. using the child as a witness",
    ],
    answer: "A. brief, factual, child-focused messages",
  },
  {
    id: 14,
    question: "The course is:",
    options: [
      "A. a replacement for therapy",
      "B. an educational program",
      "C. a legal clinic",
      "D. a forensic evaluation",
    ],
    answer: "B. an educational program",
  },
  {
    id: 15,
    question: "One sign that a child may need added support is:",
    options: [
      "A. persistent severe behavior or mood problems",
      "B. wanting dinner at the usual time",
      "C. asking ordinary schedule questions",
      "D. enjoying time with relatives",
    ],
    answer: "A. persistent severe behavior or mood problems",
  },
]

export default function FloridaParentEducationReviewerPortal() {
  const guidebook = FLORIDA_PARENT_EDUCATION_GUIDEBOOK
  const packet = FLORIDA_PARENT_EDUCATION_PACKET

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Reviewer Access - Florida Parent Education
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Parent Education and Family Stabilization Course
            </h1>
            <p className="mt-4 max-w-3xl leading-7 text-slate-700">
              This protected reviewer portal is prepared for Florida DCF review
              of the proposed internet-based parent education course. It mirrors
              the written packet and highlights course structure, required
              disclaimers, instructional methods, seat-time and identity
              controls, final assessment logic, and certificate rules without
              exposing admin tools or live student data.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-white px-5 py-4 shadow-sm">
            <div className="text-sm text-slate-500">Access type</div>
            <div className="mt-1 text-lg font-semibold text-slate-900">
              Reviewer only
            </div>
            <div className="mt-2 text-sm leading-6 text-slate-600">
              No payment required, no admin access, no live student record
              exposure.
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">Course modules</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">
            {guidebook.modules.length}
          </div>
        </div>
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
          <div className="text-sm text-blue-700">Required duration</div>
          <div className="mt-2 text-3xl font-bold text-blue-900">
            {guidebook.totalMinutes} min
          </div>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <div className="text-sm text-amber-700">Final test</div>
          <div className="mt-2 text-3xl font-bold text-amber-900">
            {finalAssessmentQuestions.length} Q
          </div>
        </div>
        <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
          <div className="text-sm text-green-700">Support response</div>
          <div className="mt-2 text-3xl font-bold text-green-900">
            {guidebook.instructorResponseWindow}
          </div>
        </div>
      </div>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Review entry points
          </h2>
          <div className="mt-4 grid gap-4">
            <Link
              href={REVIEWER_LOGIN_ROUTE}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-white"
            >
              <div className="font-semibold text-slate-900">
                Reviewer sign-in route
              </div>
              <div className="mt-2 break-all text-sm leading-6 text-blue-700">
                {REVIEWER_LOGIN_ROUTE}
              </div>
              <div className="mt-2 text-sm leading-6 text-slate-600">
                Reviewers can sign in here and return directly to the protected
                portal after authentication.
              </div>
            </Link>
            <Link
              href={REVIEWER_ROUTE}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-white"
            >
              <div className="font-semibold text-slate-900">
                Protected course review route
              </div>
              <div className="mt-2 break-all text-sm leading-6 text-blue-700">
                {REVIEWER_ROUTE}
              </div>
              <div className="mt-2 text-sm leading-6 text-slate-600">
                Reviewer-only course view for packet-aligned curriculum and
                control review.
              </div>
            </Link>
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Course identity
          </h2>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-700">
            <li>
              <span className="font-semibold text-slate-900">Official course name:</span>{" "}
              {guidebook.officialCourseName}
            </li>
            <li>
              <span className="font-semibold text-slate-900">Unique curriculum name:</span>{" "}
              {guidebook.sampleCurriculumName}
            </li>
            <li>
              <span className="font-semibold text-slate-900">
                Course administrator:
              </span>{" "}
              Florida Co-Parenting Foundations
            </li>
            <li>
              <span className="font-semibold text-slate-900">Support email:</span>{" "}
              admin@vadriverimprovementcourse.com
            </li>
            <li>
              <span className="font-semibold text-slate-900">Support phone:</span>{" "}
              (703) 574-0146
            </li>
            <li>
              <span className="font-semibold text-slate-900">Passing score:</span>{" "}
              {guidebook.passingScorePercent}%
            </li>
          </ul>
          <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-950">
            This review environment is intended to mirror the written DCF
            packet. Material differences should be treated as pre-launch
            implementation updates and not as additional curriculum claims.
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">
          Required disclaimer text
        </h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h3 className="font-semibold text-slate-900">
              Mental health disclaimer
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              {guidebook.requiredDisclaimers.mentalHealth}
            </p>
          </article>
          <article className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <h3 className="font-semibold text-slate-900">
              Legal disclaimer
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              {guidebook.requiredDisclaimers.legal}
            </p>
          </article>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">
          Required Florida topic coverage
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
          {packet.requiredComponents.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">
          Course structure and timing
        </h2>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600">
                <th className="py-3 pr-4 font-semibold">Module</th>
                <th className="py-3 pr-4 font-semibold">Title</th>
                <th className="py-3 pr-4 font-semibold">Primary topic</th>
                <th className="py-3 font-semibold">Minutes</th>
              </tr>
            </thead>
            <tbody>
              {guidebook.modules.map((module) => (
                <tr key={module.id} className="border-b border-slate-100">
                  <td className="py-3 pr-4 font-medium text-slate-900">
                    {module.id}
                  </td>
                  <td className="py-3 pr-4 text-slate-700">{module.title}</td>
                  <td className="py-3 pr-4 text-slate-700">
                    {module.primaryRuleTopic}
                  </td>
                  <td className="py-3 text-slate-700">
                    {module.durationMinutes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">
          Learning objectives
        </h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {guidebook.learningObjectives.map((objective) => (
            <article
              key={objective.objective}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                {objective.mappedTopic}
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                {objective.objective}
              </p>
              <div className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                {objective.modules.join(" + ")}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">
          Module content snapshots
        </h2>
        <div className="mt-5 space-y-5">
          {guidebook.modules.map((module) => (
            <article
              key={module.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {module.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-700">
                    {module.summary}
                  </p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800">
                  {module.durationMinutes} min
                </span>
              </div>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
                {module.activities.map((activity) => (
                  <li key={activity}>{activity}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Instructional techniques
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
            {instructionalTechniques.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Support boundaries
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
            {supportBoundaries.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-3xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Seat-time control
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
            <li>Required total time: 240 minutes.</li>
            <li>
              The final assessment remains locked until the required
              instructional sequence and minimum seat time are complete.
            </li>
            <li>
              The certificate remains locked until seat time, identity
              verification, and passing score are all satisfied.
            </li>
          </ul>
        </article>

        <article className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Identity control
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            {guidebook.identityControl}
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
            <li>Identity profile includes legal name, date of birth, email, and two security prompts.</li>
            <li>Stored prompts are used again before certificate release.</li>
            <li>
              If identity verification is incomplete, certificate release stays
              blocked.
            </li>
          </ul>
        </article>

        <article className="rounded-3xl border border-green-200 bg-green-50 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Final test policy
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
            {guidebook.finalTestPolicy.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              End-of-course assessment sample
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
              The review packet includes a 15-question assessment set aligned to
              the written guidebook and the operations appendix.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
            Passing threshold: {guidebook.passingScorePercent}%<br />
            Retakes: unlimited after remediation
          </div>
        </div>
        <div className="mt-5 space-y-4">
          {finalAssessmentQuestions.map((question) => (
            <article
              key={question.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="font-semibold text-slate-900">
                {question.id}. {question.question}
              </div>
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-slate-700">
                {question.options.map((option) => (
                  <li key={option}>{option}</li>
                ))}
              </ol>
              <p className="mt-3 text-sm text-slate-700">
                Correct answer:{" "}
                <span className="font-semibold text-slate-900">
                  {question.answer}
                </span>
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Certificate and record controls
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {guidebook.certificateFields.map((field) => (
              <div
                key={field.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700"
              >
                <div className="font-semibold text-slate-900">{field.label}</div>
                <div className="mt-2">{field.sample}</div>
              </div>
            ))}
          </div>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
            {guidebook.authenticityWorkflow.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Participant resource list
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
            {participantResources.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
            <div className="font-semibold text-slate-900">Key terms used</div>
            <div className="mt-3">
              {guidebook.keyTerms.join(", ")}
            </div>
          </div>
        </article>
      </section>
    </div>
  )
}
