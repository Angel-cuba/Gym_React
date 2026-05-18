import React from "react";
import BodyPartImage from "../../assets/icons/body-part.png";
import TargetImage from "../../assets/icons/target.png";
import EquipmentImage from "../../assets/icons/equipment.png";
import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Exercise } from "../../types/exercises.types";

/**
 * A component to display exercise details.
 *
 * @param {{ exerciseDetails: Exercise | null }} props
 * @returns {JSX.Element}
 */
const Details = ({
  exerciseDetails,
}: {
  exerciseDetails: Exercise | null;
}): JSX.Element => {
  const { t } = useTranslation();

  if (!exerciseDetails) {
    return (
      <Box className="details-section">
        <Typography className="empty-state">{t("details.loading")}</Typography>
      </Box>
    );
  }

  const smallDetails = [
    {
      icon: BodyPartImage,
      name: exerciseDetails.name,
    },
    {
      icon: TargetImage,
      name: exerciseDetails.target,
    },
    {
      icon: EquipmentImage,
      name: exerciseDetails.equipment,
    },
  ];
  return (
    <Stack
      className="details-section"
      sx={{ flexDirection: { lg: "row" }, alignItems: "center" }}
    >
      <Box className="details-media">
        {exerciseDetails.gifUrl ? (
          <img
            src={exerciseDetails.gifUrl}
            alt={exerciseDetails.name}
            loading="lazy"
            className="detail-image"
          />
        ) : (
          <span>{exerciseDetails.name.slice(0, 2).toUpperCase()}</span>
        )}
      </Box>
      <Stack className="details-copy">
        <Typography className="eyebrow">{exerciseDetails.bodyPart}</Typography>
        <Typography component="h1" className="details-title">
          {exerciseDetails.name[0].toUpperCase() +
            exerciseDetails.name.slice(1)}
        </Typography>
        <Typography className="muted-copy">
          {t("details.description", {
            name:
              exerciseDetails.name[0].toUpperCase() +
              exerciseDetails.name.slice(1),
            target: exerciseDetails.target,
            bodyPart: exerciseDetails.bodyPart,
          })}
        </Typography>
        <Stack className="detail-metadata">
          {smallDetails.map((detail, index) => {
            return (
              <Stack
                key={index}
                direction="row"
                className="detail-pill"
                alignItems="center"
              >
                <span>
                  <img src={detail.icon} alt={detail.name} />
                </span>
                <Typography textTransform="capitalize">
                  {detail.name}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
        {!!exerciseDetails.instructions?.length && (
          <Stack className="instructions-panel">
            <Typography className="eyebrow">{t("details.instructions")}</Typography>
            {exerciseDetails.instructions.slice(0, 6).map((instruction) => (
              <Typography key={instruction} className="instruction-copy">
                {instruction.replace(/^Step:\d+\s*/i, "")}
              </Typography>
            ))}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Details;
