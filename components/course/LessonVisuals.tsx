import type { ReactNode } from "react";

type LessonVisualsProps = {
  lessonSlug: string;
};

function VisualShell({
  label,
  title,
  description,
  children,
}: {
  label: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
          {label}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>

      <div className="mt-5">{children}</div>
    </section>
  );
}

function ChartRow({
  label,
  value,
  max,
  caption,
  colorClass = "bg-blue-600",
}: {
  label: string;
  value: number;
  max: number;
  caption: string;
  colorClass?: string;
}) {
  const width = `${Math.max(10, Math.round((value / max) * 100))}%`;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="font-semibold text-slate-900">{caption}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div className={`h-full rounded-full ${colorClass}`} style={{ width }} />
      </div>
    </div>
  );
}

function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-100">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left font-semibold text-slate-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`} className="px-4 py-3 align-top text-slate-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ScenarioIllustration() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="mb-4 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
        <span className="rounded-full bg-slate-100 px-3 py-1">1. Scan ahead</span>
        <span className="rounded-full bg-slate-100 px-3 py-1">2. Predict the risk</span>
        <span className="rounded-full bg-slate-100 px-3 py-1">3. Slow and leave space</span>
      </div>

      <svg viewBox="0 0 640 220" className="w-full" role="img" aria-label="Defensive driving scenario with a turning car and a crosswalk">
        <rect x="20" y="80" width="600" height="80" rx="24" fill="#dbeafe" />
        <rect x="40" y="104" width="560" height="32" rx="16" fill="#334155" />
        <rect x="70" y="118" width="32" height="4" rx="2" fill="#ffffff" />
        <rect x="140" y="118" width="32" height="4" rx="2" fill="#ffffff" />
        <rect x="210" y="118" width="32" height="4" rx="2" fill="#ffffff" />
        <rect x="280" y="118" width="32" height="4" rx="2" fill="#ffffff" />
        <rect x="350" y="118" width="32" height="4" rx="2" fill="#ffffff" />
        <rect x="420" y="118" width="32" height="4" rx="2" fill="#ffffff" />
        <rect x="490" y="118" width="32" height="4" rx="2" fill="#ffffff" />

        <rect x="470" y="86" width="64" height="64" rx="16" fill="#2563eb" />
        <rect x="488" y="146" width="12" height="12" rx="6" fill="#0f172a" />
        <rect x="506" y="146" width="12" height="12" rx="6" fill="#0f172a" />

        <rect x="186" y="86" width="64" height="64" rx="16" fill="#0ea5e9" />
        <rect x="204" y="146" width="12" height="12" rx="6" fill="#0f172a" />
        <rect x="222" y="146" width="12" height="12" rx="6" fill="#0f172a" />

        <rect x="300" y="36" width="40" height="44" rx="8" fill="#fef3c7" />
        <rect x="304" y="42" width="32" height="4" fill="#f59e0b" />
        <rect x="304" y="50" width="32" height="4" fill="#f59e0b" />
        <rect x="304" y="58" width="32" height="4" fill="#f59e0b" />
        <path d="M 320 80 L 320 106" stroke="#f59e0b" strokeWidth="4" strokeDasharray="6 6" />

        <rect x="70" y="88" width="16" height="56" fill="#ffffff" opacity="0.95" />
        <rect x="94" y="88" width="16" height="56" fill="#ffffff" opacity="0.95" />
        <rect x="118" y="88" width="16" height="56" fill="#ffffff" opacity="0.95" />

        <text x="458" y="66" fill="#1d4ed8" fontSize="18" fontWeight="700">Your lane</text>
        <text x="150" y="66" fill="#0369a1" fontSize="18" fontWeight="700">Vehicle may turn</text>
        <text x="30" y="188" fill="#475569" fontSize="18">Crosswalk area</text>
        <text x="278" y="24" fill="#b45309" fontSize="18" fontWeight="700">Pedestrian risk</text>
      </svg>
    </div>
  );
}

function StoppingDistanceVisual() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="space-y-4">
          <ChartRow label="25 mph" value={88} max={268} caption="about 88 ft" colorClass="bg-sky-500" />
          <ChartRow label="35 mph" value={133} max={268} caption="about 133 ft" colorClass="bg-blue-500" />
          <ChartRow label="45 mph" value={190} max={268} caption="about 190 ft" colorClass="bg-blue-600" />
          <ChartRow label="55 mph" value={268} max={268} caption="about 268 ft" colorClass="bg-slate-800" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
            See
          </h4>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Spot the hazard early so you do not lose distance before reacting.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
            React
          </h4>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Your vehicle keeps moving while your brain recognizes the problem and your foot moves to the brake.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
            Brake
          </h4>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Higher speed means a much longer distance before the vehicle finally stops.
          </p>
        </div>
      </div>
    </div>
  );
}

function RoadSignVisuals() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-red-600 text-xl font-bold text-white [clip-path:polygon(30%_0%,70%_0%,100%_30%,100%_70%,70%_100%,30%_100%,0%_70%,0%_30%)]">
          STOP
        </div>
        <p className="mt-3 text-sm font-medium text-slate-800">Full stop and look both ways.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center bg-white text-sm font-bold text-red-600 [clip-path:polygon(50%_100%,0_0,100%_0)] border-4 border-red-600">
          YIELD
        </div>
        <p className="mt-3 text-sm font-medium text-slate-800">Slow and give way before entering.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rotate-45 rounded-lg bg-yellow-300">
          <span className="-rotate-45 text-xs font-bold text-slate-900">PED XING</span>
        </div>
        <p className="mt-3 text-sm font-medium text-slate-800">Expect pedestrians near crossings and schools.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center bg-yellow-300 text-xs font-bold text-slate-900 [clip-path:polygon(50%_0%,100%_38%,80%_100%,20%_100%,0%_38%)]">
          SCHOOL
        </div>
        <p className="mt-3 text-sm font-medium text-slate-800">Reduce speed and watch for sudden movement.</p>
      </div>
    </div>
  );
}

function RightOfWayVisual() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <svg viewBox="0 0 640 320" className="w-full" role="img" aria-label="Four-way stop right-of-way diagram">
        <rect x="240" y="20" width="160" height="280" rx="24" fill="#cbd5e1" />
        <rect x="20" y="100" width="600" height="120" rx="24" fill="#cbd5e1" />
        <rect x="274" y="20" width="92" height="280" rx="12" fill="#334155" />
        <rect x="20" y="134" width="600" height="52" rx="12" fill="#334155" />

        <rect x="80" y="118" width="60" height="84" rx="18" fill="#0ea5e9" />
        <rect x="500" y="118" width="60" height="84" rx="18" fill="#2563eb" />
        <rect x="290" y="32" width="60" height="84" rx="18" fill="#22c55e" />
        <rect x="290" y="204" width="60" height="84" rx="18" fill="#f59e0b" />

        <circle cx="320" cy="74" r="22" fill="#ffffff" />
        <circle cx="530" cy="160" r="22" fill="#ffffff" />
        <circle cx="110" cy="160" r="22" fill="#ffffff" />
        <circle cx="320" cy="246" r="22" fill="#ffffff" />

        <text x="313" y="81" fill="#0f172a" fontSize="24" fontWeight="700">1</text>
        <text x="523" y="167" fill="#0f172a" fontSize="24" fontWeight="700">2</text>
        <text x="103" y="167" fill="#0f172a" fontSize="24" fontWeight="700">3</text>
        <text x="313" y="253" fill="#0f172a" fontSize="24" fontWeight="700">4</text>
      </svg>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
          <span className="font-semibold text-slate-900">Basic rule:</span> first vehicle to stop goes first. If vehicles arrive together, the driver on the right usually has the priority.
        </div>
        <div className="rounded-xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">
          Even when you think you have the right-of-way, pause, scan, and confirm the other driver is yielding before you move.
        </div>
      </div>
    </div>
  );
}

function ConsequencesVisual() {
  return (
    <div className="space-y-6">
      <DataTable
        headers={["Driving behavior", "Virginia DMV point category", "Record note"]}
        rows={[
          ["Speeding 1-9 mph over", "3-point violation", "Typically remains on record for 5 years"],
          ["Speeding 10-19 mph over", "4-point violation", "Typically remains on record for 5 years"],
          ["20+ mph over or over 85 mph", "6-point / reckless-driving risk", "May be charged as reckless driving"],
          ["DUI-related conviction", "6-point violation", "Serious offense with long-term record impact"],
        ]}
      />

      <DataTable
        headers={["For drivers 18 and older", "DMV response"]}
        rows={[
          ["8 demerit points in 12 months or 12 in 24 months", "Advisory letter"],
          ["12 demerit points in 12 months or 18 in 24 months", "Driver improvement clinic required within 90 days"],
          ["18 demerit points in 12 months or 24 in 24 months", "90-day suspension plus clinic and probation"],
        ]}
      />

      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-6 text-emerald-900">
        Virginia DMV also awards safe-driving points. Drivers can hold up to five safe-driving points, and completing a driver improvement clinic may earn five safe-driving points.
      </div>
    </div>
  );
}

export default function LessonVisuals({ lessonSlug }: LessonVisualsProps) {
  if (lessonSlug === "lesson-2") {
    return (
      <div className="mt-8 space-y-6">
        <VisualShell
          label="Scenario Illustration"
          title="See the hazard before it becomes a hard stop"
          description="Defensive driving works best when you spot the clue, predict what may happen next, and create space before the risk reaches your lane."
        >
          <ScenarioIllustration />
        </VisualShell>
      </div>
    );
  }

  if (lessonSlug === "lesson-3") {
    return (
      <div className="mt-8 space-y-6">
        <VisualShell
          label="Stopping-Distance Chart"
          title="Higher speed quickly takes away your stopping margin"
          description="These approximate distances combine perception, reaction, and braking distance to show why even modest speed increases matter."
        >
          <StoppingDistanceVisual />
        </VisualShell>
      </div>
    );
  }

  if (lessonSlug === "lesson-5") {
    return (
      <div className="mt-8 space-y-6">
        <VisualShell
          label="Road-Sign Graphic"
          title="Signs that often signal a need to slow down and scan"
          description="The safest response is not only to obey the sign, but to anticipate the vulnerable road users and conflicts that usually appear near it."
        >
          <RoadSignVisuals />
        </VisualShell>

        <VisualShell
          label="Right-of-Way Diagram"
          title="Four-way stop order still requires a final safety check"
          description="Right-of-way reduces confusion, but it does not replace a careful scan for pedestrians, cyclists, and drivers who fail to yield."
        >
          <RightOfWayVisual />
        </VisualShell>
      </div>
    );
  }

  if (lessonSlug === "lesson-6") {
    return (
      <div className="mt-8 space-y-6">
        <VisualShell
          label="Virginia Table"
          title="How point categories and serious violations can add up"
          description="This quick reference summarizes common point buckets and adult-driver thresholds from current Virginia DMV guidance."
        >
          <ConsequencesVisual />
        </VisualShell>
      </div>
    );
  }

  return null;
}
