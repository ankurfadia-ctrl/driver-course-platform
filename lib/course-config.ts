// lib/course-config.ts

export type LessonLink = {
  id: number
  title: string
  href: string
}

export type StateDisclosureItem = {
  title: string
  body: string
}

export type StateCourseTrack = {
  code: string
  name: string
  audience: string
  status: "planned" | "criteria-requested" | "criteria-received" | "in-build" | "submitted" | "approved"
  notes: string
}

export type StateCourseConfig = {
  stateCode: string
  stateSlug: string
  stateName: string
  enrollmentOpen: boolean
  courseSlug: string
  siteTitle: string
  brandName: string
  brandNameEs?: string
  courseName: string
  courseNameEs?: string
  marketingHeadline: string
  marketingDescription: string
  certificateIssuerLine: string
  approvalStatusLabel: string
  approvalStatusLabelEs?: string
  disclosuresIntro: string
  disclosuresIntroEs?: string
  disclosures: StateDisclosureItem[]
  disclosuresEs?: StateDisclosureItem[]
  dashboardLabel: string
  courseLabel: string
  certificateLabel: string
  finalExamLabel: string
  passingScorePercent: number
  finalExamQuestionCount: number
  logoSrc: string
  supportEmail: string
  supportPhone: string
  supportPhoneDisplay: string
  secondarySupportPhone?: string
  secondarySupportPhoneDisplay?: string
  courseTracks?: StateCourseTrack[]
}

export const COURSE_CONFIGS: Record<string, StateCourseConfig> = {
  virginia: {
    stateCode: "VA",
    stateSlug: "virginia",
    stateName: "Virginia",
    enrollmentOpen: true,
    courseSlug: "driver-improvement",
    siteTitle: "Virginia Driver Improvement Course",
    brandName: "Virginia Driver Improvement Course",
    brandNameEs: "Curso de mejoramiento para conductores de Virginia",
    courseName: "Virginia Driver Improvement Course",
    courseNameEs: "Curso de mejoramiento para conductores de Virginia",
    marketingHeadline: "Complete your Virginia driver improvement course online.",
    marketingDescription:
      "Online Virginia driver improvement course with secure enrollment, course progress, final exam completion, and certificate delivery.",
    certificateIssuerLine: "Virginia Driver Improvement Course Platform",
    approvalStatusLabel: "Virginia DMV review in progress",
    approvalStatusLabelEs: "Revision del DMV de Virginia en curso",
    disclosuresIntro:
      "Review this Virginia course information, student responsibilities, and course controls before purchasing, enrolling, or relying on completion for court, employer, insurance, or DMV purposes.",
    disclosuresIntroEs:
      "Revisa la informacion del curso de Virginia, las responsabilidades del estudiante y los controles del curso antes de comprar, inscribirte o depender de la finalizacion para tribunal, empleador, seguro o DMV.",
    disclosures: [
      {
        title: "Submission status",
        body:
          "The Virginia provider submission has been filed and remains under review by Virginia DMV. Students should review course information carefully and confirm acceptance for their specific requirement before enrolling or relying on completion.",
      },
      {
        title: "Provider contact information",
        body:
          "Before enrolling, students can review the Virginia Driver Improvement Course name, the primary Virginia telephone number, and other required provider contact details on the course information and support pages.",
      },
      {
        title: "Court and eligibility responsibility",
        body:
          "Students are responsible for confirming that an online Virginia driver improvement course is acceptable for their specific court, employer, insurance, or DMV requirement before enrolling.",
      },
      {
        title: "Technology and independent use",
        body:
          "To benefit from the course, students must be able to work independently and be comfortable using a computer.",
      },
      {
        title: "Online-only administration",
        body:
          "The online driver improvement course and final test must be completed online through the provider portal. No paper test is permitted.",
      },
      {
        title: "Course timing expectations",
        body:
          "The online driver improvement clinic course is an eight-hour course, including the final test, and it must be completed in its entirety before a certificate of completion is issued. In this course, the final exam unlocks after at least seven hours of instruction and the certificate stays locked until the full eight-hour minimum is complete.",
      },
      {
        title: "Course completion window",
        body:
          "Students should plan to complete the course within 90 days of purchase. A court order or other outside requirement may impose an earlier deadline, and students remain responsible for meeting that deadline.",
      },
      {
        title: "Identity verification",
        body:
          "Identity verification is required throughout the course and before the final exam. A student who cannot complete identity validation may be prevented from finishing the course.",
      },
      {
        title: "Final exam attempts",
        body:
          "The final exam can be taken only once per business day. Students should be prepared to complete the exam personally and remain on the exam page throughout the attempt.",
      },
      {
        title: "Safe driving points",
        body:
          "Voluntary clinic completion may earn five safe driving points only once every 24 months. If attendance is court required, the court determines whether safe driving points are awarded, and the required court documentation must be provided before DMV can award those points.",
      },
      {
        title: "Certificate delivery timing",
        body:
          "The certificate of completion is electronically transmitted to successful students within 24 hours of course completion.",
      },
      {
        title: "Accepted proof of completion",
        body:
          "The DMV standardized Online Driver Improvement Clinic Certificate of Completion (DIC 552B) is the only document accepted by Virginia DMV and the courts as proof of completion of an online driver improvement clinic.",
      },
      {
        title: "Printed certificate requirements",
        body:
          "If the certificate is presented to DMV, it must be printed on 8.5 x 11-inch plain white bond paper. DMV does not accept certificates printed on colored or specially designed paper, paper with advertising, or certificates altered in any way.",
      },
      {
        title: "DMV comments or concerns",
        body:
          "DMV is committed to promoting transportation safety through the certification of quality driver training programs. If students have comments or concerns about this course, they may call DMV at (1-877-885-5790).",
      },
      {
        title: "DMV operating certificate display",
        body:
          "After Virginia DMV issues the online clinic operating certificate, a copy of that DMV certificate will be displayed during the validation and sign-in process as required.",
      },
      {
        title: "Support and record review",
        body:
          "Students should keep account details accurate and contact support promptly if they experience purchase, access, identity, exam, or certificate issues.",
      },
    ],
    disclosuresEs: [
      {
        title: "Estado de la presentacion",
        body:
          "La solicitud del proveedor de Virginia se presento y sigue en revision del DMV de Virginia. Los estudiantes deben revisar la informacion del curso y confirmar la aceptacion para su requisito especifico antes de inscribirse o depender de la finalizacion.",
      },
      {
        title: "Informacion de contacto del proveedor",
        body:
          "Antes de inscribirse, los estudiantes pueden revisar el nombre del curso, el telefono principal de Virginia y otros datos de contacto requeridos en las paginas de informacion y soporte.",
      },
      {
        title: "Responsabilidad de tribunal y elegibilidad",
        body:
          "Los estudiantes son responsables de confirmar que un curso en linea de mejoramiento para conductores de Virginia sea aceptable para su requisito especifico de tribunal, empleador, seguro o DMV antes de inscribirse.",
      },
      {
        title: "Tecnologia y uso independiente",
        body:
          "Para beneficiarse del curso, el estudiante debe poder trabajar de forma independiente y sentirse comodo usando una computadora.",
      },
      {
        title: "Administracion solo en linea",
        body:
          "El curso y el examen final deben completarse en linea a traves del portal del proveedor. No se permite examen en papel.",
      },
      {
        title: "Expectativas de tiempo del curso",
        body:
          "El curso clinico de mejoramiento para conductores en linea es de ocho horas, incluido el examen final, y debe completarse en su totalidad antes de emitir el certificado. En este curso, el examen final se desbloquea despues de al menos siete horas de instruccion y el certificado permanece bloqueado hasta completar las ocho horas.",
      },
      {
        title: "Plazo de finalizacion del curso",
        body:
          "Los estudiantes deben planear completar el curso dentro de 90 dias de la compra. Una orden judicial u otro requisito externo puede imponer una fecha limite mas temprana, y el estudiante sigue siendo responsable de cumplirla.",
      },
      {
        title: "Verificacion de identidad",
        body:
          "La verificacion de identidad se requiere durante el curso y antes del examen final. Un estudiante que no pueda completar la validacion puede quedar impedido de terminar el curso.",
      },
      {
        title: "Intentos del examen final",
        body:
          "El examen final solo puede tomarse una vez por dia habil. El estudiante debe estar preparado para completar el examen personalmente y permanecer en la pagina durante el intento.",
      },
      {
        title: "Puntos de manejo seguro",
        body:
          "La finalizacion voluntaria puede otorgar cinco puntos de manejo seguro solo una vez cada 24 meses. Si la asistencia es ordenada por tribunal, el tribunal determina si se otorgan puntos, y la documentacion requerida debe proporcionarse antes de que el DMV pueda otorgarlos.",
      },
      {
        title: "Tiempo de envio del certificado",
        body:
          "El certificado de finalizacion se transmite electronicamente a los estudiantes aprobados dentro de las 24 horas posteriores a la finalizacion del curso.",
      },
      {
        title: "Prueba de finalizacion aceptada",
        body:
          "El Certificado estandarizado de finalizacion del DMV (DIC 552B) es el unico documento aceptado por el DMV de Virginia y los tribunales como prueba de finalizacion de un curso clinico en linea.",
      },
      {
        title: "Requisitos de impresion del certificado",
        body:
          "Si se presenta el certificado al DMV, debe imprimirse en papel bond blanco de 8.5 x 11. El DMV no acepta certificados impresos en papel de color o con diseno especial, con publicidad o alterados.",
      },
      {
        title: "Comentarios o inquietudes para el DMV",
        body:
          "Si los estudiantes tienen comentarios o inquietudes sobre este curso, pueden llamar al DMV al (1-877-885-5790).",
      },
      {
        title: "Exhibicion del certificado operativo del DMV",
        body:
          "Despues de que el DMV de Virginia emita el certificado operativo de la clinica en linea, se mostrara una copia durante la validacion y el inicio de sesion, segun se requiera.",
      },
      {
        title: "Soporte y revision de registros",
        body:
          "Los estudiantes deben mantener su informacion de cuenta actualizada y contactar soporte si tienen problemas de compra, acceso, identidad, examen o certificado.",
      },
    ],
    dashboardLabel: "Dashboard",
    courseLabel: "Course",
    certificateLabel: "Certificate",
    finalExamLabel: "Final Exam",
    passingScorePercent: 80,
    finalExamQuestionCount: 50,
    logoSrc: "/logo.svg",
    supportEmail: "admin@nationaldriverimprovement.com",
    supportPhone: "7035740146",
    supportPhoneDisplay: "(703) 574-0146",
    secondarySupportPhone: "8777980235",
    secondarySupportPhoneDisplay: "(877) 798-0235",
    courseTracks: [
      {
        code: "va-driver-improvement",
        name: "Virginia Driver Improvement Course",
        audience: "General Virginia driver improvement students",
        status: "submitted",
        notes: "Virginia packet has been submitted and is awaiting DMV review.",
      },
    ],
  },
  florida: {
    stateCode: "FL",
    stateSlug: "florida",
    stateName: "Florida",
    enrollmentOpen: false,
    courseSlug: "driver-improvement",
    siteTitle: "Florida Driver Improvement Courses",
    brandName: "Florida Driver Improvement Courses",
    courseName: "Florida Driver Improvement Courses",
    marketingHeadline: "Florida driver improvement courses coming soon.",
    marketingDescription:
      "Florida driver improvement course information for BDI, ADI, TLSAE, and Mature Driver courses, with details added as each course opens.",
    certificateIssuerLine: "Florida Driver Improvement Course Platform",
    approvalStatusLabel: "Florida courses coming soon",
    disclosuresIntro:
      "Review the current Florida course information here. Enrollment will open after each Florida course becomes available.",
    disclosures: [
      {
        title: "Florida course availability",
        body:
          "Florida courses are not open for enrollment yet. As each course becomes available, this page will show pricing, timing, and certificate details.",
      },
      {
        title: "Florida course types",
        body:
          "Florida courses are organized by course type so you can review the right information for BDI, ADI, TLSAE, and Mature Driver courses.",
      },
      {
        title: "State-specific acceptance",
        body:
          "Florida acceptance, reporting, certificate, and completion rules will be listed with each course before enrollment opens.",
      },
    ],
    dashboardLabel: "Dashboard",
    courseLabel: "Course",
    certificateLabel: "Certificate",
    finalExamLabel: "Final Exam",
    passingScorePercent: 80,
    finalExamQuestionCount: 50,
    logoSrc: "/logo.svg",
    supportEmail: "admin@nationaldriverimprovement.com",
    supportPhone: "7035740146",
    supportPhoneDisplay: "(703) 574-0146",
    courseTracks: [
      {
        code: "fl-bdi",
        name: "Basic Driver Improvement (BDI)",
        audience: "General Florida driver improvement students",
        status: "in-build",
        notes: "First Florida build target. BDI packet assembly is now in progress from the Florida forms received on March 31, 2026.",
      },
      {
        code: "fl-adi",
        name: "Advanced Driver Improvement (ADI)",
        audience: "Florida advanced/remedial driver improvement students",
        status: "criteria-received",
        notes: "Forms are in hand. ADI packet should follow after BDI packet assembly is stable.",
      },
      {
        code: "fl-tlsae",
        name: "Traffic Law and Substance Abuse Education (TLSAE)",
        audience: "First-time Florida licensing and certain hardship reinstatement students",
        status: "criteria-received",
        notes: "Forms are in hand. TLSAE packet should follow after BDI and ADI packet work.",
      },
      {
        code: "fl-mature-driver",
        name: "Mature Driver Discount Insurance Course",
        audience: "Florida mature-driver insurance discount students",
        status: "criteria-received",
        notes: "Senior Driver technology packet was received and can be built after BDI, ADI, and TLSAE.",
      },
    ],
  },
  california: {
    stateCode: "CA",
    stateSlug: "california",
    stateName: "California",
    enrollmentOpen: false,
    courseSlug: "traffic-violator-school",
    siteTitle: "California Traffic Violator School",
    brandName: "California Traffic Violator School",
    courseName: "California Traffic Violator School",
    marketingHeadline: "Prepare a California traffic violator school offering.",
    marketingDescription:
      "California traffic violator school provider planning workspace with prep-only public pages, packet organization, and occupational licensing readiness.",
    certificateIssuerLine: "California Traffic Violator School Platform",
    approvalStatusLabel: "California Occupational Licensing portal start required",
    disclosuresIntro:
      "California-specific licensing, curriculum approval, and launch details are still being prepared. Enrollment will remain closed until the California DMV path is completed.",
    disclosures: [
      {
        title: "California development status",
        body:
          "California public enrollment is not open. The first California step is TVS name approval, followed by owner, operator, instructor, bond, and curriculum approval work.",
      },
      {
        title: "Occupational licensing structure",
        body:
          "California traffic violator school licensing is an occupational licensing program that requires more than a public course website, including licensing, property or office documentation, and course approval steps.",
      },
      {
        title: "State-specific launch timing",
        body:
          "California launch timing depends on DMV name approval, licensing, bond, fingerprinting, and curriculum review requirements. No California student should rely on this platform for course completion until launch is formally opened.",
      },
    ],
    dashboardLabel: "Dashboard",
    courseLabel: "Course",
    certificateLabel: "Certificate",
    finalExamLabel: "Final Exam",
    passingScorePercent: 80,
    finalExamQuestionCount: 50,
    logoSrc: "/logo.svg",
    supportEmail: "admin@nationaldriverimprovement.com",
    supportPhone: "7035740146",
    supportPhoneDisplay: "(703) 574-0146",
    courseTracks: [
      {
        code: "ca-tvs",
        name: "California Traffic Violator School",
        audience: "California court-ordered traffic school students",
        status: "in-build",
        notes:
          "California DMV occupational licensing indicated the current first step is the online portal workflow for the school name and owner path before deeper owner, operator, instructor, and curriculum work.",
      },
    ],
  },
}

export function getCourseConfig(state: string): StateCourseConfig {
  const normalizedState = state.toLowerCase()

  return (
    COURSE_CONFIGS[normalizedState] ?? {
      stateCode: normalizedState.slice(0, 2).toUpperCase(),
      stateSlug: normalizedState,
      stateName:
        normalizedState.charAt(0).toUpperCase() + normalizedState.slice(1),
      enrollmentOpen: false,
      courseSlug: "driver-improvement",
      siteTitle: `${
        normalizedState.charAt(0).toUpperCase() + normalizedState.slice(1)
      } Driver Improvement Course`,
      brandName: `${
        normalizedState.charAt(0).toUpperCase() + normalizedState.slice(1)
      } Driver Improvement Course`,
      courseName: `${
        normalizedState.charAt(0).toUpperCase() + normalizedState.slice(1)
      } Driver Improvement Course`,
      marketingHeadline: `Complete your ${normalizedState} driver improvement course online.`,
      marketingDescription:
        "Online driver improvement course with secure enrollment, course progress, final exam completion, and certificate delivery.",
      certificateIssuerLine: `${
        normalizedState.charAt(0).toUpperCase() + normalizedState.slice(1)
      } Driver Improvement Course Platform`,
      approvalStatusLabel: "Approval status varies by state",
      disclosuresIntro:
        "Review the course disclosures for this state before purchasing or enrolling.",
      disclosures: [
        {
          title: "State approval and eligibility",
          body:
            "Course approval, court acceptance, and reporting requirements vary by state. Students are responsible for confirming eligibility and acceptance before enrolling.",
        },
        {
          title: "Identity and completion controls",
          body:
            "Online driver improvement courses may require identity verification, seat-time tracking, and exam controls before a certificate can be issued.",
        },
      ],
      dashboardLabel: "Dashboard",
      courseLabel: "Course",
      certificateLabel: "Certificate",
      finalExamLabel: "Final Exam",
      passingScorePercent: 80,
      finalExamQuestionCount: 50,
      logoSrc: "/logo.svg",
    supportEmail: "admin@nationaldriverimprovement.com",
      supportPhone: "",
      supportPhoneDisplay: "",
    }
  )
}

export function getStateBasePath(state: string) {
  return `/${state.toLowerCase()}`
}

export function getStateRoute(state: string, path = "") {
  const cleanState = state.toLowerCase()
  const cleanPath = path.startsWith("/") ? path : `/${path}`
  return path ? `/${cleanState}${cleanPath}` : `/${cleanState}`
}

export function getLessonSlug(lessonNumber: number) {
  return `lesson-${lessonNumber}`
}

export function getLessonRoute(state: string, lessonNumber: number) {
  return getStateRoute(state, `course/${getLessonSlug(lessonNumber)}`)
}

export function getFinalExamRoute(state: string) {
  return getStateRoute(state, "course/final-exam")
}

export function getCertificateRoute(state: string) {
  return getStateRoute(state, "certificate")
}

export function getDashboardRoute(state: string) {
  return getStateRoute(state, "dashboard")
}

export function getCourseRoute(state: string) {
  return getStateRoute(state, "course")
}

export function getDisclosuresRoute(state: string) {
  return getStateRoute(state, "disclosures")
}

export function getPrivacyRoute(state: string) {
  return getStateRoute(state, "privacy")
}

export function getTermsRoute(state: string) {
  return getStateRoute(state, "terms")
}

export function getContactRoute(state: string) {
  return getStateRoute(state, "contact")
}

export function getRefundsRoute(state: string) {
  return getStateRoute(state, "refunds")
}

export function getFaqRoute(state: string) {
  return getStateRoute(state, "faq")
}

export function getSupportRoute(state: string) {
  return getStateRoute(state, "support")
}

export function getLessonLinks(state: string, lessonCount = 8): LessonLink[] {
  return Array.from({ length: lessonCount }, (_, index) => ({
    id: index + 1,
    title: `Lesson ${index + 1}`,
    href: getLessonRoute(state, index + 1),
  }))
}
