import Link from "next/link"
import {
  getCourseConfig,
  getDisclosuresRoute,
} from "@/lib/course-config"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

export default async function StateFaqPage({
  params,
}: {
  params: Promise<{ state: string }>
}) {
  const { state } = await params
  const config = getCourseConfig(state)
  const language = await getPreferredSiteLanguage()

  const faqs =
    language === "es"
      ? [
          {
            question: "Este curso esta aprobado?",
            answer:
              "La aprobacion y la aceptacion dependen del estado y de la necesidad especifica del estudiante. Revisa la informacion del curso y confirma la aceptacion antes de comprar o depender de la finalizacion.",
          },
          {
            question: "Que necesito antes de terminar el curso?",
            answer:
              "Por lo general, los estudiantes necesitan acceso al curso, el tiempo requerido, verificacion de identidad y un resultado aprobatorio en el examen final antes de que el certificado este disponible.",
          },
          {
            question: "Por que tengo que verificar mi identidad?",
            answer:
              "La verificacion de identidad ayuda a confirmar que la persona que esta completando el curso y tomando el examen final es el estudiante inscrito. Tambien forma parte de los controles del curso para proteger la integridad del certificado y de los registros de finalizacion.",
          },
          {
            question: "Tengo que hacer las evaluaciones de cada leccion?",
            answer:
              "Las evaluaciones de conocimiento de cada leccion son para reforzar el aprendizaje. Ayudan a repasar el material, pero no reemplazan el examen final del curso.",
          },
          {
            question: "Mis puntajes de las evaluaciones cuentan para mi calificacion final?",
            answer:
              "No. Las evaluaciones de las lecciones no cambian el resultado del examen final ni sustituyen los requisitos del curso para obtener el certificado.",
          },
          {
            question: "Puedo tomar el examen final de inmediato?",
            answer:
              "No. Debes completar las 8 horas requeridas del curso y la verificacion de identidad antes de comenzar el examen final.",
          },
          {
            question: "Las 8 horas incluyen el examen final?",
            answer:
              "No. En este curso, las 8 horas requeridas deben completarse antes de que el examen final se habilite.",
          },
          {
            question: "Que puntuacion necesito en el examen final?",
            answer:
              "El examen final requiere una puntuacion aprobatoria de 80% para completar el curso y desbloquear el certificado.",
          },
          {
            question: "Que pasa si no apruebo el examen final?",
            answer:
              "Si no apruebas, la pagina del examen muestra tu resultado, una hora estimada para volver a intentarlo y sugerencias sobre que lecciones repasar antes del siguiente intento.",
          },
          {
            question: "Puedo recibir credito si no apruebo el examen final?",
            answer:
              "No. El certificado no se habilita y el curso no se considera completado hasta que apruebes el examen final y cumplas los demas requisitos del curso.",
          },
          {
            question: "Tengo que leer todas las paginas del curso?",
            answer:
              "Debes completar el flujo del curso, incluidos los controles de tiempo y progreso requeridos, antes de que el examen final y el certificado esten disponibles.",
          },
          {
            question: "Como obtengo mi certificado?",
            answer:
              "Una vez completados los requisitos del curso y aprobado el examen final, la pagina del certificado se habilita para verlo, descargarlo, imprimirlo y verificarlo.",
          },
          {
            question: "Se enviara mi certificado automaticamente al DMV?",
            answer:
              "Tu pagina de certificado se habilita despues de completar el curso. La entrega de registros al DMV se maneja por separado del certificado del estudiante, y debes seguir cualquier instruccion adicional de la corte, el empleador o el seguro cuando corresponda.",
          },
          {
            question: "Que tengo que hacer despues de terminar la clase?",
            answer:
              "Despues de completar el curso, aprueba el examen final, abre tu pagina de certificado y guarda una copia para tus registros. Si tu corte, empleador o compania de seguros necesita documentacion adicional de tu parte, sigue sus instrucciones.",
          },
          {
            question: "Que pasa si tengo un problema con el pago, el acceso o mi certificado?",
            answer:
              "Usa la pagina de soporte despues de iniciar sesion para recibir ayuda con pagos, acceso, certificado o problemas del curso.",
          },
          {
            question: "Por que esta bloqueado mi examen final?",
            answer:
              "El examen final permanece bloqueado hasta que completes las lecciones requeridas, cumplas el tiempo del curso y termines la verificacion de identidad necesaria.",
          },
          {
            question: "Por que esta bloqueado mi certificado?",
            answer:
              "El certificado solo se habilita cuando completas el tiempo requerido del curso y apruebas el examen final.",
          },
          {
            question: "Por que mi temporizador del curso aun no termina?",
            answer:
              "El tiempo del curso se registra segun tu actividad. Sigue avanzando por las lecciones y permanece activo en las paginas del curso hasta completar el tiempo requerido.",
          },
        ]
      : [
          {
            question: "Is this course approved?",
            answer:
              "Approval and acceptance depend on the state and the student's specific requirement. Review the disclosures carefully and confirm acceptance before purchasing or relying on completion.",
          },
          {
            question: "What do I need before I can finish the course?",
            answer:
              "Students generally need course access, required seat time, identity verification, and a passing final exam result before a certificate becomes available.",
          },
          {
            question: "Why do I have to verify my identity?",
            answer:
              "Identity verification helps confirm that the person completing the course and taking the final exam is the enrolled student. It is also part of the course controls used to protect certificate integrity and completion records.",
          },
          {
            question: "Do I have to take the lesson quizzes?",
            answer:
              "The lesson knowledge checks are there to reinforce learning. They help you review the material, but they do not replace the course final exam.",
          },
          {
            question: "Do my quiz scores count in my final grade?",
            answer:
              "No. Lesson quiz scores do not change your final exam result and do not replace the course requirements needed to earn a certificate.",
          },
          {
            question: "Can I take the final exam right away?",
            answer:
              "No. You must complete the required 8 hours of course time and identity verification before the final exam can be started.",
          },
          {
            question: "Does the 8 hours include the final exam?",
            answer:
              "No. In this course, the required 8 hours must be completed before the final exam unlocks.",
          },
          {
            question: "What score do I need on the final exam?",
            answer:
              "The final exam requires a passing score of 80% before the course can be completed and the certificate can unlock.",
          },
          {
            question: "What happens if I fail the final exam?",
            answer:
              "If you do not pass, the exam page shows your result, an earliest return time for another attempt, and suggested lessons to review before you try again.",
          },
          {
            question: "Can I get credit if I do not pass the final exam?",
            answer:
              "No. The certificate does not unlock and the course is not considered complete until you pass the final exam and meet the other course requirements.",
          },
          {
            question: "Do I have to read all the course pages?",
            answer:
              "You need to complete the course flow, including required timing and progress controls, before the final exam and certificate become available.",
          },
          {
            question: "How do I get my certificate?",
            answer:
              "Once course requirements are complete and the final exam is passed, the certificate page unlocks so the student can view, download, print, and verify the certificate.",
          },
          {
            question: "Will my certificate be sent automatically to DMV?",
            answer:
              "Your certificate page unlocks after successful completion. DMV reporting is handled separately from the student certificate, and you should follow any additional court, employer, or insurance instructions that apply to your situation.",
          },
          {
            question: "What do I need to do after I finish the class?",
            answer:
              "After you complete the course, pass the final exam, open your certificate page and save a copy for your records. If your court, employer, or insurance company needs anything else from you, follow their instructions.",
          },
          {
            question: "What if I have an issue with payment, access, or my certificate?",
            answer:
              "Use the support page after signing in for help with payment, access, certificate, or course-related issues.",
          },
          {
            question: "Why is my final exam locked?",
            answer:
              "The final exam stays locked until you complete the required lessons, satisfy the course seat time, and finish the required identity verification steps.",
          },
          {
            question: "Why is my certificate locked?",
            answer:
              "Your certificate becomes available only after required seat time is complete and you have passed the final exam.",
          },
          {
            question: "Why is my course timer not done yet?",
            answer:
              "Course time is tracked based on your activity. Keep progressing through lessons and remain active on the course pages until the required time is completed.",
          },
        ]

  const copy =
    language === "es"
      ? {
          label: "Preguntas",
          title: `Preguntas y respuestas sobre el curso de ${config.stateName}`,
          intro:
            "Esta pagina ofrece respuestas generales a preguntas comunes antes de la inscripcion, durante el curso y despues de completarlo.",
          moreInfo: "Necesitas mas informacion?",
          moreInfoBody:
            "Revisa la pagina de informacion del curso si necesitas mas detalles antes de inscribirte o depender de la finalizacion.",
          infoCta: "Leer informacion del curso",
        }
      : {
          label: "FAQ",
          title: `${config.stateName} course questions and answers`,
          intro:
            "This page provides general answers to common student questions before enrollment, during the course, and after completion.",
          moreInfo: "Need more information?",
          moreInfoBody:
            "Review the course information page if you need more detail before enrolling or relying on completion.",
          infoCta: "Read Course Information",
        }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="glass-panel rounded-[2rem] bg-white p-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          {copy.label}
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">
          {copy.title}
        </h1>
        <p className="mt-4 leading-7 text-slate-700">{copy.intro}</p>
      </section>

      <section className="space-y-4">
        {faqs.map((item) => (
          <article
            key={item.question}
            className="glass-panel rounded-[1.75rem] bg-white p-6"
          >
            <h2 className="text-xl font-semibold text-slate-900">
              {item.question}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">{item.answer}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">{copy.moreInfo}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          {copy.moreInfoBody}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={getDisclosuresRoute(state)}
            className="rounded-xl border border-amber-300 bg-white px-5 py-3 font-semibold text-amber-900 transition hover:bg-amber-100"
          >
            {copy.infoCta}
          </Link>
        </div>
      </section>
    </div>
  )
}
