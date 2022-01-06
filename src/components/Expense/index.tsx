import React, { useState } from 'react';
import cn from 'classnames';
import styles from './Expense.module.css';
import { Category } from '../../types/interfaces';
import { colors } from './ExpenseColors';

interface ExpenseProps {
  className?: string;
  name: string;
  id: string;
  value: number;
  maxValue?: number;
  childCategories: {[index: string]: Category & {
    value: number
  }};
}
//parent Category
const Expense: React.FC<ExpenseProps> = ({
  className,
  id,
  name,
  value,
  maxValue = 0,
  childCategories,
}): JSX.Element => { 
  const length = value / (maxValue / 100);  
  const background = `linear-gradient(90deg, ${colors[name]} 0%, rgba(93, 129, 83, 0) 100%)`;
  const width = `${length}%`;
  const [isActive, setIsActive] = useState(false);
  const children = [];
  Object.keys(childCategories).forEach((_id) => {
    const child = childCategories[_id];
    if (child.childOf === id) {
      children.push(
        <div className={cn(styles.expense, styles.child)} >
          <div 
            className={cn(styles.background)}
            style={{background, width: isActive ? `${child.value / (value / 100)}%` : '1px'}}
          ></div>
          <span className={cn(styles.name)}>{ child.name }</span>
          <span className={cn(styles.value)}>{ child.value?.toFixed(2) }</span>
        </div>
      );
    }
  });

  const handleClick = () => {
    if(children.length) {
      setIsActive(!isActive);
    }
  };

  return (
    <div
      className={cn(styles.expense, className, {
        [styles.active]: isActive,
      })}
      onClick={handleClick}
      style={{'height': isActive ? `${children.length ? (30 + 38 * children.length) : 30}px` : '30px'}}
    >
      <div className={cn(styles.row, {
        [styles.withChildren]: children.length,
      })}>
        <div 
          className={cn(styles.background)}
          style={{background, width: isActive ? '100%' :width}}
        ></div>
        <span className={cn(styles.name)}>{ name }</span>
        <span className={cn(styles.value)}>{ value?.toFixed(2) }</span>
      </div>
      <div className={cn(styles.children)}>
        {!!children.length && children}
      </div>
    </div>
  );
};

export default Expense;