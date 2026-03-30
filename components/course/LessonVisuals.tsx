import type { ReactNode } from "react"

type Language = "en" | "es"

type LessonVisualsProps = {
  lessonSlug: string
  language?: Language
}

function VisualShell({
  label,
  title,
  description,
  children,
}: {
  label: string
  title: string
  description: string
  children: ReactNode
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
  )
}

function ChartRow({
  label,
  value,
  max,
  caption,
  colorClass = "bg-blue-600",
}: {
  label: string
  value: number
  max: number
  caption: string
  colorClass?: string
}) {
  const width = `${Math.max(10, Math.round((value / max) * 100))}%`

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
  )
}

function DataTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: string[][]
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
  )
}

export default function LessonVisuals({
  lessonSlug,
  language = "en",
}: LessonVisualsProps) {
  const isSpanish = language === "es"

  if (lessonSlug === "lesson-1") {
    return (
      <div className="mt-8 space-y-6">
        <VisualShell
          label={isSpanish ? "Resumen del curso" : "Course overview"}
          title={
            isSpanish
              ? "Como avanza el curso desde la inscripcion hasta el certificado"
              : "How the course moves from enrollment to certificate"
          }
          description={
            isSpanish
              ? "Esta tabla rapida muestra las etapas principales del curso para que veas como se conectan las lecciones, el tiempo aprobado, el examen final y el certificado."
              : "This quick table shows the main course stages so you can see how lessons, seat time, the final exam, and the certificate connect."
          }
        >
          <DataTable
            headers={
              isSpanish
                ? ["Etapa del curso", "Que esperar", "Por que importa"]
                : ["Course stage", "What to expect", "Why it matters"]
            }
            rows={
              isSpanish
                ? [
                    ["Lecciones", "Lee cada leccion y completa las revisiones de conocimiento", "Forma los habitos de seguridad necesarios para el examen final y el certificado"],
                    ["Tiempo aprobado", "Mantente activo en el curso hasta completar el tiempo requerido", "Virginia exige tiempo de instruccion aprobado antes de completar el curso"],
                    ["Examen final", "Aprueba el examen final despues de completar las lecciones y el tiempo requerido", "Confirma la comprension del material del curso"],
                    ["Certificado", "Desbloquea el certificado despues de cumplir todos los requisitos", "Proporciona prueba de finalizacion del curso"],
                  ]
                : [
                    ["Lessons", "Read each lesson and complete the knowledge checks", "Builds the safety habits needed for the final exam and certificate"],
                    ["Seat time", "Remain active in the course until required time is complete", "Virginia expects approved instructional time before completion"],
                    ["Final exam", "Pass the final exam after lessons and seat time are complete", "Confirms understanding of the course material"],
                    ["Certificate", "Unlock the certificate after all requirements are satisfied", "Provides proof of course completion"],
                  ]
            }
          />
        </VisualShell>
      </div>
    )
  }

  if (lessonSlug === "lesson-2") {
    return (
      <div className="mt-8 space-y-6">
        <VisualShell
          label={isSpanish ? "Tabla de conduccion defensiva" : "Defensive driving table"}
          title={
            isSpanish
              ? "Una rutina simple de conduccion defensiva para cada viaje"
              : "A simple defensive-driving routine for every trip"
          }
          description={
            isSpanish
              ? "Usa esto como una lista mental mientras conduces para que la observacion, el espacio y la anticipacion se conviertan en habitos consistentes."
              : "Use this as a mental checklist while driving so awareness, spacing, and prediction become consistent habits."
          }
        >
          <DataTable
            headers={
              isSpanish
                ? ["Habito defensivo", "Que hacer", "Resultado de seguridad"]
                : ["Defensive habit", "What to do", "Safety result"]
            }
            rows={
              isSpanish
                ? [
                    ["Mirar hacia adelante", "Mira mucho mas alla del vehiculo que va justo enfrente", "Detectas luces de freno, peligros y congestion antes"],
                    ["Mantener espacio", "Deja distancia de seguimiento y evita quedar encerrado", "Creas tiempo para reducir velocidad o cambiar de posicion con seguridad"],
                    ["Revisar espejos", "Sabe que hay a los lados y detras antes de moverte", "Evitas crear un nuevo peligro mientras respondes a otro"],
                    ["Prever errores", "Asume que otro conductor o peaton puede hacer algo inesperado", "Reaccionas antes y con mas control"],
                  ]
                : [
                    ["Scan ahead", "Look well beyond the vehicle directly in front of you", "You spot brake lights, hazards, and congestion sooner"],
                    ["Keep space", "Leave following distance and avoid getting boxed in", "You create time to slow or change position safely"],
                    ["Check mirrors", "Know what is beside and behind you before moving", "You avoid creating a new hazard while reacting to another one"],
                    ["Predict mistakes", "Assume another driver or pedestrian may do something unexpected", "You react earlier and with more control"],
                  ]
            }
          />
        </VisualShell>
      </div>
    )
  }

  if (lessonSlug === "lesson-3") {
    return (
      <div className="mt-8 space-y-6">
        <VisualShell
          label={isSpanish ? "Grafica de distancia de frenado" : "Stopping-Distance Chart"}
          title={
            isSpanish
              ? "Mas velocidad reduce rapidamente tu margen para detenerte"
              : "Higher speed quickly takes away your stopping margin"
          }
          description={
            isSpanish
              ? "Estas distancias aproximadas combinan percepcion, reaccion y frenado para mostrar por que incluso aumentos modestos de velocidad importan."
              : "These approximate distances combine perception, reaction, and braking distance to show why even modest speed increases matter."
          }
        >
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
              {[
                isSpanish
                  ? ["Ver", "Detecta el peligro temprano para no perder distancia antes de reaccionar."]
                  : ["See", "Spot the hazard early so you do not lose distance before reacting."],
                isSpanish
                  ? ["Reaccionar", "Tu vehiculo sigue moviendose mientras tu cerebro reconoce el problema y tu pie se mueve al freno."]
                  : ["React", "Your vehicle keeps moving while your brain recognizes the problem and your foot moves to the brake."],
                isSpanish
                  ? ["Frenar", "A mayor velocidad, mas larga es la distancia antes de que el vehiculo finalmente se detenga."]
                  : ["Brake", "Higher speed means a much longer distance before the vehicle finally stops."],
              ].map(([title, body]) => (
                <div key={title} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                    {title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </VisualShell>
      </div>
    )
  }

  if (lessonSlug === "lesson-4") {
    return (
      <div className="mt-8 space-y-6">
        <VisualShell
          label={isSpanish ? "BAC y deterioro" : "BAC and impairment"}
          title={
            isSpanish
              ? "El alcohol afecta el juicio antes de que el conductor se sienta totalmente incapacitado"
              : "Alcohol affects judgment before a driver feels fully impaired"
          }
          description={
            isSpanish
              ? "Los niveles de BAC importan, pero la decision mas segura es no conducir antes de que el alcohol o las drogas reduzcan la atencion, el juicio y el control."
              : "BAC thresholds matter, but the safest decision is to avoid driving before alcohol or drugs begin reducing attention, judgment, and control."
          }
        >
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-red-700">
                  {isSpanish ? "Menor de 21" : "Under 21"}
                </div>
                <div className="mt-3 text-3xl font-bold text-slate-950">0.02+</div>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {isSpanish
                    ? "Para conductores menores de 21, un BAC de 0.02 o mas ya es un problema serio legal y de seguridad."
                    : "For drivers under 21, a BAC from 0.02 and above is already a serious legal and safety problem."}
                </p>
              </div>

              <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-red-700">
                  {isSpanish ? "21 anos o mas" : "Age 21 and older"}
                </div>
                <div className="mt-3 text-3xl font-bold text-slate-950">0.08+</div>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {isSpanish
                    ? "Para conductores de 21 anos o mas, 0.08 BAC o mas es el nivel de DUI, pero el deterioro puede comenzar antes."
                    : "For drivers 21 and older, 0.08 BAC or higher is the DUI threshold, but impairment can begin earlier."}
                </p>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                  {isSpanish ? "Recordatorio importante" : "Important reminder"}
                </div>
                <div className="mt-3 text-lg font-semibold text-slate-950">
                  {isSpanish ? "El deterioro puede comenzar antes de 0.08" : "Impairment can begin before 0.08"}
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {isSpanish
                    ? 'El tiempo de reaccion mas lento, el mal juicio y la coordinacion reducida pueden comenzar mucho antes de que el conductor se sienta "borracho".'
                    : 'Slower reaction time, poor judgment, and reduced coordination can start well before a driver feels "drunk."'}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="grid gap-4 md:grid-cols-4">
                {[
                  isSpanish
                    ? ["Vision", "El alcohol reduce la capacidad de seguir el movimiento y calcular la distancia con precision."]
                    : ["Vision", "Alcohol reduces the ability to track movement and judge distance accurately."],
                  isSpanish
                    ? ["Juicio", "Las decisiones arriesgadas parecen mas razonables cuando el alcohol reduce la cautela."]
                    : ["Judgment", "Risky choices feel more reasonable when alcohol lowers caution."],
                  isSpanish
                    ? ["Tiempo de reaccion", "Frenar tarde y corregir la direccion mas lento aumenta el riesgo de choque."]
                    : ["Reaction time", "Delayed braking and slower steering correction increase crash risk."],
                  isSpanish
                    ? ["Control", "La coordinacion y el control del carril se vuelven menos confiables a medida que aumenta el deterioro."]
                    : ["Control", "Coordination and lane control become less reliable as impairment rises."],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-xl bg-slate-50 p-4">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                      {title}
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </VisualShell>
      </div>
    )
  }

  if (lessonSlug === "lesson-5") {
    const people = isSpanish
      ? [
          ["P", "bg-blue-100", "Peatones", "Reduce la velocidad temprano cerca de cruces peatonales, autos estacionados, autobuses y zonas escolares."],
          ["B", "bg-emerald-100", "Ciclistas", "Deja mas espacio porque pueden desviarse para evitar escombros, puertas o pavimento dañado."],
          ["M", "bg-amber-100", "Motocicletas", "Revisa espejos y puntos ciegos con cuidado antes de girar o cambiar de carril."],
          ["T", "bg-slate-200", "Camiones y autobuses", "No permanezcas a su lado ni te metas demasiado cerca despues de rebasarlos."],
        ]
      : [
          ["P", "bg-blue-100", "Pedestrians", "Slow early near crosswalks, parked cars, buses, and school areas."],
          ["B", "bg-emerald-100", "Bicyclists", "Give extra space because riders may shift to avoid debris, doors, or rough pavement."],
          ["M", "bg-amber-100", "Motorcycles", "Check mirrors and blind spots carefully before turning or changing lanes."],
          ["T", "bg-slate-200", "Trucks and buses", "Do not linger beside them or cut in close after passing."],
        ]

    return (
      <div className="mt-8 space-y-6">
        <VisualShell
          label={isSpanish ? "Guia para compartir la via" : "Road-sharing guide"}
          title={
            isSpanish
              ? "Distintos usuarios de la via necesitan distintos tipos de espacio"
              : "Different road users need different kinds of space"
          }
          description={
            isSpanish
              ? "Compartir la via con seguridad significa ajustarse temprano segun quien te rodea, cuan visibles son y cuan vulnerables serian en una colision."
              : "Sharing the road safely means adjusting early for who is around you, how visible they are, and how vulnerable they would be in a collision."
          }
        >
          <div className="grid gap-4 md:grid-cols-2">
            {people.map(([badge, badgeClass, title, body]) => (
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
        </VisualShell>

        <VisualShell
          label={isSpanish ? "Situaciones comunes" : "Common situations"}
          title={
            isSpanish
              ? "Algunas situaciones al compartir la via requieren juicio especial"
              : "A few sharing-the-road situations need special judgment"
          }
          description={
            isSpanish
              ? "Esta tabla se enfoca en las situaciones de la via con mas probabilidad de crear conflicto cuando el espacio, la visibilidad y la paciencia son limitados."
              : "This table focuses on the roadway situations most likely to create conflict when space, visibility, and patience are limited."
          }
        >
          <DataTable
            headers={
              isSpanish
                ? ["Situacion", "Que crea el riesgo", "Eleccion mas segura"]
                : ["Situation", "What creates the risk", "Safer choice"]
            }
            rows={
              isSpanish
                ? [
                    ["Rebasar a un ciclista", "El ciclista puede moverse a la izquierda para evitar puertas, escombros o pavimento dañado", "Rebasa solo cuando puedas dejar espacio lateral claro"],
                    ["Seguir a una motocicleta", "Su velocidad o distancia puede ser mas dificil de calcular que la de un auto", "Aumenta la distancia de seguimiento y evita presionar"],
                    ["Conducir cerca de un camion", "Los vehiculos grandes necesitan mas espacio para detenerse y pueden ocultar el trafico que va delante", "Mantente fuera de sus puntos ciegos y no te metas demasiado cerca"],
                    ["Acercarte a personal de emergencia", "Los vehiculos de emergencia o servicio detenidos crean una zona de alto riesgo al borde de la via", "Reduce la velocidad, cambia de carril cuando sea posible y mantente alerta"],
                  ]
                : [
                    ["Passing a bicyclist", "A rider may move left to avoid doors, debris, or rough pavement", "Pass only when you can give clear lateral space"],
                    ["Following a motorcycle", "Its speed or distance may be harder to judge than a car", "Increase following distance and avoid crowding"],
                    ["Driving near a truck", "Large vehicles need more room to stop and may hide traffic ahead", "Stay out of blind areas and do not cut in close"],
                    ["Approaching responders", "Stopped emergency or service vehicles create a high-risk roadside zone", "Slow down, move over when possible, and stay alert"],
                  ]
            }
          />
        </VisualShell>
      </div>
    )
  }

  if (lessonSlug === "lesson-6") {
    return (
      <div className="mt-8 space-y-6">
        <VisualShell
          label={isSpanish ? "Tabla de Virginia" : "Virginia table"}
          title={
            isSpanish
              ? "Como se acumulan las categorias de puntos y las infracciones graves"
              : "How point categories and serious violations can add up"
          }
          description={
            isSpanish
              ? "Esta referencia rapida resume categorias comunes de puntos y umbrales para conductores adultos segun la guia actual de Virginia DMV."
              : "This quick reference summarizes common point buckets and adult-driver thresholds from current Virginia DMV guidance."
          }
        >
          <div className="space-y-6">
            <DataTable
              headers={
                isSpanish
                  ? ["Conducta al conducir", "Categoria de puntos del DMV de Virginia", "Nota del historial"]
                  : ["Driving behavior", "Virginia DMV point category", "Record note"]
              }
              rows={
                isSpanish
                  ? [
                      ["Exceso de velocidad de 1 a 9 mph", "Infraccion de 3 puntos", "Normalmente permanece en el historial por 5 anos"],
                      ["Exceso de velocidad de 10 a 19 mph", "Infraccion de 4 puntos", "Normalmente permanece en el historial por 5 anos"],
                      ["20+ mph sobre el limite o mas de 85 mph", "6 puntos / riesgo de conduccion temeraria", "Puede ser acusado como conduccion temeraria"],
                      ["Condena relacionada con DUI", "Infraccion de 6 puntos", "Infraccion grave con impacto prolongado en el historial"],
                    ]
                  : [
                      ["Speeding 1-9 mph over", "3-point violation", "Typically remains on record for 5 years"],
                      ["Speeding 10-19 mph over", "4-point violation", "Typically remains on record for 5 years"],
                      ["20+ mph over or over 85 mph", "6-point / reckless-driving risk", "May be charged as reckless driving"],
                      ["DUI-related conviction", "6-point violation", "Serious offense with long-term record impact"],
                    ]
              }
            />

            <DataTable
              headers={
                isSpanish
                  ? ["Para conductores de 18 anos o mas", "Respuesta del DMV"]
                  : ["For drivers 18 and older", "DMV response"]
              }
              rows={
                isSpanish
                  ? [
                      ["8 puntos negativos en 12 meses o 12 en 24 meses", "Carta de advertencia"],
                      ["12 puntos negativos en 12 meses o 18 en 24 meses", "Curso de mejoramiento obligatorio dentro de 90 dias"],
                      ["18 puntos negativos en 12 meses o 24 en 24 meses", "Suspension de 90 dias mas curso y periodo de prueba"],
                    ]
                  : [
                      ["8 demerit points in 12 months or 12 in 24 months", "Advisory letter"],
                      ["12 demerit points in 12 months or 18 in 24 months", "Driver improvement clinic required within 90 days"],
                      ["18 demerit points in 12 months or 24 in 24 months", "90-day suspension plus clinic and probation"],
                    ]
              }
            />

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-6 text-emerald-900">
              {isSpanish
                ? "Virginia DMV tambien otorga puntos por conduccion segura. Los conductores pueden mantener hasta cinco puntos positivos, y completar un curso de mejoramiento puede otorgar cinco puntos positivos."
                : "Virginia DMV also awards safe-driving points. Drivers can hold up to five safe-driving points, and completing a driver improvement clinic may earn five safe-driving points."}
            </div>
          </div>
        </VisualShell>
      </div>
    )
  }

  if (lessonSlug === "lesson-7") {
    return (
      <div className="mt-8 space-y-6">
        <VisualShell
          label={isSpanish ? "Tabla de condiciones" : "Conditions table"}
          title={
            isSpanish
              ? "Las malas condiciones requieren un ajuste inmediato"
              : "Bad conditions call for an immediate adjustment"
          }
          description={
            isSpanish
              ? "Cuando cambia el clima o la visibilidad, la respuesta mas segura suele ser reducir velocidad, dejar mas espacio y evitar movimientos bruscos."
              : "When weather or visibility changes, the safest response is usually to slow down, leave more space, and reduce sudden movements."
          }
        >
          <DataTable
            headers={
              isSpanish
                ? ["Condicion", "Ajuste inmediato", "Motivo"]
                : ["Condition", "Immediate adjustment", "Reason"]
            }
            rows={
              isSpanish
                ? [
                    ["Lluvia / pavimento mojado", "Reduce velocidad y aumenta la distancia de seguimiento", "La traccion baja y la distancia de frenado aumenta"],
                    ["Nieve / hielo", "Reduce velocidad mucho antes de las curvas y evita maniobras bruscas", "La direccion y el frenado se vuelven menos previsibles"],
                    ["Niebla / poca visibilidad", "Conduce solo tan rapido como puedas ver claramente", "Los peligros pueden aparecer con muy poca advertencia"],
                    ["Conduccion nocturna", "Usa correctamente las luces y baja la velocidad cuando sea necesario", "Ves menos informacion y detectas los peligros mas tarde"],
                  ]
                : [
                    ["Rain / wet roads", "Reduce speed and increase following distance", "Traction drops and stopping distance grows"],
                    ["Snow / ice", "Slow well before turns and avoid sudden inputs", "Steering and braking become less predictable"],
                    ["Fog / low visibility", "Drive only as fast as you can clearly see ahead", "Hazards may appear with very little warning"],
                    ["Night driving", "Use headlights correctly and lower speed when needed", "You see less information and hazards later"],
                  ]
            }
          />
        </VisualShell>
      </div>
    )
  }

  if (lessonSlug === "lesson-8") {
    return (
      <div className="mt-8 space-y-6">
        <VisualShell
          label={isSpanish ? "Tabla de actitud" : "Attitude table"}
          title={
            isSpanish
              ? "Una mentalidad insegura suele mostrarse como conducta al volante"
              : "Unsafe mindset often shows up as a driving behavior"
          }
          description={
            isSpanish
              ? "Esta tabla conecta estados emocionales comunes con las decisiones que generan y la correccion mas segura para bajar el riesgo."
              : "This quick table connects common emotional states to the choices they create and the safer reset that helps lower risk."
          }
        >
          <DataTable
            headers={
              isSpanish
                ? ["Mentalidad insegura", "Conducta tipica al conducir", "Reinicio seguro"]
                : ["Unsafe mindset", "Typical driving behavior", "Safer reset"]
            }
            rows={
              isSpanish
                ? [
                    ["Apurado", "Exceso de velocidad o forzar espacios", "Acepta la demora y conduce a una velocidad que conserve el control"],
                    ["Enojado", "Seguir muy de cerca, zigzaguear o responder con agresion", "Crea espacio y vuelve a concentrarte en tu propio carril y velocidad"],
                    ["Demasiada confianza", "Frenar tarde o usar el telefono casualmente", "Trata cada viaje como si las condiciones aun pudieran cambiar rapidamente"],
                    ["Estresado", "Senales perdidas, mala atencion o impaciencia", "Haz una pausa antes de conducir y recupera tu concentracion"],
                  ]
                : [
                    ["Rushed", "Speeding or forcing gaps", "Accept the delay and drive the speed that preserves control"],
                    ["Angry", "Tailgating, weaving, or retaliating", "Create space and refocus on your own lane and speed"],
                    ["Overconfident", "Late braking or casual phone use", "Treat every trip like conditions can still change quickly"],
                    ["Stressed", "Missed signs, poor attention, or impatience", "Pause before driving and reset your focus first"],
                  ]
            }
          />
        </VisualShell>
      </div>
    )
  }

  return null
}
