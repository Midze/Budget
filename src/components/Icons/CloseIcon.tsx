import React from 'react';
import cn from 'classnames';
import styles from './Icons.module.css';

interface CloseIconProps {
  className?: string;
  onClick?: () => void;
}

const CloseIcon:React.FC<CloseIconProps> = ({className, onClick}) => {
  return (
    <div className={cn(styles.iconButton, styles.closeButton, className)} onClick={onClick}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#C7D0D9" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 7L12 17" stroke="#C7D0D9" strokeWidth="2" strokeLinecap="round"/>
        <path d="M17 12L7 12" stroke="#C7D0D9" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
  );
};

export default CloseIcon;