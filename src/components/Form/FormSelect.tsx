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
  index: number;
  onChange: (index:number, value: string | number, name: string) => void;
  error: boolean;
}



const colorStyles: StylesConfig = {
  control: (styles, state) => ({
    ...styles,
    backgroundColor: 'transparent',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderRadius: 0,
    borderColor: state.selectProps.borderColor,
  }),
  menu: (styles, state) => {    
    return {
      ...styles,
      backgroundColor: '#0B0C0D',
      position: 'absolute',
      top: state.selectProps.index >= 5 ? 'unset' : '30px',
      bottom: state.selectProps.index >= 5 ? '-5px' : 'unset',
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
  index,
  onChange,
  error
}) => {

  const handleChange = (newValue: {value: string, label: string}) => {
    onChange(index, name, newValue.value);
  };
  
  return (
    <Select
      styles={colorStyles}
      borderColor={error ? 'tomato' : '#C7D0D9'}
      options={categories}
      defaultValue={selected}
      placeholder={placeholder}
      onChange={handleChange}
      menuPosition='fixed'
      index={index}
      menuPlacement={'top'}
    />
  );
};

export default FormSelect;