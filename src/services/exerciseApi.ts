import { fallbackExercises } from "../data/fallbackExercises";
import { Exercise } from "../types/exercises.types";
import { fetchData } from "../utils/fetchData";

const EXERCISE_DB_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "/api/exercises-proxy"
    : "https://oss.exercisedb.dev/api/v1";
const PAGE_SIZE = 100;
const MAX_PAGES = 20;
const PAGE_DELAY_MS = 600;

type ExerciseDbExercise = {
  exerciseId: string;
  name: string;
  gifUrl: string;
  bodyParts: string[];
  equipments: string[];
  targetMuscles: string[];
  secondaryMuscles?: string[];
  instructions?: string[];
};

type ExerciseDbResponse = {
  success: boolean;
  meta?: {
    hasNextPage?: boolean;
    nextCursor?: string | null;
    total?: number;
  };
  data?: ExerciseDbExercise[];
};

type ExerciseDbDetailResponse = {
  success: boolean;
  data?: ExerciseDbExercise;
};

type ExerciseDbSearchResult = Pick<
  ExerciseDbExercise,
  "exerciseId" | "name" | "gifUrl"
>;

type ExerciseDbSearchResponse = {
  success: boolean;
  data?: ExerciseDbSearchResult[];
};

let catalogPromise: Promise<Exercise[] | null> | null = null;

const normalizeExercise = (exercise: ExerciseDbExercise): Exercise => ({
  id: exercise.exerciseId,
  name: exercise.name,
  bodyPart: exercise.bodyParts?.[0] ?? "full body",
  gifUrl: exercise.gifUrl ?? "",
  equipment: exercise.equipments?.[0] ?? "body weight",
  target: exercise.targetMuscles?.[0] ?? "general",
  instructions: exercise.instructions ?? [],
  secondaryMuscles: exercise.secondaryMuscles ?? [],
});

const buildPageUrl = (cursor?: string | null): string => {
  const params = new URLSearchParams({ limit: String(PAGE_SIZE) });

  if (cursor) {
    params.set("after", cursor);
  }

  return `${EXERCISE_DB_BASE_URL}/exercises?${params.toString()}`;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const fetchExerciseCatalog = async (): Promise<Exercise[] | null> => {
  const exercises: Exercise[] = [];
  let cursor: string | null | undefined;

  for (let page = 0; page < MAX_PAGES; page += 1) {
    if (page > 0) await sleep(PAGE_DELAY_MS);

    const response = await fetchData<ExerciseDbResponse>(buildPageUrl(cursor), {
      method: "GET",
    });

    const pageExercises = response?.data?.map(normalizeExercise) ?? [];
    exercises.push(...pageExercises);

    cursor = response?.meta?.nextCursor;

    if (!response?.meta?.hasNextPage || !cursor || pageExercises.length === 0) {
      break;
    }
  }

  return exercises.length ? exercises : null;
};

const fetchExerciseDetail = async (id: string): Promise<Exercise | null> => {
  const response = await fetchData<ExerciseDbDetailResponse>(
    `${EXERCISE_DB_BASE_URL}/exercises/${id}`,
    { method: "GET" }
  );

  return response?.data ? normalizeExercise(response.data) : null;
};

export const getExerciseCatalog = async (): Promise<Exercise[]> => {
  if (!catalogPromise) {
    catalogPromise = fetchExerciseCatalog();
  }

  return (await catalogPromise) ?? fallbackExercises;
};

export const getBodyParts = async (): Promise<string[]> => {
  const exercises = await getExerciseCatalog();
  return [
    "all",
    ...Array.from(new Set(exercises.map((exercise) => exercise.bodyPart))).sort(),
  ];
};

export const getExercisesByBodyPart = async (
  bodyPart: string
): Promise<Exercise[]> => {
  const exercises = await getExerciseCatalog();

  if (bodyPart === "all") {
    return exercises;
  }

  return exercises.filter((exercise) => exercise.bodyPart === bodyPart);
};

export const filterExercises = (
  exercises: Exercise[],
  searchTerm: string
): Exercise[] => {
  const normalizedTerm = searchTerm.trim().toLocaleLowerCase();

  if (!normalizedTerm) {
    return exercises;
  }

  return exercises.filter(
    (exercise) =>
      exercise.name.toLocaleLowerCase().includes(normalizedTerm) ||
      exercise.target.toLocaleLowerCase().includes(normalizedTerm) ||
      exercise.equipment.toLocaleLowerCase().includes(normalizedTerm) ||
      exercise.bodyPart.toLocaleLowerCase().includes(normalizedTerm) ||
      exercise.secondaryMuscles?.some((muscle) =>
        muscle.toLocaleLowerCase().includes(normalizedTerm)
      )
  );
};

export const searchExerciseCatalog = async (
  exercises: Exercise[],
  searchTerm: string
): Promise<Exercise[]> => {
  const normalizedTerm = searchTerm.trim();

  if (!normalizedTerm) {
    return exercises;
  }

  const response = await fetchData<ExerciseDbSearchResponse>(
    `${EXERCISE_DB_BASE_URL}/exercises/search?search=${encodeURIComponent(
      normalizedTerm
    )}`,
    { method: "GET" }
  );

  const resultIds = response?.data
    ?.map((exercise) => exercise.exerciseId)
    .filter(Boolean)
    .slice(0, 24);

  if (resultIds?.length) {
    const hydratedExercises = await Promise.all(
      resultIds.map((exerciseId) => fetchExerciseDetail(exerciseId))
    );
    const remoteResults = hydratedExercises.filter(
      (exercise): exercise is Exercise => Boolean(exercise)
    );

    if (remoteResults.length) {
      return remoteResults;
    }
  }

  return filterExercises(exercises, normalizedTerm);
};

export const getExerciseById = async (id?: string): Promise<Exercise | null> => {
  if (id && !id.startsWith("fallback-")) {
    const exercise = await fetchExerciseDetail(id);

    if (exercise) {
      return exercise;
    }
  }

  const exercises = await getExerciseCatalog();
  return exercises.find((exercise) => exercise.id === id) ?? exercises[0] ?? null;
};

export const getSimilarByTarget = async (
  target: string,
  currentId?: string
): Promise<Exercise[]> => {
  const exercises = await getExerciseCatalog();
  return exercises.filter(
    (exercise) => exercise.target === target && exercise.id !== currentId
  );
};

export const getSimilarByEquipment = async (
  equipment: string,
  currentId?: string
): Promise<Exercise[]> => {
  const exercises = await getExerciseCatalog();
  return exercises.filter(
    (exercise) => exercise.equipment === equipment && exercise.id !== currentId
  );
};
