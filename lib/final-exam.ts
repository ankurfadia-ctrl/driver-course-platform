// lib/final-exam.ts

export type ExamQuestion = {
  id: number
  question: string
  options: string[]
  correctIndex: number
}

export const VIRGINIA_FINAL_EXAM_QUESTION_BANK: ExamQuestion[] = [
  {
    id: 1,
    question: "What is the minimum safe following distance in normal driving conditions?",
    options: ["1 second", "2 seconds", "3 to 4 seconds", "10 seconds"],
    correctIndex: 2,
  },
  {
    id: 2,
    question: "What should a defensive driver do when approaching an area with hidden hazards?",
    options: ["Speed up to clear it quickly", "Slow early and watch for clues of possible danger", "Focus only on the vehicle directly ahead", "Assume no one will enter the roadway"],
    correctIndex: 1,
  },
  {
    id: 3,
    question: "Stopping distance includes:",
    options: ["Only braking distance", "Only reaction time", "Perception, reaction, and braking distance", "Only road surface condition"],
    correctIndex: 2,
  },
  {
    id: 4,
    question: "When should you use your headlights?",
    options: ["Only after dark", "Whenever visibility is reduced", "Only in rural areas", "Only when another driver flashes headlights"],
    correctIndex: 1,
  },
  {
    id: 5,
    question: "Defensive driving means:",
    options: ["Driving faster than surrounding traffic", "Assuming other drivers will always follow the rules", "Anticipating hazards and making safe decisions early", "Using your horn often"],
    correctIndex: 2,
  },
  {
    id: 6,
    question: "What is one of the best ways to avoid rear-end collisions?",
    options: ["Drive in the left lane constantly", "Leave a safe following distance", "Brake suddenly", "Tailgate at low speed"],
    correctIndex: 1,
  },
  {
    id: 7,
    question: "Before changing lanes, you should:",
    options: ["Only check your mirrors", "Signal, check mirrors, and check blind spots", "Honk and move immediately", "Speed up without looking"],
    correctIndex: 1,
  },
  {
    id: 8,
    question: "A driver should scan the road ahead:",
    options: ["Only directly in front of the hood", "At least 12 to 15 seconds ahead", "Only at intersections", "Only when traveling above 55 mph"],
    correctIndex: 1,
  },
  {
    id: 9,
    question: "The best way to handle aggressive drivers is to:",
    options: ["Challenge them", "Make eye contact and gesture", "Stay calm and avoid engaging", "Block them from passing"],
    correctIndex: 2,
  },
  {
    id: 10,
    question: "Hydroplaning is most likely to happen when:",
    options: ["Roads are dry", "Tires lose contact with the road because of water", "You drive uphill", "You are parked"],
    correctIndex: 1,
  },
  {
    id: 11,
    question: "Why is the posted speed limit not always the safest speed?",
    options: ["Because it applies only at night", "Because conditions may require you to drive slower", "Because drivers should usually exceed it slightly", "Because it matters only in traffic jams"],
    correctIndex: 1,
  },
  {
    id: 12,
    question: "Many serious crashes begin with:",
    options: ["A few seconds of inattention", "Mechanical failure only", "Drivers using too much caution", "Perfect weather conditions"],
    correctIndex: 0,
  },
  {
    id: 13,
    question: "If road conditions reduce traction or visibility, what is the safe response?",
    options: ["Slow down and create more space around your vehicle", "Maintain normal speed to stay with traffic", "Follow more closely so others do not cut in", "Use high beams in every condition"],
    correctIndex: 0,
  },
  {
    id: 14,
    question: "What is a blind spot?",
    options: ["A dirty windshield area", "An area around your vehicle not visible in mirrors", "A nighttime driving condition", "A traffic signal malfunction"],
    correctIndex: 1,
  },
  {
    id: 15,
    question: "If an emergency vehicle approaches from behind with lights and siren, you should:",
    options: ["Maintain speed", "Safely pull over to the right and stop", "Stop in your lane immediately", "Race to the next intersection"],
    correctIndex: 1,
  },
  {
    id: 16,
    question: "The safest way to enter a curve is to:",
    options: ["Accelerate in the middle of it", "Enter at a safe speed", "Brake hard while turning sharply", "Drive in the oncoming lane for visibility"],
    correctIndex: 1,
  },
  {
    id: 17,
    question: "Using a phone while driving can:",
    options: ["Improve reaction time", "Reduce attention and increase crash risk", "Help you focus", "Only affect new drivers"],
    correctIndex: 1,
  },
  {
    id: 18,
    question: "What is the safest way to handle navigation, music, or climate setup?",
    options: ["Set them before the vehicle starts moving", "Adjust them while driving if traffic is light", "Change them only at stoplights", "Wait until another passenger complains"],
    correctIndex: 0,
  },
  {
    id: 19,
    question: "What can impatience lead to?",
    options: ["Safer following distance", "Better anticipation", "Speeding and risky maneuvers", "Improved calmness"],
    correctIndex: 2,
  },
  {
    id: 20,
    question: "The space cushion around your vehicle is important because it:",
    options: ["Lets you speed safely", "Gives time and room to react", "Allows closer following", "Only matters at night"],
    correctIndex: 1,
  },
  {
    id: 21,
    question: "If another driver tailgates you, you should:",
    options: ["Brake-check them", "Increase distance in front of your vehicle", "Wave them closer", "Move your mirrors away"],
    correctIndex: 1,
  },
  {
    id: 22,
    question: "What is the safest attitude for defensive driving?",
    options: ["Competitive", "Patient and alert", "Indifferent", "Aggressive"],
    correctIndex: 1,
  },
  {
    id: 23,
    question: "Traffic laws improve safety because they:",
    options: ["Make roads less crowded", "Create predictable behavior", "Replace the need for judgment", "Apply only in city traffic"],
    correctIndex: 1,
  },
  {
    id: 24,
    question: "Unsafe driving can lead to:",
    options: ["Automatic better insurance rates", "Longer tire life with no added risk", "Higher insurance costs and possible injury", "Guaranteed license protection"],
    correctIndex: 2,
  },
  {
    id: 25,
    question: "If visibility is limited by fog, you should:",
    options: ["Use high beams", "Use low beams and slow down", "Speed up to get out of it", "Drive with hazard lights only"],
    correctIndex: 1,
  },
  {
    id: 26,
    question: "What is one major effect of alcohol on driving?",
    options: ["Improved judgment", "Faster reaction time", "Reduced coordination and judgment", "Better night vision"],
    correctIndex: 2,
  },
  {
    id: 27,
    question: "A driver who is angry or upset should:",
    options: ["Drive faster to release stress", "Wait until calm before driving if possible", "Use that anger to stay alert", "Take risks to save time"],
    correctIndex: 1,
  },
  {
    id: 28,
    question: "Why is aggressive driving dangerous?",
    options: ["It saves time without affecting risk", "It combines risky behaviors and reduces judgment", "It only matters on highways", "It affects only the aggressive driver"],
    correctIndex: 1,
  },
  {
    id: 29,
    question: "What is the safest way to manage speed?",
    options: ["Match the fastest driver", "Drive at a speed appropriate for conditions", "Always drive exactly the speed limit regardless of conditions", "Drive slower than all traffic in the left lane"],
    correctIndex: 1,
  },
  {
    id: 30,
    question: "Intersections are dangerous because:",
    options: ["They always have poor lighting", "Traffic conflicts happen there", "Only large trucks use them", "Drivers do not need to yield there"],
    correctIndex: 1,
  },
  {
    id: 31,
    question: "Before making a turn, you should signal:",
    options: ["At the last second", "Well in advance", "Only in traffic", "Only if another car is behind you"],
    correctIndex: 1,
  },
  {
    id: 32,
    question: "The best way to reduce distractions while driving is to:",
    options: ["Handle tasks at stoplights", "Set up music, navigation, and climate controls before moving", "Text quickly", "Eat while steering with one hand"],
    correctIndex: 1,
  },
  {
    id: 33,
    question: "On wet roads, stopping distance is usually:",
    options: ["Shorter", "Longer", "The same", "Not affected by speed"],
    correctIndex: 1,
  },
  {
    id: 34,
    question: "If your vehicle breaks down, your first goal should be to:",
    options: ["Stop in the travel lane immediately", "Move to a safer location if possible", "Exit into traffic quickly", "Ignore it and keep driving"],
    correctIndex: 1,
  },
  {
    id: 35,
    question: "What should you do when merging onto a highway?",
    options: ["Stop at the end of the ramp", "Match traffic speed and merge when safe", "Force your way in", "Drive on the shoulder"],
    correctIndex: 1,
  },
  {
    id: 36,
    question: "A driver should avoid driving in another vehicle’s blind spot because:",
    options: ["It improves fuel economy", "The other driver may not see you", "It shortens travel time", "It is only illegal for trucks"],
    correctIndex: 1,
  },
  {
    id: 37,
    question: "When passing another vehicle, you should:",
    options: ["Pass only when lawful and safe", "Pass at intersections", "Pass on hills without visibility", "Remain beside the vehicle as long as possible"],
    correctIndex: 0,
  },
  {
    id: 38,
    question: "Fatigue affects driving by:",
    options: ["Improving focus", "Slowing reaction time and awareness", "Making turns easier", "Only affecting nighttime parking"],
    correctIndex: 1,
  },
  {
    id: 39,
    question: "The safest way to handle peer pressure to drive unsafely is to:",
    options: ["Ignore safety rules", "Explain you are driving safely and stay in control", "Show off", "Drive faster temporarily"],
    correctIndex: 1,
  },
  {
    id: 40,
    question: "What is a safe response to frustration on the road?",
    options: ["Retaliate against other drivers", "Drive faster to escape the situation", "Create space and refocus on control", "Use close following to pressure traffic"],
    correctIndex: 2,
  },
  {
    id: 41,
    question: "What is the purpose of using turn signals?",
    options: ["To warn only police officers", "To communicate your intentions to others", "To replace mirror checks", "To excuse unsafe turns"],
    correctIndex: 1,
  },
  {
    id: 42,
    question: "Night driving is more dangerous mainly because:",
    options: ["Roads are always more crowded", "Vehicles lose braking power", "Hazards are harder to detect", "Speed limits no longer apply"],
    correctIndex: 2,
  },
  {
    id: 43,
    question: "Good driver attitude includes:",
    options: ["Respect for other road users", "Impatience", "Risk-taking", "Road rage"],
    correctIndex: 0,
  },
  {
    id: 44,
    question: "Mature driving means:",
    options: ["Using frustration as motivation", "Accepting that your decisions affect other people", "Competing for space whenever possible", "Taking small risks when traffic is light"],
    correctIndex: 0,
  },
  {
    id: 45,
    question: "Why should you check mirrors frequently?",
    options: ["To admire the vehicle", "To remain aware of surrounding traffic", "To avoid using side windows", "Only before turning left"],
    correctIndex: 1,
  },
  {
    id: 46,
    question: "When approaching work zones, drivers should:",
    options: ["Ignore temporary signs", "Slow down and follow posted instructions", "Pass workers quickly", "Use the shoulder if traffic slows"],
    correctIndex: 1,
  },
  {
    id: 47,
    question: "What is the safest response to a driver who cuts you off?",
    options: ["Retaliate", "Back off and create space", "Speed up beside them", "Use high beams continuously"],
    correctIndex: 1,
  },
  {
    id: 48,
    question: "When approaching a crash scene, stopped traffic, or roadway emergency, drivers should:",
    options: ["Speed up before lanes narrow", "Use immediate caution and slow in a controlled way", "Focus only on vehicles ahead", "Assume responders can see them clearly"],
    correctIndex: 1,
  },
  {
    id: 49,
    question: "Why is scanning intersections before entering important?",
    options: ["Because your light may be green", "To check for hazards even when you have the right-of-way", "To find parking only", "To avoid signaling"],
    correctIndex: 1,
  },
  {
    id: 50,
    question: "A safe driver should make decisions based on:",
    options: ["Impulse", "Time pressure", "Safety and road conditions", "What other aggressive drivers want"],
    correctIndex: 2,
  },
]

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items]

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }

  return copy
}

export function getRandomExamQuestionsFromBank(
  bank: ExamQuestion[],
  count = 50
): ExamQuestion[] {
  if (count > bank.length) {
    throw new Error(
      `Requested ${count} questions, but only ${bank.length} are available.`
    )
  }

  return shuffleArray(bank).slice(0, count)
}

export function getFinalExamQuestions(count = 50): ExamQuestion[] {
  return getRandomExamQuestionsFromBank(VIRGINIA_FINAL_EXAM_QUESTION_BANK, count)
}
