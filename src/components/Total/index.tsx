import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Total.module.css';

interface TotalProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  value: number;
  title?: string;
  size?: string;
  isLoading: boolean;
}

const Total: React.FC<TotalProps> = ({ className, value, title, size = 'l', isLoading }): JSX.Element => {
  return (
    <div className={cn(styles.total, className,)}>
      {title && <div className={cn(styles.title)}>{ title }</div>}
      <div className={cn(styles.circle, className, {
        [styles.circle_l]: size == 'l',
        [styles.circle_m]: size == 'm',
        [styles.loading]: isLoading,
      })}>
        <div className={cn(styles.value, {
          [styles.loading]: isLoading,
        })}>
          { value.toFixed(2) } ₾
        </div>
      </div>
    </div>
  );
};

export default Total;