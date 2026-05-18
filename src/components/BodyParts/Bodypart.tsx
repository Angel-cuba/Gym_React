import React, { useState } from "react";
import { motion } from "framer-motion";
import { MuscleIcon } from "./MuscleIcons";
import { bodyPartCardImages } from "../../data/fallbackImages";

const BodyPart = ({
  item,
  bodyPart,
  setBodyPart,
}: {
  item: string;
  bodyPart: string;
  setBodyPart: (bodyPart: string) => void;
}): JSX.Element => {
  const isActive = bodyPart === item;
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const bgUrl = bodyPartCardImages[item.toLowerCase()];
  const showPhoto = !!bgUrl && imgLoaded && !imgError;

  return (
    <motion.button
      className={`bodyPart-card ${isActive ? "active" : ""}`}
      onClick={() => {
        setBodyPart(item);
        document.getElementById("exercises")?.scrollIntoView({ behavior: "smooth" });
      }}
      whileHover={{ y: -5, scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
    >
      {/* Preload background image */}
      {bgUrl && !imgError && (
        <img
          src={bgUrl}
          alt=""
          aria-hidden
          style={{ display: "none" }}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
        />
      )}

      {/* Photo background */}
      {showPhoto && (
        <div
          className="bodyPart-bg-photo"
          style={{ backgroundImage: `url(${bgUrl})` }}
        />
      )}

      {/* Gradient overlay */}
      <div className={`bodyPart-overlay ${showPhoto ? "bodyPart-overlay--photo" : ""}`} />

      {/* SVG muscle illustration */}
      <div className={`bodyPart-svg-wrap ${showPhoto ? "bodyPart-svg-wrap--photo" : ""}`}>
        <MuscleIcon name={item} active={isActive || showPhoto} />
      </div>

      <span className="bodyPart-label">{item}</span>
    </motion.button>
  );
};

export default BodyPart;
