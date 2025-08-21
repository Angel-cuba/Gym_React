import React from "react";
import { Stack, Typography } from "@mui/material";
import Icon from "../../assets/icons/gym.png";

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
      //  type="button"
      alignItems="center"
      justifyContent="center"
      className="bodyPart-card"
      onClick={() => {
        setBodyPart(item);
        window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });
      }}
    >
      <img
        src={Icon}
        alt="dumbbell"
        style={{
          backgroundColor: bodyPart === item ? "#f9979712" : "#fff",
          borderBottomLeftRadius: "2px",
          width: "50px",
          height: "60px",
          cursor: "pointer",
          padding: "2px",
          boxShadow: bodyPart === item ? "0px 0px 5px 1px #ff000050" : " ",
        }}
      />
      <Typography
        fontWeight="bold"
        color={bodyPart === item ? "#ff2625" : "#501a1a"}
        textTransform="uppercase"
      >
        {item}
      </Typography>
    </Stack>
  );
};

export default BodyPart;
