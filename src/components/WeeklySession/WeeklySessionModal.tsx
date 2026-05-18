import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  weeklyPrograms,
  WeeklyProgram,
  LEVEL_LABELS,
  MUSCLE_COLORS,
  type Level,
} from "../../data/weeklyPrograms";
import { useAuth } from "../../context/AuthContext";
import { useSavedRoutines } from "../../hooks/useSavedRoutines";

const LEVEL_BG: Record<Level, string> = {
  principiante: "rgba(86,118,107,0.12)",
  intermedio: "rgba(214,163,54,0.15)",
  avanzado: "rgba(168,58,36,0.12)",
};

const LEVEL_COLOR: Record<Level, string> = {
  principiante: "#56766b",
  intermedio: "#a07c1e",
  avanzado: "#a83a24",
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const sheet = {
  hidden: { opacity: 0, y: 48, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: 24, scale: 0.98, transition: { duration: 0.22 } },
};

const cardVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] } },
};

export const WeeklySessionModal = ({ isOpen, onClose }: Props) => {
  const [selected, setSelected] = useState<WeeklyProgram | null>(null);
  const [weeks, setWeeks] = useState<1 | 2 | 3>(1);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");

  const { user, openLoginModal } = useAuth();
  const { save, isSaved } = useSavedRoutines();

  const close = () => {
    onClose();
    setTimeout(() => { setSelected(null); setWeeks(1); }, 300);
  };

  const closeRef = useRef(close);
  closeRef.current = close;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeRef.current(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="ws-backdrop"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={close}
          />
          <div className="ws-center">
          <motion.div
            className="ws-sheet"
            variants={sheet}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Rutinas semanales"
          >
            <div className="ws-header">
              <div>
                <p className="ws-eyebrow">Planificación</p>
                <h2 className="ws-title">
                  {selected ? selected.name : "Elige tu rutina"}
                </h2>
              </div>
              <button className="ws-close" onClick={close} aria-label="Cerrar">
                ✕
              </button>
            </div>

            <AnimatePresence mode="wait">
              {!selected ? (
                <motion.div
                  key="programs"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  className="ws-programs"
                >
                  {weeklyPrograms.map((prog) => (
                    <motion.button
                      key={prog.id}
                      className="ws-prog-card"
                      variants={cardItem}
                      whileHover={{ y: -3, boxShadow: "0 12px 32px rgba(47,52,55,0.12)" }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 380, damping: 24 }}
                      onClick={() => { setSelected(prog); setSaveState("idle"); }}
                      style={{ borderTopColor: prog.color }}
                    >
                      <div className="ws-prog-top">
                        <span
                          className="ws-level-badge"
                          style={{
                            background: LEVEL_BG[prog.level],
                            color: LEVEL_COLOR[prog.level],
                          }}
                        >
                          {LEVEL_LABELS[prog.level]}
                        </span>
                        <span className="ws-prog-days">{prog.daysPerWeek} días/sem</span>
                      </div>
                      <h3 className="ws-prog-name">{prog.name}</h3>
                      <p className="ws-prog-sub">{prog.subtitle}</p>
                      <p className="ws-prog-desc">{prog.description}</p>
                      <p className="ws-prog-struct">{prog.structure}</p>
                    </motion.button>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="schedule"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } }}
                  exit={{ opacity: 0, x: -16, transition: { duration: 0.18 } }}
                  className="ws-schedule"
                >
                  <div className="ws-schedule-nav">
                    <button className="ws-back" onClick={() => setSelected(null)}>
                      ← Volver
                    </button>
                    <div className="ws-weeks-toggle">
                      {([1, 2, 3] as const).map((w) => (
                        <button
                          key={w}
                          className={`ws-week-btn ${weeks === w ? "active" : ""}`}
                          onClick={() => setWeeks(w)}
                        >
                          {w} sem{w > 1 ? "anas" : "ana"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="ws-save-row">
                    {isSaved(selected.id) ? (
                      <span className="ws-saved-label">✓ Guardado</span>
                    ) : (
                      <button
                        className={`ws-save-btn${saveState === "saved" ? " ws-save-btn--saved" : ""}`}
                        disabled={saveState === "saving" || saveState === "saved"}
                        onClick={async () => {
                          if (!user) { openLoginModal(); return; }
                          setSaveState("saving");
                          await save({
                            program_id: selected.id,
                            program_name: selected.name,
                            selected_weeks: weeks,
                            color: selected.color,
                            level: selected.level,
                          });
                          setSaveState("saved");
                          setTimeout(() => setSaveState("idle"), 2500);
                        }}
                      >
                        {saveState === "saving"
                          ? "Guardando..."
                          : saveState === "saved"
                          ? "✓ Guardado"
                          : user
                          ? "Guardar programa"
                          : "Entrar para guardar"}
                      </button>
                    )}
                  </div>

                  <div className="ws-prog-meta">
                    <span
                      className="ws-level-badge"
                      style={{ background: LEVEL_BG[selected.level], color: LEVEL_COLOR[selected.level] }}
                    >
                      {LEVEL_LABELS[selected.level]}
                    </span>
                    <span className="ws-prog-struct">{selected.structure}</span>
                  </div>

                  {selected.weeks.slice(0, weeks).map((weekPlan) => (
                    <div key={weekPlan.week} className="ws-week-block">
                      <div className="ws-week-header">
                        <span className="ws-week-num">Semana {weekPlan.week}</span>
                        <span className="ws-week-focus">{weekPlan.focus}</span>
                      </div>
                      <div className="ws-days">
                        {weekPlan.days.map((day, dayIndex) => (
                          <motion.div
                            key={day.day}
                            className={`ws-day ${day.isRest ? "ws-day--rest" : ""}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: dayIndex * 0.04, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <div className="ws-day-header">
                              <span className="ws-day-name">{day.day}</span>
                              {day.isRest ? (
                                <span className="ws-rest-badge">Descanso</span>
                              ) : (
                                <span className="ws-day-label">{day.label}</span>
                              )}
                            </div>
                            {!day.isRest && (
                              <>
                                <div className="ws-muscles">
                                  {day.muscles?.map((m) => (
                                    <span
                                      key={m}
                                      className="ws-muscle-chip"
                                      style={{
                                        background: `${MUSCLE_COLORS[m] ?? "#687076"}18`,
                                        color: MUSCLE_COLORS[m] ?? "#687076",
                                      }}
                                    >
                                      {m}
                                    </span>
                                  ))}
                                </div>
                                <ul className="ws-exercises">
                                  {day.exercises?.map((ex, j) => (
                                    <li key={j}>{ex}</li>
                                  ))}
                                </ul>
                                {day.duration && (
                                  <span className="ws-duration">⏱ {day.duration}</span>
                                )}
                              </>
                            )}
                            {day.isRest && day.note && (
                              <p className="ws-rest-note">{day.note}</p>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WeeklySessionModal;
