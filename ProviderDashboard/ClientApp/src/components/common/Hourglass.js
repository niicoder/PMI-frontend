import React from 'react';

const Hourglass = ({ size = '3xl' }) => {
  return (
    <div className="relative">
      <i className={`fas fa-circle text-white text-${size}`} />
      <i className={`absolute top-0 left-0 far fa-circle text-blue-500 text-${size}`} />
      <i
        className="absolute fas fa-hourglass-half text-blue-500 text-3xl"
        style={{
          top: 8,
          left: 12,
        }}
      />
    </div>
  );
};

export default Hourglass;
