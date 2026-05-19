import Image from "next/image";
import Link from "next/link";
import type { Character } from "@/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { GENDER_ICONS } from "@/constants";

interface CharacterCardProps {
  character: Character;
  viewMode: "grid" | "list";
}

export function CharacterCard({ character, viewMode }: CharacterCardProps) {
  const genderIcon = GENDER_ICONS[character.gender] ?? "?";

  if (viewMode === "list") {
    return (
      <Link
        href={`/character/${character.id}`}
        className="group flex items-center gap-4 p-4 rounded-xl bg-white/3 border border-white/8 hover:border-cyan-500/30 hover:bg-white/5 transition-all"
      >
        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-white/10">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="64px"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-white truncate group-hover:text-cyan-300 transition-colors">
              {character.name}
            </h3>
            <FavoriteButton character={character} />
          </div>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <StatusBadge status={character.status} />
            <span className="text-xs text-zinc-500">{character.species}</span>
            <span className="text-xs text-zinc-600">{genderIcon} {character.gender}</span>
          </div>
          <p className="text-xs text-zinc-600 mt-1 truncate">
            {character.location.name}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/character/${character.id}`}
      className="group relative flex flex-col rounded-2xl bg-white/3 border border-white/8 hover:border-cyan-500/30 overflow-hidden transition-all hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-0.5"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={character.image}
          alt={character.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute top-2 right-2">
          <FavoriteButton character={character} />
        </div>
        <div className="absolute bottom-3 left-3">
          <StatusBadge status={character.status} />
        </div>
      </div>

      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <h3 className="font-semibold text-white leading-snug group-hover:text-cyan-300 transition-colors line-clamp-1">
          {character.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400">{character.species}</span>
          <span className="text-zinc-700">·</span>
          <span className="text-xs text-zinc-500">{genderIcon} {character.gender}</span>
        </div>
        <p className="text-xs text-zinc-600 truncate">
          {character.location.name}
        </p>
      </div>
    </Link>
  );
}
