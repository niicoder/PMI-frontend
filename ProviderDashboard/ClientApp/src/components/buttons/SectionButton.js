import React from 'react';
import cn from 'classnames';

const SectionButton = ({ title, description, children, selected, first, last }) => {
  return (
    <div
      className={cn(
        'text-primary font-agrandir flex flex-row items-center px-3 py-2 border-2 border-gray-200 cursor-pointer',
        {
          'bg-purple-800': selected,
          'bg-purple-600': !selected,
        },
        {
          'rounded-bl-md': first,
        },
        {
          'rounded-br-md': last,
        },
      )}
    >
      {children}
      <div className="text-white text-center mx-4 w-40">
        <h3 className="font-bold">{title}</h3>
        <p className="text-xs">{description}</p>
      </div>
    </div>
  );
};

export default SectionButton;
