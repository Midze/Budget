import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Category,
  CreateCategoryInput,
  CreateExpensesInput,
  Expense,
  Expenses,
  ExpensesByCategory,
  ExpensesData,
  GetExpensesInput,
  UpdateExpensesInput,
} from '../../types/interfaces';

interface ExpensesDataState {
  categories: Category[],
  dayExpenses: Expenses,
  weekExpenses: Expenses,
  monthExpenses: Expenses,
  dayExpensesByCategory: ExpensesByCategory,
  weekExpensesByCategory: ExpensesByCategory,
  monthExpensesByCategory: ExpensesByCategory,
  isLoadingExpenses: boolean;
  isLoadingCategories: boolean;
  error: string;
}

function sortObject(sortingObject) {
  const sortingArray = [];
  const sortedObject = {};

  Object.keys(sortingObject).forEach(item => {
    if(sortingObject[item].value) {
      sortingArray.push({value: sortingObject[item].value, id: item});
    }
  });
    
  sortingArray.sort(function(a, b) {return b.value - a.value;});
  sortingArray.forEach((item, index) => {
    if(index === 0) {
      sortedObject.maxValue = sortingObject[item.id].value;
    }
    
    sortedObject[item.id] = sortingObject[item.id];
  }); 
  return sortedObject;
}

function getExpensesByCategories(parentCategories, childCategories, expenses) {
  const parent = JSON.parse(JSON.stringify(parentCategories));
  const child = JSON.parse(JSON.stringify(childCategories));
  expenses.forEach(expense => {
    const isParentCategory = parent[expense.category];
    const expenseValue = expense.price || 0;
    if (isParentCategory) {
      parent[expense.category].value += expenseValue;
    } else {
      const childOf = child[expense.category].childOf;
      parent[childOf].value += expenseValue;
      child[expense.category].value += expenseValue;
    }
  });

  return {
    parentCategory: sortObject(parent, 'parent'),
    childCategories: sortObject(child, 'child')
  };
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
  isLoadingExpenses: false,
  isLoadingCategories: false,
  error: '',
};

export const expensesDataSlice = createSlice({
  name: 'expensesData',
  initialState,
  reducers: {
    getExpensesData(state, action: PayloadAction<GetExpensesInput>) {
      state.isLoadingExpenses = true;
      state.isLoadingCategories = true;
    },
    getExpensesDataSuccess(state, action: PayloadAction<ExpensesData>) {      
      const categories = action.payload.categories;
      const { expenses: dayExpenses } = action.payload.dayExpenses;
      const { expenses: weekExpenses } = action.payload.weekExpenses;
      const { expenses: monthExpenses } = action.payload.monthExpenses;

      const categoriesById: {[index:string]: Category} = {};
      const parentCategories: {
        [index:string]: Category & {     
          value: number;
          children?: [Category];
        }
      } = {};
      const childCategories: {[index:string]: Category & {value: number}} = {};
    
      categories.forEach((category) => {
        categoriesById[category._id] = {...category};
    
        if (!category.childOf && !parentCategories[category._id]) {
    
          parentCategories[category._id] = {...category, value: 0, children: []};
    
        } else if (!category.childOf && parentCategories[category._id]) {
    
          parentCategories[category._id] = {...category, ...parentCategories[category._id]};
    
        } else if (!parentCategories[category.childOf]) {
    
          parentCategories[category.childOf] = {value: 0, children: [category]};
          childCategories[category._id] = {...category, value: 0};
        } else {
          childCategories[category._id] = {...category, value: 0};
          parentCategories[category.childOf].children?.push(category);
    
        }  
      });

      const monthExpensesByCategory = getExpensesByCategories(parentCategories, childCategories, monthExpenses);
      const weekExpensesByCategory = getExpensesByCategories(parentCategories, childCategories, weekExpenses);
      const dayExpensesByCategory = getExpensesByCategories(parentCategories, childCategories, dayExpenses);


      state.isLoadingExpenses = false;
      state.isLoadingCategories = false;
      state.categories = action.payload.categories;
      state.dayExpenses = action.payload.dayExpenses;
      state.weekExpenses = action.payload.weekExpenses;
      state.monthExpenses = action.payload.monthExpenses;
      state.dayExpensesByCategory = dayExpensesByCategory;
      state.weekExpensesByCategory = weekExpensesByCategory;
      state.monthExpensesByCategory = monthExpensesByCategory;
      state.error = '';
    },
    getExpensesDataFail(state, action: PayloadAction<any>) {
      state.isLoadingExpenses = false;
      state.isLoadingCategories = false;
      state.error = action.payload;
    },
    createExpenses(state, action: PayloadAction<CreateExpensesInput>) {
      state.isLoadingExpenses = true;
    },
    createExpensesSuccess(state, action: PayloadAction<ExpensesData>) {
      state.isLoadingExpenses = false;
      state.dayExpenses = action.payload.dayExpenses;
      state.weekExpenses = action.payload.weekExpenses;
      state.monthExpenses = action.payload.monthExpenses;
      state.error = '';
    },
    createExpensesFail(state, action: PayloadAction<any>) {
      state.isLoadingExpenses = false;
      state.error = action.payload;
    },
    updateExpenses(state, action: PayloadAction<UpdateExpensesInput>) {
      state.isLoadingExpenses = true;
    },
    updateExpensesSuccess(state, action: PayloadAction<ExpensesData>) {
      state.isLoadingExpenses = false;
      state.dayExpenses = action.payload.dayExpenses;
      state.weekExpenses = action.payload.weekExpenses;
      state.monthExpenses = action.payload.monthExpenses;
      state.error = '';
    },
    updateExpensesFail(state, action: PayloadAction<any>) {
      state.isLoadingExpenses = false;
      state.error = action.payload;
    },
    createCategory(state, action: PayloadAction<CreateCategoryInput>) {
      state.isLoadingCategories = true;
    },
    createCategorySuccess(state, action: PayloadAction<Category>) {
      const updatedCategores = [...state.categories, action.payload];
      state.isLoadingCategories = false;
      state.categories = updatedCategores;
      state.error = '';
    },
    createCategoryFail(state, action: PayloadAction<any>) {
      state.isLoadingCategories = false;
      state.error = action.payload;
    },
  }
});

export const {
  getExpensesData,
  getExpensesDataSuccess,
  getExpensesDataFail,
  createExpenses,
  createExpensesSuccess,
  createExpensesFail,
  updateExpenses,
  updateExpensesSuccess,
  updateExpensesFail,
  createCategory,
  createCategorySuccess,
  createCategoryFail,
} = expensesDataSlice.actions;

export default expensesDataSlice.reducer;