import React from 'react';
import cn from 'classnames';
import styles from './Icons.module.css';

interface ArrowIconProps {
  className?: string;
  onClick?: () => void;
}

const ArrowIcon:React.FC<ArrowIconProps> = ({className, onClick}) => {
  return (
    <div className={cn(styles.iconButton, className)} onClick={onClick}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#C7D0D9" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.43099e-07 12C6.41892e-08 18.6172 5.3828 24 12 24C18.6172 24 24 18.6172 24 12C24 5.3828 18.6163 2.21997e-07 12 1.43099e-07C5.38373 6.42004e-08 2.22008e-07 5.3828 1.43099e-07 12ZM22.141 12C22.141 17.591 17.592 22.141 12 22.141C6.40805 22.141 1.85902 17.591 1.85902 12C1.85902 6.40805 6.40805 1.85902 12 1.85902C17.592 1.85902 22.141 6.40899 22.141 12Z"/>
        <path d="M13.2827 6.69245L8.63518 11.34C8.27452 11.7025 8.27452 12.2881 8.63518 12.6506L13.2827 17.2982C13.6304 17.5966 14.1444 17.5966 14.492 17.2982C14.8815 16.9645 14.927 16.3771 14.5933 15.9876L10.6058 12L14.5934 8.00308C14.954 7.64055 14.954 7.05499 14.5934 6.69245C14.2308 6.3318 13.6452 6.3318 13.2827 6.69245Z"/>
      </svg>
    </div>
  );
};

export default ArrowIcon;