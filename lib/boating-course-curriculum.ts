export type BoatingLesson = {
  id: number
  slug: string
  title: string
  estimatedMinutes: number
  moduleCode: string
}

export type BoatingLessonSection = {
  heading: string
  body: string[]
}

export type BoatingLessonContent = {
  intro: string
  sections: BoatingLessonSection[]
  takeaway: string
}

export type BoatingLessonCheckQuestion = {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export const BOATING_LESSONS: BoatingLesson[] = [
  {
    id: 1,
    slug: "lesson-1",
    title: "Lesson 1 - Boating Terms, Boat Types, and Stability",
    estimatedMinutes: 45,
    moduleCode: "core-1",
  },
  {
    id: 2,
    slug: "lesson-2",
    title: "Lesson 2 - Required Equipment and Passenger Readiness",
    estimatedMinutes: 45,
    moduleCode: "core-2",
  },
  {
    id: 3,
    slug: "lesson-3",
    title: "Lesson 3 - Trip Planning, Weather, and Go or No-Go Decisions",
    estimatedMinutes: 45,
    moduleCode: "core-2",
  },
  {
    id: 4,
    slug: "lesson-4",
    title: "Lesson 4 - Safe Operation, Navigation Rules, and Sharing the Water",
    estimatedMinutes: 60,
    moduleCode: "core-3",
  },
  {
    id: 5,
    slug: "lesson-5",
    title: "Lesson 5 - Emergencies, Falls Overboard, and Environmental Duties",
    estimatedMinutes: 60,
    moduleCode: "core-4",
  },
  {
    id: 6,
    slug: "lesson-6",
    title: "Lesson 6 - Powerboat Systems, Fueling, and Preventive Checks",
    estimatedMinutes: 55,
    moduleCode: "power-1",
  },
  {
    id: 7,
    slug: "lesson-7",
    title: "Lesson 7 - Trailering, Docking, Anchoring, and Water-Jet Safety",
    estimatedMinutes: 55,
    moduleCode: "power-2",
  },
]

export const BOATING_LESSON_CONTENT: Record<string, BoatingLessonContent> = {
  "lesson-1": {
    intro:
      "Students should begin boating safety with shared language and core boat-behavior concepts. Before someone can understand safe speed, right-of-way, or emergency response, they need to understand what kind of boat they are operating, what the boat is designed to do, and what loading or movement can do to stability.",
    sections: [
      {
        heading: "Why terminology matters on the water",
        body: [
          "Boating communication depends on precise words. Terms such as bow, stern, port, starboard, draft, freeboard, and capacity are not just vocabulary words. They describe orientation, risk, and decision-making.",
          "When a passenger hears instructions during docking, anchoring, or an emergency, confusion can create delay. Clear terminology helps everyone understand directions quickly.",
          "Good entry-level boating instruction should make students comfortable with the words they will see on labels, charts, state guidance, and safety briefings.",
        ],
      },
      {
        heading: "Boat types and handling differences",
        body: [
          "Not all boats handle the same way. A small open fishing boat, pontoon, runabout, personal watercraft, and larger cabin boat each respond differently to wind, current, loading, and speed.",
          "Students should understand that a boat's length, beam, hull shape, and propulsion type affect turning, stopping, visibility, and stability.",
          "A safe operator does not assume that experience with one type of vessel automatically transfers to another without adjustment.",
        ],
      },
      {
        heading: "Capacity, loading, and balance",
        body: [
          "Loading affects nearly everything about boat safety. Too much weight, poor passenger placement, or uneven gear distribution can reduce stability and increase the chance of swamping, capsizing, or difficulty maneuvering.",
          "Weight should be kept low and centered whenever possible. Sudden movement from passengers can also shift balance in a way that surprises a new operator.",
          "Capacity ratings and manufacturer recommendations exist because the safe operating envelope of a boat is limited.",
        ],
      },
      {
        heading: "The difference between confidence and control",
        body: [
          "Many boating incidents happen when operators feel comfortable but are not actually in full control of the boat, the environment, or their passengers.",
          "Control comes from understanding what the boat can do in current conditions, how quickly it can respond, and what will happen if someone moves unexpectedly or the environment changes.",
          "The first lesson should frame boating as an activity that rewards preparation and humility, not improvisation.",
        ],
      },
    ],
    takeaway:
      "Safe boating starts with understanding the vessel itself. Boat type, loading, balance, and basic terminology shape every later safety decision.",
  },
  "lesson-2": {
    intro:
      "Required equipment is not a checklist to memorize and forget. It is the foundation that turns a routine day on the water into a manageable situation when conditions change, someone falls overboard, or the boat becomes disabled.",
    sections: [
      {
        heading: "Life jackets as real safety equipment",
        body: [
          "A life jacket is most valuable before a person enters the water. In many incidents there is no time to find, fit, and secure one after a sudden fall, ejection, or capsize.",
          "Students should understand carriage requirements, wearable versus throwable devices, fit, sizing, and why proper wear matters more than simple possession.",
          "A boating course should reinforce that the safest life jacket is the one that is ready to work immediately for the actual person using it.",
        ],
      },
      {
        heading: "Core equipment every beginner should recognize",
        body: [
          "Beyond life jackets, entry-level students should recognize sound-producing devices, navigation lights, registration or documentation expectations, visual distress signaling where required, and basic emergency gear.",
          "Equipment rules vary by vessel and waterway, but the learning objective is broader than legal recall. Students should understand what each item is for, when it is needed, and how to keep it usable.",
          "A course should also build the habit of checking condition, accessibility, and crew familiarity before leaving the dock or ramp.",
        ],
      },
      {
        heading: "Legal readiness and required documents",
        body: [
          "Required carriage is only one part of boating readiness. Operators should also understand that registration, numbering, capacity labels, local rules, and certain federal requirements stay attached to the boat even when the trip feels casual or familiar.",
          "Entry-level students should be able to identify what proof, labels, and basic documents should remain available on the boat and when local waterway rules add extra operating restrictions.",
          "This legal-readiness habit matters because safe operators do not wait for an enforcement stop or emergency to discover that a key requirement was overlooked.",
        ],
      },
      {
        heading: "Passenger briefings reduce panic and confusion",
        body: [
          "Passengers often create additional risk because they do not know where equipment is stored, where to sit, or what to do if something changes quickly.",
          "A short pre-departure briefing should cover life jackets, routine and emergency communication, safe movement, seated positions, falls overboard, line handling, and expectations around operator instructions.",
          "Good operators treat passenger readiness as part of the trip, not an optional extra.",
        ],
      },
      {
        heading: "Equipment that is accessible is equipment that counts",
        body: [
          "Safety gear buried under bags or trapped in compartments may not be usable when seconds matter.",
          "Students should learn to think about access, not just inventory. They should also understand maintenance basics so gear does not fail when it is finally needed.",
          "This mindset carries into fire extinguishers, first-aid kits, communication devices, and any item that would matter in a loss-of-control or injury event.",
        ],
      },
    ],
    takeaway:
      "Required equipment protects people only when it fits, works, and is ready to use. Passenger readiness is part of equipment readiness.",
  },
  "lesson-3": {
    intro:
      "A safe boating trip begins before launch. Weather, local conditions, route knowledge, crew readiness, and simple go or no-go judgment often matter more than boat-handling skill once trouble has already started.",
    sections: [
      {
        heading: "Trip planning is risk management",
        body: [
          "Trip planning means matching the boat, operator skill, passengers, and intended route to expected conditions. It is one of the clearest ways to prevent incidents before the engine starts.",
          "Students should learn to review route length, fuel needs, communication options, local hazards, shallow areas, tides or currents where relevant, and the operator's own experience level.",
          "Strong trip planning reduces surprise and improves confidence without relying on guesswork.",
        ],
      },
      {
        heading: "Weather is more than rain or sun",
        body: [
          "Boaters should be taught to think about wind, storms, lightning, visibility, waves, temperature, fog, and changing local conditions rather than treating weather as a simple forecast icon.",
          "Small changes in wind or water state can have a much larger effect on a boat than new students expect.",
          "A course should train students to check reliable weather sources, re-check conditions if plans change, and cancel or delay a trip when the safety margin is no longer there.",
        ],
      },
      {
        heading: "Float plans and local knowledge",
        body: [
          "A float plan gives someone ashore the information they need if the trip does not go as expected. It is a communication tool, not a complicated formality.",
          "Students should know what to include, who should have it, and when to cancel it after returning safely.",
          "Local knowledge matters too. Hazards such as sandbars, submerged objects, low water, no-wake zones, restricted areas, and busy launch ramps may not be obvious to a visitor.",
        ],
      },
      {
        heading: "Communication tools and emergency information",
        body: [
          "Trip planning should include a realistic communication plan. Students should understand the practical role of charged mobile phones, VHF radios where appropriate, emergency contact information, and how location details will be shared if help is needed.",
          "A boating course should also teach that communication equipment does not replace judgment. It supports judgment by making it easier to report location, describe conditions, and activate help earlier.",
          "The safest communication plan is one the operator can actually use under stress, not a theoretical backup buried in a compartment.",
        ],
      },
      {
        heading: "Go or no-go decisions",
        body: [
          "Operators need explicit permission to cancel plans. A beginner who feels pressure to launch anyway may ignore multiple warning signs because the group expects to continue.",
          "A course should teach that uncomfortable conditions, missing gear, a fatigued operator, an unprepared passenger group, or a questionable mechanical issue are all valid reasons to delay or cancel.",
          "Good judgment is not proven by going out. It is proven by making the safer decision.",
        ],
      },
    ],
    takeaway:
      "Trip planning turns information into safer decisions. Weather, route knowledge, crew readiness, and the willingness to cancel are core boating skills.",
  },
  "lesson-4": {
    intro:
      "Once underway, the operator's main job is to maintain awareness, communicate clearly, and avoid situations that create collision, wake, or passenger risk. Safe boating combines seamanship, courtesy, and compliance with navigation basics.",
    sections: [
      {
        heading: "Operator responsibility underway",
        body: [
          "The operator is responsible for the safety of the people aboard and for the way the vessel affects others on, in, or near the water.",
          "That includes lookout, situational awareness, speed control, awareness of controlled or dangerous areas, and thoughtful communication with passengers before turns, acceleration, docking, or other changes.",
          "Students should be taught that safe operation is active and continuous, not something that happens automatically after launch.",
        ],
      },
      {
        heading: "Safe speed and collision avoidance",
        body: [
          "Safe speed depends on visibility, traffic density, maneuverability, wind, current, waves, and the operator's ability to identify and respond to hazards in time.",
          "Students should learn that navigation rules support predictable conduct, but rules do not remove the need for judgment. The operator must still avoid collision and keep proper lookout.",
          "A good entry-level course should introduce overtaking, head-on, crossing, narrow channels, stand-on and give-way responsibilities, and the idea that restricted visibility changes the safety margin significantly.",
        ],
      },
      {
        heading: "Alcohol, drugs, and operator judgment",
        body: [
          "Basic boating knowledge should address alcohol and drug impairment directly. Judgment, balance, reaction time, and risk perception all matter on the water, and environmental stressors such as sun, wind, fatigue, and dehydration can magnify impairment.",
          "Students should understand that the safest operator treats boating under the influence as both a legal risk and a collision or drowning risk.",
          "The course should reinforce that operator responsibility includes protecting passengers and nearby water users from decisions made under reduced judgment.",
        ],
      },
      {
        heading: "Sharing the water with courtesy",
        body: [
          "Wake impact, congestion near ramps, fishing areas, paddlers, swimmers, and shoreline users all require respectful operation.",
          "Unsafe or discourteous boating can create injuries and conflict even when no collision happens.",
          "Students should learn to think beyond their own boat. Sharing the water safely includes slowing early, avoiding careless maneuvering, and recognizing that other users may be more vulnerable.",
        ],
      },
      {
        heading: "Markers, aids, and local controls",
        body: [
          "Boaters should recognize the purpose of aids to navigation, regulatory markers, information markers, danger markers, and exclusion areas.",
          "Even basic students need to understand that marker systems are there to organize movement, warn of hazards, and protect sensitive or high-risk areas.",
          "A beginner course should connect these systems to real behavior, not just label recognition. That includes respecting diver-down warnings, restricted or security zones, and the special vulnerability of anglers, paddlers, and swimmers.",
        ],
      },
    ],
    takeaway:
      "Safe operation means lookout, communication, speed control, and waterway courtesy working together at all times.",
  },
  "lesson-5": {
    intro:
      "Emergency preparedness is a core part of entry-level boating education because many incidents escalate quickly. The goal is not to make new boaters fearful. It is to make them harder to surprise and more capable of responding in order.",
    sections: [
      {
        heading: "Responding to falls overboard and capsize",
        body: [
          "Falls overboard and capsize-related incidents often become drowning incidents if the crew is unprepared or separated from flotation.",
          "Students should understand the importance of immediate communication, keeping visual contact, slowing or stopping appropriately, and using flotation and recovery procedures suited to the boat.",
          "For small craft especially, staying with the boat or stabilizing the boat may be more survivable than swimming away from it.",
        ],
      },
      {
        heading: "Calling for help and rendering assistance",
        body: [
          "A safe boater should know when they are obligated and able to assist another person in distress, and when helping would create an additional emergency.",
          "Students should learn the role of communication devices, emergency contacts, accurate location details, and the practical duty to render assistance when it can be done without creating a greater hazard.",
          "Calm communication improves rescue outcomes and reduces confusion during high-stress moments. A basic course should also introduce incident and accident reporting expectations so operators understand that some events create a duty to notify authorities, not just return home quietly.",
        ],
      },
      {
        heading: "Fire, flooding, grounding, and disabled boats",
        body: [
          "Beginner boaters should know the basic first actions for common emergencies such as onboard fire, flooding, grounding, engine failure, or battery-related loss of propulsion.",
          "The correct first response often involves stopping, protecting people, using the right equipment, and avoiding actions that make the situation worse.",
          "Preparedness is built through simple repeated concepts: stay calm, protect life first, communicate clearly, and use the boat and equipment in the safest available way.",
        ],
      },
      {
        heading: "Environmental stewardship and exposure risk",
        body: [
          "Environmental responsibilities such as fuel handling, waste management, avoiding discharge, preventing invasive-species transfer, and reducing avoidable shoreline or habitat damage belong in the same course as emergency response.",
          "A course that teaches stewardship also teaches discipline. The same habits that prevent pollution often reflect the same habits that prevent carelessness, and the same trip-planning mindset helps operators account for cold water, heat stress, lightning, and fatigue.",
          "Students should leave with the idea that good boaters protect both people and the waterways they use, including by avoiding pollution, respecting wildlife, and preventing invasive-species transfer at ramps and marinas.",
        ],
      },
    ],
    takeaway:
      "Emergency response works best when it is simple, practiced, and life-first. Stewardship belongs in the same mindset as safety.",
  },
  "lesson-6": {
    intro:
      "Power-driven boats introduce additional hazards through fuel, ignition, engines, ventilation, electrical systems, and preventive maintenance failures. New operators need practical system awareness, not just legal language, to stay safe before launch and before restarting after fueling or troubleshooting.",
    sections: [
      {
        heading: "Powerboat systems students should recognize",
        body: [
          "Students should understand why horsepower ratings, ventilation systems, back-fire flame control devices, engine cut-off devices, and fire extinguishers matter on real boats.",
          "The purpose is not to turn them into mechanics. It is to help them recognize high-consequence systems, perform sensible checks, and avoid unsafe assumptions.",
          "A boating course should connect each system to the risk it helps control, such as explosion, loss of propulsion, runaway boat movement, or delayed emergency response.",
        ],
      },
      {
        heading: "Preventive checks before getting underway",
        body: [
          "Basic powerboat instruction should teach the operator to pause before launch and check the systems most likely to create a preventable incident: fuel, ventilation, batteries, steering, throttle response, engine cut-off attachment, bilge condition, and visible hose or through-hull problems.",
          "These checks matter because many boating emergencies begin as overlooked maintenance or setup issues rather than sudden mysteries on the water.",
          "A reliable operator learns simple repeatable pre-launch checks instead of relying on confidence or habit alone.",
        ],
      },
      {
        heading: "Fueling and carbon monoxide awareness",
        body: [
          "Fueling is a routine task with non-routine consequences when done carelessly. Students should learn ventilation practices, ignition-source awareness, spill prevention, and why gasoline fumes are especially dangerous.",
          "Carbon monoxide also deserves explicit attention because enclosed or poorly ventilated spaces near engines and exhaust can become hazardous without obvious warning signs.",
          "Entry-level instruction should teach that convenience never outranks ventilation, inspection, and passenger safety during fueling or engine use.",
        ],
      },
      {
        heading: "Electrical, fuel, and fire-control systems",
        body: [
          "Entry-level powerboat students should understand the role of battery switches, wiring awareness, fuel-line integrity, ventilation blowers where installed, and available fire extinguishers that fit the boat and its compartments.",
          "The goal is not advanced repair. It is recognition: if fuel odor, smoke, electrical damage, or unexplained bilge water appears, the operator should know this is a stop-and-investigate moment, not a launch-anyway moment.",
          "Safety equipment and system checks are linked. Fire extinguishers, flame control devices, and ventilation practices only help if the operator remembers them before the emergency starts.",
        ],
      },
    ],
    takeaway:
      "Powerboat safety starts before launch. System checks, fueling discipline, ventilation awareness, and engine cut-off habits prevent many avoidable incidents.",
  },
  "lesson-7": {
    intro:
      "Many beginner mistakes happen in the low-speed phases of boating: trailering, launching, docking, anchoring, towing, and maneuvering personal watercraft or other water-jet-propelled craft. These moments reward preparation and patience more than speed or bravado.",
    sections: [
      {
        heading: "Trailering, launching, and retrieval",
        body: [
          "Many beginner incidents happen before the boat is even fully underway. Backing errors, loose gear, crowded ramps, slippery surfaces, and rushed preparation create unnecessary risk.",
          "Students should understand the value of preparing the boat away from the ramp, assigning simple roles, checking tie-downs and lines, and keeping launch areas efficient and courteous.",
          "A smooth launch or retrieval usually reflects preparation rather than skillful improvisation under pressure.",
        ],
      },
      {
        heading: "Docking, mooring, and wake control",
        body: [
          "Powerboat handling near docks, moorings, and other vessels requires low-speed patience and awareness of wind, current, and limited space.",
          "Students should understand that wake responsibility extends into marinas, shorelines, narrow channels, and any area where nearby boats, paddlers, or people on docks can be affected by careless speed.",
          "This lesson should reinforce that low-speed moments deserve as much discipline as higher-speed travel.",
        ],
      },
      {
        heading: "Anchoring, scope, and towing awareness",
        body: [
          "Anchoring is not just dropping weight overboard. Entry-level students should understand anchor selection basics, bottom considerations, adequate scope, and the importance of confirming that the boat is actually set and clear of hazards.",
          "If the course introduces towing or towed watersports, students should also understand observer needs, propeller and rope hazards, reboarding zones, and why towing changes stopping distance and operator workload.",
          "Good anchoring and towing decisions depend on preparation, not improvisation after the boat is already drifting or the rider is already in the water.",
        ],
      },
      {
        heading: "Water-jet and personal watercraft handling",
        body: [
          "Water-jet-propelled craft and personal watercraft deserve specific attention because they accelerate quickly, steer differently than some beginners expect, and create unique rider-position, reboarding, and off-throttle control issues.",
          "Students should understand that these craft still require situational awareness, lookout, separation from swimmers and divers, and strict respect for jet-drive handling characteristics.",
          "A standards-aligned boating course should not treat water-jet or PWC use as a small side note. It should prepare beginners for the different control feel and the consequences of careless close-quarters operation.",
        ],
      },
    ],
    takeaway:
      "Low-speed boating requires real discipline. Trailering, docking, anchoring, towing, and water-jet handling are safety skills, not afterthoughts.",
  },
}

export const BOATING_LESSON_CHECKS: Record<
  string,
  BoatingLessonCheckQuestion[]
> = {
  "lesson-1": [
    {
      id: 1,
      question: "Why are basic boating terms important?",
      options: [
        "They help passengers decorate the boat",
        "They improve communication and reduce confusion",
        "They replace the need for safety briefings",
        "They matter only on large commercial vessels",
      ],
      correctAnswer: 1,
      explanation:
        "Clear terminology helps operators and passengers understand directions and respond faster during normal operation and emergencies.",
    },
    {
      id: 2,
      question: "What is one reason boat type matters?",
      options: [
        "Every boat handles the same way",
        "Boat design affects control and stability",
        "Only color affects safety",
        "Boat type matters only for registration",
      ],
      correctAnswer: 1,
      explanation:
        "Hull shape, propulsion, size, and layout all influence how a vessel turns, stops, and reacts to conditions.",
    },
    {
      id: 3,
      question: "Unsafe loading can increase the risk of:",
      options: [
        "Better fuel economy",
        "More predictable handling",
        "Capsizing or loss of control",
        "Shorter stopping distance",
      ],
      correctAnswer: 2,
      explanation:
        "Too much weight or poor balance can reduce stability and make the boat harder to control safely.",
    },
  ],
  "lesson-2": [
    {
      id: 1,
      question: "When is a life jacket most valuable?",
      options: [
        "Only after a person is already in the water",
        "When it is ready before an emergency happens",
        "Only during a storm",
        "Only for children",
      ],
      correctAnswer: 1,
      explanation:
        "Life jackets protect best when they fit and are ready before a fall, capsize, or sudden emergency.",
    },
    {
      id: 2,
      question: "A strong passenger briefing should include:",
      options: [
        "Only the trip destination",
        "Life jackets, movement, and emergency expectations",
        "Only music and seating preferences",
        "Nothing unless the water is rough",
      ],
      correctAnswer: 1,
      explanation:
        "Passengers should know where gear is, how to move safely, and what to do if the operator gives instructions quickly.",
    },
    {
      id: 3,
      question: "Why does accessibility matter for safety equipment?",
      options: [
        "Because hidden gear is faster to use",
        "Because equipment that cannot be reached may not help when needed",
        "Because rules apply only at the dock",
        "Because maintenance becomes unnecessary",
      ],
      correctAnswer: 1,
      explanation:
        "Equipment that is buried or blocked may be useless during a fast-moving emergency.",
    },
  ],
  "lesson-3": [
    {
      id: 1,
      question: "Trip planning is best described as:",
      options: [
        "A waste of time for short outings",
        "Risk management before departure",
        "Only a chart-reading exercise",
        "Something only captains do",
      ],
      correctAnswer: 1,
      explanation:
        "Trip planning connects route, conditions, passenger readiness, and boat capability before launch.",
    },
    {
      id: 2,
      question: "Why should weather be reviewed carefully?",
      options: [
        "Because only rain matters",
        "Because wind, visibility, and water conditions can change safety margins quickly",
        "Because forecasts replace judgment",
        "Because weather matters only on overnight trips",
      ],
      correctAnswer: 1,
      explanation:
        "Wind, storms, fog, and changing water conditions can affect small boats dramatically.",
    },
    {
      id: 3,
      question: "A good go or no-go decision means:",
      options: [
        "Launching because the group expects it",
        "Ignoring missing gear if the ramp is busy",
        "Being willing to delay or cancel when safety signs are poor",
        "Leaving faster to beat conditions",
      ],
      correctAnswer: 2,
      explanation:
        "Good judgment includes delaying or canceling when conditions, equipment, or readiness are not right.",
    },
    {
      id: 4,
      question: "Why should a trip plan include a realistic communication plan?",
      options: [
        "Because communication replaces the need for judgment",
        "Because it helps share location and activate help more effectively if needed",
        "Because phones and radios are only for offshore use",
        "Because a float plan becomes unnecessary once a boat launches",
      ],
      correctAnswer: 1,
      explanation:
        "Communication tools support safer decision-making by making it easier to report location, conditions, and emergencies.",
    },
  ],
  "lesson-4": [
    {
      id: 1,
      question: "Safe speed on the water depends on:",
      options: [
        "Only the posted limit",
        "Visibility, traffic, conditions, and maneuverability",
        "How quickly passengers want to arrive",
        "Only engine power",
      ],
      correctAnswer: 1,
      explanation:
        "Safe speed changes with conditions, boat capability, and the operator's ability to identify and avoid hazards in time.",
    },
    {
      id: 2,
      question: "Why do navigation rules matter in a basic course?",
      options: [
        "They create predictable behavior and support collision avoidance",
        "They remove the need for lookout",
        "They apply only to commercial ships",
        "They replace operator judgment",
      ],
      correctAnswer: 0,
      explanation:
        "Navigation rules help organize responsibility and reduce conflict, but lookout and judgment still matter.",
    },
    {
      id: 3,
      question: "Wake responsibility is important because:",
      options: [
        "Wakes affect only your own boat",
        "Large wakes can create risk for other boats, shorelines, and people",
        "Wakes are never dangerous at low speed",
        "Courtesy does not matter on the water",
      ],
      correctAnswer: 1,
      explanation:
        "Your wake can affect nearby vessels, paddlers, docks, and shoreline users even without direct contact.",
    },
    {
      id: 4,
      question: "Why should boating safety students learn about alcohol and drug risk?",
      options: [
        "Because impairment can reduce judgment and increase collision or drowning risk",
        "Because boating laws do not apply on inland waters",
        "Because only commercial operators are affected by impairment",
        "Because weather is the only factor that matters on the water",
      ],
      correctAnswer: 0,
      explanation:
        "Alcohol and drug impairment affects safe operation on the water just as it affects safe operation on the road.",
    },
  ],
  "lesson-5": [
    {
      id: 1,
      question: "In a falls-overboard situation, an early priority is to:",
      options: [
        "Ignore the person and secure gear first",
        "Maintain visual contact and respond in an orderly way",
        "Accelerate immediately toward the person",
        "Have passengers move freely around the boat",
      ],
      correctAnswer: 1,
      explanation:
        "Maintaining visual contact, communicating, and using flotation and recovery procedures are key early steps.",
    },
    {
      id: 2,
      question: "Why should students learn basic distress communication?",
      options: [
        "Because details and calm communication improve rescue response",
        "Because radio use replaces life jackets",
        "Because it matters only offshore",
        "Because emergencies are too rare to plan for",
      ],
      correctAnswer: 0,
      explanation:
        "Clear communication helps responders understand location, situation, and urgency.",
    },
    {
      id: 3,
      question: "Environmental stewardship belongs in boating safety because:",
      options: [
        "It is unrelated to operator habits",
        "Good boating protects both people and waterways",
        "Only state agencies handle environmental concerns",
        "Fuel spills are mostly cosmetic issues",
      ],
      correctAnswer: 1,
      explanation:
        "The same discipline that protects people also helps prevent pollution and careless waterway damage.",
    },
    {
      id: 4,
      question: "Why should basic boaters understand render-assistance and reporting duties?",
      options: [
        "Because some emergencies and reportable incidents create legal and safety obligations",
        "Because only law enforcement ever needs to help others",
        "Because incident reporting is optional after any collision",
        "Because reporting matters only to commercial captains",
      ],
      correctAnswer: 0,
      explanation:
        "Boaters should know that some emergencies require assistance when it can be given safely and that some incidents require formal reporting.",
    },
  ],
  "lesson-6": [
    {
      id: 1,
      question: "Why should beginners learn about ventilation and flame control devices?",
      options: [
        "Because those systems help reduce explosion and ignition risk",
        "Because they make the boat faster",
        "Because they only matter on sailboats",
        "Because they replace maintenance",
      ],
      correctAnswer: 0,
      explanation:
        "Fuel vapors and ignition hazards can create serious risk, so operators should understand the systems that help control them.",
    },
    {
      id: 2,
      question: "A safer fueling habit is to:",
      options: [
        "Ignore ventilation if the stop will be brief",
        "Focus on convenience over procedure",
        "Use ventilation and reduce ignition-source risk before restarting",
        "Let passengers stay anywhere they want during fueling",
      ],
      correctAnswer: 2,
      explanation:
        "Fueling safety depends on ventilation, awareness, and disciplined procedure before engine restart.",
    },
    {
      id: 3,
      question: "Why does an engine cut-off device matter?",
      options: [
        "It helps reduce runaway boat movement if the operator is separated from control",
        "It replaces the need for steering",
        "It matters only when the boat is on the trailer",
        "It is used mainly to improve fuel economy",
      ],
      correctAnswer: 0,
      explanation:
        "Engine cut-off devices are a real safety control, especially in sudden movement or operator-ejection situations.",
    },
    {
      id: 4,
      question: "Why are simple preventive checks important before launch?",
      options: [
        "Because they can catch fuel, steering, or bilge problems before they become emergencies",
        "Because they replace the need for life jackets",
        "Because they matter only on overnight trips",
        "Because the engine starting means the boat is automatically safe",
      ],
      correctAnswer: 0,
      explanation:
        "Preventive checks help the operator catch avoidable system problems before the boat is underway.",
    },
  ],
  "lesson-7": [
    {
      id: 1,
      question: "Why should launch preparation happen away from the ramp when possible?",
      options: [
        "To make the ramp area safer and more efficient",
        "To make backing harder",
        "Because tying lines at the ramp is always required",
        "Because courtesy has no safety value",
      ],
      correctAnswer: 0,
      explanation:
        "Preparing away from the ramp reduces congestion, rushing, and close-quarters confusion.",
    },
    {
      id: 2,
      question: "Why does anchoring require attention to scope and bottom conditions?",
      options: [
        "Because any anchor will hold the same way in every condition",
        "Because anchoring depends on enough rode, a suitable bottom, and confirming the boat is set safely",
        "Because scope matters only on large commercial vessels",
        "Because a drifting boat is usually safer than a set anchor",
      ],
      correctAnswer: 1,
      explanation:
        "A safe anchoring setup depends on more than dropping the anchor overboard. Scope and bottom type affect whether the boat actually holds.",
    },
    {
      id: 3,
      question: "What is a key safety point for water-jet craft and personal watercraft?",
      options: [
        "They can be operated like any other boat without adjustment",
        "Their handling and off-throttle response require specific awareness and practice",
        "They are safe to maneuver close to swimmers because they do not use exposed propellers",
        "They eliminate the need for lookout and separation",
      ],
      correctAnswer: 1,
      explanation:
        "Water-jet and PWC handling characteristics are different enough that students should be taught them directly rather than assuming all boating experience transfers automatically.",
    },
  ],
}

export function getBoatingLessonBySlug(slug: string) {
  return BOATING_LESSONS.find((lesson) => lesson.slug === slug) ?? null
}
