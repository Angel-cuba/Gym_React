import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Exercise } from "../../../types/exercises.types";
import { MuscleIcon } from "../../BodyParts/MuscleIcons";
import { getExerciseFallbackImage } from "../../../data/fallbackImages";
import { useAuth } from "../../../context/AuthContext";
import { useFavorites } from "../../../context/FavoritesContext";

export const cardItemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.44, ease: [0.16, 1, 0.3, 1] as const },
  },
};

type ImageState = "loading" | "ok" | "fallback" | "svg";

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ExerciseCard = ({ exercise }: { exercise: Exercise }): JSX.Element => {
  const fallbackSrc = getExerciseFallbackImage(exercise.bodyPart, exercise.id ?? "");
  const [state, setState] = useState<ImageState>(exercise.gifUrl ? "loading" : "fallback");

  const { user, openLoginModal } = useAuth();
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(exercise.id ?? "");

  const src =
    state === "loading" || state === "ok"
      ? exercise.gifUrl
      : state === "fallback"
      ? fallbackSrc
      : null;

  const handleFav = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { openLoginModal(); return; }
    await toggle({
      id: exercise.id ?? "",
      name: exercise.name,
      bodyPart: exercise.bodyPart,
      gifUrl: exercise.gifUrl ?? "",
    });
  };

  return (
    <Link className="ex-card" to={`/exercise/${exercise.id}`}>
      <motion.div className="ex-card__media" whileHover="hovered" initial="rest">
        {src ? (
          <motion.img
            key={src}
            src={src}
            alt={exercise.name}
            loading="lazy"
            className="ex-card__img"
            onLoad={() => { if (state === "loading") setState("ok"); }}
            onError={() => {
              if (state === "loading" || state === "ok") setState("fallback");
              else setState("svg");
            }}
            variants={{ rest: { scale: 1 }, hovered: { scale: 1.06 } }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          />
        ) : (
          <div className="ex-fallback">
            <div className="ex-fallback__svg" aria-hidden>
              <MuscleIcon name={exercise.bodyPart} active={false} />
            </div>
            <span className="ex-fallback__chip">{exercise.target}</span>
          </div>
        )}

        <motion.button
          className={`fav-btn${fav ? " fav-btn--active" : ""}`}
          aria-label={fav ? "Quitar de favoritos" : "Añadir a favoritos"}
          onClick={handleFav}
          whileTap={{ scale: 0.88 }}
          transition={{ duration: 0.12 }}
        >
          <HeartIcon filled={fav} />
        </motion.button>

        <motion.div
          className="ex-card__cta"
          variants={{ rest: { opacity: 0, y: 10 }, hovered: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Ver ejercicio →
        </motion.div>
      </motion.div>

      <div className="ex-card__body">
        <div className="ex-card__tags">
          <span className="ex-tag ex-tag--muscle">{exercise.bodyPart}</span>
          <span className="ex-tag ex-tag--target">{exercise.target}</span>
        </div>
        <p className="ex-card__name">{exercise.name}</p>
        <p className="ex-card__equip">{exercise.equipment}</p>
      </div>
    </Link>
  );
};

export default ExerciseCard;
