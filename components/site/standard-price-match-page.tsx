import CoursePriceMatchForm from "@/components/site/course-price-match-form"
import {
  DEFAULT_PUBLIC_SUPPORT_EMAIL,
  getPriceMatchAccentStyles,
  type PriceMatchAccent,
} from "@/lib/price-match"

type Props = {
  label: string
  title: string
  description: string
  requestTitle: string
  emailSubject: string
  terms: readonly string[]
  supportName: string
  supportEmail?: string
  supportPhone?: string
  responseGoal?: string
  termsLabel?: string
  contactLabel?: string
  accent?: PriceMatchAccent
  language?: "en" | "es"
}

export default function StandardPriceMatchPage({
  label,
  title,
  description,
  requestTitle,
  emailSubject,
  terms,
  supportName,
  supportEmail = DEFAULT_PUBLIC_SUPPORT_EMAIL,
  supportPhone,
  responseGoal,
  termsLabel = "Guarantee terms",
  contactLabel = "Contact",
  accent = "blue",
  language = "en",
}: Props) {
  const styles = getPriceMatchAccentStyles(accent)
  const resolvedResponseGoal =
    responseGoal ??
    (language === "es"
      ? "Meta de respuesta inicial: dentro de 1 dia habil"
      : "Target initial response: within 1 business day")

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <section className={`glass-panel rounded-[2rem] border p-8 ${styles.shell}`}>
        <div
          className={`text-sm font-semibold uppercase tracking-[0.18em] ${styles.label}`}
        >
          {label}
        </div>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
          {title}
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          {description}
        </p>
        <div className="mt-8">
          <CoursePriceMatchForm
            requestTitle={requestTitle}
            emailSubject={emailSubject}
            accent={accent}
            supportEmail={supportEmail}
            language={language}
          />
        </div>
      </section>

      <section className="space-y-6">
        <div className="glass-panel rounded-[2rem] bg-white p-8">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            {termsLabel}
          </div>
          <div className="mt-6 space-y-4">
            {terms.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[2rem] bg-white p-8">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            {contactLabel}
          </div>
          <div className="mt-4 space-y-2 text-sm leading-7 text-slate-700">
            <div className="font-semibold text-slate-950">{supportName}</div>
            <div>{supportEmail}</div>
            {supportPhone ? <div>{supportPhone}</div> : null}
            <div>{resolvedResponseGoal}</div>
          </div>
        </div>
      </section>
    </div>
  )
}
