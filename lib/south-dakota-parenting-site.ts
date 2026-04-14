export type SouthDakotaSiteNavItem = {
  label: string
  href: string
}

export type SouthDakotaSiteModule = {
  title: string
  duration: string
  focus: string
  outcomes: string[]
}

export type SouthDakotaSiteFaq = {
  question: string
  answer: string
}

export const SOUTH_DAKOTA_PARENT_SITE_NAV = [
  { label: "Overview", href: "/south-dakota-parenting" },
  { label: "Curriculum", href: "/south-dakota-parenting/curriculum" },
  { label: "Pricing", href: "/south-dakota-parenting/pricing" },
  { label: "Certificate", href: "/south-dakota-parenting/certificate" },
  { label: "FAQ", href: "/south-dakota-parenting/faq" },
  { label: "Price Match", href: "/south-dakota-parenting/price-match" },
] as const satisfies readonly SouthDakotaSiteNavItem[]

export const SOUTH_DAKOTA_PARENT_SITE_HIGHLIGHTS = [
  { label: "Course length", value: "4 hours across 8 guided modules" },
  {
    label: "Tuition",
    value: "$17.95 standard tuition with hardship and waiver review",
  },
  {
    label: "Certificate",
    value: "Completion certificate with verification ID and authenticity support",
  },
  {
    label: "Support",
    value: "Phone and email help for access, pricing questions, and certificate issues",
  },
] as const

export const SOUTH_DAKOTA_PARENT_SITE_FEATURES = [
  {
    title: "Built around South Dakota's published parenting-course topics",
    body:
      "The course structure follows the statewide South Dakota UJS topic list, including the effects of separation on children, co-parenting responsibilities, conflict reduction, children's coping needs, and financial responsibilities.",
  },
  {
    title: "Low-cost statewide online access",
    body:
      "The price stays simple and affordable, with hardship review and a fee-waiver path for families who need extra help.",
  },
  {
    title: "Child-centered and practical",
    body:
      "Modules focus on family transition, calmer communication, keeping children out of the middle, and practical co-parenting habits instead of generic filler content.",
  },
  {
    title: "Certificate and verification controls",
    body:
      "Completion records are retained, certificates use a verification ID, and support details stay easy to find when families need help.",
  },
] as const

export const SOUTH_DAKOTA_PARENT_SITE_MODULES = [
  {
    title: "Module 1. Family transition and course orientation",
    duration: "30 minutes",
    focus:
      "A plain-language orientation to family transition, the course structure, and why South Dakota courts require parenting education in covered matters.",
    outcomes: [
      "Understand the purpose of the course in South Dakota custody and parenting-time matters.",
      "Recognize the child-centered frame used throughout the program.",
      "Prepare for a calm, structured learning process rather than an adversarial one.",
    ],
  },
  {
    title: "Module 2. The effects of separation or divorce on children",
    duration: "30 minutes",
    focus:
      "How separation, divorce, and ongoing adult conflict can affect children emotionally, behaviorally, and developmentally.",
    outcomes: [
      "Identify common child stress reactions during family transition.",
      "Recognize how children can internalize adult conflict.",
      "Use more supportive responses during periods of change.",
    ],
  },
  {
    title: "Module 3. Co-parenting roles and responsibilities",
    duration: "30 minutes",
    focus:
      "Shared parenting expectations, responsibility across households, and the continuing parental role after separation.",
    outcomes: [
      "Understand the difference between adult conflict and child-centered parenting responsibilities.",
      "Plan for more consistency across homes.",
      "Use responsibility language that supports stability rather than blame.",
    ],
  },
  {
    title: "Module 4. Children's needs and coping techniques",
    duration: "30 minutes",
    focus:
      "Age-based developmental needs, coping patterns, transitions between homes, and signs that additional support may be needed.",
    outcomes: [
      "Match expectations to different developmental stages.",
      "Support children's coping without placing them in the middle of adult issues.",
      "Notice when a child may need added support or professional help.",
    ],
  },
  {
    title: "Module 5. Communicating with children about family change",
    duration: "30 minutes",
    focus:
      "How to talk with children about separation, rules, schedules, and emotions in a reassuring and age-appropriate way.",
    outcomes: [
      "Use age-appropriate language about family change.",
      "Avoid communication that pressures children to take sides.",
      "Reinforce safety, predictability, and emotional steadiness.",
    ],
  },
  {
    title: "Module 6. Communication with the other parent and conflict reduction",
    duration: "30 minutes",
    focus:
      "Lower-conflict communication, boundaries, de-escalation, and practical habits that keep children out of adult disputes.",
    outcomes: [
      "Use brief, factual, child-focused communication habits.",
      "Recognize escalation patterns and choose calmer alternatives.",
      "Reduce the use of children as messengers or emotional intermediaries.",
    ],
  },
  {
    title: "Module 7. Parenting-time disputes, financial responsibilities, and support boundaries",
    duration: "30 minutes",
    focus:
      "Conflict-resolution options, ongoing financial responsibilities, and the boundary between educational course support and individualized legal advice.",
    outcomes: [
      "Understand general conflict-reduction options for parenting-time disputes.",
      "Recognize continuing financial responsibilities as part of child stability.",
      "Know when legal questions need to be directed to the court or an attorney instead of the course.",
    ],
  },
  {
    title: "Module 8. Final review, comprehension checks, and certificate release",
    duration: "30 minutes",
    focus:
      "A structured wrap-up covering the core course lessons, comprehension checks, and certificate-release rules.",
    outcomes: [
      "Review the most important child-centered takeaways.",
      "Complete the required course checks.",
      "Understand how the certificate and verification process work.",
    ],
  },
] as const satisfies readonly SouthDakotaSiteModule[]

export const SOUTH_DAKOTA_PARENT_SITE_TEACHING_METHODS = [
  "Short lesson segments with plain-language explanations.",
  "Reflection prompts tied to common parenting-time and communication issues.",
  "Scenario-based examples focused on children's well-being.",
  "Comprehension checks tied to the main South Dakota topic areas.",
  "Certificate and verification workflow designed for court-filing use.",
] as const

export const SOUTH_DAKOTA_PARENT_SITE_JOURNEY = [
  {
    title: "Review pricing and price-match options",
    body:
      "You can review the standard tuition, hardship options, fee-waiver path, and price-match request process before you start.",
  },
  {
    title: "Complete the 4-hour course sequence",
    body:
      "You move through the full course, reflection steps, and comprehension checks at a practical self-paced rhythm.",
  },
  {
    title: "Satisfy completion rules and unlock the certificate",
    body:
      "Your certificate is released after all required course steps are complete and the completion record is written with a verification ID.",
  },
  {
    title: "Get help when you need it",
    body:
      "Phone and email support stay available for access, pricing, and certificate questions.",
  },
] as const

export const SOUTH_DAKOTA_PARENT_SITE_PRICING = [
  {
    name: "Standard tuition",
    price: "$17.95",
    description:
      "Full course access, completion tracking, and certificate processing after the required course steps are satisfied.",
    note: "One simple price for the standard South Dakota course flow.",
  },
  {
    name: "Hardship review",
    price: "Case-by-case",
    description:
      "Available when a participant shows comparable hardship or lower-income eligibility documentation.",
    note:
      "Families can contact support before enrolling if cost is a barrier.",
  },
  {
    name: "Fee waiver",
    price: "$0",
    description:
      "Available when documented indigency or a comparable court-recognized hardship standard is shown.",
    note:
      "A waiver path remains available when the financial-hardship standard is met.",
  },
] as const

export const SOUTH_DAKOTA_PARENT_SITE_INCLUDED = [
  "Full access across the 8-module South Dakota sequence.",
  "Court-filing certificate fields with a verification ID.",
  "Completion record retention for authenticity checks.",
  "Phone and email support for enrollment, hardship review, and certificate questions.",
  "No extra certificate-processing fee in the normal course flow.",
] as const

export const SOUTH_DAKOTA_PARENT_SITE_PRICE_MATCH_TERMS = [
  "We review current public prices for comparable South Dakota online parenting or co-parenting courses.",
  "The competitor price must be current, publicly visible, and include all mandatory fees.",
  "Private coupon codes, expired promotions, low-income special rates, and non-comparable formats are not included.",
  "If the request qualifies, we match the verified public price or beat it by $1.",
  "Price-match approvals are manual so the posted terms stay accurate and non-deceptive.",
] as const

export const SOUTH_DAKOTA_PARENT_SITE_CERTIFICATE_FIELDS = [
  "Participant name",
  "Completion date",
  "Course name",
  "Verification ID",
  "Provider contact information",
  "Court-filing-ready certificate language",
] as const

export const SOUTH_DAKOTA_PARENT_SITE_AUTHENTICITY = [
  "Each certificate receives a unique verification ID.",
  "Completion data is retained for authenticity checks.",
  "Verification requests can be answered using participant name and verification ID.",
  "Certificates are released only after the required course steps are completed.",
] as const

export const SOUTH_DAKOTA_PARENT_SITE_FAQS = [
  {
    question: "How much does the South Dakota course cost?",
    answer:
      "The standard tuition is $17.95. The course also keeps a hardship-review path and a fee-waiver path for documented financial hardship.",
  },
  {
    question: "Do you offer a price match guarantee?",
    answer:
      "Yes. If you find a lower current public price for a comparable South Dakota online parenting course, submit the link for manual review and we will match it or beat it by $1 if it qualifies under the posted terms.",
  },
  {
    question: "How long is the course?",
    answer:
      "The planned instructional flow is 240 minutes, or 4 hours total, matching the runtime used throughout the South Dakota packet and public course structure.",
  },
  {
    question: "What does the certificate include?",
    answer:
      "The certificate includes the participant's name, course name, completion date, provider contact information, and a verification ID used for authenticity review.",
  },
  {
    question: "Can the course help with case-specific legal advice?",
    answer:
      "No. The course is educational. It provides structured parenting education and general information, but it does not replace individualized legal advice or therapy.",
  },
  {
    question: "How do you handle certificate verification?",
    answer:
      "Completion records are retained and each certificate receives a verification ID so authenticity can be confirmed when needed.",
  },
  {
    question: "Where can I ask about hardship review or certificate issues?",
    answer:
      "Support is available by phone and email, with a target initial response within 1 business day for access, price-review, and certificate-related questions.",
  },
  {
    question: "How should families confirm current approved-provider status?",
    answer:
      "Families should always review the current South Dakota UJS parenting-classes page and verify what the court accepts before relying on any provider for a filing.",
  },
] as const satisfies readonly SouthDakotaSiteFaq[]

export const SOUTH_DAKOTA_PARENT_SITE_REVIEWER_POINTS = [
  "The South Dakota course has clear public pages for the overview, curriculum, pricing, certificate details, FAQ, and price-match request flow.",
  "The course contact path uses a dedicated support email and phone line for enrollment and certificate questions.",
  "Certificates include a verification ID and support contact details for authenticity checks.",
  "Official South Dakota court and statute links remain available in one place for quick reference.",
] as const

export const SOUTH_DAKOTA_PARENT_SITE_REVIEW_STEPS = [
  "Start on the Overview page to review the public course description, tuition summary, and child-centered structure.",
  "Open Curriculum to inspect the 4-hour module sequence and the South Dakota topic mapping.",
  "Open Pricing and Price Match to review the standard fee, hardship path, and public price-match terms.",
  "Open Certificate to confirm the completion fields and authenticity controls.",
  "Use FAQ and the official South Dakota court links for follow-up questions or comparison points.",
] as const

export const SOUTH_DAKOTA_PARENT_SITE_RESOURCES = [
  {
    label: "South Dakota UJS Parenting Classes",
    href: "https://ujs.sd.gov/programs-services/parenting-coordinators-and-classes/parenting-classes/",
  },
  {
    label: "South Dakota Parenting Coordinators and Classes",
    href: "https://ujs.sd.gov/programs-services/parenting-coordinators-and-classes/",
  },
  {
    label: "South Dakota State Court Administrator's Office",
    href: "https://ujs.sd.gov/about-us/state-court-administrators-office/",
  },
  {
    label: "SDCL 25-4A-32",
    href: "https://sdlegislature.gov/Statutes/25-4A-32",
  },
] as const

export const SOUTH_DAKOTA_PARENT_SITE_SUPPORT = {
  organization: "South Dakota Co-Parenting Foundations",
  phone: "(703) 574-0146",
  email: "admin@nationaldriverimprovement.com",
} as const

export const SOUTH_DAKOTA_PARENT_SITE_NAV_ES = [
  { label: "Resumen", href: "/south-dakota-parenting" },
  { label: "Plan de estudios", href: "/south-dakota-parenting/curriculum" },
  { label: "Precios", href: "/south-dakota-parenting/pricing" },
  { label: "Certificado", href: "/south-dakota-parenting/certificate" },
  { label: "Preguntas", href: "/south-dakota-parenting/faq" },
  { label: "Igualacion de precio", href: "/south-dakota-parenting/price-match" },
] as const satisfies readonly SouthDakotaSiteNavItem[]

export const SOUTH_DAKOTA_PARENT_SITE_HIGHLIGHTS_ES = [
  { label: "Duracion del curso", value: "4 horas en 8 modulos guiados" },
  {
    label: "Matrícula",
    value: "$17.95 de matrícula estándar con revision de dificultad y exención",
  },
  {
    label: "Certificado",
    value: "Certificado de finalización con ID de verificación y soporte de autenticidad",
  },
  {
    label: "Soporte",
    value: "Ayuda por telefono y correo para acceso, precios y certificados",
  },
] as const

export const SOUTH_DAKOTA_PARENT_SITE_FEATURES_ES = [
  {
    title: "Basado en los temas publicados por Dakota del Sur",
    body:
      "La estructura sigue la lista de temas de UJS de Dakota del Sur, incluyendo efectos de la separacion en los hijos, responsabilidades de coparentalidad, reduccion de conflictos y responsabilidades financieras.",
  },
  {
    title: "Acceso en linea de bajo costo",
    body:
      "El precio se mantiene simple y accesible, con revision por dificultad y opción de exención para familias que lo necesitan.",
  },
  {
    title: "Centrado en los hijos y practico",
    body:
      "Los modulos se enfocan en la transicion familiar, comunicación calmada y habitos de coparentalidad en lugar de contenido generico.",
  },
  {
    title: "Controles de certificado y verificación",
    body:
      "Los registros se conservan, los certificados usan ID de verificación y el contacto de soporte es facil de encontrar.",
  },
] as const

export const SOUTH_DAKOTA_PARENT_SITE_MODULES_ES = [
  {
    title: "Modulo 1. Transicion familiar y orientacion del curso",
    duration: "30 minutos",
    focus:
      "Orientacion en lenguaje claro sobre la transicion familiar, la estructura del curso y por que los tribunales requieren esta educacion.",
    outcomes: [
      "Comprender el proposito del curso en asuntos de custodia y tiempo de crianza.",
      "Reconocer el enfoque centrado en los hijos usado en el programa.",
      "Prepararse para un proceso de aprendizaje calmado y estructurado.",
    ],
  },
  {
    title: "Modulo 2. Efectos de la separacion o el divorcio en los hijos",
    duration: "30 minutos",
    focus:
      "Como la separacion, el divorcio y el conflicto adulto continuo pueden afectar a los hijos emocional y conductualmente.",
    outcomes: [
      "Identificar reacciones comunes de estres en los hijos durante la transicion.",
      "Reconocer como los hijos pueden internalizar el conflicto adulto.",
      "Usar respuestas de apoyo durante periodos de cambio.",
    ],
  },
  {
    title: "Modulo 3. Roles y responsabilidades de coparentalidad",
    duration: "30 minutos",
    focus:
      "Expectativas de crianza compartida, responsabilidad entre hogares y rol parental continuo después de la separacion.",
    outcomes: [
      "Distinguir entre conflicto adulto y responsabilidades centradas en los hijos.",
      "Planificar mayor consistencia entre hogares.",
      "Usar lenguaje de responsabilidad que apoye estabilidad.",
    ],
  },
  {
    title: "Modulo 4. Necesidades de los hijos y tecnicas de afrontamiento",
    duration: "30 minutos",
    focus:
      "Necesidades segun la edad, patrones de afrontamiento y senales de que puede requerirse apoyo adicional.",
    outcomes: [
      "Ajustar expectativas segun etapas de desarrollo.",
      "Apoyar el afrontamiento sin poner a los hijos en medio.",
      "Detectar cuando un hijo puede necesitar apoyo adicional.",
    ],
  },
  {
    title: "Modulo 5. Comunicacion con los hijos sobre cambios familiares",
    duration: "30 minutos",
    focus:
      "Como hablar con los hijos sobre separacion, reglas, horarios y emociones de manera tranquilizadora.",
    outcomes: [
      "Usar lenguaje apropiado para la edad sobre cambios familiares.",
      "Evitar mensajes que presionen a los hijos a tomar partido.",
      "Reforzar seguridad, previsibilidad y estabilidad emocional.",
    ],
  },
  {
    title: "Modulo 6. Comunicacion con el otro padre y reduccion de conflictos",
    duration: "30 minutos",
    focus:
      "Comunicacion de menor conflicto, limites y habitos que evitan que los hijos queden en medio.",
    outcomes: [
      "Usar comunicación breve, factual y centrada en los hijos.",
      "Reconocer patrones de escalamiento y elegir alternativas mas calmadas.",
      "Reducir el uso de los hijos como mensajeros.",
    ],
  },
  {
    title: "Modulo 7. Disputas, responsabilidades financieras y limites de soporte",
    duration: "30 minutos",
    focus:
      "Opciones de resolucion, responsabilidades financieras y limites entre educacion y asesoria legal.",
    outcomes: [
      "Comprender opciones generales para reducir disputas.",
      "Reconocer responsabilidades financieras continuas.",
      "Saber cuando dirigir dudas legales al tribunal o a un abogado.",
    ],
  },
  {
    title: "Modulo 8. Revision final, verificaciones y liberacion del certificado",
    duration: "30 minutos",
    focus:
      "Cierre estructurado con lecciones clave, verificaciones de comprension y reglas de certificado.",
    outcomes: [
      "Revisar los puntos principales centrados en los hijos.",
      "Completar las verificaciones requeridas.",
      "Entender como funciona el certificado y la verificación.",
    ],
  },
] as const satisfies readonly SouthDakotaSiteModule[]

export const SOUTH_DAKOTA_PARENT_SITE_TEACHING_METHODS_ES = [
  "Segmentos cortos con explicaciones claras.",
  "Preguntas de reflexion ligadas a temas comunes de coparentalidad.",
  "Ejemplos basados en escenarios centrados en el bienestar infantil.",
  "Verificaciones de comprension ligadas a temas principales.",
  "Flujo de certificado y verificación listo para uso judicial.",
] as const

export const SOUTH_DAKOTA_PARENT_SITE_JOURNEY_ES = [
  {
    title: "Revisa precios y opciones de igualación",
    body:
      "Puedes revisar la matrícula estándar, opciones por dificultad, exención y proceso de igualación antes de comenzar.",
  },
  {
    title: "Completa la secuencia de 4 horas",
    body:
      "Avanzas por el curso completo, con reflexiones y verificaciones de comprension a tu ritmo.",
  },
  {
    title: "Cumple los requisitos y desbloquea el certificado",
    body:
      "Tu certificado se libera después de completar todos los pasos y registrar el ID de verificación.",
  },
  {
    title: "Recibe ayuda cuando la necesites",
    body:
      "El soporte por telefono y correo esta disponible para acceso, precios y certificados.",
  },
] as const

export const SOUTH_DAKOTA_PARENT_SITE_PRICING_ES = [
  {
    name: "Matrícula estándar",
    price: "$17.95",
    description:
      "Acceso completo, seguimiento de finalización y procesamiento del certificado al cumplir los requisitos.",
    note: "Un precio simple para el curso estándar de Dakota del Sur.",
  },
  {
    name: "Revision por dificultad",
    price: "Caso por caso",
    description:
      "Disponible cuando el participante presenta documentacion de dificultad comparable o bajos ingresos.",
    note:
      "Las familias pueden contactar soporte antes de inscribirse si el costo es una barrera.",
  },
  {
    name: "Exencion",
    price: "$0",
    description:
      "Disponible cuando se demuestra indigencia documentada o un criterio comparable reconocido por el tribunal.",
    note:
      "La exención permanece disponible cuando se cumple el criterio de dificultad financiera.",
  },
] as const

export const SOUTH_DAKOTA_PARENT_SITE_INCLUDED_ES = [
  "Acceso completo a la secuencia de 8 modulos.",
  "Campos de certificado listos para presentacion judicial con ID de verificación.",
  "Conservacion de registros de finalización para autenticidad.",
  "Soporte por telefono y correo para inscripción y certificados.",
  "Sin tarifa adicional por procesamiento de certificado.",
] as const

export const SOUTH_DAKOTA_PARENT_SITE_PRICE_MATCH_TERMS_ES = [
  "Revisamos precios publicos vigentes de cursos comparables en linea de Dakota del Sur.",
  "El precio del competidor debe ser actual, público e incluir todas las tarifas obligatorias.",
  "No se incluyen cupones privados, promociones vencidas, tarifas especiales ni formatos no comparables.",
  "Si la solicitud califica, igualamos el precio verificado o lo mejoramos por $1.",
  "Las aprobaciones se revisan manualmente para mantener términos claros y precisos.",
] as const

export const SOUTH_DAKOTA_PARENT_SITE_CERTIFICATE_FIELDS_ES = [
  "Nombre del participante",
  "Fecha de finalización",
  "Nombre del curso",
  "ID de verificación",
  "Informacion de contacto del proveedor",
  "Texto listo para presentacion judicial",
] as const

export const SOUTH_DAKOTA_PARENT_SITE_AUTHENTICITY_ES = [
  "Cada certificado recibe un ID de verificación unico.",
  "Los datos de finalización se conservan para verificación de autenticidad.",
  "Las solicitudes de verificación pueden responderse con nombre e ID.",
  "Los certificados se liberan solo después de completar los pasos requeridos.",
] as const

export const SOUTH_DAKOTA_PARENT_SITE_FAQS_ES = [
  {
    question: "Cuanto cuesta el curso de Dakota del Sur?",
    answer:
      "La matrícula estándar es $17.95. El curso mantiene una opción de revision por dificultad y una exención para casos documentados.",
  },
  {
    question: "Ofrecen garantía de igualación de precio?",
    answer:
      "Si. Si encuentras un precio público mas bajo para un curso comparable, envia el enlace para revision manual y lo igualamos o mejoramos por $1 si califica.",
  },
  {
    question: "Cuanto dura el curso?",
    answer:
      "El flujo previsto es de 240 minutos, o 4 horas en total, alineado con la estructura del paquete de Dakota del Sur.",
  },
  {
    question: "Que incluye el certificado?",
    answer:
      "Incluye nombre del participante, nombre del curso, fecha de finalización, contacto del proveedor e ID de verificación.",
  },
  {
    question: "El curso ofrece asesoria legal especifica?",
    answer:
      "No. El curso es educativo. Ofrece información general y educacion estructurada, pero no reemplaza asesoria legal ni terapia.",
  },
  {
    question: "Como se maneja la verificación del certificado?",
    answer:
      "Los registros de finalización se conservan y cada certificado recibe un ID de verificación para confirmar autenticidad.",
  },
  {
    question: "Donde consulto sobre dificultad o certificados?",
    answer:
      "El soporte esta disponible por telefono y correo, con respuesta inicial prevista dentro de 1 dia habil.",
  },
  {
    question: "Como confirmar el estatus de proveedor aprobado?",
    answer:
      "Las familias deben revisar la página actual de clases de UJS de Dakota del Sur y confirmar lo que el tribunal acepta.",
  },
] as const satisfies readonly SouthDakotaSiteFaq[]

export const SOUTH_DAKOTA_PARENT_SITE_REVIEWER_POINTS_ES = [
  "El curso tiene páginas publicas claras para resumen, plan de estudios, precios, certificado, preguntas y igualación.",
  "El contacto usa un correo y telefono de soporte dedicados para inscripción y certificados.",
  "Los certificados incluyen un ID de verificación y datos de contacto para autenticidad.",
  "Los enlaces oficiales de Dakota del Sur se mantienen en un solo lugar.",
] as const

export const SOUTH_DAKOTA_PARENT_SITE_REVIEW_STEPS_ES = [
  "Empieza en Resumen para revisar descripcion, matrícula y estructura.",
  "Abre Plan de estudios para ver la secuencia de 4 horas y el mapeo de temas.",
  "Abre Precios e Igualacion para revisar la matrícula estándar y términos.",
  "Abre Certificado para confirmar campos y controles de autenticidad.",
  "Usa Preguntas y enlaces oficiales para referencias adicionales.",
] as const

export const SOUTH_DAKOTA_PARENT_SITE_RESOURCES_ES = [
  {
    label: "Clases de crianza UJS de Dakota del Sur",
    href: "https://ujs.sd.gov/programs-services/parenting-coordinators-and-classes/parenting-classes/",
  },
  {
    label: "Coordinadores y clases de crianza de Dakota del Sur",
    href: "https://ujs.sd.gov/programs-services/parenting-coordinators-and-classes/",
  },
  {
    label: "Oficina del Administrador de Tribunales del Estado",
    href: "https://ujs.sd.gov/about-us/state-court-administrators-office/",
  },
  {
    label: "SDCL 25-4A-32",
    href: "https://sdlegislature.gov/Statutes/25-4A-32",
  },
] as const
