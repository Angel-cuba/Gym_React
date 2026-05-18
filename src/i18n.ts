import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const languages = [
  { code: "es", label: "ES", name: "Español" },
  { code: "en", label: "EN", name: "English" },
  { code: "it", label: "IT", name: "Italiano" },
] as const;

export type LanguageCode = (typeof languages)[number]["code"];

const resources = {
  es: {
    translation: {
      brandAlt: "Fitness Club",
      nav: {
        home: "Inicio",
        search: "Buscar",
        exercises: "Ejercicios",
      },
      hero: {
        eyebrow: "Fitness Club",
        title: "Entrena con intención, sin ruido.",
        text: "Busca ejercicios, filtra por zona del cuerpo y abre rutinas visuales para moverte mejor desde el primer set.",
        explore: "Explorar ejercicios",
        searchRoutine: "Buscar rutina",
        statExercises: "ejercicios base",
        statZones: "zonas clave",
        statFocus: "distracciones",
        imageAlt: "Atleta entrenando con bandas",
      },
      search: {
        eyebrow: "Biblioteca de ejercicios",
        title: "Encuentra el movimiento correcto para entrenar mejor.",
        placeholder: "Buscar por ejercicio, objetivo o equipo",
        button: "Buscar",
        searching: "Buscando",
      },
      exercises: {
        eyebrow: "Resultados",
        allTitle: "Todos los ejercicios",
        byBodyPart: "Ejercicios para {{bodyPart}}",
        count: "{{count}} movimientos disponibles",
        loading: "Cargando ejercicios...",
        empty: "No se encontraron ejercicios.",
        all: "Todos",
      },
      details: {
        loading: "Cargando detalle...",
        description:
          "{{name}} trabaja principalmente {{target}}. Úsalo para fortalecer {{bodyPart}}, mejorar control y sumar energía a tu rutina.",
        instructions: "Instrucciones",
      },
      videos: {
        title: "Videos de {{name}}",
        fallbackName: "este ejercicio",
        empty: "No hay videos disponibles por ahora.",
      },
      similars: {
        title: "Ejercicios similares",
        emptyTarget: "No hay ejercicios similares disponibles.",
        sameEquipment: "Mismo equipo",
        emptyEquipment: "No hay alternativas con este equipo.",
      },
      footer: "Hecho para entrenar con foco. Proyecto por Angel.",
      language: {
        label: "Idioma",
      },
      loading: "Cargando entrenamientos...",
    },
  },
  en: {
    translation: {
      brandAlt: "Fitness Club",
      nav: {
        home: "Home",
        search: "Search",
        exercises: "Exercises",
      },
      hero: {
        eyebrow: "Fitness Club",
        title: "Train with intention, without noise.",
        text: "Search exercises, filter by body area, and open visual routines to move better from the first set.",
        explore: "Explore exercises",
        searchRoutine: "Search routine",
        statExercises: "base exercises",
        statZones: "key zones",
        statFocus: "distractions",
        imageAlt: "Athlete training with bands",
      },
      search: {
        eyebrow: "Exercise library",
        title: "Find the right movement to train better.",
        placeholder: "Search by exercise, target, or equipment",
        button: "Search",
        searching: "Searching",
      },
      exercises: {
        eyebrow: "Results",
        allTitle: "All exercises",
        byBodyPart: "Exercises for {{bodyPart}}",
        count: "{{count}} movements available",
        loading: "Loading exercises...",
        empty: "No exercises found.",
        all: "All",
      },
      details: {
        loading: "Loading details...",
        description:
          "{{name}} mainly targets {{target}}. Use it to strengthen {{bodyPart}}, improve control, and add energy to your routine.",
        instructions: "Instructions",
      },
      videos: {
        title: "Videos for {{name}}",
        fallbackName: "this exercise",
        empty: "No videos available right now.",
      },
      similars: {
        title: "Similar exercises",
        emptyTarget: "No similar exercises available.",
        sameEquipment: "Same equipment",
        emptyEquipment: "No alternatives with this equipment.",
      },
      footer: "Made for focused training. Project by Angel.",
      language: {
        label: "Language",
      },
      loading: "Loading workouts...",
    },
  },
  it: {
    translation: {
      brandAlt: "Fitness Club",
      nav: {
        home: "Home",
        search: "Cerca",
        exercises: "Esercizi",
      },
      hero: {
        eyebrow: "Fitness Club",
        title: "Allenati con intenzione, senza rumore.",
        text: "Cerca esercizi, filtra per zona del corpo e apri routine visive per muoverti meglio dal primo set.",
        explore: "Esplora esercizi",
        searchRoutine: "Cerca routine",
        statExercises: "esercizi base",
        statZones: "zone chiave",
        statFocus: "distrazioni",
        imageAlt: "Atleta che si allena con elastici",
      },
      search: {
        eyebrow: "Libreria esercizi",
        title: "Trova il movimento giusto per allenarti meglio.",
        placeholder: "Cerca per esercizio, obiettivo o attrezzatura",
        button: "Cerca",
        searching: "Ricerca",
      },
      exercises: {
        eyebrow: "Risultati",
        allTitle: "Tutti gli esercizi",
        byBodyPart: "Esercizi per {{bodyPart}}",
        count: "{{count}} movimenti disponibili",
        loading: "Caricamento esercizi...",
        empty: "Nessun esercizio trovato.",
        all: "Tutti",
      },
      details: {
        loading: "Caricamento dettagli...",
        description:
          "{{name}} lavora principalmente su {{target}}. Usalo per rafforzare {{bodyPart}}, migliorare il controllo e dare energia alla tua routine.",
        instructions: "Istruzioni",
      },
      videos: {
        title: "Video per {{name}}",
        fallbackName: "questo esercizio",
        empty: "Nessun video disponibile al momento.",
      },
      similars: {
        title: "Esercizi simili",
        emptyTarget: "Nessun esercizio simile disponibile.",
        sameEquipment: "Stessa attrezzatura",
        emptyEquipment: "Nessuna alternativa con questa attrezzatura.",
      },
      footer: "Creato per allenarsi con focus. Progetto di Angel.",
      language: {
        label: "Lingua",
      },
      loading: "Caricamento allenamenti...",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es",
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
