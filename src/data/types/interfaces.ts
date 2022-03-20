export interface User {
  _id: string;
  login: string;
  email: string;
}

export interface Category {
  _id: string;
  name: string;
  childOf: string;
  userId: string;
}

export interface CreateCategoryInput {
  userId: string;
  name: string;
  childOf: string | null;
}

export interface Expenses {
  _id?: string;
  total: number;
  expenses: Expense[];
}

export interface Expense {
  price?: number;
  category: string;
}

export interface ChildCategory {
  [index: string]: Category & {
    value: number
  }
}

export interface ParentCategory {
  [index: string]: Category & {
    value: number;
    children: Category[];
  };
}

export interface ExpensesData {
  categories: Category[];
  dayExpenses: Expenses;
  weekExpenses: Expenses;
  monthExpenses: Expenses;
  parentCategory: ParentCategory;
  childCategories: ChildCategory;
}

export interface ExpensesByMonth {
  total: number;
  year: number;
  month: number;
  expenses: Expense[];
}

export interface ExpensesByMonthData {
  categories: Category[];
  expensesByMonth: ExpensesByMonth[];
}

export interface ExpensesByCategory {
  parentCategory: ParentCategory;
  childCategories: ChildCategory;
  maxValue: number;
}

export interface MonthlyExpensesByCategory {
  total: number;
  year: number;
  month: number;
  parentCategory: ParentCategory;
  childCategories: ChildCategory;
  maxValue: number;
}

export interface GetExpensesInput {
  userId: string;
  year: number;
  month: number;
  week: number;
  day: number;
}

export interface DeleteExpensesCategoryInput extends GetExpensesInput {
  ids: string[];
  userId: string;
  childOf?: string;
}

export interface UpdateExpensesInput {
  _id?: string;
  updateExpenseInput: {
    expenses: Expense[],
  };
}

export interface CreateExpensesInput {
  createExpensesInput: {
    userId: string;
    year: number;
    month: number;
    week: number;
    day: number;
    expenses: Expense[],
  }
}

export interface GetExpensesByMonthInput {
  userId: string;
  year: number;
  months: number[];
}

export interface ByDayExpense {
  total: number;
  day: number;
  month: number;
}

export interface MonthExpensesByDay {
  byDayExpenses: ByDayExpense[]
}

export interface GetMonthExpensesByDayInput {
  userId: string;
  year: number;
  month: number;
}