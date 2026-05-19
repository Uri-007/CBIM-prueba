"use client";

import { useViewMode } from "@/hooks/useViewMode";
import { CharacterCard } from "@/components/character/CharacterCard";
import { ViewToggle } from "@/components/ui/ViewToggle";
import { EmptyState } from "@/components/shared/EmptyState";
import type { Character } from "@/types";

interface CharacterGridProps {
  characters: Character[];
  totalCount: number;
}

export function CharacterGrid({ characters, totalCount }: CharacterGridProps) {
  const { viewMode, toggle } = useViewMode();

  if (characters.length === 0) {
    return (
      <EmptyState
        title="Sin resultados"
        description="No se encontraron personajes con ese nombre. Intenta con otra búsqueda."
        icon="🔍"
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-zinc-500">
          <span className="text-white font-medium">{totalCount}</span> personajes encontrados
        </p>
        <ViewToggle viewMode={viewMode} onToggle={toggle} />
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} viewMode="grid" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} viewMode="list" />
          ))}
        </div>
      )}
    </div>
  );
}
