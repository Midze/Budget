import moment from 'moment';
import React, { useEffect } from 'react';
import Card from '../../components/Card';
import Expense from '../../components/Expense';
import ExpenseList from '../../components/ExpenseList';
import Total from '../../components/Total';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getMonthByDayExpenses } from '../../data/reducers/ExpensesSlice';
import { Category, Expense as ExpenseI } from '../../data/types/interfaces';
import hash_sum from 'hash-sum';
import cn from 'classnames';
import styles from './MonthByDay.module.css';



const MonthByDay = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.users.user._id);
  const monthExpensesByDay = useAppSelector(state => state.expensesData.monthExpensesByDay);
  // console.log(moment().daysInMonth());
  // console.log(moment().startOf('month').format('w'));
  // console.log(moment().endOf('month').format('w'));
  // console.log(moment().date(1).format('dddd'));
  // console.log(moment().week(10).startOf('week').format('D-MMMM'));
  const weekDays = moment.weekdays();
  const calendar = [];
  const monthStartWeekNumber = Number(moment().startOf('month').format('w'));
  const monthEndtWeekNumber = Number(moment().endOf('month').format('w'));
  const currentMonth = moment().format('M');

  let week = monthStartWeekNumber;
  while(week <= monthEndtWeekNumber) {
    const currentWeek = [];
    const firstDayOFWeek = moment().week(week).startOf('week');
    const lastDayOFWeek = moment().week(week).endOf('week');
    const day = firstDayOFWeek;

    while (Number(day.toDate()) <= Number(lastDayOFWeek.toDate())) {
      currentWeek.push({
        name: day.format('dddd'),
        day: Number(day.format('D')),
        month: Number(day.format('M')),
        isActive: day.format('M') === currentMonth,
      });
      day.add(1,'day');
    }
    calendar.push(currentWeek);
    week++;
  }

  useEffect(() => {
    dispatch(getMonthByDayExpenses({
      userId,
      year: Number(moment().format('YYYY')),
      month: Number(moment().format('M')),
    }));
  },[]);

  console.log('calendar', calendar);
  console.log('monthExpensesByDay', monthExpensesByDay);

  return (
    <div className={cn(styles.monthByDay)}>
      <div className={cn(styles.week, styles.weekHeader)}>{
        weekDays.map(
          (day) => 
            <div
              key={hash_sum([day])}
              className={cn(styles[day.toLocaleLowerCase()])}
            >
              {day}
            </div>
        )
      }</div>
      {calendar.map((week) => {
        return (
          <div
            key={hash_sum([week])}
            className={cn(styles.week)}
          >
            {
              week.map(
                (day) =>
                  <div
                    key={hash_sum([day.name, day.day])}
                    className={cn( styles.weekDay, styles[day.name.toLocaleLowerCase()], {
                      [styles.disabled]: !day.isActive,
                    })}
                  >
                    <div>{day.day}</div>
                    <div>
                      {day.isActive && monthExpensesByDay[day.day]?.total ?  Number(monthExpensesByDay[day.day].total).toFixed(2) : '-'}
                    </div>
                  </div>
              )
            }
          </div>
        );
      })}
    </div>
  );
};

export default MonthByDay;