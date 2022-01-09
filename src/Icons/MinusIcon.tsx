import React from 'react';

interface MinusIconProps {
  className?: string;
  onClick?: () => void;
}

const MinusIcon:React.FC<MinusIconProps> = ({className, onClick}) => {
  return (
    <div className={className} onClick={onClick}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#C7D0D9" xmlns="http://www.w3.org/2000/svg">
        <path strokeWidth="0" d="M24 12C24 5.3828 18.6172 -2.3529e-07 12 -5.24537e-07C5.3828 -8.13784e-07 -2.3529e-07 5.3828 -5.24537e-07 12C-8.13784e-07 18.6172 5.38373 24 12 24C18.6163 24 24 18.6172 24 12ZM1.85901 12C1.85902 6.40898 6.40805 1.85901 12 1.85902C17.592 1.85902 22.141 6.40898 22.141 12C22.141 17.592 17.592 22.141 12 22.141C6.40805 22.141 1.85901 17.591 1.85901 12Z"/>
        <path d="M17 12L7 12" stroke="#C7D0D9" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
  );
};

export default MinusIcon;