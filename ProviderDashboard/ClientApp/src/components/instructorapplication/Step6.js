import React from 'react';
import constants from '../../constants';

const Step6 = ({ application }) => {
  return (
    <div className="container mx-auto bg-gray-50 overflow-hidden rounded shadow mb-5">
      <div className="bg-gray-200 flex justify-between px-3 py-2 items-center">
        <div className="font-semibold text-lg font-agrandir py-3 pr-4">Assessment</div>
      </div>

      <div className="px-8 py-4">
        <div className="mt-4 flex flex-row items-center text-xl">Assessment result</div>
        <div className="mt-4 flex flex-row items-center text-sm">
          {application.statusId !== constants.instructorAppStatus.closedPassed.statusId
            ? 'No results are available at this time.'
            : 'Congratulations! You passed the assessment.'}
        </div>
      </div>
    </div>
  );
};

export default Step6;
