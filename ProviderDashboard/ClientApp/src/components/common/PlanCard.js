import React from 'react';
import ButtonNoIcon from '../buttons/ButtonNoIcon';

const PlanCard = ({ title, children, onClick, chosen }) => {
  return (
    <div className="flex flex-col rounded shadow mb-5 bg-gray-50 h-full">
      <div className="bg-gray-300 text-center  py-4 px-2">
        <span className="font-semibold text-lg font-agrandir">{title}</span>
      </div>
      <div className="flex flex-col items-center">{children}</div>
      <div className="flex justify-center py-5 mt-auto">
        <div onClick={onClick}>
          <ButtonNoIcon title={chosen ? 'Selected' : 'Select'} color={chosen ? 'green-500' : 'primary-light'} />
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
