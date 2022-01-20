import React from 'react';
import Select, { StylesConfig, ActionMeta, SingleValue, MultiValue } from 'react-select';

type Option = {
  label: string;
  value: string;
};
interface FormSelectProps {
  placeholder: string;
  categories: Option[];
  selected: Option[];
  name: string;
  index: number;
  onChange: (index:number, value: string | number, name: string) => void;
  error: boolean;
}



const colorStyles = (borderColor:string, index: number):StylesConfig<Option> => ({
  control: (styles, state) => ({
    ...styles,
    backgroundColor: 'transparent',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderRadius: 0,
    borderColor: borderColor,
  }),
  menu: (styles, state) => {    
    return {
      ...styles,
      backgroundColor: '#0B0C0D',
      position: 'absolute',
      top: index >= 5 ? 'unset' : '30px',
      bottom: index >= 5 ? '-5px' : 'unset',
      zIndex: 100,
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
});

const FormSelect: React.FC<FormSelectProps> = ({
  placeholder,
  categories,
  selected,
  name,
  index,
  onChange,
  error
}) => {
  console.log('selected', selected);
  
  const handleChange = (option: Option | null ): void => {
    if (option !== null){
      console.log('change', option.value);
      
      onChange(index, option.value, name);
    }
  };
  
  return (
    <Select
      styles={colorStyles(error ? 'tomato' : '#C7D0D9', index)}
      options={categories}
      defaultValue={selected}
      placeholder={placeholder}
      onChange={(option: Option | null) => handleChange(option)}
      menuPosition='absolute'
      menuPlacement={'top'}
      isMulti={false}
    />
  );
};

export default FormSelect;