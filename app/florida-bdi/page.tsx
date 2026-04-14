import type { Metadata } from "next"
import Link from "next/link"
import {
  FLORIDA_BDI_EXAM_CONTROLS,
  FLORIDA_BDI_MODULES,
  FLORIDA_BDI_TOPIC_MATRIX,
} from "@/lib/florida-bdi-course-content"
import { FLORIDA_BDI_CONFIG } from "@/lib/florida-bdi-config"
import { getFloridaTrackPreviews } from "@/lib/florida-course-tracks"
import { getPublicBaseUrl } from "@/lib/runtime-config"

const baseUrl = getPublicBaseUrl()

export const metadata: Metadata = {
  title: FLORIDA_BDI_CONFIG.siteTitle,
  description: FLORIDA_BDI_CONFIG.marketingDescription,
  alternates: {
    canonical: "/florida-bdi",
  },
  openGraph: {
    title: FLORIDA_BDI_CONFIG.siteTitle,
    description: FLORIDA_BDI_CONFIG.marketingDescription,
    url: `${baseUrl}/florida-bdi`,
    siteName: FLORIDA_BDI_CONFIG.brandName,
    images: [
      {
        url: `${baseUrl}/logo.svg`,
        width: 256,
        height: 256,
        alt: FLORIDA_BDI_CONFIG.brandName,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: FLORIDA_BDI_CONFIG.siteTitle,
    description: FLORIDA_BDI_CONFIG.marketingDescription,
    images: [`${baseUrl}/logo.svg`],
  },
}

export default function FloridaBDIPage() {
  const siblingTracks = getFloridaTrackPreviews().filter(
    (track) => track.code !== "fl-bdi"
  )

  return (
    <main className="public-shell min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div className="space-y-6">
            <div className="section-label">Florida BDI Preview</div>
            <h1 className="display-balance max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
              Florida Basic Driver Improvement is now split into its own track
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-600">
              {FLORIDA_BDI_CONFIG.packetSummary}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/florida-bdi/curriculum"
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                View BDI curriculum
              </Link>
              <Link
                href="/florida/disclosures"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Read Florida disclosures
              </Link>
              <Link
                href="/florida"
                className="rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-3 font-semibold text-emerald-800 hover:bg-emerald-100"
              >
                Back to Florida overview
              </Link>
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] border-[#dbe7ff] bg-white p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
              Packet Status
            </div>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">
              {FLORIDA_BDI_CONFIG.packetStatus}
            </h2>
            <div className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
              {FLORIDA_BDI_CONFIG.packetHighlights.map((item) => (
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

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">Modules</div>
            <div className="mt-2 text-3xl font-bold text-slate-900">
              {FLORIDA_BDI_MODULES.length}
            </div>
          </div>
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
            <div className="text-sm text-blue-700">Mapped topics</div>
            <div className="mt-2 text-3xl font-bold text-blue-900">
              {FLORIDA_BDI_TOPIC_MATRIX.length}
            </div>
          </div>
          <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
            <div className="text-sm text-green-700">Question bank target</div>
            <div className="mt-2 text-3xl font-bold text-green-900">
              {FLORIDA_BDI_EXAM_CONTROLS.questionBankSize}
            </div>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
            <div className="text-sm text-amber-700">Final exam length</div>
            <div className="mt-2 text-3xl font-bold text-amber-900">
              {FLORIDA_BDI_EXAM_CONTROLS.finalExamQuestions}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Launch Requirements
            </div>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">
              What Florida BDI already assumes
            </h2>
            <div className="mt-6 space-y-4">
              {FLORIDA_BDI_CONFIG.requirements.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <h3 className="text-xl font-semibold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-700">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-8 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
              Still Blocking Launch
            </div>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">
              What remains before Florida can open
            </h2>
            <div className="mt-6 space-y-4">
              {FLORIDA_BDI_CONFIG.launchConstraints.map((item) => (
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
            Build Notes
          </div>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950">
            What this separation unlocks next
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {FLORIDA_BDI_CONFIG.buildNotes.map((note) => (
              <div
                key={note}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700"
              >
                {note}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-sky-200 bg-sky-50 p-8 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
            Florida Pipeline
          </div>
          <h2 className="mt-3 text-3xl font-semibold text-slate-950">
            The next Florida tracks are now split out too
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {siblingTracks.map((track) => (
              <article
                key={track.code}
                className="rounded-2xl border border-sky-100 bg-white p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                    {track.shortLabel}
                  </div>
                  <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                    {track.statusLabel}
                  </div>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-950">
                  {track.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  {track.summary}
                </p>
                <Link
                  href={track.route}
                  className="mt-5 inline-flex rounded-xl border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700 hover:bg-slate-100"
                >
                  {track.ctaLabel}
                </Link>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}
