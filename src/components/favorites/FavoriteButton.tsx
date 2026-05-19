"use client";

import { useFavoritesStore } from "@/store/favorites";
import type { Character } from "@/types";
import { MAX_FAVORITES } from "@/constants";

interface FavoriteButtonProps {
  character: Character;
  className?: string;
}

export function FavoriteButton({ character, className = "" }: FavoriteButtonProps) {
  const { isFavorite, addFavorite, removeFavorite, canAddMore } = useFavoritesStore();
  const fav = isFavorite(character.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (fav) {
      removeFavorite(character.id);
    } else {
      const added = addFavorite(character);
      if (!added) {
        alert(`Solo puedes tener ${MAX_FAVORITES} favoritos.`);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!fav && !canAddMore()}
      title={
        fav
          ? "Quitar de favoritos"
          : canAddMore()
          ? "Agregar a favoritos"
          : `Máximo ${MAX_FAVORITES} favoritos`
      }
      className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all ${
        fav
          ? "text-amber-400 bg-amber-400/10 hover:bg-amber-400/20"
          : "text-zinc-500 bg-white/5 hover:text-amber-400 hover:bg-amber-400/10"
      } disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
    >
      <svg
        className="w-4 h-4"
        fill={fav ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </button>
  );
}
