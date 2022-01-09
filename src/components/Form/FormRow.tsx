import React, { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import cn from 'classnames';
import styles from './Form.module.css';
import Input from './Input';
import FormSelect from './FormSelect';
import MinusIcon from '../../Icons/MinusIcon';

interface FormRowProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  categories: {
    value: string;
    label: string;
  }[];
  category: string;
  price?: number;
  index: number;
  remove: (rowIndex:number) => void;
  setFieldValue: (index:number, value: string | number, name: string) => void;
}

const FormRow: React.FC<FormRowProps> = ({
  categories,
  price,
  category,
  index,
  remove,
  setFieldValue,
  error,
}) => {
  const handleClick = (): void => {
    if (index !== undefined ) {
      remove(index);
    }
  };
  const selected = categories.filter((item) => item.value === category);
  
  return (
    <div className={cn(styles.formRow)}>
      <FormSelect
        categories={categories}
        placeholder='Category'
        name='category'
        index={index}
        onChange={setFieldValue}
        selected={selected}
        error={error[index]?.category}
      />
      <Input 
        placeholder='Price'
        name='price'
        onChange={setFieldValue}
        price={price}
        index={index}
        error={error[index]?.price}
      />
      <MinusIcon className={cn(styles.removeRowButton)} onClick={handleClick}/>
    </div>
  );
}; 

export default FormRow;
