import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://blackstone.hexprojects.in/admin/graphql",
  cache: new InMemoryCache(),
});

export default client;
