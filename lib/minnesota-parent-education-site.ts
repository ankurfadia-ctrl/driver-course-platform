export type MinnesotaSiteNavItem = {
  label: string
  href: string
}

export type MinnesotaSiteModule = {
  title: string
  duration: string
  focus: string
  outcomes: string[]
}

export type MinnesotaSitePricingTier = {
  name: string
  price: string
  description: string
  note: string
}

export type MinnesotaSiteFaq = {
  question: string
  answer: string
}

export const MINNESOTA_PARENT_SITE_NAV = [
  { label: "Overview", href: "/minnesota-parent-education" },
  { label: "Curriculum", href: "/minnesota-parent-education/curriculum" },
  { label: "Tuition", href: "/minnesota-parent-education/pricing" },
  { label: "Enrollment", href: "/minnesota-parent-education/enroll" },
  { label: "Certificate", href: "/minnesota-parent-education/certificate" },
  { label: "FAQ", href: "/minnesota-parent-education/faq" },
  { label: "Price Match", href: "/minnesota-parent-education/price-match" },
  { label: "Court Review", href: "/minnesota-parent-education/reviewer" },
] as const satisfies readonly MinnesotaSiteNavItem[]

export const MINNESOTA_PARENT_SITE_HIGHLIGHTS = [
  {
    label: "Course length",
    value: "6 hours across 7 guided modules",
  },
  {
    label: "Tuition",
    value: "$22.95 standard tuition with reduced-fee and waiver paths",
  },
  {
    label: "Certificate",
    value: "Completion certificate with case number fields and verification ID",
  },
  {
    label: "Support",
    value: "Phone and email support with fee-waiver help",
  },
] as const

export const MINNESOTA_PARENT_SITE_FEATURES = [
  {
    title: "Built for Minnesota family-court matters",
    body:
      "The curriculum is organized around custody, parenting-time, and paternity-related family transitions, with plain-language orientation to Minnesota court roles and next steps.",
  },
  {
    title: "Child-centered and practical",
    body:
      "Lessons focus on children's emotional needs, communication between homes, stress reduction, and helping parents make calmer, more stable decisions.",
  },
  {
    title: "Low-cost and accessible",
    body:
      "Tuition stays affordable, with reduced-fee review and fee-waiver help when a participant qualifies.",
  },
  {
    title: "Completion details that are easy to use",
    body:
      "The certificate includes the details families are most likely to need, including participant name, case number, attendance dates, completion date, and verification ID.",
  },
] as const

export const MINNESOTA_PARENT_SITE_MODULES = [
  {
    title: "Module 1. Orientation and Minnesota family-court overview",
    duration: "45 minutes",
    focus:
      "Course purpose, best-interests framing, and a plain-language overview of Minnesota family-court participation.",
    outcomes: [
      "Understand why parent education is assigned in Minnesota family-law matters.",
      "Review the role of the court and common expectations at a general educational level.",
      "Set expectations for respectful, child-focused participation throughout the course.",
    ],
  },
  {
    title: "Module 2. Family transition, paternity, and coping with stress",
    duration: "45 minutes",
    focus:
      "How separation, paternity proceedings, and ongoing conflict can affect adults and children during transition.",
    outcomes: [
      "Recognize common stress reactions during separation or paternity proceedings.",
      "Identify healthier coping strategies that do not pull children into adult conflict.",
      "Understand how instability can affect children and caregivers over time.",
    ],
  },
  {
    title: "Module 3. Child development and keeping children out of the middle",
    duration: "60 minutes",
    focus:
      "Developmental stages, emotional needs, and practical ways to keep children out of loyalty conflicts.",
    outcomes: [
      "Match parenting responses to different developmental stages.",
      "Spot behavior that may show a child is carrying adult stress.",
      "Use practical boundaries that keep children out of adult disputes.",
    ],
  },
  {
    title: "Module 4. Communication, co-parenting, and conflict reduction",
    duration: "60 minutes",
    focus:
      "Communication skills, co-parenting habits, and lower-conflict ways to solve routine parenting issues.",
    outcomes: [
      "Use brief, factual, child-focused communication habits.",
      "Recognize escalation patterns and choose calmer alternatives.",
      "Plan around parenting-time issues without using children as messengers.",
    ],
  },
  {
    title: "Module 5. Court roles, dispute-resolution options, and legal boundaries",
    duration: "45 minutes",
    focus:
      "Roles of attorneys, mediators, guardians ad litem, custody studies, and other court-connected professionals.",
    outcomes: [
      "Understand the general role of common court-connected professionals.",
      "Review dispute-resolution options at a non-advisory level.",
      "Separate educational legal information from individualized legal advice.",
    ],
  },
  {
    title: "Module 6. Safety, domestic violence, sexual assault, and resources",
    duration: "45 minutes",
    focus:
      "Safety planning, resource awareness, and trauma-informed course boundaries for higher-risk family situations.",
    outcomes: [
      "Recognize when standard co-parenting assumptions may be unsafe.",
      "Review Minnesota resource pathways and emergency-support options.",
      "Understand the course's education-only boundary for safety and crisis issues.",
    ],
  },
  {
    title: "Module 7. Financial responsibilities, child support, and completion review",
    duration: "60 minutes",
    focus:
      "Financial responsibilities, cost-of-raising-a-child context, and final completion workflow.",
    outcomes: [
      "Review child-support and financial-responsibility concepts at a general level.",
      "Understand completion requirements and certificate issuance expectations.",
      "Complete the course evaluation and final reflection steps.",
    ],
  },
] as const satisfies readonly MinnesotaSiteModule[]

export const MINNESOTA_PARENT_SITE_TEACHING_METHODS = [
  "Short lesson segments with plain-language explanations.",
  "Guided reflection prompts and scenario-based examples.",
  "Comprehension checks tied to major course concepts.",
  "Child-centered communication exercises and message-rewrite practice.",
  "Resource and safety checklists for practical follow-through.",
] as const

export const MINNESOTA_PARENT_SITE_JOURNEY = [
  {
    title: "Review tuition and support options",
    body:
      "You can compare standard tuition, reduced-fee options, and fee-waiver eligibility before getting started.",
  },
  {
    title: "Create an account and enter case details",
    body:
      "Enrollment asks for your contact information, case number, and any pricing-relief request that needs review.",
  },
  {
    title: "Complete lessons, checks, and evaluation",
    body:
      "You move through the full 6-hour sequence, complete lesson checks, and finish the course evaluation.",
  },
  {
    title: "Receive your completion certificate",
    body:
      "After you finish the course requirements, your certificate is issued with the completion details and verification ID you may need later.",
  },
] as const

export const MINNESOTA_PARENT_SITE_PRICING = [
  {
    name: "Standard tuition",
    price: "$22.95",
    description:
      "Full course access, evaluation flow, and certificate processing after completion requirements are met.",
    note:
      "Includes course access, completion tracking, participant evaluation, and certificate processing after the required steps are finished.",
  },
  {
    name: "Reduced-fee tuition",
    price: "$12.95",
    description:
      "Available for participants who show comparable hardship or lower-income eligibility.",
    note:
      "Requests can be reviewed before standard tuition is charged.",
  },
  {
    name: "Fee-waiver tuition",
    price: "$0",
    description:
      "Available for participants who qualify under Minn. Stat. Sec. 563.01 or a comparable court-approved indigency standard.",
    note:
      "No participant should be blocked solely because of inability to pay when the waiver standard is met.",
  },
] as const satisfies readonly MinnesotaSitePricingTier[]

export const MINNESOTA_PARENT_SITE_INCLUDED = [
  "Full access across the 7-module course sequence.",
  "Case-number-ready certificate fields for Minnesota parent-education use.",
  "Completion tracking, final evaluation, and certificate verification workflow.",
  "Email and phone support for enrollment, fee-waiver questions, and completion issues.",
  "No hidden administrative fee added to normal online enrollment.",
] as const

export const MINNESOTA_PARENT_SITE_PRICE_MATCH_TERMS = [
  "We review current public prices for comparable online Minnesota parent-education or co-parenting courses.",
  "The competitor price must be current, publicly visible, and include all mandatory fees.",
  "Private coupon codes, expired promotions, limited-audience discounts, and bundle pricing are not included.",
  "If the request qualifies, we match the verified public price or beat it by $1.",
  "Price-match approvals are manual so the advertised terms remain accurate and non-deceptive.",
] as const

export const MINNESOTA_PARENT_SITE_CERTIFICATE_FIELDS = [
  "Participant name",
  "Court case number",
  "Date or dates of attendance",
  "Completion date",
  "Course name",
  "Verification ID",
  "Provider contact information",
] as const

export const MINNESOTA_PARENT_SITE_AUTHENTICITY = [
  "Each certificate receives a unique verification ID.",
  "Completion data is retained in provider records for authenticity checks.",
  "Verification requests can be answered using participant name, case number, and verification ID.",
  "Certificates are released only after all required completion steps are met.",
] as const

export const MINNESOTA_PARENT_SITE_FAQS = [
  {
    question: "Is this course built for Minnesota family-court matters?",
    answer:
      "Yes. The curriculum is tailored for Minnesota parent-education use and includes Minnesota court-process orientation, common family-court roles, resource planning, and certificate fields designed for Minnesota use.",
  },
  {
    question: "How long is the course?",
    answer:
      "The planned instructional flow is 360 minutes, or 6 hours total, which fits Minnesota's general 4-to-8-hour program range.",
  },
  {
    question: "What does the certificate include?",
    answer:
      "The certificate includes the participant's name, case number, attendance dates, completion date, course name, provider contact information, and a verification ID.",
  },
  {
    question: "Do you offer fee waivers or reduced-fee access?",
    answer:
      "Yes. The tuition model includes a reduced-fee path and a no-fee path for participants who qualify under Minn. Stat. Sec. 563.01 or a comparable indigency standard.",
  },
  {
    question: "Do you offer a price match guarantee?",
    answer:
      "Yes. If you find a lower current public price for a comparable Minnesota online parent-education course, submit the link for manual review and we will match it or beat it by $1 if the offer qualifies under the posted terms.",
  },
  {
    question: "Is support available during enrollment or completion?",
    answer:
      "Yes. Enrollment, fee-waiver, and certificate questions can be handled by email or phone, with a target initial response within 1 business day.",
  },
  {
    question: "Does the course provide legal advice or therapy?",
    answer:
      "No. The course is educational. It offers general information, structured parenting education, and resource guidance, but it does not replace individualized legal advice or mental-health treatment.",
  },
  {
    question: "How can a court reviewer inspect the site?",
    answer:
      "If a court or attorney wants a structured review view, a dedicated Court Review page is available with the main course sections and official resource links.",
  },
] as const satisfies readonly MinnesotaSiteFaq[]

export const MINNESOTA_PARENT_SITE_REVIEWER_POINTS = [
  "The Minnesota course has its own standalone public site, course name, tuition, certificate, and support contact.",
  "Public pages cover the overview, curriculum, tuition, enrollment, certificate, FAQ, and court-review path in one place.",
  "The public certificate and contact sections use a correspondence address instead of a home address.",
  "Formal business documentation can be furnished separately if Minnesota requests it during review.",
] as const

export const MINNESOTA_PARENT_SITE_REVIEW_STEPS = [
  "Start on the Overview page to review the public course description, tuition summary, and overall structure.",
  "Open Curriculum to inspect the full module sequence, learning outcomes, and teaching methods.",
  "Open Tuition and Enrollment to review pricing, fee-waiver treatment, and planned participant flow.",
  "Open Certificate to confirm the completion fields and verification controls.",
  "Use FAQ and the official resource links for follow-up questions or comparison points.",
] as const

export const MINNESOTA_PARENT_SITE_RESOURCES = [
  {
    label: "Minnesota Parent Education Overview",
    href: "https://mncourts.gov/help-topics/parent-education",
  },
  {
    label: "Minnesota Judicial Branch Self-Help",
    href: "https://mncourts.gov/selfhelp",
  },
  {
    label: "Minnesota State Law Library",
    href: "https://mn.gov/law-library/",
  },
  {
    label: "Day One Domestic Violence Resource Directory",
    href: "https://mn.gov/adresources/search/ee4c0dfa-9c1a-5296-9de4-14c7160b96e3/",
  },
] as const

export const MINNESOTA_PARENT_SITE_SUPPORT = {
  organization: "Minnesota Co-Parenting Foundations",
  phone: "(703) 574-0146",
  email: "admin@nationaldriverimprovement.com",
} as const

export const MINNESOTA_PARENT_SITE_NAV_ES = [
  { label: "Resumen", href: "/minnesota-parent-education" },
  { label: "Plan de estudios", href: "/minnesota-parent-education/curriculum" },
  { label: "Matricula", href: "/minnesota-parent-education/pricing" },
  { label: "Inscripcion", href: "/minnesota-parent-education/enroll" },
  { label: "Certificado", href: "/minnesota-parent-education/certificate" },
  { label: "Preguntas", href: "/minnesota-parent-education/faq" },
  { label: "Igualacion de precio", href: "/minnesota-parent-education/price-match" },
  { label: "Revision judicial", href: "/minnesota-parent-education/reviewer" },
] as const satisfies readonly MinnesotaSiteNavItem[]

export const MINNESOTA_PARENT_SITE_HIGHLIGHTS_ES = [
  {
    label: "Duracion del curso",
    value: "6 horas en 7 modulos guiados",
  },
  {
    label: "Matricula",
    value: "$22.95 de matricula estandar con opciones de tarifa reducida y exencion",
  },
  {
    label: "Certificado",
    value: "Certificado de finalizacion con campos de numero de caso e ID de verificacion",
  },
  {
    label: "Soporte",
    value: "Soporte por telefono y correo con ayuda para exencion",
  },
] as const

export const MINNESOTA_PARENT_SITE_FEATURES_ES = [
  {
    title: "Diseñado para asuntos de tribunal familiar de Minnesota",
    body:
      "El plan de estudios se organiza alrededor de custodia, tiempo de crianza y transiciones familiares relacionadas con paternidad, con una orientacion clara sobre el tribunal de Minnesota y los siguientes pasos.",
  },
  {
    title: "Centrado en los hijos y practico",
    body:
      "Las lecciones se enfocan en las necesidades emocionales de los hijos, la comunicacion entre hogares, la reduccion del estres y decisiones mas estables.",
  },
  {
    title: "Accesible y de bajo costo",
    body:
      "La matricula se mantiene accesible, con revision de tarifa reducida y ayuda para exencion cuando el participante califica.",
  },
  {
    title: "Detalles de finalizacion faciles de usar",
    body:
      "El certificado incluye los datos mas solicitados: nombre del participante, numero de caso, fechas de asistencia, fecha de finalizacion y ID de verificacion.",
  },
] as const

export const MINNESOTA_PARENT_SITE_MODULES_ES = [
  {
    title: "Modulo 1. Orientacion y panorama del tribunal familiar de Minnesota",
    duration: "45 minutos",
    focus:
      "Proposito del curso, enfoque de mejores intereses y panorama en lenguaje claro de la participacion en el tribunal familiar de Minnesota.",
    outcomes: [
      "Comprender por que se asigna la educacion para padres en asuntos de derecho familiar de Minnesota.",
      "Revisar el rol del tribunal y expectativas comunes a nivel educativo general.",
      "Establecer expectativas de participacion respetuosa y centrada en los hijos durante todo el curso.",
    ],
  },
  {
    title: "Modulo 2. Transicion familiar, paternidad y manejo del estres",
    duration: "45 minutos",
    focus:
      "Como la separacion, los procesos de paternidad y el conflicto continuo pueden afectar a adultos y ninos durante la transicion.",
    outcomes: [
      "Reconocer reacciones comunes al estres durante separacion o procesos de paternidad.",
      "Identificar estrategias mas saludables sin involucrar a los hijos en el conflicto.",
      "Comprender como la inestabilidad puede afectar a hijos y cuidadores con el tiempo.",
    ],
  },
  {
    title: "Modulo 3. Desarrollo infantil y mantener a los hijos fuera del conflicto",
    duration: "60 minutos",
    focus:
      "Etapas de desarrollo, necesidades emocionales y formas practicas de mantener a los hijos fuera de conflictos de lealtad.",
    outcomes: [
      "Ajustar las respuestas de crianza segun la etapa de desarrollo.",
      "Detectar conductas que indiquen que un hijo esta cargando estres adulto.",
      "Usar limites practicos para mantener a los hijos fuera de disputas adultas.",
    ],
  },
  {
    title: "Modulo 4. Comunicacion, coparentalidad y reduccion de conflictos",
    duration: "60 minutos",
    focus:
      "Habilidades de comunicacion, habitos de coparentalidad y formas de resolver asuntos rutinarios con menos conflicto.",
    outcomes: [
      "Usar comunicacion breve, factual y centrada en los hijos.",
      "Reconocer patrones de escalamiento y elegir alternativas mas calmadas.",
      "Planificar asuntos de tiempo de crianza sin usar a los hijos como mensajeros.",
    ],
  },
  {
    title: "Modulo 5. Roles del tribunal, opciones de resolucion y limites legales",
    duration: "45 minutos",
    focus:
      "Roles de abogados, mediadores, guardianes ad litem, estudios de custodia y otros profesionales vinculados al tribunal.",
    outcomes: [
      "Comprender el rol general de profesionales conectados al tribunal.",
      "Revisar opciones de resolucion de disputas a nivel informativo.",
      "Diferenciar informacion legal educativa de asesoria legal individual.",
    ],
  },
  {
    title: "Modulo 6. Seguridad, violencia domestica, agresion sexual y recursos",
    duration: "45 minutos",
    focus:
      "Planificacion de seguridad, conocimiento de recursos y limites del curso para situaciones familiares de mayor riesgo.",
    outcomes: [
      "Reconocer cuando las suposiciones de coparentalidad pueden ser inseguras.",
      "Revisar recursos de Minnesota y opciones de apoyo en emergencias.",
      "Comprender que el curso es educativo y no reemplaza la ayuda de crisis.",
    ],
  },
  {
    title: "Modulo 7. Responsabilidades financieras, manutencion infantil y cierre",
    duration: "60 minutos",
    focus:
      "Responsabilidades financieras, contexto del costo de criar a un hijo y flujo final de finalizacion.",
    outcomes: [
      "Revisar conceptos de manutencion y responsabilidad financiera a nivel general.",
      "Entender requisitos de finalizacion y expectativas de certificado.",
      "Completar la evaluacion del curso y los pasos finales.",
    ],
  },
] as const satisfies readonly MinnesotaSiteModule[]

export const MINNESOTA_PARENT_SITE_TEACHING_METHODS_ES = [
  "Segmentos cortos con explicaciones claras.",
  "Preguntas de reflexion y ejemplos basados en escenarios.",
  "Verificaciones de comprension ligadas a conceptos clave.",
  "Ejercicios de comunicacion centrados en los hijos.",
  "Listas de recursos y seguridad para aplicar lo aprendido.",
] as const

export const MINNESOTA_PARENT_SITE_JOURNEY_ES = [
  {
    title: "Revisa matricula y opciones de apoyo",
    body:
      "Puedes comparar la matricula estandar, opciones de tarifa reducida y criterios de exencion antes de comenzar.",
  },
  {
    title: "Crea tu cuenta e ingresa datos del caso",
    body:
      "La inscripcion solicita tu informacion de contacto, numero de caso y cualquier solicitud de ayuda con el pago.",
  },
  {
    title: "Completa lecciones, verificaciones y evaluacion",
    body:
      "Avanzas por la secuencia completa de 6 horas, completas verificaciones y terminas la evaluacion del curso.",
  },
  {
    title: "Recibe tu certificado de finalizacion",
    body:
      "Al finalizar los requisitos, tu certificado se emite con los detalles de finalizacion y el ID de verificacion.",
  },
] as const

export const MINNESOTA_PARENT_SITE_PRICING_ES = [
  {
    name: "Matricula estandar",
    price: "$22.95",
    description:
      "Acceso completo al curso, evaluacion y procesamiento del certificado al cumplir los requisitos.",
    note:
      "Incluye acceso, seguimiento de finalizacion, evaluacion y procesamiento del certificado.",
  },
  {
    name: "Matricula con tarifa reducida",
    price: "$12.95",
    description:
      "Disponible para participantes con documentacion de dificultad comparable o elegibilidad de bajos ingresos.",
    note:
      "Las solicitudes pueden revisarse antes de cobrar la matricula estandar.",
  },
  {
    name: "Matricula con exencion",
    price: "$0",
    description:
      "Disponible para participantes que califican bajo Minn. Stat. Sec. 563.01 o un criterio de indigencia aprobado.",
    note:
      "Nadie debe quedar fuera solo por no poder pagar cuando cumple el criterio.",
  },
] as const satisfies readonly MinnesotaSitePricingTier[]

export const MINNESOTA_PARENT_SITE_INCLUDED_ES = [
  "Acceso completo a la secuencia de 7 modulos.",
  "Campos de certificado listos para numero de caso.",
  "Seguimiento de finalizacion, evaluacion final y verificacion del certificado.",
  "Soporte por correo y telefono para inscripcion y dudas de exencion.",
  "Sin tarifa administrativa oculta en la inscripcion en linea.",
] as const

export const MINNESOTA_PARENT_SITE_PRICE_MATCH_TERMS_ES = [
  "Revisamos precios publicos vigentes de cursos comparables de educacion para padres de Minnesota.",
  "El precio del competidor debe ser actual, publico e incluir todas las tarifas obligatorias.",
  "No se incluyen cupones privados, promociones vencidas, descuentos limitados ni precios por paquetes.",
  "Si la solicitud califica, igualamos el precio verificado o lo mejoramos por $1.",
  "Las aprobaciones se revisan manualmente para mantener terminos claros y precisos.",
] as const

export const MINNESOTA_PARENT_SITE_CERTIFICATE_FIELDS_ES = [
  "Nombre del participante",
  "Numero de caso del tribunal",
  "Fecha o fechas de asistencia",
  "Fecha de finalizacion",
  "Nombre del curso",
  "ID de verificacion",
  "Informacion de contacto del proveedor",
] as const

export const MINNESOTA_PARENT_SITE_AUTHENTICITY_ES = [
  "Cada certificado recibe un ID de verificacion unico.",
  "Los datos de finalizacion se conservan para verificacion de autenticidad.",
  "Las solicitudes de verificacion pueden responderse con nombre, numero de caso e ID.",
  "Los certificados se liberan solo despues de completar todos los requisitos.",
] as const

export const MINNESOTA_PARENT_SITE_FAQS_ES = [
  {
    question: "Este curso esta pensado para asuntos familiares de Minnesota?",
    answer:
      "Si. El plan de estudios esta orientado a educacion para padres en Minnesota e incluye orientacion sobre procesos del tribunal, roles comunes, recursos y campos de certificado.",
  },
  {
    question: "Cuanto dura el curso?",
    answer:
      "El flujo previsto es de 360 minutos, o 6 horas en total, dentro del rango general de 4 a 8 horas de Minnesota.",
  },
  {
    question: "Que incluye el certificado?",
    answer:
      "Incluye el nombre del participante, numero de caso, fechas de asistencia, fecha de finalizacion, nombre del curso, contacto del proveedor e ID de verificacion.",
  },
  {
    question: "Ofrecen exenciones o tarifa reducida?",
    answer:
      "Si. El modelo incluye una opcion de tarifa reducida y una exencion para participantes que califican bajo Minn. Stat. Sec. 563.01 o un criterio comparable.",
  },
  {
    question: "Ofrecen garantia de igualacion de precio?",
    answer:
      "Si. Si encuentras un precio publico mas bajo para un curso comparable de Minnesota, envia el enlace para revision manual y lo igualamos o mejoramos por $1 si califica.",
  },
  {
    question: "Hay soporte durante inscripcion o finalizacion?",
    answer:
      "Si. Las preguntas de inscripcion, exencion y certificado pueden atenderse por correo o telefono.",
  },
  {
    question: "El curso ofrece asesoria legal o terapia?",
    answer:
      "No. El curso es educativo. Ofrece informacion general y educacion estructurada, pero no reemplaza asesoria legal ni tratamiento de salud mental.",
  },
  {
    question: "Como puede revisar el sitio un tribunal?",
    answer:
      "Si un tribunal o abogado necesita una revision estructurada, hay una pagina de Revision Judicial con secciones principales y enlaces oficiales.",
  },
] as const satisfies readonly MinnesotaSiteFaq[]

export const MINNESOTA_PARENT_SITE_REVIEWER_POINTS_ES = [
  "El curso de Minnesota tiene su propio sitio publico, nombre del curso, matricula, certificado y contacto.",
  "Las paginas publicas cubren resumen, plan de estudios, matricula, inscripcion, certificado, preguntas y revision judicial.",
  "Las secciones publicas usan correo y telefono de soporte en lugar de un domicilio personal.",
  "La documentacion formal puede entregarse por separado si Minnesota la solicita.",
] as const

export const MINNESOTA_PARENT_SITE_REVIEW_STEPS_ES = [
  "Empieza en Resumen para revisar descripcion del curso, matricula y estructura general.",
  "Abre Plan de estudios para ver la secuencia de modulos, resultados y metodos.",
  "Abre Matricula e Inscripcion para revisar precios y opciones de ayuda.",
  "Abre Certificado para confirmar campos de finalizacion y verificacion.",
  "Usa Preguntas y los enlaces oficiales para referencias adicionales.",
] as const

export const MINNESOTA_PARENT_SITE_RESOURCES_ES = [
  {
    label: "Resumen de educacion para padres de Minnesota",
    href: "https://mncourts.gov/help-topics/parent-education",
  },
  {
    label: "Autoayuda del Poder Judicial de Minnesota",
    href: "https://mncourts.gov/selfhelp",
  },
  {
    label: "Biblioteca de Derecho del Estado de Minnesota",
    href: "https://mn.gov/law-library/",
  },
  {
    label: "Directorio de recursos de violencia domestica Day One",
    href: "https://mn.gov/adresources/search/ee4c0dfa-9c1a-5296-9de4-14c7160b96e3/",
  },
] as const
