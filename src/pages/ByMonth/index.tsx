import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Card from '../../components/Card';
import Expense from '../../components/Expense';
import ExpenseList from '../../components/ExpenseList';
import Total from '../../components/Total';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getExpensesByMonthData } from '../../data/reducers/ExpensesSlice';
import { Category, Expense as ExpenseI } from '../../data/types/interfaces';
import './styles.css';
import hash_sum from 'hash-sum';
import DateSelector from 'components/DateSelector';



const ByMonth = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.users.user._id);
  const expensesByMonth = useAppSelector(state => state.expensesData.expensesByMonth);
  const isLoadingExpenses = useAppSelector(state => state.expensesData.isLoadingExpenses);
  const isLoadingCategories = useAppSelector(state => state.expensesData.isLoadingCategories);
  const [selectedDate, setSelectedDate] = useState(moment());
  const isLoading = isLoadingExpenses && isLoadingCategories;

  const splittedSelectedDate = {
    month: Number(selectedDate.format('M')),
    year: Number(selectedDate.format('YYYY')),
  };

  useEffect(() => {
    if(userId) {
      dispatch(getExpensesByMonthData({// bug with year when ypu coose edge of the year
        userId,
        year: splittedSelectedDate.year,
        months: [
          Number(moment(selectedDate).subtract(2, 'months').format('M')),
          Number(moment(selectedDate).subtract(1, 'months').format('M')),
          splittedSelectedDate.month,
        ],
      }));
    }
  }, [userId, selectedDate]);
  
  const monthlyExpenses = expensesByMonth.map(({
    total,
    year,
    month,
    parentCategory,
    childCategories,
    maxValue
  }) => {
    return (
      <Card key={hash_sum([total, month])} className='month-expenses-card' title={`Monthly Epenses for ${moment([year, month -1 , 1]).format('MMMM')} ${year}`} type={'expenses'}>
        <Total value={total} size='l' isLoading={isLoading}/>
        {parentCategory && <ExpenseList isLoading={isLoading} expenses={{parentCategory, childCategories, maxValue}}/>}
      </Card>
    );
  });

  return (
    <div className="by-month-container">
      <div className="by-month-date-selector">
        <DateSelector
          changeDate={setSelectedDate}
          dateType='M'
          pickMonth
        />
      </div>
      {monthlyExpenses}
    </div>
  );
};

export default ByMonth;