import { Plus_Jakarta_Sans } from "next/font/google"

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] })

export default function StylePreviewC() {
  return (
    <main className={`${jakarta.className} min-h-screen bg-[#f4f7fb] px-4 py-10 sm:px-6 lg:px-8`}>
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <section className="bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] px-8 py-10">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700">
              Virginia Driver Course
            </div>
            <h1 className="mt-4 text-5xl font-bold leading-tight text-slate-950">
              Complete your Virginia driver improvement course online.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
              This keeps the simpler blue-and-white look you liked before, but makes
              it cleaner, sharper, and more consistent across the site.
            </p>

            <div className="mt-6 flex gap-3">
              <div className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white">
                View Plans
              </div>
              <div className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700">
                Student Login
              </div>
            </div>
          </div>
        </section>

        <section className="px-8 py-8">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Simple white cards and familiar blue accents",
              "No fancy type treatment",
              "Closest to your earlier preferred direction",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700"
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
