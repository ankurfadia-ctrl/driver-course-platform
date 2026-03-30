"use client"

type OutreachTemplate = {
  id: string
  title: string
  recipient: string
  subject: string
  body: string
  note: string
}

type Props = {
  templates: OutreachTemplate[]
}

function buildGmailComposeUrl(template: OutreachTemplate) {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: template.recipient,
    su: template.subject,
    body: template.body,
  })

  return `https://mail.google.com/mail/?${params.toString()}`
}

export default function RegulatoryOutreachClient({ templates }: Props) {
  return (
    <div className="grid gap-4">
      {templates.map((template) => {
        const gmailUrl = buildGmailComposeUrl(template)

        return (
          <article
            key={template.id}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-3xl">
                <h3 className="text-lg font-semibold text-slate-900">
                  {template.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  To: {template.recipient}
                </p>
                <p className="text-sm text-slate-600">
                  Subject: {template.subject}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {template.note}
                </p>
              </div>

              <a
                href={gmailUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Open in Gmail
              </a>
            </div>

            <pre className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white p-4 text-xs leading-6 text-slate-700">
{template.body}
            </pre>
          </article>
        )
      })}
    </div>
  )
}
