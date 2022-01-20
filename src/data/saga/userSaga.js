import { call, put } from 'redux-saga/effects';
import { executeMutation, executeQuery } from '../apolloClient';
import { mutations } from './../mutations';
import { queries } from './../queries';
import {
  loginUserFail,
  loginUserSuccess,
  getUserFail,
  getUserSuccess
} from '../reducers/UserSlice';

export function* loginUserSaga({ payload }) {
  try {
    const mutation = mutations.login;
    const options = {
      mutation,
      variables: {...payload},
    };
  
    const { login } = yield call(executeMutation, options);
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

export function* getUserSaga({ payload }) {
  try {
    const query = queries.getCurrentUser;
    const options = {
      query,
      variables: {...payload},
    };
  
    const { getCurrentUser } = yield call(executeQuery, options);
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