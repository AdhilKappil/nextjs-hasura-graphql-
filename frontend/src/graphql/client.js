
import { GraphQLClient } from 'graphql-request';

// Create a new GraphQL client instance with the Hasura GraphQL endpoint and admin secret
export const graphqlClient = new GraphQLClient(process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT, {
  // headers: {
  //   'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
  // },
});
