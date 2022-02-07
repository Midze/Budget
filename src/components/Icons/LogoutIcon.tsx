import React from 'react';
import cn from 'classnames';
import styles from './Icons.module.css';
interface LogoutIconProps {
  className?: string;
  onClick?: () => void;
}

const MinusIcon:React.FC<LogoutIconProps> = ({className, onClick}) => {
  return (
    <div className={cn(styles.iconButton, className)} onClick={onClick}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="#C7D0D9" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.92 16H28.92" stroke="#C7D0D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23.9301 25V28H7.93005V4H23.9301V7H25.9301V3C25.9301 2.73478 25.8247 2.48043 25.6372 2.29289C25.4496 2.10536 25.1953 2 24.9301 2H6.93005C6.66484 2 6.41048 2.10536 6.22295 2.29289C6.03541 2.48043 5.93005 2.73478 5.93005 3V29C5.93005 29.2652 6.03541 29.5196 6.22295 29.7071C6.41048 29.8946 6.66484 30 6.93005 30H24.9301C25.1953 30 25.4496 29.8946 25.6372 29.7071C25.8247 29.5196 25.9301 29.2652 25.9301 29V25H23.9301Z"/>
        <path d="M28.92 16L24.92 20" stroke="#C7D0D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M28.92 16L24.92 12" stroke="#C7D0D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24.92 8.09V6.09" stroke="#C7D0D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24.92 26V24" stroke="#C7D0D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
};

export default MinusIcon;