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
                <td
                  key={`${rowIndex}-${cellIndex}`}
                  className="px-4 py-3 align-top text-slate-700"
                >
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

function LessonOneVisual() {
  return (
    <DataTable
      headers={["Course stage", "What to expect", "Why it matters"]}
      rows={[
        ["Lessons", "Read each lesson and complete the knowledge checks", "Builds the safety habits needed for the final exam and certificate"],
        ["Seat time", "Remain active in the course until required time is complete", "Virginia expects approved instructional time before completion"],
        ["Final exam", "Pass the final exam after lessons and seat time are complete", "Confirms understanding of the course material"],
        ["Certificate", "Unlock the certificate after all requirements are satisfied", "Provides proof of course completion"],
      ]}
    />
  );
}

function LessonTwoVisual() {
  return (
    <DataTable
      headers={["Defensive habit", "What to do", "Safety result"]}
      rows={[
        ["Scan ahead", "Look well beyond the vehicle directly in front of you", "You spot brake lights, hazards, and congestion sooner"],
        ["Keep space", "Leave following distance and avoid getting boxed in", "You create time to slow or change position safely"],
        ["Check mirrors", "Know what is beside and behind you before moving", "You avoid creating a new hazard while reacting to another one"],
        ["Predict mistakes", "Assume another driver or pedestrian may do something unexpected", "You react earlier and with more control"],
      ]}
    />
  );
}

function StoppingDistanceVisual() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="space-y-4">
          <ChartRow
            label="25 mph"
            value={88}
            max={268}
            caption="about 88 ft"
            colorClass="bg-sky-500"
          />
          <ChartRow
            label="35 mph"
            value={133}
            max={268}
            caption="about 133 ft"
            colorClass="bg-blue-500"
          />
          <ChartRow
            label="45 mph"
            value={190}
            max={268}
            caption="about 190 ft"
            colorClass="bg-blue-600"
          />
          <ChartRow
            label="55 mph"
            value={268}
            max={268}
            caption="about 268 ft"
            colorClass="bg-slate-800"
          />
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

function BacVisual() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Under 21
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-950">0.02</div>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Virginia can treat a BAC from 0.02 up to less than 0.08 as illegal alcohol consumption for drivers under 21.
          </p>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-red-700">
            DUI threshold
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-950">0.08</div>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            Drivers 21 and older are considered under the influence at 0.08 BAC or higher.
          </p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-amber-700">
            Important reminder
          </div>
          <div className="mt-3 text-lg font-semibold text-slate-950">
            Impairment can begin before 0.08
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            Slower reaction time, poor judgment, and reduced coordination can start well before a driver feels &quot;drunk.&quot;
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-xl bg-slate-50 p-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
              Vision
            </h4>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Alcohol reduces the ability to track movement and judge distance accurately.
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
              Judgment
            </h4>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Risky choices feel more reasonable when alcohol lowers caution.
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
              Reaction time
            </h4>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Delayed braking and slower steering correction increase crash risk.
            </p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
              Control
            </h4>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Coordination and lane control become less reliable as impairment rises.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RoadSharingSpaceVisual() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {[
        [
          "P",
          "bg-blue-100",
          "Pedestrians",
          "Slow early near crosswalks, parked cars, buses, and school areas.",
        ],
        [
          "B",
          "bg-emerald-100",
          "Cyclists",
          "Give extra space because riders may shift to avoid debris, doors, or rough pavement.",
        ],
        [
          "M",
          "bg-amber-100",
          "Motorcycles",
          "Check mirrors and blind spots carefully before turning or changing lanes.",
        ],
        [
          "T",
          "bg-slate-200",
          "Trucks and buses",
          "Do not linger beside them or cut in close after passing.",
        ],
      ].map(([badge, badgeClass, title, body]) => (
        <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full text-base font-semibold text-slate-900 ${badgeClass}`}
            >
              {badge}
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">{title}</h4>
              <p className="text-sm text-slate-600">{body}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function LessonFiveTable() {
  return (
    <DataTable
      headers={["Road user", "Common risk", "Safer response"]}
      rows={[
        ["Pedestrians", "May appear late from behind parked vehicles or at crossings", "Slow early and be ready to stop smoothly"],
        ["Cyclists", "May move left to avoid doors, debris, or rough pavement", "Give room and do not squeeze past"],
        ["Motorcycles", "Harder to judge for distance and speed", "Double-check before turning or changing lanes"],
        ["Trucks and buses", "Need more space to stop, turn, and see around the vehicle", "Stay back, pass steadily, and leave extra room"],
      ]}
    />
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

function LessonSevenVisual() {
  return (
    <DataTable
      headers={["Condition", "Immediate adjustment", "Reason"]}
      rows={[
        ["Rain / wet roads", "Reduce speed and increase following distance", "Traction drops and stopping distance grows"],
        ["Snow / ice", "Slow well before turns and avoid sudden inputs", "Steering and braking become less predictable"],
        ["Fog / low visibility", "Drive only as fast as you can clearly see ahead", "Hazards may appear with very little warning"],
        ["Night driving", "Use headlights correctly and lower speed when needed", "You see less information and hazards later"],
      ]}
    />
  );
}

function LessonEightVisual() {
  return (
    <DataTable
      headers={["Unsafe mindset", "Typical driving behavior", "Safer reset"]}
      rows={[
        ["Rushed", "Speeding or forcing gaps", "Accept the delay and drive the speed that preserves control"],
        ["Angry", "Tailgating, weaving, or retaliating", "Create space and refocus on your own lane and speed"],
        ["Overconfident", "Late braking or casual phone use", "Treat every trip like conditions can still change quickly"],
        ["Stressed", "Missed signs, poor attention, or impatience", "Pause before driving and reset your focus first"],
      ]}
    />
  );
}

export default function LessonVisuals({ lessonSlug }: LessonVisualsProps) {
  if (lessonSlug === "lesson-1") {
    return (
      <div className="mt-8 space-y-6">
        <VisualShell
          label="Course overview"
          title="How the course moves from enrollment to certificate"
          description="This quick table shows the main course stages so you can see how lessons, seat time, the final exam, and the certificate connect."
        >
          <LessonOneVisual />
        </VisualShell>
      </div>
    );
  }

  if (lessonSlug === "lesson-2") {
    return (
      <div className="mt-8 space-y-6">
        <VisualShell
          label="Defensive driving table"
          title="A simple defensive-driving routine for every trip"
          description="Use this as a mental checklist while driving so awareness, spacing, and prediction become consistent habits."
        >
          <LessonTwoVisual />
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

  if (lessonSlug === "lesson-4") {
    return (
      <div className="mt-8 space-y-6">
        <VisualShell
          label="BAC and impairment"
          title="Alcohol affects judgment before a driver feels fully impaired"
          description="Virginia treats certain BAC levels as legal thresholds, but safe driving decisions should happen before alcohol or drugs begin reducing attention, judgment, and control."
        >
          <BacVisual />
        </VisualShell>
      </div>
    );
  }

  if (lessonSlug === "lesson-5") {
    return (
      <div className="mt-8 space-y-6">
        <VisualShell
          label="Road-sharing guide"
          title="Different road users need different kinds of space"
          description="Sharing the road safely means adjusting early for who is around you, how visible they are, and how vulnerable they would be in a collision."
        >
          <RoadSharingSpaceVisual />
        </VisualShell>

        <VisualShell
          label="Road-sharing table"
          title="Different road users call for different adjustments"
          description="This quick-reference table keeps the main sharing-the-road risks and safer responses in one place."
        >
          <LessonFiveTable />
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

  if (lessonSlug === "lesson-7") {
    return (
      <div className="mt-8 space-y-6">
        <VisualShell
          label="Conditions table"
          title="Bad conditions call for an immediate adjustment"
          description="When weather or visibility changes, the safest response is usually to slow down, leave more space, and reduce sudden movements."
        >
          <LessonSevenVisual />
        </VisualShell>
      </div>
    );
  }

  if (lessonSlug === "lesson-8") {
    return (
      <div className="mt-8 space-y-6">
        <VisualShell
          label="Attitude table"
          title="Unsafe mindset often shows up as a driving behavior"
          description="This quick table connects common emotional states to the choices they create and the safer reset that helps lower risk."
        >
          <LessonEightVisual />
        </VisualShell>
      </div>
    );
  }

  return null;
}
