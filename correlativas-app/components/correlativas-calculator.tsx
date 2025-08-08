"use client"

import { useEffect, useMemo, useState } from "react"
import { courses, type Course, type Correlativa, type CorrelativaType } from "@/data/courses"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, CheckCircle2, Clock, Info, ListChecks, ShieldAlert, XCircle, Sparkles } from 'lucide-react'
import { cn } from "@/lib/utils"

type Status = "aprobada" | "regularizada" | "no-regularizada"

type Evaluation = {
  canEnroll: boolean
  reasonIfBlocked?: string
  overallLabel:
    | "Puede cursar sin restricciones"
    | "Cursa con restricciones"
    | "Cursada condicional (requiere autorización docente)"
    | "No puede cursar"
  activities: boolean
  exams: boolean
  promotion: boolean
  promotionPending: boolean
  notes: string[]
  strategy?: string
  matchedCase?: string
  missingA?: boolean
  rNotRegularized?: boolean
}

const STATUS_LABEL: Record<Status, string> = {
  aprobada: "Aprobada",
  regularizada: "Regularizada",
  "no-regularizada": "No regularizada",
}

const TYPE_LABEL: Record<CorrelativaType, string> = {
  A: "Obligatoria (debe estar Aprobada)",
  R: "Regularizable (al menos Regularizada)",
}

// Reglas:
// 1) Si alguna correlativa está "no regularizada" (A o R) -> No puede cursar (bloqueo total).
// 2) Si TODAS están al menos regularizadas y falta aprobar alguna A -> Cursada condicional (requiere autorización docente).
// 3) Si todas las R están aprobadas y A aprobadas -> Puede cursar sin restricciones.
// 4) Si A aprobadas pero existen R solo regularizadas -> Cursa con restricciones.
function evaluateCourse(course: Course, statusMap: Record<string, Status>): Evaluation {
  const aItems = course.correlativas.filter((c) => c.type === "A")
  const rItems = course.correlativas.filter((c) => c.type === "R")

  const anyNoReg = course.correlativas.some((c) => statusMap[c.id] === "no-regularizada")
  const aAllApproved = aItems.every((c) => statusMap[c.id] === "aprobada")
  const rAllAtLeastReg = rItems.every((c) => {
    const s = statusMap[c.id]
    return s === "aprobada" || s === "regularizada"
  })
  const rAllApproved = rItems.every((c) => statusMap[c.id] === "aprobada")

  // 1) Bloqueo total si hay alguna no regularizada (A o R)
  if (anyNoReg) {
    return {
      canEnroll: false,
      reasonIfBlocked: "Existen correlativas sin regularizar. No puedes cursar.",
      overallLabel: "No puede cursar",
      activities: false,
      exams: false,
      promotion: false,
      promotionPending: false,
      notes: [
        "Con correlativas no regularizadas no puedes asistir ni realizar actividades.",
        "Debes, como mínimo, regularizar o aprobar las correlativas pendientes para habilitar la cursada.",
      ],
      strategy: "Regulariza/aprueba las correlativas faltantes antes de inscribirte.",
      missingA: !aAllApproved,
      rNotRegularized: !rAllAtLeastReg,
    }
  }

  // A partir de aquí, todas están al menos regularizadas.
  const missingA = !aAllApproved

  // 2) Faltan A aprobadas (pero todo está al menos regularizado) -> condicional
  if (missingA) {
    return {
      canEnroll: false,
      reasonIfBlocked: "Faltan correlativas obligatorias (A) aprobadas.",
      overallLabel: "Cursada condicional (requiere autorización docente)",
      activities: false, // UI mostrará advertencia de autorización
      exams: false,
      promotion: false,
      promotionPending: false,
      notes: [
        "Solo con autorización expresa del/la docente o cátedra puedes asistir a clases y actividades.",
        "Parciales y promoción no habilitados: podrás acceder a parciales únicamente si apruebas previamente en mesa extraordinaria (u otra habilitada) las correlativas pendientes (sean A o R).",
        "Lo realizado puede perder validez si no apruebas en término, salvo excepción explícita.",
      ],
      strategy: "Gestiona la autorización y prioriza aprobar las (A) en la próxima mesa.",
      missingA: true,
      rNotRegularized: false,
    }
  }

  // 3) Todas las R aprobadas -> sin restricciones
  if (rAllApproved) {
    return {
      canEnroll: true,
      overallLabel: "Puede cursar sin restricciones",
      activities: true,
      exams: true,
      promotion: true,
      promotionPending: false,
      notes: [
        "Puedes hacer actividades, rendir parciales y promocionar directamente.",
        "Si cumples asistencia y notas mínimas, no necesitas rendir final.",
      ],
      strategy: "Mantén calificaciones y asistencia para promocionar.",
      missingA: false,
      rNotRegularized: false,
    }
  }

  // 4) R solo regularizadas (no aprobadas) -> cursa con restricciones
  return {
    canEnroll: true,
    overallLabel: "Cursa con restricciones",
    activities: true, // UI mostrará advertencia de autorización docente
    exams: false,     // UI mostrará advertencia: requiere aprobar previamente en mesa
    promotion: false,
    promotionPending: false,
    notes: [
        "Puedes cursar y realizar actividades, solo si el/la docente lo permite.",
        "Parciales y promoción bloqueados: podrás acceder a parciales solo si apruebas previamente en mesa extraordinaria (u otra habilitada) las correlativas pendientes (sean A o R).",
        "Una vez aprobadas, podrás consolidar la regularidad y luego rendir examen final.",
    ],
    strategy: "Aprobar las correlativas (R) cuanto antes para habilitar evaluación y cierre.",
    missingA: false,
    rNotRegularized: false,
  }
}

function matchExampleCase(course: Course, statusMap: Record<string, Status>): string | undefined {
  const s = (id: string) => statusMap[id]
  if (course.id === "americanos-1") {
    const pueblos = s("pueblos")
    if (pueblos === "regularizada") return "CASO A"
    if (pueblos === "aprobada") return "CASO B"
    return undefined
  }
  if (course.id === "feudalismo-modernidad") {
    const anti = s("antiguedad")
    const ideas = s("ideas1")
    const pueblos = s("pueblos")
    const prob = s("problematica")
    const isAprob = (x?: Status) => x === "aprobada"
    const isReg = (x?: Status) => x === "regularizada"

    if ([anti, ideas, pueblos, prob].every(isAprob)) return "CASO B"
    if (isAprob(anti) && isAprob(ideas) && isReg(pueblos) && isReg(prob)) return "CASO A"
    if (!isAprob(anti) || !isAprob(ideas)) return "CASO C"
    return undefined
  }
  return undefined
}

export default function CorrelativasCalculator() {
  const [courseId, setCourseId] = useState<string>(courses[0]?.id ?? "")
  const course = useMemo(() => courses.find((c) => c.id === courseId)!, [courseId])

  const [statusMap, setStatusMap] = useState<Record<string, Status>>({})

  useEffect(() => {
    const next: Record<string, Status> = {}
    course.correlativas.forEach((c) => {
      next[c.id] = "no-regularizada"
    })
    setStatusMap(next)
  }, [course])

  const evaluation = useMemo(() => {
    const res = evaluateCourse(course, statusMap)
    const matched = matchExampleCase(course, statusMap)
    return { ...res, matchedCase: matched }
  }, [course, statusMap])

  const setOne = (id: string, value: Status) =>
    setStatusMap((prev) => ({
      ...prev,
      [id]: value,
    }))

  return (
    <div className="grid gap-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{"🧮 Calculadora de Estado Académico"}</CardTitle>
          <CardDescription className="text-base">
            {"Selecciona tu materia objetivo y marca el estado de sus correlativas."}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative z-40 grid gap-2">
              <Label htmlFor="materia" className="font-medium">
                {"Selecciona tu materia objetivo"}
              </Label>
              <Select value={courseId} onValueChange={setCourseId}>
                <SelectTrigger id="materia" className="w-full">
                  <SelectValue placeholder="Seleccionar materia..." />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-[16px]">{"Correlativas exigidas"}</h3>
            </div>
            <div className="grid gap-3">
              {course.correlativas.map((c) => (
                <CorrelativaRow
                  key={c.id}
                  correlativa={c}
                  value={statusMap[c.id] ?? "no-regularizada"}
                  onChange={(val) => setOne(c.id, val)}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <ResultCard evaluation={evaluation} course={course} />

      <RulesSummary />
    </div>
  )
}

function CorrelativaRow({
  correlativa,
  value,
  onChange,
}: {
  correlativa: Correlativa
  value: Status
  onChange: (s: Status) => void
}) {
  const statuses = ["aprobada", "regularizada", "no-regularizada"] as const

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border p-3">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-black">{correlativa.name}</span>
          <Badge variant="secondary" className="text-blue-700 bg-blue-50 border-blue-100">
            {TYPE_LABEL[correlativa.type]}
          </Badge>
        </div>
        <p className="text-xs text-black">
          {correlativa.type === "A"
            ? "Debe estar Aprobada para habilitar la cursada."
            : "Permite cursar y hacer actividades; no habilita parciales ni promoción hasta aprobar."}
        </p>
      </div>

      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as any)}
        className="flex items-center gap-3"
      >
        {(["aprobada", "regularizada", "no-regularizada"] as const).map((s) => {
          const id = `${correlativa.id}-${s}`
          const selected = value === s
          return (
            <Label
              key={s}
              htmlFor={id}
              onClick={() => onChange(s)}
              className={cn(
                "inline-flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer text-sm select-none transition",
                "focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2",
                selected ? "bg-blue-50 border-blue-500 text-blue-700" : "hover:bg-muted"
              )}
            >
              <RadioGroupItem value={s} id={id} className="sr-only" />
              <span className="text-black">{STATUS_LABEL[s]}</span>
            </Label>
          )
        })}
      </RadioGroup>
    </div>
  )
}

// Capability with 3 states: on (verde), warn (amarillo), off (rojo)
function Capability({
  title,
  state,
  hint,
}: {
  title: string
  state: "on" | "warn" | "off"
  hint?: string
}) {
  const Icon = state === "on" ? CheckCircle2 : state === "warn" ? AlertTriangle : XCircle
  const color =
    state === "on" ? "text-emerald-600" : state === "warn" ? "text-yellow-600" : "text-red-600"

  return (
    <div className="rounded-xl border p-3">
      <div className="flex items-center gap-2">
        <Icon className={cn("h-4 w-4", color)} />
        <div className="font-semibold text-black">{title}</div>
      </div>
      {hint && <div className="text-xs text-black mt-1">{hint}</div>}
    </div>
  )
}

function ResultCard({ evaluation, course }: { evaluation: Evaluation; course: Course }) {
  const isConditional = evaluation.overallLabel === "Cursada condicional (requiere autorización docente)"
  const isRestrict = evaluation.overallLabel === "Cursa con restricciones"
  const isBlocked = evaluation.overallLabel === "No puede cursar"

  const HeaderIcon = isBlocked ? XCircle : (isConditional || isRestrict) ? AlertTriangle : CheckCircle2
  const headerIconColor = isBlocked
    ? "text-red-600"
    : isConditional
    ? "text-yellow-600"
    : isRestrict
    ? "text-amber-600"
    : "text-emerald-600"

  const toneClasses = isBlocked
    ? "border-red-500/50 bg-red-50 text-red-800"
    : isConditional
    ? "border-yellow-500/50 bg-yellow-50 text-yellow-800"
    : isRestrict
    ? "border-amber-500/50 bg-amber-50 text-amber-800"
    : "border-emerald-500/50 bg-emerald-50 text-emerald-800"

  // Estados de capacidades según política actualizada
  const activitiesState: "on" | "warn" | "off" =
    isBlocked ? "off" : isConditional ? "warn" : isRestrict ? "warn" : "on"

  const examsState: "on" | "warn" | "off" =
    isBlocked ? "off" : isConditional ? "warn" : isRestrict ? "warn" : "on"

  const promoState: "on" | "warn" | "off" =
    evaluation.overallLabel === "Puede cursar sin restricciones" ? "on" : "off"

  const activitiesHint = isBlocked
    ? "No habilitado."
    : isConditional
    ? "Habilitado únicamente si el/la docente o la cátedra lo permiten."
    : isRestrict
    ? "Puedes realizar actividades solo si el/la docente lo permite."
    : "Puedes realizar actividades y asistencia."

  const examsHint = isBlocked
    ? "No habilitado."
    : isConditional || isRestrict
    ? "Podrás acceder a parciales solo si apruebas previamente en mesa extraordinaria (u otra habilitada) las correlativas pendientes (sean A o R)."
    : "Puedes rendir parciales."

  const promoHint = promoState === "on" ? "Promoción directa disponible." : "Promoción no disponible."

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[18px] sm:text-[20px] text-black">
          <HeaderIcon className={cn("h-5 w-5", headerIconColor)} />
          {isConditional ? "Puede cursar si el/la docente lo permite" : evaluation.overallLabel}
        </CardTitle>
        <CardDescription className="text-base text-black">{course.name}</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4">
        {evaluation.matchedCase && (
          <div className="flex items-center gap-2 text-sm text-black">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="font-semibold">
              {"Coincide con ejemplo: "}
              <span className="underline">{evaluation.matchedCase}</span>
            </span>
          </div>
        )}

        <div className={cn("rounded-md border p-3 text-sm", toneClasses)}>
          {isBlocked ? (
            <div className="flex items-start gap-2">
              <ShieldAlert className="h-4 w-4 mt-0.5" />
              <div>
                <div className="font-semibold">{"Bloqueado para cursar"}</div>
                <ul className="list-disc ms-5">
                  <li>{"Con correlativas no regularizadas no puedes asistir ni realizar actividades."}</li>
                  <li>{"Regulariza o aprueba primero las correlativas para habilitar la cursada."}</li>
                </ul>
              </div>
            </div>
          ) : isConditional ? (
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 mt-0.5" />
              <div>
                <div className="font-semibold">{"Cursada condicional"}</div>
                <ul className="list-disc ms-5">
                  <li>{"Requiere autorización expresa del/la docente o cátedra para asistir a clases y actividades."}</li>
                  <li>{"Parciales y promoción no habilitados hasta aprobar previamente las correlativas en mesa extraordinaria (u otra habilitada)."} </li>
                </ul>
              </div>
            </div>
          ) : isRestrict ? (
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 mt-0.5" />
              <div>
                <div className="font-semibold">{"Cursada con restricciones"}</div>
                <ul className="list-disc ms-5">
                  <li>{"Puedes realizar actividades solo si el/la docente lo permite."}</li>
                  <li>{"Parciales y promoción bloqueados hasta aprobar previamente las correlativas pendientes (A o R) en mesa habilitada."}</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 mt-0.5" />
              <div>
                <div className="font-semibold">{"Cursada completa habilitada"}</div>
                <ul className="list-disc ms-5">
                  <li>{"Puedes hacer actividades y rendir parciales."}</li>
                  <li>{"Si cumples requisitos (notas, asistencia, trabajos), promocionas sin final."}</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          <Capability title="Actividades" state={activitiesState} hint={activitiesHint} />
          <Capability title="Parciales" state={examsState} hint={examsHint} />
          <Capability title="Promoción" state={promoState} hint={promoHint} />
        </div>

        {evaluation.strategy && (
          <Alert>
            <Info className="h-4 w-4 text-blue-600" />
            <AlertTitle className="font-semibold text-black">{"Estrategia sugerida"}</AlertTitle>
            <AlertDescription className="text-black">{evaluation.strategy}</AlertDescription>
          </Alert>
        )}

        {evaluation.notes.length > 0 && (
          <>
            <Separator />
            <div className="grid gap-2">
              <div className="text-sm font-semibold text-black">{"Notas importantes"}</div>
              <ul className="list-disc ms-5 text-sm text-black">
                {evaluation.notes.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

function RulesSummary() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-[18px] sm:text-[20px] text-black">{"📌 Resumen de Reglas"}</CardTitle>
        <CardDescription className="text-base text-black">
          {"Cómo interpretar las correlativas para cursar, rendir parciales y promocionar."}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-[15px] sm:text-[16px] grid gap-3 text-black">
        <div>
          <span className="font-semibold">{"Correlativas aprobadas (A)"}</span>
          {" → "}
          <span>{"Actividades, parciales y promoción directa habilitadas."}</span>
        </div>
        <div>
          <span className="font-semibold">{"Correlativas regularizadas (R)"}</span>
          {" → "}
          <span>{"Puedes cursar con restricciones: actividades solo si el/la docente lo permite; parciales y promoción bloqueados hasta aprobar."}</span>
        </div>
        <div>
          <span className="font-semibold">{"Correlativas no regularizadas"}</span>
          {" → "}
          <span>{"No puedes cursar ni realizar actividades."}</span>
        </div>
        <Alert className="mt-2">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertTitle className="font-semibold text-black">{"Autorización y mesas"}</AlertTitle>
          <AlertDescription className="text-black">
            {"La cursada condicional solo aplica si todas las correlativas están al menos regularizadas pero falta aprobar una (A). "}
            {"Para habilitar parciales en cualquier caso con pendientes, primero debes aprobar en mesa extraordinaria u otra habilitada."}
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
