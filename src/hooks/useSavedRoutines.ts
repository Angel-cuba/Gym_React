import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../lib/api";

export interface SavedRoutine {
  id: string;
  program_id: string;
  program_name: string;
  selected_weeks: 1 | 2 | 3;
  color: string | null;
  level: string | null;
  notes: string | null;
  created_at: string;
}

export interface SaveRoutineInput {
  program_id: string;
  program_name: string;
  selected_weeks: 1 | 2 | 3;
  color?: string;
  level?: string;
  notes?: string;
}

export const useSavedRoutines = () => {
  const { user } = useAuth();
  const [routines, setRoutines] = useState<SavedRoutine[]>([]);
  const [loading, setLoading] = useState(false);

  const loadRoutines = useCallback(async () => {
    if (!user) { setRoutines([]); return; }
    setLoading(true);
    try {
      const data = await apiFetch<SavedRoutine[]>("/routines");
      setRoutines(data ?? []);
    } catch {
      setRoutines([]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => { loadRoutines(); }, [loadRoutines]);

  const save = async (input: SaveRoutineInput): Promise<boolean> => {
    if (!user) return false;
    try {
      const row = await apiFetch<SavedRoutine>("/routines", {
        method: "POST",
        body: JSON.stringify(input),
      });
      if (row) setRoutines((prev) => [row, ...prev]);
      return !!row;
    } catch {
      return false;
    }
  };

  const remove = async (id: string): Promise<void> => {
    await apiFetch("/routines", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    setRoutines((prev) => prev.filter((r) => r.id !== id));
  };

  const update = async (
    id: string,
    changes: { selected_weeks?: 1 | 2 | 3; notes?: string | null }
  ): Promise<void> => {
    const row = await apiFetch<SavedRoutine>("/routines", {
      method: "PUT",
      body: JSON.stringify({ id, ...changes }),
    });
    if (row) setRoutines((prev) => prev.map((r) => (r.id === id ? row : r)));
  };

  const isSaved = (programId: string) =>
    routines.some((r) => r.program_id === programId);

  return { routines, loading, save, remove, update, isSaved, refresh: loadRoutines };
};
