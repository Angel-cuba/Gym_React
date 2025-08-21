import React from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Stack, Typography } from "@mui/material";
import ExerciseCard from "../Search/Card/Card.Exercise";
import { Exercise } from "../../types/exercises.types";
import { exerciseOptions, fetchData } from "../../utils/fetchData";

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

    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  React.useEffect(() => {
    const fetch = async () => {
      let exerciseData: Exercise[] = [];
      if (bodyPart === "back") {
        exerciseData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises",
          exerciseOptions
        );
      } else {
        exerciseData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          exerciseOptions
        );
      }
      setExercises(exerciseData);
    };
    fetch();
  }, [bodyPart, setExercises]);

  return (
    <Box
      id="exercises"
      sx={{ mt: { lg: "110px", xs: "30px" } }}
      mt={"50px"}
      p={"20px"}
    >
      <Typography variant="h3" mb="45px">
        Showing results
      </Typography>
      <Stack
        direction="row"
        sx={{ gap: { lg: "110px", xs: "50px" } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {!currentExercises?.length ? (
          <Typography variant="h4">No exercises found</Typography>
        ) : (
          currentExercises?.map((exercise: Exercise, index: number) => {
            return <ExerciseCard key={index} exercise={exercise} />;
          })
        )}
      </Stack>
      <Stack mt="100px" alignItems="center">
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
