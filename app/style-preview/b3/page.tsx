import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function StylePreviewB3() {
  return (
    <main className={`${inter.className} min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)] px-4 py-10 sm:px-6 lg:px-8`}>
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[1.9rem] border border-slate-200 bg-white shadow-[0_16px_35px_rgba(15,23,42,0.06)]">
        <section className="border-b border-slate-200 px-8 py-10">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
              B3 Calm Minimal
            </div>
            <h1 className="mt-4 text-5xl font-semibold leading-tight text-slate-950">
              Clean, modern, and calm.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
              This keeps the clean B structure but removes most of the startup vibe:
              quieter palette, more whitespace, simpler cards, and softer contrast.
            </p>

            <div className="mt-6 flex gap-3">
              <div className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
                View Plans
              </div>
              <div className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700">
                Student Login
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 px-8 py-8 md:grid-cols-3">
          {[
            "Lower-saturation blue and gray palette",
            "Simpler, calmer component styling",
            "Modern but less salesy or flashy",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700"
            >
              {item}
            </div>
          ))}
        </section>
      </div>
    </main>
  )
}
