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
  dateType: string;
  pickMonth?: boolean;
  changeDate: (date: Moment) => void;
}

type TypedateTypeMap = {
  M: string;
  d: string;
};

const dateTypeMap:TypedateTypeMap = {
  'M': 'MM/yyyy',
  'd': 'dd/MM/yyyy'
};

const DateSelector: React.FC<DateSelectorProps> = ({className, pickMonth, dateType, changeDate}): JSX.Element => {
  const isLoadingExpenses = useAppSelector(state => state.expensesData.isLoadingExpenses);
  const [startDate, setStartDate] = useState(new Date());
  const dateFormat = dateTypeMap[dateType as keyof TypedateTypeMap];
  const prevDate = () => {
    const prevDate = dateType === 'M' ? moment(startDate).subtract(1, dateType) : moment(startDate).subtract(1, 'd');
    changeDate(prevDate);// to-do use debounce
    setStartDate(prevDate.toDate());
  };
  const nextDate = () => {
    const nextDate = dateType === 'M' ? moment(startDate).add(1, 'M') : moment(startDate).add(1, 'd');
    changeDate(nextDate);// to-do use debounce
    setStartDate(nextDate.toDate());
  };
  
  const onChangeDate = (date: Date) => {
    changeDate(moment(date));
    setStartDate(date);
  };

  return (
    <div className={cn(styles.datePickerContainer, className)}>
      <ArrowIcon
        className={cn(styles.arrow, styles.arrowPrev, {
          [styles.disabled]: isLoadingExpenses
        })}
        onClick={prevDate}
      />
      <DatePicker
        className={cn(styles.datePicker)}
        calendarClassName={cn(styles.datePickerDatesWrapper)}
        selected={startDate}
        dateFormat={dateFormat}
        onChange={onChangeDate}
        showMonthYearPicker={pickMonth}
      />
      <ArrowIcon
        className={cn(styles.arrow, styles.arrowNext, {
          [styles.disabled]: isLoadingExpenses
        })}
        onClick={nextDate}
      />  
    </div>
  );
};

export default DateSelector;
