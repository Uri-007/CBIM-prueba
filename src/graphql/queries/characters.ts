import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        type
        gender
        origin {
          id
          name
          type
          dimension
        }
        location {
          id
          name
          type
          dimension
        }
        image
        created
      }
    }
  }
`;

export const GET_ALL_CHARACTERS_FOR_CHART = gql`
  query GetAllCharactersForChart($page: Int) {
    characters(page: $page) {
      info {
        pages
      }
      results {
        id
        species
      }
    }
  }
`;
