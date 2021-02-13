import React from 'react';
import cn from 'classnames';
import Circle from './Circle';

const CircleCheck = ({ tab, setTab, isChecked, number }) => {
  return (
    <div
      onClick={() => setTab(number)}
      className={cn('w-full flex flex-col justify-center items-center py-2 cursor-pointer', {
        'bg-gray-200': tab === number,
      })}
    >
      <Circle isChecked={isChecked} />
      <div className="text-xs text-center px-1">
        Criterion
        {number}
      </div>
    </div>
  );
};

export default CircleCheck;
