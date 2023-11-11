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

export const prodUri = 'http://95.217.18.50:3000/graphql';
export const devUri = 'http://localhost:3000/graphql';

const httpLink = createHttpLink({
  uri: process.env.NODE_ENV.URI === 'production' ? prodUri : devUri
});
console.log(httpLink);
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