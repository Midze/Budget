import React from 'react';
import Select, { StylesConfig } from 'react-select';

interface FormSelectProps {
  placeholder: string;
  categories: {
    value: string;
    label: string;
  }[];
  selected: {
    value: string,
    label: string
  }[];
  name: string;
  onChange: (name:string, value:number | string) => void;
}



const colorStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: '#141619',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderRadius: 0,
  }),
  menu: (styles) => {    
    return {
      ...styles,
      backgroundColor: '#0B0C0D',
      position: 'absolute',
      top: '30px',
    };
  },
  menuList: (styles) => {
    return {
      ...styles,
      '::-webkit-scrollbar': {
        width: '2px',
        height: '0px',
      },
      '::-webkit-scrollbar-track': {
        background: '#f1f1f1'
      },
      '::-webkit-scrollbar-thumb': {
        background: '#888'
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: '#555'
      }
    };
  },
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: '#0B0C0D',
      textTransform: 'capitalize',
    };
  },
  container: (styles) => ({
    ...styles,
    width: '100%',
    flex: 1,
  }),
  placeholder: (styles) => ({ ...styles,}),
  input: (styles) => ({ ...styles,}),
  singleValue: (styles) => ({
    ...styles,
    color: '#C7D0D9',
    textTransform: 'capitalize',
  }),
};

const FormSelect: React.FC<FormSelectProps> = ({
  placeholder,
  categories,
  selected,
  name,
  onChange,
}) => {

  const handleChange = (newValue: {value: string, label: string}) => {
    onChange(name, newValue.value);
  };
  
  return (
    <Select
      styles={colorStyles}
      options={categories}
      defaultValue={selected}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default FormSelect;