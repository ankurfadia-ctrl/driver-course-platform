import Link from "next/link"
import {
  getContactRoute,
  getCourseConfig,
  getDisclosuresRoute,
  getFaqRoute,
  getPrivacyRoute,
  getSupportRoute,
  getTermsRoute,
} from "@/lib/course-config"

export default function StateFooter({ state }: { state: string }) {
  const config = getCourseConfig(state)

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-slate-600 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr_0.8fr]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {config.stateName} Course
            </div>
            <div className="mt-3 text-2xl font-semibold text-slate-950">
              {config.stateName} driver improvement course.
            </div>
            <p className="mt-3 max-w-xl leading-7">
              Online enrollment, course access, final exam, and certificate delivery.
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Student Resources
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              <Link href={getDisclosuresRoute(state)} className="hover:text-slate-950">
                Disclosures
              </Link>
              <Link href={getFaqRoute(state)} className="hover:text-slate-950">
                FAQ
              </Link>
              <Link href={getPrivacyRoute(state)} className="hover:text-slate-950">
                Privacy
              </Link>
              <Link href={getTermsRoute(state)} className="hover:text-slate-950">
                Terms
              </Link>
              <Link href={getContactRoute(state)} className="hover:text-slate-950">
                Contact
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Support
            </div>
            <div className="mt-3 font-semibold text-slate-950">
              Start with online support
            </div>
            <p className="mt-2 leading-6">
              Use the support page first for course questions, account help, and certificate issues.
            </p>
            <Link
              href={getSupportRoute(state)}
              className="mt-4 inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-950 hover:bg-slate-100"
            >
              Open Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
