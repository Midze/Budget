import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleWare from 'redux-saga';
import userReducer from './reducers/UserSlice';
import expensesDataReducer from './reducers/ExpensesSlice';
import ExpensesDataSaga from './saga/rootSaga';

const sagaMiddleware = createSagaMiddleWare();

const rootReducer = combineReducers({
  users: userReducer,
  expensesData: expensesDataReducer,
});

export const setupStore = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(ExpensesDataSaga);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

