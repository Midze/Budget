import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import styles from './Form.module.css';

interface InputProps {
  placeholder: string;
  name: string;
  price?: number;
  onChange: (a:string, c:number) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  name,
  price,
  onChange,
}) => {
  const [value, setValue] = useState(price);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
    onChange(name, Number(e.target.value));
  };

  return (
    <input
      className={cn(styles.price)}
      type="number"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      name={name}
    />
  );
};

export default Input;