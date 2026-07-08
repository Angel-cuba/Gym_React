import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../lib/api";

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
    try {
      const data = await apiFetch<FavoriteExercise[]>("/favorites");
      setFavorites(data ?? []);
    } catch {
      setFavorites([]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => { loadFavorites(); }, [loadFavorites]);

  const isFavorite = (exerciseId: string) =>
    favorites.some((f) => f.exercise_id === exerciseId);

  const toggle = async (exercise: ToggleExercise): Promise<void> => {
    if (!user) return;
    if (isFavorite(exercise.id)) {
      await apiFetch("/favorites", {
        method: "DELETE",
        body: JSON.stringify({ exercise_id: exercise.id }),
      });
      setFavorites((prev) => prev.filter((f) => f.exercise_id !== exercise.id));
    } else {
      const row = await apiFetch<FavoriteExercise>("/favorites", {
        method: "POST",
        body: JSON.stringify({
          exercise_id: exercise.id,
          exercise_name: exercise.name,
          body_part: exercise.bodyPart,
          gif_url: exercise.gifUrl,
        }),
      });
      if (row) setFavorites((prev) => [row, ...prev]);
    }
  };

  return { favorites, loading, isFavorite, toggle, refresh: loadFavorites };
};
