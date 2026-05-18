import React, { createContext, useContext } from "react";
import {
  useFavoriteExercises,
  FavoriteExercise,
  ToggleExercise,
} from "../hooks/useFavoriteExercises";

interface FavoritesContextValue {
  favorites: FavoriteExercise[];
  loading: boolean;
  isFavorite: (exerciseId: string) => boolean;
  toggle: (exercise: ToggleExercise) => Promise<void>;
  refresh: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useFavoriteExercises();
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextValue => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
};
