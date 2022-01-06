import React, { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from 'react';
import cn from 'classnames';
import hash from 'hash-sum';

import FormRow from './FormRow';
import styles from './Form.module.css';
import Plug from './../Plug';

import { Expense } from '../../types/interfaces';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createExpenses, updateExpenses } from '../../store/reducers/ExpensesSlice';

interface AddFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  categories: {
    value: string,
    label: string,
  }[];
  expenses: Expense[];
  currentDate: {
    day: number;
    week: number;
    month: number;
    year: number;
  };
  expenseId: string | null;
  isLoading: boolean;
}

const AddForm: React.FC<AddFormProps> = ({className, categories, currentDate, expenseId, isLoading}) => {
  const dispatch = useAppDispatch();
  const { total: dayTotal, expenses, _id } = useAppSelector(state => state.expensesData.dayExpenses);
  const [formData, setFormData] = useState(expenses); 
  const addRow = (rowData): void => {
    setFormData([...formData, rowData]);
  };
  const deleteRow = (rowIndex:number):void => {
    const updateFormData = formData.filter((item, index) => {
      return index !== rowIndex;
    });
    setFormData(updateFormData);
  };
  const restoreFormData = () => {
    setFormData([...expenses]);
  };
  const submitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('formData', formData);
    // if (expenseId) {
    //   dispatch(updateExpenses({
    //     _id: expenseId,
    //     updateExpenseInput: {
    //       expenses: formData,
    //     },
    //   }));
    // } else {
    //   dispatch(createExpenses({
    //     createExpensesInput: {
    //       userId: '61c921a24cc44e4914b85065',
    //       ...currentDate,
    //       expenses: formData
    //     }
    //   }));
    // }
  };
  
  useEffect(() => {
    setFormData(expenses);
  }, [expenses]);
  
  return (
    <>
      <form className={cn(styles.form, className)} onSubmit={submitForm}>
        {isLoading && <Plug type='rect' size='l'/>}
        {!isLoading && <>
          {formData.map((expense, index) =>
            <FormRow
              key={hash(Math.random())}
              categories={categories}
              price={expense.price}
              category={expense.category}
              index={index}
              remove={deleteRow}
            />)}
          <FormRow
            key={hash(Math.random())}
            categories={categories}
            price={undefined}
            category={''}
            add={addRow}
          /></>}
        <div className={cn(styles.controls)}>
          <input className={cn(styles.button, styles.save)} type="submit" value="Save" />
          <input
            className={cn(styles.button, styles.cancel)}
            type="button"
            value="Cancel"
            onClick={restoreFormData}
          />
        </div>
      </form>
    </>
  );
};

export default AddForm;