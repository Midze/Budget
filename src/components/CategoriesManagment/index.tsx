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
  const { parentCategories, childCategories} = useAppSelector(state => state.expensesData);
  const [inputValue, setInputValue] = useState('');
  const parents: [Category] | [] = [];
  const children: {[key:string]: [Category] | []} = {};
  const addCategory = (childOf: string | null = null, name: string) => {
    dispatch(createCategory({
      userId: '61c921a24cc44e4914b85065',
      name: name.toLocaleLowerCase(),
      childOf,
    }));
    // to-do add validation on emty field
    setInputValue('');
  };

  const handleClick = () => {
    addCategory(null, inputValue);
  };
  // console.log('categories', categories);
  
  // categories.forEach((item: Category) => {
  //   if (item.childOf) {
  //     if(!children[item.childOf]) {
  //       children[item.childOf] = [item];
  //     } else children[item.childOf].push(item);
  //   } else {
  //     if (!children[item._id]) {
  //       children[item._id] = [];
  //     }
  //     parents.push(item);
  //   }
  // });
  
  const isDataLoaded = !!categories.length;
  const isFetching = isLoading;
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
