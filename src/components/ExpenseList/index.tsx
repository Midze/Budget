import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';
import styles from './ExpenseList.module.css';
import Plug from '../Plug';
import { ExpensesByCategory } from '../../data/types/interfaces';
import Expense from '../Expense';

interface ExpenseListProps {
  className?: string;
  children?: ReactNode;
  isLoading: boolean;
  expenses: ExpensesByCategory;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ className, children, isLoading, expenses }): JSX.Element => {
  const { parentCategory, childCategories, maxValue } = expenses;
  return (
    <div className={cn(styles.expenseList, className)}>
      { isLoading && <Plug size='m' type='rect'/>}
      { (!isLoading && parentCategory) && Object.keys(parentCategory).map((id) => {
        const item = parentCategory[id];
        return (<Expense key={id} id={id} name={item.name} value={item.value} childCategories={childCategories} maxValue={maxValue}/>);
      })} 
    </div>
  );
};

export default ExpenseList;