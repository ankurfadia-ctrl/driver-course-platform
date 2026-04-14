import Link from "next/link"
import {
  getPriceMatchAccentStyles,
  type PriceMatchAccent,
} from "@/lib/price-match"

type Props = {
  label?: string
  title: string
  description: string
  href: string
  ctaLabel?: string
  accent?: PriceMatchAccent
  terms?: readonly string[]
}

export default function PriceMatchGuaranteePanel({
  label = "Price Match Guarantee",
  title,
  description,
  href,
  ctaLabel = "Start a price-match request",
  accent = "blue",
  terms = [],
}: Props) {
  const styles = getPriceMatchAccentStyles(accent)

  return (
    <section className={`glass-panel rounded-[2rem] border p-8 ${styles.shell}`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl">
          <div
            className={`text-sm font-semibold uppercase tracking-[0.18em] ${styles.label}`}
          >
            {label}
          </div>
          <h3 className="mt-3 text-3xl font-semibold text-slate-950">{title}</h3>
          <p className="mt-4 text-base leading-8 text-slate-600">{description}</p>
        </div>
        <Link
          href={href}
          className={`rounded-xl px-5 py-3 font-semibold ${styles.button}`}
        >
          {ctaLabel}
        </Link>
      </div>
      {terms.length ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {terms.map((item) => (
            <div
              key={item}
              className={`rounded-2xl border p-5 text-sm leading-7 ${styles.softPanel}`}
            >
              {item}
            </div>
          ))}
        </div>
      ) : null}
    </section>
  )
}
