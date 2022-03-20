import { call, put } from 'redux-saga/effects';
import { executeMutation, executeQuery } from '../apolloClient';
import { mutations } from './../mutations';
import { queries } from './../queries';
import {
  getExpensesDataFail,
  getExpensesDataSuccess,
  updateExpensesSuccess,
  updateExpensesFail,
  createExpensesSuccess,
  createExpensesFail,
  getExpensesByMonthDataSuccess,
  getExpensesByMonthDataFail,  
  getMonthByDayExpensesSuccess,
  getMonthByDayExpensesFail
} from '../reducers/ExpensesSlice';

export function* getExpensesDataSaga({payload}) {
  try {
    const query = queries.getMonthExpenses;
    const options = {
      query,
      variables: payload,
    };

    const { getMonthExpenses } = yield call(executeQuery, options);
    const { categories, day, week, month } = getMonthExpenses;
    return yield put(getExpensesDataSuccess({
      categories,
      dayExpenses: day,
      weekExpenses: week,
      monthExpenses: month,
    }));
  } catch (error) {
    console.log(error);
    return yield put(getExpensesDataFail({
      ...error,
    }));
  }
}

export function* updateExpensesSaga({ payload }) {
  try {
    const mutation = mutations.updateExpenses;
    const options = {
      mutation,
      variables: payload
    };
    const { updateExpenses } = yield call(executeMutation, options);
    const { day, week, month } = updateExpenses;
    return yield put(updateExpensesSuccess({
      dayExpenses: day,
      weekExpenses: week,
      monthExpenses: month,
    }));
  } catch (error) {
    console.log(error);
    return yield put(updateExpensesFail({
      ...error,
    }));
  }
}

export function* createExpensesSaga({ payload }) {
  try {
    const mutation = mutations.createExpenses;
    const options = {
      mutation,
      variables: payload,
    };

    const { createExpenses } = yield call(executeMutation, options);
    const { day, week, month } = createExpenses;
    return yield put(createExpensesSuccess({
      dayExpenses: day,
      weekExpenses: week,
      monthExpenses: month,
    }));
  } catch (error) {
    console.log(error);
    return yield put(createExpensesFail({
      ...error,
    }));
  }
}

export function* getExpensesByMonthDataSaga({payload}) {
  try {
    const query = queries.getByMonthExpenses;
    const options = {
      query,
      variables: payload,
    };

    const { getByMonthExpenses } = yield call(executeQuery, options);
    const { categories, expensesByMonth } = getByMonthExpenses;
    return yield put(getExpensesByMonthDataSuccess({
      categories,
      expensesByMonth
    }));
  } catch (error) {
    console.log(error);
    return yield put(getExpensesByMonthDataFail({
      ...error,
    }));
  }
}

export function* getMonthByDayExpensesSaga({payload}) {
  try {
    const query = queries.getMonthExpensesByDay;
    const options = {
      query,
      variables: payload,
    };

    const { getMonthExpensesByDay } = yield call(executeQuery, options);
    const { byDayExpenses } = getMonthExpensesByDay;

    return yield put(getMonthByDayExpensesSuccess({
      byDayExpenses
    }));
  } catch (error) {
    console.log(error);
    return yield put(getMonthByDayExpensesFail({
      ...error,
    }));
  }
}