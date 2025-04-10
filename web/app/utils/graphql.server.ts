import { GraphQLClient } from 'graphql-request';

export const client = new GraphQLClient(process.env.VITE_GRAPHQL_ENDPOINT!, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
});
