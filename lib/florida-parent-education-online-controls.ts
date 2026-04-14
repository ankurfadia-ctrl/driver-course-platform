import { FLORIDA_PARENT_EDUCATION_GUIDEBOOK } from "@/lib/florida-parent-education-course-content"

export type FloridaParentEducationControlSection = {
  title: string
  items: string[]
}

export const FLORIDA_PARENT_EDUCATION_ONLINE_CONTROLS = {
  title: "Florida Parent Education Online Controls",
  summary:
    "Packet-ready operational evidence for the Florida internet course showing how seat time, identity verification, certificate gating, and participant support will be controlled before approval is requested.",
  controlStatus:
    "Approval-packet evidence draft using existing platform patterns plus Florida-specific parent-education requirements.",
  platformAnchors: [
    "Course attempts already track required seconds, total seconds, status, last activity, and current lesson path through the course_attempts layer.",
    "Lesson completion is tracked per user, state, course slug, and lesson slug through the course_progress layer.",
    "Exam results store score, pass/fail status, completion timestamp, and certificate reference through the exam_results layer.",
    "Certificate IDs and public verification paths already exist in the shared certificate-reference workflow.",
  ],
  seatTime: {
    title: "Seat-time control evidence",
    requiredMinutes: FLORIDA_PARENT_EDUCATION_GUIDEBOOK.totalMinutes,
    moduleBreakdown: FLORIDA_PARENT_EDUCATION_GUIDEBOOK.modules.map((module) => ({
      title: module.title,
      durationMinutes: module.durationMinutes,
    })),
    controls: [
      "The course is structured as an 8-module sequence totaling 240 minutes, which matches the Florida 4-hour minimum.",
      "A course_attempt record will store required_seconds, total_seconds, status, last_activity_at, and current_lesson so progress can be audited.",
      "The final assessment remains locked until the participant has completed the required instructional sequence and the 240-minute minimum.",
      "Certificate issuance remains locked until the course timer, identity verification, and final-test conditions are all satisfied.",
      "If a participant exits and returns later, accumulated qualifying time remains tied to the participant record rather than resetting the course requirement.",
      "The support team can review seat-time status in the compliance/admin workflow before responding to a completion dispute.",
    ],
    evidenceNotes: [
      "This packet should include the 8-module time map from the guidebook skeleton.",
      "The final packet should include screenshots or product notes showing that the final test and certificate remain gated by completion state.",
    ],
  },
  identity: {
    title: "Identity-verification control evidence",
    collectedFields: [
      "Legal first name",
      "Legal last name",
      "Date of birth",
      "Participant email address",
      "Two custom security questions",
      "Two stored answers",
    ],
    controls: [
      "The participant creates an identity profile before certificate issuance is possible.",
      "The course stores identity-verification answers separately from the instructional content so they can be reused during completion checks.",
      "Before the final assessment or certificate release point, the participant must successfully answer stored verification prompts.",
      "If identity verification is not completed, the certificate stays locked even if the participant has satisfied the instructional and test requirements.",
      "Support staff must verify the identity profile before manually discussing a disputed completion or certificate issue.",
    ],
    policyNotes: [
      "The packet should describe this as a completion-control method used to confirm that the person finishing the course is the participant whose name appears on the certificate.",
      "If you want stronger proof later, SMS or email OTP can be layered on top, but the current packet can rely on profile plus challenge questions.",
    ],
  },
  support: {
    title: "Instructor-response and participant-support SOP",
    channels: [
      "Designated initial responder: Ankur Fadia",
      "Primary support email: admin@vadriverimprovementcourse.com",
      "Primary support phone: (703) 574-0146",
      "Support requests logged through the support workflow and admin dashboard",
    ],
    workflow: [
      "Participant questions are triaged into course-content, technical access, identity, final-test, and certificate issues.",
      "All participant questions receive an initial response within 1 business day.",
      "Course-content and family-stabilization questions are routed to the designated instructor or approved content responder.",
      "Technical or certificate-access issues are reviewed against purchase, progress, seat-time, identity, and exam-completion records before a correction is made.",
      "If a participant reports a certificate problem, support verifies the participant identity, completion status, and certificate reference before issuing guidance.",
      "Support interactions that affect completion status are documented so the packet can show an auditable participant-response process.",
    ],
    escalationRules: [
      "Do not provide mental-health therapy to participants.",
      "Do not provide individualized legal advice to participants.",
      "Direct participants with case-specific legal questions to a licensed attorney.",
      "Direct participants with personal mental-health concerns to an appropriate licensed therapist or emergency resource.",
    ],
  },
  recordkeeping: {
    title: "Certificate and recordkeeping evidence",
    items: [
      "Each certificate uses a unique verification identifier.",
      "Certificate authenticity can be checked against the stored completion record.",
      "Participant completion records and certificate copies are retained for at least 5 years as required by the Florida checklist.",
      "The completion record should link the participant identity profile, seat-time record, final-test result, and certificate ID.",
    ],
  },
  nextImplementationMoves: [
    "Decide the exact participant identity fields for the Florida parent-course profile before public build work starts.",
    "Add Florida parent-education seat-time settings to the reusable course-attempt flow once this lane moves from packet to runtime build.",
    "Name the approved instructor/support responder who will own the 1-business-day response commitment.",
    "Capture screenshots or mockups of the certificate-locked state for the final packet if DCF wants visual proof.",
  ],
} as const
