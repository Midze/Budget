import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GraphQLError } from 'graphql';
import {
  Category,
  CreateCategoryInput,
  DeleteCategoryInput,
  CreateExpensesInput,
  Expense,
  Expenses,
  ExpensesByCategory,
  ExpensesData,
  GetExpensesInput,
  UpdateExpensesInput,
} from './../types/interfaces';

interface ExpensesDataState {
  categories: Category[],
  dayExpenses: Expenses,
  weekExpenses: Expenses,
  monthExpenses: Expenses,
  isLoadingExpenses: boolean;
  isLoadingCategories: boolean;
  error: string;
}

const initialState:ExpensesDataState = {
  categories: [],
  dayExpenses: {
    total: 0,
    expenses: []
  },
  weekExpenses: {
    total: 0,
    expenses: []
  },
  monthExpenses: {
    total: 0,
    expenses: []
  },
  isLoadingExpenses: true,
  isLoadingCategories: true,
  error: '',
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    createCategory(state, action: PayloadAction<CreateCategoryInput>) {
      state.isLoadingCategories = true;
    },
    createCategorySuccess(state, action: PayloadAction<Category>) {
      const updatedCategores = [...state.categories, action.payload];
      state.isLoadingCategories = false;
      state.categories = updatedCategores;
      state.error = '';
    },
    createCategoryFail(state, action: PayloadAction<GraphQLError>) {
      state.isLoadingCategories = false;
      state.error = action.payload.message;
    },
  }
});

export const {
  createCategorySuccess,
  createCategoryFail,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;