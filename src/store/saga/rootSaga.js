import {
  ApolloClient,
  gql,
  NormalizedCacheObject,
  InMemoryCache,
  ApolloQueryResult,
  DocumentNode,
} from '@apollo/client';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  getExpensesDataFail,
  getExpensesDataSuccess,
  updateExpensesSuccess,
  updateExpensesFail,
  createExpensesSuccess,
  createExpensesFail,
  createCategorySuccess,
  createCategoryFail
} from '../reducers/ExpensesSlice';
import {
  loginUserFail,
  loginUserSuccess,
  getUserFail,
  getUserSuccess
} from '../reducers/UserSlice';
import { ExpensesData } from '../../types/interfaces';

const defaultOptions = {
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
  watchQuery: {
    errorPolicy: 'all',
  },
};

const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
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

function* getExpensesDataSaga({payload}) {
  
  console.log(payload);
  try {
    const query = gql`query getMonthExpenses(
      $userId: String!
      $year: Float!
      $month: Float!
      $week: Float!
      $day: Float!
    ) {
      getMonthExpenses (
        userId: $userId
        year: $year
        month: $month
        week: $week
        day: $day
      ) {
        categories {
          _id
          name
          childOf
          userId
        }
        month {
          total
          expenses {
            price
            category
          }
        }
        week {
          total
          expenses {
            price
            category
          }
        }
        day {
          _id
          total
          expenses {
            price
            category
          }
        }
      }
    }`;
    const options = {
      query,
      variables: payload,
    };

    const { getMonthExpenses } = yield call(executeQuery, options);
    const { categories, day, week, month } = getMonthExpenses;
    console.log('getExpenses', getMonthExpenses);
    return yield put(getExpensesDataSuccess({
      categories,
      dayExpenses: day,
      weekExpenses: week,
      monthExpenses: month,
    }));
  } catch (error) {
    console.log(error);
    return yield put(getExpensesDataFail({
      error,
    }));
  }
}

function* updateExpensesSaga({ payload }) {
  try {
    console.log(payload);
    const mutation = gql`mutation updateExpenses($_id: String!, $updateExpenseInput: UpdateExpensesInput!) {
      updateExpenses(_id:$_id, updateExpenseInput: $updateExpenseInput) {
        month {
          total
          expenses {
            price
            category
          }
        }
        week {
          total
          expenses {
            price
            category
          }
        }
        day {
          _id
          total
          expenses {
            price
            category
          }
        }
      }
    }`;
    const options = {
      mutation,
      variables: payload
    };
    console.log('updateExpenses zalupa');
    const { updateExpenses } = yield call(executeMutation, options);
    const { day, week, month } = updateExpenses;
    console.log('updateExpenses', updateExpenses);
    return yield put(updateExpensesSuccess({
      dayExpenses: day,
      weekExpenses: week,
      monthExpenses: month,
    }));
  } catch (error) {
    console.log(error);
    return yield put(updateExpensesFail({
      error,
    }));
  }
}

function* createExpensesSaga({ payload }) {
  try {
    console.log(payload);
    const mutation = gql`mutation createExpenses($createExpensesInput: CreateExpensesInput!) {
      createExpenses(createExpensesInput: $createExpensesInput) {
        month {
          total
          expenses {
            price
            category
          }
        }
        week {
          total
          expenses {
            price
            category
          }
        }
        day {
          total
          expenses {
            price
            category
          }
        }
      }
    }`;
    const options = {
      mutation,
      variables: payload,
    };

    const { createExpenses } = yield call(executeMutation, options);
    const { day, week, month } = createExpenses;
    console.log('createExpenses', createExpenses);
    return yield put(createExpensesSuccess({
      dayExpenses: day,
      weekExpenses: week,
      monthExpenses: month,
    }));
  } catch (error) {
    console.log(error);
    return yield put(createExpensesFail({
      error,
    }));
  }
}

function* createCategorySaga({ payload }) {
  try {
    console.log(payload);
    const mutation = gql`mutation createCategory($createCategoryInput: CreateCategoryInput!) {
      createCategory(createCategoryInput: $createCategoryInput) {
        _id
        childOf
        name
        userId
      }
    }`;
    const options = {
      mutation,
      variables: {createCategoryInput: payload},
    };

    const { createCategory } = yield call(executeMutation, options);
    console.log('createCategory', createCategory);
    return yield put(createCategorySuccess({
      ...createCategory,
    }));
  } catch (error) {
    console.log(error);
    return yield put(createCategoryFail({
      error,
    }));
  }
}

function* loginUserSaga({ payload }) {
  try {
    console.log('User LOgin', payload);
    const mutation = gql`mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password){
        token
        user {
          _id
          login
          email
        }
      }
    }`;
    const options = {
      mutation,
      variables: {...payload},
    };
  
    const { login } = yield call(executeMutation, options);
    console.log('data', login);
    return yield put(loginUserSuccess({
      ...login,
    }));
  } catch (error) {
    console.log(error);
    return yield put(loginUserFail({
      ...error,
    }));
  }
}

function* getUserSaga({ payload }) {
  try {
    const query = gql`query getCurrentUser($id: String!){
      getCurrentUser(id: $id){
        email
        _id
        login
      }
    }`;
    const options = {
      query,
      variables: {...payload},
    };
  
    const { getCurrentUser } = yield call(executeQuery, options);
    console.log('data', getCurrentUser);
    return yield put(getUserSuccess({
      ...getCurrentUser,
    }));
  } catch (error) {
    console.log(error);
    return yield put(getUserFail({
      ...error,
    }));
  }
}

export default function* ExpensesDataSaga() {
  yield takeEvery('expensesData/getExpensesData', getExpensesDataSaga);
  yield takeEvery('expensesData/updateExpenses', updateExpensesSaga);
  yield takeEvery('expensesData/createExpenses', createExpensesSaga);
  yield takeEvery('expensesData/createCategory', createCategorySaga);
  yield takeEvery('user/loginUser', loginUserSaga);
  yield takeEvery('user/getUser', getUserSaga);
}


