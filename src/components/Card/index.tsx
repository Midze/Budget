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
  const typeStyle = type ? styles[type] : '';
  return (
    <div className={cn(styles.card, className, typeStyle)}>
      {title && <div className={cn(styles.title)}>{ title }</div>}
      { children }
    </div>
  );
};

export default Card;