import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import styles from './Form.module.css';

interface InputProps {
  placeholder: string;
  name: string;
  price?: number | string;
  // onChange: (a:string, c:number) => void;
  onChange: (index:number, value: string | number, name: string) => void;
  index: number;
  error: boolean;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  name,
  price = '',
  onChange,
  index,
  error
}) => {
  const [value, setValue] = useState(price);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    
    if (e.target.value.match(/^\d{1,}(\.\d{0,4})?$/)) {
      setValue(e.target.value);
    } else if ( e.target.value === '') {
      setValue(e.target.value);
    }
  };
  const leaveFocus = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(index, name, Number(e.target.value).toFixed(2));
  };
  const onFocusHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    e.currentTarget.autocomplete = 'off';
  };
  
  return (
    <input
      key={`price_${index}`}
      className={cn(styles.price, {
        [styles.error]: error,
      })}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onBlur={leaveFocus}
      name={name}
      onFocus={onFocusHandler}
      autoComplete='new-password'
    />
  );
};

export default Input;