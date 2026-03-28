import Link from "next/link"
import {
  getContactRoute,
  getCourseConfig,
  getDisclosuresRoute,
  getFaqRoute,
  getPrivacyRoute,
  getTermsRoute,
} from "@/lib/course-config"

export default function StateFooter({ state }: { state: string }) {
  const config = getCourseConfig(state)

  return (
    <footer className="border-t border-white/40 bg-[rgba(250,247,241,0.84)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 text-sm text-slate-600 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="space-y-3">
            <div className="section-label">{config.stateName} Course</div>
            <div className="max-w-md text-2xl font-semibold text-slate-950 [font-family:var(--font-display)]">
              Built for students now, structured to scale state by state.
            </div>
            <p className="max-w-xl leading-7 text-slate-600">
              {config.marketingDescription}
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
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

          <div className="rounded-[1.5rem] border border-white/80 bg-white/70 p-5 shadow-[0_14px_32px_rgba(15,23,42,0.05)]">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8d6d2b]">
              Support
            </div>
            <div className="mt-3 font-semibold text-slate-950">
              {config.approvalStatusLabel}
            </div>
            <p className="mt-2 leading-6">
              Students should confirm eligibility and acceptance requirements before
              enrolling.
            </p>
            <a
              href={`mailto:${config.supportEmail}`}
              className="mt-4 inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold text-slate-950 hover:bg-slate-50"
            >
              {config.supportEmail}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-slate-500">{config.brandName}</div>
          <div className="flex flex-wrap gap-4 text-slate-500">
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
      </div>
    </footer>
  )
}
