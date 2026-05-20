export type Level = "principiante" | "intermedio" | "avanzado";

export interface DayPlan {
  day: string;
  isRest: boolean;
  label?: string;
  muscles?: string[];
  exercises?: string[];
  duration?: string;
  note?: string;
}

export interface WeekPlan {
  week: number;
  focus: string;
  days: DayPlan[];
}

export interface WeeklyProgram {
  id: string;
  name: string;
  subtitle: string;
  level: Level;
  daysPerWeek: number;
  structure: string;
  description: string;
  color: string;
  weeks: WeekPlan[];
}

export const weeklyPrograms: WeeklyProgram[] = [
  {
    id: "full-body",
    name: "Full Body",
    subtitle: "3 días por semana",
    level: "principiante",
    daysPerWeek: 3,
    structure: "3 días entrenamiento / 4 descanso",
    description:
      "Ideal para empezar. Cada sesión trabaja todo el cuerpo con movimientos fundamentales. Perfecto para construir base muscular y hábito.",
    color: "#56766b",
    weeks: [
      {
        week: 1,
        focus: "Aprender los movimientos — 60% intensidad",
        days: [
          {
            day: "Lunes",
            isRest: false,
            label: "Full Body A",
            muscles: ["upper legs", "back", "chest", "waist"],
            exercises: ["Sentadilla 3×12", "Remo con mancuerna 3×12", "Flexión de brazos 3×10", "Plancha 3×30s"],
            duration: "45 min",
          },
          { day: "Martes", isRest: true },
          {
            day: "Miércoles",
            isRest: false,
            label: "Full Body B",
            muscles: ["upper legs", "shoulders", "upper arms", "waist"],
            exercises: ["Zancada 3×10/lado", "Press de hombro 3×12", "Curl de bíceps 3×12", "Crunch 3×15"],
            duration: "45 min",
          },
          { day: "Jueves", isRest: true },
          {
            day: "Viernes",
            isRest: false,
            label: "Full Body C",
            muscles: ["upper legs", "back", "chest", "lower arms"],
            exercises: ["Peso muerto rumano 3×12", "Jalón al pecho 3×12", "Press inclinado 3×12", "Extensión de muñeca 3×15"],
            duration: "50 min",
          },
          { day: "Sábado", isRest: true },
          { day: "Domingo", isRest: true },
        ],
      },
      {
        week: 2,
        focus: "Volumen — añade 1 serie a cada ejercicio",
        days: [
          {
            day: "Lunes", isRest: false, label: "Full Body A+",
            muscles: ["upper legs", "back", "chest", "waist"],
            exercises: ["Sentadilla 4×12", "Remo con mancuerna 4×12", "Flexión de brazos 4×10", "Plancha 4×35s"],
            duration: "55 min",
          },
          { day: "Martes", isRest: true },
          {
            day: "Miércoles", isRest: false, label: "Full Body B+",
            muscles: ["upper legs", "shoulders", "upper arms", "waist"],
            exercises: ["Zancada 4×10/lado", "Press de hombro 4×12", "Curl de bíceps 4×12", "Crunch 4×15"],
            duration: "55 min",
          },
          { day: "Jueves", isRest: true },
          {
            day: "Viernes", isRest: false, label: "Full Body C+",
            muscles: ["upper legs", "back", "chest", "lower arms"],
            exercises: ["Peso muerto rumano 4×12", "Jalón al pecho 4×12", "Press inclinado 4×12", "Extensión muñeca 4×15"],
            duration: "60 min",
          },
          { day: "Sábado", isRest: true },
          { day: "Domingo", isRest: true },
        ],
      },
      {
        week: 3,
        focus: "Intensidad — sube el peso, baja las reps (8-10)",
        days: [
          {
            day: "Lunes", isRest: false, label: "Full Body A — Intensidad",
            muscles: ["upper legs", "back", "chest", "waist"],
            exercises: ["Sentadilla 4×8 (↑peso)", "Remo mancuerna 4×8 (↑peso)", "Flexión con lastre 4×8", "Plancha 3×45s"],
            duration: "55 min",
          },
          { day: "Martes", isRest: true },
          {
            day: "Miércoles", isRest: false, label: "Full Body B — Intensidad",
            muscles: ["upper legs", "shoulders", "upper arms", "waist"],
            exercises: ["Zancada cargada 4×8/lado", "Press hombro 4×8 (↑peso)", "Curl bíceps 4×8 (↑peso)", "Crunch 4×20"],
            duration: "55 min",
          },
          { day: "Jueves", isRest: true },
          {
            day: "Viernes", isRest: false, label: "Full Body C — Intensidad",
            muscles: ["upper legs", "back", "chest", "lower arms"],
            exercises: ["Peso muerto 4×8 (↑peso)", "Jalón pecho 4×8 (↑peso)", "Press inclinado 4×8 (↑peso)", "Extensión muñeca 4×15"],
            duration: "60 min",
          },
          { day: "Sábado", isRest: true },
          { day: "Domingo", isRest: true },
        ],
      },
    ],
  },

  {
    id: "upper-lower",
    name: "Upper / Lower",
    subtitle: "4 días por semana",
    level: "intermedio",
    daysPerWeek: 4,
    structure: "2 días tren superior / 2 días tren inferior",
    description:
      "División clásica y muy efectiva. Alta frecuencia por grupo muscular (2×/semana) con recuperación óptima. Ideal para ganar masa y fuerza simultáneamente.",
    color: "#a83a24",
    weeks: [
      {
        week: 1,
        focus: "Establecer cargas base — 65% intensidad",
        days: [
          {
            day: "Lunes", isRest: false, label: "Superior A",
            muscles: ["chest", "back", "shoulders", "upper arms"],
            exercises: ["Press banca 4×10", "Remo barra 4×10", "Press militar 3×10", "Curl bíceps 3×12", "Extensión tríceps 3×12"],
            duration: "65 min",
          },
          {
            day: "Martes", isRest: false, label: "Inferior A",
            muscles: ["upper legs", "lower legs", "waist"],
            exercises: ["Sentadilla 4×10", "Peso muerto rumano 4×10", "Prensa de piernas 3×12", "Elevación de talones 4×15", "Plancha 3×40s"],
            duration: "65 min",
          },
          { day: "Miércoles", isRest: true },
          {
            day: "Jueves", isRest: false, label: "Superior B",
            muscles: ["chest", "back", "shoulders", "upper arms"],
            exercises: ["Press inclinado 4×10", "Jalón al pecho 4×10", "Elevaciones laterales 3×15", "Martillo 3×12", "Fondos tríceps 3×10"],
            duration: "65 min",
          },
          {
            day: "Viernes", isRest: false, label: "Inferior B",
            muscles: ["upper legs", "lower legs", "waist"],
            exercises: ["Peso muerto 4×8", "Zancada 4×10/lado", "Curl femoral 3×12", "Pantorrillas sentado 4×15", "Ab rollout 3×10"],
            duration: "65 min",
          },
          { day: "Sábado", isRest: true },
          { day: "Domingo", isRest: true },
        ],
      },
      {
        week: 2,
        focus: "Volumen — +1 serie en ejercicios compuestos",
        days: [
          { day: "Lunes", isRest: false, label: "Superior A — Volumen", muscles: ["chest", "back", "shoulders", "upper arms"], exercises: ["Press banca 5×10", "Remo barra 5×10", "Press militar 4×10", "Curl bíceps 3×12", "Extensión tríceps 3×12"], duration: "75 min" },
          { day: "Martes", isRest: false, label: "Inferior A — Volumen", muscles: ["upper legs", "lower legs", "waist"], exercises: ["Sentadilla 5×10", "Peso muerto rumano 4×10", "Prensa 4×12", "Talones 4×15", "Plancha 4×40s"], duration: "70 min" },
          { day: "Miércoles", isRest: true },
          { day: "Jueves", isRest: false, label: "Superior B — Volumen", muscles: ["chest", "back", "shoulders", "upper arms"], exercises: ["Press inclinado 5×10", "Jalón pecho 5×10", "Lateral raise 4×15", "Martillo 3×12", "Fondos 4×10"], duration: "75 min" },
          { day: "Viernes", isRest: false, label: "Inferior B — Volumen", muscles: ["upper legs", "lower legs", "waist"], exercises: ["Peso muerto 5×8", "Zancada 4×10/lado", "Curl femoral 4×12", "Pantorrillas 4×15", "Rollout 3×10"], duration: "70 min" },
          { day: "Sábado", isRest: true },
          { day: "Domingo", isRest: true },
        ],
      },
      {
        week: 3,
        focus: "Fuerza — bajar a 6-8 reps, aumentar carga 10%",
        days: [
          { day: "Lunes", isRest: false, label: "Superior A — Fuerza", muscles: ["chest", "back", "shoulders", "upper arms"], exercises: ["Press banca 5×6 (↑↑)", "Remo barra 5×6 (↑↑)", "Press militar 4×8 (↑)", "Curl 3×10", "Extensión 3×10"], duration: "70 min" },
          { day: "Martes", isRest: false, label: "Inferior A — Fuerza", muscles: ["upper legs", "lower legs", "waist"], exercises: ["Sentadilla 5×6 (↑↑)", "PD rumano 4×8 (↑)", "Prensa 4×10", "Talones 4×15", "Plancha 3×50s"], duration: "70 min" },
          { day: "Miércoles", isRest: true },
          { day: "Jueves", isRest: false, label: "Superior B — Fuerza", muscles: ["chest", "back", "shoulders", "upper arms"], exercises: ["Press inclinado 5×6 (↑↑)", "Jalón 5×6 (↑↑)", "Lateral raise 4×12", "Martillo 3×10", "Fondos 4×8"], duration: "70 min" },
          { day: "Viernes", isRest: false, label: "Inferior B — Fuerza", muscles: ["upper legs", "lower legs", "waist"], exercises: ["Peso muerto 5×5 (↑↑↑)", "Zancada 4×8/lado", "Curl femoral 4×10", "Pantorrillas 4×15", "Rollout 3×12"], duration: "70 min" },
          { day: "Sábado", isRest: true },
          { day: "Domingo", isRest: true },
        ],
      },
    ],
  },

  {
    id: "ppl",
    name: "Push / Pull / Legs",
    subtitle: "Ciclo 3 días on / 1 descanso",
    level: "intermedio",
    daysPerWeek: 6,
    structure: "PPL — ciclo continuo, no semanas fijas",
    description:
      "El split más popular para hipertrofia. Push (pecho, hombros, tríceps), Pull (espalda, bíceps) y Legs. Ciclo de 3+1 que maximiza frecuencia y recuperación.",
    color: "#d6a336",
    weeks: [
      {
        week: 1,
        focus: "Aprender el ciclo — 70% intensidad",
        days: [
          { day: "Día 1 — Push", isRest: false, label: "Push", muscles: ["chest", "shoulders", "upper arms"], exercises: ["Press banca 4×10", "Press inclinado mancuerna 3×12", "Press militar 4×10", "Elevaciones laterales 3×15", "Extensión tríceps 4×12"], duration: "65 min" },
          { day: "Día 2 — Pull", isRest: false, label: "Pull", muscles: ["back", "upper arms", "lower arms"], exercises: ["Jalón al pecho 4×10", "Remo cable 4×10", "Curl bíceps barra 4×10", "Curl martillo 3×12", "Facepull 3×15"], duration: "65 min" },
          { day: "Día 3 — Legs", isRest: false, label: "Legs", muscles: ["upper legs", "lower legs", "waist"], exercises: ["Sentadilla 4×10", "Peso muerto 4×8", "Prensa de piernas 3×12", "Curl femoral 3×12", "Pantorrillas 4×15", "Plancha 3×40s"], duration: "70 min" },
          { day: "Día 4 — Descanso", isRest: true },
          { day: "Día 5 — Push", isRest: false, label: "Push", muscles: ["chest", "shoulders", "upper arms"], exercises: ["Press banca inclinado 4×10", "Aperturas mancuerna 3×15", "Press Arnold 3×12", "Elevaciones frontales 3×12", "Fondos tríceps 4×10"], duration: "65 min" },
          { day: "Día 6 — Pull", isRest: false, label: "Pull", muscles: ["back", "upper arms", "lower arms"], exercises: ["Dominadas 4×6-8", "Remo mancuerna 4×10", "Curl predicador 3×12", "Curl concentrado 3×12", "Pullover mancuerna 3×12"], duration: "60 min" },
          { day: "Día 7 — Descanso", isRest: true },
        ],
      },
      {
        week: 2,
        focus: "Volumen — +1-2 series en cada bloque",
        days: [
          { day: "Día 1 — Push", isRest: false, label: "Push ↑Vol", muscles: ["chest", "shoulders", "upper arms"], exercises: ["Press banca 5×10", "Press inclinado 4×12", "Press militar 4×10", "Laterales 4×15", "Extensión tríceps 4×12"], duration: "70 min" },
          { day: "Día 2 — Pull", isRest: false, label: "Pull ↑Vol", muscles: ["back", "upper arms", "lower arms"], exercises: ["Jalón al pecho 5×10", "Remo cable 4×10", "Curl bíceps 4×10", "Martillo 4×12", "Facepull 3×15"], duration: "70 min" },
          { day: "Día 3 — Legs", isRest: false, label: "Legs ↑Vol", muscles: ["upper legs", "lower legs", "waist"], exercises: ["Sentadilla 5×10", "Peso muerto 4×8", "Prensa 4×12", "Curl femoral 4×12", "Pantorrillas 4×15", "Plancha 4×40s"], duration: "75 min" },
          { day: "Día 4 — Descanso", isRest: true },
          { day: "Día 5 — Push", isRest: false, label: "Push ↑Vol", muscles: ["chest", "shoulders", "upper arms"], exercises: ["Press inclinado 5×10", "Aperturas 4×15", "Press Arnold 4×12", "Elevaciones front. 3×12", "Fondos 4×10"], duration: "70 min" },
          { day: "Día 6 — Pull", isRest: false, label: "Pull ↑Vol", muscles: ["back", "upper arms", "lower arms"], exercises: ["Dominadas 4×8", "Remo mancuerna 5×10", "Curl predicador 4×12", "Curl concentrado 3×12", "Pullover 3×12"], duration: "65 min" },
          { day: "Día 7 — Descanso", isRest: true },
        ],
      },
      {
        week: 3,
        focus: "Intensidad máxima — 6-8 reps, cargas al límite",
        days: [
          { day: "Día 1 — Push", isRest: false, label: "Push 🔥", muscles: ["chest", "shoulders", "upper arms"], exercises: ["Press banca 5×6 (↑↑)", "Press inclinado 4×8 (↑)", "Press militar 4×8 (↑)", "Laterales 4×12", "Tríceps 4×10"], duration: "70 min" },
          { day: "Día 2 — Pull", isRest: false, label: "Pull 🔥", muscles: ["back", "upper arms", "lower arms"], exercises: ["Jalón pecho 5×6 (↑↑)", "Remo cable 4×8 (↑)", "Curl bíceps 4×8 (↑)", "Martillo 4×10", "Facepull 3×15"], duration: "70 min" },
          { day: "Día 3 — Legs", isRest: false, label: "Legs 🔥", muscles: ["upper legs", "lower legs", "waist"], exercises: ["Sentadilla 5×6 (↑↑)", "Peso muerto 4×6 (↑↑)", "Prensa 4×8 (↑)", "Femoral 4×10", "Pantorrillas 4×15", "Plancha 4×50s"], duration: "75 min" },
          { day: "Día 4 — Descanso", isRest: true },
          { day: "Día 5 — Push", isRest: false, label: "Push 🔥", muscles: ["chest", "shoulders", "upper arms"], exercises: ["Press inclinado 5×6 (↑↑)", "Aperturas 4×12", "Arnold 4×10 (↑)", "Frontales 3×12", "Fondos lastrados 4×8"], duration: "70 min" },
          { day: "Día 6 — Pull", isRest: false, label: "Pull 🔥", muscles: ["back", "upper arms", "lower arms"], exercises: ["Dominadas lastradas 4×6 (↑)", "Remo mancuerna 5×8 (↑)", "Predicador 4×8 (↑)", "Concentrado 3×10", "Pullover 3×12"], duration: "65 min" },
          { day: "Día 7 — Descanso", isRest: true },
        ],
      },
    ],
  },

  {
    id: "bro-split",
    name: "Bro Split",
    subtitle: "5 días — músculo por día",
    level: "principiante",
    daysPerWeek: 5,
    structure: "1 grupo muscular por sesión — alta concentración",
    description:
      "El split clásico del gimnasio. Un grupo muscular por día con alto volumen. Excelente para conexión mente-músculo y aprender a sentir cada zona.",
    color: "#1b1f22",
    weeks: [
      {
        week: 1,
        focus: "Exploración muscular — sentir cada zona",
        days: [
          { day: "Lunes", isRest: false, label: "Pecho + Tríceps", muscles: ["chest", "upper arms"], exercises: ["Press banca 4×10", "Press inclinado 3×12", "Aperturas 3×15", "Fondos 3×10", "Extensión tríceps 3×12"], duration: "55 min" },
          { day: "Martes", isRest: false, label: "Espalda + Bíceps", muscles: ["back", "upper arms"], exercises: ["Jalón al pecho 4×10", "Remo barra 4×10", "Pullover 3×12", "Curl bíceps barra 4×10", "Curl predicador 3×12"], duration: "55 min" },
          { day: "Miércoles", isRest: false, label: "Hombros + Cuello", muscles: ["shoulders", "neck"], exercises: ["Press militar 4×10", "Elevaciones laterales 3×15", "Elevaciones frontales 3×12", "Pájaro posterior 3×15", "Encogimientos 3×15"], duration: "50 min" },
          { day: "Jueves", isRest: true },
          { day: "Viernes", isRest: false, label: "Piernas", muscles: ["upper legs", "lower legs"], exercises: ["Sentadilla 4×10", "Prensa de piernas 4×12", "Zancada 3×10/lado", "Curl femoral 3×12", "Pantorrillas 4×15"], duration: "60 min" },
          { day: "Sábado", isRest: false, label: "Core + Cardio", muscles: ["waist", "cardio"], exercises: ["Cardio LISS 20 min", "Plancha 4×40s", "Crunch 4×20", "Oblicuos 3×15/lado", "Elevación de piernas 3×15"], duration: "45 min" },
          { day: "Domingo", isRest: true },
        ],
      },
      {
        week: 2,
        focus: "Volumen — subir 1-2 series en ejercicios principales",
        days: [
          { day: "Lunes", isRest: false, label: "Pecho + Tríceps ↑", muscles: ["chest", "upper arms"], exercises: ["Press banca 5×10", "Press inclinado 4×12", "Aperturas 4×15", "Fondos 4×10", "Extensión tríceps 4×12"], duration: "65 min" },
          { day: "Martes", isRest: false, label: "Espalda + Bíceps ↑", muscles: ["back", "upper arms"], exercises: ["Jalón al pecho 5×10", "Remo barra 5×10", "Pullover 3×12", "Curl bíceps 5×10", "Predicador 3×12"], duration: "65 min" },
          { day: "Miércoles", isRest: false, label: "Hombros + Cuello ↑", muscles: ["shoulders", "neck"], exercises: ["Press militar 5×10", "Laterales 4×15", "Frontales 3×12", "Pájaro posterior 4×15", "Encogimientos 4×15"], duration: "60 min" },
          { day: "Jueves", isRest: true },
          { day: "Viernes", isRest: false, label: "Piernas ↑", muscles: ["upper legs", "lower legs"], exercises: ["Sentadilla 5×10", "Prensa 4×12", "Zancada 4×10/lado", "Curl femoral 4×12", "Pantorrillas 5×15"], duration: "70 min" },
          { day: "Sábado", isRest: false, label: "Core + Cardio ↑", muscles: ["waist", "cardio"], exercises: ["Cardio LISS 25 min", "Plancha 4×50s", "Crunch 4×25", "Oblicuos 4×15/lado", "Elev. piernas 4×15"], duration: "55 min" },
          { day: "Domingo", isRest: true },
        ],
      },
      {
        week: 3,
        focus: "Intensidad — menos reps, más peso, superseries en aislamiento",
        days: [
          { day: "Lunes", isRest: false, label: "Pecho + Tríceps 🔥", muscles: ["chest", "upper arms"], exercises: ["Press banca 5×6 (↑↑)", "Press inclinado 4×8 (↑)", "Apertura+Fondos superserie 3×12", "Extensión tríceps 4×10 (↑)"], duration: "60 min" },
          { day: "Martes", isRest: false, label: "Espalda + Bíceps 🔥", muscles: ["back", "upper arms"], exercises: ["Jalón pecho 5×6 (↑↑)", "Remo barra 5×8 (↑)", "Pullover 3×12", "Curl+Predicador superserie 4×10"], duration: "60 min" },
          { day: "Miércoles", isRest: false, label: "Hombros + Cuello 🔥", muscles: ["shoulders", "neck"], exercises: ["Press militar 5×8 (↑)", "Laterales 4×12", "Pájaro+Lateral superserie 3×15", "Encogimientos 4×12 (↑)"], duration: "55 min" },
          { day: "Jueves", isRest: true },
          { day: "Viernes", isRest: false, label: "Piernas 🔥", muscles: ["upper legs", "lower legs"], exercises: ["Sentadilla 5×6 (↑↑)", "Prensa 4×8 (↑)", "Zancada 4×8/lado (↑)", "Femoral 4×10 (↑)", "Pantorrillas 5×15 (↑)"], duration: "70 min" },
          { day: "Sábado", isRest: false, label: "Core + HIIT 🔥", muscles: ["waist", "cardio"], exercises: ["HIIT 15 min (20s on/10s off)", "Plancha 4×60s", "Crunch bicicleta 4×20", "Dragon flag 3×8", "Elev. piernas 4×15"], duration: "50 min" },
          { day: "Domingo", isRest: true },
        ],
      },
    ],
  },

  {
    id: "arnold-split",
    name: "Arnold Split",
    subtitle: "Ciclo 3 días on / 1 descanso",
    level: "avanzado",
    daysPerWeek: 6,
    structure: "Ciclo A/B/C/descanso — alta frecuencia por grupo",
    description:
      "El programa favorito de Arnold Schwarzenegger. Cada grupo muscular principal se entrena 2 veces/semana en ciclos de 4 días. Alta demanda de recuperación.",
    color: "#56766b",
    weeks: [
      {
        week: 1,
        focus: "Adaptación al volumen — 75% intensidad",
        days: [
          { day: "Día A", isRest: false, label: "Pecho + Espalda", muscles: ["chest", "back"], exercises: ["Press banca 5×8", "Press inclinado 4×10", "Aperturas 3×12", "Remo barra 5×8", "Jalón al pecho 4×10", "Pullover 3×12"], duration: "75 min" },
          { day: "Día B", isRest: false, label: "Hombros + Brazos", muscles: ["shoulders", "upper arms", "lower arms"], exercises: ["Press Arnold 5×8", "Laterales 4×12", "Curl bíceps 4×10", "Extensión tríceps 4×10", "Curl martillo 3×12", "Fondos 3×10"], duration: "70 min" },
          { day: "Día C", isRest: false, label: "Piernas + Core", muscles: ["upper legs", "lower legs", "waist"], exercises: ["Sentadilla 5×8", "Peso muerto 4×6", "Prensa 4×10", "Zancada 3×10/lado", "Pantorrillas 5×15", "Plancha 4×45s"], duration: "80 min" },
          { day: "Día D", isRest: true, note: "Descanso activo: cardio ligero 20-30 min o stretching" },
          { day: "Día A₂", isRest: false, label: "Pecho + Espalda", muscles: ["chest", "back"], exercises: ["Press banca inclinado 5×8", "Aperturas cable 4×12", "Remo mancuerna 5×8", "Dominadas 4×6-8", "Pullover mancuerna 3×12"], duration: "70 min" },
          { day: "Día B₂", isRest: false, label: "Hombros + Brazos", muscles: ["shoulders", "upper arms", "lower arms"], exercises: ["Press militar barra 5×8", "Pájaro posterior 4×12", "Curl predicador 4×10", "Tríceps polea 4×10", "Curl concentrado 3×12"], duration: "65 min" },
          { day: "Día D₂", isRest: true },
        ],
      },
      {
        week: 2,
        focus: "Volumen máximo — máximo número de series",
        days: [
          { day: "Día A", isRest: false, label: "Pecho + Espalda ↑↑", muscles: ["chest", "back"], exercises: ["Press banca 6×8", "Press inclinado 5×10", "Aperturas 4×12", "Remo barra 6×8", "Jalón pecho 5×10", "Pullover 4×12"], duration: "85 min" },
          { day: "Día B", isRest: false, label: "Hombros + Brazos ↑↑", muscles: ["shoulders", "upper arms", "lower arms"], exercises: ["Press Arnold 5×10", "Laterales 5×12", "Curl bíceps 5×10", "Tríceps 5×10", "Martillo 4×12", "Fondos 4×10"], duration: "80 min" },
          { day: "Día C", isRest: false, label: "Piernas + Core ↑↑", muscles: ["upper legs", "lower legs", "waist"], exercises: ["Sentadilla 6×8", "Peso muerto 5×6", "Prensa 5×10", "Zancada 4×10/lado", "Pantorrillas 5×15", "Core circuit 4×"], duration: "90 min" },
          { day: "Día D", isRest: true },
          { day: "Día A₂", isRest: false, label: "Pecho + Espalda ↑↑", muscles: ["chest", "back"], exercises: ["Press inclinado 6×8", "Aperturas 5×12", "Dominadas 5×6-8", "Remo mancuerna 5×10", "Pullover 4×12"], duration: "80 min" },
          { day: "Día B₂", isRest: false, label: "Hombros + Brazos ↑↑", muscles: ["shoulders", "upper arms", "lower arms"], exercises: ["Press militar 5×8", "Laterales+Frontal superset", "Predicador 5×10", "Polea tríceps 5×10", "Martillo 4×12"], duration: "75 min" },
          { day: "Día D₂", isRest: true },
        ],
      },
      {
        week: 3,
        focus: "Pico de intensidad — cargas máximas, técnica impecable",
        days: [
          { day: "Día A", isRest: false, label: "Pecho + Espalda 🔥", muscles: ["chest", "back"], exercises: ["Press banca 5×5 (PR)", "Press inclinado 4×8 (↑↑)", "Aperturas 3×12", "Remo barra 5×5 (PR)", "Jalón 4×8 (↑↑)", "Pullover 3×12"], duration: "80 min" },
          { day: "Día B", isRest: false, label: "Hombros + Brazos 🔥", muscles: ["shoulders", "upper arms", "lower arms"], exercises: ["Press Arnold 5×6 (↑↑)", "Laterales 4×10 (↑)", "Curl 5×6 (PR)", "Tríceps 5×6 (PR)", "Superseries finales 3×"], duration: "75 min" },
          { day: "Día C", isRest: false, label: "Piernas + Core 🔥", muscles: ["upper legs", "lower legs", "waist"], exercises: ["Sentadilla 5×5 (PR)", "Peso muerto 4×5 (PR)", "Prensa 4×8 (↑↑)", "Zancada pesada 4×8/lado", "Pantorrillas 5×12 (↑)", "Core superset 4×"], duration: "85 min" },
          { day: "Día D", isRest: true, note: "Descanso completo — el crecimiento ocurre aquí" },
          { day: "Día A₂", isRest: false, label: "Pecho + Espalda 🔥", muscles: ["chest", "back"], exercises: ["Press inclinado 5×5 (PR)", "Cable fly 4×10", "Dominadas lastradas 5×5 (PR)", "Remo mancuerna 4×8 (↑↑)", "Pullover 3×12"], duration: "80 min" },
          { day: "Día B₂", isRest: false, label: "Hombros + Brazos 🔥", muscles: ["shoulders", "upper arms", "lower arms"], exercises: ["Press militar 5×5 (PR)", "Pájaro 4×12", "Predicador 5×6 (PR)", "Polea tríceps 5×6 (PR)", "Martillo 3×10"], duration: "75 min" },
          { day: "Día D₂", isRest: true },
        ],
      },
    ],
  },
];

export const LEVEL_LABELS: Record<Level, string> = {
  principiante: "Principiante",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
};

export const MUSCLE_COLORS: Record<string, string> = {
  chest: "#d95435",
  back: "#56766b",
  shoulders: "#687076",
  "upper arms": "#d6a336",
  "lower arms": "#a83a24",
  "upper legs": "#56766b",
  "lower legs": "#687076",
  waist: "#d95435",
  cardio: "#a83a24",
  neck: "#687076",
  all: "#1b1f22",
};
