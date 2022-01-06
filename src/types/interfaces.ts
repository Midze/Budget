export interface User {
  _id?: string;
  login?: string;
  email?: string;
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

export interface ExpensesData {
  categories: Category[];
  dayExpenses: Expenses;
  weekExpenses: Expenses;
  monthExpenses: Expenses;
}

export interface ExpensesByCategory {
  parentCategory: {
    [index: string]: Category & {
      value: number;
      children: Category[];
    }
  };
  childCategories: {
    [index: string]: Category & {
      value: number
    }
  };
}

export interface GetExpensesInput {
  userId: string;
  year: number;
  month: number;
  week: number;
  day: number;
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