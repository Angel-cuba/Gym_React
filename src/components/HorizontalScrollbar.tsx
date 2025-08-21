import React from "react";
import { Box } from "@mui/material";

import ExerciseCard from "./Search/Card/Card.Exercise";
import Loader from "./Loader";
import BodyPart from "./BodyParts/BodyPart";
import { Exercise } from "../types/exercises.types";

/**
 * A horizontal scrollbar component to render a list of exercises or body parts.
 *
 * @param {{ data: Exercise[] | string[]; bodyPart: string; setBodyPart: (bodyPart: string) => void; setExercises: (exercises: Exercise[]) => void; isBodyParts: boolean; similarsTarget?: boolean; equipment?: boolean }} props
 * @returns {JSX.Element}
 */
const HorizontalScrollbar = ({
  data,
  bodyPart,
  setBodyPart,
  setExercises,
  isBodyParts,
  similarsTarget,
  equipment,
}: {
  data: Exercise[] | string[];
  bodyPart: string;
  setBodyPart: (bodyPart: string) => void;
  setExercises: (exercises: Exercise[]) => void;
  isBodyParts: boolean;
  similarsTarget?: boolean;
  equipment?: boolean;
}): JSX.Element => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexWrap: "wrap",
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      {!data ? (
        <Loader />
      ) : Array.isArray(data) ? (
        data
          .slice(0, data.length > 11 ? 12 : data.length)
          .map((item: Exercise | string, index: number) => (
            <Box
              key={index}
              title={typeof item === "object" && "id" in item ? item.id : item}
              m="0 20px"
              p="10px"
              style={{
                borderRadius: "2px",
                borderTop: bodyPart === item ? "2px solid #ff2625" : " ",
              }}
            >
              {isBodyParts ? (
                <BodyPart
                  item={item as string}
                  bodyPart={bodyPart}
                  setBodyPart={setBodyPart}
                />
              ) : (
                <ExerciseCard exercise={item as Exercise} />
              )}
            </Box>
          ))
      ) : null}
    </div>
  );
};

export default HorizontalScrollbar;
