import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GraphQLError } from 'graphql';
import {
  Category,
  ChildCategory,
  CreateCategoryInput,
  DeleteExpensesCategoryInput,
  CreateExpensesInput,
  Expense,
  Expenses,
  ExpensesByCategory,
  ExpensesData,
  GetExpensesInput,
  ParentCategory,
  UpdateExpensesInput,
  ExpensesByMonthData,
  GetExpensesByMonthInput,
  MonthlyExpensesByCategory,
  MonthExpensesByDay,
  ByDayExpense,
  GetMonthExpensesByDayInput,
} from './../types/interfaces';

interface ExpensesDataState {
  categories: Category[],
  dayExpenses: Expenses,
  weekExpenses: Expenses,
  monthExpenses: Expenses,
  parentCategories: ParentCategory,
  childCategories: ChildCategory,
  dayExpensesByCategory: ExpensesByCategory,
  weekExpensesByCategory: ExpensesByCategory,
  monthExpensesByCategory: ExpensesByCategory,
  expensesByMonth: MonthlyExpensesByCategory[],
  monthExpensesByDay: {
    [key: string]: ByDayExpense
  },
  isLoadingExpenses: boolean;
  isLoadingCategories: boolean;
  error: string;
}

function sortObjects(parent: ParentCategory, child: ChildCategory) {
  const sortingParentArray: {value: number, id: string}[] = [];
  const sortingChildArray: {value: number, id: string}[] = [];
  const sortedParentObject: ParentCategory = {};
  const sortedChldObject: ChildCategory = {};
  let maxValue = 0;
  Object.keys(parent).forEach(item => {
    if(parent[item].value) {
      sortingParentArray.push({value: parent[item].value, id: item});
    }
  });
    
  sortingParentArray.sort(function(a, b) {return b.value - a.value;});
  sortingParentArray.forEach((item, index) => {
    if(index === 0) {
      maxValue = parent[item.id].value;
    }
    
    sortedParentObject[item.id] = parent[item.id];
  });
  Object.keys(child).forEach(item => {
    if(child[item].value) {
      sortingChildArray.push({value: child[item].value, id: item});
    }
  });
    
  sortingChildArray.sort(function(a, b) {return b.value - a.value;});
  sortingChildArray.forEach((item, index) => {    
    sortedChldObject[item.id] = child[item.id];
  });
  return {
    parentCategory: sortedParentObject,
    childCategories: sortedChldObject,
    maxValue,
  };
}

function getExpensesByCategories(parentCategories: ParentCategory, childCategories: ChildCategory, expenses: Expense[]): ExpensesByCategory {
  const parent = JSON.parse(JSON.stringify(parentCategories));
  const child = JSON.parse(JSON.stringify(childCategories));
  // console.log('expenses', expenses);
  
  expenses.forEach(expense => {
    const isParentCategory = parent[expense.category];
    const expenseValue = Number(expense.price) || 0;
    if (isParentCategory) {
      parent[expense.category].value += expenseValue;
    } else {
      const childOf = child[expense.category].childOf;
      parent[childOf].value += expenseValue;
      child[expense.category].value += expenseValue;
    }
  });
  // console.log('parent', parent);
  // console.log('child', child);
  
  return sortObjects(parent, child);
}

const splitCategories = (categories: Category[]) => {
  const categoriesById: {[index:string]: Category} = {};
  const parentCategories: ParentCategory = {};
  const childCategories: ChildCategory = {};

  categories.forEach((category) => {
    categoriesById[category._id] = {...category};        
    if (category.childOf) {
      childCategories[category._id] = {...category, value: 0};
    } else {
      parentCategories[category._id] = {...category, value: 0, children: []};
    }
  });

  Object.keys(childCategories).forEach((id) => {
    parentCategories[childCategories[id].childOf].children.push(childCategories[id]);
  });

  return {
    categoriesById,
    parentCategories,
    childCategories
  };
};

const initialState:ExpensesDataState = {
  categories: [],
  parentCategories: {},
  childCategories: {},
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
  dayExpensesByCategory: {
    parentCategory: {},
    childCategories: {},
    maxValue: 0,
  },
  weekExpensesByCategory: {
    parentCategory: {},
    childCategories: {},
    maxValue: 0,
  },
  monthExpensesByCategory: {
    parentCategory: {},
    childCategories: {},
    maxValue: 0,
  },
  expensesByMonth: [],
  monthExpensesByDay: {},
  isLoadingExpenses: true,
  isLoadingCategories: true,
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
      const { parentCategories, childCategories } = splitCategories(categories);
      const monthExpensesByCategory = getExpensesByCategories(parentCategories, childCategories, monthExpenses);
      const weekExpensesByCategory = getExpensesByCategories(parentCategories, childCategories, weekExpenses);
      const dayExpensesByCategory = getExpensesByCategories(parentCategories, childCategories, dayExpenses);      
      
      state.isLoadingExpenses = false;
      state.isLoadingCategories = false;
      state.categories = action.payload.categories;
      state.parentCategories = parentCategories;
      state.childCategories = childCategories;
      state.dayExpenses = action.payload.dayExpenses;
      state.weekExpenses = action.payload.weekExpenses;
      state.monthExpenses = action.payload.monthExpenses;
      state.dayExpensesByCategory = dayExpensesByCategory;
      state.weekExpensesByCategory = weekExpensesByCategory;
      state.monthExpensesByCategory = monthExpensesByCategory;
      state.error = '';
    },
    getExpensesDataFail(state, action: PayloadAction<GraphQLError>) {
      state.isLoadingExpenses = false;
      state.isLoadingCategories = false;
      state.error = action.payload.message;
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
    createExpensesFail(state, action: PayloadAction<GraphQLError>) {
      state.isLoadingExpenses = false;
      state.error = action.payload.message;
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
    updateExpensesFail(state, action: PayloadAction<GraphQLError>) {
      state.isLoadingExpenses = false;
      state.error = action.payload.message;
    },
    createCategory(state, action: PayloadAction<CreateCategoryInput>) {
      state.isLoadingCategories = true;
    },
    createCategorySuccess(state, action: PayloadAction<Category>) {
      const updatedCategores = [...state.categories, action.payload];
      const { parentCategories, childCategories } = splitCategories(updatedCategores);
      state.isLoadingCategories = false;
      state.categories = updatedCategores;
      state.parentCategories = parentCategories;
      state.childCategories = childCategories;
      state.error = '';
    },
    createCategoryFail(state, action: PayloadAction<GraphQLError>) {
      state.isLoadingCategories = false;
      state.error = action.payload.message;
    },
    deleteExpensesCategory(state, action: PayloadAction<DeleteExpensesCategoryInput>) {
      state.isLoadingCategories = true;
      state.isLoadingExpenses = true;
    },
    deleteExpensesCategorySuccess(state, action: PayloadAction<Category>) {
      const updatedCategores = [...state.categories, action.payload];
      const { parentCategories, childCategories } = splitCategories(updatedCategores);
      state.isLoadingCategories = false;
      state.isLoadingExpenses = false;
      state.categories = updatedCategores;
      state.parentCategories = parentCategories;
      state.childCategories = childCategories;
      state.error = '';
    },
    deleteExpensesCategoryFail(state, action: PayloadAction<GraphQLError>) {
      state.isLoadingCategories = false;
      state.isLoadingExpenses = false;
      state.error = action.payload.message;
    },
    getExpensesByMonthData(state, action: PayloadAction<GetExpensesByMonthInput>) {
      state.isLoadingExpenses = true;
      state.isLoadingCategories = true;
    },
    getExpensesByMonthDataSuccess(state, action: PayloadAction<ExpensesByMonthData>) {      
      const categories = action.payload.categories;
      const expensesByMonth = action.payload.expensesByMonth;
      const { parentCategories, childCategories } = splitCategories(categories);
      const monthlyExpensesByCategory: MonthlyExpensesByCategory[] = [];
      expensesByMonth.forEach((monthExpenses) => {
        const monthExpensesByCategory = getExpensesByCategories(parentCategories, childCategories, monthExpenses.expenses);    
        monthlyExpensesByCategory.push({
          total: monthExpenses.total,
          year: monthExpenses.year,
          month: monthExpenses.month,
          ...monthExpensesByCategory
        });
      });

      state.isLoadingExpenses = false;
      state.isLoadingCategories = false;
      state.categories = action.payload.categories;
      state.parentCategories = parentCategories;
      state.childCategories = childCategories;
      state.expensesByMonth = monthlyExpensesByCategory.reverse();
      state.error = '';
    },
    getExpensesByMonthDataFail(state, action: PayloadAction<GraphQLError>) {
      state.isLoadingExpenses = false;
      state.isLoadingCategories = false;
      state.error = action.payload.message;
    },
    getMonthByDayExpenses(state, action: PayloadAction<GetMonthExpensesByDayInput>) {
      state.isLoadingExpenses = true;
    },
    getMonthByDayExpensesSuccess(state, action: PayloadAction<MonthExpensesByDay>) { 
      console.log(action.payload); 
      const monthExpensesByDay: {
        [key: string]: ByDayExpense
      } = {};
      action.payload.byDayExpenses.forEach((day) => {
        monthExpensesByDay[day.day] = day;
      });

      state.isLoadingExpenses = false;
      state.monthExpensesByDay = monthExpensesByDay;
      state.error = '';
    },
    getMonthByDayExpensesFail(state, action: PayloadAction<GraphQLError>) {
      state.isLoadingExpenses = false;
      state.error = action.payload.message;
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
  deleteExpensesCategory,
  deleteExpensesCategorySuccess,
  deleteExpensesCategoryFail,
  getExpensesByMonthData,
  getExpensesByMonthDataSuccess,
  getExpensesByMonthDataFail,
  getMonthByDayExpenses,
  getMonthByDayExpensesSuccess,
  getMonthByDayExpensesFail
} = expensesDataSlice.actions;

export default expensesDataSlice.reducer;
