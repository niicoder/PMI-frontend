/* eslint-disable react/button-has-type */
import React from 'react';

const ButtonNoIcon = ({ title, type = 'button', color = 'primary-light', disabled = false, onClick = () => ({}) }) => {
  return (
    <span className="relative z-0 inline-flex shadow-sm">
      <button
        type={type}
        disabled={disabled}
        className={`relative inline-flex items-center px-6 py-3 rounded-md bg-${color} text-sm 
        leading-5 font-medium text-white focus:z-10 focus:outline-none transition ease-in-out duration-150`}
        onClick={onClick}
      >
        {title}
      </button>
    </span>
  );
};

export default ButtonNoIcon;
