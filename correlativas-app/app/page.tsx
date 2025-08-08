import { GraduationCap, Info, ListChecks, Sparkles, FileText, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Inter } from 'next/font/google'
import { redirect } from "next/navigation"

const inter = Inter({ subsets: ["latin"], weight: ["400","500","600","700","800"] })

export default function Page() {
  redirect("/calculadora")

  return (
    <main className={`${inter.className} min-h-dvh bg-white text-[16px] sm:text-[18px]`}>
      {/* Hero con paleta azul */}
      <header className="bg-gradient-to-b from-blue-700 to-blue-600 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex flex-col gap-3 items-start">
            <div className="inline-flex items-center gap-2 text-white">
              <GraduationCap className="h-6 w-6" />
              <span className="text-sm sm:text-base font-medium">
                {"Profesorado de Educación Secundaria en Historia"}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
              {"Sistema de Correlativas y Calculadora Académica"}
            </h1>
            <p className="text-white text-base sm:text-lg max-w-3xl">
              {"Guía interactiva para entender requisitos, cursada, parciales y promoción, con ejemplos claros y una calculadora de estado."}
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a href="/calculadora">
                <Button className="bg-white text-blue-700 hover:bg-blue-50">
                  {"Abrir Calculadora"}
                </Button>
              </a>
              <a href="#ejemplos">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  {"Ver Ejemplos"}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      <section id="ejemplos" className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12 grid gap-8">
        {/* EJEMPLO 1: Americanos I */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-black">
              <Sparkles className="h-5 w-5 text-blue-600" />
              {"🧭 EJEMPLO 1: Americanos I"}
            </CardTitle>
            <CardDescription className="text-base text-neutral-700">
              {"Correlativa requerida y efecto sobre promoción directa."}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 text-[15px] sm:text-[16px] text-black">
            <div>
              <div className="font-semibold">{"🔹 Correlativa para cursar:"}</div>
              <ul className="list-disc ms-5">
                <li>{"Procesos sociales... de los Pueblos Originarios de América (Regularizada)"}</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold">{"🔸 Situación del estudiante:"}</div>
              <ul className="list-disc ms-5">
                <li>{"Tiene Regularizada Pueblos Originarios"}</li>
              </ul>
            </div>
            <div>
              <span className="font-semibold">{"👉 Resultado: "}</span>
              {"Puede cursar y rendir Americanos I normalmente. La promoción es válida si aprueba la correlativa a tiempo."}
            </div>
            <div>
              <span className="font-semibold">{"🔔 Pero: "}</span>
              {"Si no aprueba Pueblos Originarios antes de la 1.ª mesa extraordinaria:"}
              <ul className="list-disc ms-5 mt-2">
                <li>{"❌ Se anula la promoción directa"}</li>
                <li>{"✅ Se considera regularizado, siempre que haya asistido y aprobado TPs y parciales"}</li>
                <li>{"✅ Puede rendir examen final cuando tenga aprobada Pueblos Originarios"}</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Encabezado Feudalismo + Requisitos */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-black">
              <FileText className="h-5 w-5 text-blue-600" />
              {"🧭 EJEMPLO EXPANDIDO 2: Feudalismo y la Modernidad"}
            </CardTitle>
            <CardDescription className="text-base text-neutral-700">
              {"Correlativas exigidas y casos (A–F)."}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 text-[15px] sm:text-[16px] text-black">
            <div className="font-semibold">{"🔹 Correlativas exigidas para cursar:"}</div>
            <ul className="list-disc ms-5">
              <li>{"Procesos sociales... de la Antigüedad (A)"}</li>
              <li>{"Historia de las Ideas I (A)"}</li>
              <li>{"Procesos sociales... de los Pueblos Originarios de América (R)"}</li>
              <li>{"Problemática de los Conocimientos Históricos (R)"}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Casos en tarjetas individuales, 2 por fila en pantallas medianas y grandes */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* CASO A */}
          <CaseCard
            color="amber"
            title="🟨 CASO A: Correlativas mixtas"
            items={[
              "Antigüedad (✅ Aprobada)",
              "Historia de las Ideas I (✅ Aprobada)",
              "Pueblos Originarios (✅ Regularizada)",
              "Problemática de los Conocimientos Históricos (✅ Regularizada)",
            ]}
            bullets={[
              "✅ Puede cursar Feudalismo.",
              "✅ Puede hacer actividades y rendir parciales; la promoción queda condicional hasta aprobar las correlativas (R).",
              "❗Si no aprueba Pueblos o Problemática de los Conocimientos Históricos antes de la 1ra mesa extraordinaria: → Pierde la promoción directa.",
              "✅ Queda regular y puede rendir final cuando apruebe las correlativas.",
            ]}
          />

          {/* CASO B */}
          <CaseCard
            color="emerald"
            title="🟩 CASO B: Todas las correlativas aprobadas"
            items={[
              "Antigüedad (✅ Aprobada)",
              "Historia de las Ideas I (✅ Aprobada)",
              "Pueblos Originarios (✅ Aprobada)",
              "Problemática de los Conocimientos Históricos (✅ Aprobada)",
            ]}
            bullets={[
              "✅ Cursa Feudalismo con correlativas completamente en regla.",
              "✅ Puede hacer actividades, rendir parciales y promocionar sin condiciones.",
              "✅ Si obtiene 7 o más en los parciales y cumple con asistencia y trabajos: → Aprueba la materia sin rendir final.",
              "✅ Caso ideal, sin restricciones.",
            ]}
          />

          {/* CASO C */}
          <CaseCard
            color="red"
            title="🟥 CASO C: Correlativas obligatorias no aprobadas"
            items={[
              "El estudiante NO tiene aprobadas Antigüedad o Historia de las Ideas I, pero sí las regularizó.",
            ]}
            bullets={[
              "❌ NO puede cursar Feudalismo (a menos que el docente lo permita mientras está en espera de mesa).",
              "❌ No puede hacer actividades ni rendir parciales (a menos que el docente lo permita mientras está en espera de mesa).",
              "⚠️ Si un docente permite que curse igual, toda la cursada podría anularse.",
              "🔒 Necesita sí o sí aprobar esas materias antes de inscribirse a Feudalismo.",
            ]}
          />

          {/* CASO D */}
          <CaseCard
            color="violet"
            title="🟪 CASO D: Correlativas mixtas con obligatoria regularizada"
            items={[
              "Antigüedad (🟡 Regularizada)",
              "Historia de las Ideas I (✅ Aprobada)",
              "Pueblos Originarios (✅ Aprobada)",
              "Problemática de los Conocimientos Históricos (✅ Aprobada)",
            ]}
            bullets={[
              "❌ NO puede cursar Feudalismo porque Antigüedad es correlativa obligatoria (debe estar aprobada) - a menos que el docente lo permita mientras está en espera de mesa.",
              "❌ No puede hacer actividades, rendir parciales ni promocionar (a menos que el docente lo permita mientras está en espera de mesa).",
              "📋 Debe aprobar Antigüedad primero (rendir final).",
              "✅ Una vez que apruebe Antigüedad: podrá cursar Feudalismo sin restricciones (ya tiene todas las demás aprobadas).",
              "💡 Ventaja: Solo necesita aprobar una materia para estar en situación ideal.",
            ]}
          />

          {/* CASO E */}
          <CaseCard
            color="orange"
            title="🟧 CASO E: Pueblos Originarios y Antigüedad no aprobadas"
            items={[
              "Antigüedad (🟡 Regularizada)",
              "Historia de las Ideas I (✅ Aprobada)",
              "Pueblos Originarios (🟡 Regularizada)",
              "Problemática de los Conocimientos Históricos (✅ Aprobada)",
            ]}
            bullets={[
              "❌ NO puede cursar Feudalismo porque Antigüedad es correlativa obligatoria (debe estar aprobada) - a menos que el docente lo permita mientras está en espera de mesa.",
              "❌ No puede hacer actividades, rendir parciales ni promocionar (a menos que el docente lo permita mientras está en espera de mesa).",
              "📋 Debe aprobar Antigüedad primero (rendir final).",
              "⚠️ Una vez que apruebe Antigüedad: podrá cursar pero solo hacer actividades hasta que también apruebe Pueblos Originarios.",
              "✅ Cuando apruebe ambas materias: podrá cursar sin restricciones.",
              "🎯 Estrategia: Priorizar aprobar Antigüedad.",
            ]}
          />

          {/* CASO F */}
          <CaseCard
            color="purple"
            title="🟪 CASO F: Solo Historia de las Ideas I aprobada"
            items={[
              "Antigüedad (🟡 Regularizada)",
              "Historia de las Ideas I (✅ Aprobada)",
              "Pueblos Originarios (🟡 Regularizada)",
              "Problemática de los Conocimientos Históricos (🟡 Regularizada)",
            ]}
            bullets={[
              "❌ NO puede cursar Feudalismo porque Antigüedad es correlativa obligatoria (debe estar aprobada) - a menos que el docente lo permita mientras está en espera de mesa).",
              "❌ No puede hacer actividades, rendir parciales ni promocionar (a menos que el docente lo permita mientras está en espera de mesa).",
              "📋 Debe aprobar Antigüedad primero para poder cursar.",
              "⚠️ Luego deberá aprobar Pueblos Originarios y Problemática para habilitar promoción sin condición.",
              "✅ Cuando apruebe las tres materias pendientes: podrá cursar sin restricciones.",
            ]}
          />
        </div>

        {/* Conclusión alineada estilo tabla */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-black">
              <ListChecks className="h-5 w-5 text-blue-600" />
              {"📌 Resumen de Reglas"}
            </CardTitle>
            <CardDescription className="text-base text-neutral-700">
              {"¿Qué puedes hacer y qué ocurre si no cumplís con las correlativas a tiempo?"}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-[15px] sm:text-[16px] text-black">
            <div className="overflow-x-auto">
              <div className="min-w-[800px] rounded-xl border border-neutral-200 overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-12 bg-neutral-50 text-neutral-900 font-semibold">
                  <div className="col-span-4 p-3">{"Situación al cursar"}</div>
                  <div className="col-span-4 p-3">{"¿Puede hacer actividades, rendir parciales y promocionar?"}</div>
                  <div className="col-span-4 p-3">{"¿Qué pasa si no aprueba correlativas antes de la mesa extraordinaria (o en otras que permita el docente)?"}</div>
                </div>
                {/* Row: Regularizadas */}
                <div className="grid grid-cols-12 border-t border-neutral-200">
                  <div className="col-span-4 p-3 text-amber-700 font-medium">{"Correlativas regularizadas (R)"}</div>
                  <div className="col-span-4 p-3">
                    {"⚠️ Solo actividades; parciales y promoción quedan condicionales."}
                  </div>
                  <div className="col-span-4 p-3">
                    {"❌ Pierde la promoción directa  "}
                    <span className="text-emerald-700">{"✅ Pero queda regular"}</span>
                  </div>
                </div>
                {/* Row: No regularizadas */}
                <div className="grid grid-cols-12 border-t border-neutral-200">
                  <div className="col-span-4 p-3 text-red-600 font-medium">{"Correlativas no regularizadas"}</div>
                  <div className="col-span-4 p-3">{"❌ No puede cursar ni hacer actividades."}</div>
                  <div className="col-span-4 p-3">{"-"}</div>
                </div>
                {/* Row: Aprobadas */}
                <div className="grid grid-cols-12 border-t border-neutral-200">
                  <div className="col-span-4 p-3 text-emerald-700 font-medium">{"Correlativas aprobadas (A)"}</div>
                  <div className="col-span-4 p-3">{"✅ Sí: actividades, parciales y promoción directa."}</div>
                  <div className="col-span-4 p-3">{"✅ La promoción es válida y definitiva."}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <a href="/calculadora">
            <Button className="bg-blue-600 hover:bg-blue-700">
              {"Abrir Calculadora"}
            </Button>
          </a>
        </div>
      </section>
    </main>
  )
}

function CaseCard({
title,
items,
bullets,
color = "blue",
}: {
title: string
items: string[]
bullets: string[]
color?: "blue" | "emerald" | "amber" | "red" | "violet" | "orange" | "purple"
}) {
const tokens: Record<string, {
bg: string
border: string
headerText: string
squareBg: string
squareBorder: string
}> = {
blue:   { bg: "bg-blue-50",    border: "border-blue-200",    headerText: "text-blue-700",    squareBg: "bg-blue-500",    squareBorder: "border-blue-700" },
emerald:{ bg: "bg-emerald-50", border: "border-emerald-200", headerText: "text-emerald-700", squareBg: "bg-emerald-500", squareBorder: "border-emerald-700" },
amber:  { bg: "bg-amber-50",   border: "border-amber-200",   headerText: "text-amber-700",   squareBg: "bg-amber-500",   squareBorder: "border-amber-700" },
red:    { bg: "bg-red-50",     border: "border-red-200",     headerText: "text-red-700",     squareBg: "bg-red-500",     squareBorder: "border-red-700" },
violet: { bg: "bg-violet-50",  border: "border-violet-200",  headerText: "text-violet-700",  squareBg: "bg-violet-500",  squareBorder: "border-violet-700" },
orange: { bg: "bg-orange-50",  border: "border-orange-200",  headerText: "text-orange-700",  squareBg: "bg-orange-500",  squareBorder: "border-orange-700" },
purple: { bg: "bg-purple-50",  border: "border-purple-200",  headerText: "text-purple-700",  squareBg: "bg-purple-500",  squareBorder: "border-purple-700" },
}
const t = tokens[color] ?? tokens.blue

return (
<div className={`rounded-xl border ${t.border} ${t.bg} p-4 sm:p-6`}>
  <div className="flex items-center gap-2 mb-3 sm:mb-4">
    <span className={`h-4 w-4 rounded-[3px] border ${t.squareBorder} ${t.squareBg}`} aria-hidden="true" />
    <h3 className={`text-lg sm:text-xl font-semibold ${t.headerText}`}>{title}</h3>
  </div>

  {items.length > 0 && (
    <div className="mb-3 sm:mb-4">
      <div className="font-semibold text-black mb-1">{"El estudiante tiene:"}</div>
      <ul className="ms-5 list-disc text-[15px] sm:text-[16px] text-black grid gap-1">
        {items.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>
    </div>
  )}

  {bullets.length > 0 && (
    <ul className="ms-5 list-disc text-[15px] sm:text-[16px] text-black grid gap-1">
      {bullets.map((b, i) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  )}
</div>
)
}
