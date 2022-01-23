import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { executeMutation } from '../apolloClient';
import { mutations } from './../mutations';
import {
  createCategorySuccess,
  createCategoryFail
} from '../reducers/ExpensesSlice';

export function* createCategorySaga({ payload }) {
  try {
    const mutation = mutations.createCategory;
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
      ...error,
    }));
  }
}