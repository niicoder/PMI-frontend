import React from 'react';
import cn from 'classnames';

const TabButton = ({ title, children, selected, px = 16, py = 4, color = 'primary', onClick = () => ({}) }) => {
  return (
    <div
      className={cn(`text-${color} font-agrandir flex flex-col items-center px-${px} py-${py} cursor-pointer h-full`, {
        'bg-gray-300': selected,
        'bg-gray-200': !selected,
      })}
      onClick={onClick}
    >
      {children}
      <span>{title}</span>
    </div>
  );
};

export default TabButton;
