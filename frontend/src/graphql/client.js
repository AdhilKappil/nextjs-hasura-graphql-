// src/graphql/client.js

import { GraphQLClient } from 'graphql-request';

export const graphqlClient = new GraphQLClient(process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT, {
  headers: {
    'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
  },
});
