import React, { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from 'react';
import cn from 'classnames';
import hash from 'hash-sum';

import FormRow from './FormRow';
import styles from './Form.module.css';
import Plug from './../Plug';
import PlusIcon from './../../Icons/PlusIcon';
import { Expense } from '../../types/interfaces';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createExpenses, expensesDataSlice, updateExpenses } from '../../store/reducers/ExpensesSlice';

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
  const [errors, setErrors] = useState<{[key: number]:{price: boolean, category: boolean}}>({}); 
  const addRow = (): void => {
    const lastIndex = formData.length - 1;
    const price = formData[lastIndex]?.price;
    const category = formData[lastIndex]?.category;
    if((category && price) || !formData.length) {
      const newRow = {
        price: undefined,
        category: '',
      };
      setFormData([...formData, newRow]);
      setErrors({});
    } else {
      console.log('Pidor');

      const newError = {
        [lastIndex]: {
          category: !category,
          price: !price,
        },
      };
      setErrors(newError);
    }
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
  const setFieldValue = (index, name, value) => {
    // const rowData = {...formData[index], [name]: value};
    const rowData = {...formData[index], [name]: name === 'price' ? Number(value).toFixed(2) : value};
  
    if(errors[index]) {
      const currentError = errors[index];
      setErrors({
        ...errors,
        [index]: {
          ...currentError,
          [name]: !value,
        }
      });
    }

    setFormData([...formData.slice(0, index), rowData, ...formData.slice(index+1)]);
  };
  const submitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const errorsOnSubmit = {};
    let isErrors = false;
    formData.forEach((row, index) => {
      errorsOnSubmit[index] = {
        price: !row.price,
        category: !row.category,
      };
      if(!row.price || !row.category) {
        isErrors = true;
      }
    });
    setErrors(errorsOnSubmit);
    console.log(errorsOnSubmit);

    if (expenseId && !isErrors) {
      return dispatch(updateExpenses({
        _id: expenseId,
        updateExpenseInput: {
          expenses: formData,
        },
      }));
    } 
    if (!isErrors) {
      return dispatch(createExpenses({
        createExpensesInput: {
          userId: '61c921a24cc44e4914b85065',
          ...currentDate,
          expenses: formData
        }
      }));
    }
  };
  
  useEffect(() => {
    setFormData(expenses);
  }, [expenses]);
  
  return (
    <>
      <form className={cn(styles.form, className)} onSubmit={submitForm}>
        <div className={cn(styles.formHeader)}>
          <div className={cn(styles.formHeaderName)}>Category:</div>
          <div className={cn(styles.formHeaderName)}>Price:</div>
          <PlusIcon className={cn(styles.addRowButton)} onClick={addRow}/>
        </div>
        {isLoading && <Plug type='rect' size='l'/>}
        {!isLoading && <div className={cn(styles.formExpenses)}>
          { formData.length ? formData.map((expense, index) =>
            <FormRow
              key={hash(Math.random())}
              categories={categories}
              price={expense.price}
              category={expense.category}
              index={index}
              remove={deleteRow}
              setFieldValue={setFieldValue}
              error={errors}
            />) : <div className={cn(styles.notice)}>
            <PlusIcon className={cn(styles.addRowButton)} onClick={addRow}/>
            <div className={cn(styles.noticeContent)}>No Expenses for this day, please add some!</div>
          </div>}
        </div>}
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