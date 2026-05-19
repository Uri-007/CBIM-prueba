import { fetchCharacter } from "@/lib/api";
import { CharacterDetail } from "@/components/character/CharacterDetail";
import { ErrorDisplay } from "@/components/shared/ErrorDisplay";
import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@iconify/react/dist/offline.cjs";

interface CharacterPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CharacterPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const character = await fetchCharacter(id);
    return {
      title: `${character.name} — Rick & Morty`,
      description: `${character.name} · ${character.species} · ${character.status}`,
    };
  } catch {
    return { title: "Personaje — Rick & Morty" };
  }
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { id } = await params;

  let character;
  let fetchError: string | null = null;

  try {
    character = await fetchCharacter(id);
  } catch (e) {
    fetchError = e instanceof Error ? e.message : "Personaje no encontrado";
  }

  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-zinc-100 hover:text-white transition-colors mb-8 group"
      >
       
        Volver al istado
      </Link>

      {fetchError ? (
        <ErrorDisplay message={fetchError} />
      ) : character ? (
        <CharacterDetail character={character} />
      ) : null}
    </div>
  );
}
