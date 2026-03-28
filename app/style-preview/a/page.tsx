import { Public_Sans } from "next/font/google"

const publicSans = Public_Sans({ subsets: ["latin"] })

export default function StylePreviewA() {
  return (
    <main className={`${publicSans.className} min-h-screen bg-[#f3f6fa] px-4 py-10 sm:px-6 lg:px-8`}>
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
        <header className="border-b border-slate-200 bg-white px-8 py-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Virginia Driver Improvement
              </div>
              <div className="mt-1 text-lg font-semibold text-slate-950">
                Virginia Driver Improvement Course
              </div>
            </div>
            <div className="flex gap-3 text-sm font-semibold">
              <div className="rounded-md px-3 py-2 text-slate-700">Disclosures</div>
              <div className="rounded-md px-3 py-2 text-slate-700">FAQ</div>
              <div className="rounded-md bg-slate-950 px-4 py-2 text-white">
                Student Login
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-8 px-8 py-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Virginia Online Course
            </div>
            <h1 className="mt-4 max-w-2xl text-5xl font-semibold leading-tight text-slate-950">
              Complete your driver improvement course online.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
              A clear, structured, approval-safe enrollment experience designed to
              feel credible, readable, and easy to navigate.
            </p>

            <div className="mt-6 flex gap-3">
              <div className="rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white">
                View Plans
              </div>
              <div className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700">
                Read Disclosures
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Student Flow
            </div>
            <div className="mt-5 space-y-3">
              {[
                "Create account and purchase access",
                "Complete lessons and required seat time",
                "Pass the final exam",
                "Unlock and verify certificate",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-slate-50 px-8 py-8">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Simple, official-feeling typography",
              "Lower decoration and clearer hierarchy",
              "Best fit for compliance-first positioning",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-slate-200 bg-white p-5 text-sm text-slate-700"
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
