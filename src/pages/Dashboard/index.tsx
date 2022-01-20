import moment from 'moment';
import React, { useEffect } from 'react';
import Card from '../../components/Card';
import Expense from '../../components/Expense';
import ExpenseList from '../../components/ExpenseList';
import Total from '../../components/Total';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getExpensesData } from '../../data/reducers/ExpensesSlice';
import { Category, Expense as ExpenseI } from '../../data/types/interfaces';
import './styles.css';



const Dashboard = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.expensesData.categories);
  const userId = useAppSelector(state => state.users.user._id);
  const dayExpensesByCategory = useAppSelector(state => state.expensesData.dayExpensesByCategory);
  const weekExpensesByCategory = useAppSelector(state => state.expensesData.weekExpensesByCategory);
  const monthExpensesByCategory = useAppSelector(state => state.expensesData.monthExpensesByCategory);
  const { total: dayTotal, expenses: dayExpenses } = useAppSelector(state => state.expensesData.dayExpenses);
  const { total: weekTotal, expenses: weekExpenses } = useAppSelector(state => state.expensesData.weekExpenses);
  const { total: monthTotal, expenses: monthExpenses } = useAppSelector(state => state.expensesData.monthExpenses);
  const isLoadingExpenses = useAppSelector(state => state.expensesData.isLoadingExpenses);
  const isLoadingCategories = useAppSelector(state => state.expensesData.isLoadingCategories);

  const isLoading = isLoadingExpenses && isLoadingCategories;

  
  useEffect(() => {
    if(userId) {
      dispatch(getExpensesData({
        userId,
        day: Number(moment().format('D')),
        week: Number(moment().format('W')),
        month: Number(moment().format('M')),
        year: Number(moment().format('YYYY')),
      }));
    }
  }, [userId]);
  // console.log('dayExpensesByCategory',dayExpensesByCategory );
  // console.log('weekExpensesByCategory',weekExpensesByCategory );
  // console.log('monthExpensesByCategory',monthExpensesByCategory );

  return (
    <div className="dashbord">
      <Card title='Daily Epenses' type={'expenses'}>
        <Total value={dayTotal} size='l' isLoading={isLoading}/>
        {dayExpenses && <ExpenseList isLoading={isLoading} expenses={dayExpensesByCategory}/>}
      </Card>
      <Card title='Weekly Epenses' type={'expenses'}>
        <Total value={weekTotal} size='l' isLoading={isLoading}/>
        {weekExpenses && <ExpenseList isLoading={isLoading} expenses={weekExpensesByCategory}/>}
      </Card>
      <Card title='Monthly Epenses' type={'expenses'}>
        <Total value={monthTotal} size='l' isLoading={isLoading}/>
        {monthExpenses && <ExpenseList isLoading={isLoading} expenses={monthExpensesByCategory}/>}
      </Card>
    </div>
  );
};

export default Dashboard;