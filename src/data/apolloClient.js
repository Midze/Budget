import {
  ApolloClient,
  gql,
  NormalizedCacheObject,
  InMemoryCache,
  ApolloQueryResult,
  DocumentNode,
} from '@apollo/client';

const defaultOptions = {
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
  watchQuery: {
    errorPolicy: 'all',
  },
};

const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
  }),
  uri: 'http://18.224.135.209:3000/graphql',
  defaultOptions,
});

export function executeQuery(options) {
  return apolloClient.query(options)
    .then(({ data, errors }) => {
      if (errors) {
        throw errors;
      }
      return data;
    })
    .catch((error) => {
      throw error;
    });
}

export function executeMutation(options) {
  return apolloClient.mutate(options)
    .then(({ data, errors }) => {
      if (errors) {
        throw errors;
      }
      return data;
    })
    .catch((error) => {
      throw error;
    });
}