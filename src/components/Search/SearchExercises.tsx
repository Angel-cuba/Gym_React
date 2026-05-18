import React from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { fetchData, exerciseOptions } from "../../utils/fetchData";
import HorizontalScrollbar from "../HorizontalScrollbar";
import {
  fallbackBodyParts,
  fallbackExercises,
} from "../../data/fallbackExercises";
import { Exercise } from "../../types/exercises.types";

/**
 * A search bar component to search for exercises.
 *
 * @param {{
 *   setExercises: (exercises: Exercise[]) => void;
 *   bodyPart: string;
 *   setBodyPart: (bodyPart: string) => void;
 * }} props
 * @returns {JSX.Element}
 */
const SearchExercises = ({
  setExercises,
  bodyPart,
  setBodyPart,
}: {
  setExercises: (exercises: Exercise[]) => void;
  bodyPart: string;
  setBodyPart: (bodyPart: string) => void;
}): JSX.Element => {
  const [search, setSearch] = React.useState<string>("");
  const [bodyParts, setBodyParts] = React.useState<string[]>(fallbackBodyParts);
  const [allExercises, setAllExercises] =
    React.useState<Exercise[]>(fallbackExercises);

  React.useEffect(() => {
    const fetchExercises = async (): Promise<void> => {
      const response = await fetchData<string[]>(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exerciseOptions
      );
      setBodyParts(["all", ...(response?.length ? response : fallbackBodyParts.slice(1))]);

      const exercises = await fetchData<Exercise[]>(
        "https://exercisedb.p.rapidapi.com/exercises",
        exerciseOptions
      );
      setAllExercises(exercises?.length ? exercises : fallbackExercises);
    };

    fetchExercises();
  }, []);

  const handleSearch = (event?: React.FormEvent<HTMLFormElement>): void => {
    event?.preventDefault();
    const searchTerm = search.trim().toLocaleLowerCase();

    if (!searchTerm) {
      setExercises(allExercises);
      setBodyPart("all");
      return;
    }

    const filteredExercises = allExercises.filter(
      (exercise: Exercise) =>
        exercise.name.toLocaleLowerCase().includes(searchTerm) ||
        exercise.target.toLocaleLowerCase().includes(searchTerm) ||
        exercise.equipment.toLocaleLowerCase().includes(searchTerm) ||
        exercise.bodyPart.toLocaleLowerCase().includes(searchTerm)
    );

    setBodyPart("all");
    setExercises(filteredExercises);
  };

  return (
    <Stack id="search" className="search-section" alignItems="center">
      <Typography className="eyebrow" textAlign="center">
        Biblioteca de ejercicios
      </Typography>
      <Typography className="section-title" textAlign="center">
        Encuentra el movimiento correcto para entrenar mejor.
      </Typography>
      <Box component="form" className="search-form" onSubmit={handleSearch}>
        <TextField
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "18px",
              backgroundColor: "#fff",
            },
          }}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por ejercicio, objetivo o equipo"
          type="search"
          variant="outlined"
        />
        <Button className="primary-button" type="submit" variant="contained">
          Buscar
        </Button>
      </Box>
      <Box className="body-parts-panel">
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          setExercises={setExercises}
          isBodyParts
        />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
