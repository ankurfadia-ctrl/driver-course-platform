import {
  BOATING_LAUNCH_ROADMAP,
  type BoatingStateRoadmapEntry,
} from "@/lib/boating-state-overlays"
import type { SiteLanguage } from "@/lib/site-language"

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

const BOATING_LAUNCH_ROADMAP_ES: BoatingLaunchState[] = [
  {
    stateCode: "SC",
    stateSlug: "south-carolina",
    stateName: "South Carolina",
    requirementSummary:
      "Carolina del Sur acepta un curso aprobado por NASBLA para el certificado estándar de navegante, lo que lo convierte en uno de los estados de lanzamiento más accesibles.",
    status: "content-mapping",
    priority: "now",
    marketMotion: "nasbla-friendly",
    routeBase: "/south-carolina-boating",
  },
  {
    stateCode: "OH",
    stateSlug: "ohio",
    stateName: "Ohio",
    requirementSummary:
      "Ohio acepta un curso aprobado por NASBLA como la vía práctica para muchos operadores de embarcaciones a motor, lo que lo convierte en un mercado de lanzamiento sólido.",
    status: "content-mapping",
    priority: "now",
    marketMotion: "nasbla-friendly",
    routeBase: "/ohio-boating",
  },
  {
    stateCode: "OK",
    stateSlug: "oklahoma",
    stateName: "Oklahoma",
    requirementSummary:
      "Oklahoma es principalmente un mercado de educación náutica para operadores jóvenes, y un curso aprobado por NASBLA es la vía pública habitual.",
    status: "content-mapping",
    priority: "now",
    marketMotion: "nasbla-friendly",
    routeBase: "/oklahoma-boating",
  },
  {
    stateCode: "KY",
    stateSlug: "kentucky",
    stateName: "Kentucky",
    requirementSummary:
      "Kentucky es un mercado de operadores jóvenes compatible con NASBLA donde un certificado puede cumplir con la regla educativa sin un proceso estatal complejo.",
    status: "content-mapping",
    priority: "now",
    marketMotion: "nasbla-friendly",
    routeBase: "/kentucky-boating",
  },
  {
    stateCode: "WV",
    stateSlug: "west-virginia",
    stateName: "West Virginia",
    requirementSummary:
      "Virginia Occidental acepta expresamente la instrucción autorizada por NASBLA de este o cualquier otro estado, lo que la convierte en uno de los objetivos de lanzamiento más accesibles.",
    status: "content-mapping",
    priority: "now",
    marketMotion: "nasbla-friendly",
    routeBase: "/west-virginia-boating",
  },
  {
    stateCode: "VA",
    stateSlug: "virginia",
    stateName: "Virginia",
    requirementSummary:
      "La superposición de marcas y la infraestructura de producto existente hacen de Virginia la versión de referencia activa una vez que los primeros estados validan el modelo general.",
    status: "launch-ready",
    priority: "next",
    marketMotion: "state-approved",
    routeBase: "/virginia-boating",
  },
  {
    stateCode: "TX",
    stateSlug: "texas",
    stateName: "Texas",
    requirementSummary:
      "Gran población de navegantes y fuerte demanda, pero Texas debe seguir después de que los estados de menor fricción demuestren el embudo y el flujo de certificados.",
    status: "research",
    priority: "next",
    marketMotion: "state-approved",
  },
  {
    stateCode: "FL",
    stateSlug: "florida",
    stateName: "Florida",
    requirementSummary:
      "Florida es un mercado de alto volumen, pero el proceso de tarjeta emitida por el estado lo convierte en un mejor estado náutico de segunda ola.",
    status: "research",
    priority: "next",
    marketMotion: "state-issued",
  },
  {
    stateCode: "NC",
    stateSlug: "north-carolina",
    stateName: "North Carolina",
    requirementSummary:
      "Carolina del Norte sigue siendo atractiva, pero está mejor posicionada después de los estados de menor fricción y la versión de referencia de Virginia.",
    status: "research",
    priority: "later",
    marketMotion: "state-approved",
  },
]

export const BOATING_PRODUCT_CONFIG_ES: BoatingProductConfig = {
  ...BOATING_PRODUCT_CONFIG,
  standardsLabel:
    "Temas básicos de seguridad náutica más instrucción para lanchas de motor",
  curriculumIntro:
    "El curso náutico comienza con los temas básicos de seguridad, agrega instrucción para lanchas de motor y luego aplica las reglas y requisitos de certificado de cada estado.",
  curriculumModules: [
    {
      code: "core-1",
      title: "Terminología y conceptos básicos de embarcaciones",
      summary:
        "Proporciona a los estudiantes el vocabulario básico y los conceptos que necesitan antes de conocer las reglas, el equipo y la operación.",
      topics: [
        "Términos fundamentales de navegación y vocabulario del operador",
        "Tipos de embarcaciones, capacidades, estabilidad y características de manejo",
        "Cómo el diseño y la carga de la embarcación afectan la operación segura",
      ],
    },
    {
      code: "core-2",
      title: "Equipo requerido y preparación",
      summary:
        "Enseña los requisitos de seguridad legales y prácticos antes de que los estudiantes lleguen al agua.",
      topics: [
        "Chalecos salvavidas, dispositivos de sonido, luces y requisitos de transporte",
        "Equipo de emergencia, hábitos de preparación legal, planes de flotación e instrucciones para pasajeros",
        "Planificación del viaje, revisión del clima, comunicaciones y verificación de peligros locales",
      ],
    },
    {
      code: "core-3",
      title: "Operación segura de embarcaciones",
      summary:
        "Cubre los deberes del operador que reducen incidentes y hacen que el curso sea útil más allá de la memorización.",
      topics: [
        "Responsabilidad del operador, velocidad segura, vigilancia y conciencia del riesgo",
        "Riesgo de alcohol y drogas, cortesía y uso compartido de la vía navegable",
        "Áreas restringidas, conciencia de buzos, pescadores, remadores y nadadores",
      ],
    },
    {
      code: "core-4",
      title: "Navegación, emergencias y gestión de la vía navegable",
      summary:
        "Completa los temas fundamentales con navegación, respuesta a incidentes y protección ambiental.",
      topics: [
        "Reglas básicas de navegación, marcadores y ayudas a la navegación",
        "Respuesta a emergencias, obligaciones de asistencia, notificación de accidentes y llamadas de auxilio",
        "Exposición al frío y al clima, prevención de especies invasoras y obligaciones ambientales",
      ],
    },
    {
      code: "power-1",
      title: "Sistemas de lanchas de motor y repostaje",
      summary:
        "Agrega el contenido específico para lanchas de motor necesario para la instrucción náutica motorizada.",
      topics: [
        "Calificaciones de potencia, ventilación, arrestadores de llama y extintores",
        "Dispositivos de corte del motor, puntos de inspección preventiva y áreas de falla comunes",
        "Seguridad en el repostaje, riesgo de monóxido de carbono y verificaciones previas al lanzamiento",
      ],
    },
    {
      code: "power-2",
      title: "Remolque, atraque, anclaje y peligros de propulsión",
      summary:
        "Finaliza con los escenarios de operación a baja velocidad y los problemas de chorro de agua exclusivos de las embarcaciones a motor.",
      topics: [
        "Procedimientos de remolque, lanzamiento, recuperación, atraque y amarre",
        "Responsabilidad de oleaje, alcance de anclaje, conciencia del remolque y criterio en áreas restringidas",
        "Seguridad de hélice, encallamiento y consideraciones de motos acuáticas",
      ],
    },
  ],
  launchStates: BOATING_LAUNCH_ROADMAP_ES,
  notes: [
    "Muchos estados emiten una tarjeta o certificado de educación náutica en lugar de una licencia de navegación.",
    "Las leyes estatales, los requisitos de edad y la prueba de finalización aceptada pueden variar.",
    "La disponibilidad del curso se publicará estado por estado a medida que se abran nuevas opciones.",
  ],
}

export function getBoatingProductConfig(language: SiteLanguage): BoatingProductConfig {
  return language === "es" ? BOATING_PRODUCT_CONFIG_ES : BOATING_PRODUCT_CONFIG
}
