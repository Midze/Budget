import moment from 'moment';
import React, { useEffect } from 'react';
import Card from '../../components/Card';
import Expense from '../../components/Expense';
import ExpenseList from '../../components/ExpenseList';
import Total from '../../components/Total';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getExpensesByMonthData } from '../../data/reducers/ExpensesSlice';
import { Category, Expense as ExpenseI } from '../../data/types/interfaces';
import './styles.css';
import hash_sum from 'hash-sum';



const ByMonth = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.users.user._id);
  const expensesByMonth = useAppSelector(state => state.expensesData.expensesByMonth);
  const isLoadingExpenses = useAppSelector(state => state.expensesData.isLoadingExpenses);
  const isLoadingCategories = useAppSelector(state => state.expensesData.isLoadingCategories);

  const isLoading = isLoadingExpenses && isLoadingCategories;

  useEffect(() => {
    if(userId) {
      dispatch(getExpensesByMonthData({
        userId,
        year: Number(moment().format('YYYY')),
        months: [
          Number(moment().subtract(2, 'months').format('M')),
          Number(moment().subtract(1, 'months').format('M')),
          Number(moment().format('M')),
        ],
      }));
    }
  }, [userId]);
  
  const monthlyExpenses = expensesByMonth.map(({
    total,
    year,
    month,
    parentCategory,
    childCategories,
    maxValue
  }) => {
    return (
      <Card key={hash_sum([total, month])} title={`Monthly Epenses for ${moment([year, month -1 , 1]).format('MMMM')} ${year}`} type={'expenses'}>
        <Total value={total} size='l' isLoading={isLoading}/>
        {parentCategory && <ExpenseList isLoading={isLoading} expenses={{parentCategory, childCategories, maxValue}}/>}
      </Card>
    );
  });

  return (
    <div className="dashbord">
      {monthlyExpenses}
    </div>
  );
};

export default ByMonth;