import React from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import HorizontalScrollbar from "../HorizontalScrollbar";
import {
  fallbackBodyParts,
  fallbackExercises,
} from "../../data/fallbackExercises";
import {
  getBodyParts,
  getExerciseCatalog,
  searchExerciseCatalog,
} from "../../services/exerciseApi";
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
  const { t } = useTranslation();
  const [search, setSearch] = React.useState<string>("");
  const [bodyParts, setBodyParts] = React.useState<string[]>(fallbackBodyParts);
  const [allExercises, setAllExercises] =
    React.useState<Exercise[]>(fallbackExercises);
  const [isSearching, setIsSearching] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchExercises = async (): Promise<void> => {
      const [parts, exercises] = await Promise.all([
        getBodyParts(),
        getExerciseCatalog(),
      ]);

      setBodyParts(parts.length ? parts : fallbackBodyParts);
      setAllExercises(exercises.length ? exercises : fallbackExercises);
    };

    fetchExercises();
  }, []);

  const handleSearch = async (
    event?: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event?.preventDefault();
    const searchTerm = search.trim().toLocaleLowerCase();

    if (!searchTerm) {
      setExercises(allExercises);
      setBodyPart("all");
      return;
    }

    setIsSearching(true);
    setBodyPart("all");
    try {
      const results = await searchExerciseCatalog(allExercises, searchTerm);
      setExercises(results);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Stack id="search" className="search-section" alignItems="center">
      <Typography className="eyebrow" textAlign="center">
        {t("search.eyebrow")}
      </Typography>
      <Typography className="section-title" textAlign="center">
        {t("search.title")}
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
          placeholder={t("search.placeholder")}
          type="search"
          variant="outlined"
        />
        <Button
          className="primary-button"
          type="submit"
          variant="contained"
          disabled={isSearching}
        >
          {isSearching ? t("search.searching") : t("search.button")}
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
