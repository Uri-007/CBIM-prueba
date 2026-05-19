import { apolloClient } from "@/graphql/client";
import { GET_CHARACTERS, GET_ALL_CHARACTERS_FOR_CHART } from "@/graphql/queries/characters";
import { GET_CHARACTER } from "@/graphql/queries/character";
import type {
  Character,
  CharactersResponse,
  CharacterResponse,
  CharactersFilterInput,
  SpeciesData,
} from "@/types";

export async function fetchCharacters(
  page: number = 1,
  filter: CharactersFilterInput = {}
): Promise<CharactersResponse["characters"]> {
  const result = await apolloClient.query<CharactersResponse>({
    query: GET_CHARACTERS,
    variables: { page, filter },
    fetchPolicy: "network-only",
  });
  if (!result.data) throw new Error("No se devolvieron datos para los caracteres.");
  return result.data.characters;
}

export async function fetchCharacter(id: string): Promise<Character> {
  const result = await apolloClient.query<CharacterResponse>({
    query: GET_CHARACTER,
    variables: { id },
    fetchPolicy: "network-only",
  });
  if (!result.data) throw new Error("No se devolvieron datos para el personaje.");
  return result.data.character;
}

export async function fetchSpeciesData(): Promise<SpeciesData[]> {
  const speciesMap: Record<string, number> = {};

  const firstResult = await apolloClient.query<CharactersResponse>({
    query: GET_ALL_CHARACTERS_FOR_CHART,
    variables: { page: 1 },
    fetchPolicy: "network-only",
  });

  if (!firstResult.data) return [];

  const totalPages = firstResult.data.characters.info.pages;
  const allResults = [...firstResult.data.characters.results];

  const pagePromises: Array<Promise<{ data?: CharactersResponse }>> = [];
  for (let p = 2; p <= Math.min(totalPages, 10); p++) {
    pagePromises.push(
      apolloClient.query<CharactersResponse>({
        query: GET_ALL_CHARACTERS_FOR_CHART,
        variables: { page: p },
        fetchPolicy: "network-only",
      })
    );
  }

  const pages = await Promise.all(pagePromises);
  for (const pg of pages) {
    if (pg.data) {
      allResults.push(...pg.data.characters.results);
    }
  }

  for (const char of allResults) {
    const key = char.species || "unknown";
    speciesMap[key] = (speciesMap[key] ?? 0) + 1;
  }

  return Object.entries(speciesMap)
    .map(([species, count]) => ({ species, count }))
    .sort((a, b) => b.count - a.count);
}
