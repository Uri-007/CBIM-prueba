"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Character } from "@/types";
import { MAX_FAVORITES } from "@/constants";

interface FavoritesState {
  favorites: Character[];
  addFavorite: (character: Character) => boolean;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  reorderFavorites: (from: number, to: number) => void;
  canAddMore: () => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (character) => {
        const { favorites } = get();
        if (favorites.length >= MAX_FAVORITES) return false;
        if (favorites.some((f) => f.id === character.id)) return false;
        set({ favorites: [...favorites, character] });
        return true;
      },

      removeFavorite: (id) => {
        set({ favorites: get().favorites.filter((f) => f.id !== id) });
      },

      isFavorite: (id) => {
        return get().favorites.some((f) => f.id === id);
      },

      reorderFavorites: (from, to) => {
        const favorites = [...get().favorites];
        const [moved] = favorites.splice(from, 1);
        if (moved) {
          favorites.splice(to, 0, moved);
        }
        set({ favorites });
      },

      canAddMore: () => {
        return get().favorites.length < MAX_FAVORITES;
      },
    }),
    {
      name: "rick-morty-favorites",
    }
  )
);
