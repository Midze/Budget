import React, { ReactNode } from 'react';
import cn from 'classnames';
import styles from './CategoriesManagment.module.css';
import { DeleteCategoryInput } from 'data/types/interfaces';

interface ChildCategoryProps {
  name: string;
  children?: ReactNode[];
  id: string;
  childOf: string;
  setIsModalActive: (active: boolean) => void;
  setCategoryForDelete: React.Dispatch<React.SetStateAction<DeleteCategoryInput>>
}

const ChildCategory: React.FC<ChildCategoryProps> = ({ name, id, childOf, setIsModalActive, setCategoryForDelete }) => {
  const removeButtonHandler = () => {
    setIsModalActive(true);
    setCategoryForDelete({_id: id, childOf});
  };

  return (
    <div className={cn(styles.child)}>
      {name}<button className={cn(styles.button)} onClick={removeButtonHandler}>Delete</button>
    </div>
  );
};

export default ChildCategory;
