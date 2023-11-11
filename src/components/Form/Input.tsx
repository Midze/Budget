import React, { useState } from 'react';
import cn from 'classnames';
import styles from './Form.module.css';

interface InputProps {
  placeholder: string;
  name: string;
  price?: number | string;
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
  const getSumm = (value: string):string => {// helper
    const numbersList = value.split('+');
    const summ = numbersList.reduce((acc:number, number:string) => acc + Number(number), 0);
    return summ.toFixed(2);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value.match(/^\d+(\.\d{0,4})?(\+\d+(\.\d{0,4})?)*\+?$/)) {
      setValue(e.target.value);
    } else if ( e.target.value === '') {
      setValue(e.target.value);
    }
  };
  const handleKeyDownEvent = (e: React.KeyboardEvent<HTMLInputElement>): void => {  
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      e.preventDefault();
      onChange(index, getSumm(String(value)), name);
    }
  };
  const leaveFocus = (): void => {
    onChange(index, getSumm(String(value)), name);
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
      onKeyDown={handleKeyDownEvent}
      onBlur={leaveFocus}
      name={name}
      onFocus={onFocusHandler}
      autoComplete='new-password'
    />
  );
};

export default Input;