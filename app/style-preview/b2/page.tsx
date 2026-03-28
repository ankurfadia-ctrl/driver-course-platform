import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function StylePreviewB2() {
  return (
    <main className={`${inter.className} min-h-screen bg-[#f4f6f9] px-4 py-10 sm:px-6 lg:px-8`}>
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
        <header className="border-b border-slate-200 px-8 py-5">
          <div className="flex items-center justify-between gap-4">
            <div className="text-lg font-semibold text-slate-950">
              Driver Course Platform
            </div>
            <div className="flex gap-3 text-sm font-semibold">
              <div className="rounded-md px-3 py-2 text-slate-700">FAQ</div>
              <div className="rounded-md px-3 py-2 text-slate-700">Support</div>
              <div className="rounded-md bg-slate-950 px-4 py-2 text-white">
                Student Login
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-8 px-8 py-10 lg:grid-cols-[1.12fr_0.88fr]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              B2 Clean Professional
            </div>
            <h1 className="mt-4 max-w-2xl text-5xl font-semibold leading-tight text-slate-950">
              A simpler modern course experience with less startup energy.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
              Same clean modern base as B, but toned down: darker buttons, fewer
              bright accents, flatter cards, and a more serious overall feel.
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

          <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-5">
            {[
              "Clear public enrollment flow",
              "Protected checkout and course access",
              "Final exam, certificate, and verification tools",
              "A more restrained tone for compliance-heavy audiences",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
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
