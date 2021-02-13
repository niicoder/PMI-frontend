import React from 'react';

const Clock = ({ size = '3xl' }) => {
  return (
    <div className="relative">
      <i className={`fas fa-circle text-white text-${size}`} />
      <i className={`absolute top-0 left-0 far fa-clock text-blue-500 text-${size}`} />
    </div>
  );
};

export default Clock;
