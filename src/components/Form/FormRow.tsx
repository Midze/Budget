import React, { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import cn from 'classnames';
import styles from './Form.module.css';
import Input from './Input';
import FormSelect from './FormSelect';

interface FormRowProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  categories: {
    value: string;
    label: string;
  }[];
  category: string;
  price?: number;
  index?: number;
  add?: ({price, category}: {price:number | undefined, category: string }) => void;
  remove?: (rowIndex:number) => void;
}

const FormRow: React.FC<FormRowProps> = ({
  categories,
  price,
  category,
  index,
  add,
  remove,
}) => {
  const [rowValue, setRowValue] = useState({price, category});
  const setFieldValue = (name:string, value:string | number): void => {
    const newValue = {
      ...rowValue,
      [name]: value,
    };

    setRowValue(newValue);
  };
  const handleClick = (): void => {
    if (add) {
      add(rowValue);
      setRowValue({price: undefined, category: ''});
    }
    if (remove && index) {
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
        onChange={setFieldValue}
        selected={selected}
      />
      <Input 
        placeholder='Price'
        name='price'
        onChange={setFieldValue}
        price={price}
      />
      <div className={cn(styles.formRowButton)} onClick={handleClick}>{ add ? 'Add' : 'Delete'}</div>
    </div>
  );
}; 

export default FormRow;
