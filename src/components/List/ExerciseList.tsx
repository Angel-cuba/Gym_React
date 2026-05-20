import React from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import ExerciseCard, { cardItemVariant } from "../Search/Card/Card.Exercise";
import { Exercise } from "../../types/exercises.types";
import {
  getExercisesByBodyPart,
} from "../../services/exerciseApi";
import { fallbackExercises } from "../../data/fallbackExercises";

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
      setExercises(exerciseData.length ? exerciseData : fallbackExercises);
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
        <Typography className="eyebrow">Resultados</Typography>
        <Typography className="section-title">
          {bodyPart === "all" ? "Todos los ejercicios" : `Ejercicios para ${bodyPart}`}
        </Typography>
        <Typography className="muted-copy">
          {exercises.length} movimientos disponibles
        </Typography>
      </Stack>
      <motion.div
        className="exercise-grid"
        key={`${bodyPart}-${currentPage}-${exercises.length}`}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
        }}
        initial="hidden"
        animate="show"
      >
        {isLoading ? (
          <Typography className="empty-state">Cargando ejercicios...</Typography>
        ) : !currentExercises?.length ? (
          <Typography className="empty-state">No se encontraron ejercicios.</Typography>
        ) : (
          currentExercises?.map((exercise: Exercise, index: number) => (
            <motion.div key={exercise.id || index} variants={cardItemVariant}>
              <ExerciseCard exercise={exercise} />
            </motion.div>
          ))
        )}
      </motion.div>
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
