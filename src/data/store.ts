import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleWare from 'redux-saga';
import userReducer from './reducers/UserSlice';
import expensesDataReducer from './reducers/ExpensesSlice';
import categoriesReducer from './reducers/CategoriesSlice';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleWare();

const rootReducer = combineReducers({
  users: userReducer,
  expensesData: expensesDataReducer,
  // categories: categoriesReducer,
});

export const setupStore = () =>  {
  const store =  configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
  });
  sagaMiddleware.run(rootSaga);
  return store;
};



export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

