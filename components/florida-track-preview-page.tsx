import Link from "next/link"
import { getFloridaTrackPreview, getFloridaTrackPreviews } from "@/lib/florida-course-tracks"

type Props = {
  trackCode: string
}

export default function FloridaTrackPreviewPage({ trackCode }: Props) {
  const track = getFloridaTrackPreview(trackCode)

  if (!track) {
    return null
  }

  const siblingTracks = getFloridaTrackPreviews().filter(
    (item) => item.code !== track.code
  )

  return (
    <main className="public-shell min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div className="space-y-6">
            <div className="section-label">Florida {track.shortLabel} Preview</div>
            <h1 className="display-balance max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              {track.name}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              {track.summary}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/florida"
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Back to Florida overview
              </Link>
              <Link
                href="/florida/disclosures"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Read Florida disclosures
              </Link>
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] border-[#dbe7ff] bg-white p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
              Track Status
            </div>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">
              {track.statusLabel}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              {track.buildFocus}
            </p>
            <div className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
              {track.highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-4"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {track.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="text-sm text-slate-500">{metric.label}</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">
                {metric.value}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Intended Audience
            </div>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">
              Who this Florida track is for
            </h2>
            <p className="mt-6 text-sm leading-7 text-slate-700">
              {track.audience}
            </p>
          </section>

          <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
              Next Build Focus
            </div>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">
              What this track needs next
            </h2>
            <div className="mt-6 space-y-4">
              {track.highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-amber-200 bg-white p-5 text-sm leading-7 text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Florida Pipeline
          </div>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950">
            Related Florida tracks
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {siblingTracks.map((item) => (
              <article
                key={item.code}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                    {item.shortLabel}
                  </div>
                  <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                    {item.statusLabel}
                  </div>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-950">
                  {item.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  {item.summary}
                </p>
                <Link
                  href={item.route}
                  className="mt-5 inline-flex rounded-xl border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700 hover:bg-slate-100"
                >
                  {item.ctaLabel}
                </Link>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}
