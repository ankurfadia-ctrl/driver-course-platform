import Link from "next/link"
import {
  getCourseConfig,
  getDisclosuresRoute,
  getSupportRoute,
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
            question: "Puedo tomar el examen final de inmediato?",
            answer:
              "Normalmente no. El flujo del curso puede requerir completar el tiempo del curso y la verificacion de identidad antes de comenzar el examen final.",
          },
          {
            question: "Como obtengo mi certificado?",
            answer:
              "Una vez completados los requisitos del curso y aprobado el examen final, la pagina del certificado se habilita para verlo, descargarlo, imprimirlo y verificarlo.",
          },
          {
            question: "Que pasa si tengo un problema con el pago, el acceso o mi certificado?",
            answer:
              "Usa la pagina de soporte despues de iniciar sesion para recibir ayuda con pagos, acceso, certificado o problemas del curso.",
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
            question: "Can I take the final exam right away?",
            answer:
              "Not usually. The course flow may require seat-time completion and identity verification before the final exam can be started.",
          },
          {
            question: "How do I get my certificate?",
            answer:
              "Once course requirements are complete and the final exam is passed, the certificate page unlocks so the student can view, download, print, and verify the certificate.",
          },
          {
            question: "What if I have an issue with payment, access, or my certificate?",
            answer:
              "Use the support page after signing in for help with payment, access, certificate, or course-related issues.",
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
            "Revisa la pagina de informacion del curso o empieza con la pagina de soporte si necesitas ayuda para decidir si este curso es apropiado para tu situacion.",
          infoCta: "Leer informacion del curso",
          supportCta: "Abrir soporte",
        }
      : {
          label: "FAQ",
          title: `${config.stateName} course questions and answers`,
          intro:
            "This page provides general answers to common student questions before enrollment, during the course, and after completion.",
          moreInfo: "Need more information?",
          moreInfoBody:
            "Review the course information page or start with the support page if you need help deciding whether this course is appropriate for your situation.",
          infoCta: "Read Course Information",
          supportCta: "Open Support",
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
          <Link
            href={getSupportRoute(state)}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            {copy.supportCta}
          </Link>
        </div>
      </section>
    </div>
  )
}
