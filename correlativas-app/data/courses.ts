export type CorrelativaType = "A" | "R"

export type Correlativa = {
  id: string
  name: string
  type: CorrelativaType
}

export type Course = {
  id: string
  name: string
  correlativas: Correlativa[]
}

/**
 * IDs de materias base utilizadas como correlativas:
 * - pedagogia, didactica-general, practica-1, corporeidad
 * - antiguedad, ideas1, pueblos, problematica
 */
export const courses: Course[] = [
  // 1. Filosofía
  {
    id: "filosofia",
    name: "Filosofía",
    correlativas: [
      { id: "pedagogia", name: "Pedagogía", type: "R" },
    ],
  },
  // 2. Educación Sexual Integral
  {
    id: "educacion-sexual-integral",
    name: "Educación Sexual Integral",
    correlativas: [
      { id: "corporeidad", name: "Corporeidad, Juegos y Lenguajes Artísticos", type: "R" },
    ],
  },
  // 3. Psicología Educacional
  {
    id: "psicologia-educacional",
    name: "Psicología Educacional",
    correlativas: [
      { id: "pedagogia", name: "Pedagogía", type: "R" },
    ],
  },
  // 4. Práctica Docente II
  {
    id: "practica-docente-2",
    name: "Práctica Docente II",
    correlativas: [
      { id: "practica-1", name: "Práctica Docente I", type: "A" },
      { id: "pedagogia", name: "Pedagogía", type: "R" },
      { id: "didactica-general", name: "Didáctica General", type: "A" },
    ],
  },
  // 5. Sujetos de la Educación Secundaria
  {
    id: "sujetos-educ-secundaria",
    name: "Sujetos de la Educación Secundaria",
    correlativas: [
      { id: "pedagogia", name: "Pedagogía", type: "R" },
      { id: "didactica-general", name: "Didáctica General", type: "R" },
    ],
  },
  // 6. Feudalismo y la Modernidad
  {
    id: "feudalismo-modernidad",
    name: "Procesos Sociales, Políticos, Económicos y Culturales del Feudalismo y la Modernidad",
    correlativas: [
      { id: "antiguedad", name: "Procesos sociales... de la Antigüedad", type: "A" },
      { id: "ideas1", name: "Historia de las Ideas I", type: "A" },
      { id: "pueblos", name: "Procesos sociales... de los Pueblos Originarios de América", type: "R" },
      { id: "problematica", name: "Problemática de los Conocimientos Históricos", type: "R" },
    ],
  },
  // 7. Americanos I
  {
    id: "americanos-1",
    name: "Procesos Sociales, Políticos, Económicos y Culturales Americanos I",
    correlativas: [
      { id: "pueblos", name: "Procesos sociales... de los Pueblos Originarios de América", type: "R" },
    ],
  },
  // 8. Historia de las Ideas II
  {
    id: "ideas2",
    name: "Historia de las Ideas II",
    correlativas: [
      { id: "ideas1", name: "Historia de las Ideas I", type: "A" },
      { id: "problematica", name: "Problemática de los Conocimientos Históricos", type: "R" },
    ],
  },
  // 9. Economía Política
  {
    id: "economia-politica",
    name: "Economía Política",
    correlativas: [
      { id: "antiguedad", name: "Procesos sociales... de la Antigüedad", type: "R" },
      { id: "ideas1", name: "Historia de las Ideas I", type: "R" },
    ],
  },
  // 10. Didáctica de las Ciencias Sociales
  {
    id: "didactica-ciencias-sociales",
    name: "Didáctica de las Ciencias Sociales",
    correlativas: [
      { id: "didactica-general", name: "Didáctica General", type: "A" },
      { id: "problematica", name: "Problemática de los Conocimientos Históricos", type: "R" },
      { id: "antiguedad", name: "Procesos sociales... de la Antigüedad", type: "A" },
      { id: "ideas1", name: "Historia de las Ideas I", type: "A" },
    ],
  },
  // 11. El Mundo y las Nuevas Territorialidades
  {
    id: "mundo-nuevas-territorialidades",
    name: "El Mundo y las Nuevas Territorialidades",
    correlativas: [
      { id: "ideas1", name: "Historia de las Ideas I", type: "R" },
      { id: "pueblos", name: "Procesos sociales... de los Pueblos Originarios de América", type: "R" },
      { id: "antiguedad", name: "Procesos sociales... de la Antigüedad", type: "R" },
    ],
  },
]
