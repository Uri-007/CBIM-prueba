export interface CharacterLocation {
  id: string | null;
  name: string;
  type: string;
  dimension: string;
}

export interface Character {
  id: string;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: Episode[];
  created: string;
}

export interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
}

export interface PageInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface CharactersResponse {
  characters: {
    info: PageInfo;
    results: Character[];
  };
}

export interface CharacterResponse {
  character: Character;
}

export interface CharactersFilterInput {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
}

export type ViewMode = "grid" | "list";

export interface SpeciesData {
  species: string;
  count: number;
}
