import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';
import styles from './ExpenseList.module.css';
import Plug from 'components/Plug';
import { ExpensesByCategory } from 'data/types/interfaces';
import Expense from 'components/Expense';
import PlusIcon from 'components/Icons/PlusIcon';
import { Link } from 'react-router-dom';

interface ExpenseListProps {
  className?: string;
  isLoading: boolean;
  expenses: ExpensesByCategory;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ className, isLoading, expenses }): JSX.Element => {
  const { parentCategory, childCategories, maxValue } = expenses;
  const parentCategoryList = Object.keys(parentCategory).map((id) => {
    const item = parentCategory[id];
    return (<Expense key={id} id={id} name={item.name} value={item.value} childCategories={childCategories} maxValue={maxValue}/>);
  });

  return (
    <div className={cn(styles.expenseList, className, {
      [styles.withScroll]: parentCategoryList.length,
    })}>
      { isLoading && <Plug size='m' type='rect'/>}
      { !isLoading && parentCategoryList}
      {!isLoading && !parentCategoryList.length && <Link to="/add" className={cn(styles.notice)}> 
        <PlusIcon className={cn(styles.addExpenseButton)}/>
        <div className={cn(styles.noticeContent)}>No Expenses for this period, please add some!</div>
      </Link>
      }
    </div>
  );
};

export default ExpenseList;