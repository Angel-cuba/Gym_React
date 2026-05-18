import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import HorizontalScrollbar from "../HorizontalScrollbar";
import { Exercise } from "../../types/exercises.types";

/**
 * A component that renders a list of similar exercises and equipment.
 *
 * @param {{ similarsTarget: Exercise[] | null; equipment: Exercise[] | null; }} props
 * @returns {JSX.Element}
 */
const Similars = ({
  similarsTarget,
  equipment,
}: {
  similarsTarget: Exercise[] | null;
  equipment: Exercise[] | null;
}): JSX.Element => {
  return (
    <Box component="section" className="similar-section">
      <Typography className="section-title" align="center">
        Ejercicios similares
      </Typography>
      <Stack className="similar-block">
        {similarsTarget?.length ? (
          <HorizontalScrollbar
            data={similarsTarget}
            bodyPart=""
            setBodyPart={() => {}}
            setExercises={() => {}}
            isBodyParts={false}
          />
        ) : (
          <Typography className="empty-state" textAlign="center">
            No hay ejercicios similares disponibles.
          </Typography>
        )}
      </Stack>
      <Stack className="similar-block">
        <Typography className="eyebrow" align="center">
          Mismo equipo
        </Typography>
        {equipment?.length ? (
          <HorizontalScrollbar
            data={equipment}
            bodyPart=""
            setBodyPart={() => {}}
            setExercises={() => {}}
            isBodyParts={false}
          />
        ) : (
          <Typography className="empty-state" textAlign="center">
            No hay alternativas con este equipo.
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default Similars;
