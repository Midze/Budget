import React, { useState } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { createCategory, deleteExpensesCategory } from 'data/reducers/ExpensesSlice';
import { Category, DeleteExpensesCategoryInput } from 'data/types/interfaces';
import Plug from 'components/Plug';
import Modal from 'components/Modal';
import ParentCategory from './ParentCategory';

import styles from './CategoriesManagment.module.css';

interface CategoriesManagmentProps {
  categories: Category[];
  userId: string;
  currentDate: {
    day: number;
    week: number;
    month: number;
    year: number;
  };
  isLoading: boolean;
}

const CategoriesManagment: React.FC<CategoriesManagmentProps> = ({categories, userId, currentDate, isLoading}): JSX.Element => {
  const dispatch = useAppDispatch();
  const { parentCategories } = useAppSelector(state => state.expensesData);
  const { _id } = useAppSelector(state => state.users.user);
  const [inputValue, setInputValue] = useState('');
  const [isModalActive, setIsModalActive] = useState(false);
  const [categoryForDelete, setCategoryForDelete] = useState<{_id: string, childOf?: string}>({_id: ''});
  
  const isDataLoaded = !!categories.length;
  const isFetching = isLoading;
  
  
  const handleClick = () => {
    addCategory(null, inputValue);
  };
  
  const handleModaleButtonNo = () => {
    setIsModalActive(false);
  };

  const handleModaleButtonYes = () => {
    
    dispatch(deleteExpensesCategory({
      ids: [categoryForDelete._id],
      ...currentDate,
      userId,
    }));

    setIsModalActive(false);

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
            setIsModalActive={setIsModalActive}
            setCategoryForDelete={setCategoryForDelete}
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
      { isModalActive && <Modal setIsModalActive={setIsModalActive}>
        <div className={cn(styles.modal)}>
          <h4 className={cn(styles.modalTitle)}>Are you sure you want to delete this category?</h4>
          <p>All expenses from this category will be moved to the {categoryForDelete.childOf ? 'parent' : 'uncategorized'} category</p>
          <button className={cn(styles.modalButton)} onClick={handleModaleButtonYes}>Yes</button>
          <button className={cn(styles.modalButton)} onClick={handleModaleButtonNo}>No</button>
        </div>  
      </Modal>}
    </div>
  );
};

export default CategoriesManagment;
