import { Suspense } from "react";
import { fetchCharacters, fetchSpeciesData } from "@/lib/api";
import { CharacterGrid } from "@/components/character/CharacterGrid";
import { SpeciesChart } from "@/components/charts/SpeciesChart";
import { SearchBar } from "@/components/search/SearchBar";
import { Pagination } from "@/components/ui/Pagination";
import { PageLoader } from "@/components/shared/Spinner";
import { ErrorDisplay } from "@/components/shared/ErrorDisplay";
import type { SpeciesData } from "@/types";

interface HomePageProps {
  searchParams: Promise<{ name?: string; page?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const page = Number(params.page ?? 1);
  const name = params.name ?? "";

  let characters: Awaited<ReturnType<typeof fetchCharacters>> | null = null;
  let speciesData: SpeciesData[] = [];
  let fetchError: string | null = null;

  try {
    [characters, speciesData] = await Promise.all([
      fetchCharacters(page, name ? { name } : {}),
      fetchSpeciesData(),
    ]);
  } catch (e) {
    fetchError = e instanceof Error ? e.message : "Error desconocido";
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="text-center pt-4 pb-2">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-3">
          Rick <span className="text-cyan-400">&</span> Morty
        </h1>
        <p className="text-zinc-500 max-w-lg mx-auto text-sm">
          Explora {characters?.info.count ?? "..."} personajes del universo infinito.
        </p>
      </div>

      <Suspense fallback={null}>
        <div className="flex justify-center">
          <SearchBar />
        </div>
      </Suspense>

      {speciesData.length > 0 && (
        <Suspense fallback={<PageLoader />}>
          <SpeciesChart data={speciesData} />
        </Suspense>
      )}

      {fetchError ? (
        <ErrorDisplay message={fetchError} />
      ) : characters ? (
        <>
          <CharacterGrid
            characters={characters.results}
            totalCount={characters.info.count}
          />
          <Suspense fallback={null}>
            <Pagination
              currentPage={page}
              totalPages={characters.info.pages}
            />
          </Suspense>
        </>
      ) : null}
    </div>
  );
}
