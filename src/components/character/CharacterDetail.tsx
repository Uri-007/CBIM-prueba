"use client";

import Image from "next/image";
import { useFavoritesStore } from "@/store/favorites";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import type { Character } from "@/types";
import { GENDER_ICONS } from "@/constants";
import { formatDate } from "@/utils";
import { Icon } from "@iconify/react/dist/iconify.cjs";

interface CharacterDetailProps {
  character: Character;
}

export function CharacterDetail({ character }: CharacterDetailProps) {
  const isFavorite = useFavoritesStore((s) => s.isFavorite(character.id));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        {/* Image panel */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-black/50">
            <Image
              src={character.image}
              alt={character.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 300px"
              priority
            />
            {isFavorite && (
              <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-amber-400/20 border border-amber-400/30 text-amber-400 text-xs font-medium">
                Favorito
              </div>
            )}
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-white/3 border border-white/8">
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider">
                Agregar a favoritos
              </p>
              <p className="text-sm text-zinc-300 mt-0.5">
                {isFavorite ? "En tu lista" : "Guarda este personaje"}
              </p>
            </div>
            <FavoriteButton character={character} />
          </div>
        </div>

        {/* Info panel */}
        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-start justify-between gap-4 mb-3">
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                {character.name}
              </h1>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <StatusBadge status={character.status} />
              <span className="text-sm text-zinc-400">
                {GENDER_ICONS[character.gender]} {character.gender}
              </span>
              <span className="text-sm text-zinc-400">{character.species}</span>
              {character.type && (
                <span className="text-sm text-zinc-500 italic">
                  {character.type}
                </span>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <InfoCard
              label="Origen"
              icon={
                <Icon
                  icon="streamline-plump-color:earth-1-flat"
                  className="w-3.5 h-3.5"
                />
              }
              primary={character.origin.name}
              secondary={
                character.origin.dimension !== "unknown"
                  ? character.origin.dimension
                  : undefined
              }
            />
            <InfoCard
              label="Última ubicación"
              icon={<Icon icon="logos:google-maps" className="w-3.5 h-3.5" />}
              primary={character.location.name}
              secondary={
                character.location.type !== "unknown"
                  ? character.location.type
                  : undefined
              }
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <StatCard
              label="Episodios"
              value={character.episode.length}
              icon={<Icon icon="glyphs-poly:tv-retro" className="w-4 h-4" />}
            />
            <StatCard
              label="Primera aparición"
              value={character.episode[0]?.episode ?? "—"}
              icon={<Icon icon="glyphs-poly:film" className="w-4 h-4" />}
            />
            <StatCard
              label="Creado"
              value={formatDate(character.created)}
              icon={<Icon icon="openmoji:calendar" className="w-4 h-4" />}
              small
            />
          </div>

          {/* Episodes */}
          <div className="rounded-xl bg-white/3 border border-white/8 p-5">
            <h2 className="text-sm font-semibold text-zinc-300 mb-4 uppercase tracking-wider">
              Episodios ({character.episode.length})
            </h2>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto scrollbar-thin">
              {character.episode.map((ep) => (
                <span
                  key={ep.id}
                  title={ep.name}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-zinc-400 hover:text-white hover:border-cyan-500/40 transition-colors cursor-default"
                >
                  {ep.episode}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  label,
  icon,
  primary,
  secondary,
}: {
  label: string;
  icon: React.ReactNode;
  primary: string;
  secondary?: string;
}) {
  return (
    <div className="p-4 rounded-xl bg-white/3 border border-white/8">
      <p className="text-xs text-zinc-500 uppercase tracking-wider mb-2">
        {icon} {label}
      </p>
      <p className="text-white font-medium leading-snug">{primary}</p>
      {secondary && <p className="text-xs text-zinc-500 mt-0.5">{secondary}</p>}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  small = false,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  small?: boolean;
}) {
  return (
    <div className="p-4 rounded-xl bg-white/3 border border-white/8 text-center">
      <p className="text-lg mb-1">{icon}</p>
      <p className={`font-bold text-white ${small ? "text-base" : "text-2xl"}`}>
        {value}
      </p>
      <p className="text-xs text-zinc-500 mt-0.5">{label}</p>
    </div>
  );
}
