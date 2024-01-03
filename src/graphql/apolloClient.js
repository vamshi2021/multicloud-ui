import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql', // Replace this with your GraphQL server endpoint
  cache: new InMemoryCache(),
});

export default client;