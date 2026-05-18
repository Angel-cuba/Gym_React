import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export interface FavoriteExercise {
  id: string;
  exercise_id: string;
  exercise_name: string;
  body_part: string | null;
  gif_url: string | null;
  created_at: string;
}

export interface ToggleExercise {
  id: string;
  name: string;
  bodyPart: string;
  gifUrl: string;
}

export const useFavoriteExercises = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteExercise[]>([]);
  const [loading, setLoading] = useState(false);

  const loadFavorites = useCallback(async () => {
    if (!user) { setFavorites([]); return; }
    setLoading(true);
    const { data } = await supabase
      .from("favorite_exercises")
      .select("*")
      .order("created_at", { ascending: false });
    setFavorites(data ?? []);
    setLoading(false);
  }, [user]);

  useEffect(() => { loadFavorites(); }, [loadFavorites]);

  const isFavorite = (exerciseId: string) =>
    favorites.some((f) => f.exercise_id === exerciseId);

  const toggle = async (exercise: ToggleExercise): Promise<void> => {
    if (!user) return;
    if (isFavorite(exercise.id)) {
      await supabase
        .from("favorite_exercises")
        .delete()
        .eq("exercise_id", exercise.id)
        .eq("user_id", user.id);
      setFavorites((prev) => prev.filter((f) => f.exercise_id !== exercise.id));
    } else {
      const { data } = await supabase
        .from("favorite_exercises")
        .insert({
          user_id: user.id,
          exercise_id: exercise.id,
          exercise_name: exercise.name,
          body_part: exercise.bodyPart,
          gif_url: exercise.gifUrl,
        })
        .select()
        .single();
      if (data) setFavorites((prev) => [data, ...prev]);
    }
  };

  return { favorites, loading, isFavorite, toggle, refresh: loadFavorites };
};
