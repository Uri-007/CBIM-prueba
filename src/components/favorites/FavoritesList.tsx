"use client";

import { useFavoritesStore } from "@/store/favorites";
import Image from "next/image";
import Link from "next/link";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { MAX_FAVORITES } from "@/constants";
import { useState } from "react";
import { Icon } from "@iconify/react";

export function FavoritesList() {
  const { favorites, removeFavorite, reorderFavorites } = useFavoritesStore();
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="Sin favoritos"
        description="Agrega hasta 5 personajes favoritos desde el listado principal."
        icon={<Icon icon="ph:star-light" className="w-12 h-12 text-amber-400" />}
      />
    );
  }

  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault();
    if (draggingIndex !== null && draggingIndex !== toIndex) {
      reorderFavorites(draggingIndex, toIndex);
    }
    setDraggingIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-zinc-500">
          <span className="text-white font-medium">{favorites.length}</span>
          {" / "}
          <span>{MAX_FAVORITES}</span> favoritos — arrastra para reordenar
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {favorites.map((character, index) => (
          <div
            key={character.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`group flex items-center gap-4 p-4 rounded-xl border transition-all cursor-grab active:cursor-grabbing select-none
              ${
                draggingIndex === index
                  ? "opacity-40 scale-98 border-cyan-500/50 bg-cyan-500/5"
                  : dragOverIndex === index
                  ? "border-cyan-400/60 bg-cyan-400/5 shadow-lg shadow-cyan-500/10"
                  : "bg-white/3 border-white/8 hover:border-white/15"
              }
            `}
          >
            {/* Drag handle */}
            <div className="text-zinc-700 group-hover:text-zinc-500 transition-colors flex-shrink-0">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="9" cy="6" r="1.5" />
                <circle cx="9" cy="12" r="1.5" />
                <circle cx="9" cy="18" r="1.5" />
                <circle cx="15" cy="6" r="1.5" />
                <circle cx="15" cy="12" r="1.5" />
                <circle cx="15" cy="18" r="1.5" />
              </svg>
            </div>

            <span className="text-zinc-700 text-sm font-mono w-5 flex-shrink-0 text-center">
              {index + 1}
            </span>

            <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-white/10">
              <Image
                src={character.image}
                alt={character.name}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>

            <div className="flex-1 min-w-0">
              <Link
                href={`/character/${character.id}`}
                className="font-semibold text-white hover:text-cyan-300 transition-colors line-clamp-1"
              >
                {character.name}
              </Link>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <StatusBadge status={character.status} />
                <span className="text-xs text-zinc-500">{character.species}</span>
              </div>
              <p className="text-xs text-zinc-600 mt-0.5 truncate">
                {character.location.name}
              </p>
            </div>

            <button
              onClick={() => removeFavorite(character.id)}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-400/10 transition-all"
              title="Eliminar de favoritos"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
