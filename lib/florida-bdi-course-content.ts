// Florida BDI course structure — tied to Script v0.2 Paginated
// Source: $base/02 Florida Course Tracks/BDI/25 BDI Script Draft v0.2 Paginated.md
// Page references frozen March 31, 2026

export const FLORIDA_BDI_MODULES = [
  {
    id: 1,
    slug: "module-1",
    title: "Module 1 — Course Orientation and Integrity Controls",
    pages: "1",
    estimatedMinutes: 15,
  },
  {
    id: 2,
    slug: "module-2",
    title: "Module 2 — Florida Traffic Crash Problem and Crash Dynamics",
    pages: "2–3",
    estimatedMinutes: 30,
  },
  {
    id: 3,
    slug: "module-3",
    title: "Module 3 — Crash Prevention and Defensive Driving Foundations",
    pages: "3–6",
    estimatedMinutes: 45,
  },
  {
    id: 4,
    slug: "module-4",
    title: "Module 4 — Hazard Conditions, Emergencies, and Vulnerable Road Users",
    pages: "7–9",
    estimatedMinutes: 45,
  },
  {
    id: 5,
    slug: "module-5",
    title: "Module 5 — DUI Prevention and Impairment Decision-Making",
    pages: "10–11",
    estimatedMinutes: 30,
  },
  {
    id: 6,
    slug: "module-6",
    title: "Module 6 — Safety Equipment and Vehicle Responsibility",
    pages: "12",
    estimatedMinutes: 20,
  },
  {
    id: 7,
    slug: "module-7",
    title: "Module 7 — Psychological Factors and Driver Attitude",
    pages: "13",
    estimatedMinutes: 20,
  },
  {
    id: 8,
    slug: "module-8",
    title: "Module 8 — Florida Traffic Laws and Practical Compliance",
    pages: "14–16",
    estimatedMinutes: 40,
  },
  {
    id: 9,
    slug: "module-9",
    title: "Module 9 — Course Review and Final Test Readiness",
    pages: "17",
    estimatedMinutes: 15,
  },
  {
    id: 10,
    slug: "module-10",
    title: "Module 10 — Final Test Administration",
    pages: "18",
    estimatedMinutes: 60,
  },
]

export const FLORIDA_BDI_MODULE_CONTENT: Record<
  string,
  {
    scriptPages: string
    intro: string
    sections: { heading: string; body: string[] }[]
    validationNote?: string
  }
> = {
  "module-1": {
    scriptPages: "1",
    intro:
      "Module 1 orients the student to course expectations, completion requirements, and integrity controls before any instructional content begins. Students learn that the registered student must personally complete the course, that validation prompts may appear during instruction, and that course failure conditions apply if integrity rules are not followed.",
    sections: [
      {
        heading: "Course completion requirements",
        body: [
          "The student must finish all required instruction and satisfy all course-validation requirements.",
          "The final test must be passed with a score of at least 80 percent.",
          "Course completion is earned only after all required conditions are satisfied — not after time elapsed alone.",
        ],
      },
      {
        heading: "Student identity and participation",
        body: [
          "The registered student must be the same person who completes the course.",
          "Validation prompts may be used at any point to confirm identity and active participation.",
          "Time-limited validation questions must be answered within the required window.",
        ],
      },
      {
        heading: "Integrity controls overview",
        body: [
          "Progress controls, knowledge checks, and final-test safeguards are part of the course process and are not optional.",
          "These controls are explained at the start so students understand the rules before any activity begins.",
        ],
      },
      {
        heading: "Course purpose",
        body: [
          "The course covers crash prevention, Florida-specific laws, vulnerable road users, DUI prevention, safety equipment, and personal driving responsibility.",
          "Safe driving is a set of habits, decisions, and attitudes that reduce risk over time — not a single skill.",
        ],
      },
    ],
    validationNote:
      "Identity and participation controls are active from Module 1 through the final test. Time-limited prompts may appear at any point during the course.",
  },

  "module-2": {
    scriptPages: "2–3",
    intro:
      "Module 2 establishes the scale of the Florida traffic crash problem and introduces crash dynamics. Students learn that crashes create personal and societal loss, that unsafe decisions cause measurable harm, and that physics — especially speed — determines how severe a crash becomes.",
    sections: [
      {
        heading: "The traffic crash problem",
        body: [
          "Crashes can cause injury, death, property damage, missed work, emotional trauma, insurance cost increases, court involvement, and long-term financial hardship.",
          "Alcohol-impaired driving, reckless behavior, distraction, poor judgment, and excessive speed all contribute to crash frequency and severity.",
          "Risk builds from small errors and delayed reactions that occur before impact.",
        ],
      },
      {
        heading: "Speed and force of impact",
        body: [
          "As speed increases, the force involved in a collision rises sharply.",
          "A modest increase in speed can greatly increase injury severity and property damage.",
          "Managing speed before a conflict is one of the most powerful crash-prevention tools available to a driver.",
        ],
      },
      {
        heading: "The second collision",
        body: [
          "In a crash, the vehicle may strike one object, but occupants and loose objects inside the vehicle continue moving until they strike something else.",
          "Safety belts, proper seating position, and secured cargo directly reduce second-collision injury.",
        ],
      },
      {
        heading: "Energy absorption and vehicle design",
        body: [
          "Vehicle design can absorb some crash energy, but no design eliminates the effects of unsafe speed, poor restraint use, or careless behavior.",
          "The safest crash is the crash that never occurs — understanding dynamics should lead to better prevention choices.",
        ],
      },
    ],
  },

  "module-3": {
    scriptPages: "3–6",
    intro:
      "Module 3 builds the core defensive-driving skill set. Students learn how to scan for hazards, manage following distance and speed, make safe passing decisions, apply right-of-way rules with judgment, and understand how perception time, reaction time, and braking distance combine to determine stopping ability.",
    sections: [
      {
        heading: "Scanning and hazard recognition",
        body: [
          "A safe driver scans the roadway ahead, the roadside environment, traffic patterns, intersections, and possible conflict points — not just the vehicle directly ahead.",
          "Scanning creates more time to make calm, deliberate decisions before a risk becomes a crisis.",
          "Urban, suburban, and highway driving each require adapted scanning patterns.",
        ],
      },
      {
        heading: "Following distance and stopping distance",
        body: [
          "Stopping distance increases with speed and decreases when traction is reduced.",
          "Following distance should function as a living safety margin that grows with poor conditions, large nearby vehicles, and reduced visibility.",
          "Perception time plus reaction time plus braking distance together determine whether a driver can stop safely.",
        ],
      },
      {
        heading: "Speed adjustment",
        body: [
          "A safe speed fits surroundings, visibility, traffic density, road condition, and hazard activity — not just the posted number.",
          "Environmental hazards including rain, fog, wind, and standing water require early speed adjustment.",
        ],
      },
      {
        heading: "Passing, right of way, and conflict avoidance",
        body: [
          "Passing should be done only when lawful and clearly safe — it is not a response to impatience.",
          "No driver can claim right of way in a way that removes the duty to avoid a crash.",
          "Railroad crossings demand focused caution because a timing mistake there can have catastrophic consequences.",
          "Defensive driving is active: safe drivers create time, space, and options before danger becomes an emergency.",
        ],
      },
    ],
  },

  "module-4": {
    scriptPages: "7–9",
    intro:
      "Module 4 covers hazardous conditions, vehicle emergencies, and the full range of vulnerable road users including pedestrians, bicyclists, motorcyclists, and roadway workers. Florida-specific statistics are presented to show that exposed-user risk is persistent and serious across the state.",
    sections: [
      {
        heading: "Hazard conditions",
        body: [
          "Rain, slick pavement, wind, standing water, fog, glare, and congestion reduce the safety margin even on familiar routes.",
          "A safe driver slows early, increases following distance, and avoids sharp control inputs when traction is reduced.",
        ],
      },
      {
        heading: "Vehicle emergencies",
        body: [
          "Tire failure, brake failure, and loss of power steering each require calm, disciplined responses.",
          "Panic and overcorrection often make the situation worse — the first goal is stability and moving toward a safer area.",
        ],
      },
      {
        heading: "Sharing the road — trucks and work zones",
        body: [
          "Large trucks have larger blind spots, longer stopping distances, and wider turning needs.",
          "Work zones can change traffic patterns quickly and leave little room for recovery if a driver enters too fast.",
        ],
      },
      {
        heading: "Vulnerable road users",
        body: [
          "A vulnerable road user is someone who uses the roadway with less physical protection than the occupants of a passenger vehicle.",
          "Pedestrians, bicyclists, and motorcyclists are all vulnerable road users under Florida law.",
          "Safe driving requires anticipating how the roadway feels from the perspective of a less-protected person.",
        ],
      },
      {
        heading: "Florida VRU statistics (2023 crash facts)",
        body: [
          "10,306 pedestrian crashes — 791 pedestrian fatalities.",
          "8,418 bicyclist crashes — 234 bicyclist fatalities.",
          "9,548 motorcycle crashes — 621 motorcycle fatalities.",
          "These figures are included to show that exposed road users face serious risk every day across Florida.",
        ],
      },
      {
        heading: "Current roadway trends and devices",
        body: [
          "Shared micromobility devices, delivery traffic, and denser mixed-use travel patterns increase unpredictability.",
          "The safe response is to expect more variation, scan earlier, and give exposed users more room.",
        ],
      },
    ],
  },

  "module-5": {
    scriptPages: "10–11",
    intro:
      "Module 5 covers DUI prevention, impairment decision-making, and the full consequences of impaired driving. Students learn that impairment begins before most people recognize it, that legal thresholds are not the same as safe thresholds, and that prevention planning must happen before judgment is affected.",
    sections: [
      {
        heading: "How alcohol and drugs affect driving",
        body: [
          "Alcohol and other drugs reduce attention, judgment, coordination, visual processing, and reaction time.",
          "Impairment begins before many people think it does — judgment is often affected early.",
          "Prescription medications, over-the-counter drugs, and illegal substances can all affect driving ability.",
        ],
      },
      {
        heading: "BAC and impairment",
        body: [
          "Legal thresholds are not the same as safe thresholds — a driver can become unsafe before reaching an illegal per se limit.",
          "Subjective confidence after drinking is an unreliable measure of actual driving ability.",
          "Mixing substances can compound impairment effects.",
        ],
      },
      {
        heading: "Florida consequences",
        body: [
          "DUI can lead to injury, death, criminal penalties, fines, increased insurance costs, employment problems, and long-term record consequences.",
          "Financial and family consequences extend far beyond the traffic stop.",
        ],
      },
      {
        heading: "Prevention planning",
        body: [
          "Safe alternatives include using a designated driver, arranging another ride, staying over, or changing plans before risk increases.",
          "Prevention planning works best when it happens before drinking or substance use begins — not after judgment is already affected.",
        ],
      },
    ],
  },

  "module-6": {
    scriptPages: "12",
    intro:
      "Module 6 covers occupant protection systems and vehicle maintenance responsibility. Students learn that safety equipment works best as a complete system, that proper use matters as much as possession, and that vehicle condition directly affects the choices a driver can safely make.",
    sections: [
      {
        heading: "Safety belt and occupant protection",
        body: [
          "Safety belts protect best when worn correctly — improper positioning reduces protection and can increase injury risk.",
          "Head restraints can reduce certain neck injuries in rear-impact events when adjusted correctly.",
          "Drivers have legal and safety responsibilities for child-restraint selection, fit, placement, and use.",
        ],
      },
      {
        heading: "Air bags",
        body: [
          "Air bags are supplemental restraints — they work with proper belt use and correct seating position, not instead of them.",
          "Children and smaller occupants require special caution because seating position affects air-bag risk.",
        ],
      },
      {
        heading: "Vehicle maintenance and carbon monoxide",
        body: [
          "Tires, brakes, lights, wipers, mirrors, and other systems must function properly for a driver to respond safely.",
          "Carbon monoxide risk is part of safe vehicle use and maintenance — a hidden hazard that can harm occupants without a collision.",
          "A safe driver treats safety equipment as a system where every part matters most when the unexpected happens.",
        ],
      },
    ],
  },

  "module-7": {
    scriptPages: "13",
    intro:
      "Module 7 addresses the psychological side of driving — how a driver's mental and emotional state directly affects risk. Students learn that stress, fatigue, frustration, and emotional distress can reduce judgment and increase unsafe behavior as reliably as any external hazard.",
    sections: [
      {
        heading: "Fatigue",
        body: [
          "Fatigue reduces alertness, slows reaction time, and causes drivers to overlook hazards and underestimate personal risk.",
          "A tired driver may be the last to notice that their ability has declined.",
        ],
      },
      {
        heading: "Stress and emotional distress",
        body: [
          "A driver who feels rushed, angry, or overwhelmed may take risks that would normally be avoided.",
          "Emotional strain can lead to speeding, aggressive following, late braking, poor lane changes, or failure to yield.",
        ],
      },
      {
        heading: "Appropriate attitude",
        body: [
          "Safe drivers do not compete with traffic or treat other drivers as obstacles to defeat.",
          "A mature driving attitude prioritizes patience, judgment, and safety over saving a few seconds.",
          "Every driving decision affects other people — good driving is not just about personal convenience.",
        ],
      },
    ],
  },

  "module-8": {
    scriptPages: "14–16",
    intro:
      "Module 8 covers Florida traffic laws and practical compliance. Students learn the point system, licensing actions, speed laws, signs and signals, school-bus and emergency-vehicle rules, and how lawful predictable behavior is itself the primary crash-prevention tool on Florida roads.",
    sections: [
      {
        heading: "Florida point system and licensing actions",
        body: [
          "The Florida point system tracks repeated unsafe choices — small violations can accumulate into major licensing consequences.",
          "Cancellation, suspension, revocation, and disqualification each represent different levels of licensing action.",
        ],
      },
      {
        heading: "Speed laws",
        body: [
          "Safe speed depends on the posted limit and on conditions present at the time — traffic, weather, visibility, and road activity.",
          "Default limits apply even on roads without a posted sign.",
        ],
      },
      {
        heading: "Signs, signals, and markings",
        body: [
          "Traffic signs, signals, and road markings create shared expectations that reduce unpredictability and conflict.",
          "Stop signs require full stops. Yield signs require slowing and giving way when safety requires it.",
          "Flashing red signals should be treated as stop signs. Flashing yellow signals require reduced speed and heightened awareness.",
        ],
      },
      {
        heading: "School buses and emergency vehicles",
        body: [
          "School-bus situations involve high-risk conflicts with children who may act unpredictably near loading and unloading areas.",
          "Emergency-vehicle yielding requires early, calm, predictable response — not panic movement.",
          "Blocking an intersection when yielding to an emergency vehicle creates a second hazard.",
        ],
      },
      {
        heading: "Vulnerable road users and Florida law",
        body: [
          "Florida law requires yielding to pedestrians in crosswalks and providing at least three feet of clearance when passing bicyclists.",
          "Legal knowledge alone is not enough — lawful behavior must also be patient and predictable to protect exposed users.",
          "The purpose of traffic law is to create a road environment other people can survive.",
        ],
      },
    ],
  },

  "module-9": {
    scriptPages: "17",
    intro:
      "Module 9 reviews the course's major safety concepts and prepares students for the final test. Students are reminded of the randomized test format, the 80-percent passing requirement, and that course-validation and integrity rules continue through the final step.",
    sections: [
      {
        heading: "Core concepts to carry forward",
        body: [
          "Recognize hazards early and manage speed and space.",
          "Share the road responsibly with all exposed users.",
          "Understand impairment and plan prevention before judgment is affected.",
          "Use safety equipment correctly as a complete system.",
          "Maintain appropriate driver attitude — patient, responsible, and focused on safety.",
          "Follow Florida traffic laws with practical judgment, not just rule memorization.",
        ],
      },
      {
        heading: "Final test expectations",
        body: [
          "The final test is generated from a larger approved question bank — 40 questions selected randomly.",
          "Passing score is 80 percent.",
          "Course-validation and integrity rules remain active during the final test.",
          "Course completion is earned only after all required conditions are satisfied.",
        ],
      },
    ],
  },

  "module-10": {
    scriptPages: "18",
    intro:
      "Module 10 administers the final test and closes the formal instructional sequence. Students receive instructions on test format, integrity rules, the retake policy, and the broader purpose of the course beyond passing the test.",
    sections: [
      {
        heading: "Final test format",
        body: [
          "The student receives a randomized final test of at least 40 questions drawn from the approved 500-question bank.",
          "Passing score is 80 percent.",
          "The student must complete the test personally and in accordance with all course integrity rules.",
        ],
      },
      {
        heading: "Integrity during the test",
        body: [
          "Course integrity controls continue to apply during the final test.",
          "If a validation prompt is triggered, the student must respond in accordance with course instructions.",
          "Failure to follow testing and integrity rules may result in a failed course attempt.",
        ],
      },
      {
        heading: "Retake and review",
        body: [
          "If the student does not achieve the required passing score, the course explains the retake policy, timing, and required review steps.",
          "Review after failure is intended to strengthen understanding, not just repeat questions.",
        ],
      },
      {
        heading: "Course purpose beyond the test",
        body: [
          "The final test closes the formal instructional sequence, but the larger purpose is to improve driving behavior after the course is complete.",
          "Every safe choice on the road protects lives, reduces harm, and supports more responsible driving in Florida.",
        ],
      },
    ],
    validationNote:
      "Course completion is confirmed only after the student passes the final test and all integrity conditions are satisfied. The certificate is not issued until all requirements are met.",
  },
}

export const FLORIDA_BDI_TOPIC_MATRIX = [
  { family: "Traffic crash problem", topic: "Societal and personal losses", module: "Module 2", pages: "2" },
  { family: "Traffic crash problem", topic: "DUI and hazardous acts", module: "Module 2", pages: "2" },
  { family: "Crash dynamics", topic: "Speed and force of impact", module: "Module 2", pages: "2" },
  { family: "Crash dynamics", topic: "Second collision", module: "Module 2", pages: "3" },
  { family: "Crash dynamics", topic: "Energy absorption / direction of impact", module: "Module 2", pages: "3" },
  { family: "Crash prevention", topic: "Scanning", module: "Module 3", pages: "3–6" },
  { family: "Crash prevention", topic: "Following distance", module: "Module 3", pages: "3–4" },
  { family: "Crash prevention", topic: "Stopping distance", module: "Module 3", pages: "4" },
  { family: "Crash prevention", topic: "Environmental hazards", module: "Module 4", pages: "4, 7" },
  { family: "Crash prevention", topic: "Vehicle emergencies", module: "Module 4", pages: "7–8" },
  { family: "Crash prevention", topic: "Sharing the road", module: "Module 4", pages: "5, 7–9" },
  { family: "Crash prevention", topic: "Passing", module: "Module 3", pages: "5–6" },
  { family: "Crash prevention", topic: "Right of way", module: "Module 3", pages: "5" },
  { family: "Crash prevention", topic: "Speed adjustment", module: "Module 3", pages: "4–5" },
  { family: "Crash prevention", topic: "Railroad crossings", module: "Module 3", pages: "5, 16" },
  { family: "Crash prevention", topic: "Motorcycle licensing and training", module: "Module 4", pages: "9" },
  { family: "Vulnerable road users", topic: "Definition", module: "Module 4", pages: "7" },
  { family: "Vulnerable road users", topic: "Characteristics and environments", module: "Module 4", pages: "7–9" },
  { family: "Vulnerable road users", topic: "Laws and protections", module: "Module 8", pages: "15–16" },
  { family: "Vulnerable road users", topic: "Physical environment", module: "Module 4", pages: "8" },
  { family: "Vulnerable road users", topic: "Statistics", module: "Module 4", pages: "9" },
  { family: "Vulnerable road users", topic: "Driver responsibilities", module: "Module 4", pages: "7–9" },
  { family: "Vulnerable road users", topic: "Current trends / devices", module: "Module 4", pages: "9" },
  { family: "DUI prevention", topic: "Effects of alcohol and drugs", module: "Module 5", pages: "10" },
  { family: "DUI prevention", topic: "BAC and impairment", module: "Module 5", pages: "10" },
  { family: "DUI prevention", topic: "Legal consequences", module: "Module 5", pages: "11" },
  { family: "DUI prevention", topic: "Financial consequences", module: "Module 5", pages: "11" },
  { family: "DUI prevention", topic: "Ways to avoid impaired driving", module: "Module 5", pages: "10–11" },
  { family: "Safety equipment", topic: "Safety belts", module: "Module 6", pages: "12" },
  { family: "Safety equipment", topic: "Head rests", module: "Module 6", pages: "12" },
  { family: "Safety equipment", topic: "Child restraints", module: "Module 6", pages: "12" },
  { family: "Safety equipment", topic: "Air bags", module: "Module 6", pages: "12" },
  { family: "Safety equipment", topic: "Maintenance and carbon monoxide", module: "Module 6", pages: "12" },
  { family: "Psychological factors", topic: "Stress", module: "Module 7", pages: "13" },
  { family: "Psychological factors", topic: "Fatigue", module: "Module 7", pages: "13" },
  { family: "Psychological factors", topic: "Emotional distress", module: "Module 7", pages: "13" },
  { family: "Psychological factors", topic: "Appropriate attitude", module: "Module 7", pages: "13" },
  { family: "Florida traffic laws", topic: "Point system and licensing actions", module: "Module 8", pages: "14" },
  { family: "Florida traffic laws", topic: "Speed limits", module: "Module 8", pages: "14" },
  { family: "Florida traffic laws", topic: "Signs, signals, and markings", module: "Module 8", pages: "14–15" },
  { family: "Florida traffic laws", topic: "School buses", module: "Module 8", pages: "15" },
  { family: "Florida traffic laws", topic: "Emergency vehicles", module: "Module 8", pages: "15" },
  { family: "Florida traffic laws", topic: "Required safety equipment", module: "Module 8", pages: "15" },
]

export const FLORIDA_BDI_EXAM_CONTROLS = {
  questionBankSize: 500,
  finalExamQuestions: 40,
  passingScorePercent: 80,
  randomized: true,
  integrityControlsActive: true,
  pilotJurisdiction: "Miami-Dade County (11th Judicial Circuit)",
  scriptVersion: "v0.2 Paginated — frozen March 31, 2026",
}

export const FLORIDA_BDI_VALIDATION_CONTROLS = [
  "The student who registers must be the same person who completes the course.",
  "Identity and participation validation prompts may appear at any point during instruction.",
  "Time-limited validation questions must be answered within the required window.",
  "Validation questions may ask about registration details or specific events from the course.",
  "Progress controls, knowledge checks, and final-test integrity safeguards are part of the course process and are not optional.",
  "Integrity controls remain active during the final test through the last question answered.",
  "Failure to satisfy course controls or pass the final test may result in course failure.",
]
