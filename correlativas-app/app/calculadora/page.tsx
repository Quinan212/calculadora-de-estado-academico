import { GraduationCap, Info } from 'lucide-react'
import CorrelativasCalculator from "@/components/correlativas-calculator"
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})

export default function CalculatorPage() {
  return (
    <main className={`${inter.className} min-h-dvh bg-white text-[16px] sm:text-[18px]`}>
      <header className="bg-gradient-to-b from-blue-700 to-blue-600 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-6 w-6" />
            <h1 className="text-2xl sm:text-3xl font-extrabold">
              {"Calculadora de Estado Académico"}
            </h1>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-10 grid gap-4">
        <p className="text-[15px] sm:text-[16px] text-muted-foreground flex items-start gap-2">
          <Info className="h-4 w-4 text-blue-600 mt-1" />
          <span>
            {"Con correlativas solo Regularizadas (R): puedes cursar y realizar actividades, "}
            {"pero no puedes rendir parciales de promoción directa ni promocionar. "}
            {"Si luego apruebas esas correlativas (mesa extraordinaria u otra habilitada por la cátedra), "}
            {"podrás regularizar la materia y rendir examen final (una vez aprobadas las correlativas). "}
            {"Si una correlativa es Obligatoria (A) y no está aprobada, oficialmente no puedes cursar; "}
            {"solo si el/la docente o la cátedra lo autorizan expresamente podrás asistir a clases y realizar actividades, "}
            {"siempre sin parciales y con validez sujeta a que apruebes la correlativa en término. "}
            {"Si no hay autorización, no puedes cursar ni realizar actividades."}
          </span>
        </p>

        <CorrelativasCalculator />
      </div>
    </main>
  )
}
