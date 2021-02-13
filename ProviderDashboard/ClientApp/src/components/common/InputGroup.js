import React from 'react';
import cn from 'classnames';
import { IMaskInput } from 'react-imask';

import Tooltip from './tooltip';

const InputGroup = ({
  type = 'text',
  onChange,
  value,
  label,
  isRequired,
  name,
  placeholder = '',
  error,
  disabled = false,
  labelSize = 'base',
  mask = null,
  tooltip = null,
}) => {
  const renderInput = () => {
    if (mask) {
      return (
        <IMaskInput
          type="text"
          mask={Number}
          id={name}
          name={name}
          className={cn('form-input block w-full sm:text-sm sm:leading-5', {
            'bg-gray-200 text-gray-600': disabled,
          })}
          value={value}
          onAccept={(value) => onChange({ target: { name, value } })}
          placeholder={placeholder}
          disabled={disabled}
        />
      );
    }

    if (type === 'textarea') {
      return (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={5}
          className={cn('form-input block w-full sm:text-sm sm:leading-5', {
            'bg-gray-200 text-gray-600': disabled,
          })}
          placeholder={placeholder}
          disabled={disabled}
        />
      );
    }

    return (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={cn('form-input block w-full sm:text-sm sm:leading-5', {
          'bg-gray-200 text-gray-600': disabled,
        })}
        placeholder={placeholder}
        disabled={disabled}
      />
    );
  };

  return (
    <div>
      <label htmlFor={name} className={`block font-medium leading-5 text-gray-600 text-${labelSize} xl:text-base`}>
        {isRequired && (
          <span className="text-red-600">
            <sup>*</sup>
          </span>
        )}
        {label}
        {tooltip && (
          <Tooltip tooltipPlacement="up" target={`tooltip-${name}`} tooltip={tooltip}>
            {({ tooltipMouseenter, tooltipMouseleave }) => (
              <svg
                className="inline-block h-6 w-6 pb-1 float-right cursor-pointer text-green-500 fill-current"
                id={`tooltip-${name}`}
                onMouseEnter={() => tooltipMouseenter()}
                onMouseLeave={() => tooltipMouseleave()}
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            )}
          </Tooltip>
        )}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">{renderInput()}</div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default InputGroup;
