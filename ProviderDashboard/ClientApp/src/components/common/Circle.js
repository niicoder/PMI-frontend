import React from 'react';

const Circle = ({ isChecked, size = '3xl' }) => {
  return (
    <div className="relative">
      <i className={`fas fa-circle text-white text-${size}`} />
      {isChecked ? (
        <i className={`absolute top-0 left-0 far fa-check-circle text-green-500 text-${size}`} />
      ) : (
        <i className={`absolute top-0 left-0 far fa-circle text-orange-400 text-${size}`} />
      )}
    </div>
  );
};

export default Circle;
