import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  weeklyPrograms,
  LEVEL_LABELS,
  MUSCLE_COLORS,
  type Level,
} from "../../data/weeklyPrograms";
import { SavedRoutine } from "../../hooks/useSavedRoutines";

interface Props {
  routine: SavedRoutine | null;
  onClose: () => void;
  onUpdate: (id: string, changes: { selected_weeks?: 1 | 2 | 3; notes?: string | null }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

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

const backdrop = { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } };
const sheet = {
  hidden: { opacity: 0, y: 48, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: 24, scale: 0.98, transition: { duration: 0.22 } },
};

export const RoutineDetailModal = ({ routine, onClose, onUpdate, onDelete }: Props) => {
  const isOpen = !!routine;

  // Keep last non-null routine so exit animation renders full content
  const lastRef = useRef<SavedRoutine | null>(null);
  if (routine) lastRef.current = routine;
  const r = lastRef.current;

  const [editWeeks, setEditWeeks] = useState<1 | 2 | 3>(1);
  const [editNotes, setEditNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (routine) {
      setEditWeeks(routine.selected_weeks);
      setEditNotes(routine.notes ?? "");
      setDirty(false);
    }
  }, [routine]);

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onCloseRef.current(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  const handleSave = async () => {
    if (!r) return;
    setSaving(true);
    await onUpdate(r.id, { selected_weeks: editWeeks, notes: editNotes.trim() || null });
    setSaving(false);
    setDirty(false);
  };

  const handleDelete = async () => {
    if (!r) return;
    setDeleting(true);
    await onDelete(r.id);
    setDeleting(false);
    onClose();
  };

  const program = r ? (weeklyPrograms.find((p) => p.id === r.program_id) ?? null) : null;
  const level = r ? (r.level as Level | null) : null;
  const levelBg = level ? (LEVEL_BG[level] ?? "rgba(86,118,107,0.12)") : "rgba(86,118,107,0.12)";
  const levelColor = level ? (LEVEL_COLOR[level] ?? "#56766b") : "#56766b";

  return (
    <AnimatePresence>
      {isOpen && r && (
        <>
          <motion.div
            className="ws-backdrop"
            style={{ zIndex: 52 }}
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          <div className="ws-center" style={{ zIndex: 53 }}>
            <motion.div
              className="rd-sheet"
              variants={sheet}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-label={r.program_name}
            >
              <div className="ws-header">
                <div>
                  <p className="ws-eyebrow">Planificación</p>
                  <h2 className="ws-title">{r.program_name}</h2>
                </div>
                <button className="ws-close" onClick={onClose} aria-label="Cerrar">✕</button>
              </div>

              <div className="rd-meta-row">
                {level && (
                  <span
                    className="ws-level-badge"
                    style={{ background: levelBg, color: levelColor }}
                  >
                    {LEVEL_LABELS[level]}
                  </span>
                )}
                {program && <span className="ws-prog-struct">{program.structure}</span>}
              </div>

              <div className="rd-edit-block">
                <span className="rd-edit-label">Semanas a mostrar</span>
                <div className="ws-weeks-toggle">
                  {([1, 2, 3] as const).map((w) => (
                    <button
                      key={w}
                      className={`ws-week-btn ${editWeeks === w ? "active" : ""}`}
                      onClick={() => { setEditWeeks(w); setDirty(true); }}
                    >
                      {w} sem{w > 1 ? "anas" : "ana"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rd-edit-block">
                <label className="rd-edit-label" htmlFor="rd-notes">
                  Notas personales
                </label>
                <textarea
                  id="rd-notes"
                  className="rd-notes-input"
                  placeholder="Progreso, pesos, ajustes..."
                  value={editNotes}
                  onChange={(e) => { setEditNotes(e.target.value); setDirty(true); }}
                  rows={3}
                />
              </div>

              {program ? (
                <div className="rd-schedule">
                  {program.weeks.slice(0, editWeeks).map((weekPlan) => (
                    <div key={weekPlan.week} className="ws-week-block">
                      <div className="ws-week-header">
                        <span className="ws-week-num">Semana {weekPlan.week}</span>
                        <span className="ws-week-focus">{weekPlan.focus}</span>
                      </div>
                      <div className="ws-days">
                        {weekPlan.days.map((day) => (
                          <div
                            key={day.day}
                            className={`ws-day ${day.isRest ? "ws-day--rest" : ""}`}
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
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="muted-copy rd-no-program">
                  Programa no disponible en la biblioteca local.
                </p>
              )}

              <div className="rd-actions">
                <button
                  className="rd-delete-btn"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? "Eliminando..." : "Eliminar rutina"}
                </button>

                <AnimatePresence>
                  {dirty && (
                    <motion.button
                      className="rd-save-btn"
                      onClick={handleSave}
                      disabled={saving}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      transition={{ duration: 0.18 }}
                    >
                      {saving ? "Guardando..." : "Guardar cambios"}
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
