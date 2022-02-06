import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import cn from 'classnames';
import styles from './DateSelector.module.css';
import ArrowIcon from 'components/Icons/ArrowIcon';
import moment, { Moment } from 'moment';
import './styles.css';
import { useAppSelector } from 'hooks/redux';

interface DateSelectorProps {
  className?: string;
  changeDate: (date: Moment) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({className, changeDate}): JSX.Element => {
  const isLoadingExpenses = useAppSelector(state => state.expensesData.isLoadingExpenses);
  const [startDate, setStartDate] = useState(new Date());
  const prevDay = () => {
    const prevDay = moment(startDate).subtract(1, 'days');
    changeDate(prevDay);// to-do use debounce
    setStartDate(prevDay.toDate());
  };
  const nextDay = () => {
    const nextDate = moment(startDate).add(1, 'days');
    changeDate(nextDate);// to-do use debounce
    setStartDate(nextDate.toDate());
  };
  const onCHangeDate = (date: Date) => {
    changeDate(moment(date));
    setStartDate(date);
  };

  return (
    <div className={cn(styles.datePickerContainer, className)}>
      <ArrowIcon
        className={cn(styles.arrow, styles.arrowPrev, {
          [styles.disabled]: isLoadingExpenses
        })}
        onClick={prevDay}
      />
      <DatePicker
        className={cn(styles.datePicker)}
        calendarClassName={cn(styles.datePickerDatesWrapper)}
        selected={startDate}
        dateFormat="dd/MM/yyyy"
        onChange={onCHangeDate}
      />
      <ArrowIcon
        className={cn(styles.arrow, styles.arrowNext, {
          [styles.disabled]: isLoadingExpenses
        })}
        onClick={nextDay}
      />  
    </div>
  );
};

export default DateSelector;
