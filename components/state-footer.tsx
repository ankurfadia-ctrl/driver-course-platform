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
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-slate-600 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-semibold text-slate-900">{config.brandName}</div>
            <div>{config.approvalStatusLabel}</div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href={getDisclosuresRoute(state)} className="hover:text-slate-900">
              Disclosures
            </Link>
            <Link href={getFaqRoute(state)} className="hover:text-slate-900">
              FAQ
            </Link>
            <Link href={getPrivacyRoute(state)} className="hover:text-slate-900">
              Privacy
            </Link>
            <Link href={getTermsRoute(state)} className="hover:text-slate-900">
              Terms
            </Link>
            <Link href={getContactRoute(state)} className="hover:text-slate-900">
              Contact
            </Link>
          </div>
        </div>
        <p className="max-w-4xl leading-6">
          Students should confirm eligibility and acceptance requirements before
          enrolling. For support, contact{" "}
          <a
            href={`mailto:${config.supportEmail}`}
            className="font-medium text-slate-900 underline"
          >
            {config.supportEmail}
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
