// Florida TLSAE course structure — tied to script draft (not yet paginated)
// Source: $base/02 Florida Course Tracks/TLSAE/02 TLSAE Script Outline and Timings.md
// Statutory basis: s. 322.095, F.S.
// Page references pending — script not yet drafted or paginated as of March 31, 2026

export const FLORIDA_TLSAE_MODULES = [
  {
    id: 1,
    slug: "module-1",
    title: "Module 1 — TLSAE Orientation and Course Integrity",
    pages: "TBD",
    estimatedMinutes: 15,
  },
  {
    id: 2,
    slug: "module-2",
    title: "Module 2 — Florida Traffic Laws: Signs, Signals, and Markings",
    pages: "TBD",
    estimatedMinutes: 35,
  },
  {
    id: 3,
    slug: "module-3",
    title: "Module 3 — Florida Traffic Laws: Rules of the Road and Right of Way",
    pages: "TBD",
    estimatedMinutes: 40,
  },
  {
    id: 4,
    slug: "module-4",
    title: "Module 4 — Florida Traffic Laws: Speed, Following Distance, and Safe Driving Techniques",
    pages: "TBD",
    estimatedMinutes: 30,
  },
  {
    id: 5,
    slug: "module-5",
    title: "Module 5 — Substance Abuse: Alcohol Effects, BAC, and Impaired Driving",
    pages: "TBD",
    estimatedMinutes: 45,
  },
  {
    id: 6,
    slug: "module-6",
    title: "Module 6 — Substance Abuse: Drugs (Prescription, OTC, Illegal) and Driving",
    pages: "TBD",
    estimatedMinutes: 35,
  },
  {
    id: 7,
    slug: "module-7",
    title: "Module 7 — Legal Consequences: DUI Law, License Consequences, and Florida Penalties",
    pages: "TBD",
    estimatedMinutes: 20,
  },
  {
    id: 8,
    slug: "module-8",
    title: "Module 8 — Final Test Administration",
    pages: "TBD",
    estimatedMinutes: 40,
  },
]

export const FLORIDA_TLSAE_MODULE_CONTENT: Record<
  string,
  {
    scriptPages: string
    intro: string
    sections: { heading: string; body: string[] }[]
    validationNote?: string
    draftNote: string
  }
> = {
  "module-1": {
    scriptPages: "TBD",
    draftNote: "Script not yet paginated — page references pending",
    intro:
      "Module 1 welcomes new drivers to the TLSAE course and frames it as a milestone in the Florida licensing process. Students learn what TLSAE is, why Florida requires it under s. 322.095, F.S., what they must do to receive a certificate of completion, and how identity and participation controls work.",
    sections: [
      {
        heading: "TLSAE as a pre-licensing requirement",
        body: [
          "Traffic Law and Substance Abuse Education (TLSAE) is required by Florida law before a first-time applicant can receive a Florida driver license.",
          "This is a licensing prerequisite, not a remedial or court-ordered course — completing it is a normal and important step in becoming a licensed driver.",
          "The course covers two subject areas: Florida traffic laws and substance abuse education.",
        ],
      },
      {
        heading: "Course completion requirements",
        body: [
          "The student must finish all required instruction and satisfy all course-validation requirements.",
          "The final test must be passed with a score of at least 80 percent.",
          "A certificate of completion is issued only after all required conditions are satisfied — not after time elapsed alone.",
          "The certificate connects directly to the Florida license application process.",
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
    ],
    validationNote:
      "Identity and participation controls are active from Module 1 through the final test. Time-limited prompts may appear at any point during the course.",
  },

  "module-2": {
    scriptPages: "TBD",
    draftNote: "Script not yet paginated — page references pending",
    intro:
      "Module 2 establishes fluency with Florida traffic control devices. New drivers learn to correctly read and respond to regulatory signs, warning signs, guide signs, traffic signals, and pavement markings. Florida-specific rules for school zones, work zones, and railroad crossings are covered.",
    sections: [
      {
        heading: "Regulatory signs",
        body: [
          "Regulatory signs tell drivers what they must or must not do — stop, yield, observe speed limits, stay out of restricted areas.",
          "Stop signs require a complete stop before the stop line, crosswalk, or intersection.",
          "Yield signs require slowing and giving way to conflicting traffic and pedestrians when safety requires it.",
          "Speed limit signs state the maximum lawful speed under normal conditions.",
        ],
      },
      {
        heading: "Warning signs",
        body: [
          "Warning signs alert drivers to hazards ahead — curves, intersections, school zones, railroad crossings, and changing conditions.",
          "Most warning signs are diamond-shaped and yellow-orange in color.",
          "Seeing a warning sign means the driver should reduce speed and increase alertness before reaching the hazard.",
        ],
      },
      {
        heading: "Traffic signals",
        body: [
          "A steady green signal means proceed if the intersection is clear — it does not mean the intersection is automatically safe.",
          "A yellow signal means the signal is about to turn red — prepare to stop unless stopping safely is not possible.",
          "A red signal means stop and remain stopped until the signal turns green.",
          "A flashing red signal must be treated as a stop sign — come to a full stop, then proceed when safe.",
          "A flashing yellow signal requires reducing speed and proceeding with heightened awareness.",
          "Arrow signals indicate permitted or protected movements — a green arrow permits that movement with protection.",
        ],
      },
      {
        heading: "Pavement markings",
        body: [
          "Pavement markings organize traffic lanes, indicate where stopping is required, and show turning movements.",
          "Yellow center lines separate opposing traffic. Broken yellow lines permit passing when safe. Solid yellow lines prohibit passing.",
          "White lane lines separate traffic moving in the same direction. Solid white lines should not be crossed.",
          "Crosswalk markings indicate pedestrian crossing areas where drivers must yield to pedestrians.",
        ],
      },
      {
        heading: "School zones, work zones, and railroad crossings",
        body: [
          "School zone speed limits apply during posted hours and must be strictly observed — children may enter the roadway unpredictably.",
          "Work zone speed limits carry increased fines and require heightened awareness due to workers and changed traffic patterns.",
          "At railroad crossings, a driver must stop when lights flash or the gate is down, and may not proceed until the crossing is fully clear.",
        ],
      },
    ],
  },

  "module-3": {
    scriptPages: "TBD",
    draftNote: "Script not yet paginated — page references pending",
    intro:
      "Module 3 builds a complete practical understanding of how traffic operates in Florida. New drivers learn right-of-way rules at all intersection types, Florida-specific laws for school buses and emergency vehicles, requirements for protecting pedestrians and bicyclists, and the rules governing lane use and passing.",
    sections: [
      {
        heading: "Right of way at intersections",
        body: [
          "At a controlled intersection, traffic signals and signs determine right of way.",
          "At an uncontrolled intersection, the driver who arrives first has right of way; when two vehicles arrive at the same time, the driver on the left yields to the driver on the right.",
          "At a four-way stop, vehicles proceed in the order of arrival. Simultaneous arrivals yield to the right.",
          "No driver can claim right of way in a way that eliminates the duty to avoid a crash.",
        ],
      },
      {
        heading: "Pedestrians and bicyclists",
        body: [
          "Drivers must yield to pedestrians in crosswalks, both marked and unmarked, at intersections.",
          "Florida law requires drivers to provide at least three feet of clearance when passing a bicyclist.",
          "Bicyclists are entitled to use the roadway and must be treated with the same respect as other vehicle operators.",
        ],
      },
      {
        heading: "School buses and emergency vehicles",
        body: [
          "When a school bus displays flashing red lights and extends its stop arm, all vehicles on the same road must stop — including those behind the bus and those approaching from the front on undivided roads.",
          "On a divided highway with a raised barrier, only vehicles behind the bus must stop.",
          "When an emergency vehicle approaches with lights and siren active, drivers must pull to the right edge of the road and stop.",
          "Do not block an intersection when yielding to an emergency vehicle.",
        ],
      },
      {
        heading: "Lane use, merging, and passing",
        body: [
          "Choose the lane appropriate to your destination and remain in it unless making a safe, signaled lane change.",
          "Passing should be done only when lawful and clearly safe — passing is never a response to impatience.",
          "Do not pass in areas marked with solid yellow center lines, in school zones, within 100 feet of an intersection, or where a no-passing zone is posted.",
        ],
      },
    ],
  },

  "module-4": {
    scriptPages: "TBD",
    draftNote: "Script not yet paginated — page references pending",
    intro:
      "Module 4 connects Florida speed laws and following-distance rules to real behind-the-wheel decisions. New drivers learn that posted limits describe maximum lawful speeds under normal conditions, that safe following distance must adapt to conditions, and that stopping requires more room than most drivers expect.",
    sections: [
      {
        heading: "Florida speed limits",
        body: [
          "Florida default speed limits: 30 mph in a business or residential district, 55 mph on most rural two-lane roads, 65–70 mph on limited-access roads and expressways.",
          "Reduced limits apply in school zones when children are present, in work zones, and near crosswalks.",
          "Posted limits represent maximum lawful speed under normal conditions — safe speed may be lower depending on traffic, weather, and visibility.",
          "Work zone violations carry double fines and can result in additional penalties.",
        ],
      },
      {
        heading: "Following distance",
        body: [
          "A minimum two-second following distance gives a driver time to perceive a hazard, react, and begin braking.",
          "Following distance should increase when driving at higher speeds, in rain or fog, behind large trucks, at night, or when the vehicle is heavily loaded.",
          "Tailgating reduces response time and creates rear-end crash risk.",
        ],
      },
      {
        heading: "Stopping distance",
        body: [
          "Total stopping distance equals perception time plus reaction time plus braking distance.",
          "At 60 mph, a vehicle may travel more than 300 feet before coming to a full stop — roughly the length of a football field.",
          "Wet or slippery roads increase braking distance significantly; early speed reduction is the best response to poor conditions.",
        ],
      },
      {
        heading: "Adverse conditions and night driving",
        body: [
          "Rain, fog, standing water, and reduced visibility all require earlier speed reductions and greater following distance.",
          "At night, headlights illuminate a shorter distance than the vehicle's stopping distance at highway speeds — drivers should slow enough to stop within the visible distance ahead.",
          "Scanning ahead — looking 10 to 15 seconds down the road — creates time to respond before a hazard becomes a crisis.",
        ],
      },
    ],
  },

  "module-5": {
    scriptPages: "TBD",
    draftNote: "Script not yet paginated — page references pending",
    intro:
      "Module 5 covers the pharmacology of alcohol and its effects on every driving skill. New drivers learn what blood alcohol concentration means, how it rises, how it degrades judgment and performance, and why legal limits are not the same as safe limits. Prevention planning tools are introduced before students ever face impairment pressure.",
    sections: [
      {
        heading: "How the body processes alcohol",
        body: [
          "Alcohol is absorbed quickly into the bloodstream through the stomach and small intestine.",
          "Only time eliminates alcohol from the body — coffee, food, cold air, and exercise do not speed up this process.",
          "Factors that affect how quickly BAC rises include body weight, sex, number of drinks, alcohol content, and time elapsed.",
        ],
      },
      {
        heading: "Blood alcohol concentration and impairment effects",
        body: [
          "Blood alcohol concentration (BAC) is the percentage of alcohol in the bloodstream, measured in grams per 100 milliliters.",
          "At BAC 0.02–0.05: some loss of judgment, relaxation, slight visual impairment, reduced coordination.",
          "At BAC 0.05–0.08: exaggerated behavior, reduced reaction time, reduced steering control, impaired balance.",
          "At BAC 0.08 and above: significant impairment of muscle coordination, reaction time, visual acuity, and judgment — illegal to drive in Florida.",
          "Judgment is often the first faculty affected, before a driver can perceive their own impairment.",
        ],
      },
      {
        heading: "Florida per se DUI thresholds",
        body: [
          "A driver is per se impaired at a BAC of 0.08 or higher.",
          "Commercial vehicle drivers are per se impaired at 0.04.",
          "Drivers under 21 are subject to Florida's zero-tolerance law at 0.02.",
          "Legal limits are not the same as safe limits — a driver can be unsafe to operate a vehicle before reaching any legal threshold.",
        ],
      },
      {
        heading: "Polydrug use and common myths",
        body: [
          "Combining alcohol with other substances — including prescription drugs — can multiply impairment beyond what either substance alone would cause.",
          "Feeling confident behind the wheel after drinking is an unreliable signal of actual driving ability.",
          "The only way to be certain a driver is not impaired by alcohol is to not drink before driving.",
        ],
      },
      {
        heading: "Prevention planning",
        body: [
          "Safe alternatives include using a designated driver, arranging a ride, staying over, or changing plans before drinking begins.",
          "Prevention planning works best before alcohol consumption starts, because judgment — the tool needed to plan — is impaired early.",
        ],
      },
    ],
  },

  "module-6": {
    scriptPages: "TBD",
    draftNote: "Script not yet paginated — page references pending",
    intro:
      "Module 6 extends substance abuse education to prescription medications, over-the-counter drugs, and illegal substances. New drivers learn that impairment is a function of the drug's effect on the brain, not its legal status, and that the driver bears personal responsibility for knowing whether any substance they have taken affects driving ability.",
    sections: [
      {
        heading: "Prescription medications and driving",
        body: [
          "Many prescription medications affect driving ability, including sedatives, opioids, antihistamines, antidepressants, and antianxiety medications.",
          "A 'do not operate heavy machinery' warning on a prescription label applies directly to driving.",
          "Tolerance to a medication's sedating effects does not mean driving ability is unaffected.",
          "Drivers must consult their prescriber or pharmacist if uncertain whether a medication affects driving.",
        ],
      },
      {
        heading: "Over-the-counter drugs",
        body: [
          "Antihistamines found in allergy and cold medications can cause significant drowsiness — even non-drowsy formulations may affect some individuals.",
          "Sleep aids, cough suppressants, and some pain medications can reduce alertness and reaction time.",
          "OTC drugs are available without a prescription but can impair driving in the same way as controlled substances.",
        ],
      },
      {
        heading: "Illegal drugs and marijuana",
        body: [
          "Marijuana impairs reaction time, tracking ability, divided attention, and time perception — all critical driving skills.",
          "The impairment from marijuana is not eliminated by a medical marijuana certification or by the drug's legal status in any jurisdiction.",
          "Stimulants such as cocaine and methamphetamine cause impaired judgment, aggression, and erratic risk-taking behavior.",
          "Depressants slow the central nervous system, causing sedation and reduced response speed.",
        ],
      },
      {
        heading: "Polydrug combinations and driver responsibility",
        body: [
          "Two substances that each cause mild impairment can combine to cause severe impairment — the effects are not simply additive.",
          "Florida DUI law applies to any driver impaired by alcohol, any chemical substance, or any controlled substance — legal status of the substance is irrelevant.",
          "It is the driver's personal responsibility to know whether any substance taken before driving affects their ability to drive safely.",
          "When in doubt, do not drive.",
        ],
      },
    ],
  },

  "module-7": {
    scriptPages: "TBD",
    draftNote: "Script not yet paginated — page references pending",
    intro:
      "Module 7 presents the full legal and administrative consequences of impaired driving in Florida. New drivers learn about DUI definitions, implied consent, arrest consequences, criminal penalties, and the long-term impact on insurance and employment. The module closes with an emphasis on personal responsibility and the habits formed early in a driving career.",
    sections: [
      {
        heading: "Florida DUI defined",
        body: [
          "DUI in Florida means driving or being in actual physical control of a vehicle while impaired by alcohol, a chemical substance, or a controlled substance.",
          "Impairment is defined as the ability to operate the vehicle being affected to an appreciable degree.",
          "Per se DUI: BAC at or above 0.08 (0.04 for commercial drivers, 0.02 for drivers under 21) constitutes impairment by law regardless of observed behavior.",
        ],
      },
      {
        heading: "Implied consent and refusal",
        body: [
          "By driving on Florida public roads, drivers consent to chemical testing (breath, blood, or urine) if lawfully arrested for DUI.",
          "Refusing a chemical test results in an automatic license suspension — one year for a first refusal.",
          "A second refusal is a first-degree misdemeanor in addition to the license suspension.",
        ],
      },
      {
        heading: "First DUI penalties",
        body: [
          "Fines of $500 to $1,000 for a first DUI conviction (higher if BAC is 0.15 or higher or a minor is in the vehicle).",
          "Up to six months in jail, probation, community service, and mandatory DUI school.",
          "Vehicle impoundment for 10 days.",
          "Ignition interlock device required if BAC was 0.15 or higher or if a minor was in the vehicle.",
          "License revocation for a minimum of 180 days.",
        ],
      },
      {
        heading: "Repeat DUI and DUI manslaughter",
        body: [
          "Each subsequent DUI conviction carries escalating fines, longer mandatory imprisonment, and longer license revocations.",
          "A third DUI within 10 years is a third-degree felony.",
          "DUI manslaughter — causing the death of another person while driving impaired — is a second-degree felony with mandatory imprisonment.",
        ],
      },
      {
        heading: "Long-term consequences and personal responsibility",
        body: [
          "A DUI conviction requires an SR-22 insurance filing and will increase insurance premiums substantially.",
          "DUI convictions can affect employment, professional licenses, and security clearances.",
          "The habits a new driver forms in the first years of driving tend to persist — making safe choices early creates a safer pattern for the long term.",
          "Every decision to drive impaired puts the driver, passengers, and everyone else on the road at risk.",
        ],
      },
    ],
  },

  "module-8": {
    scriptPages: "TBD",
    draftNote: "Script not yet paginated — page references pending",
    intro:
      "Module 8 administers the final test and closes the formal instructional sequence. Students receive instructions on test format, integrity rules, the retake policy, and the process for receiving their certificate of completion.",
    sections: [
      {
        heading: "Final test format",
        body: [
          "The student receives a randomized final test of at least 40 questions drawn from the approved 500-question bank.",
          "Passing score is 80 percent — at least 32 of 40 questions must be answered correctly.",
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
        heading: "Certificate of completion",
        body: [
          "A certificate of completion is issued only after the student passes the final test and all integrity conditions are satisfied.",
          "The certificate is required for the Florida first-time license application — this course is a licensing prerequisite.",
          "Completing this course is a meaningful step toward becoming a licensed Florida driver.",
        ],
      },
    ],
    validationNote:
      "Course completion is confirmed only after the student passes the final test and all integrity conditions are satisfied. The certificate is not issued until all requirements are met.",
  },
}

export const FLORIDA_TLSAE_TOPIC_MATRIX = [
  { family: "Florida Traffic Laws", topic: "Regulatory signs (stop, yield, speed limit, do not enter, one way)", module: "Module 2", pages: "" },
  { family: "Florida Traffic Laws", topic: "Warning signs (color, shape, interpretation)", module: "Module 2", pages: "" },
  { family: "Florida Traffic Laws", topic: "Guide and informational signs", module: "Module 2", pages: "" },
  { family: "Florida Traffic Laws", topic: "Traffic signals: standard green/yellow/red", module: "Module 2", pages: "" },
  { family: "Florida Traffic Laws", topic: "Traffic signals: flashing red (stop sign treatment)", module: "Module 2", pages: "" },
  { family: "Florida Traffic Laws", topic: "Traffic signals: flashing yellow (reduce speed and heightened awareness)", module: "Module 2", pages: "" },
  { family: "Florida Traffic Laws", topic: "Traffic signals: arrow signals", module: "Module 2", pages: "" },
  { family: "Florida Traffic Laws", topic: "Pedestrian signals and crosswalk rules", module: "Module 2", pages: "" },
  { family: "Florida Traffic Laws", topic: "Pavement markings: lane lines, edge lines, center lines", module: "Module 2", pages: "" },
  { family: "Florida Traffic Laws", topic: "Pavement markings: crosswalk markings and turn arrows", module: "Module 2", pages: "" },
  { family: "Florida Traffic Laws", topic: "School zone and work zone signs and speed requirements", module: "Module 2", pages: "" },
  { family: "Florida Traffic Laws", topic: "Railroad crossing signs and signals", module: "Module 2", pages: "" },
  { family: "Right of Way and Vehicle Operation", topic: "Right of way at controlled intersections", module: "Module 3", pages: "" },
  { family: "Right of Way and Vehicle Operation", topic: "Right of way at uncontrolled intersections", module: "Module 3", pages: "" },
  { family: "Right of Way and Vehicle Operation", topic: "Right of way at four-way stops", module: "Module 3", pages: "" },
  { family: "Right of Way and Vehicle Operation", topic: "Pedestrian right of way — crosswalk yielding", module: "Module 3", pages: "" },
  { family: "Right of Way and Vehicle Operation", topic: "Bicyclists — three-foot passing law", module: "Module 3", pages: "" },
  { family: "Right of Way and Vehicle Operation", topic: "Motorcyclists — lane sharing and blind spots", module: "Module 3", pages: "" },
  { family: "Right of Way and Vehicle Operation", topic: "School bus stopping requirements", module: "Module 3", pages: "" },
  { family: "Right of Way and Vehicle Operation", topic: "Emergency vehicle yielding — pull right and stop", module: "Module 3", pages: "" },
  { family: "Right of Way and Vehicle Operation", topic: "Lane use, lane changes, and merging", module: "Module 3", pages: "" },
  { family: "Right of Way and Vehicle Operation", topic: "Passing — legal conditions and prohibited situations", module: "Module 3", pages: "" },
  { family: "Right of Way and Vehicle Operation", topic: "Florida default speed limits (residential, highway, school zone, business)", module: "Module 4", pages: "" },
  { family: "Right of Way and Vehicle Operation", topic: "Safe speed under conditions vs. posted limit", module: "Module 4", pages: "" },
  { family: "Right of Way and Vehicle Operation", topic: "Work zone speed rules and double fines", module: "Module 4", pages: "" },
  { family: "Right of Way and Vehicle Operation", topic: "Following distance — two-second rule and extensions", module: "Module 4", pages: "" },
  { family: "Right of Way and Vehicle Operation", topic: "Stopping distance — perception, reaction, braking", module: "Module 4", pages: "" },
  { family: "Right of Way and Vehicle Operation", topic: "Speed and following distance in adverse weather", module: "Module 4", pages: "" },
  { family: "Right of Way and Vehicle Operation", topic: "Night driving — reduced sight distance", module: "Module 4", pages: "" },
  { family: "Alcohol and Impairment", topic: "Alcohol absorption and elimination by the body", module: "Module 5", pages: "" },
  { family: "Alcohol and Impairment", topic: "Blood alcohol concentration (BAC) — definition and calculation factors", module: "Module 5", pages: "" },
  { family: "Alcohol and Impairment", topic: "BAC levels and corresponding impairment effects", module: "Module 5", pages: "" },
  { family: "Alcohol and Impairment", topic: "Florida per se DUI threshold — 0.08 general, 0.04 commercial, 0.02 under-21", module: "Module 5", pages: "" },
  { family: "Alcohol and Impairment", topic: "Judgment impairment begins before legal limit", module: "Module 5", pages: "" },
  { family: "Alcohol and Impairment", topic: "Myths about sobering up — only time eliminates alcohol", module: "Module 5", pages: "" },
  { family: "Alcohol and Impairment", topic: "Polydrug use — alcohol combined with other substances", module: "Module 5", pages: "" },
  { family: "Alcohol and Impairment", topic: "Prevention planning — designated driver and alternatives", module: "Module 5", pages: "" },
  { family: "Drug Impairment", topic: "Prescription medications and driving — sedatives, opioids, antihistamines", module: "Module 6", pages: "" },
  { family: "Drug Impairment", topic: "Reading medication warnings and driver responsibility", module: "Module 6", pages: "" },
  { family: "Drug Impairment", topic: "Over-the-counter drugs — antihistamines, cold medications, sleep aids", module: "Module 6", pages: "" },
  { family: "Drug Impairment", topic: "Marijuana — reaction time, tracking ability, divided attention", module: "Module 6", pages: "" },
  { family: "Drug Impairment", topic: "Stimulants — impaired judgment and risk-taking behavior", module: "Module 6", pages: "" },
  { family: "Drug Impairment", topic: "Depressants — sedation and slowed response", module: "Module 6", pages: "" },
  { family: "Drug Impairment", topic: "Polydrug combinations — compounding impairment effects", module: "Module 6", pages: "" },
  { family: "Drug Impairment", topic: "Florida DUI law applies to any impairing substance", module: "Module 6", pages: "" },
  { family: "Legal Consequences", topic: "Florida DUI defined — impairment by alcohol, chemical, or controlled substance", module: "Module 7", pages: "" },
  { family: "Legal Consequences", topic: "Implied consent law and refusal consequences", module: "Module 7", pages: "" },
  { family: "Legal Consequences", topic: "First DUI penalties — fines, probation, impoundment, interlock", module: "Module 7", pages: "" },
  { family: "Legal Consequences", topic: "Repeat DUI — escalating penalties and mandatory imprisonment", module: "Module 7", pages: "" },
  { family: "Legal Consequences", topic: "DUI manslaughter — felony and mandatory imprisonment", module: "Module 7", pages: "" },
  { family: "Legal Consequences", topic: "Administrative license suspension — immediate at arrest", module: "Module 7", pages: "" },
  { family: "Legal Consequences", topic: "Insurance consequences — SR-22 and premium increases", module: "Module 7", pages: "" },
]

export const FLORIDA_TLSAE_EXAM_CONTROLS = {
  questionBankSize: 500,
  finalExamQuestions: 40,
  passingScorePercent: 80,
  randomized: true,
  integrityControlsActive: true,
  pilotJurisdiction: "Miami-Dade County (11th Judicial Circuit)",
  scriptVersion: "Draft — not yet paginated",
  courseCode: "fl-tlsae",
  statuteReference: "s. 322.095, F.S.",
  minimumHours: 4,
}

export const FLORIDA_TLSAE_VALIDATION_CONTROLS = [
  "The student who registers must be the same person who completes the course.",
  "Identity and participation validation prompts may appear at any point during instruction.",
  "Time-limited validation questions must be answered within the required window.",
  "Validation questions may ask about registration details or specific events from the course.",
  "Progress controls, knowledge checks, and final-test integrity safeguards are part of the course process and are not optional.",
  "Integrity controls remain active during the final test through the last question answered.",
  "Failure to satisfy course controls or pass the final test may result in course failure.",
]
