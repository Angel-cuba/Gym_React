import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

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
    const { data } = await supabase
      .from("saved_routines")
      .select("*")
      .order("created_at", { ascending: false });
    setRoutines(data ?? []);
    setLoading(false);
  }, [user]);

  useEffect(() => { loadRoutines(); }, [loadRoutines]);

  const save = async (input: SaveRoutineInput): Promise<boolean> => {
    if (!user) return false;
    const { data } = await supabase
      .from("saved_routines")
      .insert({ ...input, user_id: user.id })
      .select()
      .single();
    if (data) setRoutines((prev) => [data, ...prev]);
    return !!data;
  };

  const remove = async (id: string): Promise<void> => {
    await supabase.from("saved_routines").delete().eq("id", id);
    setRoutines((prev) => prev.filter((r) => r.id !== id));
  };

  const update = async (
    id: string,
    changes: { selected_weeks?: 1 | 2 | 3; notes?: string | null }
  ): Promise<void> => {
    const { data } = await supabase
      .from("saved_routines")
      .update(changes)
      .eq("id", id)
      .select()
      .single();
    if (data) setRoutines((prev) => prev.map((r) => (r.id === id ? (data as SavedRoutine) : r)));
  };

  const isSaved = (programId: string) =>
    routines.some((r) => r.program_id === programId);

  return { routines, loading, save, remove, update, isSaved, refresh: loadRoutines };
};
