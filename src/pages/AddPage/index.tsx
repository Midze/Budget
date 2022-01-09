import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getExpensesData } from '../../store/reducers/ExpensesSlice';

import Card from '../../components/Card';
import AddForm from '../../components/Form';
import Total from '../../components/Total';
import CategoriesManagment from '../../components/CategoriesManagment';

import { Category, Expense } from '../../types/interfaces';

import styles from './AddPage.module.css';
import moment from 'moment';
import DateSelector from '../../components/DateSelector';

interface AddPageProps {
  categories: Category[];
  dayTotal: number;
  weekTotal: number;
  monthTotal: number;
  expenses: Expense[];
}

const AddPage: React.FC<AddPageProps> = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.expensesData.categories);
  const userId = useAppSelector(state => state.users.user._id);
  const isLoadingExpenses = useAppSelector(state => state.expensesData.isLoadingExpenses);
  const isLoadingCategories = useAppSelector(state => state.expensesData.isLoadingCategories);
  const { total: dayTotal, expenses, _id: expenseId } = useAppSelector(state => state.expensesData.dayExpenses);
  const { total: weekTotal } = useAppSelector(state => state.expensesData.weekExpenses);
  const { total: monthTotal } = useAppSelector(state => state.expensesData.monthExpenses);
  const categoriesForSelect = categories.map((category) => ({value: category._id, label: category.name }));  
  const [selectedDate, setSelectedDate] = useState(moment());
  const splittedSelectedDate = {
    day: Number(selectedDate.format('D')),
    week: Number(selectedDate.format('W')),
    month: Number(selectedDate.format('M')),
    year: Number(selectedDate.format('YYYY')),
  };

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

  useEffect(() => {
    if(userId) {
      dispatch(getExpensesData({
        userId,
        ...splittedSelectedDate,
      }));
    }
  }, [selectedDate]);

  return (
    <div className={cn(styles.addPage)}>
      <Card type="add" title={'Daily Expenses'}>
        <DateSelector 
          changeDate={setSelectedDate}
        />
        <AddForm
          className={cn(styles.form)}
          categories={categoriesForSelect}
          expenses={expenses}
          currentDate={splittedSelectedDate}
          expenseId={expenseId}
          isLoading={isLoadingExpenses && isLoadingCategories}
        />
      </Card>
      <Card className={cn(styles.totals)} type="total" title={''}>
        <Total className={cn(styles.total)} value={dayTotal} title="Total Day" size='m'  isLoading={isLoadingExpenses}/>
        <Total className={cn(styles.total)} value={weekTotal} title="Total Week" size='m'  isLoading={isLoadingExpenses}/>
        <Total className={cn(styles.total)} value={monthTotal} title="Total Month" size='m'  isLoading={isLoadingExpenses}/>
      </Card>
      <Card className={cn(styles.chart)} type="chart" title={'Day'}/>
      <Card className={cn(styles.catigories)} type="categories" title={'Categories managment'}>
        <CategoriesManagment
          categories={categories}
          isLoading={isLoadingCategories}
        />
      </Card>
    </div>
  );
};

export default AddPage;