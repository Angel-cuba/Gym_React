import React from "react";
import { Link } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import { Exercise } from "../../../types/exercises.types";

/**
 * A component to render a card for an exercise.
 *
 * @param {{ exercise: Exercise }} props - The exercise data to render.
 * @returns {JSX.Element} - The rendered card.
 */
const ExerciseCard = ({ exercise }: { exercise: Exercise }): JSX.Element => {
  const initials = exercise.name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
      <Box className="exercise-media">
        {exercise.gifUrl ? (
          <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
        ) : (
          <span>{initials}</span>
        )}
      </Box>
      <Stack direction="row" className="exercise-tags">
        <span>
          {exercise.bodyPart}
        </span>
        <span>
          {exercise.target}
        </span>
      </Stack>
      <Typography
        className="exercise-title"
        textTransform="capitalize"
      >
        {exercise.name}
      </Typography>
    </Link>
  );
};

export default ExerciseCard;
