import React from 'react';

const HomeInfoCard = ({ title, children }) => {
  return (
    <div className="bg-white rounded shadow col-span-6 h-80 mt-3 lg:mt-0">
      <div className="w-full h-4 bg-primary rounded-t" />
      <div className="h-72 overflow-auto sm:overflow-hidden">
        <div className="pr-10">
          <div className="px-5 py-6 sm:px-6">
            <div className="text-xl">
              <span className="mr-3">
                <i className="fas fa-plus-circle text-primary" />
              </span>
              <span className="font-bold">{title}</span>
            </div>
            <div className="mt-3 text-sm xl:text-base">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeInfoCard;
