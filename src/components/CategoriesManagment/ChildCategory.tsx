import React, { ReactNode } from 'react';
import cn from 'classnames';
import styles from './CategoriesManagment.module.css';

interface ChildCategoryProps {
  name: string;
  children?: ReactNode[];
}

const ChildCategory: React.FC<ChildCategoryProps> = ({name}) => {
  return (
    <div className={cn(styles.child)}>
      {name}<button className={cn(styles.button)}>Delete</button>
    </div>
  );
};

export default ChildCategory;
