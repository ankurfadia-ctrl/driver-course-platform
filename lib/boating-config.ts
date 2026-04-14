import {
  BOATING_LAUNCH_ROADMAP,
  type BoatingStateRoadmapEntry,
} from "@/lib/boating-state-overlays"

export type BoatingCurriculumModule = {
  code: string
  title: string
  summary: string
  topics: string[]
}

export type BoatingLaunchState = BoatingStateRoadmapEntry

export type BoatingProductConfig = {
  productSlug: string
  siteTitle: string
  brandName: string
  productName: string
  marketingHeadline: string
  marketingDescription: string
  supportEmail: string
  supportPhoneDisplay: string
  standardsLabel: string
  curriculumIntro: string
  curriculumModules: BoatingCurriculumModule[]
  launchStates: BoatingLaunchState[]
  notes: string[]
}

export const BOATING_PRODUCT_CONFIG: BoatingProductConfig = {
  productSlug: "boating-safety",
  siteTitle: "Boating Safety Course",
  brandName: "Boating Safety Course",
  productName: "Online Boating Safety Course",
  marketingHeadline:
    "Complete boating safety courses online.",
  marketingDescription:
    "Boating safety course information with course topics, planned states, and pricing updates as new state options become available.",
  supportEmail: "admin@nationaldriverimprovement.com",
  supportPhoneDisplay: "(703) 574-0146",
  standardsLabel:
    "Core boating safety topics plus powerboat instruction",
  curriculumIntro:
    "The boating course starts with core safety topics, adds powerboat instruction, and then applies the rules and certificate requirements for each state.",
  curriculumModules: [
    {
      code: "core-1",
      title: "Terminology and Boat Basics",
      summary:
        "Give students the baseline language and platform-independent concepts they need before rules, equipment, and operation.",
      topics: [
        "Foundational boating terms and operator vocabulary",
        "Boat types, capacities, stability, and handling characteristics",
        "How boat design and loading affect safe operation",
      ],
    },
    {
      code: "core-2",
      title: "Required Equipment and Readiness",
      summary:
        "Teach the legal and practical safety gear expectations before students get on the water.",
      topics: [
        "Life jackets, sound devices, lights, and carriage requirements",
        "Emergency gear, legal-readiness habits, float plans, and passenger briefings",
        "Trip planning, weather review, communications planning, and local hazard checks",
      ],
    },
    {
      code: "core-3",
      title: "Safe Boat Operation",
      summary:
        "Cover the operator duties that reduce incidents and make the course useful beyond a memorization exercise.",
      topics: [
        "Operator responsibility, safe speed, lookout, and risk awareness",
        "Alcohol and drug risk, courtesy, and sharing the waterway",
        "Restricted areas, diver-down awareness, anglers, paddlers, and swimmers",
      ],
    },
    {
      code: "core-4",
      title: "Navigation, Emergencies, and Waterway Stewardship",
      summary:
        "Round out the core with navigation, incident response, towing awareness, and environmental protection.",
      topics: [
        "Basic navigation rules, markers, and aids to navigation",
        "Distress response, render-assistance duties, accident reporting, and calling for help",
        "Cold-water and weather exposure, invasive-species prevention, and environmental duties",
      ],
    },
    {
      code: "power-1",
      title: "Powerboat Systems and Fueling",
      summary:
        "Add the powerboat-specific content needed for real-world motorized boating instruction.",
      topics: [
        "Horsepower ratings, ventilation, flame arrestors, and fire extinguishers",
        "Engine cut-off devices, preventive inspection points, and common failure areas",
        "Fueling safety, carbon monoxide awareness, and pre-launch checks",
      ],
    },
    {
      code: "power-2",
      title: "Trailering, Docking, Anchoring, and Propulsion Hazards",
      summary:
        "Finish with the low-speed operating scenarios and water-jet issues that are unique to power-driven boats.",
      topics: [
        "Trailering, launching, retrieving, docking, and mooring procedures",
        "Wake responsibility, anchoring scope, towing awareness, and confined-area judgment",
        "Propeller safety, grounding, and PWC/water-jet considerations",
      ],
    },
  ],
  launchStates: BOATING_LAUNCH_ROADMAP,
  notes: [
    "Many states issue a boating education card or certificate rather than a boating license.",
    "State laws, age requirements, and accepted proof of completion can vary.",
    "Course availability will be posted state by state as new options open.",
  ],
}
