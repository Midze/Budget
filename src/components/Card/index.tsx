import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';
import styles from './Card.module.css';

interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  type?: string;
  title: string;
  children?: ReactNode;
}

const Card: React.FC<CardProps> = ({ className, type, title, children }): JSX.Element => {
  return (
    <div className={cn(styles.card, className, {
      [styles.add]: type == 'add',
      [styles.total]: type == 'total',
      [styles.chart]: type == 'chart',
      [styles.categories]: type == 'categories',
      [styles.expenses]: type == 'expenses',
    })}>
      {title && <div className={cn(styles.title)}>{ title }</div>}
      { children }
    </div>
  );
};

export default Card;