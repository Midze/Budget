import React, { useState } from 'react';
import { Category } from '../../data/types/interfaces';
import ParentCategory from './ParentCategory';
import cn from 'classnames';
import styles from './CategoriesManagment.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createCategory } from '../../data/reducers/ExpensesSlice';
import Plug from '../Plug';

interface CategoriesManagmentProps {
  categories: Category[];
  isLoading: boolean;
}

const CategoriesManagment: React.FC<CategoriesManagmentProps> = ({categories, isLoading}): JSX.Element => {
  const dispatch = useAppDispatch();
  const { parentCategories } = useAppSelector(state => state.expensesData);
  const { _id } = useAppSelector(state => state.users.user);
  const [inputValue, setInputValue] = useState('');
  const isDataLoaded = !!categories.length;
  const isFetching = isLoading;

  
  const handleClick = () => {
    addCategory(null, inputValue);
  };
  const addCategory = (childOf: string | null = null, name: string) => {
    dispatch(createCategory({
      userId: _id,
      name: name.toLocaleLowerCase(),
      childOf,
    }));
    // to-do add validation on emty field
    setInputValue('');
  };

  return (
    <div className={cn(styles.categoryManagment)}>
      { !isDataLoaded && <Plug size='m' type='rect'/>}
      {isDataLoaded && Object.keys(parentCategories).map((id: string) => {
        const parent = parentCategories[id];
        return (
          <ParentCategory
            key={parent._id}
            name={parent.name}
            id={parent._id}
            isDefault={parent.userId === 'default'}
            childCategories={parent.children}
            addCategory={addCategory}
            isFetching={isFetching}
          />
        );
      })}
      {!isFetching ? <div className={cn(styles.inputContainer)}>
        <input className={cn(styles.input)}
          type='text'
          value={inputValue}
          placeholder={'Add Parent Category'}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {inputValue && <button className={cn(styles.button)} onClick={handleClick}>Add</button>}
      </div> : <Plug size='s' type='rect' count={1}/>}
    </div>
  );
};

export default CategoriesManagment;
