import React from "react";
import { Stack, Typography } from "@mui/material";

/**
 * A component that renders a body part card.
 *
 * @param {{ item: string, bodyPart: string, setBodyPart: (bodyPart: string) => void }} props
 * @returns {JSX.Element}
 */
const BodyPart = ({
  item,
  bodyPart,
  setBodyPart,
}: {
  item: string;
  bodyPart: string;
  setBodyPart: (bodyPart: string) => void;
}): JSX.Element => {
  return (
    <Stack
      component="button"
      alignItems="center"
      justifyContent="center"
      className={`bodyPart-card ${bodyPart === item ? "active" : ""}`}
      onClick={() => {
        setBodyPart(item);
        document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <span className="bodyPart-icon" aria-hidden="true">
        {item === "all" ? "A" : item.charAt(0)}
      </span>
      <Typography
        className="bodyPart-label"
        textTransform="capitalize"
      >
        {item}
      </Typography>
    </Stack>
  );
};

export default BodyPart;
