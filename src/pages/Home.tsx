import { Box } from "@mui/material";
import React from "react";
import ExerciseList from "../components/List/ExerciseList";
import HeroBanner from "../components/Banner/HeroBanner";
import SearchExercises from "../components/Search/SearchExercises";
import { fallbackExercises } from "../data/fallbackExercises";
import { Exercise } from "../types/exercises.types";

const Home = () => {
  const [exercises, setExercises] =
    React.useState<Exercise[]>(fallbackExercises);
  const [bodyPart, setBodyPart] = React.useState("all");

  return (
    <Box>
      <HeroBanner />
      <SearchExercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <ExerciseList
        setExercises={setExercises}
        exercises={exercises}
        bodyPart={bodyPart}
      />
    </Box>
  );
};

export default Home;
