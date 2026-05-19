import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
} from "@apollo/client";
import { GRAPHQL_URL } from "@/constants";

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
});

export const apolloClient = new ApolloClient({
  link: from([httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
    },
  },
});
