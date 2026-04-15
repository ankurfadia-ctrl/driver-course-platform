import Link from "next/link"
import { getPreferredSiteLanguage } from "@/lib/site-language-server"

type LinkAction = {
  label: string
  href: string
  note: string
}

type QuickAction = {
  eyebrow: string
  label: string
  href: string
  note: string
  accent: "blue" | "emerald" | "amber" | "sky"
}

type CourseCard = {
  eyebrow: string
  title: string
  summary: string
  priceLine: string
  detail: string
  accent: "blue" | "emerald" | "amber"
  primary: LinkAction
  secondary: LinkAction
}

type FutureCard = {
  label: string
  title: string
  summary: string
}

const quickActionsEn: QuickAction[] = [
  {
    eyebrow: "Virginia",
    label: "Start Virginia course",
    href: "/virginia/checkout",
    note: "Review pricing and start when you're ready.",
    accent: "blue",
  },
  {
    eyebrow: "Virginia",
    label: "Returning student login",
    href: "/virginia/login",
    note: "Sign back in to continue your course and certificate access.",
    accent: "blue",
  },
  {
    eyebrow: "Certificate tools",
    label: "Verify a certificate",
    href: "/verify",
    note: "Enter a verification ID to check a completion certificate.",
    accent: "sky",
  },
  {
    eyebrow: "Parenting",
    label: "Compare parenting courses",
    href: "#parenting-courses",
    note: "Compare the Minnesota and South Dakota options side by side.",
    accent: "emerald",
  },
]

const quickActionsEs: QuickAction[] = [
  {
    eyebrow: "Virginia",
    label: "Iniciar curso de Virginia",
    href: "/virginia/checkout",
    note: "Revisa los precios y comienza cuando estés listo.",
    accent: "blue",
  },
  {
    eyebrow: "Virginia",
    label: "Ingreso de estudiantes",
    href: "/virginia/login",
    note: "Vuelve a entrar para continuar tu curso y el acceso al certificado.",
    accent: "blue",
  },
  {
    eyebrow: "Herramientas de certificado",
    label: "Verificar un certificado",
    href: "/verify",
    note: "Ingresa un ID de verificación para confirmar un certificado.",
    accent: "sky",
  },
  {
    eyebrow: "Cursos para padres",
    label: "Comparar cursos para padres",
    href: "#parenting-courses",
    note: "Compara Minnesota y Dakota del Sur en un solo lugar.",
    accent: "emerald",
  },
]

const featuredCoursesEn: CourseCard[] = [
  {
    eyebrow: "Available now",
    title: "Virginia Driver Improvement Course",
    summary:
      "Self-paced Virginia driver improvement with a simple path from signup to certificate.",
    priceLine: "Starting at $19.99",
    detail:
              "Includes online lessons, progress tracking, a final exam, certificate support, and automatic DMV reporting.",
    accent: "blue",
    primary: {
      label: "Start Virginia course",
      href: "/virginia",
      note: "Go to the live Virginia course home.",
    },
    secondary: {
      label: "View plans and payment",
      href: "/virginia/checkout",
      note: "Review pricing and checkout options.",
    },
  },
  {
    eyebrow: "Opening soon",
    title: "Minnesota Co-Parenting Foundations",
    summary:
      "Online Minnesota parent education with clear pricing, child-centered lessons, and certificate details.",
    priceLine: "Standard tuition $22.95",
    detail:
      "You can review the curriculum, pricing, and certificate details before enrollment opens.",
    accent: "emerald",
    primary: {
      label: "Explore Minnesota course",
      href: "/minnesota-parent-education",
      note: "Read the course overview, curriculum, and certificate details.",
    },
    secondary: {
      label: "See tuition and enrollment",
      href: "/minnesota-parent-education/pricing",
      note: "Review tuition, price-match terms, and fee-relief options.",
    },
  },
  {
    eyebrow: "Opening soon",
    title: "South Dakota Co-Parenting Foundations",
    summary:
      "Low-cost South Dakota parent education with public pricing and a price-match option.",
    priceLine: "Standard tuition $17.95",
    detail:
      "You can review course topics, pricing, and certificate details before enrollment opens.",
    accent: "amber",
    primary: {
      label: "Explore South Dakota course",
      href: "/south-dakota-parenting",
      note: "Open the South Dakota course overview and curriculum.",
    },
    secondary: {
      label: "See pricing and price match",
      href: "/south-dakota-parenting/pricing",
      note: "Review tuition, hardship treatment, and price-match terms.",
    },
  },
]

const featuredCoursesEs: CourseCard[] = [
  {
    eyebrow: "Disponible ahora",
    title: "Curso de Mejoramiento para Conductores de Virginia",
    summary:
      "Mejoramiento de conductores en Virginia a tu ritmo con un camino simple desde registro hasta certificado.",
    priceLine: "Desde $19.99",
    detail:
      "Incluye lecciones en línea, seguimiento de progreso, examen final, soporte de certificado y reporte automático al DMV.",
    accent: "blue",
    primary: {
      label: "Iniciar curso de Virginia",
      href: "/virginia",
      note: "Ir al curso de Virginia.",
    },
    secondary: {
      label: "Ver planes y pago",
      href: "/virginia/checkout",
      note: "Revisa precios y opciones de pago.",
    },
  },
  {
    eyebrow: "Disponible pronto",
    title: "Fundamentos de Coparentalidad de Minnesota",
    summary:
      "Educación para padres de Minnesota con precios claros, lecciones centradas en los hijos y detalles del certificado.",
    priceLine: "Matrícula estándar $22.95",
    detail:
      "Puedes revisar el plan de estudios, precios y detalles del certificado antes de que se abran las inscripciones.",
    accent: "emerald",
    primary: {
      label: "Explorar curso de Minnesota",
      href: "/minnesota-parent-education",
      note: "Revisa el resumen, plan de estudios y certificado.",
    },
    secondary: {
      label: "Ver matrícula e inscripción",
      href: "/minnesota-parent-education/pricing",
      note: "Revisa precios y opciones de ayuda.",
    },
  },
  {
    eyebrow: "Disponible pronto",
    title: "Fundamentos de Coparentalidad de Dakota del Sur",
    summary:
      "Educación para padres de Dakota del Sur con precio accesible y opción de igualación.",
    priceLine: "Matrícula estándar $17.95",
    detail:
      "Puedes revisar temas del curso, precios y detalles del certificado antes de que se abran las inscripciones.",
    accent: "amber",
    primary: {
      label: "Explorar curso de Dakota del Sur",
      href: "/south-dakota-parenting",
      note: "Abre el resumen y el plan de estudios del curso.",
    },
    secondary: {
      label: "Ver precios e igualación",
      href: "/south-dakota-parenting/pricing",
      note: "Revisa matrícula y términos de igualación.",
    },
  },
]

const futureCoursesEn: FutureCard[] = [
  {
    label: "Parent education",
    title: "Florida Parent Education and Family Stabilization",
    summary:
      "Parent education for separation, divorce, and co-parenting in Florida.",
  },
  {
    label: "Driver improvement",
    title: "Florida Basic Driver Improvement",
    summary:
      "Basic Florida driver improvement for court, ticket, and driving-record needs.",
  },
  {
    label: "Boating safety — pending approval",
    title: "State boating safety courses",
    summary:
      "Boating safety courses are in development pending state regulatory approval. We will publish details and enrollment once approvals are confirmed.",
  },
]

const futureCoursesEs: FutureCard[] = [
  {
    label: "Educación para padres",
    title: "Educación para Padres y Estabilización Familiar de Florida",
    summary:
      "Educación para padres sobre separación, divorcio y coparentalidad en Florida.",
  },
  {
    label: "Mejoramiento de conductores",
    title: "Mejoramiento Básico de Conductores de Florida",
    summary:
      "Mejoramiento básico de conductores en Florida para tribunal, multas y registros.",
  },
  {
    label: "Seguridad náutica — pendiente de aprobación",
    title: "Cursos estatales de seguridad náutica",
    summary:
      "Los cursos de seguridad náutica están en desarrollo pendientes de aprobación regulatoria estatal. Publicaremos los detalles e inscripción una vez confirmadas las aprobaciones.",
  },
]

const trustPointsEn = [
  {
    title: "Simple pricing",
    body: "See the price, what is included, and how support works before you sign up.",
  },
  {
            title: "Automatic DMV reporting",
    body: "DMV reporting is handled automatically after successful completion, and your certificate page unlocks for your records.",
  },
  {
    title: "Find the right course fast",
    body: "Browse driver improvement, parenting, and boating options in one place.",
  },
] as const

const trustPointsEs = [
  {
    title: "Precios claros",
    body: "Ve el precio, lo que incluye y cómo funciona el soporte antes de inscribirte.",
  },
  {
    title: "Reporte automático al DMV",
    body: "El reporte al DMV se realiza automáticamente después de completar el curso y tu certificado se desbloquea para tus registros.",
  },
  {
    title: "Encuentra el curso correcto rápido",
    body: "Explora mejoramiento de conductores, cursos para padres y seguridad náutica en un solo lugar.",
  },
] as const

function getCardClasses(accent: CourseCard["accent"]) {
  switch (accent) {
    case "emerald":
      return {
        shell: "border-[#d9efe7] bg-[linear-gradient(180deg,#ffffff_0%,#f4fbf7_100%)]",
        pill: "bg-emerald-50 text-emerald-800",
        button: "bg-emerald-600 hover:bg-emerald-700",
        text: "text-emerald-700",
      }
    case "amber":
      return {
        shell: "border-[#f0e2c6] bg-[linear-gradient(180deg,#ffffff_0%,#fff8ee_100%)]",
        pill: "bg-amber-50 text-amber-900",
        button: "bg-amber-600 hover:bg-amber-700",
        text: "text-amber-700",
      }
    default:
      return {
        shell: "border-[#dbe7ff] bg-[linear-gradient(180deg,#ffffff_0%,#f7faff_100%)]",
        pill: "bg-blue-50 text-blue-800",
        button: "bg-blue-600 hover:bg-blue-700",
        text: "text-blue-700",
      }
  }
}

function getQuickActionClasses(accent: QuickAction["accent"]) {
  switch (accent) {
    case "emerald":
      return {
        shell:
          "border-emerald-200 bg-[linear-gradient(180deg,#f4fbf7_0%,#ffffff_100%)] hover:border-emerald-300 hover:bg-white",
        eyebrow: "text-emerald-700",
      }
    case "amber":
      return {
        shell:
          "border-amber-200 bg-[linear-gradient(180deg,#fff8ee_0%,#ffffff_100%)] hover:border-amber-300 hover:bg-white",
        eyebrow: "text-amber-700",
      }
    case "sky":
      return {
        shell:
          "border-sky-200 bg-[linear-gradient(180deg,#f5fbff_0%,#ffffff_100%)] hover:border-sky-300 hover:bg-white",
        eyebrow: "text-sky-700",
      }
    default:
      return {
        shell:
          "border-blue-200 bg-[linear-gradient(180deg,#f7faff_0%,#ffffff_100%)] hover:border-blue-300 hover:bg-white",
        eyebrow: "text-blue-700",
      }
  }
}

export default async function HomePage() {
  const language = await getPreferredSiteLanguage()
  const isSpanish = language === "es"
  const quickActions = isSpanish ? quickActionsEs : quickActionsEn
  const featuredCourses = isSpanish ? featuredCoursesEs : featuredCoursesEn
  const futureCourses = isSpanish ? futureCoursesEs : futureCoursesEn
  const trustPoints = isSpanish ? trustPointsEs : trustPointsEn
  const copy = isSpanish
    ? {
        heroLabel: "Portal Nacional de Cursos",
        heroTitle: "Encuentra el curso que necesitas y empieza más rápido.",
        heroIntro:
          "Inicia mejoramiento de conductores de Virginia, compara cursos para padres o vuelve a ingresar desde un solo lugar.",
        heroCtaPrimary: "Iniciar mejoramiento de conductores de Virginia",
        heroCtaSecondary: "Ver cursos para padres",
        heroCardOneEyebrow: "Disponible ahora",
        heroCardOneTitle: "Mejoramiento de Conductores de Virginia",
        heroCardOneBody:
          "Empieza hoy, vuelve a ingresar cuando quieras y verifica tu certificado cuando lo necesites.",
        heroCardTwoEyebrow: "Cursos para padres",
        heroCardTwoTitle: "Minnesota y Dakota del Sur",
        heroCardTwoBody:
          "Compara opciones, revisa precios y ve qué esperar antes de inscribirte.",
        popularLabel: "Acciones populares",
        popularTitle: "Inicia, regresa, verifica o compara",
        popularIntro:
          "Usa estos accesos rápidos para iniciar, volver a ingresar, verificar un certificado o comparar cursos para padres.",
        findCourseLabel: "Encuentra tu curso",
        findCourseTitle: "Elige el curso que se adapta a tu situación",
        findCourseIntro:
          "Si la inscripción está abierta, puedes comenzar de inmediato. Si un curso abre pronto, aún puedes revisar precios, plan de estudios y certificado.",
        priceMatchLabel: "Garantía de igualación de precio",
        priceMatchTitle:
          "¿Encontraste un precio más bajo? Puedes pedirnos que lo revisemos aquí.",
        priceMatchIntro:
          "Si encuentras un precio público más bajo para un curso comparable, envíanos los detalles y lo revisaremos.",
        priceMatchVirginiaTitle: "Igualación de precio en Virginia",
        priceMatchVirginiaBody:
          "Revisa la garantía y envía una solicitud antes de inscribirte.",
        priceMatchMinnesotaTitle: "Igualación de precio en Minnesota",
        priceMatchMinnesotaBody:
          "Envía una solicitud si encuentras un precio público más bajo.",
        priceMatchSouthDakotaTitle: "Igualación de precio en Dakota del Sur",
        priceMatchSouthDakotaBody:
          "Envía un precio público más bajo para revisión.",
        priceMatchBoatingTitle: "Igualación de precio náutica",
        priceMatchBoatingBody:
          "Abre la página de igualación y elige tu estado.",
        openingLabel: "Disponible pronto",
        openingTitle: "Más familias de cursos vienen en camino",
        openingIntro:
          "Estas familias de cursos estarán disponibles pronto.",
      }
    : {
        heroLabel: "National Course Portal",
        heroTitle: "Find the course you need and get started faster.",
        heroIntro:
          "Start Virginia driver improvement, compare parenting courses, or sign back in from one place.",
        heroCtaPrimary: "Start Virginia driver improvement",
        heroCtaSecondary: "Browse parenting courses",
        heroCardOneEyebrow: "Available now",
        heroCardOneTitle: "Virginia Driver Improvement",
        heroCardOneBody:
          "Start today, sign back in anytime, and verify your certificate when you need it.",
        heroCardTwoEyebrow: "Parenting courses",
        heroCardTwoTitle: "Minnesota and South Dakota",
        heroCardTwoBody:
          "Compare the options, review pricing, and see what to expect before you enroll.",
        popularLabel: "Popular actions",
        popularTitle: "Start, return, verify, or compare",
        popularIntro:
          "Use these quick links to start, sign back in, verify a certificate, or compare parenting courses.",
        findCourseLabel: "Find your course",
        findCourseTitle: "Choose the course that fits your situation",
        findCourseIntro:
          "If enrollment is open, you can start right away. If a course is opening soon, you can still review pricing, curriculum, and certificate details first.",
        priceMatchLabel: "Price Match Guarantee",
        priceMatchTitle:
          "Found a lower price? You can ask us to review it here.",
        priceMatchIntro:
          "If you find a lower public price for a comparable course, send it here and we will review it.",
        priceMatchVirginiaTitle: "Virginia course price match",
        priceMatchVirginiaBody:
          "See the guarantee and send a request before you enroll.",
        priceMatchMinnesotaTitle: "Minnesota course price match",
        priceMatchMinnesotaBody:
          "Send a request if you find a lower public price.",
        priceMatchSouthDakotaTitle: "South Dakota course price match",
        priceMatchSouthDakotaBody:
          "Send a lower public South Dakota course price for review.",
        priceMatchBoatingTitle: "Boating price match",
        priceMatchBoatingBody:
          "Open the boating price-match page and choose your state.",
        openingLabel: "Opening next",
        openingTitle: "More course families are on the way",
        openingIntro:
          "These course families are expected to become available soon.",
      }

  return (
    <main className="public-shell min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[radial-gradient(circle_at_top_left,#eaf3ff_0%,#ffffff_38%,#f8fafc_100%)] p-8 shadow-sm lg:p-10">
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-blue-100/60 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-emerald-100/60 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="space-y-6">
              <div className="section-label">{copy.heroLabel}</div>
              <h1 className="display-balance text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
                {copy.heroTitle}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-600">
                {copy.heroIntro}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/virginia"
                  className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  {copy.heroCtaPrimary}
                </Link>
                <Link
                  href="#parenting-courses"
                  className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
                >
                  {copy.heroCtaSecondary}
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/virginia"
                className="rounded-3xl border border-blue-200 bg-blue-50 p-6 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                  {copy.heroCardOneEyebrow}
                </div>
                <div className="mt-3 text-2xl font-semibold text-slate-950">
                  {copy.heroCardOneTitle}
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {copy.heroCardOneBody}
                </p>
              </Link>
              <Link
                href="#parenting-courses"
                className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  {copy.heroCardTwoEyebrow}
                </div>
                <div className="mt-3 text-2xl font-semibold text-slate-950">
                  {copy.heroCardTwoTitle}
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {copy.heroCardTwoBody}
                </p>
              </Link>
            </div>
          </div>
        </div>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                {copy.popularLabel}
              </div>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950">
                {copy.popularTitle}
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                {copy.popularIntro}
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {quickActions.map((item) => {
              const styles = getQuickActionClasses(item.accent)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-3xl border p-6 transition ${styles.shell}`}
                >
                  <div
                    className={`text-sm font-semibold uppercase tracking-[0.18em] ${styles.eyebrow}`}
                  >
                    {item.eyebrow}
                  </div>
                  <div className="mt-3 text-xl font-semibold text-slate-950">
                    {item.label}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.note}
                  </p>
                </Link>
              )
            })}
          </div>
        </section>

        <section id="parenting-courses" className="mt-10 space-y-6">
          <div className="max-w-3xl">
            <div className="section-label !bg-slate-100 !text-slate-800 before:!bg-slate-500">
              {copy.findCourseLabel}
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
              {copy.findCourseTitle}
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              {copy.findCourseIntro}
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            {featuredCourses.map((course) => {
              const styles = getCardClasses(course.accent)

              return (
                <article
                  key={course.title}
                  className={`glass-panel rounded-[2rem] border p-8 ${styles.shell}`}
                >
                  <div
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${styles.pill}`}
                  >
                    {course.eyebrow}
                  </div>
                  <h3 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950">
                    {course.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-slate-600">
                    {course.summary}
                  </p>
                  <div className={`mt-6 text-sm font-semibold uppercase tracking-[0.18em] ${styles.text}`}>
                    {course.priceLine}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {course.detail}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href={course.primary.href}
                      className={`rounded-xl px-5 py-3 font-semibold text-white ${styles.button}`}
                    >
                      {course.primary.label}
                    </Link>
                    <Link
                      href={course.secondary.href}
                      className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      {course.secondary.label}
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-[radial-gradient(circle_at_top_left,#eef6ff_0%,#ffffff_30%,#f8fbfd_100%)] p-8 shadow-sm">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
              {copy.priceMatchLabel}
            </div>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">
              {copy.priceMatchTitle}
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              {copy.priceMatchIntro}
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Link
              href="/virginia/price-match"
              className="rounded-3xl border border-blue-200 bg-[linear-gradient(180deg,#f7faff_0%,#ffffff_100%)] p-6 transition hover:border-blue-300 hover:bg-white"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                Virginia
              </div>
              <div className="mt-3 text-xl font-semibold text-slate-950">
                {copy.priceMatchVirginiaTitle}
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {copy.priceMatchVirginiaBody}
              </p>
            </Link>
            <Link
              href="/minnesota-parent-education/price-match"
              className="rounded-3xl border border-emerald-200 bg-[linear-gradient(180deg,#f4fbf7_0%,#ffffff_100%)] p-6 transition hover:border-emerald-300 hover:bg-white"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Minnesota
              </div>
              <div className="mt-3 text-xl font-semibold text-slate-950">
                {copy.priceMatchMinnesotaTitle}
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {copy.priceMatchMinnesotaBody}
              </p>
            </Link>
            <Link
              href="/south-dakota-parenting/price-match"
              className="rounded-3xl border border-amber-200 bg-[linear-gradient(180deg,#fff8ee_0%,#ffffff_100%)] p-6 transition hover:border-amber-300 hover:bg-white"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                South Dakota
              </div>
              <div className="mt-3 text-xl font-semibold text-slate-950">
                {copy.priceMatchSouthDakotaTitle}
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {copy.priceMatchSouthDakotaBody}
              </p>
            </Link>
            <Link
              href="/virginia-boating/price-match"
              className="rounded-3xl border border-sky-200 bg-[linear-gradient(180deg,#f5fbff_0%,#ffffff_100%)] p-6 transition hover:border-sky-300 hover:bg-white"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                Boating
              </div>
              <div className="mt-3 text-xl font-semibold text-slate-950">
                {copy.priceMatchBoatingTitle}
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {copy.priceMatchBoatingBody}
              </p>
            </Link>
          </div>
        </section>

        <section
          id="opening-next"
          className="mt-10 rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-8 shadow-sm"
        >
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {copy.openingLabel}
            </div>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">
              {copy.openingTitle}
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              {copy.openingIntro}
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {futureCourses.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-6"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {item.label}
                </div>
                <div className="mt-3 text-2xl font-semibold text-slate-950">
                  {item.title}
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.summary}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {trustPoints.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-slate-950">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {item.body}
              </p>
            </article>
          ))}
        </section>
      </section>
    </main>
  )
}
