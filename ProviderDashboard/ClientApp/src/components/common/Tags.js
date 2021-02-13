import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import _ from 'lodash';

export const createOption = (label) => ({
  label,
  value: label,
});

export default ({
  values = [],
  onChange,
  disabled = false,
  placeholder = 'Type a tag name and press tab or enter key',
}) => {
  const [inputValue, setInputValue] = useState('');

  function handleKeyDown(event) {
    if (!inputValue) {
      return;
    }

    if (event.key === 'Enter' || event.key === 'Tab') {
      setInputValue('');

      if (!_.find(values, { value: inputValue })) {
        const newValues = [...values, createOption(inputValue)];
        onChange(newValues);
      }

      event.preventDefault();
    }
  }

  return (
    <CreatableSelect
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={onChange}
      onInputChange={(value) => setInputValue(value)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      value={values}
      isDisabled={disabled}
      components={{ DropdownIndicator: null }}
    />
  );
};
