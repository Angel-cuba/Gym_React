import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <Box component="section" className="similar-section">
      <Typography className="section-title" align="center">
        {t("similars.title")}
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
            {t("similars.emptyTarget")}
          </Typography>
        )}
      </Stack>
      <Stack className="similar-block">
        <Typography className="eyebrow" align="center">
          {t("similars.sameEquipment")}
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
            {t("similars.emptyEquipment")}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default Similars;
