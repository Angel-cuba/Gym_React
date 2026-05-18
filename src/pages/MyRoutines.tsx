import React, { useState } from "react";
import { motion } from "framer-motion";
import { Box, Stack, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useSavedRoutines, SavedRoutine } from "../hooks/useSavedRoutines";
import { useFavorites } from "../context/FavoritesContext";
import { RoutineDetailModal } from "../components/MyRoutines/RoutineDetailModal";

const LEVEL_COLORS: Record<string, string> = {
  principiante: "#56766b",
  intermedio: "#a07c1e",
  avanzado: "#a83a24",
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

const MyRoutines = (): JSX.Element => {
  const { user, openLoginModal } = useAuth();
  const { routines, loading: rLoading, remove, update } = useSavedRoutines();
  const { favorites, loading: fLoading, toggle } = useFavorites();
  const [detailRoutine, setDetailRoutine] = useState<SavedRoutine | null>(null);

  if (!user) {
    return (
      <Box className="my-routines-page">
        <div className="my-routines-empty">
          <p className="ws-eyebrow">Acceso privado</p>
          <h2 className="section-title">Tu espacio personal</h2>
          <p className="muted-copy">Inicia sesión para ver tus rutinas y ejercicios guardados.</p>
          <button className="primary-button" onClick={openLoginModal}>
            Entrar
          </button>
        </div>
      </Box>
    );
  }

  return (
    <>
      <Box component="main" className="my-routines-page">
        <Stack className="section-heading">
          <Typography className="eyebrow">Mi espacio</Typography>
          <Typography component="h1" className="section-title">
            Mis rutinas
          </Typography>
        </Stack>

        {/* Saved programs */}
        <section className="my-section">
          <h3 className="my-section-title">Programas guardados</h3>
          {rLoading ? (
            <p className="muted-copy">Cargando...</p>
          ) : routines.length === 0 ? (
            <p className="muted-copy">
              No tienes rutinas guardadas. Abre &ldquo;Rutinas semanales&rdquo; y guarda tu programa.
            </p>
          ) : (
            <motion.div
              className="my-routines-grid"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {routines.map((r) => {
                const levelColor = LEVEL_COLORS[r.level ?? ""] ?? "#56766b";
                return (
                  <motion.div
                    key={r.id}
                    className="my-routine-card my-routine-card--clickable"
                    style={{ borderTopColor: r.color ?? levelColor }}
                    variants={item}
                    layout
                    whileHover={{ y: -3, boxShadow: "0 10px 28px rgba(20,24,28,0.10)" }}
                    onClick={() => setDetailRoutine(r)}
                  >
                    <div className="my-routine-top">
                      <span className="my-routine-name">{r.program_name}</span>
                      <button
                        className="my-routine-delete"
                        onClick={(e) => { e.stopPropagation(); remove(r.id); }}
                        aria-label="Eliminar rutina"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="my-routine-meta">
                      {r.level && (
                        <span
                          className="ws-level-badge"
                          style={{ background: `${levelColor}18`, color: levelColor }}
                        >
                          {r.level}
                        </span>
                      )}
                      <span className="muted-copy" style={{ fontSize: "0.82rem" }}>
                        {r.selected_weeks} semana{r.selected_weeks > 1 ? "s" : ""}
                      </span>
                    </div>
                    {r.notes && <p className="my-routine-notes">{r.notes}</p>}
                    <div className="my-routine-footer">
                      <p className="my-routine-date">
                        {new Date(r.created_at).toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                      <span className="my-routine-cta">Ver rutina →</span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </section>

        {/* Favorite exercises */}
        <section className="my-section">
          <h3 className="my-section-title">Ejercicios favoritos</h3>
          {fLoading ? (
            <p className="muted-copy">Cargando...</p>
          ) : favorites.length === 0 ? (
            <p className="muted-copy">
              No tienes ejercicios favoritos. Toca el corazón en cualquier ejercicio para guardarlo.
            </p>
          ) : (
            <motion.div
              className="my-favs-grid"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {favorites.map((f) => (
                <motion.div
                  key={f.id}
                  className="my-fav-card"
                  variants={item}
                  layout
                  whileHover={{ y: -2 }}
                >
                  <div className="my-fav-img">
                    {f.gif_url ? (
                      <img src={f.gif_url} alt={f.exercise_name} loading="lazy" />
                    ) : (
                      <span className="my-fav-placeholder">
                        {f.body_part?.[0]?.toUpperCase() ?? "?"}
                      </span>
                    )}
                    <button
                      className="my-fav-remove"
                      aria-label="Quitar de favoritos"
                      onClick={() =>
                        toggle({
                          id: f.exercise_id,
                          name: f.exercise_name,
                          bodyPart: f.body_part ?? "",
                          gifUrl: f.gif_url ?? "",
                        })
                      }
                    >
                      ✕
                    </button>
                  </div>
                  <p className="my-fav-name">{f.exercise_name}</p>
                  {f.body_part && <p className="my-fav-part">{f.body_part}</p>}
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
      </Box>

      <RoutineDetailModal
        routine={detailRoutine}
        onClose={() => setDetailRoutine(null)}
        onUpdate={update}
        onDelete={remove}
      />
    </>
  );
};

export default MyRoutines;
