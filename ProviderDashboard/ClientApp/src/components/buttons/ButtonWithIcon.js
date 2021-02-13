/* eslint-disable react/button-has-type */
import React from 'react';
import cn from 'classnames';

const ButtonWithIcon = ({
  title,
  children,
  type = 'button',
  size = 3,
  rounded = true,
  color = 'primary',
  colorLight = 'primary-light',
  fullWidth = false,
  textSize = 'sm',
  onClick = () => ({}),
  rtl = false,
  isLoading = false,
}) => {
  /// //////////////////////////////
  //  size:     3 ->  normal buttons
  //            1 ->  add button
  /// //////////////////////////////
  //  rounded:  true -> 4 corners
  //            false-> top corners
  /// //////////////////////////////

  return (
    <span
      className={`relative z-0 inline-flex shadow-sm ${fullWidth ? 'w-full' : ''} ${rtl ? 'flex-row-reverse' : ''}`}
    >
      <button
        type={type}
        className={cn(
          `relative inline-flex items-center text-white text-sm leading-5 font-medium focus:z-10 
          focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150`,
          `p-${size}`,
          isLoading ? 'bg-gray-400 cursor-not-allowed' : `bg-${color}`,
          {
            'rounded-l-md': rounded && !rtl,
            'rounded-tl-md': !rounded && !rtl,
            'rounded-r-md': rounded && rtl,
            'rounded-tr-md': !rounded && rtl,
          },
        )}
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="w-6 text-xl">
            <i className="fas fa-spinner fa-spin" />
          </span>
        ) : (
          children
        )}
      </button>
      <button
        type={type}
        className={cn(
          `-ml-px relative inline-flex items-center justify-center text-${textSize} leading-5 
          font-medium text-white focus:z-10 focus:outline-none transition ease-in-out duration-150`,
          `px-${size * 2}`,
          `py-${size}`,
          isLoading ? 'bg-gray-400 cursor-not-allowed' : `bg-${colorLight}`,
          {
            'w-full': fullWidth,
          },
          {
            'rounded-r-md': rounded && !rtl,
            'rounded-tr-md': !rounded && !rtl,
            'rounded-l-md': rounded && rtl,
            'rounded-tl-md': !rounded && rtl,
          },
        )}
        onClick={onClick}
        disabled={isLoading}
      >
        {title}
      </button>
    </span>
  );
};

export default ButtonWithIcon;
