import React from 'react';
import cn from 'classnames';

const AgreementCheckbox = ({ id, fields, setFields, children, disabled = false, forPDF = false, isSafari = false }) => {
  return (
    <div className={`flex ${isSafari ? 'mt-1' : 'mt-3'}`}>
      {!forPDF && (
        <span className="text-red-600 pr-1 mt-1">
          <sup>*</sup>
        </span>
      )}
      <input
        id={id}
        type="checkbox"
        disabled={disabled}
        checked={fields[id]}
        onChange={() => {
          setFields({
            ...fields,
            [id]: !fields[id],
          });
        }}
        className={cn('form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out mt-1', {
          'bg-gray-200 text-gray-600': disabled,
        })}
      />
      <label htmlFor={id} className={`ml-2 block ${isSafari ? 'text-smallest' : 'text-sm'} leading-5 text-gray-900`}>
        {children}
      </label>
    </div>
  );
};

export default AgreementCheckbox;
