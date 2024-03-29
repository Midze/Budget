import { takeEvery } from 'redux-saga/effects';
import {
  getExpensesDataSaga,
  updateExpensesSaga,
  createExpensesSaga,
  getExpensesByMonthDataSaga,
  getMonthByDayExpensesSaga,
} from './expensesSaga';
import { createCategorySaga, deleteExpensesCategorySaga } from './categoriesSaga';
import { loginUserSaga, getUserSaga } from './userSaga';


export default function* rootSaga() {
  yield takeEvery('expensesData/getMonthByDayExpenses', getMonthByDayExpensesSaga);
  yield takeEvery('expensesData/getExpensesData', getExpensesDataSaga);
  yield takeEvery('expensesData/updateExpenses', updateExpensesSaga);
  yield takeEvery('expensesData/createExpenses', createExpensesSaga);
  yield takeEvery('expensesData/createCategory', createCategorySaga);
  yield takeEvery('expensesData/getExpensesByMonthData', getExpensesByMonthDataSaga);
  yield takeEvery('expensesData/deleteExpensesCategory', deleteExpensesCategorySaga);
  yield takeEvery('user/loginUser', loginUserSaga);
  yield takeEvery('user/getUser', getUserSaga);
}


