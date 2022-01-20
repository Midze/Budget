import React, { Dispatch, SetStateAction, useState } from 'react';
import DatePicker from 'react-datepicker';
import cn from 'classnames';
import styles from './DateSelector.module.css';
import ArrowIcon from '../../Icons/ArrowIcon';
import moment, { Moment } from 'moment';
import './styles.css';

interface DateSelectorProps {
  className?: string;
  changeDate: (date: Moment) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({className, changeDate}): JSX.Element => {
  const [startDate, setStartDate] = useState(new Date());
  const prevDay = () => {
    const prevDay = moment(startDate).subtract(1, 'days');
    changeDate(prevDay);
    setStartDate(prevDay.toDate());
  };
  const nextDay = () => {
    const nextDate = moment(startDate).add(1, 'days');
    changeDate(nextDate);
    setStartDate(nextDate.toDate());
  };
  const onCHangeDate = (date: Date) => {
    changeDate(moment(date));
    setStartDate(date);
  };

  return (
    <div className={cn(styles.datePickerContainer, className)}>
      <ArrowIcon
        className={cn(styles.arrow, styles.arrowPrev)}
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
        className={cn(styles.arrow, styles.arrowNext)}
        onClick={nextDay}
      />  
    </div>
  );
};

export default DateSelector;
