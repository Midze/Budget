import React, { ReactNode, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import styles from './CategoriesManagment.module.css';
import ChildCategory from './ChildCategory';
import { Category, DeleteExpensesCategoryInput } from 'data/types/interfaces';
import { useAppDispatch } from 'hooks/redux';
import Plug from 'components/Plug';

interface ParentCategoryProps {
  name: string;
  id: string;
  childCategories: Category[];
  isDefault: boolean;
  addCategory: (childOf:string, name: string) => void;
  isFetching: boolean;
  setIsModalActive: (active: boolean) => void;
  setCategoryForDelete: React.Dispatch<React.SetStateAction<{_id: string}>>
}

const ParentCategory: React.FC<ParentCategoryProps> = ({
  name,
  id,
  childCategories,
  isDefault,
  isFetching,
  addCategory,
  setIsModalActive,
  setCategoryForDelete
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [height, setHeight] = useState(0);
  const container = useRef<HTMLDivElement | null>(null);
  const addButtonHandler = () => {
    addCategory(id, inputValue);
    setInputValue('');
  };
  const removeButtonHandler = () => {
    setIsModalActive(true);
    setCategoryForDelete({_id: id});
  };
  const handleClick = () => {
    setIsActive(!isActive);
    if(container && container.current) {
      setHeight(container?.current?.clientHeight + 24);
    }
  };  

  useEffect(() => {
    if(isActive) {      
      if(container && container.current) {
        setHeight(container?.current?.clientHeight + 24);
      }
    }
  }, [childCategories]);

  return (
    <div className={cn(styles.parent, {[styles.active]: isActive})} style={{'height': isActive ? `${height}px` : '25px'}}>
      <div className={cn(styles.parentName)} onClick={handleClick}>
        {name}
      </div>
      <button
        className={cn(styles.button, {
          [styles.hidden]: isDefault,
        })}
        onClick={removeButtonHandler}
      >Delete</button>
      <div className={cn(styles.parentCategoryContent)} ref={container}>
        {!!childCategories.length &&
          childCategories.map((child) => <ChildCategory key={child._id} id={child._id} childOf={child.childOf} name={child.name} setIsModalActive={setIsModalActive} setCategoryForDelete={setCategoryForDelete}/>)
        }
        {!isFetching ? <div className={cn(styles.inputContainer)}>
          <input
            className={cn(styles.input)}
            type='text'
            placeholder={'Add Sub Category'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {inputValue && <button className={cn(styles.button)} onClick={addButtonHandler}>Add</button>}
        </div> : <Plug size='s' type='rect' count={1}/>}
      </div>
    </div>
  );
};

export default ParentCategory;
