import {
  getRandomExamQuestionsFromBank,
  type ExamQuestion,
} from "@/lib/final-exam"

export const VIRGINIA_BOATING_FINAL_EXAM_QUESTION_BANK: ExamQuestion[] = [
  {
    id: 1,
    question: "Why should an operator know terms like bow, stern, port, and starboard?",
    options: [
      "They are mostly useful for decorating a boat",
      "They improve communication and reduce confusion underway",
      "They matter only on commercial vessels",
      "They replace the need for safety briefings",
    ],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "What is one major effect of overloading a boat?",
    options: [
      "Better stability in rough water",
      "Improved visibility for the operator",
      "Reduced stability and higher capsizing risk",
      "Shorter stopping distance",
    ],
    correctIndex: 2,
  },
  {
    id: 3,
    question: "What makes a life jacket most useful?",
    options: [
      "Keeping it stored under gear",
      "Putting it on only after falling overboard",
      "Having it fit the user and be ready before an emergency",
      "Using it only in cold weather",
    ],
    correctIndex: 2,
  },
  {
    id: 4,
    question: "A pre-departure passenger briefing should include:",
    options: [
      "Only the trip destination",
      "Where safety equipment is and what passengers should do in an emergency",
      "Only music and seating preferences",
      "Nothing unless the trip is overnight",
    ],
    correctIndex: 1,
  },
  {
    id: 5,
    question: "Trip planning helps reduce risk by:",
    options: [
      "Eliminating the need to check weather",
      "Matching route, conditions, passengers, and boat readiness before launch",
      "Guaranteeing no emergency can happen",
      "Making local knowledge unnecessary",
    ],
    correctIndex: 1,
  },
  {
    id: 6,
    question: "Why should boaters check wind and visibility and not just rain?",
    options: [
      "Because wind and visibility can change the safety margin quickly",
      "Because rain is the only serious weather risk",
      "Because forecasts replace judgment",
      "Because weather matters only offshore",
    ],
    correctIndex: 0,
  },
  {
    id: 7,
    question: "A float plan is:",
    options: [
      "A required chart for every trip",
      "A way to tell someone ashore where you are going and when you expect to return",
      "A replacement for communication equipment",
      "Only for commercial captains",
    ],
    correctIndex: 1,
  },
  {
    id: 8,
    question: "The safest response when conditions, equipment, or crew readiness are not right is to:",
    options: [
      "Launch anyway if the group expects it",
      "Delay or cancel the trip",
      "Go faster to reduce time on the water",
      "Ignore the concern if the ramp is busy",
    ],
    correctIndex: 1,
  },
  {
    id: 9,
    question: "Safe speed on the water depends on:",
    options: [
      "Only the maximum speed of the boat",
      "Visibility, traffic, maneuverability, and conditions",
      "How fast nearby boats are going",
      "Only whether the sky is clear",
    ],
    correctIndex: 1,
  },
  {
    id: 10,
    question: "Navigation rules are important because they:",
    options: [
      "Support predictable behavior and collision avoidance",
      "Remove the need to keep a lookout",
      "Apply only to large ships",
      "Replace operator judgment",
    ],
    correctIndex: 0,
  },
  {
    id: 11,
    question: "Wake responsibility matters because your wake can:",
    options: [
      "Affect only your own passengers",
      "Create risk for other boats, shorelines, and people",
      "Never cause problems at low speed",
      "Be ignored in crowded areas",
    ],
    correctIndex: 1,
  },
  {
    id: 12,
    question: "A proper lookout means:",
    options: [
      "Watching only directly ahead",
      "Staying aware of people, traffic, hazards, and changing conditions",
      "Relying only on passengers to watch for danger",
      "Looking around only before turning",
    ],
    correctIndex: 1,
  },
  {
    id: 13,
    question: "In a person-overboard situation, an early priority is to:",
    options: [
      "Maintain visual contact and respond in an orderly way",
      "Immediately leave the area to find help",
      "Have passengers stand and move around freely",
      "Accelerate sharply toward the person",
    ],
    correctIndex: 0,
  },
  {
    id: 14,
    question: "Why is calm distress communication important?",
    options: [
      "It improves the chances of accurate rescue response",
      "It matters only when close to shore",
      "It replaces the need for life jackets",
      "It is optional during emergencies",
    ],
    correctIndex: 0,
  },
  {
    id: 15,
    question: "If your boat becomes disabled, your first concern should be:",
    options: [
      "Protecting people and stabilizing the situation",
      "Saving the trip schedule",
      "Restarting the engine no matter what",
      "Ignoring the problem if land is nearby",
    ],
    correctIndex: 0,
  },
  {
    id: 16,
    question: "Why does environmental stewardship belong in a boating safety course?",
    options: [
      "Because good boating protects both people and waterways",
      "Because pollution has no safety connection",
      "Because only marinas need to worry about it",
      "Because fuel spills are only cosmetic",
    ],
    correctIndex: 0,
  },
  {
    id: 17,
    question: "A safe fueling habit is to:",
    options: [
      "Ignore ventilation if the stop is brief",
      "Use proper ventilation and reduce ignition-source risk before restarting",
      "Let passengers move freely near fueling vapors",
      "Restart the engine immediately after filling",
    ],
    correctIndex: 1,
  },
  {
    id: 18,
    question: "Why should operators understand engine cut-off devices and ventilation systems?",
    options: [
      "They help control serious risks such as runaway movement and explosion",
      "They make the boat go faster",
      "They matter only on sailboats",
      "They replace regular inspections",
    ],
    correctIndex: 0,
  },
  {
    id: 19,
    question: "Preparing the boat away from the ramp when possible helps because it:",
    options: [
      "Makes backing harder",
      "Reduces congestion and rushed mistakes at the launch area",
      "Eliminates the need for lines or life jackets",
      "Is required only for trailers over a certain size",
    ],
    correctIndex: 1,
  },
  {
    id: 20,
    question: "Docking and close-quarters maneuvering are safest when the operator is:",
    options: [
      "Patient and willing to move slowly",
      "Aggressive about holding position",
      "Focused on speed over control",
      "Relying only on reverse thrust",
    ],
    correctIndex: 0,
  },
  {
    id: 21,
    question: "Why are propellers a serious hazard?",
    options: [
      "They are dangerous only when the boat is at full speed",
      "They can injure people in or near the water whenever propulsion is active",
      "They matter only on large inboard boats",
      "They are safe as long as someone is wearing a life jacket",
    ],
    correctIndex: 1,
  },
  {
    id: 22,
    question: "In Virginia, boating education generally applies to:",
    options: [
      "Only commercial operators",
      "PWC operators age 14 and older and operators of Virginia-registered motorboats with 10 horsepower or more",
      "Only out-of-state visitors",
      "Only sailboats without motors",
    ],
    correctIndex: 1,
  },
  {
    id: 23,
    question: "A personal watercraft operator in Virginia is generally required to be:",
    options: [
      "At least 12 years old",
      "At least 14 years old with no other condition",
      "At least 16 years old, with a limited 14-15 course-completion exception",
      "Any age if wearing a life jacket",
    ],
    correctIndex: 2,
  },
  {
    id: 24,
    question: "What should a Virginia boater be prepared to carry as proof?",
    options: [
      "Only a handwritten note",
      "A course completion certificate, card, or other recognized proof",
      "Only the boat registration",
      "No proof is ever required on the water",
    ],
    correctIndex: 1,
  },
  {
    id: 25,
    question: "If a boat's handling feels different than expected, the safest response is to:",
    options: [
      "Increase speed to stabilize it",
      "Slow down and reassess loading, conditions, and control",
      "Assume the feeling will correct itself",
      "Let passengers move around to balance it out",
    ],
    correctIndex: 1,
  },
  {
    id: 26,
    question: "Why does passenger movement matter on small boats?",
    options: [
      "It can unexpectedly shift balance and reduce stability",
      "It has no effect once underway",
      "It only matters when anchored",
      "It matters only for children",
    ],
    correctIndex: 0,
  },
  {
    id: 27,
    question: "The safest attitude for a new boater is:",
    options: [
      "Confident enough to improvise through any condition",
      "Prepared, humble, and willing to slow down",
      "Focused on keeping up with faster traffic",
      "More concerned with convenience than procedure",
    ],
    correctIndex: 1,
  },
  {
    id: 28,
    question: "Aids to navigation and regulatory markers are there to:",
    options: [
      "Decorate the waterway",
      "Organize movement, mark hazards, and communicate controls",
      "Replace charts and lookout duties",
      "Apply only during races",
    ],
    correctIndex: 1,
  },
  {
    id: 29,
    question: "If another boater acts unpredictably, you should:",
    options: [
      "Assume they will correct immediately",
      "Maintain awareness and leave room to avoid conflict",
      "Challenge them for the right-of-way",
      "Speed up to get around them",
    ],
    correctIndex: 1,
  },
  {
    id: 30,
    question: "A boating safety course is designed to help operators:",
    options: [
      "Rely less on preparation",
      "Make safer decisions before and during time on the water",
      "Replace all future practice needs",
      "Operate any vessel type without adjustment",
    ],
    correctIndex: 1,
  },
  {
    id: 31,
    question: "Why should a basic boating course address alcohol and drug impairment?",
    options: [
      "Because impairment affects judgment, balance, and reaction time on the water",
      "Because boating laws do not apply on lakes",
      "Because fatigue is the only real operator risk",
      "Because impairment matters only on commercial vessels",
    ],
    correctIndex: 0,
  },
  {
    id: 32,
    question: "What is a good reason to keep a realistic communication plan before departure?",
    options: [
      "To make weather checks unnecessary",
      "To share location and activate help more effectively if something goes wrong",
      "To replace a float plan entirely",
      "To avoid carrying emergency contacts",
    ],
    correctIndex: 1,
  },
  {
    id: 33,
    question: "Why should operators respect diver-down areas, paddlers, swimmers, and anglers?",
    options: [
      "Because those water users are often more vulnerable and need extra separation",
      "Because they have the same maneuverability as powerboats",
      "Because wake and speed do not affect them",
      "Because those hazards matter only at night",
    ],
    correctIndex: 0,
  },
  {
    id: 34,
    question: "If you can safely assist a person in distress without creating a greater emergency, you should:",
    options: [
      "Ignore them and continue your trip",
      "Render assistance and communicate clearly",
      "Wait for someone else to help first",
      "Accelerate away from the area",
    ],
    correctIndex: 1,
  },
  {
    id: 35,
    question: "Why should boaters understand accident or incident reporting duties?",
    options: [
      "Because some events create a duty to notify authorities, not just go home",
      "Because reporting is optional after any collision",
      "Because reporting matters only for commercial captains",
      "Because property damage never matters",
    ],
    correctIndex: 0,
  },
  {
    id: 36,
    question: "Why is cold water or weather exposure part of boating safety training?",
    options: [
      "Because environmental exposure can worsen judgment and survival during emergencies",
      "Because temperature matters only to swimmers",
      "Because weather exposure is unrelated to trip planning",
      "Because only offshore boaters face exposure risk",
    ],
    correctIndex: 0,
  },
  {
    id: 37,
    question: "What is one reason invasive-species prevention belongs in boating education?",
    options: [
      "Because ramp and marina habits can move harmful species between waterways",
      "Because invasive species affect only saltwater boats",
      "Because environmental stewardship is unrelated to operator behavior",
      "Because cleaning a boat increases collision risk",
    ],
    correctIndex: 0,
  },
  {
    id: 38,
    question: "A useful pre-launch powerboat check includes:",
    options: [
      "Ignoring the bilge if the engine starts",
      "Checking ventilation, steering response, fuel odor, and the engine cut-off attachment",
      "Waiting until offshore to notice fuel-system issues",
      "Focusing only on passenger seating",
    ],
    correctIndex: 1,
  },
  {
    id: 39,
    question: "Why does anchoring require more than just dropping the anchor overboard?",
    options: [
      "Because anchoring depends on scope, bottom conditions, and confirming the boat is set safely",
      "Because any anchor always holds the same way",
      "Because anchoring is only for overnight trips",
      "Because drifting is usually the safer option",
    ],
    correctIndex: 0,
  },
  {
    id: 40,
    question: "What is true about personal watercraft and other water-jet-propelled craft?",
    options: [
      "They handle exactly like every other powerboat",
      "They require specific awareness because control feel and off-throttle response can differ",
      "They can be operated close to swimmers because they do not use exposed propellers",
      "They eliminate the need for lookout and separation",
    ],
    correctIndex: 1,
  },
]

export function getVirginiaBoatingExamQuestions(count = 25) {
  return getRandomExamQuestionsFromBank(
    VIRGINIA_BOATING_FINAL_EXAM_QUESTION_BANK,
    count
  )
}
