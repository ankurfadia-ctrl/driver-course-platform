import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Style Preview",
  description: "Choose a visual direction for Driver Course Platform.",
  robots: {
    index: false,
    follow: false,
  },
}

const options = [
  {
    slug: "a",
    title: "Option A",
    label: "Government / Compliance Clean",
    body: "More official, simpler, clearer, and the most approval-friendly.",
  },
  {
    slug: "b",
    title: "Option B",
    label: "Clean SaaS",
    body: "Modern product style with stronger blue accents and a startup-like feel.",
  },
  {
    slug: "c",
    title: "Option C",
    label: "Earlier Look, Cleaner",
    body: "Closest to the simpler look you liked before, just tightened up and more consistent.",
  },
]

export default function StylePreviewIndexPage() {
  return (
    <main className="min-h-screen bg-[#eef3f9] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Style Preview
          </div>
          <h1 className="mt-3 text-4xl font-semibold text-slate-950">
            Open each style one by one.
          </h1>
          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Each option now has its own full-page preview so it is much easier to
            compare. Open all three in separate tabs if you want.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {options.map((option) => (
            <Link
              key={option.slug}
              href={`/style-preview/${option.slug}`}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {option.title}
              </div>
              <h2 className="mt-3 text-2xl font-semibold text-slate-950">
                {option.label}
              </h2>
              <p className="mt-3 leading-7 text-slate-600">{option.body}</p>
              <div className="mt-5 inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
                Open Preview
              </div>
            </Link>
          ))}
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            B Variations
          </div>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950">
            If you like B, compare these tones too.
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Link
              href="/style-preview/b1"
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 hover:bg-white"
            >
              <div className="text-sm font-semibold text-slate-950">B1</div>
              <div className="mt-2 text-sm leading-6 text-slate-600">
                Most modern and startup-like.
              </div>
            </Link>
            <Link
              href="/style-preview/b2"
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 hover:bg-white"
            >
              <div className="text-sm font-semibold text-slate-950">B2</div>
              <div className="mt-2 text-sm leading-6 text-slate-600">
                Cleaner, more serious, less startup feel.
              </div>
            </Link>
            <Link
              href="/style-preview/b3"
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 hover:bg-white"
            >
              <div className="text-sm font-semibold text-slate-950">B3</div>
              <div className="mt-2 text-sm leading-6 text-slate-600">
                Calm, minimal, and softer overall.
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
