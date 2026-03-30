import type { SiteLanguage } from "@/lib/site-language"

type SupportFaqEntry = {
  id: string
  question: {
    en: string
    es: string
  }
  answer: {
    en: string
    es: string
  }
  keywords: string[]
}

const SUPPORT_FAQ_ENTRIES: SupportFaqEntry[] = [
  {
    id: "refund-policy",
    question: {
      en: "Can I get a refund?",
      es: "Puedo recibir un reembolso?",
    },
    answer: {
      en: "Refund requests are reviewed under the course refund policy. Refunds may be reviewed before meaningful course use, but purchases are generally not refundable after substantial course progress, final exam access, certificate issuance, or mailed-certificate fulfillment has begun. Priority-support upgrades are generally not refundable after purchase.",
      es: "Las solicitudes de reembolso se revisan segun la politica de reembolsos del curso. Los reembolsos pueden revisarse antes de un uso significativo del curso, pero por lo general no son reembolsables una vez que ha comenzado un progreso sustancial del curso, el acceso al examen final, la emision del certificado o el envio fisico del certificado. Las mejoras a soporte prioritario por lo general no son reembolsables despues de la compra.",
    },
    keywords: ["refund", "money back", "want my money back", "can i get a refund", "refund policy"],
  },
  {
    id: "real-person",
    question: {
      en: "Can I talk to a real person?",
      es: "Puedo hablar con una persona real?",
    },
    answer: {
      en: "Yes. Human support is available through the support page after AI help has been tried first. Priority support includes back-and-forth human replies and is handled first, usually in less than 1 business day. Standard support requests stay in the support inbox and may take up to 3 business days for a first human response.",
      es: "Si. El soporte humano esta disponible a traves de la pagina de soporte despues de intentar primero la ayuda de IA. El soporte prioritario incluye respuestas humanas de ida y vuelta y se atiende primero, normalmente en menos de 1 dia habil. Las solicitudes de soporte estandar permanecen en la bandeja de soporte y pueden tardar hasta 3 dias habiles en recibir una primera respuesta humana.",
    },
    keywords: ["real person", "talk to a person", "human support", "talk to someone", "speak to someone"],
  },
  {
    id: "approved",
    question: {
      en: "Is this course approved?",
      es: "Este curso esta aprobado?",
    },
    answer: {
      en: "Approval and acceptance depend on the state and the student's specific requirement. Review the disclosures carefully and confirm acceptance before purchasing or relying on completion.",
      es: "La aprobacion y la aceptacion dependen del estado y de la necesidad especifica del estudiante. Revisa la informacion del curso y confirma la aceptacion antes de comprar o depender de la finalizacion.",
    },
    keywords: ["approved course", "is this course approved", "course approved"],
  },
  {
    id: "finish-requirements",
    question: {
      en: "What do I need before I can finish the course?",
      es: "Que necesito antes de terminar el curso?",
    },
    answer: {
      en: "Students generally need course access, required seat time, identity verification, and a passing final exam result before a certificate becomes available.",
      es: "Por lo general, los estudiantes necesitan acceso al curso, el tiempo requerido, verificacion de identidad y un resultado aprobatorio en el examen final antes de que el certificado este disponible.",
    },
    keywords: ["finish the course", "complete the course", "finish class requirements"],
  },
  {
    id: "identity-why",
    question: {
      en: "Why do I have to verify my identity?",
      es: "Por que tengo que verificar mi identidad?",
    },
    answer: {
      en: "Identity verification helps confirm that the person completing the course and taking the final exam is the enrolled student. It is also part of the course controls used to protect certificate integrity and completion records.",
      es: "La verificacion de identidad ayuda a confirmar que la persona que esta completando el curso y tomando el examen final es el estudiante inscrito. Tambien forma parte de los controles del curso para proteger la integridad del certificado y de los registros de finalizacion.",
    },
    keywords: ["verify my identity", "why identity", "identity verification"],
  },
  {
    id: "lesson-quizzes",
    question: {
      en: "Do I have to take the lesson quizzes?",
      es: "Tengo que hacer las evaluaciones de cada leccion?",
    },
    answer: {
      en: "The lesson knowledge checks are there to reinforce learning. They help you review the material, but they do not replace the course final exam.",
      es: "Las evaluaciones de conocimiento de cada leccion son para reforzar el aprendizaje. Ayudan a repasar el material, pero no reemplazan el examen final del curso.",
    },
    keywords: ["lesson quizzes", "take the quiz", "do i have to take the quiz", "knowledge check"],
  },
  {
    id: "quiz-score",
    question: {
      en: "Do my quiz scores count in my final grade?",
      es: "Mis puntajes de las evaluaciones cuentan para mi calificacion final?",
    },
    answer: {
      en: "No. Lesson quiz scores do not change your final exam result and do not replace the course requirements needed to earn a certificate.",
      es: "No. Las evaluaciones de las lecciones no cambian el resultado del examen final ni sustituyen los requisitos del curso para obtener el certificado.",
    },
    keywords: ["quiz scores count", "do quizzes count", "final grade", "graded quiz"],
  },
  {
    id: "final-right-away",
    question: {
      en: "Can I take the final exam right away?",
      es: "Puedo tomar el examen final de inmediato?",
    },
    answer: {
      en: "No. You must complete all required lessons, at least 7 hours of course instruction, and identity verification before the final exam can be started.",
      es: "No. Debes completar todas las lecciones requeridas, al menos 7 horas de instruccion del curso y la verificacion de identidad antes de comenzar el examen final.",
    },
    keywords: ["take the final right away", "final exam right away", "can i take the final now"],
  },
  {
    id: "eight-hours",
    question: {
      en: "Does the 8 hours include the final exam?",
      es: "Las 8 horas incluyen el examen final?",
    },
    answer: {
      en: "Yes. The final exam is included in the overall 8-hour minimum. In this course, the final exam unlocks after at least 7 hours of instruction, but the certificate stays locked until the full 8 hours is complete.",
      es: "Si. El examen final forma parte del minimo total de 8 horas. En este curso, el examen final se habilita despues de al menos 7 horas de instruccion, pero el certificado permanece bloqueado hasta completar el minimo total de 8 horas.",
    },
    keywords: ["8 hours", "does the 8 hours include the final", "eight hours include final"],
  },
  {
    id: "time-per-page",
    question: {
      en: "Do I have to spend a certain amount of time on each page?",
      es: "Tengo que pasar cierta cantidad de tiempo en cada pagina?",
    },
    answer: {
      en: "No. There is not a fixed minimum required time for each individual page. Your course time is tracked across active participation in the course, and you still need to complete the required lessons, reach at least 7 hours before the final exam unlocks, and complete the full 8 hours before your certificate can unlock.",
      es: "No. No hay un tiempo minimo fijo requerido para cada pagina individual. El tiempo del curso se registra segun tu participacion activa en el curso, y aun debes completar las lecciones requeridas, alcanzar al menos 7 horas antes de que se habilite el examen final y completar las 8 horas totales antes de que se habilite tu certificado.",
    },
    keywords: [
      "certain amount of time on each page",
      "time on each page",
      "time per page",
      "every page",
      "do i have to spend time on each page",
      "fixed time on each page",
    ],
  },
  {
    id: "passing-score",
    question: {
      en: "What score do I need on the final exam?",
      es: "Que puntuacion necesito en el examen final?",
    },
    answer: {
      en: "The final exam requires a passing score of 80% before the course can be completed and the certificate can unlock.",
      es: "El examen final requiere una puntuacion aprobatoria de 80% para completar el curso y desbloquear el certificado.",
    },
    keywords: ["passing score", "score do i need", "pass the final", "what score to pass"],
  },
  {
    id: "fail-final",
    question: {
      en: "What happens if I fail the final exam?",
      es: "Que pasa si no apruebo el examen final?",
    },
    answer: {
      en: "If you do not pass, the exam page shows your result, an earliest return time for another attempt, and suggested lessons to review before you try again.",
      es: "Si no apruebas, la pagina del examen muestra tu resultado, una hora estimada para volver a intentarlo y sugerencias sobre que lecciones repasar antes del siguiente intento.",
    },
    keywords: ["fail the final", "failed final", "what happens if i fail", "did not pass"],
  },
  {
    id: "credit-without-pass",
    question: {
      en: "Can I get credit if I do not pass the final exam?",
      es: "Puedo recibir credito si no apruebo el examen final?",
    },
    answer: {
      en: "No. The certificate does not unlock and the course is not considered complete until you pass the final exam and meet the other course requirements.",
      es: "No. El certificado no se habilita y el curso no se considera completado hasta que apruebes el examen final y cumplas los demas requisitos del curso.",
    },
    keywords: ["credit without passing", "credit if i fail", "get credit if i do not pass"],
  },
  {
    id: "read-pages",
    question: {
      en: "Do I have to read all the course pages?",
      es: "Tengo que leer todas las paginas del curso?",
    },
    answer: {
      en: "You need to complete the course flow, including required timing and progress controls, before the final exam and certificate become available.",
      es: "Debes completar el flujo del curso, incluidos los controles de tiempo y progreso requeridos, antes de que el examen final y el certificado esten disponibles.",
    },
    keywords: ["read all the pages", "skip pages", "skip lessons", "complete all lessons"],
  },
  {
    id: "certificate-how",
    question: {
      en: "How do I get my certificate?",
      es: "Como obtengo mi certificado?",
    },
    answer: {
      en: "Once course requirements are complete and the final exam is passed, the certificate page unlocks so the student can view, download, print, and verify the certificate.",
      es: "Una vez completados los requisitos del curso y aprobado el examen final, la pagina del certificado se habilita para verlo, descargarlo, imprimirlo y verificarlo.",
    },
    keywords: ["get my certificate", "how do i get certificate", "certificate page"],
  },
  {
    id: "dmv-certificate",
    question: {
      en: "Will my certificate be sent automatically to DMV?",
      es: "Se enviara mi certificado automaticamente al DMV?",
    },
    answer: {
      en: "Your certificate page unlocks after successful completion. DMV reporting is handled separately from the student certificate, and you should follow any additional court, employer, or insurance instructions that apply to your situation.",
      es: "Tu pagina de certificado se habilita despues de completar el curso. La entrega de registros al DMV se maneja por separado del certificado del estudiante, y debes seguir cualquier instruccion adicional de la corte, el empleador o el seguro cuando corresponda.",
    },
    keywords: ["sent to dmv automatically", "certificate sent to dmv", "do you send to dmv", "dmv report"],
  },
  {
    id: "after-finish",
    question: {
      en: "What do I need to do after I finish the class?",
      es: "Que tengo que hacer despues de terminar la clase?",
    },
    answer: {
      en: "After you complete the course, pass the final exam, open your certificate page and save a copy for your records. If your court, employer, or insurance company needs anything else from you, follow their instructions.",
      es: "Despues de completar el curso, aprueba el examen final, abre tu pagina de certificado y guarda una copia para tus registros. Si tu corte, empleador o compania de seguros necesita documentacion adicional de tu parte, sigue sus instrucciones.",
    },
    keywords: ["after i finish", "after i finish class", "what next after i finish", "finished the class"],
  },
  {
    id: "payment-access-certificate-issue",
    question: {
      en: "What if I have an issue with payment, access, or my certificate?",
      es: "Que pasa si tengo un problema con el pago, el acceso o mi certificado?",
    },
    answer: {
      en: "Use the support page after signing in for help with payment, access, certificate, or course-related issues.",
      es: "Usa la pagina de soporte despues de iniciar sesion para recibir ayuda con pagos, acceso, certificado o problemas del curso.",
    },
    keywords: ["payment issue", "access issue", "certificate issue"],
  },
  {
    id: "support-difference",
    question: {
      en: "What is the difference between standard and priority support?",
      es: "Cual es la diferencia entre el soporte estandar y el prioritario?",
    },
    answer: {
      en: "Both plans include AI help first. Priority support means your questions and support requests are handled ahead of standard requests and usually receive a first response in less than 1 business day. Standard requests may take up to 3 business days for a first response.",
      es: "Ambos planes incluyen ayuda inicial por IA. El soporte prioritario hace que tus preguntas y solicitudes se atiendan antes que las solicitudes estandar y normalmente reciban una primera respuesta en menos de 1 dia habil. Las solicitudes estandar pueden tardar hasta 3 dias habiles en recibir una primera respuesta.",
    },
    keywords: ["difference between standard and priority", "priority support", "standard support"],
  },
  {
    id: "exam-locked",
    question: {
      en: "Why is my final exam locked?",
      es: "Por que esta bloqueado mi examen final?",
    },
    answer: {
      en: "The final exam stays locked until you complete the required lessons, satisfy the course seat time, and finish the required identity verification steps.",
      es: "El examen final permanece bloqueado hasta que completes las lecciones requeridas, cumplas el tiempo del curso y termines la verificacion de identidad necesaria.",
    },
    keywords: ["exam locked", "final exam locked", "why is my exam locked", "why is the exam locked"],
  },
  {
    id: "certificate-locked",
    question: {
      en: "Why is my certificate locked?",
      es: "Por que esta bloqueado mi certificado?",
    },
    answer: {
      en: "Your certificate becomes available only after required seat time is complete and you have passed the final exam.",
      es: "El certificado solo se habilita cuando completas el tiempo requerido del curso y apruebas el examen final.",
    },
    keywords: ["certificate locked", "why is my certificate locked"],
  },
  {
    id: "timer-not-done",
    question: {
      en: "Why is my course timer not done yet?",
      es: "Por que mi temporizador del curso aun no termina?",
    },
    answer: {
      en: "Course time is tracked based on your activity. Keep progressing through lessons and remain active on the course pages until the required time is completed.",
      es: "El tiempo del curso se registra segun tu actividad. Sigue avanzando por las lecciones y permanece activo en las paginas del curso hasta completar el tiempo requerido.",
    },
    keywords: ["timer not done", "course timer", "seat time", "time not moving"],
  },
]

export function getSupportFaqEntries(language: SiteLanguage) {
  return SUPPORT_FAQ_ENTRIES.map((entry) => ({
    id: entry.id,
    question: entry.question[language],
    answer: entry.answer[language],
  }))
}

export function findSupportFaqMatch(text: string, language: SiteLanguage = "en") {
  const normalized = String(text ?? "").trim().toLowerCase()

  if (!normalized) {
    return null
  }

  const entry = SUPPORT_FAQ_ENTRIES.find((item) =>
    item.keywords.some((keyword) => normalized.includes(keyword.toLowerCase()))
  )

  if (!entry) {
    return null
  }

  return {
    id: entry.id,
    question: entry.question[language],
    answer: entry.answer[language],
  }
}
