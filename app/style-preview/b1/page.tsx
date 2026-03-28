import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function StylePreviewB1() {
  return (
    <main className={`${inter.className} min-h-screen bg-[linear-gradient(180deg,#f5f9ff_0%,#eaf1ff_100%)] px-4 py-10 sm:px-6 lg:px-8`}>
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-[#dbe7ff] bg-white shadow-[0_20px_50px_rgba(37,99,235,0.08)]">
        <header className="px-8 py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="text-lg font-semibold text-slate-950">
              Driver Course Platform
            </div>
            <div className="flex gap-3 text-sm font-semibold">
              <div className="rounded-full px-4 py-2 text-slate-700">Support</div>
              <div className="rounded-full px-4 py-2 text-slate-700">Verify</div>
              <div className="rounded-full bg-blue-600 px-4 py-2 text-white">
                Launch Virginia
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-8 border-t border-[#e5edff] px-8 py-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              B1 Modern SaaS
            </div>
            <h1 className="mt-4 max-w-2xl text-5xl font-semibold leading-tight text-slate-950">
              A modern online driver improvement experience.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
              This is the most product-style version of B: brighter blue accents,
              softer cards, and a cleaner startup-like polish.
            </p>

            <div className="mt-6 flex gap-3">
              <div className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white">
                View Plans
              </div>
              <div className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700">
                Student Login
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Student signup and login",
              "Protected checkout flow",
              "Lessons and seat-time tracking",
              "Exam, certificate, and support",
            ].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-[#e5edff] bg-[#f8fbff] p-5 text-sm text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
