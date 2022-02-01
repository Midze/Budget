import {
  ApolloClient,
  createHttpLink,
  gql,
  NormalizedCacheObject,
  InMemoryCache,
  ApolloQueryResult,
  DocumentNode,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const defaultOptions = {
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
  watchQuery: {
    errorPolicy: 'all',
  },
};

const httpLink = createHttpLink({
  uri: 'http://18.224.135.209:3000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
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