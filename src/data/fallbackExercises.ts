import { Exercise } from "../types/exercises.types";

export const fallbackExercises: Exercise[] = [
  {
    id: "fallback-push-up",
    name: "push up",
    bodyPart: "chest",
    gifUrl: "",
    equipment: "body weight",
    target: "pectorals",
  },
  {
    id: "fallback-squat",
    name: "bodyweight squat",
    bodyPart: "upper legs",
    gifUrl: "",
    equipment: "body weight",
    target: "quads",
  },
  {
    id: "fallback-plank",
    name: "front plank",
    bodyPart: "waist",
    gifUrl: "",
    equipment: "body weight",
    target: "abs",
  },
  {
    id: "fallback-lunge",
    name: "walking lunge",
    bodyPart: "upper legs",
    gifUrl: "",
    equipment: "body weight",
    target: "glutes",
  },
  {
    id: "fallback-pull-up",
    name: "pull up",
    bodyPart: "back",
    gifUrl: "",
    equipment: "bar",
    target: "lats",
  },
  {
    id: "fallback-crunch",
    name: "crunch",
    bodyPart: "waist",
    gifUrl: "",
    equipment: "body weight",
    target: "abs",
  },
  {
    id: "fallback-shoulder-press",
    name: "dumbbell shoulder press",
    bodyPart: "shoulders",
    gifUrl: "",
    equipment: "dumbbell",
    target: "delts",
  },
  {
    id: "fallback-bicep-curl",
    name: "dumbbell bicep curl",
    bodyPart: "upper arms",
    gifUrl: "",
    equipment: "dumbbell",
    target: "biceps",
  },
  {
    id: "fallback-tricep-dip",
    name: "bench tricep dip",
    bodyPart: "upper arms",
    gifUrl: "",
    equipment: "bench",
    target: "triceps",
  },
  {
    id: "fallback-calf-raise",
    name: "standing calf raise",
    bodyPart: "lower legs",
    gifUrl: "",
    equipment: "body weight",
    target: "calves",
  },
  {
    id: "fallback-burpee",
    name: "burpee",
    bodyPart: "cardio",
    gifUrl: "",
    equipment: "body weight",
    target: "cardiovascular system",
  },
  {
    id: "fallback-hip-thrust",
    name: "hip thrust",
    bodyPart: "upper legs",
    gifUrl: "",
    equipment: "body weight",
    target: "glutes",
  },
];

export const fallbackBodyParts = [
  "all",
  ...Array.from(new Set(fallbackExercises.map((exercise) => exercise.bodyPart))),
];

export const getFallbackExercisesByBodyPart = (bodyPart: string): Exercise[] => {
  if (bodyPart === "all") {
    return fallbackExercises;
  }

  return fallbackExercises.filter((exercise) => exercise.bodyPart === bodyPart);
};

export const getFallbackExerciseById = (id?: string): Exercise | null =>
  fallbackExercises.find((exercise) => exercise.id === id) ?? fallbackExercises[0];
