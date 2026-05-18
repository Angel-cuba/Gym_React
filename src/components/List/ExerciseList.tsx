import React from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ExerciseCard from "../Search/Card/Card.Exercise";
import { Exercise } from "../../types/exercises.types";
import { getExercisesByBodyPart } from "../../services/exerciseApi";

/**
 * A component to display a list of exercises.
 *
 * @param {{ exercises: Exercise[]; bodyPart: string; setExercises: (exercises: Exercise[]) => void; }} props
 * @returns {JSX.Element}
 */
const ExerciseList = ({
  exercises,
  bodyPart,
  setExercises,
}: {
  exercises: Exercise[];
  bodyPart: string;
  setExercises: (exercises: Exercise[]) => void;
}): JSX.Element => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const exercisePerPage = 12;
  const indexOfLastExercise = currentPage * exercisePerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisePerPage;
  const currentExercises = Array.isArray(exercises)
    ? exercises.slice(indexOfFirstExercise, indexOfLastExercise)
    : [];

  /**
   * Handles pagination by changing the current page state and scrolling to the top.
   *
   * @param {React.ChangeEvent<unknown>, value: number} e - The pagination event
   * @param {number} value - The new current page
   */
  const paginate = (e: React.ChangeEvent<unknown>, value: number): void => {
    setCurrentPage(value);

    document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    const fetchExercises = async () => {
      setIsLoading(true);
      const exerciseData = await getExercisesByBodyPart(bodyPart);

      setExercises(exerciseData);
      setCurrentPage(1);
      setIsLoading(false);
    };

    fetchExercises();
  }, [bodyPart, setExercises]);

  return (
    <Box
      id="exercises"
      component="section"
      className="exercise-section"
    >
      <Stack className="section-heading">
        <Typography className="eyebrow">{t("exercises.eyebrow")}</Typography>
        <Typography className="section-title">
          {bodyPart === "all"
            ? t("exercises.allTitle")
            : t("exercises.byBodyPart", { bodyPart })}
        </Typography>
        <Typography className="muted-copy">
          {t("exercises.count", { count: exercises.length })}
        </Typography>
      </Stack>
      <Stack className="exercise-grid">
        {isLoading ? (
          <Typography className="empty-state">{t("exercises.loading")}</Typography>
        ) : !currentExercises?.length ? (
          <Typography className="empty-state">{t("exercises.empty")}</Typography>
        ) : (
          currentExercises?.map((exercise: Exercise, index: number) => {
            return <ExerciseCard key={exercise.id || index} exercise={exercise} />;
          })
        )}
      </Stack>
      <Stack mt="48px" alignItems="center">
        {exercises?.length > 10 && (
          <Pagination
            color="standard"
            shape="rounded"
            count={Math.ceil(exercises.length / exercisePerPage)}
            defaultPage={1}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default ExerciseList;
