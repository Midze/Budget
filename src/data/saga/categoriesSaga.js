import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { executeMutation } from '../apolloClient';
import { mutations } from './../mutations';
import {
  createCategorySuccess,
  createCategoryFail,
  deleteExpensesCategorySuccess,
  getExpensesDataSuccess,
  deleteExpensesCategoryFail,
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

export function* deleteExpensesCategorySaga({ payload }) {
  try {
    const mutation = mutations.deleteExpensesCategory;
    const options = {
      mutation,
      variables: {
        fields: payload
      },
    };

    const { removeExpensesCategory } = yield call(executeMutation, options);
    console.log('removeExpensesCategory', removeExpensesCategory);
    const { categories, day, week, month } = removeExpensesCategory;
    return yield put(getExpensesDataSuccess({
      categories,
      dayExpenses: day,
      weekExpenses: week,
      monthExpenses: month,
    }));
  } catch (error) {
    console.log(error);
    return yield put(deleteExpensesCategoryFail({
      ...error,
    }));
  }
}
